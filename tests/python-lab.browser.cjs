const {chromium}=require('playwright'),fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path'),{spawn}=require('node:child_process');
const port=process.env.LAB_PORT||'4189',base=process.env.LAB_BASE_URL||'http://127.0.0.1:'+port,out=process.env.LAB_OUTPUT||path.join(__dirname,'../artifacts/python-lab');
fs.mkdirSync(out,{recursive:true});
const content=JSON.parse(fs.readFileSync(path.join(__dirname,'../assets/python-lab-content.json'),'utf8'));
(async()=>{
 const server=process.env.LAB_BASE_URL?null:spawn(process.execPath,['tools/serve-preview.cjs'],{cwd:path.join(__dirname,'..'),env:{...process.env,PORT:port},windowsHide:true});
 if(server)await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject);server.once('exit',code=>{if(code)reject(new Error('Preview server failed '+code))})});
 process.on('exit',()=>server?.kill());
 const browser=await chromium.launch({...(process.env.MEOWDE_BROWSER_CHANNEL?{channel:process.env.MEOWDE_BROWSER_CHANNEL}:{}),headless:true});
 const results=[],errors=[];
 const context=await browser.newContext({viewport:{width:1365,height:1000}}),page=await context.newPage();
 page.on('pageerror',e=>errors.push(e.message));
 const check=(name,value)=>{assert.ok(value,name);results.push({name,pass:true});console.log('PASS',name)};
 await page.goto(base+'/python-lab.html');await page.waitForSelector('#learner-code');
 check('20 navigable units',await page.locator('#unit-nav a').count()===20);
 check('Desktop unit menu fits viewport',await page.locator('#unit-nav').evaluate(e=>e.getBoundingClientRect().height<=innerHeight-20));
 await page.evaluate(()=>{
   const p=JSON.parse(localStorage.getItem('meowde-python-lab-v1')||'{"version":1,"units":{}}');
   p.units.functions={draft:'old function draft',passed:true,independentPassed:true,quizPassed:true};
   p.units['eda-project']={reflection:'이전 프로젝트 판단 메모'};
   localStorage.setItem('meowde-python-lab-v1',JSON.stringify(p));
 });
 await page.reload();await page.waitForSelector('#learner-code');
 await page.evaluate(()=>localStorage.setItem('meowde-v410-state',JSON.stringify({lang:'ko',done:[0,1],next:2,xp:77,churu:120,cat:'a',custom:'preserve'})));
 const sentinel=await page.evaluate(()=>localStorage.getItem('meowde-v410-state'));
 await page.locator('[data-choice="1"]').click();check('Wrong prediction explains selected mistake',(await page.locator('#quiz-feedback').textContent()).includes('int'));
 await page.locator('[data-choice="0"]').click();check('Correct prediction recorded',(await page.locator('#quiz-feedback').textContent()).includes('맞았습니다'));
 await page.locator('#hint-button').click();check('First hint does not expose model',await page.locator('#hints p').count()===1&&!(await page.locator('#hints').textContent()).includes('return count'));
 await page.locator('#learner-code').fill('def pack(text, capacity):\n    return (3, 5)');
 await page.reload();await page.waitForSelector('#learner-code');check('Draft and hint survive reload',(await page.locator('#learner-code').inputValue()).includes('(3, 5)')&&await page.locator('#hints p').count()===1);
 async function execute(mode='grade'){
   await page.locator(`[data-run="${mode}"]`).click();
   await page.waitForFunction(()=>document.querySelector('#stop-run').hidden,{timeout:150000});
   return await page.locator('#run-status').textContent();
 }
 let status=await execute();check('Constant sample answer rejected',status.includes('일부 기준'));
 check('Boundary-specific feedback visible',(await page.locator('#run-results').textContent()).includes('0개'));
 await page.locator('#learner-code').fill(content.units[0].task.model);status=await execute();check('Helped solution passes with assisted label',status.includes('도움을 사용'));
 await page.locator('#independent-retry').click();await page.locator('#learner-code').fill(content.units[0].task.model);status=await execute();check('Independent retry tracked separately',status.includes('도움 없이'));
 check('Independent prediction + application label',(await page.locator('.lesson > .badge').textContent()).includes('혼자 적용'));
 await page.screenshot({path:path.join(out,'python-lab-desktop.png'),fullPage:true});
 await page.screenshot({path:path.join(out,'python-lab-desktop-view.png')});
 for(const id of ['object-collaboration','numpy-shape','numpy-axis','numpy-index','numpy-batches','numpy-random','pandas-select','pandas-clean','pandas-time','charts','eda-project']){
   await page.goto(base+'/python-lab.html#'+id);await page.waitForSelector('#learner-code');
   const unit=content.units.find(u=>u.id===id);
   const wrongs={
     'numpy-index':'import numpy as np\ndef select_panel(a,rows,columns):\n    return a[rows,columns]',
     'numpy-batches':'import numpy as np\ndef make_batches(parts,k):\n    return np.array_split(np.sort(np.concatenate(parts),axis=0),k)',
     'numpy-random':unit.task.model.replace('    rng =','    np.random.seed(seed)\n    rng ='),
     'pandas-time':unit.task.model.replace('regex=False','regex=True')
   };
   if(['numpy-index','numpy-batches','numpy-random','pandas-time'].includes(id)){
     await page.locator('#learner-code').fill(wrongs[id]);status=await execute();check(id+' misconception rejected',status.includes('일부 기준'));
   }
   await page.locator('#learner-code').fill(unit.task.model);status=await execute();
   check(id+' real Pyodide criteria',status.includes('모든 기준 통과'));
   if(id==='charts'){check('Chart PNG rendered',await page.locator('.chart-output img').count()>0);await page.screenshot({path:path.join(out,'python-lab-chart.png'),fullPage:true});}
 }
 check('Original lab record survives inserted units',await page.evaluate(()=>{const r=JSON.parse(localStorage.getItem('meowde-python-lab-v1')).units.functions;return r.draft==='old function draft'&&r.independentPassed&&r.quizPassed}));
 check('Original project reflection survives new units',(await page.locator('#reflection').inputValue())==='이전 프로젝트 판단 메모');
 await page.goto(base+'/python-lab.html#files');await page.waitForSelector('#learner-code');status=await execute('example');check('File example runs in worker',status.includes('마쳤습니다')&&(await page.locator('#run-results').textContent()).includes('4'));
 await page.locator('#learner-code').fill('while True:\n    pass');await page.locator('[data-run="grade"]').click();await page.waitForFunction(()=>document.querySelector('#run-status').textContent.includes('코드와 평가'),{timeout:120000});
 await page.locator('#stop-run').click();check('Infinite loop can be stopped',(await page.locator('#run-status').textContent()).includes('중지'));
 check('Existing user key unchanged',await page.evaluate(()=>localStorage.getItem('meowde-v410-state'))===sentinel);
 await page.locator('[data-run="grade"]').click();await page.waitForFunction(()=>document.querySelector('#stop-run').hidden,{timeout:150000});
 check('Infinite loop reaches automatic timeout',(await page.locator('#run-status').textContent()).includes('15초를 초과'));
 const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true}),mp=await mobile.newPage();
 await mp.goto(base+'/python-lab.html');await mp.waitForSelector('#learner-code');
 check('Mobile no horizontal overflow',await mp.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await mp.locator('#nav-toggle').click();await mp.locator('#unit-nav a[href="#copy"]').click();check('Mobile navigation changes unit',(await mp.locator('#unit-title').textContent()).includes('복사'));
 await mp.screenshot({path:path.join(out,'python-lab-mobile.png'),fullPage:true});
 await mp.screenshot({path:path.join(out,'python-lab-mobile-view.png')});
 // Real root integration and legacy curriculum count/state restoration.
 await page.goto(base+'/');await page.waitForSelector('#python-lab-entry',{timeout:60000});
 check('Root home exposes lab entry',await page.locator('#python-lab-entry').getAttribute('href')==='/python-lab.html');
 check('Legacy 60 lessons retained',await page.evaluate(()=>window.MEOWDE_LESSONS_KO.length===60));
 check('Legacy progress loads after lab visit',await page.evaluate(()=>S.done.includes(0)&&S.done.includes(1)&&S.xp>=77&&S.churu>=120));
 await page.evaluate(()=>{startLesson(0);S.idx=1;S.write='saved draft';save();renderHome()});
 await page.locator('#python-lab-entry').click();await page.waitForSelector('#learner-code');
 await page.locator('.lab-header a').first().click();await page.waitForFunction(()=>typeof S!=='undefined'&&S.queue?.length>0,{timeout:60000});
 check('In-progress legacy lesson survives round trip',await page.evaluate(()=>S.lessonIndex===0&&S.idx===1&&S.write==='saved draft'));
 check('No unhandled browser errors',errors.length===0);
 // CDN failure is an infrastructure error, not a wrong answer.
 const failed=await browser.newContext(),fp=await failed.newPage();
 await fp.route('https://cdn.jsdelivr.net/**',r=>r.abort());await fp.goto(base+'/python-lab.html');await fp.waitForSelector('#learner-code');await fp.locator('[data-run="grade"]').click();
 await fp.waitForFunction(()=>document.querySelector('#stop-run').hidden,{timeout:30000});
 check('Runtime failure does not grade an attempt',(await fp.locator('#run-status').textContent()).includes('진도는 변경하지')&&await fp.evaluate(()=>!JSON.parse(localStorage.getItem('meowde-python-lab-v1')||'{"units":{}}').units.values?.attempts));
 fs.writeFileSync(path.join(out,'python-lab-browser-results.json'),JSON.stringify({results,errors},null,2));await browser.close();server?.kill();
})().catch(e=>{console.error(e);process.exit(1)});

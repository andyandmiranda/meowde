const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';
async function ready(page){await page.goto(base+'/');await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');}
const cases=[
 {kind:'predict',exercise:{id:'qa-p',type:'predict',prompt:'What prints?',code:'print(2)',choices:['1','2'],answer:1,explain:'The print call outputs 2.',output:'2'},wrong:()=>0,answer:'2'},
 {kind:'fill',exercise:{id:'qa-f',type:'fill',prompt:'Fill the blank',code:'print(____)',tokens:['1','2'],answer:'2',explain:'Insert 2.'},wrong:()=>0,answer:'print(2)'},
 {kind:'bughunt',exercise:{id:'qa-b',type:'bughunt',prompt:'Find the bug',lines:['print(2)','print(1'],buggy:1,fixed:'print(1)',explain:'The second line is missing a parenthesis.'},wrong:()=>0,answer:'print(1)'},
 {kind:'write',exercise:{id:'qa-w',type:'write',prompt:'Write Python',starter:'print(0)',model:'print(2)',expected:'2',testcase:'Expect 2',explain:'Use print(2).'},wrong:()=>null,answer:'print(2)'}
];
for(const row of cases)test('wrong '+row.kind+' reveals correct example and reason without reward',async({page})=>{
 await ready(page);
 await page.evaluate(ex=>{const lesson=lessons()[0];S.lessonIndex=0;S.queue=[Object.assign({},ex)];S.idx=0;S.firstTotal=1;S.firstCorrect=0;S.xpEarned=0;S.combo=0;S.daily=false;S.sel=null;S.fill=null;S.checked=false;S.correct=false;S.hint=false;S.output='';S.write='';renderLesson();},row.exercise);
 const before=await page.evaluate(()=>({xp:S.xp,churu:S.churu,done:[...S.done]}));
 if(row.kind==='predict'||row.kind==='bughunt')await page.locator('.choice, .linebtn').first().click();
 if(row.kind==='fill')await page.locator('.token').first().click();
 if(row.kind==='write')await page.locator('#code-editor').fill('print(0)');
 if(!(await page.locator('.feedback.no').count()))await page.locator('.lesson-foot .btn').click();
 await expect(page.locator('.feedback.no')).toBeVisible();
 const disclosure=page.locator('[data-answer-review]');
 await expect(disclosure).toBeVisible();
 await disclosure.locator('summary').click();
 await expect(disclosure).toContainText(row.answer);
 if(row.kind==='bughunt')await expect(page.locator('.feedback.no')).toContainText('오류가 있는 줄: 2번');
 if(row.kind==='write')await expect(page.locator('.feedback.no')).toContainText('기대 출력은 “2”');
 if(row.kind==='predict'||row.kind==='fill')await expect(page.locator('.feedback.no')).toContainText(row.exercise.explain);
 expect(await page.evaluate(()=>({xp:S.xp,churu:S.churu,done:[...S.done]}))).toEqual(before);
});

test('lesson close returns to learning map without clearing progress',async({page})=>{
 await ready(page);
 await page.evaluate(()=>{S.lessonIndex=0;S.queue=[{id:'qa-nav',type:'concept',title:'Preview concept',body:'Read me',code:'print(1)'}];S.idx=0;S.firstTotal=1;S.firstCorrect=0;S.xpEarned=0;S.daily=false;renderLesson();});
 const beforeClose=await page.evaluate(()=>({screen:S.screen,button:document.querySelector('.lesson-top .close')?.outerHTML||null,hasMap:!!document.querySelector('.map-head')})); console.log('QA_BEFORE_LESSON_CLOSE',JSON.stringify(beforeClose));
 await page.waitForTimeout(180);
 console.log('QA_BEFORE_LESSON_CLOSE_STABLE',JSON.stringify(await page.evaluate(()=>({screen:S.screen,button:document.querySelector('.lesson-top .close')?.outerHTML||null}))));
 await page.evaluate(()=>{window.__navCalls=[];for(const name of ['renderMap','renderHome']){const original=window[name];window[name]=function(...args){window.__navCalls.push(name);return original.apply(this,args)}}});
 await page.locator('.lesson-top .close').click();
 const navigation=await page.evaluate(()=>({screen:S.screen,idx:S.idx,queue:S.queue.length,pathname:location.pathname,navCalls:window.__navCalls,onclick:document.querySelector('.lesson-top .close')?.getAttribute('onclick')||null,mapVisible:!!document.querySelector('.map-head'),homeVisible:!!document.querySelector('.home-head')}));
 console.log('QA_LESSON_CLOSE_NAVIGATION',JSON.stringify(navigation));
 expect(navigation.screen).toBe('map');
 expect(navigation.idx).toBe(0);
 expect(navigation.queue).toBe(1);
});

test('measure review tab navigation without changing learner state',async({page})=>{
 await ready(page);
 const result=await page.evaluate(()=>{
  const before=JSON.stringify({done:S.done,xp:S.xp,churu:S.churu,queue:S.queue,idx:S.idx});
  const started=performance.now();
  renderReview();
  const elapsedMs=Math.round((performance.now()-started)*10)/10;
  const after=JSON.stringify({done:S.done,xp:S.xp,churu:S.churu,queue:S.queue,idx:S.idx});
  return {elapsedMs,screen:S.screen,unchanged:before===after,hasTabs:!!document.querySelector('.tabbar')};
 });
 console.log('QA_REVIEW_RENDER_TIMING',JSON.stringify(result));
 expect(result.unchanged).toBe(true);
 expect(result.hasTabs).toBe(true);
});

test('measure first review entry phases in real browser',async({page})=>{
 const navigationStart=Date.now();
 await page.goto(base+'/');
 const domReadyMs=Date.now()-navigationStart;
 await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
 const scriptsReadyMs=Date.now()-navigationStart;
 const result=await page.evaluate(()=>{
  const start=performance.now();
  const before=JSON.stringify({done:S.done,xp:S.xp,churu:S.churu,queue:S.queue,idx:S.idx});
  const dataMs=performance.now()-start;
  renderReview();
  const renderMs=performance.now()-start-dataMs;
  const after=JSON.stringify({done:S.done,xp:S.xp,churu:S.churu,queue:S.queue,idx:S.idx});
  return {dataMs,renderMs,unchanged:before===after,screen:S.screen};
 });
 await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
 const firstPaintMs=Date.now()-navigationStart;
 console.log('QA_REVIEW_FIRST_ENTRY_PHASES',JSON.stringify({domReadyMs,scriptsReadyMs,firstPaintMs,...result}));
 expect(result.unchanged).toBe(true);
 expect(result.screen).toBe('review');
});

test('practice header back-to-learn opens actual map in both engines',async({page})=>{
 await page.goto(base+'/python-lab.html#values/challenge');
 const link=page.getByRole('link',{name:'학습으로 돌아가기'});
 await expect(link).toHaveAttribute('href','/?tab=map');
 await link.click();
 await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
 await expect.poll(()=>page.evaluate(()=>S.screen)).toBe('map');
 expect(new URL(page.url()).searchParams.get('tab')).toBe('map');
});

test('Linux loop feedback shows the correct answer even after a correct choice',async({page})=>{
 await page.goto(base+'/linux-loops-intro.html');
 await expect(page.getByRole('link',{name:'학습 지도로 돌아가기'})).toHaveAttribute('href','/?tab=map');
 const nav=page.getByRole('navigation',{name:'메인 메뉴'});
 await expect(nav.getByRole('link')).toHaveCount(5);
 await expect(nav.getByRole('link',{name:'학습'})).toHaveAttribute('href','/linux-home.html?tab=learn');
 await expect(nav.getByRole('link',{name:'심화'})).toHaveAttribute('aria-current','page');
 await expect(nav.getByRole('link',{name:'함께'})).toHaveAttribute('href','/together.html?subject=linux');
 const palette=await page.evaluate(()=>({link:getComputedStyle(document.querySelector('main a')).color,buttonBorder:getComputedStyle(document.querySelector('#guided button')).borderTopColor}));
 expect(palette.link).toBe('rgb(128, 85, 106)');
 expect(palette.buttonBorder).toBe('rgb(232, 167, 197)');
 const guided=page.locator('#guided');
 await expect(guided.locator('button[aria-pressed="false"]')).toHaveCount(3);
 await guided.locator('button[data-value="3"]').click();
 await expect(guided.locator('[role="status"]')).toContainText('정답: 3줄');
 await expect(guided.locator('button[data-value="3"]')).toHaveAttribute('aria-pressed','true');
 await guided.locator('button[data-value="1"]').click();
 await expect(guided.locator('button[data-value="3"]')).toHaveAttribute('aria-pressed','false');
 await expect(guided.locator('button[data-value="1"]')).toHaveAttribute('aria-pressed','true');
 const transfer=page.locator('#transfer');
 await transfer.locator('button[data-value="6"]').click();
 await expect(transfer.locator('[role="status"]')).toContainText('정답: 2 다음 줄에 4');
});

test('practice task surfaces use distinct shared styles without changing storage',async({page})=>{
 await page.goto(base+"/python-lab.html#function-slots/practice");
 await expect(page.locator('#practice')).toBeVisible();
 const state=await page.evaluate(()=>{
  const task=document.querySelector('#practice');
  const kicker=task.querySelector('.practice-kicker');
  const editor=task.querySelector('textarea.code');
  return {taskBorder:getComputedStyle(task).borderTopWidth,kickerBg:getComputedStyle(kicker).backgroundColor,editorBorder:editor?getComputedStyle(editor).borderTopWidth:null};
 });
 expect(state.taskBorder).toBe('2px');
 expect(state.kickerBg).not.toBe('rgba(0, 0, 0, 0)');
 if(state.editorBorder)expect(state.editorBorder).toBe('2px');
});

test('Linux crash course uses shared white and pink UI in Chromium and WebKit',async({page})=>{
 await page.goto(base+'/linux-crash-course.html');
 await expect(page.getByRole('navigation',{name:'학습 화면 이동'}).getByRole('link',{name:'Linux 학습 지도'})).toHaveAttribute('href','/linux-home.html?tab=learn');
 const nav=page.getByRole('navigation',{name:'메인 메뉴'});
 await expect(nav.getByRole('link')).toHaveCount(5);
 await expect(nav.getByRole('link',{name:'심화'})).toHaveAttribute('aria-current','page');
 await expect(nav.getByRole('link',{name:'함께'})).toHaveAttribute('href','/together.html?subject=linux');
 const colors=await page.evaluate(()=>({background:getComputedStyle(document.querySelector('.app')).backgroundColor,button:getComputedStyle(document.querySelector('#sim-run')).backgroundColor}));
 expect(colors.background).toBe('rgb(255, 255, 255)');
 expect(colors.button).toBe('rgb(244, 91, 152)');
});

test('practice top heading and four-step structure remain accessible',async({page})=>{
 await page.goto(base+"/python-lab.html#function-slots/practice");
 await expect(page.getByRole('banner',{name:'실습 화면 상단'}).getByRole('heading',{name:'실습'})).toBeVisible();
 await expect(page.getByRole('link',{name:'학습으로 돌아가기'})).toHaveAttribute('href','/?tab=map');
 await expect(page.locator('#practice')).toBeVisible();
 await expect(page.locator('#practice #learner-code')).toBeVisible();
 await expect(page.locator('#practice [data-run="grade"]')).toBeVisible();
 expect(await page.locator('#practice').evaluate(el=>getComputedStyle(el.querySelector('.practice-kicker'),'::before').content)).toContain('01');
 expect(await page.locator('#practice').evaluate(el=>getComputedStyle(el.querySelector('[data-run="grade"]'),'::before').content)).toContain('03');
});

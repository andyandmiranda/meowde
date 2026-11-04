const {test,expect}=require('playwright/test');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
let server,base,phase;
test.beforeAll(async()=>{
 server=http.createServer((req,res)=>{
  const pathname=new URL(req.url,'http://localhost').pathname;
  const file=path.join(root,pathname==='/'?'python-lab.html':pathname);
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404);return res.end('missing')}
  let body=fs.readFileSync(file);
  if(pathname==='/sw.js'&&phase==='old')body=Buffer.from(body.toString().replace('meowde-v485-practice-update-precache','meowde-v484-practice-update-test').replace('  "/assets/python-lab-update.js",\n',''));
  if(pathname==='/assets/python-lab-content.json'&&phase==='old'){
   const content=JSON.parse(body);content.units=content.units.filter(u=>u.id!=='function-slots');body=Buffer.from(JSON.stringify(content));
  }
  if((pathname==='/python-lab.html'||pathname==='/')&&phase==='old')body=Buffer.from(body.toString().replace('  <script defer src="/assets/python-lab-update.js?v=1"></script>\n',''));
  const ext=path.extname(file),type={'.js':'application/javascript','.json':'application/json','.html':'text/html','.css':'text/css','.png':'image/png','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'}[ext]||'application/octet-stream';
  res.writeHead(200,{'Content-Type':type,'Cache-Control':'no-store'});res.end(body);
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base='http://127.0.0.1:'+server.address().port;
});
test.afterAll(async()=>{await new Promise(resolve=>server.close(resolve))});
async function cachedVisit(page){
 phase='old';
 // Model a learner who completed the existing values challenge. Their editor
 // remains accessible in the new five-stage UI without resetting progress.
 await page.addInitScript(()=>{
  if(sessionStorage.getItem('cached-values-seeded'))return;
  localStorage.setItem('meowde-python-lab-v1',JSON.stringify({version:1,units:{values:{independentPassed:true}}}));
  sessionStorage.setItem('cached-values-seeded','1');
 });
 await page.goto(base+'/python-lab.html#values');
 await expect(page.locator('#learner-code')).toBeVisible();
 // Real old worker/cache, not a mocked controller event. Old content lacks the pilot.
 await page.evaluate(async()=>{
  const reg=await navigator.serviceWorker.register('/sw.js',{scope:'/',updateViaCache:'none'});
  await navigator.serviceWorker.ready;
  if(!navigator.serviceWorker.controller)await new Promise(resolve=>navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true}));
 });
 await page.evaluate(()=>{
  localStorage.setItem('meowde-v410-state','{"done":[0,1],"xp":77,"churu":120,"draft":"legacy"}');
  localStorage.setItem('meowde-python-lab-v1',JSON.stringify({version:1,units:{values:{independentPassed:true},functions:{draft:'prior function draft'},unknown:{custom:'future'}}}));
 });
 phase='new';
 await page.goto(base+'/python-lab.html#function-slots/practice');
 // A hash-only change keeps the old document. Reload to fetch the new HTML,
 // exactly as the observed stale-cache reproduction did before visiting Home.
 await page.reload();
 await expect(page.locator('#unit-title')).toHaveText('문자에서 계산으로');
 await expect(page.locator('#practice-update-open')).toBeVisible({timeout:30000});
}
test('real cached practice offers update, preserves changed code and opens the original deep link only on request',async({page})=>{
 await cachedVisit(page);
 const legacy=await page.evaluate(()=>localStorage.getItem('meowde-v410-state'));
 await page.locator('#learner-code').fill('def pack(text, capacity):\n    return divmod(int(text), capacity)');
 const saved=await page.evaluate(()=>localStorage.getItem('meowde-python-lab-v1'));
 await expect(page.locator('#unit-title')).toHaveText('문자에서 계산으로');
 // An active submission must not be interrupted, even after an explicit update click.
 await page.evaluate(()=>document.getElementById('stop-run').hidden=false);
 await page.locator('#practice-update-open').click();
 await expect(page.locator('#practice-update-status')).toContainText('코드가 실행 중');
 await expect(page.locator('#unit-title')).toHaveText('문자에서 계산으로');
 await page.evaluate(()=>document.getElementById('stop-run').hidden=true);
 await page.locator('#practice-update-open').click();
 await expect(page.locator('#unit-title')).toHaveText('함수 심화 · 남은 자리 계산');
 await expect(page.locator('.function-stages [aria-current="step"]')).toHaveText('따라 코딩');
 expect(await page.evaluate(()=>localStorage.getItem('meowde-python-lab-v1'))).toBe(saved);
 expect(await page.evaluate(()=>localStorage.getItem('meowde-v410-state'))).toBe(legacy);
 await page.goto(base+'/python-lab.html#values');
 await expect(page.locator('#learner-code')).toHaveValue('def pack(text, capacity):\n    return divmod(int(text), capacity)');
 await page.reload();
 await expect(page.locator('#practice-update')).toHaveCount(0);
});
test('unsaved changes prevent an update and keep original bytes and editor on storage denial',async({page})=>{
 await cachedVisit(page);
 const original=await page.evaluate(()=>localStorage.getItem('meowde-python-lab-v1'));
 await page.evaluate(()=>{
  const native=Storage.prototype.setItem;
  Storage.prototype.setItem=function(key,value){if(key==='meowde-python-lab-v1')throw new DOMException('full','QuotaExceededError');return native.call(this,key,value)};
 });
 await page.locator('#learner-code').fill('unsaved work');
 await page.locator('#practice-update-open').click();
 await expect(page.locator('#practice-update-status')).toContainText('저장됐는지 확인하지 못해');
 await expect(page.locator('#learner-code')).toHaveValue('unsaved work');
 await expect(page.locator('#unit-title')).toHaveText('문자에서 계산으로');
 expect(await page.evaluate(()=>localStorage.getItem('meowde-python-lab-v1'))).toBe(original);
 await page.getByRole('button',{name:'나중에',exact:true}).click();
 await expect(page.locator('#practice-update')).toHaveCount(0);
 await expect(page.locator('#learner-code')).toHaveValue('unsaved work');
});

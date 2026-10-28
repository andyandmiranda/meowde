const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';
const key='meowde-v410-state';

test('corrupt learning JSON stays byte-for-byte intact after home/map navigation',async({page})=>{
 const original='{"done":[0],"inProgress":';
 await page.addInitScript(({key,original})=>localStorage.setItem(key,original),{key,original});
 await page.goto(base+'/');
 await expect(page.locator('.lesson-save-warning')).toContainText('원본을 덮어쓰지 않았어요');
 await page.evaluate(()=>renderMap());
 expect(await page.evaluate(key=>localStorage.getItem(key),key)).toBe(original);
 expect(await page.evaluate(()=>({problem:storageReadProblem,saveResult:save()}))).toEqual({problem:'corrupt',saveResult:false});
 expect(await page.evaluate(key=>localStorage.getItem(key),key)).toBe(original);
});

test('storage read permission denial never calls setItem with default progress',async({page})=>{
 await page.addInitScript(key=>{
  const originalGet=Storage.prototype.getItem;
  Storage.prototype.getItem=function(name){if(name===key)throw new DOMException('denied','SecurityError');return originalGet.call(this,name)};
  const originalSet=Storage.prototype.setItem;
  window.__protectedWrites=0;
  Storage.prototype.setItem=function(name,value){if(name===key)window.__protectedWrites++;return originalSet.call(this,name,value)};
 },key);
 await page.goto(base+'/');
 await expect(page.locator('.lesson-save-warning')).toContainText('읽을 수 없어');
 expect(await page.evaluate(()=>({problem:storageReadProblem,attempt:save(),writes:window.__protectedWrites}))).toEqual({problem:'unreadable',attempt:false,writes:0});
});

test('transient quota failure keeps the active lesson and allows retry after storage recovers',async({page})=>{
 await page.goto(base+'/');
 await page.evaluate(key=>{
  startLesson(0);
  S.idx=1;
  const oldSet=Storage.prototype.setItem;
  window.__restoreSetItem=()=>{Storage.prototype.setItem=oldSet};
  Storage.prototype.setItem=function(name,value){if(name===key)throw new DOMException('quota','QuotaExceededError');return oldSet.call(this,name,value)};
  save();
 },key);
 expect(await page.evaluate(()=>({failed:lessonSaveFailed,step:S.idx}))).toEqual({failed:true,step:1});
 await page.evaluate(()=>{window.__restoreSetItem();retryLessonSave()});
 expect(await page.evaluate(()=>({failed:lessonSaveFailed,step:S.idx}))).toEqual({failed:false,step:1});
 const persisted=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
 expect(persisted.inProgress.idx).toBe(1);
 await page.reload();
 expect(await page.evaluate(()=>S.idx)).toBe(1);
});

test('unknown existing learner fields survive a normal save',async({page})=>{
 await page.addInitScript(key=>localStorage.setItem(key,JSON.stringify({lang:'ko',xp:12,customFutureKey:{v:5}})),key);
 await page.goto(base+'/');
 const persisted=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
 expect(persisted.customFutureKey).toEqual({v:5});
 expect(persisted.xp).toBe(12);
});

test('completed ordinary lesson clears inProgress without erasing unrelated fields',async({page})=>{
 await page.goto(base+'/');
 await page.evaluate(()=>{startLesson(0);S.done=[0];S.xp=40;clearLessonProgress();save()});
 const persisted=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
 expect(persisted.inProgress).toBeUndefined();
 expect(persisted.done).toEqual([0]);
 expect(persisted.xp).toBe(40);
});

test('future lesson inProgress survives saves in 30-lesson shell',async({page})=>{
 await page.addInitScript(key=>{
  localStorage.setItem(key,JSON.stringify({lang:'ko',inProgress:{lang:'ko',lessonIndex:42,idx:1,queue:[{type:'concept',title:'later'}]}}));
 },key);
 await page.goto(base+'/');
 const preserved=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).inProgress,key);
 expect(preserved.lessonIndex).toBe(42);
 expect(preserved.idx).toBe(1);
});

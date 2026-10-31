const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';
const key='meowde-v410-state';
async function ready(page){await page.waitForFunction(()=>typeof DATA!=='undefined'&&typeof save==='function'&&typeof startLesson==='function'&&window.MeowRelease&&window.MeowRelease.isReady());await page.evaluate(async()=>{await MeowRelease.loadPromise})}


test('corrupt learning JSON stops the loader and stays byte-for-byte intact',async({page})=>{
 const original='{"done":[0],"inProgress":';
 await page.addInitScript(({key,original})=>localStorage.setItem(key,original),{key,original});
 await page.goto(base+'/');
 await expect(page.locator('#status.error')).toContainText('원본 기록은 그대로 보존');
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
 await expect(page.locator('#status.error')).toBeVisible();
 expect(await page.evaluate(()=>window.__protectedWrites)).toBe(0);
});

test('transient quota failure keeps the active lesson and allows retry after storage recovers',async({page})=>{
 await page.goto(base+'/');await ready(page);
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
 await page.reload();await ready(page);
 expect(await page.evaluate(()=>S.idx)).toBe(1);
});

test('unknown existing learner fields survive a normal save',async({page})=>{
 await page.addInitScript(key=>localStorage.setItem(key,JSON.stringify({lang:'ko',xp:12,customFutureKey:{v:5}})),key);
 await page.goto(base+'/');await ready(page);
 expect(await page.evaluate(()=>save())).toBe(true);
 const persisted=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
 expect(persisted.customFutureKey).toEqual({v:5});
 expect(persisted.xp).toBe(12);
});

test('completed ordinary lesson clears inProgress without erasing unrelated fields',async({page})=>{
 await page.goto(base+'/');await ready(page);
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
 await page.goto(base+'/');await ready(page);
 expect(await page.evaluate(()=>save())).toBe(true);
 const preserved=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).inProgress,key);
 expect(preserved.lessonIndex).toBe(42);
 expect(preserved.idx).toBe(1);
});

test('failed final-lesson save restores draft, grading, progress and rewards; retry awards once',async({page})=>{
 await page.goto(base+'/');await ready(page);
 const result=await page.evaluate(key=>{
  startLesson(0);
  S.idx=S.queue.length-1;
  S.write='print("unsaved answer")';
  S.checked=true;S.correct=true;S.xpEarned=35;S.firstCorrect=2;
  save();
  const before={idx:S.idx,write:S.write,checked:S.checked,correct:S.correct,xpEarned:S.xpEarned,xp:S.xp,churu:S.churu,done:[...S.done],queueLength:S.queue.length};
  const diskBefore=localStorage.getItem(key);
  const original=Storage.prototype.setItem;
  Storage.prototype.setItem=function(name,value){if(name===key)throw new DOMException('quota','QuotaExceededError');return original.call(this,name,value)};
  try{nextQ()}finally{Storage.prototype.setItem=original}
  const afterFailure={idx:S.idx,write:S.write,checked:S.checked,correct:S.correct,xpEarned:S.xpEarned,xp:S.xp,churu:S.churu,done:[...S.done],queueLength:S.queue.length};
  const unchangedDisk=localStorage.getItem(key)===diskBefore;
  const warning=!!document.querySelector('.lesson-save-warning');
  nextQ();
  const afterSuccess={xp:S.xp,churu:S.churu,done:[...S.done],progress:JSON.parse(localStorage.getItem(key)).inProgress};
  finish(); // No active lesson remains; repeated completion must not award again.
  return {before,afterFailure,unchangedDisk,warning,afterSuccess,afterRepeat:{xp:S.xp,churu:S.churu,done:[...S.done]}};
 },key);
 expect(result.afterFailure).toEqual(result.before);
 expect(result.unchangedDisk).toBe(true);
 expect(result.warning).toBe(true);
 expect(result.afterSuccess.xp).toBe(result.before.xp+35);
 expect(result.afterSuccess.churu).toBeGreaterThan(result.before.churu);
 expect(result.afterSuccess.done).toEqual([0]);
 expect(result.afterSuccess.progress).toBeUndefined();
 expect(result.afterRepeat).toEqual({xp:result.afterSuccess.xp,churu:result.afterSuccess.churu,done:[0]});
});

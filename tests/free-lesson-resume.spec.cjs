const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';
async function ready(page){await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');}
async function select(page,index){
 await page.locator('.tabbar button').filter({hasText:/^(학습|Learn)$/}).click();
 await page.locator('.unit-tabs button').nth(Math.floor(index/10)).click();
 await page.locator(`button.node[data-lesson-index="${index}"]`).click();
 const guard=page.locator('.start-guard');if(await guard.count())await guard.locator('button').last().click();
}
for(const lang of ['ko','en'])test(`free choice and per-lesson resume survive reload (${lang})`,async({page})=>{
 await page.setViewportSize({width:375,height:812});
 await page.addInitScript(lang=>{if(!sessionStorage.getItem('free-choice-seed')){localStorage.setItem('meowde-v410-state',JSON.stringify({lang,done:[],next:0,xp:17,churu:8}));sessionStorage.setItem('free-choice-seed','1');}},lang);
 await page.goto(base+'/');await ready(page);
 await select(page,59);
 await expect(page.locator('.lesson-top')).toBeVisible();
 expect(await page.evaluate(()=>({index:S.lessonIndex,done:S.done,xp:S.xp,churu:S.churu}))).toEqual({index:59,done:[],xp:17,churu:8});
 await page.locator('.close').click();await select(page,0);
 await page.locator('.lesson-foot .btn').click();
 await expect(page.locator('.choices')).toBeVisible();
 const wrong=await page.evaluate(()=>(cur().answer+1)%cur().choices.length);
 await page.locator('.choice').nth(wrong).click();
 await expect(page.locator('.feedback.no')).toBeVisible();
 await expect(page.locator('.lesson-foot .btn')).toHaveCount(0);
 const saved=await page.evaluate(()=>({idx:S.idx,queue:S.queue,sel:S.sel,checked:S.checked,correct:S.correct,firstCorrect:S.firstCorrect}));
 await page.locator('.close').click();await select(page,59);
 await page.reload();await ready(page);expect(await page.evaluate(()=>S.lessonIndex)).toBe(59);
 await page.locator('.close').click();await select(page,0);
 expect(await page.evaluate(()=>({idx:S.idx,queue:S.queue,sel:S.sel,checked:S.checked,correct:S.correct,firstCorrect:S.firstCorrect}))).toEqual(saved);
 expect(await page.evaluate(()=>({done:S.done,xp:S.xp,churu:S.churu}))).toEqual({done:[],xp:17,churu:8});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('instant wrong choice keeps feedback usable if lesson storage is full',async({page})=>{
 await page.goto(base+'/');await ready(page);await select(page,0);
 await page.locator('.lesson-foot .btn').click();
 await expect(page.locator('.choices')).toBeVisible();
 const before=await page.evaluate(()=>localStorage.getItem('meowde-v410-state'));
 await page.evaluate(()=>{const original=Storage.prototype.setItem;window.__restoreChoiceStorage=()=>{Storage.prototype.setItem=original};Storage.prototype.setItem=function(k,v){if(k==='meowde-v410-state')throw new DOMException('full','QuotaExceededError');return original.call(this,k,v)};});
 const wrong=await page.evaluate(()=>(cur().answer+1)%cur().choices.length);
 await page.locator('.choice').nth(wrong).click();
 await expect(page.locator('.feedback.no')).toBeVisible();
 await expect(page.getByRole('alert')).toContainText('저장하지 못했어요');
 await expect(page.locator('.feedback.no .btn')).toBeVisible();
 expect(await page.evaluate(()=>localStorage.getItem('meowde-v410-state'))).toBe(before);
 await page.evaluate(()=>window.__restoreChoiceStorage());
});
test('completion warns and retries storage without losing reward state',async({page})=>{
 await page.goto(base+'/');await ready(page);await select(page,0);
 const before=await page.evaluate(()=>{
  const key='meowde-v410-state',old=localStorage.getItem(key),original=Storage.prototype.setItem;
  S.xpEarned=10;S.firstTotal=1;S.firstCorrect=1;
  try{
   Storage.prototype.setItem=function(k,v){if(k===key)throw new DOMException('full','QuotaExceededError');return original.call(this,k,v)};
   finish();
   return {old,now:localStorage.getItem(key)};
  }finally{Storage.prototype.setItem=original}
 });
 expect(before.now).toBe(before.old);
 await expect(page.locator('#lesson-reward-save-alert')).toContainText('저장하지 못했어요');
 await expect(page.locator('#lesson-reward-continue')).toBeDisabled();
 await page.getByRole('button',{name:'저장 다시 시도'}).click();
 await expect(page.locator('#lesson-reward-save-alert')).toHaveCount(0);
 await expect(page.locator('#lesson-reward-continue')).toBeEnabled();
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('meowde-v410-state')).done.includes(0))).toBe(true);
});
test('failed snapshot write keeps the active lesson and stored bytes',async({page})=>{
 await page.goto(base+'/');await ready(page);await select(page,0);
 // Capture the original bytes and inject the failure in the same browser task.
 // A separate page.evaluate() permits unrelated async saves to update savedAt
 // between the snapshot and quota injection, causing a false data-loss report.
 const observed=await page.evaluate(()=>{
  const key='meowde-v410-state',backup='meowde-v425-state-backup';
  const before=localStorage.getItem(key),beforeBackup=localStorage.getItem(backup);
  const counters=JSON.stringify({done:S.done,xp:S.xp,churu:S.churu});
  const originalSetItem=Storage.prototype.setItem;
  try{
   Storage.prototype.setItem=function(){throw new DOMException('Test quota','QuotaExceededError')};
   startLesson(59,false,null,{force:true});
   return {
    before,after:localStorage.getItem(key),
    beforeBackup,afterBackup:localStorage.getItem(backup),
    lessonIndex:S.lessonIndex,
    countersBefore:counters,countersAfter:JSON.stringify({done:S.done,xp:S.xp,churu:S.churu}),
    saveStatus:window.__MEOWDE_SAVE_STATUS__
   };
  }finally{Storage.prototype.setItem=originalSetItem;}
 });
 expect(observed.lessonIndex).toBe(0);
 expect(observed.after).toBe(observed.before);
 expect(observed.afterBackup).toBe(observed.beforeBackup);
 expect(observed.countersAfter).toBe(observed.countersBefore);
 expect(observed.saveStatus).toBe('failed');
 await expect(page.locator('.toast')).toContainText('저장');
});
test('switching a lesson around Smart Review preserves counters and grants its daily bonus once',async({page})=>{
 test.setTimeout(120000);
 await page.addInitScript(()=>{if(!sessionStorage.getItem('smart-integration-seed')){
  localStorage.setItem('meowde-v410-state',JSON.stringify({lang:'ko',done:[0],next:1,xp:17,churu:8}));
  // Preclaimed achievements keep their independent one-time bonuses out of
  // this Smart Review accounting fixture; all real grading/reward hooks run.
  const claimed=['first-step','daily-one','no-hints','five-correct','steady-paws','three-in-row','ten-in-row','fifty-correct','python-basics','master'];
  localStorage.setItem('meowde-v419-achievements',JSON.stringify({unlocked:Object.fromEntries(claimed.map(id=>[id,{unlockedAt:'2026-10-20T00:00:00Z',xp:0,churu:0}]))}));
  sessionStorage.setItem('smart-integration-seed','1');
 }});
 await page.goto(base+'/');await ready(page);
 async function openSmart(){
  await page.locator('.tabbar button').filter({hasText:/^복습$/}).click();
  await page.locator('.v417-smart-card .btn').click();
  if(await page.locator('.start-guard').count())await page.locator('.start-guard button').last().click();
 }
 await openSmart();
 const answer=await page.evaluate(()=>cur().answer);
 await page.locator('.choice').nth(answer).click();await page.locator('.lesson-foot .btn').click();
 await expect(page.locator('.feedback.ok')).toBeVisible();
 const active=await page.evaluate(()=>({active:MeowSmartReview.state.active,idx:S.idx,checked:S.checked,queue:S.queue}));
 await page.locator('.close').click();await select(page,59);
 await page.reload();await ready(page);await page.locator('.close').click();await openSmart();
 expect(await page.evaluate(()=>({active:MeowSmartReview.state.active,idx:S.idx,checked:S.checked,queue:S.queue}))).toEqual(active);
 async function complete(){
  for(let step=0;step<12&&await page.locator('.lesson-top').count();step++){
   if(await page.locator('.feedback.ok').count()){await page.locator('.feedback .btn').click();continue;}
   const ex=await page.evaluate(()=>({type:cur().type,answer:cur().answer,buggy:cur().buggy,tokens:cur().tokens,model:cur().model}));
   if(ex.type==='concept'){await page.locator('.lesson-foot .btn').click();continue;}
   if(ex.type==='predict')await page.locator('.choice').nth(ex.answer).click();
   if(ex.type==='fill')await page.locator('.token').nth(ex.tokens.indexOf(ex.answer)).click();
   if(ex.type==='bughunt')await page.locator('.linebtn').nth(ex.buggy).click();
   if(ex.type==='write')await page.locator('#code-editor').fill(ex.model);
   await page.locator('.lesson-foot .btn').click();await expect(page.locator('.feedback.ok')).toBeVisible({timeout:60000});
  }
  await expect(page.locator('.reward-screen')).toBeVisible();
 }
 await complete();
 expect(await page.evaluate(()=>({done:S.done,next:S.next,xp:S.xp,churu:S.churu}))).toEqual({done:[0],next:1,xp:27,churu:13});
 await page.locator('.lesson-foot .btn').click();await openSmart();await complete();
 expect(await page.evaluate(()=>({xp:S.xp,churu:S.churu}))).toEqual({xp:27,churu:13});
 await page.locator('.lesson-foot .btn').click();await select(page,59);
 expect(await page.evaluate(()=>({index:S.lessonIndex,idx:S.idx}))).toEqual({index:59,idx:0});
});


test('roadmap deep entry to lesson 60 preserves an unfinished earlier lesson',async({page})=>{
 await page.addInitScript(()=>{
  if(sessionStorage.getItem('roadmap-seeded'))return;
  localStorage.setItem('meowde-v410-state',JSON.stringify({lang:'ko',done:[],next:0,xp:17,churu:8}));
  sessionStorage.setItem('roadmap-seeded','1');
 });
 await page.goto(base+'/');await ready(page);await select(page,0);
 await page.locator('.lesson-foot .btn').click();
 const original=await page.evaluate(()=>({index:S.lessonIndex,idx:S.idx,queue:S.queue.map(e=>e.id),done:S.done.slice(),xp:S.xp,churu:S.churu}));
 await page.goto(base+'/learning-path.html');
 await expect(page.locator('#path-list a[href^="/?lesson="]')).toHaveCount(60);
 await page.locator('#path-list li').nth(59).locator('a').click();await ready(page);
 await expect(page.locator('.start-guard')).toBeVisible();
 expect(await page.evaluate(()=>({index:S.lessonIndex,done:S.done,xp:S.xp,churu:S.churu}))).toEqual({index:0,done:[],xp:17,churu:8});
 await page.locator('.start-guard button').last().click();
 await expect(page.locator('.lesson-top')).toBeVisible();
 expect(await page.evaluate(()=>({index:S.lessonIndex,done:S.done,xp:S.xp,churu:S.churu}))).toEqual({index:59,done:[],xp:17,churu:8});
 await page.goto(base+'/?lesson=start-field');await ready(page);
 await expect(page.locator('.start-guard')).toBeVisible();
 await page.locator('.start-guard button').last().click();
 expect(await page.evaluate(()=>({index:S.lessonIndex,idx:S.idx,queue:S.queue.map(e=>e.id),done:S.done.slice(),xp:S.xp,churu:S.churu}))).toEqual(original);
});

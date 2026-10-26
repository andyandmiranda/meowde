const {test,expect}=require('playwright/test');
const path=require('../assets/python-values-path.js');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';
const key='meowde-python-lab-v1';
const read=page=>page.evaluate(key=>JSON.parse(localStorage.getItem(key)).units.values.valuesPath,key);
async function seed(page,state,values={}){
 await page.addInitScript(({key,state,values})=>{
  if(sessionStorage.getItem('values-seed'))return;
  localStorage.setItem(key,JSON.stringify({version:1,units:{values:{...values,valuesPath:state},unknown:{custom:'keep'}}}));
  localStorage.setItem('meowde-v410-state','{"xp":77,"churu":120,"done":[0,1],"cat":"a"}');
  sessionStorage.setItem('values-seed','1');
 },{key,state,values});
}
test('new learners start with one selectable task, restore wrong answers and add a fresh easier variant',async({page})=>{
 await page.setViewportSize({width:320,height:740});
 await page.goto(base+'/python-lab.html');
 await expect(page.locator('.values-level')).toContainText('Lv.1');
 await expect(page.locator('#learner-code')).toHaveCount(0);
 await expect(page.getByRole('button',{name:'답 확인',exact:true})).toHaveCount(0);
 await page.locator('[data-answer="172"]').click();
 
 await expect(page.locator('#values-feedback')).toContainText('int');
 await page.reload();
 await expect(page.locator('[data-answer="172"]')).toHaveAttribute('aria-pressed','true');
 await page.locator('[data-answer="19"]').click();
 let state=await read(page);expect(state.items['0:1:0']).toMatchObject({firstAttemptPassed:false,attempts:2,independentPassed:false,lastPassedWithHelp:true});
 expect(path.count(state)).toBe(4);
 await page.getByRole('button',{name:'다음 연습',exact:true}).click();
 await expect(page.locator('#values-content pre')).toContainText('11 // 3');
 await page.reload();expect((await read(page)).index).toBe(1);
 const geometry=await page.locator('#values-content .values-options').evaluate(el=>({bottom:el.getBoundingClientRect().bottom,nav:document.querySelector('.meowde-lab-tabbar').getBoundingClientRect().top,width:document.documentElement.scrollWidth,viewport:innerWidth}));
 expect(geometry.width).toBeLessThanOrEqual(geometry.viewport);expect(geometry.bottom).toBeLessThan(geometry.nav);
});
test('existing coding draft resumes without any write, and the legacy URL stays usable',async({page})=>{
 const raw=JSON.stringify({version:1,units:{values:{draft:'saved function draft',guideLevel:4,assisted:true},unknown:{custom:'keep'}}});
 await page.addInitScript(({key,raw})=>localStorage.setItem(key,raw),{key,raw});
 await page.goto(base+'/python-lab.html#values');
 await expect(page.locator('#learner-code')).toHaveValue('saved function draft');
 expect(await page.evaluate(key=>localStorage.getItem(key),key)).toBe(raw);
 await page.goto(base+'/python-lab.html#values/challenge');
 await expect(page.locator('#learner-code')).toHaveValue('saved function draft');
});
test('quota failure preserves input and bytes; no submission or PWA reload is permitted automatically',async({page})=>{
 const state={...path.initial(),level:4};await seed(page,state,{draft:'old challenge draft'});
 await page.goto(base+'/python-lab.html');
 const original=await page.evaluate(key=>localStorage.getItem(key),key);
 await page.evaluate(key=>{const set=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k===key)throw new DOMException('full','QuotaExceededError');return set.call(this,k,v);};},key);
 await page.locator('#values-code').fill('count = int(text) # unsaved');
 await expect(page.locator('#storage-status')).toContainText('저장되지');
 expect(await page.evaluate(key=>localStorage.getItem(key),key)).toBe(original);
 expect(await page.evaluate(()=>MeowValuesPathSession.safeToReload())).toBe(false);
 await page.getByRole('link',{name:'학습으로 돌아가기'}).click();
 await expect(page).toHaveURL(/python-lab.html$/);
 await expect(page.locator('#values-code')).toHaveValue('count = int(text) # unsaved');
 expect((await read(page)).items).toEqual({});
});
test('unsupported nested progress stays byte-identical while session-only practice remains usable',async({page})=>{
 const raw=JSON.stringify({version:1,units:{values:{valuesPath:{version:99,secret:'keep'}}}});
 await page.addInitScript(({key,raw})=>localStorage.setItem(key,raw),{key,raw});
 await page.goto(base+'/python-lab.html');
 await page.locator('[data-answer="19"]').click();
 await expect(page.locator('#values-feedback')).toContainText('해결');
 await page.getByRole('button',{name:'다음 연습',exact:true}).click();
 expect(await page.evaluate(key=>localStorage.getItem(key),key)).toBe(raw);
});
test('running submission locks its draft until cancellation, without counting an attempt',async({page})=>{
 await seed(page,{...path.initial(),level:4});
 await page.addInitScript(()=>{window.Worker=class{postMessage(){}terminate(){}};});
 await page.goto(base+'/python-lab.html');
 await page.locator('#values-code').fill('count = int(text)');
 await page.getByRole('button',{name:'코드 확인',exact:true}).click();
 await expect(page.locator('#values-code')).toHaveAttribute('readonly','');
 await expect(page.getByRole('button',{name:'코드 확인',exact:true})).toBeDisabled();
 await page.getByRole('button',{name:'실행 중지',exact:true}).click();
 await expect(page.locator('#values-code')).toBeEditable();
 await expect(page.locator('#values-code')).toHaveValue('count = int(text)');
 expect((await read(page)).items['0:4:0'].attempts).toBeUndefined();
});
test('worker outage preserves attempt counts and draft',async({page})=>{
 await seed(page,{...path.initial(),level:4});
 await page.addInitScript(()=>{window.Worker=class{postMessage(){queueMicrotask(()=>this.onmessage({data:{stage:'error'}}));}terminate(){}};});
 await page.goto(base+'/python-lab.html');await page.locator('#values-code').fill('count = int(text)');
 await page.getByRole('button',{name:'코드 확인',exact:true}).click();
 await expect(page.locator('#values-feedback')).toContainText('시도 횟수는 그대로');
 expect((await read(page)).items['0:4:0'].attempts).toBeUndefined();
 await expect(page.locator('#values-code')).toHaveValue('count = int(text)');
});
test('real Python: all five stages, helped retry, independent transfer and delayed review preserve history',async({page})=>{
 test.skip(process.env.MEOWDE_VALUES_REAL!=='1','Real Pyodide runs in the existing function journey workflow');
 test.setTimeout(360000);
 await seed(page,path.initial(),{draft:'original legacy code',quizPassed:true,attempts:2});
 await page.setViewportSize({width:375,height:812});
 await page.goto(base+'/python-lab.html');
 let wrong=false;
 for(let guard=0;guard<35;guard++){
  const s=await read(page);if(s.complete)break;
  const q=path.question(s);
  if(q.type==='choice'){
   if(q.level===3&&!wrong){
    const wrongAnswer=q.choices.find(x=>x!==q.answer);
    await page.locator(`[data-answer="${wrongAnswer}"]`).click();
    
    await expect(page.locator('#values-feedback')).toContainText('다시 해봐요');wrong=true;
    await page.reload();await expect(page.locator(`[data-answer="${wrongAnswer}"]`)).toHaveAttribute('aria-pressed','true');
   }
   await page.locator(`[data-answer="${q.answer}"]`).click();
  }
  else{
   await page.locator('#values-code').fill(q.solution);
  }
  if(q.type==='code')await page.getByRole('button',{name:'코드 확인',exact:true}).click();
  await expect(page.locator('#values-action .primary')).toHaveText(/다음 연습|다음 단계|연습 마치기/,{timeout:150000});
  await page.locator('#values-action .primary').click();
 }
 const completed=await read(page);expect(completed.complete).toBe(true);
 expect(completed.items['0:3:0']).toMatchObject({attempts:2,firstAttemptPassed:false,lastPassedWithHelp:true,independentPassed:false});
 expect(completed.items['0:4:0'].independentPassed).toBe(true);
 expect(completed.items['0:5:0'].independentPassed).toBe(true);
 const old=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).units,key);
 expect(old.values.draft).toBe('original legacy code');expect(old.values.attempts).toBe(2);expect(old.unknown).toEqual({custom:'keep'});
 expect(await page.evaluate(()=>localStorage.getItem('meowde-v410-state'))).toBe('{"xp":77,"churu":120,"done":[0,1],"cat":"a"}');
 await page.reload();await expect(page.getByRole('button',{name:'새 문제로 기억 확인'})).toHaveCount(0);
 await page.clock.install({time:new Date(completed.reviewDueAt+1000)});await page.reload();
 await page.getByRole('button',{name:'새 문제로 기억 확인'}).click();
 const resumed=await read(page);expect(resumed.cycle).toBe(1);expect(resumed.level).toBe(4);expect(resumed.items).toEqual(completed.items);
});

const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';

test('organic first lesson retains the initial miss after retry, reload and course switching',async({page})=>{
 test.setTimeout(120000);
 await page.goto(base+'/');await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
 await page.getByRole('button',{name:'오늘 학습 시작'}).click();
 for(let step=0;step<10;step++){
  const ex=await page.evaluate(()=>({type:cur().type,answer:cur().answer,buggy:cur().buggy,tokens:cur().tokens}));
  if(ex.type==='write')break;
  if(ex.type==='concept'){await page.locator('.lesson-foot .btn').click();continue;}
  if(ex.type==='predict')await page.locator('.choice').nth(ex.answer).click();
  if(ex.type==='fill')await page.locator('.tokens .token').nth(ex.tokens.indexOf(ex.answer)).click();
  if(ex.type==='bughunt')await page.locator('.linebtn').nth(ex.buggy).click();
  await page.locator('.lesson-foot .btn').click();await expect(page.locator('.feedback.ok')).toBeVisible();await page.locator('.feedback .btn').click();
 }
 await page.locator('#code-editor').fill('print("틀림")');await page.locator('.lesson-foot .btn').click();
 await expect(page.locator('.feedback.no')).toContainText('야옹',{timeout:60000});await page.locator('.feedback .btn').click();
 expect(await page.evaluate(()=>cur().retry)).toBe(true);
 await page.locator('#code-editor').fill('print("야옹")');await page.reload();await expect(page.locator('#code-editor')).toHaveValue('print("야옹")');
 await page.getByRole('combobox',{name:'학습 과목'}).selectOption('linux');await page.locator('#guided-entry').click();
 await page.locator('#lesson-action').click();await page.locator('#lesson-action').click();await page.locator('#lesson-input').fill('mkdir tra');
 const linux=await page.evaluate(()=>localStorage.getItem('meowde-linux-guided-v1'));
 await page.getByRole('link',{name:'Linux 홈으로 돌아가기'}).click();
 await page.locator('.top a[href="/"]').click();await expect(page.locator('#code-editor')).toHaveValue('print("야옹")');
 await page.locator('.lesson-foot .btn').click();await expect(page.locator('.feedback.ok')).toBeVisible({timeout:60000});await page.locator('.feedback .btn').click();
 await expect(page.locator('.reward-screen')).toContainText('80%');await expect(page.locator('.reward-screen')).toContainText('첫 시도 정답률');
 expect(await page.evaluate(()=>localStorage.getItem('meowde-linux-guided-v1'))).toBe(linux);
 expect(await page.evaluate(()=>S.mistakes.some(m=>m.exerciseId==='start-field-w'))).toBe(true);
});

for(const lang of ['ko','en'])test('all 60 '+lang+' lessons can be completed through the shipped controls',async({page},testInfo)=>{
 test.skip(!process.env.MEOWDE_FULL_COURSE,'Opt-in full model-guided walkthrough; not an independent learner study.');
 test.setTimeout(900000);
 page.setDefaultTimeout(15000);
 await page.addInitScript(lang=>{if(!sessionStorage.getItem('qa-language-seeded')){localStorage.setItem('meowde-v410-state',JSON.stringify({lang,done:[],next:0,xp:0}));sessionStorage.setItem('qa-language-seeded','1');}},lang);
 // Only the initial language preference is seeded; all completion is earned through controls.
 await page.goto(base+'/');await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
 const record=[];
 await page.getByRole('button',{name:lang==='ko'?'오늘 학습 시작':'Start learning',exact:true}).click();
 for(let lesson=0;lesson<60;lesson++){
  const current=await page.evaluate(()=>({index:S.lessonIndex,slug:lessons()[S.lessonIndex].slug}));expect(current.index).toBe(lesson);
  let questions=0;
  while(await page.locator('.lesson-top').count()){
   if(++questions>10)throw Error('Unexpected retry loop at '+current.slug);
   const ex=await page.evaluate(()=>({id:cur().id,type:cur().type,answer:cur().answer,buggy:cur().buggy,tokens:cur().tokens,model:cur().model}));
   if(ex.type==='concept'){await page.locator('.lesson-foot .btn').click();continue;}
   if(ex.type==='predict')await page.locator('.choice').nth(ex.answer).click();
   if(ex.type==='fill')await page.locator('.tokens .token').nth(ex.tokens.indexOf(ex.answer)).click();
   if(ex.type==='bughunt')await page.locator('.linebtn').nth(ex.buggy).click();
   if(ex.type==='write')await page.locator('#code-editor').fill(ex.model);
   await page.locator('.lesson-foot .btn').click();await expect(page.locator('.feedback.ok'),lang+':'+ex.id).toBeVisible({timeout:60000});await page.locator('.feedback .btn').click();
  }
  await expect(page.locator('.reward-screen')).toContainText('100%');record.push({...current,questions,status:'PASS'});
  if((lesson+1)%10===0)console.log(lang+' walkthrough: '+(lesson+1)+'/60 completed');
  if(lesson<59){
   await page.locator('.lesson-foot .btn').click();
   if([9,29,49].includes(lesson)){
    await page.reload();await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
    expect(await page.evaluate(()=>S.done.length)).toBe(lesson+1);await page.locator('.tabbar button').nth(1).click();
   }
   await page.locator('.unit-tabs button').nth(Math.floor((lesson+1)/10)).click();await page.locator('.node.current').click();
  }
 }
 expect(await page.evaluate(()=>S.done.length)).toBe(60);
 require('node:fs').writeFileSync(testInfo.outputPath('course-walkthrough.json'),JSON.stringify({language:lang,method:'model-guided browser controls; no independent mastery claim',lessons:record},null,2));
});

test('a total beginner can revisit the taught concept and code without leaving a question',async({page})=>{
 await page.goto(base+'/');await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
 await page.getByRole('button',{name:'오늘 학습 시작'}).click();
 await expect(page.locator('.lesson-main h3')).toContainText('코드 첫 문장');
 await page.locator('.lesson-foot .btn').click();
 const before=await page.evaluate(()=>({id:cur().id,step:S.idx,progress:(()=>{const state=JSON.parse(localStorage.getItem('meowde-v410-state'));delete state.savedAt;return state;})()}));
 const guide=page.locator('[data-inline-concept]');
 await expect(guide).toBeVisible();
 await guide.locator('summary').click();
 await expect(guide).toContainText('print()');
 expect(await page.evaluate(()=>({id:cur().id,step:S.idx,progress:(()=>{const state=JSON.parse(localStorage.getItem('meowde-v410-state'));delete state.savedAt;return state;})()}))).toEqual(before);
 await expect(page.locator('.lesson-top')).toBeVisible();
});

test('a wrong answer can reveal the expected solution and explanation without changing retry state',async({page})=>{
 await page.goto(base+'/');await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
 await page.getByRole('button',{name:'오늘 학습 시작'}).click();
 await page.locator('.lesson-foot .btn').click();
 const correct=await page.evaluate(()=>cur().answer);
 await page.locator('.choice').nth(correct===0?1:0).click();
 await page.locator('.lesson-foot .btn').click();
 await expect(page.locator('.feedback.no')).toBeVisible();
 const before=await page.evaluate(()=>({idx:S.idx,correct:S.correct,checked:S.checked,storage:localStorage.getItem('meowde-v410-state')}));
 const answer=page.locator('[data-answer-review]');
 await expect(answer).toBeVisible();await answer.locator('summary').click();
 await expect(answer).toContainText('안녕');
 expect(await page.evaluate(()=>({idx:S.idx,correct:S.correct,checked:S.checked,storage:localStorage.getItem('meowde-v410-state')}))).toEqual(before);
});

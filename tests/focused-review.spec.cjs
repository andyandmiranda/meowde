const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';

test('Python focus pilot keeps the original miss through concept, similar, application and check',async({page})=>{
 test.setTimeout(180000);
 page.setDefaultTimeout(15000);
 await page.setViewportSize({width:320,height:844});
 await page.goto(base+'/');await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
 await page.getByRole('button',{name:/배우기 시작|이어서 배우기|오늘 학습 시작/}).click();
 await page.evaluate(()=>{S.queue=[{...lessons()[0].exercises.find(e=>e.type==='write')}];S.idx=0;S.firstTotal=1;S.firstCorrect=0;S.checked=false;S.write='';renderLesson();});
 await page.locator('#code-editor').fill('print("wrong")');await page.locator('.lesson-foot .btn').click();await expect(page.locator('.feedback.no')).toBeVisible({timeout:60000});await page.locator('.feedback .btn').click();
 await page.locator('#code-editor').fill('print("야옹")');await page.locator('.lesson-foot .btn').click();await expect(page.locator('.feedback.ok')).toBeVisible();await page.locator('.feedback .btn').click();
 const before=await page.evaluate(()=>({xp:S.xp,done:S.done.slice(),first:MeowPythonFocusedReview.history.state.records[0].firstMissedAt,linux:localStorage.getItem('meowde-linux-focused-review-v1')}));
 console.log('Python focus: future miss and retry recorded');
 await page.locator('.lesson-foot .btn').click();await page.locator('.tabbar button').nth(2).click();
 await page.locator('[data-focused-review] summary').click();await page.locator('[data-focused-review] button').click();
 console.log('Python focus: pilot started');
 expect(await page.evaluate(()=>cur().focusStage)).toBe('missed');
 await page.locator('#code-editor').fill('print("야옹")');await page.locator('.lesson-foot .btn').click();await expect(page.locator('.feedback.ok')).toBeVisible();await page.locator('.feedback .btn').click();
 await expect(page.locator('.card')).toContainText('코드');await page.locator('.lesson-foot .btn').click();
 await page.locator('.choice').first().click();await page.locator('.lesson-foot .btn').click();await page.locator('.feedback .btn').click();
 await page.reload();await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');expect(await page.evaluate(()=>cur().focusStage)).toBe('application');
 await page.locator('#code-editor').fill('print("Hello")');await page.locator('.lesson-foot .btn').click();await expect(page.locator('.feedback.no')).toBeVisible({timeout:60000});await expect(page.locator('[data-focus-answer]')).toContainText('MEOWDE');await page.locator('.feedback .btn').click();
 await page.getByRole('button',{name:'print',exact:true}).click();await page.locator('.lesson-foot .btn').click();await page.locator('.feedback .btn').click();
 await page.locator('#code-editor').fill('print("Hello")\nprint("MEOWDE")');await page.locator('.lesson-foot .btn').click();await expect(page.locator('.feedback.ok')).toBeVisible();await page.locator('.feedback .btn').click();
 await expect(page.locator('.reward-screen h2')).toHaveText('집중 복습 완료');
 const after=await page.evaluate(()=>({xp:S.xp,done:S.done.slice(),record:MeowPythonFocusedReview.history.state.records[0],linux:localStorage.getItem('meowde-linux-focused-review-v1')}));
 expect(after.xp).toBe(before.xp);expect(after.done).toEqual(before.done);expect(after.linux).toBe(before.linux);expect(after.record.firstMissedAt).toBe(before.first);
 expect(after.record.stages.application).toMatchObject({firstCorrect:false,passed:true,assisted:true});expect(after.record.stages.check.passed).toBe(true);
 expect(JSON.stringify(after.record)).not.toContain('print(');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('English focused review uses English copy and the same real Python grading',async({page})=>{
 test.setTimeout(120000);page.setDefaultTimeout(15000);
 await page.addInitScript(()=>localStorage.setItem('meowde-v410-state',JSON.stringify({lang:'en',done:[],next:0,xp:0})));
 await page.goto(base+'/');await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
 await page.evaluate(()=>{MeowPythonFocusedReview.history.attempt({lessonId:'start-field',exerciseId:'start-field-w',lang:'en',correct:false});renderReview();});
 await expect(page.locator('[data-focused-review]')).toContainText('Extra review');await page.locator('[data-focused-review] button').click();
 for(let i=0;i<5;i++){
  const ex=await page.evaluate(()=>({type:cur().type,model:cur().model,answer:cur().answer,tokens:cur().tokens,prompt:cur().prompt||cur().body}));
  expect(ex.prompt).not.toMatch(/[가-힣]/);
  if(ex.type==='concept'){await page.locator('.lesson-foot .btn').click();continue;}
  if(ex.type==='write')await page.locator('#code-editor').fill(ex.model);
  if(ex.type==='predict')await page.locator('.choice').nth(ex.answer).click();
  if(ex.type==='fill')await page.locator('.token').nth(ex.tokens.indexOf(ex.answer)).click();
  await page.locator('.lesson-foot .btn').click();await expect(page.locator('.feedback.ok')).toBeVisible({timeout:60000});await page.locator('.feedback .btn').click();
 }
 await expect(page.locator('.reward-screen h2')).toHaveText('Focused review complete');expect(await page.evaluate(()=>S.xp)).toBe(0);expect(await page.evaluate(()=>S.done)).toEqual([]);
});

test('Linux focus pilot resumes stages, accepts state-equivalent commands and preserves legacy records',async({page})=>{
 await page.setViewportSize({width:320,height:844});
 await page.goto(base+'/linux-start.html');await page.locator('#lesson-action').click();await page.locator('#lesson-action').click();
 await page.locator('#lesson-input').fill('pwd');await page.locator('#lesson-action').click();
 await page.locator('#lesson-input').fill('mkdir training');await page.locator('#lesson-action').click();
 const before=await page.evaluate(()=>({legacy:localStorage.getItem('meowde-linux-guided-v1'),python:localStorage.getItem('meowde-v410-state'),record:JSON.parse(localStorage.getItem('meowde-linux-focused-review-v1')).records[0]}));
 await page.goto(base+'/linux-review.html');await page.getByRole('button',{name:'복습 시작 · 이어하기'}).click();
 await page.locator('#focus-input').fill('mkdir ./training');await page.locator('#focus-action').click();await page.locator('#focus-action').click();
 await expect(page.locator('#focus-title')).toContainText('왜 그럴까?');await page.locator('#focus-action').click();
 await page.locator('#focus-input').fill('mkdir photos');await page.locator('#focus-action').click();await page.locator('#focus-action').click();
 await page.reload();await page.getByRole('button',{name:'복습 시작 · 이어하기'}).click();await expect(page.locator('#focus-title')).toContainText('직접 써보기');
 await page.locator('#focus-input').fill('touch projects/travel');await page.locator('#focus-action').click();await expect(page.locator('#focus-feedback')).toContainText('아직 목표 폴더가 없어요');
 await page.locator('#focus-input').fill('mkdir projects/travel');await page.locator('#focus-action').click();await page.locator('#focus-action').click();
 await page.locator('#focus-input').fill('mkdir /home/student/projects/notes');await page.locator('#focus-action').click();await page.locator('#focus-action').click();
 await expect(page.locator('#focus-list')).toContainText('복습 완료');
 const after=await page.evaluate(()=>({legacy:localStorage.getItem('meowde-linux-guided-v1'),python:localStorage.getItem('meowde-v410-state'),record:JSON.parse(localStorage.getItem('meowde-linux-focused-review-v1')).records[0]}));
 expect(after.legacy).toBe(before.legacy);expect(after.python).toBe(before.python);expect(after.record.firstMissedAt).toBe(before.record.firstMissedAt);expect(after.record.stages.application).toMatchObject({firstCorrect:false,passed:true,assisted:true});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

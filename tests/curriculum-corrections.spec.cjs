const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';

for(const lang of ['ko','en']){
 test(`comparison fill has exactly one True-producing choice (${lang})`,async({page})=>{
  test.setTimeout(120000);
  await page.goto(base+'/');
  await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
  const result=await page.evaluate(async lang=>{
   S.lang=lang;
   const ex=lessons().find(l=>l.slug==='compare-gate').exercises.find(e=>e.id==='compare-gate-f');
   S.queue=[ex];S.idx=0;S.checked=false;S.fill='';
   const outputs=[];
   for(const token of ex.tokens)outputs.push({token,output:(await runPython(ex.code.replace('____',token))).trim()});
   renderLesson();
   return {answer:ex.answer,outputs};
  },lang);
  expect(result.outputs.filter(r=>r.output==='True').map(r=>r.token)).toEqual([result.answer]);
  await page.getByRole('button',{name:result.answer,exact:true}).click();
  await page.locator('.lesson-foot .btn').click();
  await expect(page.locator('.feedback.ok')).toBeVisible();
 });

 test(`elif task states all three grade ranges and model handles boundaries (${lang})`,async({page})=>{
  test.setTimeout(120000);
  await page.goto(base+'/');
  await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
  const result=await page.evaluate(async lang=>{
   S.lang=lang;
   const ex=lessons().find(l=>l.slug==='elif-mushroom').exercises.find(e=>e.id==='elif-mushroom-w');
   S.queue=[ex];S.idx=0;
   const outputs=[];
   for(const score of [69,70,89,90,95])outputs.push((await runPython(ex.model.replace('score = 75','score = '+score))).trim());
   renderLesson();
   return {prompt:ex.prompt,outputs};
  },lang);
  for(const text of ['90','70','A','B','C'])expect(result.prompt).toContain(text);
  expect(result.outputs).toEqual(['C','B','B','A','A']);
 });

 test(`list syntax hints and quoted starter remain accurate without awarding credit (${lang})`,async({page})=>{
  await page.goto(base+'/');
  await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
  for(const [slug,id] of [['index-tower','index-tower-b'],['append-dock','append-dock-b'],['append-dock','append-dock-w']]){
   const before=await page.evaluate(({lang,slug,id})=>{
    S.lang=lang;
    const index=lessons().findIndex(l=>l.slug===slug);
    S.queue=[{...lessons()[index].exercises.find(e=>e.id===id),__meowdeLessonIndex:index}];
    S.lessonIndex=index;S.idx=0;S.hint=false;S.checked=false;S.sel=null;S.loading=false;renderLesson();save();
    const state=JSON.parse(localStorage.getItem('meowde-v410-state'));delete state.savedAt;
    return state;
   },{lang,slug,id});
   await page.locator('[data-coach-hint]').click();
   const extra=page.locator('[data-hint-step]');
   await expect(extra).toContainText(id.endsWith('-w')?'snacks = []':lang==='ko'?'괄호':'parentheses');
   if(id.endsWith('-b'))await expect(page.locator('.hint')).toContainText(lang==='ko'?'여는 괄호':'opening');
   const after=await page.evaluate(()=>{
    const state=JSON.parse(localStorage.getItem('meowde-v410-state'));delete state.savedAt;
    return {state,checked:S.checked};
   });
   expect(after.checked).toBe(false);
   // Requesting a hint is persisted; every other saved progress/reward field must stay intact.
   before.inProgress.hint=true;
   expect(after.state).toEqual(before);
  }
 });
}

test('corrected file-lines solution counts each non-empty line once in both languages',async({page})=>{
 test.setTimeout(120000);
 await page.goto(base+'/');
 await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
 const results=await page.evaluate(async()=>{
  const results=[];
  for(const lang of ['ko','en']){
   S.lang=lang;
   const ex=lessons().find(l=>l.slug==='file-lines').exercises.find(e=>e.id==='file-lines-b');
   S.queue=[ex];S.idx=0;
   const fixed=ex.lines.slice();fixed[ex.buggy]=ex.fixed;
   for(const [lines,expected] of [[[],0],[['\n','  \n'],0],[['a\n','\n','b\n'],2],[['a','b','c'],3]]){
    const source='file = '+JSON.stringify(lines)+'\n'+fixed.join('\n')+'\nprint(count)';
    results.push({lang,expected,actual:await runPython(source)});
   }
  }
  return results;
 });
 for(const result of results)expect(result.actual,result.lang).toBe(String(result.expected));
});

test('in-flight and already checked Python submissions cannot duplicate credit',async({page})=>{
 await page.goto(base+'/');await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
 await page.getByRole('button',{name:'오늘 학습 시작'}).click();
 await page.evaluate(()=>{
  S.queue=[{...lessons()[0].exercises.find(e=>e.type==='write')}];S.idx=0;S.checked=false;S.loading=false;S.firstCorrect=0;S.firstTotal=1;S.xpEarned=0;S.combo=0;
  window.qaRuns=0;runPython=()=>{qaRuns++;return new Promise(resolve=>window.qaResolve=resolve);};renderLesson();
 });
 await page.locator('#code-editor').fill('print("야옹")');await page.locator('.lesson-foot .btn').click();
 await expect(page.locator('.lesson-foot .btn')).toBeDisabled();
 await page.evaluate(async()=>{await checkQ();qaResolve('야옹');});
 await expect(page.locator('.feedback.ok')).toBeVisible();await page.evaluate(()=>checkQ());
 expect(await page.evaluate(()=>({runs:qaRuns,first:S.firstCorrect,xp:S.xpEarned}))).toEqual({runs:1,first:1,xp:10});
});

test('Linux quiz links open the matching practice and disclose theory-only units',async({page})=>{
 await page.goto(base+'/linux-crash-course.html');
 await page.locator('#nav button').nth(1).click();
 await page.locator('#lesson .answers button').first().click();
 await page.locator('[data-quiz-guide]').click();
 await expect(page.locator('#sim-goal')).toContainText('마지막 두 줄');
 await page.locator('#sim-input').fill('head -n 2 app.log');await page.locator('#sim-run').click();await page.locator('#sim-check').click();
 await expect(page.locator('#sim-next')).toBeHidden();
 await page.locator('#sim-input').fill('tail -n 2 app.log');await page.locator('#sim-run').click();await page.locator('#sim-check').click();
 await expect(page.locator('#sim-next')).toBeVisible();await page.locator('#sim-next').click();
 await expect(page.locator('#cond-case')).toBeVisible();
 await page.locator('#library-mode').selectOption('concept');
 await page.locator('#nav button').nth(4).click();await page.locator('#lesson .answers button').first().click();
 await expect(page.locator('[data-quiz-guide]')).toBeDisabled();await expect(page.locator('[data-quiz-guide]')).toContainText('개념 퀴즈만');
 await page.locator('#nav button').nth(7).click();await page.locator('#lesson .answers button').first().click();await page.locator('[data-quiz-guide]').click();await expect(page.locator('#cond-case')).toBeVisible();
});

test('unreadable Python and Linux quiz progress is preserved after opening or answering',async({page})=>{
 await page.goto(base+'/linux-home.html');
 const raw='{broken-record';
 await page.evaluate(raw=>{
  localStorage.setItem('meowde-v410-state',raw);
  localStorage.setItem('meowde-v425-state-backup','existing backup');
  localStorage.setItem('meowde-linux-cram-v1',raw);
 },raw);
 await page.goto(base+'/');
 await expect(page.locator('#status')).toContainText('원본 기록은 그대로 보존');
 expect(await page.evaluate(()=>localStorage.getItem('meowde-v410-state'))).toBe(raw);
 expect(await page.evaluate(()=>localStorage.getItem('meowde-v425-state-backup'))).toBe('existing backup');
 await page.goto(base+'/linux-crash-course.html');
 await page.locator('#lesson .answers button').first().click();
 await expect(page.locator('#library-storage-status')).toContainText('원본은 보존');
 expect(await page.evaluate(()=>localStorage.getItem('meowde-linux-cram-v1'))).toBe(raw);
});

test('the simplified Linux home preserves existing Python progress without extra subject overview',async({page})=>{
 await page.goto(base+'/linux-home.html');
 const before=JSON.stringify({done:[0],inProgress:{queue:[{id:'saved'}],idx:0,lessonIndex:1}});
 await page.evaluate(value=>localStorage.setItem('meowde-v410-state',value),before);
 await page.reload();
 await expect(page.locator('.meowde-subject-overview')).toHaveCount(0);
 await expect(page.locator('#guided-entry')).toBeVisible();
 expect(await page.evaluate(()=>localStorage.getItem('meowde-v410-state'))).toBe(before);
});

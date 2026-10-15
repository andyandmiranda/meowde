const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';

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

test('the overview recognizes the shipped nested in-progress shape without changing records',async({page})=>{
 await page.goto(base+'/linux-home.html');
 const before=JSON.stringify({done:[0],inProgress:{queue:[{id:'saved'}],idx:0,lessonIndex:1}});
 await page.evaluate(value=>localStorage.setItem('meowde-v410-state',value),before);
 await page.reload();
 await expect(page.locator('.meowde-subject-overview')).toContainText('1개 레슨 완료 · 이어하기');
 expect(await page.evaluate(()=>localStorage.getItem('meowde-v410-state'))).toBe(before);
});

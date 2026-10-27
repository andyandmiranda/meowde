const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';

test('reporting is opt-in; snapshot excludes answers and preserves Python state',async({page})=>{
 await page.setViewportSize({width:320,height:844});
 await page.goto(base+'/');await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
 await page.getByRole('button',{name:'학습 시작하기'}).click();
 await expect(page.locator('[data-tester-report]')).toHaveCount(0);
 await page.goto(base+'/?tester=1&private=DO_NOT_COPY');
 await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
 await page.evaluate(()=>{
  S.queue=[{...lessons()[0].exercises.find(e=>e.type==='write'),retry:true}];S.idx=0;
  S.write='PRIVATE_LEARNER_CODE';S.output='PRIVATE_LEARNER_OUTPUT';S.hint=true;S.checked=true;S.correct=false;save();renderLesson();
  Object.defineProperty(navigator,'clipboard',{value:{writeText:async value=>{window.copiedReport=value;}},configurable:true});
 });
 const before=await page.evaluate(()=>localStorage.getItem('meowde-v410-state'));
 const requests=[];page.on('request',r=>{if(r.method()!=='GET')requests.push(r.url());});
 await page.locator('.tester-report-details').click();
 await expect(page.getByRole('dialog')).toBeVisible();
 await page.locator('#tester-report-category').selectOption('grading');
 await page.locator('#tester-report-note').fill('테스트 메모');
 const raw=await page.locator('#tester-report-preview').inputValue(),draft=JSON.parse(raw);
 expect(draft.exerciseId).toBe('start-field-w');expect(draft.category).toBe('grading');expect(draft.subject).toBe('python');
 expect(draft.note).toBe('테스트 메모');expect(draft.visibleHint).not.toBe('');
 expect(raw).not.toContain('PRIVATE_LEARNER');expect(raw).not.toContain('DO_NOT_COPY');expect(draft.url).toBe(base+'/');
 await page.getByRole('button',{name:'초안 복사',exact:true}).click();
 expect(await page.evaluate(()=>copiedReport)).toBe(raw);
 await page.getByRole('button',{name:'닫기',exact:true}).click();await expect(page.locator('[data-tester-report]')).toBeFocused();
 const after=JSON.parse(await page.evaluate(()=>localStorage.getItem('meowde-v410-state'))),saved=JSON.parse(before);
 // Existing delayed autosave may update its timestamp; every learning field must be identical.
 delete after.savedAt;delete saved.savedAt;expect(after).toEqual(saved);expect(requests).toEqual([]);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('Linux snapshots use the current question and clipboard denial leaves a usable draft',async({page})=>{
 await page.setViewportSize({width:320,height:844});
 await page.goto(base+'/linux-start.html?tester=1');
 await page.locator('#lesson-action').click();await page.locator('#lesson-action').click();
 await page.locator('#lesson-input').fill('PRIVATE_COMMAND');
 const before=await page.evaluate(()=>localStorage.getItem('meowde-linux-guided-v1'));
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{value:{writeText:async()=>{throw Error('denied');}},configurable:true}));
 await page.locator('.tester-report-details').click();
 const raw=await page.locator('#tester-report-preview').inputValue(),draft=JSON.parse(raw);
 expect(draft.exerciseId).toBe('mkdir-intro-step-2');expect(raw).not.toContain('PRIVATE_COMMAND');
 await page.getByRole('button',{name:'초안 복사',exact:true}).click();await expect(page.getByRole('dialog')).toContainText('직접 복사');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.keyboard.press('Escape');
 expect(await page.evaluate(()=>localStorage.getItem('meowde-linux-guided-v1'))).toBe(before);
 await page.goto(base+'/linux-crash-course.html?tester=1');
 await page.evaluate(()=>document.querySelectorAll('#nav button')[2].click());await page.locator('.tester-report-details').click();
 expect(JSON.parse(await page.locator('#tester-report-preview').inputValue()).exerciseId).toBe('linux-e3-quiz');
});

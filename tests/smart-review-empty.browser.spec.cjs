const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';

test('new learners do not receive unseen smart-review tasks',async({page})=>{
  await page.setViewportSize({width:375,height:740});
  await page.goto(base+'/');
  await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
  await page.evaluate(()=>{
    S.done=[];S.mistakes=[];S.next=0;save();
    renderReview();
  });
  const card=page.locator('.v417-smart-card');
  await expect(card).toBeVisible();
  await expect(card).toContainText('아직 복습할 문제가 없어요');
  await expect(card.locator('.v417-smart-head .pill')).toHaveText('0문제');
  await expect(card.getByRole('button',{name:/학습 후 복습 가능/})).toBeDisabled();
  expect(await page.evaluate(()=>MeowSmartReview.recommendations().length)).toBe(0);
  await page.reload();
  await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
  await page.evaluate(()=>renderReview());
  await expect(page.locator('.v417-smart-card button')).toBeDisabled();
});

test('smart review unlocks from completed lessons without altering course progress',async({page})=>{
  await page.goto(base+'/');
  await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
  const before=await page.evaluate(()=>{
    S.done=[0];S.mistakes=[];save();renderReview();
    return {done:S.done.slice(),xp:S.xp,next:S.next};
  });
  const card=page.locator('.v417-smart-card');
  await expect(card).toContainText('완료한 레슨에서 기억을 유지할 문제');
  await expect(card.getByRole('button',{name:/Smart Review 시작/})).toBeEnabled();
  expect(await page.evaluate(()=>MeowSmartReview.recommendations().every(x=>x.lessonIndex===0))).toBe(true);
  const after=await page.evaluate(()=>({done:S.done.slice(),xp:S.xp,next:S.next}));
  expect(after).toEqual(before);
});

test('smart review availability survives reload without changing saved progress',async({page})=>{
  await page.setViewportSize({width:375,height:740});
  await page.goto(base+'/');
  await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
  const before=await page.evaluate(()=>{
    S.done=[0];S.mistakes=[];
    // Settle the first-step achievement before snapshotting persisted rewards.
    MeowAchievements.evaluate(false);save();renderReview();
    return JSON.parse(localStorage.getItem('meowde-v410-state'));
  });
  await expect(page.locator('.v417-smart-card').getByRole('button',{name:/Smart Review 시작/})).toBeEnabled();
  await page.reload();
  await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
  await page.evaluate(()=>renderReview());
  await expect(page.locator('.v417-smart-card').getByRole('button',{name:/Smart Review 시작/})).toBeEnabled();
  const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('meowde-v410-state')));
  expect(after.done).toEqual(before.done);
  expect(after.next).toBe(before.next);
  expect(after.mistakes).toEqual(before.mistakes);
  expect(after.xp).toBe(before.xp);
  expect(after.churu).toBe(before.churu);
});

test('learner completes a lesson, starts Smart Review, and preserves course progress',async({page})=>{
  test.setTimeout(180000);
  page.setDefaultTimeout(15000);
  await page.setViewportSize({width:375,height:740});
  await page.goto(base+'/');
  await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');

  // Earn completion through shipped controls; do not seed S.done.
  await page.getByRole('button',{name:'오늘 학습 시작'}).click();
  for(let step=0;step<12;step++){
    if(!(await page.locator('.lesson-top').count()))break;
    const ex=await page.evaluate(()=>({type:cur().type,answer:cur().answer,buggy:cur().buggy,tokens:cur().tokens,model:cur().model}));
    if(ex.type==='concept')await page.locator('.lesson-foot .btn').click();
    else{
      if(ex.type==='predict')await page.locator('.choice').nth(ex.answer).click();
      if(ex.type==='fill')await page.locator('.tokens .token').nth(ex.tokens.indexOf(ex.answer)).click();
      if(ex.type==='bughunt')await page.locator('.linebtn').nth(ex.buggy).click();
      if(ex.type==='write')await page.locator('#code-editor').fill(ex.model);
      await page.locator('.lesson-foot .btn').click();
      await expect(page.locator('.feedback.ok')).toBeVisible({timeout:60000});
      await page.locator('.feedback .btn').click();
    }
  }
  await expect(page.locator('.reward-screen')).toBeVisible({timeout:60000});
  const course=await page.evaluate(()=>({done:S.done.slice(),next:S.next,xp:S.xp,churu:S.churu}));
  expect(course.done).toContain(0);

  await page.locator('.lesson-foot .btn').click();
  await page.locator('.tabbar button[aria-label="복습"]').click();
  const card=page.locator('.v417-smart-card');
  await expect(card).toContainText('완료한 레슨에서 기억을 유지할 문제');
  await card.getByRole('button',{name:/Smart Review 시작/}).click();

  for(let step=0;step<8;step++){
    if(!(await page.locator('.lesson-top').count()))break;
    const ex=await page.evaluate(()=>({type:cur().type,answer:cur().answer,buggy:cur().buggy,tokens:cur().tokens,model:cur().model}));
    if(ex.type==='concept')await page.locator('.lesson-foot .btn').click();
    else{
      if(ex.type==='predict')await page.locator('.choice').nth(ex.answer).click();
      if(ex.type==='fill')await page.locator('.tokens .token').nth(ex.tokens.indexOf(ex.answer)).click();
      if(ex.type==='bughunt')await page.locator('.linebtn').nth(ex.buggy).click();
      if(ex.type==='write')await page.locator('#code-editor').fill(ex.model);
      await page.locator('.lesson-foot .btn').click();
      await expect(page.locator('.feedback.ok')).toBeVisible({timeout:60000});
      await page.locator('.feedback .btn').click();
    }
  }
  await expect(page.locator('.reward-screen h2')).toHaveText('Smart Review 완료');
  await page.reload();
  await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
  const after=await page.evaluate(()=>({done:S.done.slice(),next:S.next,xp:S.xp,churu:S.churu}));
  expect(after).toEqual({...course,xp:course.xp+10,churu:course.churu+5});
});

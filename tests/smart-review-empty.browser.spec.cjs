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
    S.done=[0];S.mistakes=[];save();renderReview();
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
  expect(after.xp).toBeGreaterThanOrEqual(before.xp);
});

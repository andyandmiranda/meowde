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
  await page.getByRole('button',{name:'학습 시작하기'}).click();
  for(let step=0;step<12;step++){
    if(!(await page.locator('.lesson-top').count()))break;
    const ex=await page.evaluate(()=>({type:cur().type,answer:cur().answer,buggy:cur().buggy,tokens:cur().tokens,model:cur().model}));
    if(ex.type==='concept')await page.locator('.lesson-foot .btn').click();
    else{
      if(ex.type==='predict')await page.locator('.choice').nth(ex.answer).click();
      if(ex.type==='fill')await page.locator('.tokens .token').nth(ex.tokens.indexOf(ex.answer)).click();
      if(ex.type==='bughunt')await page.locator('.linebtn').nth(ex.buggy).click();
      if(ex.type==='write')await page.locator('#code-editor').fill(ex.model);
      if(!(await page.locator('.feedback.ok').count()))await page.locator('.lesson-foot .btn').click();
      await expect(page.locator('.feedback.ok')).toBeVisible({timeout:60000});
      await page.locator('.feedback .btn').click();
    }
  }
  await expect(page.locator('.reward-screen')).toBeVisible({timeout:60000});
  const course=await page.evaluate(()=>({done:S.done.slice(),next:S.next,xp:S.xp,churu:S.churu}));
  expect(course.done).toContain(0);

  await page.locator('.lesson-foot .btn').click();
  await page.locator('.learn-review-entry button').click();
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
      if(!(await page.locator('.feedback.ok').count()))await page.locator('.lesson-foot .btn').click();
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

for(const denyRead of [false,true]){
  test('Smart Review preserves '+(denyRead?'unreadable':'corrupt')+' history and keeps regular lessons available',async({page})=>{
    const key='meowde-v417-review';
    const raw=denyRead?'{"days":{"2026-10-20":{"xp":10,"churu":5}},"history":[]}':'{broken';
    await page.goto(base+'/');
    await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
    const before=await page.evaluate(({key,raw})=>{
      S.done=[0];S.next=1;MeowAchievements.evaluate(false);save();
      localStorage.setItem(key,raw);
      return {xp:S.xp,churu:S.churu,done:S.done.slice(),next:S.next};
    },{key,raw});
    if(denyRead)await page.addInitScript(key=>{
      const original=Storage.prototype.getItem;
      window.__qaReadReview=()=>original.call(localStorage,key);
      Storage.prototype.getItem=function(k){
        if(k===key)throw new DOMException('blocked','SecurityError');
        return original.call(this,k);
      };
    },key);
    await page.reload();
    await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
    await page.locator('.learn-review-entry button').click();
    const card=page.locator('.v417-smart-card');
    await expect(card).toContainText('원본을 보존');
    await expect(card.getByRole('button',{name:'복습 기록 확인 필요'})).toBeDisabled();
    await page.evaluate(()=>startSmartReview());
    expect(await page.evaluate(()=>({xp:S.xp,churu:S.churu,done:S.done.slice(),next:S.next}))).toEqual(before);
    expect(await page.evaluate(key=>window.__qaReadReview?window.__qaReadReview():localStorage.getItem(key),key)).toBe(raw);
    await page.locator('.tabbar button[aria-label="홈"]').click();
    await page.getByRole('button',{name:'학습 시작하기'}).click();
    await expect(page.locator('.lesson-top')).toBeVisible();
    expect(await page.evaluate(key=>window.__qaReadReview?window.__qaReadReview():localStorage.getItem(key),key)).toBe(raw);
  });
}


for(const errorName of ['QuotaExceededError','SecurityError']){
  test('mobile Smart Review write denial ('+errorName+') preserves rewards and prior bytes',async({page})=>{
    await page.setViewportSize({width:375,height:740});
    await page.goto(base+'/');
    await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
    const before=await page.evaluate(errorName=>{
      S.done=[0];S.next=1;MeowAchievements.evaluate(false);save();
      const key='meowde-v417-review';
      const original=localStorage.getItem(key);
      const xp=S.xp,churu=S.churu;
      const set=Storage.prototype.setItem;
      Storage.prototype.setItem=function(k,v){
        if(k===key)throw new DOMException('blocked',errorName);
        return set.call(this,k,v);
      };
      return {original,xp,churu};
    },errorName);
    await page.evaluate(()=>startSmartReview());
    await page.evaluate(()=>finish());
    expect(await page.evaluate(()=>({xp:S.xp,churu:S.churu,original:localStorage.getItem('meowde-v417-review')}))).toEqual(before);
  });
}

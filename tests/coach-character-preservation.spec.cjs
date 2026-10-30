const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';
test('six character choices and independent coaching survive reload without changing learning records',async({page})=>{
  await page.setViewportSize({width:375,height:740});
  await page.goto(base+'/');
  await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
  await page.getByRole('button',{name:'마이',exact:true}).last().click();
  await page.getByText('설정',{exact:true}).click();
  await page.getByRole('button',{name:/캐릭터 바꾸기/}).click();
  const choices=page.getByRole('group',{name:'캐릭터 모습 선택',exact:true});
  await expect(choices.getByRole('button')).toHaveCount(6);
  await expect(choices).toHaveClass(/v443-single-companion/);
  const before=await page.evaluate(()=>{
    const s=JSON.parse(localStorage.getItem('meowde-v410-state'));
    return {done:s.done,xp:s.xp,mistakes:s.mistakes,next:s.next};
  });
  for(const name of ['코딩','댄싱','독서','기쁨','도전','디버그']){
    await choices.getByRole('button',{name,exact:true}).click();
    await expect(choices.getByRole('button',{name,exact:true})).toHaveAttribute('aria-pressed','true');
  }
  await page.evaluate(()=>MeowCoachMode.select('focus'));
  await expect(choices.getByRole('button',{name:'디버그',exact:true})).toHaveAttribute('aria-pressed','true');
  await expect.poll(()=>choices.locator('img').evaluateAll(imgs=>imgs.every(img=>img.complete&&img.naturalWidth>0))).toBe(true);
  await page.reload();
  await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
  await page.getByRole('button',{name:'마이',exact:true}).last().click();
  await page.getByText('설정',{exact:true}).click();
  await page.getByRole('button',{name:/캐릭터 바꾸기/}).click();
  await expect(page.getByRole('group',{name:'캐릭터 모습 선택',exact:true}).getByRole('button',{name:'디버그',exact:true})).toHaveAttribute('aria-pressed','true');
  expect(await page.evaluate(()=>MeowCoachMode.current().id)).toBe('focus');
  expect(await page.evaluate(()=>{
    const s=JSON.parse(localStorage.getItem('meowde-v410-state'));
    return {done:s.done,xp:s.xp,mistakes:s.mistakes,next:s.next};
  })).toEqual(before);
});

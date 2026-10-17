const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';
for(const width of [320,390,768]){
 test('curiosity pilot works at '+width+'px and never changes existing records',async({page})=>{
  await page.setViewportSize({width,height:844});
  await page.goto(base+'/linux-home.html');
  const originals={
   'meowde-v410-state':'{"xp":42,"done":[0]}',
   'meowde-linux-guided-v1':'{"version":1,"step":2}'
  };
  await page.evaluate(records=>{for(const [key,value] of Object.entries(records))localStorage.setItem(key,value);},originals);
  await page.goto(base+'/curiosity-pilot.html');
  await expect(page.getByRole('heading',{name:/고양이의 위치/})).toBeVisible();
  await expect(page.locator('#choices button')).toHaveCount(4);
  await expect(page.locator('#choices')).not.toContainText('모카');
  await page.getByRole('button',{name:'0번 인덱스'}).click();
  await expect(page.locator('#feedback')).toContainText('아직 아니야');
  await page.getByRole('button',{name:'힌트 보기'}).click();
  await expect(page.locator('#feedback')).toContainText('0, 1, 2');
  await page.getByRole('button',{name:'2번 인덱스'}).click();
  await expect(page.locator('#feedback')).toContainText('정답');
  await expect(page.locator('#code')).toContainText('cats[2]');
  await page.getByRole('button',{name:/새로운 상황에 적용하기/}).click();
  await expect(page.locator('#choices button')).toHaveCount(5);
  await page.getByRole('button',{name:'4번 인덱스'}).click();
  await expect(page.locator('#complete')).toBeVisible();
  const after=await page.evaluate(keys=>Object.fromEntries(keys.map(k=>[k,localStorage.getItem(k)])),Object.keys(originals));
  expect(after).toEqual(originals);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 });
}
test('keyboard can use hint and answer with live feedback',async({page})=>{
 await page.goto(base+'/curiosity-pilot.html');
 await page.getByRole('button',{name:'힌트 보기'}).focus();
 await page.keyboard.press('Enter');
 await expect(page.locator('#feedback')).toContainText('힌트');
 await page.getByRole('button',{name:'2번 인덱스'}).focus();
 await page.keyboard.press('Space');
 await expect(page.locator('#feedback')).toContainText('정답');
 await expect(page.locator('#feedback')).toHaveAttribute('aria-live','polite');
});

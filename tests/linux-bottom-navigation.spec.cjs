const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';
for(const [pagePath,selected] of [['linux-home.html','홈'],['linux-start.html','학습'],['linux-review.html','복습'],['linux-crash-course.html','실습'],['robotics.html',null]]){
 test('Linux bottom navigation remains accessible on '+pagePath,async({page})=>{
  await page.setViewportSize({width:320,height:740});
  await page.goto(base+'/'+pagePath);
  const nav=page.getByRole('navigation',{name:'메인 메뉴'});
  await expect(nav.locator('a')).toHaveCount(5);
  await expect(nav).toBeVisible();
  if(selected)await expect(nav.locator('a[aria-current="page"]')).toHaveAttribute('aria-label',selected);
  else await expect(nav.locator('a[aria-current="page"]')).toHaveCount(0);
  const m=await page.evaluate(()=>({width:innerWidth,documentWidth:document.documentElement.scrollWidth,bottom:document.querySelector('.meowde-lab-tabbar').getBoundingClientRect().bottom,height:innerHeight}));
  expect(m.documentWidth).toBeLessThanOrEqual(m.width);
  expect(m.bottom).toBe(m.height);
 });
}
test('Linux practice and review remain reachable from the shared tabs',async({page})=>{
 await page.goto(base+'/linux-home.html');
 await page.getByRole('navigation',{name:'메인 메뉴'}).getByRole('link',{name:'실습'}).click();
 await expect(page).toHaveURL(/linux-crash-course.html/);
 await expect(page.locator('#library-mode')).toBeVisible();
 await page.getByRole('navigation',{name:'메인 메뉴'}).getByRole('link',{name:'복습'}).click();
 await expect(page).toHaveURL(/linux-review.html/);
 await expect(page.locator('#focus-list')).toBeVisible();
});

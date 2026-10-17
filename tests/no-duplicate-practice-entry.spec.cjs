const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';
test('Home Learn and Review have a single global Practice entry and no injected lab CTA',async({page})=>{
 await page.goto(base+'/');
 await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
 await expect(page.locator('#meowde-python-lab-script')).toHaveCount(0);
 for(const tab of ['홈','학습','복습']){
  await page.getByRole('button',{name:tab,exact:true}).last().click();
  await expect(page.locator('.tabbar[data-phase1-navigation="five-tabs"]')).toBeVisible();
  await expect(page.locator('.tabbar button[aria-label="실습"]')).toHaveCount(1);
  await expect(page.locator('#python-lab-entry')).toHaveCount(0);
  await expect(page.locator('#app .scroll a[href="/python-lab.html"]')).toHaveCount(0);
 }
});

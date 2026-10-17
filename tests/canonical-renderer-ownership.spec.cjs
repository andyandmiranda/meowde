const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';
test('legacy visual enhancers do not replace canonical renderers or inject extra home UI',async({page})=>{
 await page.goto(base+'/');
 await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
 await expect(page.locator('.phase1-home')).toBeVisible();
 await expect(page.locator('.meowde-home-journey')).toBeVisible();
 await expect(page.locator('#python-lab-entry')).toHaveCount(0);
 const before=await page.evaluate(()=>({home:window.renderHome,map:window.renderMap,review:window.renderReview,profile:window.renderProfile}));
 await page.waitForTimeout(200);
 const same=await page.evaluate(()=>({home:window.renderHome===window.__MEOWDE_CANONICAL_HOME_RENDERER__,map:window.renderMap===window.__MEOWDE_CANONICAL_LEARN_RENDERER__,review:window.renderReview===window.__MEOWDE_CANONICAL_REVIEW_RENDERER__,profile:!window.__MEOWDE_CANONICAL_PROFILE_RENDERER__||window.renderProfile===window.__MEOWDE_CANONICAL_PROFILE_RENDERER__}));
 expect(same.home).toBe(true);expect(same.map).toBe(true);expect(same.review).toBe(true);expect(same.profile).toBe(true);
 await page.getByRole('button',{name:'학습',exact:true}).last().click();
 await expect(page.locator('.trail')).toBeVisible();
 await page.getByRole('button',{name:'복습',exact:true}).last().click();
 await expect(page.locator('.phase5-review')).toBeVisible();
 await expect(page.locator('#python-lab-entry')).toHaveCount(0);
});

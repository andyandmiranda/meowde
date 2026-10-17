const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';
test('Python lab starts with the editor and shows feedback before hints and solution',async({page})=>{
 await page.goto(base+'/python-lab.html');
 await expect(page.locator('#learner-code')).toBeVisible();
 await expect(page.locator('#practice')).toBeVisible();
 await expect(page.locator('.practice-entry')).toHaveCount(0);
 const positions=await page.evaluate(()=>{
  const practice=document.querySelector('#practice');
  const children=[...practice.children];
  const index=selector=>children.indexOf(practice.querySelector(selector));
  return {actions:index('.actions'),status:index('#run-status'),results:index('#run-results'),hints:index('#hints'),solution:index('#solution')};
 });
 expect(positions.actions).toBeGreaterThanOrEqual(0);
 expect(positions.status).toBe(positions.actions+1);
 expect(positions.results).toBe(positions.status+1);
 expect(positions.hints).toBeGreaterThan(positions.results);
 expect(positions.solution).toBeGreaterThan(positions.hints);
 await expect(page.locator('#hint-button')).toBeVisible();
 await expect(page.locator('#solution')).toHaveCount(1);
 await expect(page.getByRole('navigation',{name:'메인 메뉴'}).getByRole('link',{name:'실습'})).toHaveAttribute('aria-current','page');
});

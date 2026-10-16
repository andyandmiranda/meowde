const {test,expect}=require("playwright/test");
const base=process.env.MEOWDE_BASE_URL||"http://127.0.0.1:4173";
test("Practice retains five fixed bottom tabs while editing and on narrow phones",async({page})=>{
 await page.setViewportSize({width:375,height:812});
 await page.goto(base+"/python-lab.html");
 await expect(page.locator("#learner-code")).toBeVisible();
 const nav=page.getByRole("navigation",{name:"메인 메뉴"});
 await expect(nav.locator("a")).toHaveCount(5);
 await expect(nav.locator("a[aria-current=page]")).toHaveText("⌘실습");
 for(const width of [320,375,390]){
  await page.setViewportSize({width,height:740});
  await expect(nav).toBeVisible();
  const metrics=await page.evaluate(()=>({viewport:innerWidth,doc:document.documentElement.scrollWidth,navBottom:document.querySelector(".meowde-lab-tabbar").getBoundingClientRect().bottom,screenHeight:innerHeight}));
  expect(metrics.doc).toBeLessThanOrEqual(metrics.viewport);
  expect(metrics.navBottom).toBe(metrics.screenHeight);
 }
 await page.locator("#learner-code").fill("print('keep this draft')");
 await expect(nav).toBeVisible();
 await page.reload();
 await expect(page.locator("#learner-code")).toHaveValue("print('keep this draft')");
 await expect(nav).toBeVisible();
});
test("Practice navigation returns to course and review without losing the lab draft",async({page})=>{
 await page.goto(base+"/python-lab.html");
 await expect(page.locator("#learner-code")).toBeVisible();
 await page.locator("#learner-code").fill("print('saved')");
 await page.getByRole("navigation",{name:"메인 메뉴"}).getByRole("link",{name:"학습"}).click();
 await expect(page).toHaveURL(/\?tab=map/);
 await expect(page.locator(".tabbar")).toBeVisible();
 await page.goto(base+"/python-lab.html");
 await expect(page.locator("#learner-code")).toHaveValue("print('saved')");
 await page.getByRole("navigation",{name:"메인 메뉴"}).getByRole("link",{name:"복습"}).click();
 await expect(page).toHaveURL(/\?tab=review/);
 await expect(page.locator(".phase5-review")).toBeVisible({timeout:12000});
});

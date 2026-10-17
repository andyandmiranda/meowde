const {test,expect}=require("playwright/test");
const base=process.env.MEOWDE_BASE_URL||"http://127.0.0.1:4173";
test("Python practice keeps all five tabs visible on narrow phones",async({page})=>{
  for(const width of [320,375,390]){
    await page.setViewportSize({width,height:740});
    await page.goto(base+"/python-lab.html");
    const nav=page.getByRole("navigation",{name:"메인 메뉴"});
    await expect(nav).toBeVisible();
    await expect(nav.locator("a")).toHaveCount(5);
    await expect(nav.locator("a[aria-current=page]")).toHaveAttribute("aria-label","실습");
    const dims=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth,bottom:document.querySelector(".meowde-lab-tabbar").getBoundingClientRect().bottom,height:innerHeight}));
    expect(dims.scroll).toBeLessThanOrEqual(dims.width);
    expect(Math.abs(dims.bottom-dims.height)).toBeLessThan(2);
  }
});
test("Python lab draft survives using bottom navigation and returning",async({page})=>{
  await page.goto(base+"/python-lab.html");
  const editor=page.locator("#learner-code");
  await expect(editor).toBeVisible();
  await editor.fill("print('draft preserved')");
  await page.getByRole("navigation",{name:"메인 메뉴"}).getByRole("link",{name:"학습"}).click();
  await expect(page).toHaveURL(/tab=map/);
  await page.goto(base+"/python-lab.html");
  await expect(page.locator("#learner-code")).toHaveValue("print('draft preserved')");
});
test("Canonical Home, Learn and Review do not inject duplicate Python lab CTA",async({page})=>{
  await page.goto(base+"/");
  await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==="ordered");
  for(const tab of ["홈","학습","복습"]){
    await page.getByRole("button",{name:tab,exact:true}).last().click();
    await expect(page.locator("#python-lab-entry")).toHaveCount(0);
    await expect(page.locator(".tabbar button[aria-label='실습']")).toHaveCount(1);
  }
});

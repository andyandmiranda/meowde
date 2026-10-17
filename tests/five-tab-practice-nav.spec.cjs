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

test("Five global tabs keep the same physical order on every screen",async({page})=>{
  const expected=["홈","학습","실습","복습","마이"];
  await page.goto(base+"/");
  await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==="ordered");
  for(const tab of ["홈","학습","복습"]){
    await page.getByRole("button",{name:tab,exact:true}).last().click();
    const labels=await page.locator(".tabbar[data-phase1-navigation='five-tabs'] button").evaluateAll(nodes=>nodes.map(el=>el.getAttribute("aria-label")));
    expect(labels).toEqual(expected);
  }
  await page.goto(base+"/python-lab.html");
  const labels=await page.locator(".meowde-lab-tabbar a").evaluateAll(nodes=>nodes.map(el=>el.getAttribute("aria-label")));
  expect(labels).toEqual(expected);
});

test("Practice uses the same cream and mint palette as the main app",async({page})=>{
  await page.goto(base+"/python-lab.html");
  await expect(page.locator("#learner-code")).toBeVisible();
  const info=await page.evaluate(()=>{
    const body=getComputedStyle(document.body),button=getComputedStyle(document.querySelector("#practice button.primary"));
    return {background:body.backgroundColor,button:button.backgroundColor,
      font:body.fontFamily,practiceFirst:document.querySelector(".lesson > section.card")?.id==="practice",
      support:!!document.querySelector(".practice-support")};
  });
  expect(info.background).toBe("rgb(255, 249, 239)");
  expect(info.button).toBe("rgb(83, 199, 160)");
  expect(info.practiceFirst).toBe(true);
  expect(info.support).toBe(true);
});
test("Review exposes recent lessons first and preserves older completed items",async({page})=>{
  await page.goto(base+"/");
  await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==="ordered");
  await page.evaluate(()=>{S.done=[0,1,2,3,4];save();renderReview()});
  await expect(page.locator(".phase5-review")).toBeVisible();
  const recent=page.locator(".phase5-review > .scroll > .review-list .review-item");
  await expect(recent).toHaveCount(3);
  const older=page.locator(".phase5-review .review-disclosure").filter({hasText:"이전 완료 레슨 보기"});
  await expect(older).toBeVisible();
  await older.locator("summary").click();
  await expect(older.locator(".review-item")).toHaveCount(2);
  await expect(page.locator(".phase5-review .review-disclosure").filter({hasText:"학습 분석 보기"})).toBeVisible();
});

test("Practice keeps the task, editor and main action visible without expanding help",async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto(base+"/python-lab.html");
  await expect(page.locator("#learner-code")).toBeVisible();
  await expect(page.locator("#practice [data-run=grade]")).toBeVisible();
  await expect(page.locator(".practice-criteria")).not.toHaveAttribute("open","");
  await expect(page.locator(".practice-criteria summary")).toBeVisible();
  const positions=await page.evaluate(()=>({
    editor:document.querySelector("#learner-code").getBoundingClientRect().top,
    action:document.querySelector("#practice [data-run=grade]").getBoundingClientRect().top,
    nav:document.querySelector(".meowde-lab-tabbar").getBoundingClientRect().top
  }));
  expect(positions.editor).toBeLessThan(positions.nav);
  expect(positions.action).toBeLessThan(positions.nav);
  await page.locator(".practice-criteria summary").click();
  await expect(page.locator(".practice-criteria")).toHaveAttribute("open","");
});

test("Compact practice remains usable at large text and reduced visible height",async({page})=>{
  await page.setViewportSize({width:375,height:560});
  await page.goto(base+"/python-lab.html");
  await page.addStyleTag({content:"html{font-size:20px!important} body:has(#lab){font-size:19px!important}"});
  const editor=page.locator("#learner-code"),action=page.locator("#practice [data-run=grade]");
  await expect(editor).toBeVisible();
  await editor.focus();
  await expect(editor).toBeFocused();
  await editor.fill("print('accessible')");
  await action.scrollIntoViewIfNeeded();
  await expect(action).toBeVisible();
  const geometry=await page.evaluate(()=>({
    width:innerWidth,scrollWidth:document.documentElement.scrollWidth,
    navBottom:document.querySelector(".meowde-lab-tabbar").getBoundingClientRect().bottom,
    height:innerHeight,
    button:document.querySelector("#practice [data-run=grade]").getBoundingClientRect()
  }));
  expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.width);
  expect(Math.abs(geometry.navBottom-geometry.height)).toBeLessThan(2);
  expect(geometry.button.top).toBeLessThan(geometry.height);
  expect(geometry.button.bottom).toBeGreaterThan(0);
  await expect(editor).toHaveValue("print('accessible')");
});

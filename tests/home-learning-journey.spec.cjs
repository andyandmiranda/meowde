const {test,expect}=require("playwright/test");
const base=process.env.MEOWDE_BASE_URL||"http://127.0.0.1:4173";
test.beforeEach(async({page})=>{
 await page.addInitScript(()=>localStorage.setItem("meowde-v410-seen","1"));
 await page.goto(base+"/");
 await page.waitForFunction(()=>document.documentElement.dataset.homeRenderer==="canonical-v414");
});
test("home always shows real overall progress, course and next lesson without expanding menus",async({page})=>{
 const home=page.locator(".meowde-home-journey");
 await expect(home).toBeVisible();
 await expect(home.getByText("내 학습 진도")).toBeVisible();
 await expect(home.locator('[role="progressbar"]')).toHaveAttribute("aria-valuenow","0");
 await expect(home.locator(".journey-step")).toHaveCount(2);
 await expect(home.getByRole("button",{name:/전체 학습 과정 보기/})).toBeVisible();
 await home.getByRole("button",{name:/전체 학습 과정 보기/}).click();
 await expect(page.locator(".phase1-map")).toBeVisible();
});
test("home progress uses completed lessons and preserves XP and current lesson",async({page})=>{
 const result=await page.evaluate(()=>{
  const before={xp:S.xp,done:S.done.slice(),next:S.next};
  S.done=[0,1];S.next=2;save();renderHome();
  const bar=document.querySelector(".meowde-home-journey [role=progressbar]");
  return {before,now:{xp:S.xp,done:S.done.slice(),next:S.next},label:bar?.getAttribute("aria-valuenow"),rows:document.querySelectorAll(".journey-step").length};
 });
 expect(result.now.xp).toBe(result.before.xp);
 expect(result.now.done).toEqual([0,1]);
 expect(result.now.next).toBe(2);
 expect(result.rows).toBe(3);
 expect(Number(result.label)).toBeGreaterThan(0);
 await expect(page.locator(".meowde-home-journey")).toContainText("2 /");
});
test("progress and lesson path fit small iPhones",async({page})=>{
 for(const width of [320,375,390]){
  await page.setViewportSize({width,height:720});
  await page.evaluate(()=>renderHome());
  await expect(page.locator(".meowde-home-journey")).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
 }
});

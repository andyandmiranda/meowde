const {test,expect}=require("playwright/test");
const base=process.env.MEOWDE_BASE_URL||"http://127.0.0.1:4173";
test("Linux home and lesson use mint rather than legacy pink",async({page})=>{
 for(const path of ["/linux-home.html","/linux-start.html"]){
  await page.goto(base+path);
  const styles=await page.evaluate(()=>({font:getComputedStyle(document.body).fontFamily,primary:getComputedStyle(document.querySelector(".primary")).backgroundColor,pink:getComputedStyle(document.documentElement).getPropertyValue("--pink").trim(),width:document.documentElement.scrollWidth,viewport:innerWidth}));
  expect(styles.font).toMatch(/Pretendard/);
  expect(styles.primary).toBe("rgb(83, 199, 160)");
  expect(styles.pink).toBe("#53C7A0");
  expect(styles.width).toBeLessThanOrEqual(styles.viewport);
 }
});
test("Linux review is mint, readable, and its extra storage explanation is collapsed",async({page})=>{
 for(const width of [320,375,390]){
  await page.setViewportSize({width,height:844});
  await page.goto(base+"/linux-review.html");
  const state=await page.evaluate(()=>({font:getComputedStyle(document.body).fontFamily,width:document.documentElement.scrollWidth,viewport:innerWidth,more:document.querySelector(".meowde-more").open,button:getComputedStyle(document.querySelector("#focus-action")).backgroundColor}));
  expect(state.font).toMatch(/Pretendard/);
  expect(state.width).toBeLessThanOrEqual(state.viewport);
  expect(state.more).toBe(false);
  expect(state.button).toBe("rgb(83, 199, 160)");
 }
});
test("Linux optional practice uses shared mint buttons",async({page})=>{
 await page.goto(base+"/linux-crash-course.html");
 const css=await page.evaluate(()=>({font:getComputedStyle(document.body).fontFamily,button:getComputedStyle(document.querySelector("button")).backgroundColor}));
 expect(css.font).toMatch(/Pretendard/);
 expect(css.button).toBe("rgb(83, 199, 160)");
});

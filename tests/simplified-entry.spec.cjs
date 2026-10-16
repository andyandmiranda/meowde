const {test,expect}=require("playwright/test");
const base=process.env.MEOWDE_BASE_URL||"http://127.0.0.1:4173";
const py="meowde-v410-state",li="meowde-linux-guided-v1";
async function seed(page,records){await page.goto(base+"/simple-start.html");await page.evaluate(records=>{localStorage.clear();for(const [k,v] of Object.entries(records))localStorage.setItem(k,v)},records);await page.reload()}
test("Linux progress goes straight to the saved lesson without mutating storage",async({page})=>{
 const records={[li]:JSON.stringify({version:1,step:2,input:"",solutions:{},hints:{training:0,travel:0}})};
 await seed(page,records);
 await expect(page.locator("#resume-action")).toHaveText("Linux 이어서 배우기 →");
 expect(await page.evaluate(k=>localStorage.getItem(k),li)).toBe(records[li]);
 await page.locator("#resume-action").click();
 await expect(page).toHaveURL(/linux-start\.html$/);
 await expect(page.locator("#step-label")).toContainText("3 / 4");
});
test("Python unfinished lesson auto-resumes with its original progress and XP",async({page})=>{
 await page.goto(base+"/");
 await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==="ordered");
 await page.getByRole("button",{name:/오늘 학습 시작|이어서 배우기|Start today|Resume lesson/}).first().click();
 await expect(page.locator(".lesson-top")).toBeVisible();
 const before=await page.evaluate(k=>localStorage.getItem(k),py);
 const state=JSON.parse(before);
 await page.goto(base+"/simple-start.html");
 await expect(page.locator("#resume-action")).toContainText("Python 학습 이어가기");
 const during=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),py);
 expect(during.inProgress).toEqual(state.inProgress);
 expect(during.xp).toBe(state.xp);
 expect(during.done).toEqual(state.done);
 await page.locator("#resume-action").click();
 await expect(page).toHaveURL(base+"/");
 await expect(page.locator(".lesson-top")).toBeVisible();
 const after=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),py);
 expect(after.inProgress).toEqual(state.inProgress);
 expect(after.xp).toBe(state.xp);
 expect(after.done).toEqual(state.done);
});
test("both active subjects do not guess last subject",async({page})=>{
 await seed(page,{[py]:JSON.stringify({inProgress:{queue:[{}]}}),[li]:JSON.stringify({version:1,step:1,input:"",solutions:{},hints:{}})});
 await expect(page.locator("#resume-description")).toContainText("모두 학습 기록");
 await expect(page.locator("#resume-action")).toContainText("Python 학습 열기");
 await expect(page.getByRole("link",{name:"Linux 학습하기 →"})).toBeVisible();
});
test("corrupt progress survives and narrow viewport does not overflow",async({page})=>{
 await page.setViewportSize({width:320,height:700});
 await seed(page,{[py]:"{broken"});
 await expect(page.locator("#resume-note")).toContainText("읽지 못했어");
 expect(await page.evaluate(k=>localStorage.getItem(k),py)).toBe("{broken");
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test("simplified entry matches existing MEOWDE typography and mobile layout",async({page})=>{
 for(const width of [320,375,390,430]){
  await page.setViewportSize({width,height:844});
  await page.goto(base+"/simple-start.html");
  const actual=await page.evaluate(()=>({font:getComputedStyle(document.body).fontFamily,width:document.documentElement.scrollWidth,viewport:innerWidth,buttonHeight:document.querySelector("#resume-action").getBoundingClientRect().height}));
  expect(actual.font).toMatch(/Pretendard/);
  expect(actual.width).toBeLessThanOrEqual(actual.viewport);
  expect(actual.buttonHeight).toBeGreaterThanOrEqual(48);
 }
});

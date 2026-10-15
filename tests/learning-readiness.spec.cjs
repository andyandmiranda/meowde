const {test,expect}=require("playwright/test");
const base=process.env.MEOWDE_BASE_URL||"http://127.0.0.1:4173";
test.use({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
async function start(page){await page.goto(base+"/linux-start.html");await page.locator("#lesson-action").click();await page.locator("#lesson-action").click();}
async function submit(page,command){await page.locator("#lesson-input").fill(command);await page.locator("#lesson-action").click();}
test("a correct answer cannot make later wrong input pass",async({page})=>{
 await start(page);await submit(page,"mkdir training");await expect(page.locator("#lesson-action")).toContainText("새 문제");
 await submit(page,"pwd");await expect(page.locator("#lesson-action")).toHaveText("폴더 만들기");await expect(page.locator("#lesson-feedback")).not.toHaveClass(/success/);
 await page.reload();await expect(page.locator("#step-label")).toContainText("3 / 4");await expect(page.locator("#lesson-action")).toHaveText("폴더 만들기");
});
test("partial input, verified answer, transfer and completion survive return",async({page})=>{
 await start(page);await page.locator("#lesson-input").fill("mkdir trai");await page.reload();await expect(page.locator("#lesson-input")).toHaveValue("mkdir trai");
 await submit(page,"mkdir ./training");await page.reload();await expect(page.locator("#lesson-action")).toContainText("새 문제");await page.locator("#lesson-action").click();
 await page.locator("#lesson-input").fill("mkdir tra");await page.goto(base+"/linux-home.html");await expect(page.locator("#guided-entry")).toContainText("이어서");await page.locator("#guided-entry").click();await expect(page.locator("#lesson-input")).toHaveValue("mkdir tra");
 await submit(page,"mkdir -p travel");await page.locator("#lesson-action").click();await page.reload();await expect(page.locator("#step-label")).toHaveText("레슨 완료");
 await page.goto(base+"/linux-home.html");await expect(page.locator("#guided-status")).toContainText("완료");await expect(page.locator("#guided-entry")).toContainText("완료한 레슨");
});
test("transfer hints are reported without claiming independent mastery",async({page})=>{
 await start(page);await submit(page,"mkdir training");await page.locator("#lesson-action").click();await page.getByRole("button",{name:"조금 도와줘"}).click();
 await submit(page,"mkdir travel");await page.locator("#lesson-action").click();await expect(page.locator("#lesson-body")).toContainText("힌트를 사용했어요");
});
test("unreadable progress is preserved and storage denial is visible",async({page})=>{
 await page.goto(base+"/linux-home.html");await page.evaluate(()=>localStorage.setItem("meowde-linux-guided-v1","{broken"));await page.goto(base+"/linux-start.html");await expect(page.locator("#storage-status")).toContainText("원본은 보존");await page.locator("#lesson-action").click();
 expect(await page.evaluate(()=>localStorage.getItem("meowde-linux-guided-v1"))).toBe("{broken");
});
test("quota failure allows practice but warns that it is not saved",async({page})=>{
 await page.addInitScript(()=>{Storage.prototype.setItem=function(){throw new DOMException("full","QuotaExceededError");};});
 await start(page);await expect(page.locator("#storage-status")).toContainText("저장하지 못했어요");await submit(page,"mkdir training");await expect(page.locator("#lesson-action")).toContainText("새 문제");
});
test("invented completion flags cannot bypass both learning tasks",async({page})=>{
 await page.goto(base+"/linux-home.html");await page.evaluate(()=>localStorage.setItem("meowde-linux-guided-v1",JSON.stringify({version:1,step:4,input:"",solutions:{training:"pwd",travel:"mkdir travel"},hints:{}})));
 await page.goto(base+"/linux-start.html");await expect(page.locator("#step-label")).toContainText("3 / 4");await expect(page.locator("#lesson-action")).toHaveText("폴더 만들기");
});
test("Python subject navigation preserves an unfinished lesson and Linux records",async({page})=>{
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto(base+"/");await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==="ordered");
 await expect(page.locator("[data-subject-navigation]")).toHaveCount(1);await page.getByRole("button",{name:/오늘 학습 시작|이어서 배우기|Start today|Resume lesson/}).first().click();
 await expect(page.locator(".lesson-top")).toBeVisible();
 const before=await page.evaluate(()=>JSON.parse(localStorage.getItem("meowde-v410-state")));
 await page.getByRole("combobox",{name:"학습 과목"}).selectOption("linux");await expect(page).toHaveURL(/linux-home.html/);
 await page.locator("#guided-entry").click();await page.locator("#lesson-action").click();
 const linux=await page.evaluate(()=>localStorage.getItem("meowde-linux-guided-v1"));
 await page.goto(base+"/");await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==="ordered");
 const after=await page.evaluate(()=>JSON.parse(localStorage.getItem("meowde-v410-state")));
 expect(after.done).toEqual(before.done);expect(after.xp).toEqual(before.xp);expect(after.inProgress).toEqual(before.inProgress);
 // Existing Python bootstrap resumes the in-progress lesson automatically.
 await expect(page.locator(".lesson-top")).toBeVisible();
 expect(await page.evaluate(()=>localStorage.getItem("meowde-linux-guided-v1"))).toBe(linux);expect(errors).toEqual([]);
});
test("root stays clean, old bootstrap works and offline Linux resumes",async({page,context})=>{
 await page.goto(base+"/");await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==="ordered");await expect(page).toHaveURL(base+"/");
 await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
 await expect.poll(()=>page.evaluate(()=>navigator.serviceWorker.controller!==null)).toBe(true);
 await page.goto(base+"/v412.html");await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==="ordered");
 await start(page);await page.locator("#lesson-input").fill("mkdir train");await context.setOffline(true);await page.reload();await expect(page.locator("#lesson-input")).toHaveValue("mkdir train");await submit(page,"mkdir training");await expect(page.locator("#lesson-action")).toContainText("새 문제");await context.setOffline(false);
});
test("legacy records remain byte-identical after complete guided learning",async({page})=>{
 await page.goto(base+"/linux-home.html");const keys={"meowde-linux-robotics-v1":'{"done":{"0-0":true},"quiz":{"0-0":1}}',"meowde-linux-cram-v1":'{"index":2,"done":{"0":true}}',"meowde-v410-state":'{"xp":17,"done":[0]}'};
 await page.evaluate(keys=>Object.entries(keys).forEach(([k,v])=>localStorage.setItem(k,v)),keys);await start(page);await submit(page,"mkdir training");await page.locator("#lesson-action").click();await submit(page,"mkdir travel");await page.locator("#lesson-action").click();await page.reload();
 expect(await page.evaluate(keys=>Object.fromEntries(Object.keys(keys).map(k=>[k,localStorage.getItem(k)])),keys)).toEqual(keys);
});
for(const width of [320,375,390,768])test("Python navigation and editor fit viewport "+width,async({page})=>{
 await page.setViewportSize({width,height:844});await page.goto(base+"/");await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==="ordered");
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.getByRole("button",{name:"오늘 학습 시작"}).click();await expect(page.getByRole("combobox",{name:"학습 과목"})).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test("keyboard-only Linux entry and task focus; review screenshots",async({page},testInfo)=>{
 await page.goto(base+"/linux-home.html");await page.locator("#guided-entry").focus();await page.keyboard.press("Enter");await expect(page.locator("#lesson-title")).toContainText("폴더");
 await page.screenshot({path:testInfo.outputPath("linux-concept.png"),fullPage:true});
 await page.locator("#lesson-action").focus();await page.keyboard.press("Enter");await expect(page.locator("#lesson-title")).toBeFocused();await page.keyboard.press("Tab");await page.keyboard.press("Enter");await expect(page.locator("#lesson-title")).toBeFocused();
 await page.keyboard.press("Tab");await expect(page.locator("#lesson-input")).toBeFocused();await page.keyboard.type("mkdir training");await page.keyboard.press("Enter");await expect(page.locator("#lesson-action")).toContainText("새 문제");
 await page.screenshot({path:testInfo.outputPath("linux-answer.png"),fullPage:true});
});
test("Python first lesson reaches actual browser Python execution",async({page})=>{
 test.setTimeout(120000);
 await page.goto(base+"/");await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==="ordered");await page.getByRole("button",{name:"오늘 학습 시작"}).click();
 // Fixed first-lesson fixtures exercise the real controls, never a mock Python engine.
 for(let i=0;i<8;i++){
  if(await page.locator("#code-editor").count())break;
  const type=await page.evaluate(()=>cur().type);
  if(type==="concept")await page.getByRole("button",{name:"알겠어요"}).click();
  else{
   if(type==="predict")await page.locator(".choice").first().click();
   if(type==="fill")await page.getByRole("button",{name:"print",exact:true}).click();
   if(type==="bughunt")await page.locator(".linebtn").nth(1).click();
   await page.locator(".lesson-foot .btn").click();await expect(page.locator(".feedback.ok")).toBeVisible();await page.locator(".feedback .btn").click();
  }
 }
 await expect(page.locator("#code-editor")).toBeVisible();await page.locator("#code-editor").fill('print("야옹")');await page.getByRole("button",{name:"코드 실행",exact:true}).click();await expect(page.locator(".feedback.ok")).toBeVisible({timeout:60000});await expect(page.locator(".console")).toContainText("야옹");
});

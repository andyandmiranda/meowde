const {test,expect}=require("playwright/test");
const base=process.env.MEOWDE_BASE_URL||"http://127.0.0.1:4173";
async function openChallenge(page){await page.getByRole("button",{name:"예제 보기 →"}).click();await page.getByRole("button",{name:"직접 연습하기 →"}).click();const input=page.getByRole("textbox",{name:"연습 명령어"});await input.fill(await input.getAttribute("placeholder"));await page.getByRole("button",{name:"명령어 확인"}).click();await page.getByRole("button",{name:"도전 문제 풀기 →"}).click();}
test.use({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
test("focused lesson from home to independent transfer and completion",async({page})=>{
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto(base+"/linux-home.html");await expect(page.locator(".primary")).toHaveCount(1);
 await expect(page.getByRole("img",{name:"헤드폰을 쓴 Meowde"})).toBeVisible();
 await page.getByRole("link",{name:"첫 학습 시작하기"}).click();
 const action=page.locator("#lesson-action");await expect(page.locator("#lesson-input")).toHaveCount(0);
 await action.click();await action.click();await expect(page.locator("#lesson-title")).toBeFocused();
 const input=page.getByRole("textbox",{name:"명령어 입력"});
 await input.fill("mkdir wrong");await action.click();await expect(page.locator("#step-label")).toContainText("3 / 4");
 await page.getByRole("button",{name:"조금 도와줘"}).click();await expect(page.locator("#lesson-feedback")).toContainText("mkdir");
 await input.fill("mkdir training");await input.press("Enter");await expect(page.locator("#lesson-feedback")).toContainText("폴더가 생겼어요");await action.click();
 await input.fill("mkdir travel");await action.click();await action.click();
 await expect(page.locator("#lesson-title")).toHaveText("첫 폴더 만들기, 성공!");await expect(page.locator("#lesson-progress")).toHaveAttribute("aria-valuenow","4");
 await action.click();await expect(page.getByRole("heading",{name:"단계별 학습"})).toBeVisible();expect(errors).toEqual([]);
});
test("blank and unsupported inputs cannot advance; back remains usable",async({page})=>{
 await page.goto(base+"/linux-start.html");const action=page.locator("#lesson-action");await action.click();await action.click();
 for(const command of ["","rm -rf /","mkdir travel","mkdir training; pwd"]){await page.locator("#lesson-input").fill(command);await action.click();await expect(page.locator("#step-label")).toContainText("3 / 4");}
 await page.locator("#lesson-back").click();await expect(page.locator("#step-label")).toContainText("2 / 4");
});
test("legacy URL is read-only and prior records survive new learning",async({page})=>{
 await page.goto(base+"/robotics.html");const old='{"done":{"0-0":true,"4-1":true},"quiz":{"0-0":1},"unit":4,"task":1}';
 await page.evaluate(value=>{localStorage.setItem("meowde-linux-robotics-v1",value);localStorage.setItem("meowde-linux-cram-v1",'{"index":2,"done":{"0":true}}');localStorage.setItem("meowde-v410-state",'{"xp":17}');},old);
 await page.reload();await expect(page.locator("#record-count")).toHaveText("2개 연습 완료");
 await page.goto(base+"/linux-start.html");await page.locator("#lesson-action").click();await page.reload();
 expect(await page.evaluate(()=>localStorage.getItem("meowde-linux-robotics-v1"))).toBe(old);
 expect(await page.evaluate(()=>localStorage.getItem("meowde-v410-state"))).toBe('{"xp":17}');expect(await page.evaluate(()=>localStorage.getItem("meowde-linux-cram-v1"))).toBe('{"index":2,"done":{"0":true}}');
});
test("library shows one tool at a time and grades search results",async({page})=>{
 await page.goto(base+"/linux-crash-course.html");await expect(page.locator("#micro-e1")).toBeHidden();await expect(page.locator("#lesson")).toBeVisible();await expect(page.locator("#sim-input")).toBeHidden();await expect(page.getByRole("heading",{name:/E1/})).toBeVisible();
 await page.goto(base+"/linux-crash-course.html?view=terminal");await expect(page.locator("#lesson")).toBeHidden();await page.locator("#sim-missions button").nth(3).click();
 for(const [command,success] of [["grep INFO app.log",false],["grep -n ERROR app.log",true]]){await page.locator("#sim-input").fill(command);await page.locator("#sim-run").click();await page.locator("#sim-check").click();if(success)await expect(page.locator("#sim-next")).toBeVisible();else await expect(page.locator("#sim-next")).toBeHidden();}
 await page.goto(base+"/linux-crash-course.html?view=bash");await expect(page.locator("#sim-input")).toBeHidden();await expect(page.locator("#bash-source")).toBeVisible();
});
test("quiz progress survives reload and opens the selected practice tool",async({page})=>{
 await page.goto(base+"/linux-crash-course.html");await openChallenge(page);await page.locator("#lesson .answers button").first().click();await page.reload();await expect(page.locator("#progress")).toContainText("1 / 9");
 await page.goto(base+"/linux-crash-course.html?view=terminal");await expect(page.locator("#sim-input")).toBeVisible();await expect(page.locator("#lesson")).toBeHidden();
});
test("four-module map keeps the selected module through lesson return and reload",async({page})=>{
 await page.goto(base+"/linux-home.html?tab=learn");
 const module=page.getByRole("button",{name:"4. Shell과 운영"});
 await module.click();
 await expect(page).toHaveURL(/group=4/);
 await page.getByRole("link",{name:/Shell Script와 변수/}).click();
 await expect(page).toHaveURL(/linux-course\.html\?unit=10/);
 await page.locator("a.crumb").click();
 await expect(page).toHaveURL(/linux-home\.html\?tab=learn&group=4/);
 await page.reload();
 await expect(page.getByRole("button",{name:"4. Shell과 운영"})).toHaveAttribute("aria-pressed","true");
 await expect(page.getByRole("link",{name:/Shell Script와 변수/})).toBeVisible();
 await expect(page.getByRole("link",{name:/Linux와 Ubuntu/})).toHaveCount(0);
});
for(const width of [320,375,390,768])test("screens fit viewport "+width,async({page})=>{
 await page.setViewportSize({width,height:844});for(const route of ["linux-home.html","linux-start.html","robotics.html","content-notice.html"]){await page.goto(base+"/"+route);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await expect(page.getByText(/NVIDIA AI Campus/)).toHaveCount(0);}
});

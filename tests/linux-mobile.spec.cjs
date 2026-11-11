const {test,expect}=require("playwright/test");
const base=process.env.MEOWDE_BASE_URL||"http://127.0.0.1:4173";
async function openChallenge(page){await page.getByRole("button",{name:"예제 보기 →"}).click();await page.getByRole("button",{name:"직접 연습하기 →"}).click();const input=page.getByRole("textbox",{name:"연습 명령어"});await input.fill(await input.getAttribute("placeholder"));await page.getByRole("button",{name:"명령어 확인"}).click();await page.getByRole("button",{name:"도전 문제 풀기 →"}).click();}
test.use({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
test("focused 12-unit lesson from home through graded levels, saved resume and completion",async({page})=>{
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto(base+"/linux-home.html");
 await expect(page.locator(".linux-home-card .primary")).toHaveCount(1);
 const entry=page.locator(".linux-home-card .primary");
 await expect(entry).toBeVisible();
 await expect(entry).toHaveAttribute("href","/linux-course.html?unit=1");
 await entry.click();
 await expect(page).toHaveURL(/linux-course\.html\?unit=1/);
 await expect(page.getByRole("navigation",{name:"메인 메뉴"}).locator('[aria-current="page"]')).toHaveAttribute("aria-label","학습");
 await expect(page.locator("#lesson-card")).toContainText("Linux와 Ubuntu");
 await expect(page.locator("#course-progress")).toContainText("0 / 12");
 await expect(page.locator("#start-q")).toBeVisible();
 await page.locator("#start-q").click();
 await expect(page.locator("#lesson-card")).toContainText("Lv1");
 // A wrong answer must explain the correction and never advance.
 await page.locator('#lesson-card [data-answer="1"]').click();
 await expect(page.locator("#feedback")).toContainText("정답:");
 await expect(page.locator("#lesson-card")).toContainText("Lv1");
 await page.getByRole("button",{name:"이 문제 다시 풀기"}).click();
 await page.locator('#lesson-card [data-answer="0"]').click();
 await expect(page.locator("#feedback")).toContainText("정답!");
 await page.reload();
 await expect(page.locator("#lesson-card")).toContainText("Lv1");
 await expect(page.locator("#feedback")).toContainText("정답!");
 for(const level of [1,2,3]){
  if(level>1){await expect(page.locator("#lesson-card")).toContainText("Lv"+level);await page.locator('#lesson-card [data-answer="0"]').click();await expect(page.locator("#feedback")).toContainText("정답!");}
  await page.getByRole("button",{name:level<3?"다음 난이도 →":"단원 완료 →"}).click();
 }
 await expect(page.locator("#lesson-card")).toContainText("단원 완료");
 await expect(page.locator("#course-progress")).toContainText("1 / 12");
 await page.reload();
 await expect(page.locator("#lesson-card")).toContainText("단원 완료");
 await expect(page.locator("#course-progress")).toContainText("1 / 12");
 await page.locator("#next-unit").click();
 await expect(page).toHaveURL(/linux-course\.html\?unit=2/);
 await expect(page.locator("#lesson-card")).toContainText("경로와 디렉터리");
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 expect(errors).toEqual([]);
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
 const unit=page.getByRole("link",{name:/Shell Script와 변수/});
 await expect(unit).toBeVisible();await unit.click();
 await expect(page).toHaveURL(/linux-course\.html\?unit=10/);
 await page.locator("a.crumb").click();
 await expect(page).toHaveURL(/linux-home\.html\?tab=learn/);
 await page.reload();
 await expect(page.getByRole("link",{name:/Shell Script와 변수/})).toBeVisible();
 await expect(page.getByRole("link",{name:/Linux와 Ubuntu/})).toBeVisible();
});
for(const width of [320,375,390,768])test("screens fit viewport "+width,async({page})=>{
 await page.setViewportSize({width,height:844});for(const route of ["linux-home.html","linux-start.html","robotics.html","content-notice.html"]){await page.goto(base+"/"+route);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await expect(page.getByText(/NVIDIA AI Campus/)).toHaveCount(0);}
});

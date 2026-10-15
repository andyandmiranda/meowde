const {test,expect}=require("@playwright/test");
const base=process.env.MEOWDE_BASE_URL||"http://127.0.0.1:4173";
test.use({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
test("mobile Linux concept -> mission -> feedback -> reload",async({page})=>{
 await page.goto(base+"/linux-crash-course.html");
 await page.locator("#more-learning > summary").click();
 await expect(page.locator("#lesson")).toBeVisible();
 await page.locator("#lesson .answers button").first().click();
 await page.getByRole("button",{name:"이 단원 실습으로 이동"}).click();
 await expect(page.locator("#sim-goal")).toContainText("training");
 await expect(page.locator("#sim-next")).toBeHidden();
 const cmd=page.locator("#sim-input");
 await cmd.fill("mkdir training");await page.locator("#sim-run").click();
 await cmd.fill("touch training/hello.txt");await page.locator("#sim-run").click();
 await page.locator("#sim-check").click();
 await expect(page.locator("#sim-feedback")).toContainText("미션 성공");
 await expect(page.locator("#sim-next")).toBeVisible();
 await page.reload();
 await expect(page.locator("#progress")).toContainText("1 / 9");
 await expect(page.locator("#sim-next")).toBeHidden();
 await page.locator("#more-learning > summary").click();
 await page.locator("#sim-check").click();
 await expect(page.locator("#sim-feedback")).toContainText("아직 목표 상태가 아니야");
});
test("existing Linux progress survives separate mobile course",async({page})=>{
 await page.goto(base+"/linux-crash-course.html");
 await page.locator("#more-learning > summary").click();
 await page.evaluate(()=>localStorage.setItem("meowde-linux-robotics-v1",'{"done":{"0-0":true}}'));
 await page.reload();
 await page.locator("#more-learning > summary").click();
 await page.locator("#lesson .answers button").first().click();
 expect(await page.evaluate(()=>localStorage.getItem("meowde-linux-robotics-v1"))).toBe('{"done":{"0-0":true}}');
});
test("incorrect search cannot unlock next practice",async({page})=>{
 await page.goto(base+"/linux-crash-course.html");
 await page.locator("#more-learning > summary").click();
 await page.locator("#sim-missions button").nth(3).click();
 await page.locator("#sim-input").fill("grep INFO app.log");
 await page.locator("#sim-run").click();
 await page.locator("#sim-check").click();
 await expect(page.locator("#sim-next")).toBeHidden();
 await page.locator("#sim-input").fill("grep -n ERROR app.log");
 await page.locator("#sim-run").click();
 await page.locator("#sim-check").click();
 await expect(page.locator("#sim-next")).toBeVisible();
});

test("focused micro lesson reveals optional tools on demand",async({page})=>{
 await page.goto(base+"/linux-crash-course.html");
 await expect(page.locator("#micro-e1")).toBeVisible();
 await expect(page.locator("#lesson")).toBeHidden();
 await expect(page.locator("#more-learning")).not.toHaveAttribute("open",/./);
 await page.locator("#more-learning > summary").click();
 await expect(page.locator("#lesson")).toBeVisible();
});

test("E1 completion opens further learning only after successful transfer",async({page})=>{
 await page.goto(base+"/linux-home.html");
 await page.getByRole("link",{name:/학습 시작하기/}).click();
 const next=page.locator("#micro-next");
 await next.click();await next.click();
 await expect(next).toBeHidden();
 const input=page.getByRole("textbox",{name:"폴더 생성 명령어 입력"});
 const execute=page.getByRole("button",{name:"실행하고 확인"});
 await input.fill("mkdir training");await execute.click();await next.click();
 await input.fill("mkdir wrong");await execute.click();
 await expect(next).toBeHidden();
 await input.fill("mkdir travel");await execute.click();
 await expect(next).toHaveText("완료");
 await next.click();
 await expect(page.locator("#more-learning")).toHaveJSProperty("open",true);
 await expect(page.locator("#more-learning > summary")).toBeFocused();
 await expect(page.locator("#lesson")).toBeVisible();
});

test("Linux subject home stays focused and fits a narrow phone",async({page})=>{
 await page.setViewportSize({width:375,height:812});
 await page.goto(base+"/linux-home.html");
 await expect(page.getByRole("heading",{name:"Linux, 하나씩 배워요"})).toBeVisible();
 await expect(page.getByRole("img",{name:"헤드폰을 쓴 Meowde"})).toBeVisible();
 expect(await page.getByRole("img",{name:"헤드폰을 쓴 Meowde"}).evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
 await expect(page.getByRole("link",{name:/학습 시작하기/})).toBeVisible();
 await expect(page.getByRole("link",{name:/전체 단원/})).toBeVisible();
 const size=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:window.innerWidth}));
 expect(size.scroll).toBeLessThanOrEqual(size.viewport);
 const action=page.getByRole("link",{name:/학습 시작하기/});
 const rect=await action.boundingBox();
 expect(rect.width).toBeGreaterThan(44);
 expect(rect.height).toBeGreaterThanOrEqual(44);
 await action.click();
 await expect(page.locator("#micro-e1")).toBeVisible();
});
test("subject home reads progress but never rewrites legacy records",async({page})=>{
 await page.goto(base+"/linux-home.html");
 await page.evaluate(()=>{
  localStorage.setItem("meowde-linux-cram-v1",JSON.stringify({done:{"0":true,"1":true},index:2}));
  localStorage.setItem("meowde-linux-robotics-v1",'{"done":{"0-0":true}}');
 });
 await page.reload();
 await expect(page.locator("#course-count")).toHaveText("개념 학습 2 / 9");
 const value=await page.evaluate(()=>({
  old:localStorage.getItem("meowde-linux-robotics-v1"),
  course:JSON.parse(localStorage.getItem("meowde-linux-cram-v1"))
 }));
 expect(value.old).toBe('{"done":{"0-0":true}}');
 expect(value.course.index).toBe(2);
});

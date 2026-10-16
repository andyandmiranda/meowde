const {test,expect}=require("playwright/test");
const base=process.env.MEOWDE_BASE_URL||"http://127.0.0.1:4173";
test("Practice tab shows task before textbook sections and distinguishes basic and advanced routes",async({page})=>{
 await page.setViewportSize({width:375,height:812});
 await page.goto(base+"/python-lab.html");
 await expect(page.locator("#learner-code")).toBeVisible();
 await expect(page.getByRole("heading",{name:"Python 실습"})).toBeVisible();
 await expect(page.locator(".practice-mode-switch")).toContainText("기본 문제");
 await expect(page.locator(".practice-mode-switch")).toContainText("추가 코드 실습");
 await expect(page.locator(".practice-mode-switch a")).toHaveAttribute("href","/learning-path.html?subject=python");
 const positions=await page.evaluate(()=>({practice:[...document.querySelector(".lesson").children].indexOf(document.querySelector("#practice")),concept:[...document.querySelector(".lesson").children].indexOf(document.querySelector("#practice-concept")),quiz:[...document.querySelector(".lesson").children].indexOf(document.querySelector("#quiz")),width:document.documentElement.scrollWidth,viewport:innerWidth}));
 expect(positions.practice).toBeLessThan(positions.concept);
 expect(positions.practice).toBeLessThan(positions.quiz);
 expect(positions.width).toBeLessThanOrEqual(positions.viewport);
 await expect(page.locator("#solution")).toBeAttached();
 await expect(page.locator("#hint-button")).toBeVisible();
 await expect(page.locator("#quiz")).toBeAttached();
});
test("Practice-first layout preserves independent drafts and original course records",async({page})=>{
 await page.goto(base+"/python-lab.html");
 await expect(page.locator("#learner-code")).toBeVisible();
 await page.evaluate(()=>localStorage.setItem("meowde-v410-state",'{"done":[0,1],"xp":99,"next":2}'));
 const initial=await page.evaluate(()=>localStorage.getItem("meowde-v410-state"));
 await page.locator("#learner-code").fill("print('my draft')");
 await page.reload();
 await expect(page.locator("#learner-code")).toHaveValue("print('my draft')");
 expect(await page.evaluate(()=>localStorage.getItem("meowde-v410-state"))).toBe(initial);
});

const {test,expect}=require("playwright/test");
const base=process.env.MEOWDE_BASE_URL||"http://127.0.0.1:4173";
test("Python home shows the learning journey and preserves direct navigation",async({page})=>{
 await page.addInitScript(()=>localStorage.setItem("meowde-v410-seen","1"));
 await page.goto(base+"/");
 await page.waitForFunction(()=>document.documentElement.dataset.homeRenderer==="canonical-v414");
 await expect(page.locator(".meowde-subject-overview")).toHaveCount(0);
 await expect(page.locator(".hero .btn")).toHaveCount(1);
 await expect(page.locator(".meowde-home-journey")).toBeVisible();
 await expect(page.locator(".tabbar[data-phase1-navigation=five-tabs] button")).toHaveCount(5);
 await expect(page.getByRole("button",{name:"학습",exact:true})).toBeVisible();
 await expect(page.getByRole("button",{name:"실습",exact:true})).toBeVisible();
 await page.locator(".hero .btn").click();
 await expect(page.locator(".lesson-top")).toBeVisible();
});
test("Linux home has one visible lesson action and secondary routes collapsed",async({page})=>{
 await page.goto(base+"/linux-home.html");
 await expect(page.locator("#guided-entry")).toBeVisible();
 await expect(page.locator(".meowde-subject-overview")).toHaveCount(0);
 await expect(page.getByRole("link",{name:"추가 문제 풀기 →"})).toBeHidden();
 await page.locator(".meowde-more summary").click();
 await expect(page.getByRole("link",{name:"추가 문제 풀기 →"})).toBeVisible();
});
test("Python extra challenges share typography and retain accessible code font",async({page})=>{
 await page.goto(base+"/python-lab.html");
 await expect(page).toHaveTitle(/Python 추가 문제/);
 const f=await page.evaluate(()=>({body:getComputedStyle(document.body).fontFamily,code:getComputedStyle(document.querySelector("pre")||document.createElement("pre")).fontFamily}));
 expect(f.body).toMatch(/Pretendard/);
});


const {test,expect}=require("playwright/test");
const base=process.env.MEOWDE_BASE_URL||"http://127.0.0.1:4173";
test("Linux extra practice exposes the real course and terminal instead of an inaccessible collapsed page",async({page})=>{
 await page.goto(base+"/linux-crash-course.html");
 const more=page.locator("#more-learning");
 await expect(more).toHaveAttribute("open","");
 await expect(more.locator("summary")).toBeVisible();
 await expect(page.locator("#nav")).toBeVisible();
 await expect(page.locator("#lesson")).toBeVisible();
 await expect(page.locator("#sim-input")).toBeVisible();
 await expect(page.locator("#bash-source")).toBeVisible();
});
test("Python review keeps missed questions and recent completed lessons directly accessible",async({page})=>{
 await page.addInitScript(()=>localStorage.setItem("meowde-v410-seen","1"));
 await page.goto(base+"/");
 await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==="ordered");
 await page.evaluate(()=>{S.done=[0,1,2,3,4];save();renderReview();});
 await expect(page.locator(".phase5-review .review-item").first()).toBeVisible();
 await expect(page.locator(".phase5-review .review-more-completed")).toBeVisible();
 await expect(page.locator(".phase5-review .review-more-completed")).not.toHaveAttribute("open","");
 await page.locator(".review-more-completed summary").click();
 await expect(page.locator(".review-more-completed .review-item")).toHaveCount(2);
 await expect(page.locator(".tabbar[data-phase1-navigation=five-tabs] button")).toHaveCount(5);
});

const {test,expect}=require("playwright/test");
const base=process.env.MEOWDE_BASE_URL||"http://127.0.0.1:4173";

test("original OOP composition unit is navigable and preserves the existing progress key",async({page})=>{
  const legacy='{"xp":31,"churu":12,"done":[0],"keep":"unchanged"}';
  await page.goto(base+"/python-lab.html#object-collaboration");
  await expect(page.locator("#unit-title")).toHaveText("클래스와 객체를 함께 사용하기");
  await expect(page.locator("#unit-nav a")).toHaveCount(20);
  await expect(page.locator("#practice")).toContainText("TaskLog(label)");
  await expect(page.locator("#practice")).toContainText("LogSummary(logs)");
  await page.evaluate(value=>localStorage.setItem("meowde-v410-state",value),legacy);
  const draft="class TaskLog:\n    # learner draft is not an automatic pass\n    pass";
  await page.locator("#learner-code").fill(draft);
  await page.locator("#hint-button").click();
  await page.reload();
  await expect(page.locator("#unit-title")).toHaveText("클래스와 객체를 함께 사용하기");
  await expect(page.locator("#learner-code")).toHaveValue(draft);
  await expect(page.locator("#hints p")).toHaveCount(1);
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem("meowde-python-lab-v1")));
  expect(saved.version).toBe(1);
  expect(saved.units["object-collaboration"].draft).toBe(draft);
  expect(saved.units["object-collaboration"].passed).not.toBe(true);
  expect(await page.evaluate(()=>localStorage.getItem("meowde-v410-state"))).toBe(legacy);
});

test("new OOP task and action are accessible on narrow mobile screens",async({page})=>{
  await page.setViewportSize({width:375,height:667});
  await page.goto(base+"/python-lab.html#object-collaboration");
  await expect(page.locator("#unit-title")).toBeVisible();
  await expect(page.locator("#learner-code")).toBeVisible();
  await expect(page.locator('#practice [data-run="grade"]')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.locator("#nav-toggle").click();
  await expect(page.locator('#unit-nav a[href="#objects"]')).toBeVisible();
});

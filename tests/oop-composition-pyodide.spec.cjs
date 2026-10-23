const {test,expect}=require("playwright/test");
const fs=require("node:fs"),path=require("node:path");
const base=process.env.MEOWDE_BASE_URL||"http://127.0.0.1:4173";
const content=JSON.parse(fs.readFileSync(path.resolve(__dirname,"../assets/python-lab-content.json"),"utf8"));
const oop=content.units.find(unit=>unit.id==="object-collaboration");
if(!oop)throw new Error("Expected original OOP composition content at this exact revision");

// This test exercises the shipped Python Worker -> Pyodide -> actual criteria path.
// No worker stubs, no mocked grader, and no real learner browser profile.
test("original OOP composition genuinely rejects shared state, accepts correct code, and restores progress",async({page})=>{
  test.setTimeout(240000);
  await page.goto(base+"/python-lab.html#object-collaboration");
  await expect(page.locator("#unit-title")).toHaveText(oop.title);
  const previous='{"xp":31,"churu":12,"done":[0],"keep":"verbatim"}';
  const existing='{"version":1,"units":{"objects":{"draft":"existing OOP learner draft","passed":true,"independentPassed":true,"custom":"unchanged"}}}';
  await page.evaluate(({previous,existing})=>{
    localStorage.setItem("meowde-v410-state",previous);
    localStorage.setItem("meowde-python-lab-v1",existing);
  },{previous,existing});
  await page.reload();
  await expect(page.locator("#unit-title")).toHaveText(oop.title);
  const incorrect=[
    "class TaskLog:",
    "    records = []  # BUG: one shared list across instances",
    "    def __init__(self, label):",
    "        self.label = label",
    "    def record(self, text):",
    "        self.records.append(text)",
    "        return len(self.records)",
    "",
    "class LogSummary:",
    "    def __init__(self, logs):",
    "        self.logs = logs  # BUG: the caller can append new objects",
    "    def count(self):",
    "        return sum(len(log.records) for log in self.logs)"
  ].join("\n");
  async function grade(code){
    await page.locator("#learner-code").fill(code);
    await page.locator('#practice [data-run="grade"]').click();
    await expect(page.locator("#stop-run")).toBeHidden({timeout:145000});
    return (await page.locator("#run-status").textContent())||"";
  }
  const wrong=await grade(incorrect);
  expect(wrong).toContain("일부 기준");
  expect(await page.locator("#run-results .result-fail").count()).toBeGreaterThan(0);
  const afterWrong=await page.evaluate(()=>JSON.parse(localStorage.getItem("meowde-python-lab-v1")));
  expect(afterWrong.units["object-collaboration"].attempts).toBe(1);
  expect(afterWrong.units["object-collaboration"].lastPassed).toBe(false);
  expect(afterWrong.units["object-collaboration"].passed).not.toBe(true);
  expect(afterWrong.units.objects).toEqual(JSON.parse(existing).units.objects);
  expect(await page.evaluate(()=>localStorage.getItem("meowde-v410-state"))).toBe(previous);
  const correct=await grade(oop.task.model);
  expect(correct).toContain("모든 기준 통과");
  await expect(page.locator("#run-results .result-pass")).toHaveCount(6);
  await expect(page.locator("#run-results .result-fail")).toHaveCount(0);
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem("meowde-python-lab-v1")));
  expect(saved.units["object-collaboration"].attempts).toBe(2);
  expect(saved.units["object-collaboration"].passed).toBe(true);
  expect(saved.units["object-collaboration"].independentPassed).toBe(true);
  expect(saved.units.objects).toEqual(JSON.parse(existing).units.objects);
  await page.reload();
  await expect(page.locator("#unit-title")).toHaveText(oop.title);
  await expect(page.locator("#learner-code")).toHaveValue(oop.task.model);
  const restored=await page.evaluate(()=>JSON.parse(localStorage.getItem("meowde-python-lab-v1")));
  expect(restored.units["object-collaboration"].attempts).toBe(2);
  expect(restored.units["object-collaboration"].independentPassed).toBe(true);
  expect(restored.units.objects).toEqual(JSON.parse(existing).units.objects);
  expect(await page.evaluate(()=>localStorage.getItem("meowde-v410-state"))).toBe(previous);
});

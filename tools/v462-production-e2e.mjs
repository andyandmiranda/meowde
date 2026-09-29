import { chromium } from "playwright";
import fs from "node:fs";

const BASE="https://meowde.vercel.app";
const OUT="v462-e2e-artifacts";
fs.mkdirSync(OUT,{recursive:true});
const failures=[];
const results={};
const errors=[];
const badResponses=[];
const expect=(condition,message)=>{
  if(!condition){failures.push(message);console.error("FAIL:",message)}
  else console.log("PASS:",message);
};

const browser=await chromium.launch({headless:true});

async function fresh(seed=null,locale="ko-KR"){
  const context=await browser.newContext({
    viewport:{width:390,height:844},screen:{width:390,height:844},deviceScaleFactor:1,
    isMobile:true,hasTouch:true,locale
  });
  if(seed){
    await context.addInitScript(value=>{
      localStorage.setItem("meowde-v410-state",JSON.stringify(value));
    },seed);
  }
  const page=await context.newPage();
  page.on("pageerror",e=>errors.push("pageerror: "+e.message));
  page.on("console",m=>{if(m.type()==="error")errors.push("console-error: "+m.text())});
  page.on("response",r=>{if(r.status()>=400&&r.url().startsWith(BASE))badResponses.push(`${r.status()} ${r.url()}`)});
  const response=await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:45000});
  await page.waitForFunction(()=>typeof S!=="undefined"&&document.querySelector(".screen"),null,{timeout:20000});
  await page.evaluate(async()=>{if(window.MeowRelease&&MeowRelease.loadPromise)await MeowRelease.loadPromise});
  await page.waitForFunction(()=>window.MeowCurriculumUnit6?.ready===true&&window.MeowUnit6Integration&&lessons().length===60,null,{timeout:15000});
  return {context,page,response};
}

async function openWrite(page,lessonIndex){
  await page.evaluate(index=>{
    const write=lessons()[index].exercises.find(item=>item.type==="write");
    startLesson(index,false,[write],{force:true});
  },lessonIndex);
  await page.waitForFunction(()=>S.screen==="lesson"&&document.getElementById("code-editor"),null,{timeout:10000});
}

async function runCode(page,code){
  await page.locator("#code-editor").fill(code);
  await page.getByRole("button",{name:"코드 실행"}).click();
  await page.waitForFunction(()=>S.checked===true,null,{timeout:90000});
  return page.evaluate(()=>({
    correct:S.correct,
    output:S.output,
    grading:window.MeowWriteGrading?.lastResult?.()||null,
    diagnostic:Array.from(document.querySelectorAll(".v457-diagnostic-row")).map(row=>({
      label:row.querySelector("b")?.textContent?.trim()||"",
      value:row.querySelector("span")?.textContent?.trim()||""
    })),
    kind:document.querySelector(".v457-diagnostic")?.getAttribute("data-diagnostic-kind")||""
  }));
}

try{
  const legacy={
    lang:"ko",done:Array.from({length:50},(_,i)=>i),next:49,unit:4,
    xp:0,churu:120,streak:1,milk:5,cat:"meowde",mistakes:[],dailyHistory:{},activityDates:[]
  };
  let {context,page,response}=await fresh(legacy);
  expect(Boolean(response&&response.ok()),"Production returns HTTP 2xx");

  const runtime=await page.evaluate(()=>({
    count:lessons().length,
    next:S.next,
    done:S.done.length,
    persistedNext:JSON.parse(localStorage.getItem("meowde-v410-state")||"{}").next,
    unit6:window.MeowCurriculumUnit6?.version,
    integration:window.MeowUnit6Integration?.version,
    releaseHealth:document.documentElement.dataset.releaseHealth||""
  }));
  results.runtime=runtime;
  expect(runtime.count===60,"Production exposes 60 lessons");
  expect(runtime.done===50,"Lessons 1–50 completion is preserved");
  expect(runtime.next===50&&runtime.persistedNext===50,"Unit 05 completer unlocks and persists Lesson 51");
  expect(runtime.unit6==="4.61-unit6-oop"&&runtime.integration==="4.62-unit6-integration","Unit 06 data and integration APIs are active");
  expect(runtime.releaseHealth!=="error","Release health is not error");

  await page.locator('.tabbar button[aria-label="학습"]').click();
  await page.waitForFunction(()=>S.screen==="map",null,{timeout:10000});
  const tabs=await page.locator(".unit-tabs button").allTextContents();
  results.tabs=tabs;
  expect(tabs.length===6,"Learn shows six unit tabs");
  expect(tabs[5].includes("06 객체·상태·프로젝트"),"Sixth tab has the Unit 06 Korean label");
  await page.locator(".unit-tabs button").nth(5).click();
  await page.waitForFunction(()=>S.unit===5,null,{timeout:10000});
  const pathState=await page.evaluate(()=>({
    unit:S.unit,
    nodes:document.querySelectorAll(".trail button.node").length,
    firstClass:document.querySelector(".trail button.node")?.className||"",
    firstLabel:document.querySelector(".trail .node-label")?.textContent?.trim()||"",
    viewport:innerWidth,
    scrollWidth:document.documentElement.scrollWidth,
    tabScrollWidth:document.querySelector(".unit-tabs")?.scrollWidth||0,
    tabClientWidth:document.querySelector(".unit-tabs")?.clientWidth||0
  }));
  results.path=pathState;
  expect(pathState.unit===5&&pathState.nodes===10,"Unit 06 renders Lessons 51–60");
  expect(pathState.firstClass.includes("current")&&!pathState.firstClass.includes("locked"),"Lesson 51 is current and unlocked");
  expect(pathState.firstLabel.includes("클래스"),"Lesson 51 starts with classes and objects");
  expect(pathState.scrollWidth<=390,"Six-unit Learn page has no horizontal page overflow");
  expect(pathState.tabScrollWidth>=pathState.tabClientWidth,"Unit tabs remain horizontally scrollable when needed");
  await page.screenshot({path:`${OUT}/01-unit6-path-390x844.png`,fullPage:false});
  await context.close();

  ({context,page}=await fresh());
  await openWrite(page,50);
  const hardcoded=await runCode(page,'print("cat")');
  results.classHardcoded=hardcoded;
  expect(hardcoded.correct===false,"Hardcoded Lesson 51 visible output is rejected");
  expect(hardcoded.grading?.visiblePassed===true&&hardcoded.grading?.passed===false,"Lesson 51 hidden object test catches hardcoding");
  expect(hardcoded.kind==="generalization","Lesson 51 failure is classified as generalization feedback");
  expect(hardcoded.diagnostic.some(row=>row.value.includes("species")||row.value.includes("Cat 객체")),"Lesson 51 shows task-specific class/attribute diagnosis");
  await page.screenshot({path:`${OUT}/02-class-hardcoded-diagnostic.png`,fullPage:false});
  await context.close();

  ({context,page}=await fresh());
  await openWrite(page,50);
  const classPass=await runCode(page,'class Cat:\n    species = "cat"\ncat = Cat()\nprint(cat.species)');
  results.classPass=classPass;
  expect(classPass.correct===true&&classPass.output==="cat","Reusable Cat class solution passes Lesson 51");
  expect(classPass.grading?.passed===true,"Lesson 51 hidden test passes for another Cat object");
  await page.screenshot({path:`${OUT}/03-class-generalized-pass.png`,fullPage:false});
  await context.close();

  ({context,page}=await fresh());
  await openWrite(page,59);
  const petCode=`import json\nclass Pet:\n    def __init__(self, name, energy=0):\n        self.name = name\n        self.energy = energy\n    def feed(self):\n        self.energy += 1\n    def to_dict(self):\n        return {"name": self.name, "energy": self.energy}\ndef save_pet(filename, pet):\n    with open(filename, "w") as file:\n        json.dump(pet.to_dict(), file)\ndef load_pet(filename):\n    with open(filename, "r") as file:\n        data = json.load(file)\n    return Pet(data["name"], data["energy"])\npet = Pet("Mimi", 1)\npet.feed()\nsave_pet("pet.json", pet)\nrestored = load_pet("pet.json")\nprint(f"{restored.name}:{restored.energy}")`;
  const petPass=await runCode(page,petCode);
  results.petPass=petPass;
  expect(petPass.correct===true&&petPass.output==="Mimi:2","Pet Tracker visible project output passes");
  expect(petPass.grading?.passed===true,"Pet Tracker hidden test preserves another Pet's accumulated state through JSON file save/restore");
  await page.screenshot({path:`${OUT}/04-pet-tracker-pass.png`,fullPage:false});

  const englishData=await page.evaluate(()=>{
    S.lang="en";
    const lesson=lessons()[50];
    const visible=[lesson.title,lesson.short,lesson.description];
    lesson.exercises.forEach(ex=>{
      ["title","body","prompt","hint","explain","starter","testcase"].forEach(key=>{if(typeof ex[key]==="string")visible.push(ex[key])});
      if(Array.isArray(ex.choices))visible.push(...ex.choices);
    });
    return {title:lesson.title,hasHangul:visible.some(value=>/[가-힣]/.test(String(value||"")))};
  });
  results.english=englishData;
  expect(englishData.title==="Class Blueprint"&&!englishData.hasHangul,"English Unit 06 runtime copy is fully English");
  await context.close();

  expect(errors.length===0,`No console/page errors${errors.length?": "+errors.join(" | "):""}`);
  expect(badResponses.length===0,`No Production HTTP 4xx/5xx responses${badResponses.length?": "+badResponses.join(" | "):""}`);
}catch(error){
  failures.push("Uncaught E2E error: "+error.message);
  console.error(error);
}

results.errors=errors;
results.badResponses=badResponses;
results.failures=failures;
fs.writeFileSync(`${OUT}/report.json`,JSON.stringify(results,null,2));
await browser.close();
if(failures.length){console.error("Unit 06 Production E2E FAILED");process.exit(1)}
console.log("Unit 06 Production E2E PASSED");

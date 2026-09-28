import { chromium } from "playwright";
import fs from "node:fs";

const BASE="https://meowde.vercel.app";
const OUT="v459-e2e-artifacts";
fs.mkdirSync(OUT,{recursive:true});
const failures=[],results={};
const expect=(condition,message)=>{if(!condition){failures.push(message);console.error("FAIL:",message)}else console.log("PASS:",message)};

const browser=await chromium.launch({headless:true});
const errors=[];

async function fresh(seed=null){
  const context=await browser.newContext({viewport:{width:390,height:844},screen:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true,locale:"ko-KR"});
  if(seed)await context.addInitScript(value=>localStorage.setItem("meowde-v410-state",JSON.stringify(value)),seed);
  const page=await context.newPage();
  page.on("pageerror",e=>errors.push("pageerror: "+e.message));
  page.on("console",m=>{if(m.type()==="error")errors.push("console-error: "+m.text())});
  const response=await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:45000});
  await page.waitForFunction(()=>typeof S!=="undefined"&&document.querySelector(".screen"),null,{timeout:20000});
  await page.evaluate(async()=>{if(window.MeowRelease&&MeowRelease.loadPromise)await MeowRelease.loadPromise});
  await page.waitForFunction(()=>window.MeowCurriculumUnit5&&window.MeowUnit5Integration&&window.MeowDiagnosticFeedback,null,{timeout:10000});
  return {context,page,response};
}

async function openWrite(page,index){
  await page.evaluate(lessonIndex=>{
    const write=lessons()[lessonIndex].exercises.find(x=>x.type==="write");
    startLesson(lessonIndex,false,[write],{force:true});
  },index);
  await page.waitForFunction(()=>S.screen==="lesson"&&document.getElementById("code-editor"),null,{timeout:10000});
}

async function runCode(page,code){
  await page.locator("#code-editor").fill(code);
  await page.getByRole("button",{name:"코드 실행"}).click();
  await page.waitForFunction(()=>S.checked===true,null,{timeout:90000});
  return page.evaluate(()=>({correct:S.correct,output:S.output,diagnostic:Array.from(document.querySelectorAll(".v457-diagnostic-row")).map(row=>({label:row.querySelector("b")?.textContent?.trim()||"",value:row.querySelector("span")?.textContent?.trim()||""}))}));
}

try{
  const legacy={lang:"ko",done:Array.from({length:40},(_,i)=>i),next:39,xp:0,churu:120,streak:1,milk:5,cat:"meowde",unit:3,mistakes:[],dailyHistory:{},activityDates:[]};
  let {context,page,response}=await fresh(legacy);
  expect(Boolean(response&&response.ok()),"Production returns HTTP 2xx");
  const runtime=await page.evaluate(()=>({lessons:lessons().length,next:S.next,unit5:MeowCurriculumUnit5.version,integration:MeowUnit5Integration.version,health:document.documentElement.dataset.releaseHealth||"",order:MeowRelease?.enhancementOrder||[]}));
  results.runtime=runtime;
  expect(runtime.lessons===50,"Production exposes 50 lessons");
  expect(runtime.next===40,"Learner who completed lessons 1-40 unlocks lesson 41");
  expect(runtime.health!=="error","Release health is not error");
  expect(runtime.order.includes("meowde-v458-unit5-data")&&runtime.order.includes("meowde-v459-unit5-integration"),"Ordered bootstrap includes Unit 05 data and integration");

  await page.locator('.tabbar button[aria-label="학습"]').click();
  await page.waitForFunction(()=>S.screen==="map");
  await page.waitForFunction(()=>document.querySelectorAll(".unit-tabs button").length===5);
  const nav=await page.evaluate(()=>{const tabs=document.querySelector(".unit-tabs");return {labels:Array.from(tabs.querySelectorAll("button")).map(x=>x.textContent.trim()),clientWidth:tabs.clientWidth,scrollWidth:tabs.scrollWidth,pageWidth:document.documentElement.scrollWidth}});
  results.nav=nav;
  expect(nav.labels.length===5&&nav.labels[4].includes("05 예외·모듈·파일"),"Learn exposes exact Unit 05 label");
  expect(nav.pageWidth<=390,"Five-unit navigation does not create page-level horizontal overflow");
  expect(nav.scrollWidth>=nav.clientWidth,"Unit tabs remain contained in their horizontal scroller");
  await page.locator('.unit-tabs button[data-v459-unit="5"]').click();
  await page.waitForFunction(()=>S.unit===4);
  await page.waitForFunction(()=>document.querySelectorAll(".trail button.node").length===10);
  const unit5=await page.evaluate(()=>({unit:S.unit,nodes:document.querySelectorAll(".trail button.node").length,first:document.querySelector(".trail button.node")?.className||"",firstLabel:document.querySelector(".trail .node-label")?.textContent?.trim()||""}));
  results.unit5=unit5;
  expect(unit5.unit===4&&unit5.nodes===10,"Unit 05 renders lessons 41-50");
  expect(unit5.first.includes("current")&&!unit5.first.includes("locked"),"Lesson 41 is current and unlocked");
  expect(unit5.firstLabel.includes("try")||unit5.firstLabel.includes("except"),"Unit 05 begins with exception handling");
  await page.screenshot({path:`${OUT}/01-unit5-path.png`,fullPage:false});
  await context.close();

  // Hidden test + diagnostic: visible division works, zero division does not.
  ({context,page}=await fresh());
  await openWrite(page,40);
  let result=await runCode(page,'def safe_divide(a, b):\n    return a / b\nprint(safe_divide(8, 2))');
  results.exceptionWrong=result;
  expect(result.correct===false,"Visible-only division solution fails zero-division hidden test");
  expect(result.diagnostic.length===3&&result.diagnostic[0].value.includes("예외 처리"),"Exception hidden failure shows task-specific diagnostic feedback");
  expect(result.diagnostic[2].value.includes("ZeroDivisionError")||result.diagnostic[2].value.includes("ZERO"),"Exception diagnosis gives a concrete next fix");
  await page.screenshot({path:`${OUT}/02-exception-diagnostic.png`,fullPage:false});
  await context.close();

  // Correct exception solution.
  ({context,page}=await fresh());
  await openWrite(page,40);
  result=await runCode(page,'def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "ZERO"\nprint(safe_divide(8, 2))');
  results.exceptionCorrect=result;
  expect(result.correct===true&&result.output==="4.0","Reusable try/except solution passes visible and hidden cases");
  await context.close();

  // File write/read hidden test.
  ({context,page}=await fresh());
  await openWrite(page,45);
  result=await runCode(page,'def save_note(filename, text):\n    with open(filename, "w") as file:\n        file.write(text)\nsave_note("note.txt", "MEOWDE")\nwith open("note.txt", "r") as file:\n    print(file.read())');
  results.fileWrite=result;
  expect(result.correct===true&&result.output==="MEOWDE","File-writing exercise passes alternate-file hidden test in Production Pyodide");
  await page.screenshot({path:`${OUT}/03-file-write-pass.png`,fullPage:false});
  await context.close();

  // JSON persistence mini-project hidden test.
  ({context,page}=await fresh());
  await openWrite(page,49);
  result=await runCode(page,'import json\ndef save_profile(filename, profile):\n    with open(filename, "w") as file:\n        json.dump(profile, file)\ndef load_profile(filename):\n    with open(filename, "r") as file:\n        return json.load(file)\nsave_profile("profile.json", {"name":"Amy", "level":3})\nprofile = load_profile("profile.json")\nprint(f"{profile[\'name\']}:{profile[\'level\']}")');
  results.persistence=result;
  expect(result.correct===true&&result.output==="Amy:3","JSON persistence project passes alternate-profile hidden test");
  await page.screenshot({path:`${OUT}/04-persistence-pass.png`,fullPage:false});
  await context.close();

  expect(errors.length===0,`No console/page errors${errors.length?": "+errors.join(" | "):""}`);
}catch(error){
  failures.push("Uncaught E2E error: "+error.message);
  console.error(error);
}

results.errors=errors;results.failures=failures;
fs.writeFileSync(`${OUT}/report.json`,JSON.stringify(results,null,2));
await browser.close();
if(failures.length){console.error("Unit 05 Production E2E FAILED");process.exit(1)}
console.log("Unit 05 Production E2E PASSED");

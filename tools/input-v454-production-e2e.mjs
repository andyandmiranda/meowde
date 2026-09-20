import { chromium } from "playwright";
import fs from "node:fs";

const BASE="https://meowde.vercel.app";
const OUT="input-v454-e2e-artifacts";
fs.mkdirSync(OUT,{recursive:true});
const failures=[];
const results={};
const expect=(condition,message)=>{if(!condition){failures.push(message);console.error("FAIL:",message)}else console.log("PASS:",message)};

const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:390,height:844},screen:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true,locale:"ko-KR"});
const page=await context.newPage();
const errors=[];
page.on("pageerror",e=>errors.push("pageerror: "+e.message));
page.on("console",m=>{if(m.type()==="error")errors.push("console-error: "+m.text())});

try{
  const response=await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:45000});
  expect(Boolean(response&&response.ok()),"Production returns HTTP 2xx");
  await page.waitForFunction(()=>typeof S!=="undefined"&&document.querySelector(".screen"),null,{timeout:20000});
  await page.evaluate(async()=>{if(window.MeowRelease&&MeowRelease.loadPromise)await MeowRelease.loadPromise});
  await page.waitForFunction(()=>window.MeowRealInput&&MeowRealInput.version==="4.54-real-input",null,{timeout:10000});
  results.release=await page.evaluate(()=>({realInput:MeowRealInput.version,health:document.documentElement.dataset.releaseHealth||"",enhancements:window.MeowRelease?.enhancementOrder||[]}));
  expect(results.release.health!=="error","Release health is not error");
  expect(results.release.enhancements.includes("meowde-v454-input-practice"),"Ordered bootstrap includes v454 input practice");

  await page.evaluate(()=>{
    const lesson=lessons()[10];
    const write=lesson.exercises.find(item=>item.type==="write");
    startLesson(10,false,[write],{force:true});
  });
  await page.waitForFunction(()=>S.screen==="lesson"&&document.getElementById("program-stdin")&&document.getElementById("code-editor"),null,{timeout:10000});

  const initial=await page.evaluate(()=>({
    lesson:S.lessonIndex,
    exercise:cur().id,
    stdinMeta:cur().stdin,
    stdinValue:document.getElementById("program-stdin").value,
    code:document.getElementById("code-editor").value,
    width:innerWidth,
    scrollWidth:document.documentElement.scrollWidth
  }));
  results.initial=initial;
  expect(initial.lesson===10&&initial.exercise==="input-window-w","Lesson 11 real-input write exercise opens directly");
  expect(initial.stdinMeta&&initial.stdinMeta.default==="Amy","Exercise exposes deterministic stdin metadata");
  expect(initial.stdinValue==="Amy","Program input defaults to Amy");
  expect(initial.code.includes("input()"),"Starter code uses real input()");
  expect(initial.width===390&&initial.scrollWidth<=390,"Input practice has no horizontal overflow");

  await page.locator("#program-stdin").fill("Amy");
  const stored=await page.evaluate(()=>{
    const raw=JSON.parse(localStorage.getItem("meowde-v410-state")||"{}");
    return raw.inProgress&&{stdinExerciseId:raw.inProgress.stdinExerciseId,stdinValue:raw.inProgress.stdinValue};
  });
  results.stored=stored;
  expect(stored&&stored.stdinExerciseId==="input-window-w"&&stored.stdinValue==="Amy","Program input persists inside existing in-progress state");

  await page.locator("#code-editor").fill('name = input()\nprint("Welcome " + name)');
  await page.screenshot({path:`${OUT}/01-before-run-390x844.png`,fullPage:false});
  await page.getByRole("button",{name:"코드 실행"}).click();
  await page.waitForFunction(()=>S.checked===true,null,{timeout:90000});
  const executed=await page.evaluate(()=>({correct:S.correct,output:S.output,stdinValue:S.stdinValue,screen:S.screen}));
  results.executed=executed;
  expect(executed.correct===true,"Real input() exercise is graded correct");
  expect(executed.output==="Welcome Amy","Python input() receives the Program input value");
  expect(executed.stdinValue==="Amy","Typed stdin value remains in runtime state after execution");
  await page.screenshot({path:`${OUT}/02-after-run-390x844.png`,fullPage:false});
  expect(errors.length===0,`No console/page errors${errors.length?": "+errors.join(" | "):""}`);
}catch(error){
  failures.push("Uncaught E2E error: "+error.message);
  console.error(error);
}

results.errors=errors;
results.failures=failures;
fs.writeFileSync(`${OUT}/report.json`,JSON.stringify(results,null,2));
await browser.close();
if(failures.length){console.error("v4.54 input Production E2E FAILED");process.exit(1)}
console.log("v4.54 input Production E2E PASSED");

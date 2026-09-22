import { chromium } from "playwright";
import fs from "node:fs";

const BASE="https://meowde.vercel.app";
const OUT="v456-e2e-artifacts";
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
  await page.waitForFunction(()=>window.MeowCurriculumExpansion&&MeowCurriculumExpansion.version==="4.56-unit4-data",null,{timeout:10000});

  const runtime=await page.evaluate(()=>({
    ko:window.MEOWDE_LESSONS_KO?.length,
    en:window.MEOWDE_LESSONS_EN?.length,
    version:MeowCurriculumExpansion.version,
    health:document.documentElement.dataset.releaseHealth||"",
    order:window.MeowRelease?.enhancementOrder||[]
  }));
  results.runtime=runtime;
  expect(runtime.ko===40&&runtime.en===40,"Production exposes 40 bilingual lessons");
  expect(runtime.health!=="error","Release health is not error");
  expect(runtime.order.includes("meowde-v456-unit4-data"),"Ordered bootstrap includes Unit 04 expansion");

  await page.evaluate(()=>{
    const state={lang:"ko",done:Array.from({length:30},(_,i)=>i),next:29,xp:0,churu:120,streak:1,milk:5,cat:"meowde",unit:2,mistakes:[],dailyHistory:{},activityDates:[]};
    localStorage.setItem("meowde-v410-state",JSON.stringify(state));
  });
  await page.reload({waitUntil:"domcontentloaded"});
  await page.waitForFunction(()=>typeof S!=="undefined"&&document.querySelector(".screen"),null,{timeout:20000});
  await page.evaluate(async()=>{if(window.MeowRelease&&MeowRelease.loadPromise)await MeowRelease.loadPromise});
  await page.waitForFunction(()=>window.MeowCurriculumExpansion&&window.MEOWDE_LESSONS_KO.length===40,null,{timeout:10000});
  const unlocked=await page.evaluate(()=>({next:S.next,done:S.done.length,homeText:document.body.innerText.slice(0,1200)}));
  results.unlocked=unlocked;
  expect(unlocked.next===30,"Original 30-lesson completer unlocks lesson 31");

  await page.getByRole("button",{name:"학습"}).click();
  await page.waitForFunction(()=>S.screen==="map");
  const unitLabels=await page.locator(".unit-tabs button").allTextContents();
  results.unitLabels=unitLabels;
  expect(unitLabels.length===4,"Learn shows four unit tabs");
  expect(unitLabels[3].includes("04 문자열·딕셔너리·데이터"),"Unit 04 label is visible");
  expect((await page.evaluate(()=>document.documentElement.scrollWidth))<=390,"Four-unit Learn screen has no horizontal page overflow");

  await page.locator(".unit-tabs button").nth(3).click();
  await page.waitForTimeout(200);
  const unit4=await page.evaluate(()=>({
    unit:S.unit,
    nodes:Array.from(document.querySelectorAll(".trail button.node")).map(node=>({label:node.getAttribute("aria-label"),classes:node.className,text:node.textContent.trim()})),
    labels:Array.from(document.querySelectorAll(".trail .node-label")).map(node=>node.textContent.trim())
  }));
  results.unit4=unit4;
  expect(unit4.unit===3&&unit4.nodes.length===10,"Unit 04 renders lessons 31–40");
  expect(unit4.nodes[0].classes.includes("current")&&!unit4.nodes[0].classes.includes("locked"),"Lesson 31 is current and unlocked");
  expect(unit4.labels[0].includes("문자열"),"Lesson 31 starts with string methods");
  await page.screenshot({path:`${OUT}/01-unit4-path-390x844.png`,fullPage:false});

  const clarity=await page.evaluate(()=>{
    const bad=/같은 결과가 나오게|이상한 줄|예측 문제와 다른 코드/;
    const items=[];
    lessons().slice(20,30).forEach((lesson,index)=>(lesson.exercises||[]).forEach(ex=>{if(bad.test(ex.prompt||""))items.push({lesson:index+21,id:ex.id,prompt:ex.prompt})}));
    return {bad:items,returnFill:lessons()[27].exercises.find(x=>x.id==="return-spring-f")?.prompt,bossWrite:lessons()[29].exercises.find(x=>x.id==="boss-bug-w")?.prompt};
  });
  results.clarity=clarity;
  expect(clarity.bad.length===0,"Reported ambiguous template wording is absent from lessons 21–30");
  expect(clarity.returnFill.includes("double(x) 함수를 정의"),"Return fill question explicitly asks for def");
  expect(clarity.bossWrite.includes("BOSS CLEAR"),"Boss write question has a concrete output goal");

  await page.evaluate(()=>{
    const write=lessons()[30].exercises.find(x=>x.type==="write");
    startLesson(30,false,[write],{force:true});
  });
  await page.waitForFunction(()=>S.screen==="lesson"&&document.getElementById("code-editor"),null,{timeout:10000});
  await page.locator("#code-editor").fill('print("MEOWDE")');
  await page.getByRole("button",{name:"코드 실행"}).click();
  await page.waitForFunction(()=>S.checked===true,null,{timeout:90000});
  const hardcoded=await page.evaluate(()=>({correct:S.correct,output:S.output,result:window.MeowWriteGrading?.lastResult?.()}));
  results.hardcoded=hardcoded;
  expect(hardcoded.correct===false,"Unit 04 hardcoded visible output is rejected by the hidden generalization case");
  expect(hardcoded.output.includes("추가 테스트 실패"),"Unit 04 shows the generic extra-test failure message");

  await page.evaluate(()=>{
    const write=lessons()[30].exercises.find(x=>x.type==="write");
    startLesson(30,false,[write],{force:true});
  });
  await page.waitForFunction(()=>document.getElementById("code-editor"));
  await page.locator("#code-editor").fill('def shout(text):\n    return text.upper()\nprint(shout("meowde"))');
  await page.getByRole("button",{name:"코드 실행"}).click();
  await page.waitForFunction(()=>S.checked===true,null,{timeout:90000});
  const generalized=await page.evaluate(()=>({correct:S.correct,output:S.output,result:window.MeowWriteGrading?.lastResult?.()}));
  results.generalized=generalized;
  expect(generalized.correct===true&&generalized.output==="MEOWDE","Reusable Unit 04 solution passes visible and hidden cases");
  expect(generalized.result&&generalized.result.passed===true,"Unit 04 hidden generalization case passes");
  await page.screenshot({path:`${OUT}/02-unit4-write-pass-390x844.png`,fullPage:false});

  expect(errors.length===0,`No console/page errors${errors.length?": "+errors.join(" | "):""}`);
}catch(error){
  failures.push("Uncaught E2E error: "+error.message);
  console.error(error);
}

results.errors=errors;
results.failures=failures;
fs.writeFileSync(`${OUT}/report.json`,JSON.stringify(results,null,2));
await browser.close();
if(failures.length){console.error("v4.56 Production E2E FAILED");process.exit(1)}
console.log("v4.56 Production E2E PASSED");

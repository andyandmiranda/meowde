import { chromium } from "playwright";
import fs from "node:fs";

const BASE="https://meowde.vercel.app";
const OUT="v457-e2e-artifacts";
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
  await page.waitForFunction(()=>window.MeowDiagnosticFeedback&&MeowDiagnosticFeedback.version==="4.57-diagnostic-feedback",null,{timeout:10000});
  return {context,page,response};
}

async function openWrite(page,lessonIndex){
  await page.evaluate(index=>{
    const write=lessons()[index].exercises.find(x=>x.type==="write");
    startLesson(index,false,[write],{force:true});
  },lessonIndex);
  await page.waitForFunction(()=>S.screen==="lesson"&&document.getElementById("code-editor"),null,{timeout:10000});
}

async function diagnostic(page){
  return page.evaluate(()=>({
    kind:document.querySelector(".v457-diagnostic")?.getAttribute("data-diagnostic-kind")||"",
    rows:Array.from(document.querySelectorAll(".v457-diagnostic-row")).map(row=>({
      label:row.querySelector("b")?.textContent?.trim()||"",
      value:row.querySelector("span")?.textContent?.trim()||""
    })),
    correct:S.correct,
    output:S.output
  }));
}

try{
  // Runtime + legacy completion + Unit 04 navigation.
  const legacy={lang:"ko",done:Array.from({length:30},(_,i)=>i),next:29,xp:0,churu:120,streak:1,milk:5,cat:"meowde",unit:2,mistakes:[],dailyHistory:{},activityDates:[]};
  let {context,page,response}=await fresh(legacy);
  expect(Boolean(response&&response.ok()),"Production returns HTTP 2xx");
  const runtime=await page.evaluate(()=>({
    lessons:lessons().length,
    next:S.next,
    diagnostic:MeowDiagnosticFeedback.version,
    health:document.documentElement.dataset.releaseHealth||""
  }));
  results.runtime=runtime;
  expect(runtime.lessons===40,"Production exposes 40 lessons");
  expect(runtime.next===30,"Original 30-lesson completer unlocks lesson 31");
  expect(runtime.health!=="error","Release health is not error");

  await page.locator('.tabbar button[aria-label="학습"]').click();
  await page.waitForFunction(()=>S.screen==="map");
  const labels=await page.locator(".unit-tabs button").allTextContents();
  expect(labels.length===4&&labels[3].includes("04 문자열·딕셔너리·데이터"),"Learn exposes the fourth unit");
  await page.locator(".unit-tabs button").nth(3).click();
  await page.waitForFunction(()=>S.unit===3);
  const unit4=await page.evaluate(()=>({
    unit:S.unit,
    nodes:document.querySelectorAll(".trail button.node").length,
    first:document.querySelector(".trail button.node")?.className||"",
    firstLabel:document.querySelector(".trail .node-label")?.textContent?.trim()||"",
    width:document.documentElement.scrollWidth
  }));
  results.unit4=unit4;
  expect(unit4.unit===3&&unit4.nodes===10,"Unit 04 selection persists and renders lessons 31–40");
  expect(unit4.first.includes("current")&&!unit4.first.includes("locked"),"Lesson 31 is current and unlocked");
  expect(unit4.firstLabel.includes("문자열"),"Unit 04 begins with string methods");
  expect(unit4.width<=390,"Unit 04 path has no horizontal page overflow");
  await page.screenshot({path:`${OUT}/01-unit4-path.png`,fullPage:false});
  await context.close();

  // Hardcoded input diagnosis.
  ({context,page}=await fresh());
  await openWrite(page,10);
  await page.locator("#program-stdin").fill("Amy");
  await page.locator("#code-editor").fill('print("Welcome Amy")');
  await page.getByRole("button",{name:"코드 실행"}).click();
  await page.waitForFunction(()=>S.checked===true,null,{timeout:90000});
  const inputDiag=await diagnostic(page);
  results.input=inputDiag;
  expect(inputDiag.correct===false&&inputDiag.kind==="generalization","Hardcoded input is graded wrong with generalization diagnosis");
  expect(inputDiag.rows.map(x=>x.label).join("|")==="원인|왜 틀렸을까|다음 수정","Diagnostic UI uses Cause → Why → Next fix");
  expect(inputDiag.rows[0].value.includes("input()"),"Input diagnosis says input() was not read");
  expect(inputDiag.rows[2].value.includes("name = input()"),"Input diagnosis gives a concrete next edit");
  await page.screenshot({path:`${OUT}/02-input-diagnostic.png`,fullPage:false});
  await context.close();

  // Hardcoded return diagnosis.
  ({context,page}=await fresh());
  await openWrite(page,27);
  await page.locator("#code-editor").fill("print(9)");
  await page.getByRole("button",{name:"코드 실행"}).click();
  await page.waitForFunction(()=>S.checked===true,null,{timeout:90000});
  const returnDiag=await diagnostic(page);
  results.returnHardcoded=returnDiag;
  expect(returnDiag.correct===false&&returnDiag.kind==="generalization","Hardcoded return example is graded wrong");
  expect(returnDiag.rows[0].value.includes("하드코딩"),"Return diagnosis identifies hardcoding");
  expect(returnDiag.rows[2].value.includes("return x * 3"),"Return diagnosis points to parameter-based return");
  await page.screenshot({path:`${OUT}/03-return-hardcoded-diagnostic.png`,fullPage:false});
  await context.close();

  // Runtime SyntaxError diagnosis.
  ({context,page}=await fresh());
  await openWrite(page,30);
  await page.locator("#code-editor").fill("print(");
  await page.getByRole("button",{name:"코드 실행"}).click();
  await page.waitForFunction(()=>S.checked===true,null,{timeout:90000});
  const syntaxDiag=await diagnostic(page);
  results.syntax=syntaxDiag;
  expect(syntaxDiag.correct===false&&syntaxDiag.kind==="runtime","Syntax error is classified as runtime feedback");
  expect(syntaxDiag.rows[0].value.includes("문법"),"Syntax error diagnosis explains the syntax category");
  expect(syntaxDiag.rows[2].value.includes("콜론")||syntaxDiag.rows[2].value.includes("괄호"),"Syntax error gives an actionable syntax check");
  await page.screenshot({path:`${OUT}/04-syntax-diagnostic.png`,fullPage:false});
  await context.close();

  expect(errors.length===0,`No console/page errors${errors.length?": "+errors.join(" | "):""}`);
}catch(error){
  failures.push("Uncaught E2E error: "+error.message);
  console.error(error);
}

results.errors=errors;results.failures=failures;
fs.writeFileSync(`${OUT}/report.json`,JSON.stringify(results,null,2));
await browser.close();
if(failures.length){console.error("v4.57 Production E2E FAILED");process.exit(1)}
console.log("v4.57 Production E2E PASSED");

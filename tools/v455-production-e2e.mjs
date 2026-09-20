import { chromium } from "playwright";
import fs from "node:fs";

const BASE="https://meowde.vercel.app";
const OUT="v455-e2e-artifacts";
fs.mkdirSync(OUT,{recursive:true});
const failures=[];
const results={};
const expect=(condition,message)=>{if(!condition){failures.push(message);console.error("FAIL:",message)}else console.log("PASS:",message)};

const browser=await chromium.launch({headless:true});

async function fresh(){
  const context=await browser.newContext({viewport:{width:390,height:844},screen:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true,locale:"ko-KR"});
  const page=await context.newPage();
  const errors=[];
  page.on("pageerror",e=>errors.push("pageerror: "+e.message));
  page.on("console",m=>{if(m.type()==="error")errors.push("console-error: "+m.text())});
  const response=await page.goto(BASE,{waitUntil:"domcontentloaded",timeout:45000});
  expect(Boolean(response&&response.ok()),"Production returns HTTP 2xx");
  await page.waitForFunction(()=>typeof S!=="undefined"&&document.querySelector(".screen"),null,{timeout:20000});
  await page.evaluate(async()=>{if(window.MeowRelease&&MeowRelease.loadPromise)await MeowRelease.loadPromise});
  await page.waitForFunction(()=>window.MeowWriteGrading&&MeowWriteGrading.version==="4.55-multicase-grading",null,{timeout:10000});
  return {context,page,errors};
}

async function openWrite(page,lessonIndex){
  await page.evaluate(index=>{
    const lesson=lessons()[index];
    const write=lesson.exercises.find(item=>item.type==="write");
    startLesson(index,false,[write],{force:true});
  },lessonIndex);
  await page.waitForFunction(()=>S.screen==="lesson"&&document.getElementById("code-editor"),null,{timeout:10000});
}

try{
  {
    const {context,page,errors}=await fresh();
    await openWrite(page,10);
    await page.locator("#program-stdin").fill("Amy");
    await page.locator("#code-editor").fill('print("Welcome Amy")');
    await page.getByRole("button",{name:"코드 실행"}).click();
    await page.waitForFunction(()=>S.checked===true,null,{timeout:90000});
    const value=await page.evaluate(()=>({correct:S.correct,output:S.output,result:MeowWriteGrading.lastResult(),width:innerWidth,scrollWidth:document.documentElement.scrollWidth}));
    results.inputHardcoded=value;
    expect(value.correct===false,"Hardcoded visible input answer is rejected");
    expect(value.result&&value.result.visiblePassed===true&&value.result.passed===false,"Visible case passes but extra input case fails");
    expect(value.output.includes("추가 테스트 실패"),"Learner sees a generic extra-test failure message");
    expect(value.scrollWidth<=390,"Failure state has no horizontal overflow");
    await page.screenshot({path:`${OUT}/01-input-hardcoded-fails.png`,fullPage:false});
    expect(errors.length===0,"Hardcoded input test has no console/page errors");
    await context.close();
  }

  {
    const {context,page,errors}=await fresh();
    await openWrite(page,10);
    await page.locator("#program-stdin").fill("Amy");
    await page.locator("#code-editor").fill('name = input()\nprint("Welcome " + name)');
    await page.getByRole("button",{name:"코드 실행"}).click();
    await page.waitForFunction(()=>S.checked===true,null,{timeout:90000});
    const value=await page.evaluate(()=>({correct:S.correct,output:S.output,result:MeowWriteGrading.lastResult()}));
    results.inputGeneralized=value;
    expect(value.correct===true&&value.output==="Welcome Amy","Generalized input() solution passes");
    expect(value.result&&value.result.passed===true,"Extra input case passes");
    await page.screenshot({path:`${OUT}/02-input-generalized-passes.png`,fullPage:false});
    expect(errors.length===0,"Generalized input test has no console/page errors");
    await context.close();
  }

  {
    const {context,page,errors}=await fresh();
    await openWrite(page,27);
    await page.locator("#code-editor").fill("print(9)");
    await page.getByRole("button",{name:"코드 실행"}).click();
    await page.waitForFunction(()=>S.checked===true,null,{timeout:90000});
    const value=await page.evaluate(()=>({correct:S.correct,output:S.output,result:MeowWriteGrading.lastResult()}));
    results.returnHardcoded=value;
    expect(value.correct===false,"Hardcoded return output is rejected");
    expect(value.result&&value.result.visiblePassed===true&&value.result.passed===false,"Alternate-number function test catches hardcoding");
    await page.screenshot({path:`${OUT}/03-return-hardcoded-fails.png`,fullPage:false});
    expect(errors.length===0,"Hardcoded return test has no console/page errors");
    await context.close();
  }

  {
    const {context,page,errors}=await fresh();
    await openWrite(page,27);
    await page.locator("#code-editor").fill("def triple(x):\n    return x * 3\nprint(triple(3))");
    await page.getByRole("button",{name:"코드 실행"}).click();
    await page.waitForFunction(()=>S.checked===true,null,{timeout:90000});
    const value=await page.evaluate(()=>({correct:S.correct,output:S.output,result:MeowWriteGrading.lastResult(),health:document.documentElement.dataset.releaseHealth||""}));
    results.returnGeneralized=value;
    expect(value.correct===true&&value.output==="9","Reusable triple() solution passes");
    expect(value.result&&value.result.passed===true,"Alternate-number function test passes");
    expect(value.health!=="error","Release health remains non-error");
    await page.screenshot({path:`${OUT}/04-return-generalized-passes.png`,fullPage:false});
    expect(errors.length===0,"Generalized return test has no console/page errors");
    await context.close();
  }
}catch(error){
  failures.push("Uncaught E2E error: "+error.message);
  console.error(error);
}

results.failures=failures;
fs.writeFileSync(`${OUT}/report.json`,JSON.stringify(results,null,2));
await browser.close();
if(failures.length){console.error("v4.55 Production E2E FAILED");process.exit(1)}
console.log("v4.55 Production E2E PASSED");

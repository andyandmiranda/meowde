import { chromium } from "playwright";
import fs from "node:fs";

const URL="https://meowde.vercel.app";
const out="curriculum-v452-e2e-artifacts";
fs.mkdirSync(out,{recursive:true});
const errors=[];
const badResponses=[];
function check(condition,message){if(!condition)throw new Error(`FAIL: ${message}`);console.log(`PASS: ${message}`)}

const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,locale:"ko-KR"});
const page=await context.newPage();
page.on("pageerror",error=>errors.push(`pageerror: ${error.message}`));
page.on("console",message=>{if(message.type()==="error")errors.push(`console: ${message.text()}`)});
page.on("response",response=>{if(response.status()>=400)badResponses.push(`${response.status()} ${response.url()}`)});

async function waitReady(){
  await page.waitForFunction(()=>window.MeowRelease&&window.MeowRelease.loadPromise&&window.MeowCurriculum&&document.documentElement.dataset.curriculum==="4.52-curriculum-v1",null,{timeout:15000});
  await page.evaluate(async()=>{await window.MeowRelease.loadPromise});
}
async function showLesson(index,lang="ko"){
  await page.evaluate(({index,lang})=>{
    S.lang=lang;
    S.lessonIndex=index;
    S.queue=lessons()[index].exercises.map(item=>Object.assign({},item));
    S.idx=0;S.checked=false;S.correct=false;S.hint=false;S.sel=null;S.fill="";S.write="";S.output="";S.loading=false;
    if(typeof setup==="function")setup();
    save();renderLesson();
  },{index,lang});
  await page.waitForFunction(()=>document.documentElement.dataset.lessonRenderer==="canonical-v413");
  return page.evaluate(()=>({
    title:document.querySelector(".lesson-title b")?.textContent||"",
    code:document.querySelector(".lesson-main .code")?.textContent||"",
    prompt:document.querySelector(".lesson-main .prompt")?.textContent||"",
    width:document.documentElement.scrollWidth,
    viewport:window.innerWidth
  }));
}

try{
  const response=await page.goto(URL,{waitUntil:"domcontentloaded",timeout:30000});
  check(response&&response.ok(),"Production returns HTTP 2xx");
  await waitReady();

  const runtime=await page.evaluate(()=>({
    curriculum:document.documentElement.dataset.curriculum,
    version:window.MeowCurriculum?.version,
    changes:window.MeowCurriculum?.changes?.length,
    ko:window.MEOWDE_LESSONS_KO?.length,
    en:window.MEOWDE_LESSONS_EN?.length
  }));
  console.log("runtime:",JSON.stringify(runtime));
  check(runtime.curriculum==="4.52-curriculum-v1","v452 curriculum marker is active");
  check(runtime.version==="4.52-curriculum-v1","MeowCurriculum API is active");
  check(runtime.changes===8,"four lessons are migrated in both languages");
  check(runtime.ko===30&&runtime.en===30,"runtime keeps 30 lessons in both languages");

  await page.evaluate(()=>{S.lang="ko";S.unit=0;save();renderMap()});
  const koUnits=await page.locator(".unit-tabs button").allTextContents();
  console.log("koUnits:",JSON.stringify(koUnits));
  check(JSON.stringify(koUnits)===JSON.stringify(["01 Python 기초","02 입력과 조건","03 컬렉션·반복·함수"]),"Korean unit labels match curriculum");
  await page.evaluate(()=>{S.lang="en";save();renderMap()});
  const enUnits=await page.locator(".unit-tabs button").allTextContents();
  console.log("enUnits:",JSON.stringify(enUnits));
  check(JSON.stringify(enUnits)===JSON.stringify(["01 Python Basics","02 Input & Decisions","03 Collections, Loops & Functions"]),"English unit labels match curriculum");

  const l10=await showLesson(9,"ko");
  console.log("L10:",JSON.stringify(l10));
  check(l10.title.includes("포매팅 다리"),"Lesson 10 renders the formatting lesson");
  check(l10.code.includes('f"Hello {name}"'),"Lesson 10 renders an f-string concept");
  check(l10.width===l10.viewport,"Lesson 10 has no horizontal overflow");
  await page.screenshot({path:`${out}/01-l10-fstring.png`,fullPage:true});

  const l12=await showLesson(11,"ko");
  console.log("L12:",JSON.stringify(l12));
  check(l12.title.includes("입력값 변환"),"Lesson 12 renders input conversion");
  check(l12.code.includes("int(age_text)"),"Lesson 12 renders int() conversion");
  check(l12.width===l12.viewport,"Lesson 12 has no horizontal overflow");
  await page.screenshot({path:`${out}/02-l12-conversion.png`,fullPage:true});

  const l25=await showLesson(24,"ko");
  console.log("L25:",JSON.stringify(l25));
  check(l25.title.includes("while 동굴"),"Lesson 25 remains the while lesson");
  check(l25.code.includes("break"),"Lesson 25 renders a break exit path");
  check(l25.width===l25.viewport,"Lesson 25 has no horizontal overflow");
  await page.screenshot({path:`${out}/03-l25-break.png`,fullPage:true});

  const l29=await showLesson(28,"ko");
  console.log("L29:",JSON.stringify(l29));
  check(l29.title.includes("미니 프로젝트"),"Lesson 29 renders the capstone");
  for(const token of ["def result(score)","scores = [80, 60]","for score in scores","return \"PASS\""])check(l29.code.includes(token),`Lesson 29 integrates ${token}`);
  check(l29.width===l29.viewport,"Lesson 29 has no horizontal overflow");
  await page.screenshot({path:`${out}/04-l29-capstone.png`,fullPage:true});

  const en12=await showLesson(11,"en");
  check(en12.title.includes("Converting Input")&&en12.code.includes("int(age_text)"),"English curriculum receives the same Lesson 12 upgrade");
  const en29=await showLesson(28,"en");
  check(en29.title.includes("Mini Project")&&en29.code.includes("for score in scores"),"English curriculum receives the same capstone upgrade");

  await page.evaluate(()=>{
    S.lang="ko";S.done=[0,1,2];S.next=3;save();
    localStorage.setItem("meowde-v443-coach-mode","study");
    localStorage.setItem("meowde-v452-e2e-sentinel","keep");
  });
  await page.reload({waitUntil:"domcontentloaded"});
  await waitReady();
  const persisted=await page.evaluate(()=>({
    done:Array.isArray(S.done)?S.done.slice():[],next:S.next,
    coach:localStorage.getItem("meowde-v443-coach-mode"),
    sentinel:localStorage.getItem("meowde-v452-e2e-sentinel")
  }));
  console.log("persisted:",JSON.stringify(persisted));
  check(JSON.stringify(persisted.done)===JSON.stringify([0,1,2])&&persisted.next===3,"existing lesson progress survives curriculum loading and reload");
  check(persisted.coach==="study","existing coach-mode selection survives curriculum loading and reload");
  check(persisted.sentinel==="keep","unrelated persisted data is untouched");

  check(errors.length===0,"No console/page errors");
  check(badResponses.length===0,"No HTTP 4xx/5xx responses");
  console.log("errors:",JSON.stringify(errors));
  console.log("badResponses:",JSON.stringify(badResponses));
  console.log("\nCurriculum v4.52 Production E2E PASSED");
} finally {
  await browser.close();
}

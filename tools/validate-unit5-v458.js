"use strict";

const fs=require("fs");
const vm=require("vm");
const {loadInlineData}=require("./lib-meowde");

function assert(condition,message){
  if(!condition){console.error(`FAIL: ${message}`);process.exitCode=1}
  else console.log(`PASS: ${message}`);
}
function clone(value){return JSON.parse(JSON.stringify(value))}
function shape(lessons){return lessons.map(lesson=>({slug:lesson.slug,ids:(lesson.exercises||[]).map(item=>item.id),types:(lesson.exercises||[]).map(item=>item.type)}))}

const raw=loadInlineData();
const data={ko:clone(raw.ko),en:clone(raw.en)};
const state={lang:"ko",screen:"lesson",done:Array.from({length:40},(_,i)=>i),next:39,unit:3,checked:true,correct:false};
let saveCount=0;
const context={
  window:{MEOWDE_LESSONS_KO:data.ko,MEOWDE_LESSONS_EN:data.en},
  document:{documentElement:{dataset:{}}},
  console,
  S:state,
  save:()=>{saveCount++}
};
vm.createContext(context);
vm.runInContext(fs.readFileSync("v452-curriculum.js","utf8"),context,{filename:"v452-curriculum.js"});
vm.runInContext(fs.readFileSync("v453-curriculum-practice.js","utf8"),context,{filename:"v453-curriculum-practice.js"});
vm.runInContext(fs.readFileSync("v456-unit4-data.js","utf8"),context,{filename:"v456-unit4-data.js"});
const beforeUnit5={ko:shape(data.ko),en:shape(data.en)};
vm.runInContext(fs.readFileSync("v458-unit5-data.js","utf8"),context,{filename:"v458-unit5-data.js"});

const api=context.window.MeowCurriculumUnit5;
assert(api&&api.version==="4.58-unit5-files","v458 Unit 05 curriculum API loads");
assert(data.ko.length===50&&data.en.length===50,"Unit 05 expands both languages from 40 to 50 lessons");
assert(JSON.stringify(shape(data.ko).slice(0,40))===JSON.stringify(beforeUnit5.ko),"existing Korean lessons 1-40 keep slugs, exercise IDs, and types");
assert(JSON.stringify(shape(data.en).slice(0,40))===JSON.stringify(beforeUnit5.en),"existing English lessons 1-40 keep slugs, exercise IDs, and types");

const expectedSlugs=["exception-door","valueerror-net","multi-except","math-module","statistics-module","file-write","file-read","file-lines","json-bridge","persistence-project"];
assert(JSON.stringify(data.ko.slice(40).map(x=>x.slug))===JSON.stringify(expectedSlugs),"Korean Unit 05 contains the intended ten lessons in order");
assert(JSON.stringify(data.en.slice(40).map(x=>x.slug))===JSON.stringify(expectedSlugs),"English Unit 05 mirrors the same ten-lesson order");

for(const lang of ["ko","en"]){
  const seen=new Set();
  data[lang].slice(40).forEach((lesson,index)=>{
    assert(Array.isArray(lesson.exercises)&&lesson.exercises.length===5,`${lang} lesson ${index+41} has five focused exercises`);
    assert(JSON.stringify(lesson.exercises.map(x=>x.type))===JSON.stringify(["concept","predict","fill","bughunt","write"]),`${lang} lesson ${index+41} follows concept→predict→fill→bughunt→write`);
    lesson.exercises.forEach(ex=>{
      assert(ex.id&&!seen.has(ex.id),`${lang} exercise id ${ex.id} is unique inside Unit 05`);
      seen.add(ex.id);
      if(ex.type!=="concept")assert(Boolean(ex.prompt),`${lang} ${ex.id} has an explicit prompt`);
      if(ex.type==="write"){
        assert(Boolean(ex.expected)&&Boolean(ex.starter)&&Boolean(ex.hint),`${lang} ${ex.id} has an actionable write contract`);
        assert(ex.grading&&Array.isArray(ex.grading.tests)&&ex.grading.tests.length>0,`${lang} ${ex.id} includes hidden generalization tests`);
        assert(ex.diagnostic&&ex.diagnostic.ko&&ex.diagnostic.en,`${lang} ${ex.id} includes bilingual diagnostic metadata`);
      }
    });
  });
}

const koText=JSON.stringify(data.ko.slice(40));
assert(koText.includes("ZeroDivisionError")&&koText.includes("ValueError")&&koText.includes("KeyError"),"Unit 05 covers specific exception types");
assert(koText.includes("import math")&&koText.includes("statistics.mean"),"Unit 05 covers standard-library modules");
assert(koText.includes('open(\\"')&&koText.includes("file.write")&&koText.includes("file.read"),"Unit 05 covers file write and read operations");
assert(koText.includes("json.loads")&&koText.includes("json.dump")&&koText.includes("json.load"),"Unit 05 covers JSON strings and JSON files");
assert(!/같은 결과가 나오게|이상한 줄|예측 문제와 다른 코드/.test(koText),"Unit 05 avoids the previously reported ambiguous Korean prompt templates");

assert(state.next===40,"learners who completed lessons 1-40 unlock lesson 41 non-destructively");
assert(saveCount===1,"legacy 40-lesson completion unlock persists exactly once");
assert(!fs.readFileSync("v458-unit5-data.js","utf8").includes("localStorage.removeItem"),"v458 never deletes persisted user data");

let gradingResult={visiblePassed:true,passed:false,failed:[{labelKo:"0으로 나누기"}]};
const baseFeedback={version:"4.57-diagnostic-feedback",labels:()=>({cause:"원인",reason:"왜 틀렸을까",action:"다음 수정"}),diagnose:()=>({kind:"base",cause:"base"})};
const integrationContext={
  window:{MEOWDE_LESSONS_KO:data.ko,MEOWDE_LESSONS_EN:data.en,MeowWriteGrading:{lastResult:()=>gradingResult},MeowDiagnosticFeedback:baseFeedback},
  document:{documentElement:{dataset:{}},getElementById:()=>null,querySelector:()=>null,body:{}},
  MutationObserver:class{constructor(fn){this.fn=fn}observe(){}},
  console,
  S:{lang:"ko",screen:"lesson",checked:true,correct:false,write:"",output:""}
};
vm.createContext(integrationContext);
vm.runInContext(fs.readFileSync("v459-unit5-integration.js","utf8"),integrationContext,{filename:"v459-unit5-integration.js"});
const write=data.ko[40].exercises.find(ex=>ex.type==="write");
const diagnosis=integrationContext.window.MeowDiagnosticFeedback.diagnose(write);
assert(diagnosis&&diagnosis.kind==="generalization"&&diagnosis.cause.includes("예외 처리"),"v459 uses Unit 05 task-specific diagnostic metadata after a hidden-test failure");
assert(integrationContext.window.MeowUnit5Integration&&integrationContext.window.MeowUnit5Integration.version==="4.59-unit5-integration","v459 integration API loads");

const integration=fs.readFileSync("v459-unit5-integration.js","utf8");
const css=fs.readFileSync("v459-unit5-integration.css","utf8");
const release=fs.readFileSync("v434-release.js","utf8");
const sw=fs.readFileSync("sw.js","utf8");
assert(!integration.includes("renderMap=function")&&!integration.includes("renderHome=function"),"Unit 05 integration does not wrap canonical screen renderers");
assert(!integration.includes("checkQ=")&&!integration.includes("runPython="),"Unit 05 integration does not wrap grading or Python execution");
assert(!integration.includes("localStorage"),"Unit 05 integration creates no new persistent storage");
assert(integration.includes('data-v459-unit="5"')||integration.includes("v459Unit"),"Unit 05 integration owns a distinct fifth unit tab");
assert(css.includes("overflow-x:auto")&&css.includes("scrollbar-width:none"),"five-unit navigation is horizontally scrollable on mobile");

const i457=release.indexOf('id:"meowde-v457-diagnostic-feedback"');
const i458=release.indexOf('id:"meowde-v458-unit5-data"');
const i459=release.indexOf('id:"meowde-v459-unit5-integration"');
const i442=release.indexOf('id:"meowde-v442-map-touch"');
assert(i457>=0&&i458>i457&&i459>i458&&i442>i459,"Unit 05 data and integration load in deterministic order before visual/touch enhancements");
assert(release.includes('"MeowCurriculumUnit5"')&&release.includes('"MeowUnit5Integration"'),"release health tracks both Unit 05 APIs");
assert(sw.includes('CACHE_NAME = "meowde-v459-unit5"'),"service worker cache generation is bumped for Unit 05");
assert(sw.includes('"/v458-unit5-data.js"')&&sw.includes('"/v459-unit5-integration.js"')&&sw.includes('"/v459-unit5-integration.css"'),"Unit 05 assets are precached for offline use");

if(process.exitCode)process.exit(process.exitCode);
console.log("Meowde Unit 05 curriculum and integration validation passed.");

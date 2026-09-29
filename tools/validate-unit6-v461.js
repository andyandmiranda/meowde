"use strict";

const fs=require("fs");
const vm=require("vm");

function assert(condition,message){
  if(!condition){console.error(`FAIL: ${message}`);process.exitCode=1}
  else console.log(`PASS: ${message}`);
}

const dataSource=fs.readFileSync("v461-unit6-oop.js","utf8");
const enSource=fs.readFileSync("v461-unit6-en.js","utf8");
const integrationSource=fs.readFileSync("v462-unit6-integration.js","utf8");
const release=fs.readFileSync("v434-release.js","utf8");
const sw=fs.readFileSync("sw.js","utf8");
const diagnosticBridge=fs.readFileSync("v459-unit5-integration.js","utf8");

function legacyLessons(){
  return Array.from({length:50},(_,index)=>({slug:`legacy-${index}`,title:`Legacy ${index+1}`,short:`L${index+1}`,description:"legacy",exercises:[]}));
}

const ko=legacyLessons();
const en=legacyLessons();
const originalKO=JSON.stringify(ko);
const originalEN=JSON.stringify(en);
const dataContext={
  window:{MEOWDE_LESSONS_KO:ko,MEOWDE_LESSONS_EN:en},
  document:{documentElement:{dataset:{}}},
  console
};
vm.createContext(dataContext);
vm.runInContext(dataSource,dataContext,{filename:"v461-unit6-oop.js"});

const api=dataContext.window.MeowCurriculumUnit6;
assert(api&&api.version==="4.61-unit6-oop"&&api.ready===true,"Unit 06 data API loads and reports ready");
assert(ko.length===60&&en.length===60,"Unit 06 appends lessons 51-60 to both languages");
assert(JSON.stringify(ko.slice(0,50))===originalKO,"Korean lessons 1-50 remain byte-for-byte equivalent in structure");
assert(JSON.stringify(en.slice(0,50))===originalEN,"English lessons 1-50 remain byte-for-byte equivalent in structure");

const expectedSlugs=["class-blueprint","init-self","instance-method","state-change","object-collection","inheritance-basics","object-to-dict","object-json","json-to-object","pet-tracker-project"];
assert(JSON.stringify(ko.slice(50).map(x=>x.slug))===JSON.stringify(expectedSlugs),"Unit 06 follows the planned OOP-to-persistence sequence");

for(const lesson of ko.slice(50)){
  assert(Array.isArray(lesson.exercises)&&lesson.exercises.length===5,`${lesson.slug} has exactly five exercises`);
  assert(JSON.stringify(lesson.exercises.map(x=>x.type))===JSON.stringify(["concept","predict","fill","bughunt","write"]),`${lesson.slug} uses concept → predict → fill → bughunt → write`);
  const write=lesson.exercises[4];
  assert(write.grading&&Array.isArray(write.grading.tests)&&write.grading.tests.length>=1,`${lesson.slug} write task has hidden generalization tests`);
  assert(write.diagnostic&&write.diagnostic.ko&&write.diagnostic.en,`${lesson.slug} write task has bilingual diagnostic metadata`);
}

const ids=ko.slice(50).flatMap(lesson=>lesson.exercises.map(ex=>ex.id));
assert(new Set(ids).size===ids.length,"Unit 06 exercise IDs are unique");
assert(ko[59].focus.includes("class")&&ko[59].focus.includes("json")&&ko[59].focus.includes("file"),"final Pet Tracker project integrates OOP and persistence");

vm.runInContext(dataSource,dataContext,{filename:"v461-unit6-oop.js"});
assert(ko.length===60&&en.length===60,"Unit 06 data bootstrap is idempotent");

vm.runInContext(enSource,dataContext,{filename:"v461-unit6-en.js"});
const enApi=dataContext.window.MeowCurriculumUnit6English;
assert(enApi&&enApi.ready===true&&enApi.patched===10,"complete English copy patches all ten Unit 06 lessons");
const hangul=/[가-힣]/;
for(const lesson of en.slice(50)){
  const visible=[lesson.title,lesson.short,lesson.description];
  for(const ex of lesson.exercises){
    for(const key of ["title","body","prompt","hint","explain","starter","testcase"]){if(typeof ex[key]==="string")visible.push(ex[key])}
    if(Array.isArray(ex.choices))visible.push(...ex.choices);
    if(ex.diagnostic&&ex.diagnostic.en)visible.push(ex.diagnostic.en.cause,ex.diagnostic.en.reason,ex.diagnostic.en.action);
  }
  assert(!visible.some(value=>hangul.test(String(value||""))),`${lesson.slug} English learner-facing copy contains no Korean text`);
}

function runIntegration(done,next){
  const state={lang:"ko",screen:"home",done:done.slice(),next,unit:4};
  let saves=0;
  const context={
    window:{MEOWDE_LESSONS_KO:Array.from({length:60},()=>({})),meowdeV425:{restoreDeferredProgress:()=>false}},
    document:{documentElement:{dataset:{}},getElementById:()=>null,querySelector:()=>null,body:{}},
    MutationObserver:class{constructor(cb){this.cb=cb}observe(){}},
    S:state,
    save:()=>{saves++},
    renderMap:()=>{},
    console
  };
  vm.createContext(context);
  vm.runInContext(integrationSource,context,{filename:"v462-unit6-integration.js"});
  return {state,saves,api:context.window.MeowUnit6Integration};
}

let integration=runIntegration(Array.from({length:50},(_,i)=>i),49);
assert(integration.state.next===50&&integration.api.progressRecovery.unlocked===true,"completed lessons 1-50 unlock lesson 51");
assert(integration.saves===1,"Unit 06 unlock is persisted once");
integration=runIntegration(Array.from({length:49},(_,i)=>i),48);
assert(integration.state.next===48&&integration.api.progressRecovery.unlocked===false,"incomplete Unit 05 does not unlock lesson 51");

assert(diagnosticBridge.includes("exercise.diagnostic")&&!diagnosticBridge.includes('exercise.slug'),"existing diagnostic bridge remains generic for Unit 06 metadata");
assert(!dataSource.includes("localStorage")&&!enSource.includes("localStorage")&&!integrationSource.includes("localStorage"),"Unit 06 introduces no new persistent storage key");
assert(!integrationSource.includes("checkQ=")&&!integrationSource.includes("runPython="),"Unit 06 integration does not wrap answer or Python execution pipelines");
assert(integrationSource.includes('ko:"06 객체·상태·프로젝트"')&&integrationSource.includes('en:"06 Objects, State & Projects"'),"Unit 06 navigation labels are explicit in both languages");

const i459=release.indexOf('id:"meowde-v459-unit5-integration"');
const i461=release.indexOf('id:"meowde-v461-unit6-data"');
const i461en=release.indexOf('id:"meowde-v461-unit6-english"');
const i462=release.indexOf('id:"meowde-v462-unit6-integration"');
const i442=release.indexOf('id:"meowde-v442-map-touch"');
assert(i459>=0&&i461>i459&&i461en>i461&&i462>i461en&&i442>i462,"ordered bootstrap loads Unit 06 after Unit 05 and before visual/touch enhancements");
assert(release.includes('"MeowCurriculumUnit6"')&&release.includes('"MeowCurriculumUnit6English"')&&release.includes('"MeowUnit6Integration"'),"release health tracks all Unit 06 APIs");
assert(sw.includes('CACHE_NAME = "meowde-v459-unit6"'),"service worker uses a distinct Unit 06 cache generation");
assert(sw.includes('"/v461-unit6-oop.js"')&&sw.includes('"/v461-unit6-en.js"')&&sw.includes('"/v462-unit6-integration.js"'),"Unit 06 assets are available offline");

if(process.exitCode)process.exit(process.exitCode);
console.log("Meowde v4.61/v4.62 Unit 06 validation passed.");
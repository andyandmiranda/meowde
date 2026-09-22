"use strict";

const fs=require("fs");
const vm=require("vm");
const {loadInlineData}=require("./lib-meowde");

function assert(condition,message){if(!condition){console.error(`FAIL: ${message}`);process.exitCode=1}else console.log(`PASS: ${message}`)}
function clone(value){return JSON.parse(JSON.stringify(value))}
function shape(lessons){return lessons.map(lesson=>({slug:lesson.slug,ids:(lesson.exercises||[]).map(item=>item.id),types:(lesson.exercises||[]).map(item=>item.type)}))}
function runSimple(source,data){
  const context={window:{MEOWDE_LESSONS_KO:data.ko,MEOWDE_LESSONS_EN:data.en},document:{documentElement:{dataset:{}}},console};
  vm.createContext(context);vm.runInContext(source,context);return context;
}

const raw=loadInlineData();
const data={ko:clone(raw.ko),en:clone(raw.en)};
const originalShape={ko:shape(data.ko),en:shape(data.en)};
runSimple(fs.readFileSync("v452-curriculum.js","utf8"),data);
runSimple(fs.readFileSync("v453-curriculum-practice.js","utf8"),data);

const legacyState={lang:"ko",screen:"home",done:Array.from({length:30},(_,i)=>i),next:29,unit:2};
let saveCount=0;
const context={
  window:{MEOWDE_LESSONS_KO:data.ko,MEOWDE_LESSONS_EN:data.en,__MEOWDE_CANONICAL_HOME_RENDERER__:()=>{}},
  document:{documentElement:{dataset:{}}},
  console,
  S:legacyState,
  save:()=>{saveCount++}
};
vm.createContext(context);
vm.runInContext(fs.readFileSync("v456-unit4-data.js","utf8"),context,{filename:"v456-unit4-data.js"});
const api=context.window.MeowCurriculumExpansion;

assert(api&&api.version==="4.56-unit4-data","v456 curriculum expansion API loads");
assert(data.ko.length===40&&data.en.length===40,"v456 expands both languages from 30 to 40 lessons");
assert(JSON.stringify(shape(data.ko).slice(0,30))===JSON.stringify(originalShape.ko),"existing Korean lesson slugs, exercise IDs and types remain stable");
assert(JSON.stringify(shape(data.en).slice(0,30))===JSON.stringify(originalShape.en),"existing English lesson slugs, exercise IDs and types remain stable");

const expectedSlugs=["string-methods","string-slice","membership-gate","dict-seed","dict-update","dict-get","dict-loop","tuple-unpack","set-garden","data-project"];
assert(JSON.stringify(data.ko.slice(30).map(x=>x.slug))===JSON.stringify(expectedSlugs),"Korean Unit 04 contains the intended ten lessons in order");
assert(JSON.stringify(data.en.slice(30).map(x=>x.slug))===JSON.stringify(expectedSlugs),"English Unit 04 mirrors the same lesson order");

for(const lang of ["ko","en"]){
  const lessons=data[lang].slice(30);
  const seen=new Set();
  lessons.forEach((lesson,index)=>{
    assert(Array.isArray(lesson.exercises)&&lesson.exercises.length===5,`${lang} Unit 04 lesson ${index+31} has five focused exercises`);
    assert(JSON.stringify(lesson.exercises.map(x=>x.type))===JSON.stringify(["concept","predict","fill","bughunt","write"]),`${lang} Unit 04 lesson ${index+31} follows concept→predict→fill→bughunt→write`);
    lesson.exercises.forEach(ex=>{
      assert(ex.id&&!seen.has(ex.id),`${lang} exercise id ${ex.id} is unique inside Unit 04`);
      seen.add(ex.id);
      if(ex.type!=="concept")assert(Boolean(ex.prompt),`${lang} ${ex.id} has an explicit prompt`);
      if(ex.type==="write"){
        assert(Boolean(ex.expected)&&Boolean(ex.starter)&&Boolean(ex.hint),`${lang} ${ex.id} has an actionable write contract`);
        assert(ex.grading&&Array.isArray(ex.grading.tests)&&ex.grading.tests.length>0,`${lang} ${ex.id} includes a generalization test`);
      }
    });
  });
}

const ambiguous=/같은 결과가 나오게|이상한 줄|예측 문제와 다른 코드/;
for(const lesson of data.ko.slice(20,30)){
  for(const ex of lesson.exercises||[]){
    assert(!ambiguous.test(String(ex.prompt||"")),`${lesson.slug}/${ex.id} no longer uses the reported ambiguous Korean template wording`);
  }
}
const returnFill=data.ko.find(x=>x.slug==="return-spring").exercises.find(x=>x.id==="return-spring-f");
assert(returnFill.prompt.includes("double(x) 함수를 정의"),"return lesson fill prompt now asks for def explicitly instead of vaguely implying return");
const bossWrite=data.ko.find(x=>x.slug==="boss-bug").exercises.find(x=>x.id==="boss-bug-w");
assert(bossWrite.prompt.includes("BOSS CLEAR")&&bossWrite.starter.includes("if문"),"boss write task now states a concrete coding goal");

assert(legacyState.next===30,"users who already completed lessons 1-30 unlock lesson 31 non-destructively");
assert(saveCount===1,"legacy-completion unlock persists exactly once");
assert(!fs.readFileSync("v456-unit4-data.js","utf8").includes("localStorage.removeItem"),"v456 never deletes persisted user data");

const learn=fs.readFileSync("v413-core.js","utf8");
const home=fs.readFileSync("v414-screens.js","utf8");
const journey=fs.readFileSync("v416-journey.js","utf8");
const release=fs.readFileSync("v434-release.js","utf8");
const sw=fs.readFileSync("sw.js","utf8");
assert(learn.includes("Math.ceil(lessons().length/10)"),"Learn derives unit count from the runtime lesson count");
assert(learn.includes("04 문자열·딕셔너리·데이터")&&learn.includes("04 Strings, Dictionaries & Data"),"Learn exposes bilingual Unit 04 labels");
assert(home.includes("문자열·딕셔너리·데이터"),"Home current-unit card names Unit 04");
assert(journey.includes("문자열·딕셔너리·데이터"),"Journey milestone names Unit 04 consistently");
const i455=release.indexOf('id:"meowde-v455-write-grading"');
const i456=release.indexOf('id:"meowde-v456-unit4-data"');
const i442=release.indexOf('id:"meowde-v442-map-touch"');
assert(i455>=0&&i456>i455&&i442>i456,"v456 loads after grading and before visual/touch enhancements");
assert(release.includes('"MeowCurriculumExpansion"'),"release health tracks the Unit 04 API");
assert(sw.includes('CACHE_NAME = "meowde-v456-unit4"'),"service worker cache generation is bumped for v456");
assert(sw.includes('"/v456-unit4-data.js"'),"Unit 04 expansion is available offline");

if(process.exitCode)process.exit(process.exitCode);
console.log("Meowde v4.56 Unit 04 curriculum expansion validation passed.");

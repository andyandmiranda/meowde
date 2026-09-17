"use strict";

const fs=require("fs");
const vm=require("vm");
const {loadInlineData}=require("./lib-meowde");

function assert(condition,message){if(!condition){console.error(`FAIL: ${message}`);process.exitCode=1}else console.log(`PASS: ${message}`)}
function clone(value){return JSON.parse(JSON.stringify(value))}
function shape(lessons){return lessons.map(lesson=>({slug:lesson.slug,ids:lesson.exercises.map(item=>item.id),types:lesson.exercises.map(item=>item.type)}))}
function bySlug(lessons,slug){return lessons.find(item=>item.slug===slug)}

const source=fs.readFileSync("v452-curriculum.js","utf8");
const core=fs.readFileSync("v413-core.js","utf8");
const screens=fs.readFileSync("v414-screens.js","utf8");
const release=fs.readFileSync("v434-release.js","utf8");
const serviceWorker=fs.readFileSync("sw.js","utf8");
const original=loadInlineData();
const before={ko:clone(original.ko),en:clone(original.en)};
const runtime={ko:clone(original.ko),en:clone(original.en)};

const context={
  window:{MEOWDE_LESSONS_KO:runtime.ko,MEOWDE_LESSONS_EN:runtime.en},
  document:{documentElement:{dataset:{}}},
  console
};
vm.createContext(context);
vm.runInContext(source,context,{filename:"v452-curriculum.js"});

assert(context.window.MeowCurriculum&&context.window.MeowCurriculum.version==="4.52-curriculum-v1","v452 curriculum API loads successfully");
assert(runtime.ko.length===30&&runtime.en.length===30,"curriculum keeps exactly 30 lessons in both languages");
assert(JSON.stringify(shape(runtime.ko))===JSON.stringify(shape(before.ko)),"Korean lesson slugs, exercise IDs, counts and types are unchanged");
assert(JSON.stringify(shape(runtime.en))===JSON.stringify(shape(before.en)),"English lesson slugs, exercise IDs, counts and types are unchanged");

const changed=new Set(["concat-bridge","debug-missing-quote","while-cave","mini-project"]);
["ko","en"].forEach(lang=>{
  before[lang].forEach((lesson,index)=>{
    if(!changed.has(lesson.slug))assert(JSON.stringify(lesson)===JSON.stringify(runtime[lang][index]),`${lang} ${lesson.slug} is untouched`);
  });
});

const ko10=bySlug(runtime.ko,"concat-bridge");
const ko12=bySlug(runtime.ko,"debug-missing-quote");
const ko25=bySlug(runtime.ko,"while-cave");
const ko29=bySlug(runtime.ko,"mini-project");
const en10=bySlug(runtime.en,"concat-bridge");
const en12=bySlug(runtime.en,"debug-missing-quote");
const en25=bySlug(runtime.en,"while-cave");
const en29=bySlug(runtime.en,"mini-project");

assert(ko10.title==="포매팅 다리"&&JSON.stringify(ko10).includes('f\\"Hello {name}\\"'),"Lesson 10 explicitly teaches f-strings in Korean");
assert(en10.title==="Formatting Bridge"&&JSON.stringify(en10).includes('f\\"Hello {name}\\"'),"Lesson 10 explicitly teaches f-strings in English");
assert(ko12.title==="입력값 변환"&&JSON.stringify(ko12).includes("int(age_text)"),"Lesson 12 teaches input/type conversion in Korean");
assert(en12.title==="Converting Input"&&JSON.stringify(en12).includes("int(age_text)"),"Lesson 12 teaches input/type conversion in English");
assert(JSON.stringify(ko12).includes("str(level)" )&&JSON.stringify(en12).includes("str(level)"),"Lesson 12 covers both int() and str() conversion");
assert(ko25.focus.includes("break")&&JSON.stringify(ko25).includes('"break"'),"Lesson 25 teaches break and safe while-loop exits");
assert(en25.focus.includes("break")&&JSON.stringify(en25).includes('"break"'),"English Lesson 25 teaches break and safe while-loop exits");
for(const token of ["def result(score)","scores = [","for score in scores","return "]){
  assert(JSON.stringify(ko29).includes(token),`Korean capstone integrates ${token.trim()}`);
  assert(JSON.stringify(en29).includes(token),`English capstone integrates ${token.trim()}`);
}

assert(!source.includes("localStorage"),"curriculum migration does not read, delete or rename persisted user data");
assert(source.includes('current.screen==="lesson"'),"active lesson sessions are not forcibly rerendered during curriculum migration");
assert(core.includes("'02 입력과 조건'")&&core.includes("'03 컬렉션·반복·함수'"),"Learn map Korean unit labels match actual curriculum");
assert(core.includes("'02 Input & Decisions'")&&core.includes("'03 Collections, Loops & Functions'"),"Learn map English unit labels match actual curriculum");
assert(screens.includes("'입력과 조건'")&&screens.includes("'컬렉션·반복·함수'"),"Home Korean unit labels match actual curriculum");
assert(screens.includes("'Input & Decisions'")&&screens.includes("'Collections, Loops & Functions'"),"Home English unit labels match actual curriculum");

const curriculumIndex=release.indexOf('id:"meowde-v452-curriculum"');
const mapTouchIndex=release.indexOf('id:"meowde-v442-map-touch"');
assert(curriculumIndex>=0&&curriculumIndex<mapTouchIndex,"v452 curriculum loads before visual/touch enhancements");
assert(release.includes('"MeowCurriculum"'),"release health tracks the curriculum enhancement API");
assert(/CACHE_NAME = "meowde-v45\d-[^"]+"/.test(serviceWorker),"service worker uses a v4.5x curriculum-or-newer cache generation");
assert(serviceWorker.includes('"/v452-curriculum.js"'),"v452 curriculum is available offline");

if(process.exitCode)process.exit(process.exitCode);
console.log("Meowde v4.52 curriculum validation passed.");

"use strict";

const fs=require("fs");
const vm=require("vm");
const {loadInlineData}=require("./lib-meowde");

function assert(condition,message){if(!condition){console.error(`FAIL: ${message}`);process.exitCode=1}else console.log(`PASS: ${message}`)}
function clone(value){return JSON.parse(JSON.stringify(value))}
function shape(lessons){return lessons.map(lesson=>({slug:lesson.slug,ids:lesson.exercises.map(item=>item.id),types:lesson.exercises.map(item=>item.type)}))}
function run(source,data,globalName){const context={window:{MEOWDE_LESSONS_KO:data.ko,MEOWDE_LESSONS_EN:data.en},document:{documentElement:{dataset:{}}},console};vm.createContext(context);vm.runInContext(source,context);return context.window[globalName]}

const original=loadInlineData();
const data={ko:clone(original.ko),en:clone(original.en)};
const beforeShape={ko:shape(data.ko),en:shape(data.en)};
const v452=fs.readFileSync("v452-curriculum.js","utf8");
const v453=fs.readFileSync("v453-curriculum-practice.js","utf8");
const release=fs.readFileSync("v434-release.js","utf8");
const serviceWorker=fs.readFileSync("sw.js","utf8");

run(v452,data,"MeowCurriculum");
const after452={ko:clone(data.ko),en:clone(data.en)};
const api=run(v453,data,"MeowCurriculumPractice");

assert(api&&api.version==="4.53-practice-quality","v453 practice API loads");
assert(data.ko.length===30&&data.en.length===30,"v453 keeps 30 lessons in both languages");
assert(JSON.stringify(shape(data.ko))===JSON.stringify(beforeShape.ko),"Korean slugs, exercise IDs and types remain unchanged");
assert(JSON.stringify(shape(data.en))===JSON.stringify(beforeShape.en),"English slugs, exercise IDs and types remain unchanged");

const changed=new Set(["index-tower","append-dock","loop-hill","range-rail","function-house","parameter-mail","return-spring"]);
for(const lang of ["ko","en"]){
  after452[lang].forEach((lesson,index)=>{if(!changed.has(lesson.slug))assert(JSON.stringify(lesson)===JSON.stringify(data[lang][index]),`${lang} ${lesson.slug} is untouched by v453`)});
}

const ko=data.ko;
for(const slug of changed){const lesson=ko.find(item=>item.slug===slug);const write=lesson&&lesson.exercises.find(item=>item.type==="write");assert(Boolean(write),`${slug} keeps a write exercise`);assert(!String(write&&write.starter||"").includes("직접 고쳐보세요"),`${slug} has a concrete Korean starter`)}
const append=ko.find(item=>item.slug==="append-dock");assert(JSON.stringify(append).includes("len(snacks)"),"append lesson introduces len() without adding a new lesson");
const loop=ko.find(item=>item.slug==="loop-hill").exercises.find(item=>item.type==="write");assert(loop.expected==="red\nblue\ngreen","for-loop write task requires iterating real list values");
const fn=ko.find(item=>item.slug==="function-house").exercises.find(item=>item.type==="write");assert(fn.model.includes("def meow()")&&fn.model.includes("meow()"),"function write task requires definition and call");
const ret=ko.find(item=>item.slug==="return-spring").exercises.find(item=>item.type==="write");assert(ret.model.includes("return x * 3"),"return write task requires a reusable returned value");

const whileLesson=ko.find(item=>item.slug==="while-cave");assert(JSON.stringify(whileLesson).includes('"break"'),"v452 while/break improvement remains intact");
const project=ko.find(item=>item.slug==="mini-project");for(const token of ["def result(score)","for score in scores","return "])assert(JSON.stringify(project).includes(token),`v452 mini-project still integrates ${token.trim()}`);

assert(!v453.includes("localStorage"),"v453 does not read, delete or rename persisted user data");
assert(v453.includes('current.screen==="lesson"'),"active lesson sessions are not forcibly rerendered");
const i452=release.indexOf('id:"meowde-v452-curriculum"');
const i453=release.indexOf('id:"meowde-v453-curriculum-practice"');
const i442=release.indexOf('id:"meowde-v442-map-touch"');
assert(i452>=0&&i453>i452&&i442>i453,"v453 loads after v452 and before visual/touch enhancements");
assert(release.includes('"MeowCurriculumPractice"'),"release health tracks v453 API");
assert(/CACHE_NAME = "meowde-v45\d-[^"]+"/.test(serviceWorker),"service worker uses a v4.53-or-newer cache generation");
assert(serviceWorker.includes('"/v453-curriculum-practice.js"'),"v453 practice layer is available offline");

if(process.exitCode)process.exit(process.exitCode);
console.log("Meowde v4.53 curriculum practice validation passed.");

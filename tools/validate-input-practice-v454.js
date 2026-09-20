"use strict";

const fs=require("fs");
const vm=require("vm");
const {loadInlineData}=require("./lib-meowde");

function assert(condition,message){if(!condition){console.error(`FAIL: ${message}`);process.exitCode=1}else console.log(`PASS: ${message}`)}
function clone(value){return JSON.parse(JSON.stringify(value))}
function shape(lessons){return lessons.map(lesson=>({slug:lesson.slug,ids:lesson.exercises.map(item=>item.id),types:lesson.exercises.map(item=>item.type)}))}
function applySimple(source,data,globalName){
  const context={window:{MEOWDE_LESSONS_KO:data.ko,MEOWDE_LESSONS_EN:data.en},document:{documentElement:{dataset:{}}},console};
  vm.createContext(context);vm.runInContext(source,context);return context.window[globalName];
}

const original=loadInlineData();
const data={ko:clone(original.ko),en:clone(original.en)};
const originalShape={ko:shape(data.ko),en:shape(data.en)};
applySimple(fs.readFileSync("v452-curriculum.js","utf8"),data,"MeowCurriculum");
applySimple(fs.readFileSync("v453-curriculum-practice.js","utf8"),data,"MeowCurriculumPractice");

const source=fs.readFileSync("v454-input-practice.js","utf8");
const lessonRenderer=fs.readFileSync("v413-lesson.js","utf8");
const lessonCss=fs.readFileSync("v413-ux.css","utf8");
const state=fs.readFileSync("v414-state.js","utf8");
const release=fs.readFileSync("v434-release.js","utf8");
const serviceWorker=fs.readFileSync("sw.js","utf8");
const calls=[];
const runtimeState={stdinValue:"Amy",stdinExerciseId:"input-window-w",screen:"lesson"};
const context={
  window:{MEOWDE_LESSONS_KO:data.ko,MEOWDE_LESSONS_EN:data.en},
  document:{documentElement:{dataset:{}}},
  console,
  S:runtimeState,
  runPython:async code=>`base:${code}`,
  warmPy:async()=>{},
  pyodide:{runPython:code=>{calls.push(code);return ""}},
  cur:()=>data.ko.find(item=>item.slug==="input-window").exercises.find(item=>item.type==="write")
};
vm.createContext(context);
vm.runInContext(source,context,{filename:"v454-input-practice.js"});

assert(context.window.MeowRealInput&&context.window.MeowRealInput.version==="4.54-real-input","v454 real-input API loads");
assert(data.ko.length===30&&data.en.length===30,"v454 keeps exactly 30 lessons");
assert(JSON.stringify(shape(data.ko))===JSON.stringify(originalShape.ko),"Korean lesson slugs, exercise IDs and types remain unchanged");
assert(JSON.stringify(shape(data.en))===JSON.stringify(originalShape.en),"English lesson slugs, exercise IDs and types remain unchanged");

for(const lang of ["ko","en"]){
  const lesson=data[lang].find(item=>item.slug==="input-window");
  const concept=lesson.exercises.find(item=>item.type==="concept");
  const write=lesson.exercises.find(item=>item.type==="write");
  assert(Boolean(write&&write.stdin),`${lang} input write exercise declares stdin metadata`);
  assert(write.stdin.default==="Amy",`${lang} input practice has deterministic default stdin`);
  assert(write.model.includes("input()"),`${lang} write model uses real input()`);
  assert(concept.code.includes("input()"),`${lang} concept example uses real input()`);
}
assert(!data.ko.find(item=>item.slug==="input-window").exercises[0].body.includes("실제 입력창 대신"),"Korean concept no longer claims real input is unavailable");

Promise.resolve(context.runPython('name = input()\nprint("Welcome " + name)')).then(result=>{
  assert(result.startsWith("base:"),"v454 delegates execution to the existing Python runner");
  assert(calls.some(code=>code.includes("sys.stdin = io.StringIO")&&code.includes("Amy\\n")),"v454 injects the program input into Python sys.stdin");

  assert(lessonRenderer.includes("function inputControl(exercise)"),"canonical Lesson renderer owns the program-input UI");
  assert(lessonRenderer.includes('id="program-stdin"'),"program-input field is rendered accessibly");
  assert(lessonRenderer.includes("S.stdinValue=this.value;save()"),"program input is saved as the learner types");
  assert(lessonCss.includes(".program-input"),"program-input field has dedicated mobile styling");
  assert(state.includes("stdinExerciseId:S.stdinExerciseId||''"),"in-progress state persists the input exercise id");
  assert(state.includes("stdinValue:typeof S.stdinValue==='string'?S.stdinValue:''"),"in-progress state persists the typed stdin value");
  assert(state.includes("rawState.inProgress.stdinValue"),"saved stdin value is restored on resume");
  assert(!source.includes("localStorage"),"v454 does not create, rename or delete storage keys");

  const i453=release.indexOf('id:"meowde-v453-curriculum-practice"');
  const i454=release.indexOf('id:"meowde-v454-input-practice"');
  const i442=release.indexOf('id:"meowde-v442-map-touch"');
  assert(i453>=0&&i454>i453&&i442>i454,"v454 loads after curriculum practice and before visual/touch enhancements");
  assert(release.includes('"MeowRealInput"'),"release health tracks the real-input API");
  assert(serviceWorker.includes('CACHE_NAME = "meowde-v454-real-input"'),"service worker cache generation is bumped for v454");
  assert(serviceWorker.includes('"/v454-input-practice.js"'),"v454 input layer is available offline");

  if(process.exitCode)process.exit(process.exitCode);
  console.log("Meowde v4.54 real input practice validation passed.");
}).catch(error=>{console.error(error);process.exit(1)});

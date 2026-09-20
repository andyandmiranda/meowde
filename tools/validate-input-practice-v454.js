"use strict";

const fs=require("fs");
const vm=require("vm");
const {loadInlineData}=require("./lib-meowde");

function assert(condition,message){
  if(!condition){console.error(`FAIL: ${message}`);process.exitCode=1}
  else console.log(`PASS: ${message}`);
}
function clone(value){return JSON.parse(JSON.stringify(value))}
function shape(lessons){return lessons.map(lesson=>({slug:lesson.slug,ids:lesson.exercises.map(item=>item.id),types:lesson.exercises.map(item=>item.type)}))}
function bySlug(lessons,slug){return lessons.find(item=>item.slug===slug)}
function byId(lesson,id){return lesson.exercises.find(item=>item.id===id)}

(async function validate(){
  const raw=loadInlineData();
  const runtime={ko:clone(raw.ko),en:clone(raw.en)};
  let currentExercise=null;
  let capturedCode="";
  const context={
    window:{MEOWDE_LESSONS_KO:runtime.ko,MEOWDE_LESSONS_EN:runtime.en},
    document:{documentElement:{dataset:{}}},
    console,
    cur:()=>currentExercise,
    runPython:async code=>{capturedCode=code;return code}
  };
  vm.createContext(context);

  for(const file of ["v452-curriculum.js","v453-curriculum-practice.js"]){
    vm.runInContext(fs.readFileSync(file,"utf8"),context,{filename:file});
  }
  const before={ko:clone(runtime.ko),en:clone(runtime.en)};
  const source=fs.readFileSync("v454-input-practice.js","utf8");
  vm.runInContext(source,context,{filename:"v454-input-practice.js"});

  assert(context.window.MeowInputPractice&&context.window.MeowInputPractice.version==="4.54-input-practice","v454 input practice API loads");
  assert(runtime.ko.length===30&&runtime.en.length===30,"v454 keeps exactly 30 lessons");
  assert(JSON.stringify(shape(runtime.ko))===JSON.stringify(shape(before.ko)),"Korean lesson slugs, exercise IDs and types stay unchanged");
  assert(JSON.stringify(shape(runtime.en))===JSON.stringify(shape(before.en)),"English lesson slugs, exercise IDs and types stay unchanged");

  const changed=new Set(["input-window","debug-missing-quote"]);
  ["ko","en"].forEach(lang=>{
    before[lang].forEach((lesson,index)=>{
      if(!changed.has(lesson.slug))assert(JSON.stringify(lesson)===JSON.stringify(runtime[lang][index]),`${lang} ${lesson.slug} is untouched by v454`);
    });
  });

  const koInput=bySlug(runtime.ko,"input-window");
  const enInput=bySlug(runtime.en,"input-window");
  const koConversion=bySlug(runtime.ko,"debug-missing-quote");
  const enConversion=bySlug(runtime.en,"debug-missing-quote");
  const koInputWrite=byId(koInput,"input-window-w");
  const enInputWrite=byId(enInput,"input-window-w");
  const koConversionWrite=byId(koConversion,"debug-missing-quote-w");
  const enConversionWrite=byId(enConversion,"debug-missing-quote-w");

  assert(byId(koInput,"input-window-c").code.includes("input()"),"Korean input concept uses a real input() call");
  assert(byId(enInput,"input-window-c").code.includes("input()"),"English input concept uses a real input() call");
  assert(koInputWrite.model.includes("input()")&&JSON.stringify(koInputWrite.stdin)==='["Jieun"]',"Korean input write task executes with deterministic Jieun stdin");
  assert(enInputWrite.model.includes("input()")&&JSON.stringify(enInputWrite.stdin)==='["Jieun"]',"English input write task executes with deterministic Jieun stdin");
  assert(koConversionWrite.model.includes("input()")&&koConversionWrite.model.includes("int(")&&JSON.stringify(koConversionWrite.stdin)==='["40"]',"Korean conversion write task connects input() to int()");
  assert(enConversionWrite.model.includes("input()")&&enConversionWrite.model.includes("int(")&&JSON.stringify(enConversionWrite.stdin)==='["40"]',"English conversion write task connects input() to int()");

  currentExercise=koInputWrite;
  capturedCode="";
  await context.runPython('user = input()\nprint("Welcome " + user)');
  assert(capturedCode.includes('sys.stdin = io.StringIO("Jieun\\n")'),"runtime injects deterministic stdin before Python execution");
  assert(capturedCode.endsWith('user = input()\nprint("Welcome " + user)'),"runtime preserves learner code after stdin prelude");

  currentExercise=byId(bySlug(runtime.ko,"print-camp"),"print-camp-w");
  capturedCode="";
  const untouched='print("meow")';
  await context.runPython(untouched);
  assert(capturedCode===untouched,"write exercises without stdin keep the original execution path");

  assert(!source.includes("localStorage"),"v454 does not read, delete or rename persisted user data");

  const lessonRenderer=fs.readFileSync("v413-lesson.js","utf8");
  assert(lessonRenderer.includes("function stdinCaseMarkup(exercise)"),"canonical Lesson renderer owns test-input disclosure");
  assert(lessonRenderer.includes('data-python-stdin="provided"'),"write UI marks deterministic test input explicitly");
  assert(lessonRenderer.includes("${stdinCaseMarkup(ex)}"),"write exercises render test input next to the testcase");

  const release=fs.readFileSync("v434-release.js","utf8");
  const i452=release.indexOf('id:"meowde-v452-curriculum"');
  const i453=release.indexOf('id:"meowde-v453-curriculum-practice"');
  const i454=release.indexOf('id:"meowde-v454-input-practice"');
  const i442=release.indexOf('id:"meowde-v442-map-touch"');
  assert(i452>=0&&i452<i453&&i453<i454&&i454<i442,"input practice loads after curriculum layers and before visual/touch enhancements");
  assert(release.includes('"MeowInputPractice"'),"release health tracks the input practice API");

  const serviceWorker=fs.readFileSync("sw.js","utf8");
  assert(serviceWorker.includes('CACHE_NAME = "meowde-v454-input-practice"'),"service worker cache generation is bumped for v454");
  assert(serviceWorker.includes('"/v454-input-practice.js"'),"v454 input practice layer is available offline");

  const audit=fs.readFileSync("tools/audit-curriculum.js","utf8");
  assert(audit.includes("v454-input-practice.js"),"effective curriculum audit includes v454");
  assert(audit.includes("v453-curriculum-practice.js"),"effective curriculum audit includes v453");

  if(process.exitCode)process.exit(process.exitCode);
  console.log("Meowde v4.54 real input practice validation passed.");
})().catch(error=>{console.error(error);process.exit(1)});

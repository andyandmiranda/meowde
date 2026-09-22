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

(async()=>{
  const original=loadInlineData();
  const data={ko:clone(original.ko),en:clone(original.en)};
  const originalShape={ko:shape(data.ko),en:shape(data.en)};
  applySimple(fs.readFileSync("v452-curriculum.js","utf8"),data,"MeowCurriculum");
  applySimple(fs.readFileSync("v453-curriculum-practice.js","utf8"),data,"MeowCurriculumPractice");

  let currentExercise=null;
  let runnerMode="dynamic";
  const state={lang:"ko",stdinValue:"Amy",screen:"lesson"};
  const calls=[];
  async function rawRunner(code){
    calls.push({code,stdin:state.stdinValue,mode:runnerMode,current:currentExercise&&currentExercise.id});
    if(currentExercise&&currentExercise.id==="input-window-w"){
      return runnerMode==="hardcoded"?"Welcome Amy":`Welcome ${state.stdinValue}`;
    }
    if(currentExercise&&currentExercise.id==="return-spring-w"){
      if(runnerMode==="hardcoded")return "9";
      return code.includes("__MEOWDE_TEST__")?"9\n__MEOWDE_TEST__\n15":"9";
    }
    return "";
  }

  const context={
    window:{MEOWDE_LESSONS_KO:data.ko,MEOWDE_LESSONS_EN:data.en},
    document:{documentElement:{dataset:{}}},
    console,
    S:state,
    runPython:rawRunner,
    warmPy:async()=>{},
    pyodide:{runPython:()=>""},
    cur:()=>currentExercise
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync("v454-input-practice.js","utf8"),context,{filename:"v454-input-practice.js"});
  vm.runInContext(fs.readFileSync("v455-write-grading.js","utf8"),context,{filename:"v455-write-grading.js"});

  assert(context.window.MeowWriteGrading&&context.window.MeowWriteGrading.version==="4.55-multicase-grading","v455 grading API loads");
  assert(data.ko.length===30&&data.en.length===30,"v455 keeps exactly 30 lessons");
  assert(JSON.stringify(shape(data.ko))===JSON.stringify(originalShape.ko),"Korean lesson slugs, exercise IDs and types remain unchanged");
  assert(JSON.stringify(shape(data.en))===JSON.stringify(originalShape.en),"English lesson slugs, exercise IDs and types remain unchanged");

  const targets=["input-window","function-house","parameter-mail","return-spring"];
  for(const lang of ["ko","en"]){
    for(const slug of targets){
      const lesson=data[lang].find(item=>item.slug===slug);
      const write=lesson&&lesson.exercises.find(item=>item.type==="write");
      assert(Boolean(write&&write.grading&&write.grading.tests.length),`${lang} ${slug} has multi-case grading metadata`);
    }
  }

  currentExercise=data.ko.find(item=>item.slug==="input-window").exercises.find(item=>item.type==="write");
  runnerMode="hardcoded";
  state.stdinValue="Amy";
  const cheated=await context.runPython('name = input()\nprint("Welcome Amy")');
  assert(cheated.includes("추가 테스트 실패"),"hardcoded visible answer fails the extra input case");
  assert(state.stdinValue==="Amy","hidden stdin test restores the learner's visible input value");

  runnerMode="dynamic";
  const generalized=await context.runPython('name = input()\nprint("Welcome " + name)');
  assert(generalized==="Welcome Amy","generalized input solution passes all cases");
  assert(context.window.MeowWriteGrading.lastResult().passed===true,"grading API records a passing multi-case result");

  currentExercise=data.ko.find(item=>item.slug==="return-spring").exercises.find(item=>item.type==="write");
  runnerMode="hardcoded";
  const hardcodedReturn=await context.runPython('print(9)');
  assert(hardcodedReturn.includes("추가 테스트 실패"),"hardcoded return output fails the alternate-number test");

  runnerMode="dynamic";
  const reusableReturn=await context.runPython('def triple(x):\n    return x * 3\nprint(triple(3))');
  assert(reusableReturn==="9","reusable return solution passes alternate-number test");

  const source=fs.readFileSync("v455-write-grading.js","utf8");
  const release=fs.readFileSync("v434-release.js","utf8");
  const sw=fs.readFileSync("sw.js","utf8");
  assert(!source.includes("localStorage"),"v455 does not create, rename or delete storage keys");
  assert(source.includes("const baseRunPython=runPython"),"v455 extends execution without wrapping checkQ");
  assert(!source.includes("checkQ="),"v455 does not add another answer-pipeline wrapper");
  const i454=release.indexOf('id:"meowde-v454-input-practice"');
  const i455=release.indexOf('id:"meowde-v455-write-grading"');
  const i442=release.indexOf('id:"meowde-v442-map-touch"');
  assert(i454>=0&&i455>i454&&i442>i455,"v455 loads after real input and before visual/touch enhancements");
  assert(release.includes('"MeowWriteGrading"'),"release health tracks v455 grading API");
  assert(/CACHE_NAME = "meowde-v45[5-9]-/.test(sw),"service worker uses a v4.55-or-newer cache generation");
  assert(sw.includes('"/v455-write-grading.js"'),"v455 grading layer is available offline");

  if(process.exitCode)process.exit(process.exitCode);
  console.log("Meowde v4.55 multi-case write grading validation passed.");
})().catch(error=>{console.error(error);process.exit(1)});

"use strict";

const fs=require("fs");
const vm=require("vm");

function assert(condition,message){
  if(!condition){console.error(`FAIL: ${message}`);process.exitCode=1}
  else console.log(`PASS: ${message}`);
}

const source=fs.readFileSync("v457-diagnostic-feedback.js","utf8");
const renderer=fs.readFileSync("v413-lesson.js","utf8");
const css=fs.readFileSync("v457-diagnostic-feedback.css","utf8");
const release=fs.readFileSync("v434-release.js","utf8");
const sw=fs.readFileSync("sw.js","utf8");

let gradingResult=null;
const state={lang:"ko",screen:"home",checked:true,correct:false,write:"",output:"",sel:null,fill:""};
const context={
  window:{MeowWriteGrading:{lastResult:()=>gradingResult}},
  document:{documentElement:{dataset:{}}},
  console,
  S:state
};
vm.createContext(context);
vm.runInContext(source,context,{filename:"v457-diagnostic-feedback.js"});
const api=context.window.MeowDiagnosticFeedback;

assert(api&&api.version==="4.57-diagnostic-feedback","v457 diagnostic feedback API loads");
assert(typeof api.diagnose==="function"&&typeof api.labels==="function","v457 exposes diagnosis and labels APIs");
assert(api.labels().cause==="원인"&&api.labels().action==="다음 수정","Korean diagnostic labels are concise and actionable");

function diagnose(exercise,patch={},result=null){
  Object.assign(state,{lang:"ko",screen:"home",checked:true,correct:false,write:"",output:"",sel:null,fill:""},patch);
  gradingResult=result;
  return api.diagnose(exercise);
}

let d=diagnose(
  {id:"input-window-w",type:"write",expected:"Welcome Amy",hint:"Use input()",grading:{tests:[{}]}},
  {write:'print("Welcome Amy")',output:"Welcome Amy\n추가 테스트 실패 · 다른 입력값"},
  {visiblePassed:true,passed:false,failed:[{labelKo:"다른 입력값"}]}
);
assert(d&&d.kind==="generalization"&&d.cause.includes("input()"),"hardcoded input answer explains that input() was not read");
assert(d.action.includes("name = input()"),"hardcoded input diagnosis gives a concrete next edit");

d=diagnose(
  {id:"return-spring-w",type:"write",expected:"9",hint:"return x * 3",grading:{tests:[{}]}},
  {write:"print(9)",output:"9\n추가 테스트 실패 · 다른 숫자"},
  {visiblePassed:true,passed:false,failed:[{labelKo:"다른 숫자"}]}
);
assert(d&&d.cause.includes("하드코딩"),"hardcoded return output is diagnosed as hardcoding");
assert(d.action.includes("return x * 3"),"return diagnosis points to parameter-based calculation");

d=diagnose(
  {id:"parameter-mail-w",type:"write",expected:"Welcome Amy",grading:{tests:[{}]}},
  {write:'def welcome(name):\n    print("Welcome Amy")\nwelcome("Amy")',output:"Welcome Amy\n추가 테스트 실패"},
  {visiblePassed:true,passed:false,failed:[{}]}
);
assert(d&&d.cause.includes("파라미터"),"parameter task explains when a fixed name ignores the parameter");

d=diagnose(
  {id:"string-methods-w",type:"write",expected:"MEOWDE",grading:{tests:[{}]}},
  {write:'def shout(text):\n    return "MEOWDE"\nprint(shout("meowde"))',output:"MEOWDE\n추가 테스트 실패"},
  {visiblePassed:true,passed:false,failed:[{}]}
);
assert(d&&d.reason.includes("다른 문자열"),"Unit 04 hidden failure explains failed generalization to another string");

d=diagnose(
  {id:"runtime-test",type:"write",expected:"ok",hint:"Check syntax"},
  {write:'if True\n    print("ok")',output:"ERROR: SyntaxError: expected ':'"},
  null
);
assert(d&&d.kind==="runtime"&&d.cause.includes("문법"),"SyntaxError gets a syntax-specific diagnosis");
assert(d.action.includes("콜론"),"SyntaxError diagnosis suggests checking the colon");

d=diagnose(
  {id:"indent-test",type:"write",expected:"ok"},
  {write:'if True:\nprint("ok")',output:"ERROR: IndentationError: expected an indented block"},
  null
);
assert(d&&d.kind==="runtime"&&d.cause.includes("들여쓰기"),"IndentationError gets an indentation-specific diagnosis");

d=diagnose(
  {id:"visible-output",type:"write",expected:"42",hint:"Add 2"},
  {write:"print(40)",output:"40"},
  {visiblePassed:false,passed:false,failed:[]}
);
assert(d&&d.kind==="output"&&d.reason.includes("40")&&d.reason.includes("42"),"visible output mismatch shows actual versus expected");

d=diagnose(
  {id:"predict-test",type:"predict",choices:["7","34","Error"],answer:0,explain:"3 + 4 is 7."},
  {sel:1}
);
assert(d&&d.kind==="predict"&&d.reason.includes("34")&&d.reason.includes("7"),"predict feedback compares selected and actual outcomes");

d=diagnose(
  {id:"fill-test",type:"fill",answer:"def",explain:"Functions start with def."},
  {fill:"return"}
);
assert(d&&d.kind==="fill"&&d.reason.includes("return")&&d.reason.includes("def"),"fill feedback identifies selected and required tokens");

d=diagnose(
  {id:"bug-test",type:"bughunt",buggy:1,fixed:"for n in values:",explain:"The colon is required."},
  {sel:0}
);
assert(d&&d.kind==="bughunt"&&d.reason.includes("1번")&&d.reason.includes("2번"),"bughunt feedback identifies chosen and actual bug lines");
assert(d.action.includes("for n in values:"),"bughunt feedback includes the corrected form");

state.correct=true;
gradingResult=null;
assert(api.diagnose({id:"correct",type:"fill",answer:"def"})===null,"correct answers do not receive an error diagnosis");

state.lang="en";state.correct=false;state.checked=true;state.fill="return";
const en=api.diagnose({id:"fill-en",type:"fill",answer:"def",explain:"Functions start with def."});
assert(en&&api.labels().cause==="Cause"&&en.reason.includes("Selected"),"English diagnostic feedback is available");

assert(!source.includes("localStorage"),"v457 creates no new persistent storage");
assert(!source.includes("checkQ=")&&!source.includes("runPython="),"v457 does not wrap the answer or Python execution pipelines");
assert(renderer.includes("function diagnosticMarkup(exercise)"),"canonical Lesson renderer owns diagnostic markup");
assert(renderer.includes('data-diagnostic-kind='),"Lesson feedback exposes diagnostic kind for UI testing");
assert(renderer.includes("MeowDiagnosticFeedback"),"Lesson renderer reads the v457 feedback API");
assert(css.includes(".v457-diagnostic-row"),"diagnostic feedback has dedicated compact mobile styling");

const i456=release.indexOf('id:"meowde-v456-unit4-data"');
const i457=release.indexOf('id:"meowde-v457-diagnostic-feedback"');
const i442=release.indexOf('id:"meowde-v442-map-touch"');
assert(i456>=0&&i457>i456&&i442>i457,"v457 loads after curriculum data and before visual/touch enhancements");
assert(release.includes('"MeowDiagnosticFeedback"'),"release health tracks v457 feedback API");
assert(sw.includes('CACHE_NAME = "meowde-v457-diagnostic-feedback"'),"service worker cache generation is bumped for v457");
assert(sw.includes('"/v457-diagnostic-feedback.js"')&&sw.includes('"/v457-diagnostic-feedback.css"'),"diagnostic feedback is available offline");

if(process.exitCode)process.exit(process.exitCode);
console.log("Meowde v4.57 diagnostic learning feedback validation passed.");

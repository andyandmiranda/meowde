"use strict";

const fs=require("fs");
const vm=require("vm");
const {loadInlineData}=require("./lib-meowde");

const UNIT_SIZE=10;
const UNIT_NAMES=["Python Basics","Input & Decisions","Collections, Loops & Functions","Strings, Dictionaries & Data"];
const TARGET=[
  {id:"print",unit:1,patterns:[/\bprint\s*\(/i,/\bprint\b/i,/출력/]},
  {id:"strings",unit:1,patterns:[/string/i,/문자열|따옴표/]},
  {id:"numbers",unit:1,patterns:[/number/i,/숫자/]},
  {id:"variables",unit:1,patterns:[/variable/i,/변수/]},
  {id:"arithmetic",unit:1,patterns:[/arithmetic|operator/i,/계산|연산/]},
  {id:"f-strings",unit:1,patterns:[/f-string/i,/포매팅|formatting/i,/f\"[^\"]*\{/i]},
  {id:"input",unit:2,patterns:[/\binput\s*\(/i,/\binput\b/i,/입력/]},
  {id:"type-conversion",unit:2,patterns:[/\bint\s*\(/i,/\bstr\s*\(/i,/conversion/i,/형변환|변환/]},
  {id:"booleans",unit:2,patterns:[/boolean/i,/True|False/,/불리언|참|거짓/]},
  {id:"comparisons",unit:2,patterns:[/comparison/i,/비교/,/==|!=|>=|<=/]},
  {id:"if",unit:2,patterns:[/\bif\b/i,/조건/]},
  {id:"elif-else",unit:2,patterns:[/\belif\b/i,/\belse\b/i]},
  {id:"logical-operators",unit:2,patterns:[/\band\b|\bor\b|\bnot\b/i,/논리/]},
  {id:"lists",unit:3,patterns:[/\blist\b/i,/리스트/]},
  {id:"indexing",unit:3,patterns:[/index/i,/인덱스/]},
  {id:"list-methods",unit:3,patterns:[/\.append\s*\(/i,/append/i,/추가/]},
  {id:"for",unit:3,patterns:[/\bfor\b/i,/for문|반복/]},
  {id:"range",unit:3,patterns:[/\brange\s*\(/i]},
  {id:"while",unit:3,patterns:[/\bwhile\b/i,/while문/]},
  {id:"loop-control",unit:3,patterns:[/\bbreak\b/i,/반복.*멈|loop.*stop/i]},
  {id:"functions",unit:3,patterns:[/\bdef\s+\w+/i,/function/i,/함수/]},
  {id:"parameters",unit:3,patterns:[/parameter|argument/i,/파라미터|매개변수|인자/]},
  {id:"return",unit:3,patterns:[/\breturn\b/i,/반환/]},
  {id:"mini-project",unit:3,patterns:[/project/i,/프로젝트/]},
  {id:"string-methods",unit:4,patterns:[/\.upper\s*\(/i,/\.lower\s*\(/i,/string method/i,/문자열 메서드/]},
  {id:"slicing",unit:4,patterns:[/slic/i,/슬라이싱/,/\[[^\]]*:[^\]]*\]/]},
  {id:"membership",unit:4,patterns:[/\bin\b|\bnot in\b/i,/포함 여부/]},
  {id:"dictionaries",unit:4,patterns:[/dictionary/i,/딕셔너리/]},
  {id:"dictionary-get",unit:4,patterns:[/\.get\s*\(/i,/안전한 조회/]},
  {id:"dictionary-items",unit:4,patterns:[/\.items\s*\(/i,/키와 값/]},
  {id:"tuples",unit:4,patterns:[/tuple/i,/튜플/]},
  {id:"sets",unit:4,patterns:[/\bset\s*\(/i,/집합/]},
  {id:"data-project",unit:4,patterns:[/structured data/i,/데이터 미니 프로젝트|구조화된 데이터/]}
];

function clone(value){return JSON.parse(JSON.stringify(value))}
function effectiveData(){
  const raw=loadInlineData();
  const data={ko:clone(raw.ko),en:clone(raw.en)};
  const context={
    window:{MEOWDE_LESSONS_KO:data.ko,MEOWDE_LESSONS_EN:data.en},
    document:{documentElement:{dataset:{}}},
    console,
    S:{screen:"lesson",lang:"ko",stdinValue:"Amy",done:[],next:0,unit:0},
    save:()=>{},
    runPython:async()=>"",
    warmPy:async()=>{},
    pyodide:{runPython:()=>""},
    cur:()=>null
  };
  vm.createContext(context);
  for(const file of ["v452-curriculum.js","v453-curriculum-practice.js","v454-input-practice.js","v455-write-grading.js","v456-unit4-data.js"]){
    vm.runInContext(fs.readFileSync(file,"utf8"),context,{filename:file});
  }
  return data;
}
function textOf(value){
  if(value==null)return "";
  if(Array.isArray(value))return value.map(textOf).join("\n");
  if(typeof value==="object")return Object.values(value).map(textOf).join("\n");
  return String(value);
}
function teachingText(lesson){
  const concepts=(lesson.exercises||[]).filter(item=>item.type==="concept");
  return [lesson.title,lesson.short,lesson.focus,lesson.description,concepts.map(item=>({title:item.title,body:item.body,code:item.code,hint:item.hint}))].map(textOf).join("\n");
}
function normalize(value){return String(value||"").toLowerCase().replace(/\s+/g," ").trim()}
function exerciseSignature(exercise){return normalize([exercise.type,exercise.prompt,exercise.title,exercise.body,exercise.code,exercise.model,exercise.fixed,exercise.testcase,exercise.expected].filter(Boolean).join(" | "))}
function lessonConcepts(lesson){const text=teachingText(lesson);return TARGET.filter(item=>item.patterns.some(pattern=>pattern.test(text))).map(item=>item.id)}
function summarizeLanguage(lessons){
  const typeCounts={},signatures=new Map();let totalExercises=0,hints=0,explanations=0,writeExercises=0;
  lessons.forEach((lesson,lessonIndex)=>{
    (lesson.exercises||[]).forEach(exercise=>{
      totalExercises++;typeCounts[exercise.type]=(typeCounts[exercise.type]||0)+1;
      if(exercise.hint)hints++;if(exercise.explain||exercise.body)explanations++;if(exercise.type==="write")writeExercises++;
      const sig=exerciseSignature(exercise);if(!signatures.has(sig))signatures.set(sig,[]);signatures.get(sig).push(`${lessonIndex+1}:${exercise.id||exercise.type}`);
    });
  });
  const duplicates=[...signatures.entries()].filter(([sig,refs])=>sig&&refs.length>1).map(([sig,refs])=>({refs,preview:sig.slice(0,110)}));
  return {totalExercises,typeCounts,hints,explanations,writeExercises,duplicates};
}
function coverage(lessons){return TARGET.map(target=>{const hits=[];lessons.forEach((lesson,index)=>{const text=teachingText(lesson);if(target.patterns.some(pattern=>pattern.test(text)))hits.push(index+1)});return {...target,hits}})}
function alignmentWarnings(ko,en){
  const warnings=[];if(ko.length!==en.length)warnings.push(`lesson count mismatch: ko=${ko.length}, en=${en.length}`);
  const n=Math.min(ko.length,en.length);for(let i=0;i<n;i++){
    if(ko[i].slug!==en[i].slug)warnings.push(`lesson ${i+1} slug mismatch`);
    const koIds=(ko[i].exercises||[]).map(x=>`${x.id}:${x.type}`).join("|");const enIds=(en[i].exercises||[]).map(x=>`${x.id}:${x.type}`).join("|");
    if(koIds!==enIds)warnings.push(`lesson ${i+1} exercise shape mismatch`);
  }return warnings;
}

const {ko,en}=effectiveData();
const koSummary=summarizeLanguage(ko),enSummary=summarizeLanguage(en),concepts=coverage(ko),alignment=alignmentWarnings(ko,en);
const missing=concepts.filter(item=>!item.hits.length);

console.log("# Meowde Effective Beginner Python Curriculum Audit\n");
console.log(`- Runtime curriculum: v452 → v456 applied over canonical lesson assets`);
console.log(`- Korean lessons/exercises: ${ko.length}/${koSummary.totalExercises}`);
console.log(`- English lessons/exercises: ${en.length}/${enSummary.totalExercises}`);
console.log(`- Exercise types (KO): ${JSON.stringify(koSummary.typeCounts)}`);
console.log(`- Hint coverage: ${koSummary.hints}/${koSummary.totalExercises}`);
console.log(`- Explanation/body coverage: ${koSummary.explanations}/${koSummary.totalExercises}`);
console.log(`- Repeated exercise signatures: ${koSummary.duplicates.length}`);
console.log(`- KO/EN structural alignment warnings: ${alignment.length}`);
console.log("");

for(let start=0;start<ko.length;start+=UNIT_SIZE){
  const unit=Math.floor(start/UNIT_SIZE)+1;
  console.log(`## Unit ${unit}: ${UNIT_NAMES[unit-1]} — lessons ${start+1}-${Math.min(start+UNIT_SIZE,ko.length)}`);
  ko.slice(start,start+UNIT_SIZE).forEach((lesson,offset)=>{
    const types=[...new Set((lesson.exercises||[]).map(item=>item.type))];
    console.log(`${String(start+offset+1).padStart(2,"0")}. ${lesson.title} [${lesson.slug}] | focus=${(lesson.focus||[]).join("/")} | exercises=${(lesson.exercises||[]).length} | types=${types.join(",")} | taught=${lessonConcepts(lesson).join(",")}`);
  });
  console.log("");
}

console.log("## Teaching-signal concept coverage");
concepts.forEach(item=>console.log(`- ${item.id}: ${item.hits.length?`lessons ${item.hits.join(",")}`:"MISSING"}`));
console.log("");
console.log("## High-signal findings");
console.log(`- Missing core v1 concepts: ${missing.length?missing.map(item=>item.id).join(", "):"none"}`);
console.log(`- KO/EN structural warnings: ${alignment.length?alignment.join("; "):"none"}`);
console.log(`- Deferred beyond Unit 04: modules/files, exceptions, advanced functions, OOP`);
console.log(`- Progress-safety invariant: lessons 1-30 keep their indices/slugs/exercise IDs/types; Unit 04 appends lessons 31-40`);
console.log("");
console.log("## Machine-readable summary");
console.log(JSON.stringify({lessonCount:ko.length,exerciseCount:koSummary.totalExercises,typeCounts:koSummary.typeCounts,missing:missing.map(item=>item.id),alignmentWarnings:alignment,duplicateCount:koSummary.duplicates.length},null,2));

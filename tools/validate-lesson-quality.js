"use strict";
// Conservative static quality gate. It detects structural defects, not semantic correctness.
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const sources=["assets/lessons-ko.js","assets/lessons-en.js"];
for(const path of sources){
 const source=fs.readFileSync(path,"utf8"),context={window:{}};
 vm.runInNewContext(source,context,{filename:path,timeout:1000});
 const key=path.endsWith("ko.js")?"MEOWDE_LESSONS_KO":"MEOWDE_LESSONS_EN";
 const lessons=context.window[key];
 assert.ok(Array.isArray(lessons)&&lessons.length>0,path+": missing curriculum");
 const seen=new Set(),errors=[];
 for(const lesson of lessons){
  if(!lesson.slug||!lesson.title||!Array.isArray(lesson.exercises)||!lesson.exercises.some(x=>x.type==="concept"&&x.body&&x.code))errors.push(lesson.slug+": missing usable concept explanation/example");
  for(const exercise of lesson.exercises){
   const id=exercise.id||"(no id)";
   if(!exercise.id||seen.has(id))errors.push(id+": missing/duplicate exercise id");
   seen.add(id);
   if(exercise.type==="concept")continue;
   if(!exercise.prompt||!exercise.hint||!exercise.explain)errors.push(id+": missing prompt, hint or explanation");
   if(exercise.type==="predict"&&(!Array.isArray(exercise.choices)||!Number.isInteger(exercise.answer)||exercise.answer<0||exercise.answer>=exercise.choices.length))errors.push(id+": invalid answer index");
   if(exercise.type==="fill"&&(!Array.isArray(exercise.tokens)||!exercise.tokens.includes(exercise.answer)))errors.push(id+": answer missing from options");
   if(exercise.type==="bughunt"&&(!Array.isArray(exercise.lines)||!Number.isInteger(exercise.buggy)||exercise.buggy<0||exercise.buggy>=exercise.lines.length))errors.push(id+": invalid buggy line");
   if(exercise.type==="write"&&(!exercise.expected||!exercise.model||!exercise.starter))errors.push(id+": incomplete writing task");
  }
 }
 if(errors.length)throw new Error(path+" quality failures:\n"+errors.join("\n"));
 console.log("PASS "+path+": "+lessons.length+" lessons, "+seen.size+" unique exercise IDs, concept/example/hint/explanation/answer shape");
}
console.log("Static quality gate PASS. Runtime grading and pedagogical correctness require separate tests.");

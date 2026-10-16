"use strict";
// Conservative static quality gate. It detects structural defects, not semantic correctness.
const assert=require("node:assert/strict");
const data=require('./effective-curriculum.cjs').load();
assert.deepEqual(data.ko.map(l=>l.slug),data.en.map(l=>l.slug),'effective KO/EN lesson order');
for(const lang of ['ko','en']){
 const path='effective '+lang,lessons=data[lang];
 assert.ok(Array.isArray(lessons)&&lessons.length===60,path+": expected 60 effective lessons");
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
   if(exercise.type==="write"&&(exercise.expected===undefined||!exercise.model||!exercise.starter))errors.push(id+": incomplete writing task");
  }
 }
 if(errors.length)throw new Error(path+" quality failures:\n"+errors.join("\n"));
 console.log("PASS "+path+": "+lessons.length+" lessons, "+seen.size+" unique exercise IDs, concept/example/hint/explanation/answer shape");
}
// Guard the explanatory guidance in the effective KO/EN runtime, not just the canonical base files.
for(const lang of ['ko','en']){
 for(const slug of ['if-gate','list-garden','index-tower','append-dock']){
  const concept=data[lang].find(l=>l.slug===slug)?.exercises.find(e=>e.type==='concept');
  const key=slug==='if-gate'?(lang==='ko'?'들여쓰기':'Indentation'):slug==='append-dock'?'append':slug==='index-tower'?'IndexError':'IndexError';
  assert.ok(concept?.body.includes(key),lang+'/'+slug+': missing beginner explanation '+key);
 }
}
console.log("PASS: KO/EN if, list, indexing and append beginner guidance");
console.log("Static quality gate PASS. Runtime grading and pedagogical correctness require separate tests.");

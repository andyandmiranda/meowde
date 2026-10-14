"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const path=require("node:path");
const source=fs.readFileSync(path.join(__dirname,"..","v500-linux-lessons.js"),"utf8");
new vm.Script(source,{filename:"v500-linux-lessons.js"});
const match=source.match(/const lessons=(\[[\s\S]*?\]);\s*const safe=/);
assert.ok(match,"lesson data declaration is present");
const lessons=vm.runInNewContext(match[1]);
assert.equal(lessons.length,10,"pilot has exactly ten questions");
const ids=new Set();
for(const lesson of lessons){
 assert.equal(typeof lesson.id,"string");
 assert.ok(!ids.has(lesson.id),"IDs must be unique");
 ids.add(lesson.id);
 assert.ok(lesson.prompt.length>=12,"question must have a clear prompt");
 assert.equal(lesson.options.length,3,"three choices expected");
 assert.equal(new Set(lesson.options).size,3,"choices must be distinct");
 assert.ok(Number.isInteger(lesson.answer)&&lesson.answer>=0&&lesson.answer<lesson.options.length,"answer is a valid index");
 assert.ok(lesson.why.length>15,"feedback must be present");
 assert.ok(lesson.tryIt.length>0,"practice command must be present");
 assert.ok(!/sudo\s|\brm\s+-[rf]|curl\s.*\|\s*(?:bash|sh)/.test(lesson.tryIt),"avoid elevated or obviously destructive commands");
}
assert.ok(source.includes('if(!correct){const retry='),"incorrect answers offer a retry");
assert.ok(source.includes('!state.done.includes(q.id)'),"completed progress cannot be added twice");
assert.ok(source.includes('localStorage.setItem(KEY'),"course progress is persisted separately");
assert.ok(source.includes('const KEY="meowde-v500-linux-progress"'),"Linux storage key is isolated");
for(const id of ["permissions-1","permissions-2","permissions-3","text-1"]){
 const item=lessons.find(l=>l.id===id);
 assert.ok(/mktemp/.test(item.tryIt),"file demonstrations must use unique temporary files");
 assert.ok(/rm --/.test(item.tryIt),"file demonstrations must clean up their temporary files");
}
console.log("Linux content integrity checks passed: "+lessons.length+" lessons");

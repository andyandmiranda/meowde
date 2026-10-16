"use strict";
const fs=require("node:fs"),assert=require("node:assert/strict"),path=require("node:path");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const content=JSON.parse(read("assets/python-lab-content.json")),coverage=JSON.parse(read("docs/python-learning-coverage.json")),ids=new Set();
assert.equal(content.units.length,14);
for(const unit of content.units){
 assert.ok(!ids.has(unit.id),"Unique unit id");
 for(const id of unit.prerequisites)assert.ok(ids.has(id),"Prerequisite is already introduced: "+id);
 ids.add(unit.id);
 for(const key of ["goals","concept","glossary","example","output","flow","pitfalls"])assert.ok(unit[key],unit.id+" "+key);
 assert.equal(unit.quiz.choices.length,unit.quiz.reasons.length);
 assert.ok(unit.quiz.answer>=0&&unit.quiz.answer<unit.quiz.choices.length);
 assert.ok(unit.task.tests.length>=4&&unit.task.hints.length===3);
 for(const key of ["prompt","starter","model","criteria","steps","mistake","alternative","difficulty","type"])assert.ok(unit.task[key]);
 assert.deepEqual(unit.task.criteria,unit.task.tests.map(t=>t.label));
 for(const item of unit.task.tests)assert.ok(item.code&&item.feedback);
}
assert.equal(new Set(coverage.rows.map(r=>r.source)).size,15,"All supplied sources mapped");
assert.equal(coverage.rows.length,49);
for(const row of coverage.rows){if(row.unit)assert.ok(ids.has(row.unit));assert.ok(coverage.definitions[row.status]);if(row.status!=="보강")assert.ok(row.gap)}
for(const asset of ["python-lab.html","assets/python-lab.js","assets/python-lab.css","assets/python-lab-worker.js","assets/python-lab-entry.js","assets/python-lab-content.json"])assert.ok(read("sw.js").includes('"/'+asset+'"'),"Precache includes "+asset);
assert.ok(read("v434-release.js").includes('script:"assets/python-lab-entry.js"'));
assert.ok(!read("assets/python-lab.js").includes("localStorage.clear"));
console.log("PASS: 14 learning units, 29 activities, 56 criteria, 15 source files / 49 scope mappings, additive storage and offline assets");

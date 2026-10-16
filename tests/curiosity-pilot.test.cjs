'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const ctx={};vm.runInNewContext(fs.readFileSync('assets/curiosity-pilot.js','utf8'),ctx);
const pilot=ctx.MeowdeCuriosityPilot;
test('pilot contains two distinct challenges with valid zero-based answers',()=>{
 assert.equal(pilot.tasks.length,2);
 assert.notEqual(pilot.tasks[0].id,pilot.tasks[1].id);
 for(const task of pilot.tasks){
  assert.equal(task.items[task.answer],task.target);
  assert.equal(pilot.grade(task.id,task.answer).correct,true);
  for(let i=0;i<task.items.length;i++)if(i!==task.answer)assert.equal(pilot.grade(task.id,i).correct,false);
 }
});
test('rejects invalid choices and unknown task IDs',()=>{
 for(const bad of [-1,1.5,'2',99,NaN])assert.equal(pilot.grade('cat-index',bad).valid,false);
 assert.equal(pilot.grade('unknown',0).valid,false);
});
test('pilot has no progress, reward, storage, or network writes',()=>{
 const source=fs.readFileSync('assets/curiosity-pilot.js','utf8')+'\n'+fs.readFileSync('curiosity-pilot.html','utf8');
 for(const unsafe of ['localStorage','sessionStorage','setItem(', 'removeItem(', 'fetch(', 'XMLHttpRequest','sendBeacon','S.done','S.xp'])assert.equal(source.includes(unsafe),false,'unexpected write/network token: '+unsafe);
 assert.match(source,/aria-live="polite"/);
 assert.match(source,/prefers-reduced-motion/);
});

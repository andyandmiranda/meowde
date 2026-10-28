const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const path=require("node:path");
const root=path.join(__dirname,"..");
function load(){const sandbox={};sandbox.globalThis=sandbox;vm.runInNewContext(fs.readFileSync(path.join(root,"assets/ml-foundations.js"),"utf8"),sandbox);return sandbox.MeowdeMLFoundations;}
test("four ML introductory lessons teach trace, pitfalls, and feedback",()=>{
 const {units,grade}=load();
 assert.deepEqual(Array.from(units,x=>x.id),["linear","logistic","knn","bayes"]);
 for(const u of units){assert.ok(u.prereq&&u.concept&&u.trace&&u.mistake&&u.transfer);assert.ok(u.choices.length>=3);
  const correct=grade(u.id,u.answer);assert.equal(correct.correct,true);assert.equal(correct.answer,u.choices[u.answer]);
  const wrong=grade(u.id,(u.answer+1)%u.choices.length);assert.equal(wrong.correct,false);assert.ok(wrong.selected&&wrong.reason&&wrong.next);
 }
});
test("unexpected answer indexes cannot be treated as correct",()=>{
 const api=load();for(const input of [-1,3,999,NaN,1.2])assert.equal(api.grade("linear",input).ok,false);
 assert.equal(api.grade("missing",0).ok,false);
});
test("ML learning storage is isolated and linked from Python lab",()=>{
 const api=load();
 assert.equal(api.KEY,"meowde-ml-foundations-v1");
 const html=fs.readFileSync(path.join(root,"python-lab.html"),"utf8");
 assert.match(html,/href="\/ml-foundations\.html"/);
 const entry=fs.readFileSync(path.join(root,"ml-foundations.html"),"utf8");
 assert.match(entry,/assets\/ml-foundations\.js/);
 assert.match(fs.readFileSync(path.join(root,"assets/ml-foundations.js"),"utf8"),/if\(!writable\)return false/);
});

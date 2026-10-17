"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");
const vm = require("node:vm");

// Exercise the shipped checkQ implementation, not a retyped scoring formula.
const html = fs.readFileSync("index.html", "utf8");
const source = html.match(/async function checkQ\(\)\{[^\n]*\}/)?.[0];
assert.ok(source, "checkQ source must exist");

function harness({retry=false, correct=true, firstCorrect=0, firstTotal=5}) {
  const ex = {type:"predict", answer:0, retry};
  const state = {
    sel:correct?0:1, loading:false, checked:false, correct:false,
    combo:0,maxCombo:0,xpEarned:0,firstCorrect,firstTotal,daily:false,
    queue:[ex],hint:false
  };
  const context = {
    S:state, cur:()=>ex, renderLesson:()=>{}, runPython:async()=>"",
    t:()=>"", Object
  };
  vm.runInNewContext(source + "\nthis.checkQ=checkQ;",context);
  return {state, check:()=>context.checkQ()};
}

test("4/5 first attempts stays 80% after successful retry",async()=>{
  const h=harness({retry:true,correct:true,firstCorrect:4});
  await h.check();
  assert.equal(h.state.firstCorrect,4);
  assert.equal(Math.round(h.state.firstCorrect/h.state.firstTotal*100),80);
  assert.equal(h.state.xpEarned,10,"retry reward must remain");
});

test("all five first-attempt correct yields 100%",async()=>{
  const h=harness({firstCorrect:4});
  await h.check();
  assert.equal(h.state.firstCorrect,5);
  assert.equal(Math.round(h.state.firstCorrect/h.state.firstTotal*100),100);
});

test("wrong original answer queues retry without first-attempt credit",async()=>{
  const h=harness({correct:false,firstCorrect:4});
  await h.check();
  assert.equal(h.state.firstCorrect,4);
  assert.equal(h.state.queue.length,2);
  assert.equal(h.state.queue[1].retry,true);
});

test("restored retry state does not gain first-attempt credit",async()=>{
  const saved=JSON.parse(JSON.stringify({retry:true,firstCorrect:4,firstTotal:5}));
  const h=harness({...saved,correct:true});
  await h.check();
  assert.equal(h.state.firstCorrect,4);
});

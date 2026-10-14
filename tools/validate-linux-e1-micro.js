#!/usr/bin/env node
"use strict";
const fs=require("node:fs"),assert=require("node:assert/strict"),vm=require("node:vm");
const html=fs.readFileSync("linux-crash-course.html","utf8");
assert.match(html,/id="micro-e1"/);
assert.match(html,/1 \/ 4 · 개념/);
assert.match(html,/폴더를 디렉터리라고/);
assert.match(html,/step===2\?"training":"travel"/);
assert.match(html,/snapshot\.files\["\/home\/student\/"\+expected\]/);
assert.match(html,/next\.hidden=!successful/);
assert.match(html,/sim\.reset\(\);hints=0/);
assert.match(html,/hints===1/);
const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]).filter(Boolean);
assert.equal(scripts.length,5);
scripts.forEach((s,i)=>new vm.Script(s,{filename:"inline-"+i}));
console.log("PASS: E1 guided concept, example, practice, transfer and syntax");

#!/usr/bin/env node
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),vm=require("node:vm");
const ctx=vm.createContext({});
vm.runInContext(fs.readFileSync("assets/linux-bash-practice.js","utf8"),ctx,{timeout:2000});
const grade=ctx.MeowdeBashPractice.grade;
const minor='if [ "$age" -lt 19 ]; then\n echo "미성년자입니다"\nelse\n echo "성인입니다"\nfi';
const pass='if [ "$score" -ge 80 ]; then\n echo "PASS"\nelse\n echo "RETRY"\nfi';
assert.equal(grade("minor",minor).ok,true);
assert.equal(grade("pass",pass).ok,true);
assert.equal(grade("minor",minor.replace("-lt","-gt")).ok,false);
assert.equal(grade("minor",minor.replace("성인입니다","미성년자입니다")).ok,false);
for(const input of ["rm -rf /","if true; then echo pass; fi",minor+"\nrm -rf /"]){assert.equal(grade("minor",input).ok,false)}
assert.equal(grade("missing",minor).ok,false);
const html=fs.readFileSync("linux-crash-course.html","utf8");
assert.match(html,/href="#lesson"/);
assert.match(html,/href="#sim-missions"/);
assert.match(html,/href="#bash-task"/);
assert.match(html,/safe-area-inset-bottom/);
assert.match(html,/id="sim-hint" hidden/);
assert.match(html,/id="bash-feedback" role="status"/);
assert.match(html,/meowde-linux-cram-v1/);
assert.doesNotMatch(html,/localStorage\.clear\s*\(/);
console.log("PASS: limited Bash condition parser and multi-input semantic grading");

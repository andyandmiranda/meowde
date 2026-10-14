#!/usr/bin/env node
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const path=require("node:path");
const js=fs.readFileSync(path.join(__dirname,"../assets/linux-mobile-simulator.js"),"utf8");
const html=fs.readFileSync(path.join(__dirname,"../linux-crash-course.html"),"utf8");
assert.match(html,/src="\/assets\/linux-mobile-simulator\.js"/);
assert.match(html,/id="sim-input"/);
assert.match(html,/id="sim-check"/);
assert.match(html,/meowde-linux-cram-v1/);
assert.doesNotMatch(html,/localStorage\.clear\s*\(/);
const context=vm.createContext({});
vm.runInContext(js,context,{timeout:2000});
const sim=context.MeowdeLinuxSim.create();
function cmd(input,expected=true){const result=sim.run(input);assert.equal(result.ok,expected,input+": "+result.output);return result.output;}
assert.equal(cmd("pwd"),"/home/student");
assert.match(cmd("ls"),/notes.txt/);
cmd("mkdir training");
cmd("touch training/hello.txt");
assert.equal(sim.snapshot().files["/home/student/training"].type,"dir");
assert.equal(sim.snapshot().files["/home/student/training/hello.txt"].type,"file");
cmd("cp training/hello.txt projects/");
assert.equal(sim.snapshot().files["/home/student/projects/hello.txt"].type,"file");
cmd("mv projects/hello.txt projects/moved.txt");
assert.equal(sim.snapshot().files["/home/student/projects/hello.txt"],undefined);
assert.equal(sim.snapshot().files["/home/student/projects/moved.txt"].type,"file");
cmd("cd training");assert.equal(cmd("pwd"),"/home/student/training");
cmd("cd ..");assert.equal(cmd("pwd"),"/home/student");
for(const input of ["rm -rf /","cat /etc/passwd","ls; pwd","touch hi && pwd","mkdir ../oops | pwd","touch /dev/null","cp notes.txt ../../secret.txt","mkdir a/b"]){cmd(input,false)}
sim.reset();assert.equal(sim.snapshot().files["/home/student/training"],undefined);
assert.equal(sim.snapshot().cwd,"/home/student");
console.log("PASS: mobile Linux simulator state, path boundaries, unsupported commands and reset");

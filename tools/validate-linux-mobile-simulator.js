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

// Mission regression: check final filesystem state, not exact command syntax.
function mission0(s){return s.files["/home/student/training"]?.type==="dir"&&s.files["/home/student/training/hello.txt"]?.type==="file"}
function mission1(s){return s.files["/home/student/notes.txt"]?.type==="file"&&s.files["/home/student/projects/notes.txt"]?.text===s.files["/home/student/notes.txt"].text}
function mission2(s){return !s.files["/home/student/notes.txt"]&&s.files["/home/student/memo.txt"]?.type==="file"}
sim.reset();
assert.equal(mission0(sim.snapshot()),false);
cmd("mkdir training");cmd("touch training/hello.txt");
assert.equal(mission0(sim.snapshot()),true);
sim.reset();
assert.equal(mission1(sim.snapshot()),false);
cmd("cp notes.txt projects/notes.txt");
assert.equal(mission1(sim.snapshot()),true);
sim.reset();
assert.equal(mission2(sim.snapshot()),false);
cmd("mv notes.txt memo.txt");
assert.equal(mission2(sim.snapshot()),true);
assert.match(html,/id="sim-help"/);
assert.match(html,/id="sim-missions"/);

// E2-E3 reading/searching commands and sandbox regression.
sim.reset();
assert.match(cmd("cat app.log"),/ERROR network/);
assert.match(cmd("head -n 2 app.log"),/^INFO boot\nERROR network$/);
assert.match(cmd("tail -n 2 app.log"),/^INFO retry\nERROR timeout$/);
assert.match(cmd("grep ERROR app.log"),/ERROR timeout/);
assert.match(cmd("grep -n ERROR app.log"),/^2:ERROR network/);
assert.match(cmd("find . -name '*.txt'"),/notes\.txt/);
for(const input of ["grep ERROR /etc/passwd","find / -name '*.txt'","tail -n 2 ../../etc/passwd","head -n 1000 app.log","find . -exec rm -rf {}"]){cmd(input,false)}

// E3 mission requires an actual matching search output, not filesystem existence.
sim.reset();
function e3(last){return last?.ok===true&&last.command==="grep"&&last.output==="2:ERROR network\n4:ERROR timeout"}
assert.equal(e3(null),false);
const wrong=sim.run("grep INFO app.log");assert.equal(e3({ok:wrong.ok,command:"grep",output:wrong.output}),false);
const result=sim.run("grep -n ERROR app.log");
assert.equal(e3({ok:result.ok,command:"grep",output:result.output}),true);
sim.reset();
assert.match(html,/E3 오류 줄 찾기/);
console.log("PASS: mobile Linux simulator state, path boundaries, unsupported commands and reset");

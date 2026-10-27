const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const path=require("node:path");
const root=path.join(__dirname,"..");

function load(file,context={}){
 const sandbox={globalThis:null,...context};sandbox.globalThis=sandbox;
 vm.runInNewContext(fs.readFileSync(path.join(root,file),"utf8"),sandbox,{filename:file});
 return sandbox;
}

test("limited Linux command practice grades outcomes and accepts equivalent quoting",()=>{
 let sandbox=load("assets/linux-mobile-simulator.js");
 sandbox=load("assets/linux-command-practice.js",sandbox);
 assert.equal(sandbox.MeowdeLinuxCommandPractice.grade(0,"pwd").ok,true);
 assert.equal(sandbox.MeowdeLinuxCommandPractice.grade(1,"tail -n 2 './app.log'").ok,true);
 assert.equal(sandbox.MeowdeLinuxCommandPractice.grade(2,"grep -n 'ERROR' ./app.log").ok,true);
 assert.equal(sandbox.MeowdeLinuxCommandPractice.grade(2,"grep ERROR app.log").ok,false);
 assert.equal(sandbox.MeowdeLinuxCommandPractice.grade(4,"chmod 600 secret.txt").supported,false);
});

test("Linux learning path declares honest L0-L3 goals and one-stage UI",()=>{
 const source=fs.readFileSync(path.join(root,"assets/linux-course-path.js"),"utf8");
 for(const level of ["L0 왕초보","L1 기초","L2 초중급","L3 중급"])assert.match(source,new RegExp(level));
 assert.doesNotMatch(source,/L4|L5/);
 assert.match(source,/학습 목표/);
 assert.match(source,/다시 선택할 수 있어요/);
 assert.doesNotMatch(source,/function stageButton/);
 assert.match(source,/make\("li",\(i\+1\)\+"\. "\+name\)/);
 const css=fs.readFileSync(path.join(root,"assets/linux-learning-ui.css"),"utf8");
 assert.match(css,/--surface-mint:#53C7A0/);
 assert.match(css,/\.linux-stage-path/);
});

test("Linux entry keeps one primary action and hides secondary routes by default",()=>{
 const home=fs.readFileSync(path.join(root,"linux-home.html"),"utf8");
 assert.equal((home.match(/class="primary"/g)||[]).length,1);
 assert.match(home,/<details class="more-links">/);
 assert.doesNotMatch(home,/meowde-subject-overview/);
 const library=fs.readFileSync(path.join(root,"assets/linux-library-view.js"),"utf8");
 assert.doesNotMatch(library,/library-mode/);
 assert.match(library,/section\.hidden=i!==modes\[mode\]\[1\]/);
});

test("Linux navigation uses the approved five-tab product structure",()=>{
 const source=fs.readFileSync(path.join(root,"assets/linux-shared-navigation.js"),"utf8");
 for(const label of ["홈","학습","심화","함께","마이"])assert.match(source,new RegExp("'"+label+"'"));
 assert.doesNotMatch(source,/\['practice','실습'/);
 assert.doesNotMatch(source,/\['review','복습'/);
 assert.match(source,/previous=\{\.\.\.previous,version:1/);
 const pathSource=fs.readFileSync(path.join(root,"assets/linux-course-path.js"),"utf8");
 assert.match(pathSource,/saved=\{\.\.\.saved,index,done,stageByLesson:stages\}/);
});

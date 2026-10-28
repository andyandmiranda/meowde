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
 assert.equal(sandbox.MeowdeLinuxCommandPractice.grade(4,"chmod 600 secret.txt").ok,true);
 assert.equal(sandbox.MeowdeLinuxCommandPractice.grade(4,"chmod 777 secret.txt").ok,false);
 for(const [index,valid,invalid] of [
  [3,"cat ./names.txt | sort","cat names.txt > sort"],
  [5,"ps aux","kill 1234"],
  [6,"apt-cache search tree","sudo apt install tree"],
  [7,'echo "$name"',"echo name="]
 ]){
  assert.equal(sandbox.MeowdeLinuxCommandPractice.grade(index,valid).ok,true);
  assert.equal(sandbox.MeowdeLinuxCommandPractice.grade(index,invalid).ok,false);
  assert.equal(sandbox.MeowdeLinuxCommandPractice.grade(index,valid).verified,"syntax");
 }
 assert.equal(sandbox.MeowdeLinuxCommandPractice.grade(8,'echo "충전이 필요해요"').supported,false);
});

test("Linux learning path declares honest L0-L3 goals and one-stage UI",()=>{
 const source=fs.readFileSync(path.join(root,"assets/linux-course-path.js"),"utf8");
 for(const level of ["L0 왕초보","L1 기초","L2 초중급","L3 중급"])assert.match(source,new RegExp(level));
 assert.doesNotMatch(source,/L4|L5/);
 assert.match(source,/학습 목표/);
 assert.match(source,/다시 선택할 수 있어요/);
 assert.doesNotMatch(source,/function stageButton/);
 assert.match(source,/make\("li",\(i\+1\)\+"\. "\+name\)/);
 assert.match(source,/saved\.commandDraftByLesson=\{/);
 assert.match(source,/input\.value=drafts\[index\]/);
 assert.match(source,/input\.addEventListener\("input"/);
 assert.match(source,/MeowdeBashPractice\.grade\("battery",raw\)/);
 assert.match(source,/index===8\?"textarea":"input"/);
 const css=fs.readFileSync(path.join(root,"assets/linux-learning-ui.css"),"utf8");
 assert.match(css,/--surface-mint:#F5DDE5/);
 assert.match(css,/--surface-mint-dark:#80556A/);
 assert.doesNotMatch(css,/--surface-mint:#53C7A0/);
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
 for(const route of ['/linux-home.html?tab=home','/linux-home.html?tab=learn','/linux-crash-course.html?view=concept','/together.html?subject=linux','/linux-home.html?tab=my'])assert.ok(source.includes(route),'missing subject-aware tab '+route);
 assert.doesNotMatch(source,/\['my','마이','♧','\/\?tab=my'\]/);
 assert.match(source,/previous=\{\.\.\.previous,version:1/);
 const pathSource=fs.readFileSync(path.join(root,"assets/linux-course-path.js"),"utf8");
 assert.match(pathSource,/saved=\{\.\.\.saved,index,done,stageByLesson:stages\}/);
});

test("Linux simulator rejects unbalanced quotes without changing virtual files",()=>{
 const sandbox=load("assets/linux-mobile-simulator.js");
 for(const command of ['mkdir "training','mkdir training"',"touch 'notes"]){
  const sim=sandbox.MeowdeLinuxSim.create();
  const before=JSON.stringify(sim.snapshot());
  const result=sim.run(command);
  assert.equal(result.ok,false,command);
  assert.match(result.output,/따옴표/);
  assert.equal(JSON.stringify(sim.snapshot()),before,command);
 }
 for(const command of ['mkdir "my folder"',"mkdir 'my folder'",'mkdir training']){
  const sim=sandbox.MeowdeLinuxSim.create();
  assert.equal(sim.run(command).ok,true,command);
 }
});

test("E1-E9 retry revokes stale continue actions before regrading",()=>{
 const source=fs.readFileSync(path.join(root,"assets/linux-course-path.js"),"utf8");
 assert.match(source,/check\.onclick=\(\)=>\{\s*\/\/ A later failed submission must revoke any previously earned continue action\.\s*panel\.querySelectorAll\("\.linux-next"\)\.forEach\(button=>button\.remove\(\)\)/);
 const sim=load("assets/linux-mobile-simulator.js");
 const grader=load("assets/linux-command-practice.js",sim).MeowdeLinuxCommandPractice;
 assert.equal(grader.grade(0,"pwd").ok,true);
 assert.equal(grader.grade(0,"cat notes.txt").ok,false);
});

test("mobile terminal does not submit during Korean IME composition",()=>{
 const source=fs.readFileSync(path.join(root,"linux-crash-course.html"),"utf8");
 assert.match(source,/input\.addEventListener\("keydown",event=>\{if\(event\.isComposing\|\|event\.keyCode===229\)return;if\(event\.key==="Enter"\)/);
});

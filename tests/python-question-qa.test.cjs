'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync('index.html','utf8');
const report=fs.readFileSync('assets/lesson-qa-report.js','utf8');
test('answer disclosure is optional and uses authored model, not only expected output',()=>{
 assert.match(html,/정답 코드 보기/);
 assert.match(html,/ex\.model\|\|/);
 assert.match(html,/!S\.correct\?\x60<details/);
 assert.match(html,/assets\/lesson-qa-report\.js/);
});
test('report is per question, explicitly local and excludes learner code and progress',()=>{
 assert.match(report,/exerciseId:String\(exercise\.id/);
 assert.match(report,/subject:'python'/);
 assert.match(report,/외부로 자동 전송되지 않으며/);
 assert.doesNotMatch(report,/localStorage|sessionStorage|fetch\(|XMLHttpRequest|sendBeacon/);
 assert.doesNotMatch(report,/S\.write|S\.output|S\.done|exercise\.prompt|exercise\.code/);
});
test('report JavaScript parses',()=>assert.doesNotThrow(()=>new vm.Script(report)));
test('Python lesson model for welcome(name) is correct and executable in structure',()=>{
 const source=fs.readFileSync('assets/lessons-ko.js','utf8');
 assert.ok(source.includes('def welcome(name):')); assert.ok(source.includes('welcome(\\\"Amy\\\")'));
});

test('compact report is mounted in the question bubble, not the constrained mobile header',()=>{
 assert.match(report,/querySelector\('\.lesson-main \.bubble'\)/);
 assert.doesNotMatch(report,/querySelector\('\.lesson-top'\)/);
 assert.match(report,/max-width:min\(90vw,420px\)/);
});
test('existing grade, saved progress and exercise navigation functions remain present',()=>{
 assert.match(html,/async function checkQ\(\)/);
 assert.match(html,/function renderLesson\(\)/);
 assert.match(html,/function nextQ\(\)/);
 assert.match(html,/function save\([^)]*\)/);
});

test('mobile report row separates hint and report and preserves tap target',()=>{
 assert.ok(report.includes("className='meowde-qa-actions'"));
 assert.ok(report.includes('actions.append(hint,button)'));
 assert.ok(report.includes('justify-content:space-between'));
 assert.ok(report.includes('min-height:44px;min-width:44px'));
 assert.ok(report.includes('focus-visible'));
});
test('report stays copy-only with no learner record mutations',()=>{
 assert.ok(report.includes('navigator.clipboard.writeText'));
 assert.ok(!/localStorage|sessionStorage|fetch\(|sendBeacon|XMLHttpRequest/.test(report));
});


// Execute the actual current lesson checkQ function in a dependency-isolated Node VM.
// These tests do not run Pyodide or a hosted browser and do not touch learner storage.
function gradingHarness(execution){
 const current={type:'write',id:'parameter-mail-w',expected:'Welcome Amy',starter:'print("Welcome Amy")'};
 const state={checked:false,loading:false,correct:false,write:'print("Welcome Amy")',output:'',queue:[current],combo:2,maxCombo:2,xpEarned:20,firstCorrect:0,firstTotal:1,daily:false};
 const actualCheckQ=html.match(/async function checkQ\(\)\{[^\n]*\}/);
 assert.ok(actualCheckQ,'Source checkQ must be present to test the real implementation');
 let renders=0;
 const context={S:state,cur:()=>current,renderLesson(){renders++;},runPython:execution,t:key=>key==='engineError'?'실행기를 시작하지 못했어요':key};
 vm.runInNewContext(actualCheckQ[0]+'\nthis.check=checkQ;',context);
 return {state,check:()=>context.check(),renders:()=>renders};
}
test('engine infrastructure failure is NOT a wrong attempt, keeps typed work and rewards',async()=>{
 const h=gradingHarness(async()=>{throw new Error('no pyodide')});
 await h.check();
 assert.equal(h.state.loading,false,'retry control must become available');
 assert.equal(h.state.checked,false,'engine outage must not count as submitted/wrong');
 assert.equal(h.state.write,'print("Welcome Amy")');
 assert.equal(h.state.output,'실행기를 시작하지 못했어요');
 assert.equal(h.state.combo,2,'streak cannot be reset by a network failure');
 assert.equal(h.state.firstCorrect,0);
 assert.equal(h.state.xpEarned,20);
 assert.equal(h.state.queue.length,1,'no fake failed attempt added to the end of the lesson');
 assert.ok(h.renders()>=2,'UI returns from loading to the unchanged question');
});
test('failed engine request can be retried normally and awards once after recovery',async()=>{
 let runs=0;
 const h=gradingHarness(async()=>{if(++runs===1)throw new Error('offline');return 'Welcome Amy'});
 await h.check();
 assert.equal(h.state.checked,false);
 await h.check();
 assert.equal(runs,2);
 assert.equal(h.state.checked,true);
 assert.equal(h.state.correct,true);
 assert.equal(h.state.firstCorrect,1);
 assert.equal(h.state.queue.length,1);
 assert.equal(h.state.xpEarned,35);
 await h.check();
 assert.equal(runs,2,'submitted answer cannot award twice');
});
test('learner code error remains a wrong answer, unlike executor outage',async()=>{
 const h=gradingHarness(async()=> 'ERROR: NameError: name is not defined');
 await h.check();
 assert.equal(h.state.checked,true);
 assert.equal(h.state.correct,false);
 assert.equal(h.state.queue.length,2,'one authored retry question is added');
 assert.equal(h.state.combo,0);
 assert.equal(h.state.xpEarned,20);
});
test('output-only matching limitation is reproduced, not silently regraded',async()=>{
 const h=gradingHarness(async()=> 'Welcome Amy');
 // This code prints the expected string without defining the function shown in the model.
 // The authored prompt currently does not define an enforceable structural rubric;
 // changing acceptance requires an owner-approved, explicit task contract.
 await h.check();
 assert.equal(h.state.correct,true,'current output-only grader accepts output-equivalent code');
});

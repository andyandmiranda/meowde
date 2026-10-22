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
 assert.match(source,/def welcome\(name\):\\n    print\(\\\"Welcome \\\" \+ name\)\\nwelcome\(\\\"Amy\\\"\)/);
});

'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const source=fs.readFileSync('v413-lesson.js','utf8');
test('all four question types get concept-to-problem reasoning guidance',()=>{
 for(const type of ['predict','fill','bughunt','write'])assert.match(source,new RegExp('\\b'+type+':ko\\?'));
 assert.match(source,/data-solving-steps/);
 assert.match(source,/이 문제에 필요한 개념·풀이 순서/);
 assert.match(source,/예제에서 문제로 연결하기/);
 assert.match(source,/\$\{qhead\}\$\{body\}\$\{conceptHelp\}/);
});
test('concept teaching offers a readiness check but does not grant completion',()=>{
 assert.match(source,/lesson-concept-check/);
 assert.match(source,/문제를 풀기 전 확인/);
 const bridge=source.slice(source.indexOf('const solveSteps='),source.indexOf('// Explain wrong answers on demand'));
 assert.doesNotMatch(bridge,/localStorage|sessionStorage|setItem|S\.done\.push|S\.xp\s*[+\-]?=/);
});

test('late Python topics teach the rule before expecting independent code',()=>{
 for(const slug of ['loop-hill','range-rail','while-cave','function-house','parameter-mail','return-spring','mini-project','boss-bug']){
  assert.match(source,new RegExp('"'+slug+'":'));
 }
 assert.match(source,/const teachingNotes=/);
 assert.match(source,/core\+' '\+note/);
 assert.match(source,/return은 함수의 결과/);
});

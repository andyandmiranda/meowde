'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','linux-loops-intro.html'),'utf8');
test('each Linux loop question provides an answer, explanation and first-attempt hint',()=>{
 const blocks=[...html.matchAll(/data-answer="([^"]+)" data-reason="([^"]+)" data-hint="([^"]+)"/g)];
 assert.equal(blocks.length,2);
 for(const [,answer,reason,hint] of blocks){
   assert.ok(html.includes('data-value="'+answer+'"'));
   assert.ok(reason.length>10&&hint.length>10);
 }
});
test('first wrong attempt is a hint, not the correct answer',()=>{
 assert.match(html,/if\(wrongAttempts===1\)\{/);
 assert.match(html,/p\.textContent='다시 도전해 볼까요\? 힌트: '\+block\.dataset\.hint/);
 assert.match(html,/\}else\{\s*p\.textContent='선택한 답:/);
});
test('correct answer ends attempts; wrong answers allow retry without rewards or persistence',()=>{
 assert.match(html,/if\(solved\)return/);
 assert.match(html,/solved=true/);
 assert.match(html,/choice\.disabled=true/);
 assert.doesNotMatch(html,/localStorage|sessionStorage|indexedDB|\bfetch\s*\(|\bXP\s*\+\+|\bchuru\s*\+\+/);
});

test('repeated same wrong choice does not reveal answer or exhaust hint',()=>{
 assert.match(html,/if\(lastWrongValue===button\.dataset\.value\)\{/);
 assert.match(html,/p\.textContent='다른 답을 선택해 보세요\. 힌트: '\+block\.dataset\.hint/);
 const repeat=html.indexOf('if(lastWrongValue===button.dataset.value)');
 const increment=html.indexOf('wrongAttempts++;',repeat);
 assert.ok(repeat>=0&&increment>repeat);
 assert.match(html,/lastWrongValue=button\.dataset\.value/);
});
test('learner-facing note accurately describes staged reveal and no persistence',()=>{
 assert.match(html,/첫 오답에는 힌트가 제공되고, 다시 틀리면 정답과 이유/);
 assert.match(html,/답안은 브라우저에 저장하지 않으며 XP·츄르도 지급하지 않습니다/);
});

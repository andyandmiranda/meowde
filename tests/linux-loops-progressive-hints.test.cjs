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

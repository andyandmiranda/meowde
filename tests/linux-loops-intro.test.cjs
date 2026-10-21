const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const html=fs.readFileSync(require('node:path').join(__dirname,'../linux-loops-intro.html'),'utf8');
test('new self-contained Bash loops lesson has a trace, wrong answer and explanations',()=>{
 for(const term of ['for name in cat dog; do','echo "$name"','done','data-answer="3"','data-answer="2 4"','data-reason=','정답:','선택한 답:','개념·예제 다시 보기'])assert.ok(html.includes(term),term);
});
test('independent lesson avoids touching saved learner state and misleading simulation claims',()=>{
 assert.ok(!/localStorage|sessionStorage|fetch\(|XP\s*\+=|churu\s*\+=/.test(html));
 assert.ok(html.includes('실제 Bash 실행이나 강의 원문 실습을 대체하지 않습니다.'));
});
test('Linux home exposes the guided loop supplement without progress writes',()=>{const home=fs.readFileSync(require('node:path').join(__dirname,'../linux-home.html'),'utf8');assert.ok(home.includes('href="/linux-loops-intro.html"'));});

'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync('assets/lesson-learning-polish.js','utf8');
const index=fs.readFileSync('index.html','utf8');
function fixture({buildDom=false}={}){
 const conceptTitle={textContent:'개념·예제 다시 보기'};
 const answerTitle={textContent:'정답 예시와 이유 확인'};
 let removedDuplicate=false,movedToFooter=false,replacedDiagnosis=null;
 const concept={classList:{remove(){},add(){}},querySelector:()=>conceptTitle};
 const answer={classList:{remove(){},add(){}},querySelector:s=>s==='summary'?answerTitle:s==='p'?{remove(){removedDuplicate=true}}:null};
 const diagnostic={replaceWith(n){replacedDiagnosis=n}};
 const button={before(n){if(n===answer)movedToFooter=true}};
 const footer={querySelector:s=>s==='.v457-diagnostic'?diagnostic:s==='button.btn'?button:null,append(n){if(n===answer)movedToFooter=true}};
 const root={querySelector:s=>s==='.lesson-main details[data-inline-concept]'?concept:s==='.feedback.no'?footer:s==='.lesson-main details[data-answer-review]'?answer:null};
 const headStyles=[];
 const state={lang:'ko',checked:true,correct:false,write:'def first_three(text):\n    return text[0:3]\nfirst_three("python")',output:''};
 const ex={id:'string-slice-w',type:'write',explain:'슬라이싱을 확인하세요.'};
 const diagnosis={kind:'output',cause:'실행 결과가 기대 출력과 달라요.',reason:'기대 출력은 pyt인데 출력이 비어 있어요.',action:'return text[:3]을 사용해보세요.'};
 const context={document:{getElementById:()=>root,head:{append:n=>headStyles.push(n)},createElement:tag=>({tagName:tag,style:{},textContent:'',className:''})},
 MutationObserver:class{observe(){}},S:state,cur:()=>ex,window:{MeowDiagnosticFeedback:{diagnose:()=>diagnosis}}};
 vm.runInNewContext(source,context,{filename:'lesson-learning-polish.js'});
 return {api:context.window.MeowdeLearningPolish,conceptTitle,answerTitle,headStyles,state,ex,diagnosis,layout:()=>({removedDuplicate,movedToFooter,replacedDiagnosis})};
}
test('page loads presentation-only module after QA module',()=>{
 assert.match(index,/<script defer src="\/assets\/lesson-qa-report\.js"><\/script><script defer src="\/assets\/lesson-learning-polish\.js"><\/script>/);
 assert.doesNotMatch(source,/localStorage|sessionStorage|S\.(?:checked|correct|xp|xpEarned|churu|queue|done|write)\s*=/);
});
test('concept is a slim secondary disclosure; answer is moved below feedback',()=>{
 const f=fixture();
 assert.equal(f.conceptTitle.textContent,'개념 설명 보기');
 assert.equal(f.answerTitle.textContent,'정답 코드 보기');
 assert.equal(f.layout().movedToFooter,true);
 assert.equal(f.layout().removedDuplicate,true);
 assert.equal(f.layout().replacedDiagnosis.className,'meowde-feedback-message');
 assert.match(f.headStyles[0].textContent,/min-height:44px/);
 assert.match(f.headStyles[0].textContent,/--v449-size:52px/);
});
test('actual string-slice miss identifies print omission, not already-correct return',()=>{
 const f=fixture(),msg=f.api.message(f.ex,f.state,f.diagnosis);
 assert.match(msg,/print\(first_three\("python"\)\)/);
 assert.doesNotMatch(msg,/return text\[:3\]/);
 assert.match(f.layout().replacedDiagnosis.textContent,/print\(first_three\("python"\)\)/);
});
test('generic wrong answers display one concise explanation, without three labels',()=>{
 const f=fixture();
 const message=f.api.message({type:'write',expected:'ok'},{lang:'ko',write:'',output:'bad'},{
    kind:'runtime',cause:'함수 이름을 찾지 못했어요.',reason:'명칭을 검사하세요.',action:'철자를 확인하세요.'
 });
 assert.equal(message,'함수 이름을 찾지 못했어요. 철자를 확인하세요.');
 assert.doesNotMatch(message,/왜 틀렸을까|다음 수정|원인\s/);
});
test('empty output guidance is neutral unless the recognizable call-without-print is present',()=>{
 const f=fixture(),state={lang:'ko',write:'print(first_three("python"))',output:''};
 const msg=f.api.message(f.ex,state,f.diagnosis);
 assert.match(msg,/실행 결과가 비어 있어요/);
 assert.doesNotMatch(msg,/마지막 줄을 print\(first_three/);
});
test('English copy, optional answer and concept use concise wording',()=>{
 const f=fixture(),state={lang:'en',checked:true,correct:false,write:'def first_three(text):\n return text[:3]\nfirst_three("python")',output:''};
 assert.match(f.api.message(f.ex,state,f.diagnosis),/print\(first_three\("python"\)\)/);
 assert.doesNotMatch(f.api.message(f.ex,state,f.diagnosis),/원인|왜 틀렸/);
});

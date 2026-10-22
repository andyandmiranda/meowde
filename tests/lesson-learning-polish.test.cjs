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
 assert.ok(msg.includes('print("print")'));
 assert.doesNotMatch(msg,/return text\[:3\]/);
 assert.match(f.layout().replacedDiagnosis.textContent,/print\(first_three\("python"\)\)/);
});
test('slice screenshot: print inside function must explain missing return, not incorrect slicing',()=>{
 const f=fixture();
 const state={lang:'ko',write:'def first_three(text):\n    print(text[0:3])\nfirst_three("python")',output:'pyt'};
 const message=f.api.message(f.ex,state,f.diagnosis);
 assert.match(message,/슬라이싱은 맞아요/);
 assert.match(message,/print\(\).*반환하지 않아요/);
 assert.match(message,/return text\[:3\]/);
 assert.doesNotMatch(message,/앞 세 글자를 실제 입력에서 잘라내지/);
 const en=f.api.message(f.ex,{...state,lang:'en'},f.diagnosis);
 assert.match(en,/slicing is correct/);
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


test('real founder SyntaxError screenshot: beginners see the specific line and two fixes, original traceback preserved',()=>{
 const f=fixture();
 const code='def has_cat(pets):\n    if "cat" in pets:\n        return "YES"\n    return "NO"\nprint(has_cat["dog","cat"]';
 const raw='ERROR: Traceback (most recent call last):\n  File "<exec>", line 7, in <module>\n  File "<string>", line 6\n    print(has_cat["dog","cat"]\n         ^\nSyntaxError: \'(\' was never closed';
 const ex={id:'membership-gate-w',type:'write'};
 const snap={lang:'ko',write:code,output:raw,checked:true,correct:false,xp:30,churu:9,firstCorrect:1};
 const original=JSON.stringify(snap);
 const result=f.api.beginnerError(raw,code,'ko',ex);
 assert.equal(result.type,'SyntaxError');
 assert.equal(result.line,6);
 assert.match(result.lead,/6번째 줄.*소괄호/);
 assert.match(result.tip,/함수.*\( \).*print/);
 assert.match(result.tip,/print\(has_cat\(\["dog", "cat"\]\)\)/);
 assert.equal(result.raw,raw,'original technical detail must survive');
 assert.equal(f.api.message(ex,snap,{}),result.tip);
 assert.equal(JSON.stringify(snap),original,'only presentation may change, no grading/reward/storage');
});
test('unknown Python exceptions or successful output retain original console content',()=>{
 const f=fixture();
 assert.equal(f.api.beginnerError('YES','print("YES")','ko',{id:'x'}),null);
 assert.equal(f.api.beginnerError('ERROR: internal renderer timeout','', 'ko',{id:'x'}),null);
 assert.equal(f.api.beginnerError('Hello SyntaxError: in documentation','', 'ko',{id:'x'}),null);
});
test('plain syntax, indentation and named-variable errors get locale-specific guidance',()=>{
 const f=fixture();
 const samples=[
  ['ERROR: SyntaxError: invalid syntax','ko',/문법/],
  ['ERROR: IndentationError: expected an indented block','ko',/들여쓰기/],
  ['ERROR: NameError: name \'foo\' is not defined','ko',/foo/],
  ['ERROR: TypeError: \'function\' object is not subscriptable','ko',/대괄호/],
  ['ERROR: SyntaxError: \'(\' was never closed','en',/parenthesis/]
 ];
 for(const [error,locale,expected] of samples){
  const result=f.api.beginnerError(error,'print(foo)',locale,{id:'test'});
  assert.ok(result,'parsed '+error);
  assert.match(result.lead+' '+result.tip,expected);
  assert.equal(result.raw,error);
 }
});
test('technical traceback renderer keeps code untouched and adds a collapsed details control',()=>{
 const f=fixture();
 const original='ERROR: SyntaxError: \'(\' was never closed';
 const output={textContent:original,classes:new Set(),classList:{contains(k){return output.classes.has(k)},add(k){output.classes.add(k)}},after(node){output.details=node}};
 const pieces=[];
 const root={querySelector:s=>s==='.lesson-main .console'?output:null};
 const fakeDoc={createElement(tag){const node={tag,textContent:'',className:'',children:[],append(...children){this.children.push(...children)}};pieces.push(node);return node}};
 // Temporarily redirect the fixture's standalone test helper to an isolated presentation-only DOM.
 const src=fs.readFileSync('assets/lesson-learning-polish.js','utf8');
 const con={document:{getElementById:()=>root,head:{append(){}},createElement:fakeDoc.createElement},MutationObserver:class{observe(){}},
    S:{checked:true,correct:false,lang:'ko',write:'print(',output:original},cur:()=>({type:'write',id:'other'}),window:{}};
 vm.runInNewContext(src,con);
 assert.match(output.textContent,/소괄호/);
 assert.equal(output.details.tag,'details');
 assert.equal(output.details.children[0].textContent,'상세 오류 보기');
 assert.equal(output.details.children[1].textContent,original);
 assert.equal(con.S.output,original,'raw execution text must remain in state for stored retry');
 assert.equal(con.S.checked,true);
 assert.equal(con.S.correct,false);
});

test('expanded concept styles are scoped, readable and mobile-safe',()=>{
 const f=fixture();const css=f.headStyles[0].textContent;
 assert.match(css,/\.meowde-inline-concept :is\(p,li\).*line-height:1\.7/);
 assert.match(css,/\.meowde-inline-concept :is\(pre,\.code\).*white-space:pre-wrap/);
 assert.match(css,/@media\(max-width:360px\).*\.meowde-inline-concept/);
 assert.doesNotMatch(css,/\.feedback\.no :is\(p,li\)/);
});

test('two-print prediction feedback teaches execution order without revealing the answer twice',()=>{
 const f=fixture();const ex={id:'start-field-p2',type:'predict',code:'print("첫째")\nprint("둘째")',choices:['첫째 둘째','둘째 첫째'],answer:0};
 const state={lang:'ko',sel:1,output:''};
 const msg=f.api.message(ex,state,{kind:'predict',reason:'선택: 둘째 첫째 · 실제 결과: 첫째 둘째',action:'첫째 둘째'});
 assert.match(msg,/위에서 아래로/);
 assert.match(msg,/첫 번째 print\(\)/);
 assert.doesNotMatch(msg,/실제 결과|둘째 첫째/);
 assert.match(f.api.message(ex,{...state,lang:'en'},null),/top to bottom/);
});

test('first print prediction explains quoted strings without repeating answer choices',()=>{
 const f=fixture();
 const ex={id:'start-field-p1',type:'predict',code:'print("안녕")',choices:['안녕','print','아무것도 안 보임'],answer:0};
 const state={lang:'ko',sel:1,checked:true,correct:false};
 const msg=f.api.message(ex,state,{kind:'predict',reason:'선택: print · 실제 결과: 안녕'});
 assert.match(msg,/따옴표/);
 assert.match(msg,/문자열/);
 assert.match(msg,/print\\("print"\\)/);
 assert.doesNotMatch(msg,/선택:|실제 결과:/);
 assert.match(f.api.message(ex,{...state,lang:'en'},null),/quotes/);
 const next={...ex,id:'start-field-p2',code:'print("첫째")\\nprint("둘째")'};
 assert.match(f.api.message(next,state,null),/위에서 아래로/);
});

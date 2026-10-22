/* Presentation-only lesson feedback cleanup. Keeps grade, retry, rewards and saved state unchanged. */
(function(){
'use strict';
const app=document.getElementById('app');
if(!app)return;
const css=document.createElement('style');
css.textContent=[
'.lesson-main .meowde-inline-concept{margin:6px 0 12px;padding:0 3px;border:0;background:transparent;box-shadow:none}',
'.lesson-main .meowde-inline-concept>summary{display:list-item;list-style:disclosure-closed inside;min-height:44px;line-height:44px;padding:0 8px;border-radius:9px;color:#337e69;font-size:13px;font-weight:700;cursor:pointer}',
'.lesson-main .meowde-inline-concept[open]>summary{list-style:disclosure-open inside}',
'.lesson-main .meowde-inline-concept>summary:focus-visible,.meowde-answer-review>summary:focus-visible{outline:2px solid #247b61;outline-offset:2px}',
'.lesson-main .meowde-inline-concept[open]{padding:4px 12px 16px;background:#fffaf5;border:1px solid #e9dfd7;border-radius:14px}',
'.lesson-main .meowde-inline-concept[open]>summary{margin-bottom:12px;line-height:1.5;display:list-item;padding:10px 4px}',
'.lesson-main .meowde-inline-concept :is(h1,h2,h3,h4){font-size:16px;line-height:1.45;letter-spacing:-.02em;margin:12px 0 8px;overflow-wrap:anywhere}',
'.lesson-main .meowde-inline-concept :is(p,li){font-size:14px;line-height:1.7;letter-spacing:-.01em;overflow-wrap:anywhere;word-break:keep-all;margin:0 0 10px}',
'.lesson-main .meowde-inline-concept :is(ul,ol){padding-left:22px;margin:6px 0 12px}',
'.lesson-main .meowde-inline-concept :is(pre,.code){display:block;box-sizing:border-box;max-width:100%;margin:10px 0 14px;padding:12px 14px;border-radius:10px;white-space:pre-wrap;overflow-wrap:anywhere;overflow-x:auto;font-size:12px;line-height:1.6;tab-size:2}',
'.lesson-main .meowde-inline-concept :not(pre)>code{font-size:.9em;overflow-wrap:anywhere}',
'.lesson-main .meowde-inline-concept>*:last-child{margin-bottom:0}',
'@media(max-width:360px){.lesson-main .meowde-inline-concept[open]{padding-inline:10px}.lesson-main .meowde-inline-concept :is(p,li){font-size:13px}.lesson-main .meowde-inline-concept :is(pre,.code){padding:10px 11px;font-size:11px}}',
'.feedback.no{background:#fff1f2}',
'.feedback.no .v449-feedback-character{--v449-size:52px;margin:0 0 5px 10px;float:right}',
'.feedback.no h3{font-size:16px;margin:0 0 6px}',
'.feedback.ok .v449-feedback-character{--v449-size:56px;margin:0 0 5px 10px;float:right}',
'.lesson-main .console.meowde-error-brief{background:#fff4ed;border:1px solid #efddd2;color:#4b3933;font:600 13px/1.6 system-ui,sans-serif;white-space:pre-wrap;overflow-wrap:anywhere}',
'.lesson-main .meowde-error-detail{margin:0 0 10px 0;background:transparent;border:0}',
'.lesson-main .meowde-error-detail>summary{min-height:44px;display:list-item;list-style:disclosure-closed inside;padding:12px 6px;color:#675969;font-size:12px;font-weight:650;cursor:pointer}',
'.lesson-main .meowde-error-detail>summary:focus-visible{outline:2px solid #247b61;outline-offset:2px}',
'.lesson-main .meowde-error-detail[open]>summary{list-style:disclosure-open inside}',
'.lesson-main .meowde-error-detail pre{background:#29262f;color:#f6f2fa;border-radius:12px;padding:12px;white-space:pre-wrap;overflow-wrap:anywhere;max-height:40vh;overflow:auto;font-size:11px;line-height:1.5}',
'.feedback.no .meowde-feedback-message{font-size:13px;line-height:1.55;margin:3px 0 10px;overflow-wrap:anywhere;color:#514650}',
'.feedback.no .meowde-answer-review{clear:both;margin:4px 0 12px;border:0;border-top:1px solid #ecdde0;border-radius:0;padding:0;background:transparent;box-shadow:none}',
'.feedback.no .meowde-answer-review>summary{display:list-item;list-style:disclosure-closed inside;min-height:44px;line-height:44px;padding:0 4px;color:#5e5662;font-size:13px;font-weight:650;cursor:pointer}',
'.feedback.no .meowde-answer-review[open]>summary{list-style:disclosure-open inside}',
'.feedback.no .meowde-answer-review .code{white-space:pre-wrap;overflow-wrap:anywhere;max-height:40vh;overflow:auto;margin:3px 0 10px}',
'@media(max-width:360px){.feedback.no{padding-inline:14px}.feedback.no .v449-feedback-character{--v449-size:44px}}'
].join('');
document.head.append(css);
/* Present novice-friendly error guidance without modifying score or stored Python output. */
function beginnerError(raw,code,lang,exercise){
 const value=String(raw||''),source=String(code||''),ko=lang!=='en';
 const problem=value.match(/\b(SyntaxError|IndentationError|NameError|TypeError|KeyError|IndexError|AttributeError|ValueError|ZeroDivisionError):\s*([^\r\n]*)/);
 if(!problem||!/(?:^|\n)\s*(?:ERROR:\s*)?(?:Traceback\b|(?:SyntaxError|IndentationError|NameError|TypeError|KeyError|IndexError|AttributeError|ValueError|ZeroDivisionError):)/.test(value))return null;
 const places=[...value.matchAll(/\bFile\s+["'][^"']+["'],\s*line\s+(\d+)/g)];
 const at=places.length?Number(places[places.length-1][1]):null;
 const where=at?(ko?String(at)+'번째 줄':'line '+at):(ko?'작성한 코드':'the submitted code');
 const type=problem[1],detail=problem[2];
 let lead=ko?where+'에서 Python 오류가 발생했어요.':'A Python error occurred on '+where+'.';
 let tip=ko?'표시된 줄을 확인하고 한 부분씩 수정해보세요.':'Check the indicated line and fix one part at a time.';
 if(type==='SyntaxError'){
   if(/['"]?\(['"]?\s+was never closed/.test(detail)){
     lead=ko?where+'의 소괄호 ( 가 닫히지 않았어요.':'A ( parenthesis was not closed on '+where+'.';
     if(exercise&&exercise.id==='membership-gate-w'&&/\bprint\s*\(\s*has_cat\s*\[/.test(source)){
       tip=ko?'has_cat은 함수라서 ( )로 호출해요. print도 마지막에 닫아 주세요. 예: print(has_cat(["dog", "cat"]))'
         :'has_cat is a function, so call it with ( ). Close print too: print(has_cat(["dog", "cat"]))';
     }else tip=ko?'여는 괄호 ( 와 닫는 괄호 ) 의 개수가 맞는지 확인해보세요.':'Match each opening ( with a closing ).';
   }else if(/['"]?\[['"]?\s+was never closed/.test(detail)){
     lead=ko?where+'의 대괄호 [ 가 닫히지 않았어요.':'A [ bracket was not closed on '+where+'.';
     tip=ko?'[ 로 시작한 부분을 ] 로 닫았는지 확인해보세요.':'Close each [ with a matching ].';
   }else{
     lead=ko?where+'에 Python 문법 오류가 있어요.':'There is a syntax error on '+where+'.';
     tip=ko?'괄호, 따옴표, 콜론(:)이 빠지거나 잘못 놓이지 않았는지 확인해보세요.':'Check parentheses, quotes and colons in that line.';
   }
 }else if(type==='IndentationError'){
   lead=ko?where+'의 들여쓰기를 확인해보세요.':'Check the indentation on '+where+'.';
   tip=ko?'if, for, def 다음 줄은 들여써야 해요. 위아래 줄과 공백 위치를 비교해보세요.':'Indent the block after if, for or def, and compare nearby lines.';
 }else if(type==='NameError'){
   const found=detail.match(/name\s+['"]([^'"]+)['"]\s+is not defined/);
   lead=ko?where+'에서 이름을 찾지 못했어요.':'A name was not found on '+where+'.';
   tip=found?(ko?'‘'+found[1]+'’을 사용하기 전에 같은 이름으로 정의했는지 확인해보세요.':'Check that ‘'+found[1]+'’ was defined before use.')
     :(ko?'변수나 함수를 먼저 만들었는지, 철자가 같은지 확인해보세요.':'Check that the variable or function was defined and spelled correctly.');
 }else if(type==='TypeError'){
   lead=ko?where+'에서 값이나 호출 방법이 맞지 않아요.':'A value or call is incompatible on '+where+'.';
   tip=/not subscriptable/.test(detail)
     ?(ko?'함수를 호출하려는 것이라면 대괄호 [ ] 대신 소괄호 ( )를 사용해보세요.':'If you are calling a function, use ( ) rather than [ ].')
     :(ko?'괄호 안의 인자 개수와 문자열·숫자 같은 값의 종류를 확인해보세요.':'Check the argument count and types of values.');
 }else if(type==='IndexError'||type==='KeyError'){
   lead=ko?where+'에서 없는 위치나 이름을 찾으려고 했어요.':'An unavailable index or key was used on '+where+'.';
   tip=ko?'리스트의 위치 번호 또는 딕셔너리의 키가 실제로 존재하는지 확인해보세요.':'Check that the index or dictionary key exists.';
 }else{
   lead=ko?where+'에서 '+type+' 오류가 발생했어요.':'A '+type+' error occurred on '+where+'.';
   tip=ko?'어떤 값을 사용했는지 확인한 뒤 다시 실행해보세요.':'Check the input value and try again.';
 }
 return {lead,tip,type,line:at,raw:value};
}
function simplifyErrorConsole(ex,state){
 if(!ex||ex.type!=='write'||!state||!state.checked||state.correct)return;
 const info=beginnerError(state.output,state.write,state.lang,ex);
 if(!info)return;
 const output=app.querySelector('.lesson-main .console');
 if(!output||output.classList.contains('meowde-error-brief'))return;
 output.classList.add('meowde-error-brief');
 output.textContent=info.lead;
 const details=document.createElement('details');details.className='meowde-error-detail';
 const summary=document.createElement('summary');summary.textContent=state.lang==='en'?'Technical details':'상세 오류 보기';
 const code=document.createElement('pre');code.textContent=info.raw;
 details.append(summary,code);output.after(details);
}
function message(ex,state,diagnosis){
 const ko=state&&state.lang!=='en',output=String(state&&state.output||'').trim(),code=String(state&&state.write||'');
 const error=ex&&ex.type==='write'?beginnerError(output,code,state&&state.lang,ex):null;
 if(error)return error.tip;
 // A bare call returns a value but doesn't print it. Do not tell this learner to rework correct slicing.
 if(ex&&ex.id==='string-slice-w'&&!output&&/\breturn\s+text\s*\[\s*(?:0\s*:\s*3|:\s*3)\s*\]/.test(code)&&/(?:^|\n)\s*first_three\s*\(\s*['"]python['"]\s*\)\s*;?\s*$/.test(code)&&!/\bprint\s*\(\s*first_three\s*\(/.test(code)){
   return ko?'반환값은 자동으로 출력되지 않아요. 마지막 줄을 print(first_three("python"))으로 바꿔보세요.':'Returning a value does not print it. Change the last line to print(first_three("python")).';
 }
 // Printing inside first_three can match the visible example but fails the hidden return-value check.
 if(ex&&ex.id==='string-slice-w'&&/\bdef\s+first_three\s*\(\s*text\s*\)\s*:/.test(code)&&/\bprint\s*\(\s*text\s*\[\s*(?:0\s*:\s*3|:\s*3)\s*\]\s*\)/.test(code)&&!/\breturn\s+text\s*\[\s*(?:0\s*:\s*3|:\s*3)\s*\]/.test(code)){
   return ko?'슬라이싱은 맞아요. 하지만 함수 안의 print()는 화면에 출력만 하고 값을 반환하지 않아요. 다른 문자열로 검사할 때 반환값이 없어 실패했어요. 함수 안은 return text[:3], 마지막 호출은 print(first_three("python"))으로 바꿔보세요.':'Your slicing is correct, but print() inside the function displays text without returning it. The hidden test checks the returned value for another string. Use return text[:3] inside the function and print(first_three("python")) outside.';
 }
 // Explain execution order, not the answer already revealed below.
 if(ex&&ex.type==='predict'&&state&&Number.isInteger(state.sel)&&state.sel!==ex.answer){
   const lines=String(ex.code||'').split(/\r?\n/).map(line=>line.trim()).filter(Boolean);
   if(lines.length===2&&lines.every(line=>/^print\s*\(/.test(line))){
     return ko?'Python은 코드를 위에서 아래로 한 줄씩 실행해요. 첫 번째 print()가 먼저 실행되고 두 번째 print()가 다음에 실행됩니다. 출력 순서를 고를 때는 코드의 줄 순서를 그대로 따라가 보세요.':'Python runs code one line at a time, from top to bottom. The first print() runs before the second. To predict output order, follow the order of the code lines.';
   }
 }
 if(diagnosis){
   const kind=diagnosis.kind;
   if(kind==='output'&&!output)return ko?'실행 결과가 비어 있어요. 결과를 화면에 보여주는 print()가 필요한지 확인해보세요.':'Nothing was printed. Check whether the task needs print() to show the result.';
   const first=kind==='output'||kind==='predict'||kind==='fill'||kind==='bughunt'?diagnosis.reason:diagnosis.cause;
   const fix=diagnosis.action;
   return [first,fix].filter(Boolean).join(' ').trim();
 }
 return String(ex&&ex.explain||ex&&ex.hint||'').trim();
}
function polish(){
 const concept=app.querySelector('.lesson-main details[data-inline-concept]');
 if(concept){
   concept.classList.remove('card');
   concept.classList.add('meowde-inline-concept');
   const title=concept.querySelector('summary');
   if(title)title.textContent=typeof S!=='undefined'&&S.lang==='en'?'Concept explanation':'개념 설명 보기';
 }
 const state=typeof S==='undefined'?null:S;
 const ex=typeof cur==='function'?cur():null;
 simplifyErrorConsole(ex,state);
 const footer=app.querySelector('.feedback.no');
 if(!footer)return;
 const api=window.MeowDiagnosticFeedback;
 const diagnosis=api&&typeof api.diagnose==='function'?api.diagnose(ex):null;
 const old=footer.querySelector('.v457-diagnostic');
 if(old){
   const line=document.createElement('p');
   line.className='meowde-feedback-message';
   line.textContent=message(ex,state,diagnosis);
   old.replaceWith(line);
 }
 const answer=app.querySelector('.lesson-main details[data-answer-review]');
 if(answer){
   answer.classList.remove('card');
   answer.classList.add('meowde-answer-review');
   const title=answer.querySelector('summary');
   if(title)title.textContent=state&&state.lang==='en'?(ex&&ex.type==='write'?'Show example code':'Show answer'):(ex&&ex.type==='write'?'정답 코드 보기':'정답 보기');
   // One concise explanation in the feedback area; do not repeat the generic lesson text.
   const duplicated=answer.querySelector('p');
   if(duplicated)duplicated.remove();
   const continueButton=footer.querySelector('button.btn');
   if(continueButton)continueButton.before(answer);else footer.append(answer);
 }
}
new MutationObserver(polish).observe(app,{childList:true,subtree:false});
polish();
window.MeowdeLearningPolish=Object.freeze({message,polish,beginnerError,simplifyErrorConsole});
})();
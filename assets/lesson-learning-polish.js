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
'.lesson-main .meowde-inline-concept[open]{padding:0 8px 10px;background:#fffaf5;border-radius:12px}',
'.feedback.no{background:#fff1f2}',
'.feedback.no .v449-feedback-character{--v449-size:52px;margin:0 0 5px 10px;float:right}',
'.feedback.no h3{font-size:16px;margin:0 0 6px}',
'.feedback.no .meowde-feedback-message{font-size:13px;line-height:1.55;margin:3px 0 10px;overflow-wrap:anywhere;color:#514650}',
'.feedback.no .meowde-answer-review{clear:both;margin:4px 0 12px;border:0;border-top:1px solid #ecdde0;border-radius:0;padding:0;background:transparent;box-shadow:none}',
'.feedback.no .meowde-answer-review>summary{display:list-item;list-style:disclosure-closed inside;min-height:44px;line-height:44px;padding:0 4px;color:#5e5662;font-size:13px;font-weight:650;cursor:pointer}',
'.feedback.no .meowde-answer-review[open]>summary{list-style:disclosure-open inside}',
'.feedback.no .meowde-answer-review .code{white-space:pre-wrap;overflow-wrap:anywhere;max-height:40vh;overflow:auto;margin:3px 0 10px}',
'@media(max-width:360px){.feedback.no{padding-inline:14px}.feedback.no .v449-feedback-character{--v449-size:44px}}'
].join('');
document.head.append(css);
function message(ex,state,diagnosis){
 const ko=state&&state.lang!=='en',output=String(state&&state.output||'').trim(),code=String(state&&state.write||'');
 // A bare call returns a value but doesn't print it. Do not tell this learner to rework correct slicing.
 if(ex&&ex.id==='string-slice-w'&&!output&&/\breturn\s+text\s*\[\s*(?:0\s*:\s*3|:\s*3)\s*\]/.test(code)&&/(?:^|\n)\s*first_three\s*\(\s*['"]python['"]\s*\)\s*;?\s*$/.test(code)&&!/\bprint\s*\(\s*first_three\s*\(/.test(code)){
   return ko?'반환값은 자동으로 출력되지 않아요. 마지막 줄을 print(first_three("python"))으로 바꿔보세요.':'Returning a value does not print it. Change the last line to print(first_three("python")).';
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
 const footer=app.querySelector('.feedback.no');
 if(!footer)return;
 const ex=typeof cur==='function'?cur():null;
 const state=typeof S==='undefined'?null:S;
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
window.MeowdeLearningPolish=Object.freeze({message,polish});
})();
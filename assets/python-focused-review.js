/* First-concept pilot: keep the shipped Python grader, rewards and start guard. */
(function(){
'use strict';
let storage;try{storage=localStorage;}catch(error){storage={getItem(){throw error;}};}
const history=MeowFocusedReviewStore.open(storage,'python');
const language=()=>S.lang==='en'?'en':'ko',copy=(ko,en)=>language()==='ko'?ko:en;
function source(id){return lessons()[0]?.exercises.find(ex=>ex.id===id);}
function queue(record){
 const origin={lessonId:record.lessonId,exerciseId:record.exerciseId,lang:record.lang};
 const tag=(ex,stage)=>({...ex,focusOrigin:origin,focusStage:stage,__meowdeLessonIndex:0});
 const original=source(record.exerciseId),concept=lessons()[0].exercises.find(ex=>ex.type==='concept');
 const similar={id:'focus-print-similar',type:'predict',prompt:copy('이 코드는 무엇을 출력할까요?','What does this code print?'),code:'print("Star")',choices:['Star','print','"Star"','None'],answer:0,output:'Star',hint:copy('따옴표는 문자열의 경계이며 출력에는 포함되지 않아요.','Quotes delimit the string; they are not printed.'),explain:copy('print()가 문자열 Star를 화면에 출력해요.','print() displays the string Star.')};
 const application={id:'focus-print-application',type:'write',prompt:copy('인사 카드 만들기: 첫 줄에 Hello, 둘째 줄에 MEOWDE를 출력하세요.','Make a greeting card: print Hello on the first line and MEOWDE on the second.'),starter:'# Write your greeting card\n',expected:'Hello\nMEOWDE',testcase:'Hello\nMEOWDE',model:'print("Hello")\nprint("MEOWDE")',hint:copy('print("Hello") 다음 줄에 print("MEOWDE")를 적어 보세요.','Use print("Hello"), then print("MEOWDE") on the next line.'),explain:copy('print()를 두 번 호출하면 순서대로 두 줄이 나와요.','Two calls to print() produce two lines in order.')};
 const check={id:'focus-print-check',type:'fill',prompt:copy('화면에 Ready를 출력하는 명령을 완성하세요.','Complete the command that displays Ready.'),code:'____("Ready")',tokens:['input','print','int','str'],answer:'print',hint:copy('화면으로 보내는 함수는 print예요.','print sends text to the screen.'),explain:copy('print("Ready")는 Ready를 화면에 출력해요.','print("Ready") displays Ready.')};
 return [tag(original,'missed'),tag(concept,'concept'),tag(similar,'similar'),tag(application,'application'),tag(check,'check')];
}
function start(record){if(record&&source(record.exerciseId))startLesson(0,false,queue(record),{mode:'focused-review'});}
const baseCheck=checkQ;
checkQ=async function(){
 const ex=cur(),eligible=ex&&!S.checked&&!S.loading,lang=language();
 await baseCheck.apply(this,arguments);
 if(!eligible||!S.checked||ex.type==='concept')return;
 if(ex.focusOrigin){history.attempt({...ex.focusOrigin,correct:S.correct,retry:!!ex.retry,stage:ex.focusStage,hint:!!S.hint});}
 else if(S.lessonIndex===0&&source(ex.id)){history.attempt({lessonId:'start-field',exerciseId:ex.id,lang,correct:S.correct,retry:!!ex.retry,hint:!!S.hint});}
};
const baseNext=nextQ;
nextQ=function(){const ex=cur();if(ex?.focusStage==='concept')history.viewed(ex.focusOrigin.lessonId,ex.focusOrigin.exerciseId,ex.focusOrigin.lang,'concept');return baseNext.apply(this,arguments);};
const baseFinish=finish;
finish=function(){const focused=typeof meowdeMode==='function'&&meowdeMode()==='focused-review';baseFinish.apply(this,arguments);if(focused){const reward=document.querySelector('.reward-screen');if(reward){const note=document.createElement('p');note.textContent=copy('복습을 마쳤어. 기존 기록은 그대로야.','Review complete. Your previous record is preserved.');note.className='reward-note';reward.append(note);}}};
function element(tag,text){const node=document.createElement(tag);node.textContent=text;return node;}
function mount(){
 const scroll=document.querySelector('.phase5-review .scroll');
 if(scroll&&!scroll.querySelector('[data-focused-review]')){
  const section=element('section','');section.className='card';section.dataset.focusedReview='';
  const records=history.state.records.filter(r=>r.lang===language()&&source(r.exerciseId));
  const details=element('details','');
  const summary=element('summary',copy('추가 복습 · 출력 문제','Extra review · output'));
  details.append(summary);
  const inner=element('div','');
  for(const record of records){
    const button=element('button',copy('다시 풀기 · ','Try again · ')+(source(record.exerciseId).prompt||record.exerciseId).slice(0,65));
    button.className='btn ghost';button.type='button';button.onclick=()=>start(record);inner.append(button);
    inner.append(element('p',record.stages.check?.passed?copy('복습 완료','Reviewed'):copy('다시 확인하기','Ready to retry')));
  }
  if(!records.length)inner.append(element('p',copy('복습할 출력 문제가 아직 없어.','No output questions to review yet.')));
  if(history.issue)inner.append(element('p',history.issue));
  details.append(inner);section.append(details);
  const header=scroll.querySelector('.simple-head');if(header)header.after(section);else scroll.prepend(section);
 }
 const ex=typeof cur==='function'?cur():null,feedback=document.querySelector('.feedback');
 const main=document.querySelector('.lesson-main');
 if(ex?.focusOrigin&&main&&!main.querySelector('[data-focus-stage]')){const names={missed:copy('틀린 문제 다시 풀기','Retry the missed task'),concept:copy('개념 다시 이해하기','Revisit the concept'),similar:copy('유사 문제','Similar task'),application:copy('응용 문제','Application'),check:copy('이해도 확인','Concept check')};const label=element('p',names[ex.focusStage]);label.dataset.focusStage='';label.className='meta';main.prepend(label);}
 if(history.issue&&main&&!main.querySelector('[data-focus-storage]')){const warning=element('p',copy(history.issue,'Focused review history cannot be saved. Existing records are preserved.'));warning.dataset.focusStorage='';warning.setAttribute('role','status');main.append(warning);}
 if(ex?.focusOrigin&&S.checked&&feedback&&!feedback.querySelector('[data-focus-answer]')){
  const details=element('details','');details.dataset.focusAnswer='';details.append(element('summary',copy('정답 예시와 이유','Answer example and rationale')),element('pre',ex.model||ex.fixed||ex.choices?.[ex.answer]||ex.answer||''),element('p',ex.explain||''));feedback.append(details);
 }
}
new MutationObserver(mount).observe(document.getElementById('app'),{childList:true,subtree:true});mount();
window.MeowPythonFocusedReview={history,queue,start,ready:true};
})();

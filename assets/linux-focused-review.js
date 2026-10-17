(function(){
'use strict';
const el=id=>document.getElementById(id),node=(tag,text)=>{const n=document.createElement(tag);n.textContent=text;return n;};
let storage;try{storage=localStorage;}catch(error){storage={getItem(){throw error;}};}
const history=MeowFocusedReviewStore.open(storage,'linux'),stages=MeowFocusedReviewStore.stages;
let selected=null,current=0,passed=false,hintUsed=false,attempts=0;
function tasks(record){const target=record.exerciseId==='mkdir-travel'?'travel':'training';return [
 {stage:'missed',title:'다시 풀어보기',prompt:target+' 폴더를 만들어 주세요.',target,answer:'mkdir '+target,why:'mkdir 뒤에 폴더 이름을 적으면 그 이름의 디렉터리가 생겨요.'},
 {stage:'concept',title:'왜 그럴까?',prompt:'디렉터리는 파일을 담는 폴더예요. mkdir은 새 디렉터리를 만들어요. projects/photos처럼 /로 경로를 적으면 이미 있는 projects 안에 photos를 만들 수 있어요.',example:'mkdir photos\nmkdir projects/photos'},
 {stage:'similar',title:'한 번 더 해보기',prompt:'이번에는 photos 폴더를 만들어 주세요.',target:'photos',answer:'mkdir photos',why:'명령어는 같고 만들 폴더 이름만 달라져요.'},
 {stage:'application',title:'직접 써보기',prompt:'projects 폴더는 이미 있어요. 그 안에 travel 폴더를 만들어 프로젝트 자료를 정리하세요.',target:'projects/travel',answer:'mkdir projects/travel',why:'projects/travel은 projects 폴더 안의 travel이라는 경로예요.'},
 {stage:'check',title:'마지막 확인',prompt:'이번에는 projects 폴더 안에 notes 폴더를 만들어 주세요. 먼저 힌트 없이 도전해 보세요.',target:'projects/notes',answer:'mkdir projects/notes',why:'부모 폴더 projects와 새 폴더 notes 사이에 /를 넣으면 돼요.'}
 ];}
function notice(){el('focus-storage-status').textContent=history.issue;}
function list(){
 el('focus-list').hidden=false;el('focus-player').hidden=true;const list=el('focus-list');list.replaceChildren();
 const records=history.state.records.filter(r=>r.lessonId==='mkdir-intro'&&['mkdir-training','mkdir-travel'].includes(r.exerciseId)&&r.lang==='ko');
 if(!records.length){list.append(node('p','복습할 문제가 아직 없어. 먼저 한 문제 풀어볼까?'));const link=node('a','첫 폴더 만들기 학습으로 →');link.href='/linux-start.html';list.append(link);}
 for(const record of records){const card=node('section','');card.className='focus-card';card.append(node('h2',record.exerciseId==='mkdir-travel'?'여행 폴더 만들기':'연습 폴더 만들기'),node('p',record.retrySuccesses?'이전에 헷갈렸지만 다시 성공했어.':'헷갈렸던 내용을 다시 확인해 봐.'),node('p',record.stages.check?.passed?'복습 완료':'짧은 문제로 다시 익혀봐.'));const button=node('button','복습 시작 · 이어하기');button.type='button';button.onclick=()=>{selected=record;const pending=stages.findIndex(stage=>stage==='concept'?!record.stages.concept?.viewed:!record.stages[stage]?.passed);current=pending<0?0:pending;render();};card.append(button);list.append(card);}
 notice();
}
function render(){
 const task=tasks(selected)[current],concept=task.stage==='concept';passed=false;hintUsed=false;attempts=0;
 el('focus-list').hidden=true;el('focus-player').hidden=false;el('focus-step').textContent=(current+1)+' / 5';
 el('focus-title').textContent=task.title;el('focus-concept').textContent=task.prompt;el('focus-example').hidden=!concept;el('focus-example').textContent=task.example||'';
 for(const id of ['focus-input','focus-input-label','focus-hint'])el(id).hidden=concept;
 el('focus-input').value='';el('focus-feedback').textContent='';el('focus-answer').hidden=true;el('focus-answer').open=false;
 el('focus-action').textContent=concept?'개념 확인 · 다음으로 →':'명령어 확인';el('focus-title').focus();notice();
}
el('focus-hint').onclick=()=>{hintUsed=true;const task=tasks(selected)[current];el('focus-feedback').textContent='힌트: '+task.answer;};
el('focus-input').oninput=()=>{passed=false;el('focus-action').textContent='명령어 확인';el('focus-feedback').textContent='';el('focus-answer').hidden=true;};
el('focus-input').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();el('focus-action').click();}};
el('focus-action').onclick=()=>{
 const task=tasks(selected)[current];
 if(task.stage==='concept'){history.viewed(selected.lessonId,selected.exerciseId,'ko','concept');current++;render();return;}
 if(passed){if(current===4){list();return;}current++;render();return;}
 attempts++;passed=MeowdeLinuxProgress.verify(el('focus-input').value,task.target);
 history.attempt({lessonId:selected.lessonId,exerciseId:selected.exerciseId,lang:'ko',correct:passed,retry:attempts>1,stage:task.stage,hint:hintUsed});
 el('focus-feedback').textContent=passed?'목표 폴더가 만들어졌어요.'+(hintUsed||attempts>1?' 도움·재시도 후 성공했어요.':' 이번 확인은 힌트 없이 성공했어요.'):'아직 목표 폴더가 없어요. '+task.why;
 el('focus-answer').hidden=false;el('focus-answer-code').textContent=task.answer;el('focus-rationale').textContent=task.why;
 if(passed)el('focus-action').textContent=current===4?'복습 마치기 →':'다음 단계 →';notice();
};
el('focus-exit').onclick=list;list();window.MeowLinuxFocusedReview={history};
})();

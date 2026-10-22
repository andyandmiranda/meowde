/* Minimal per-question QA draft: no network, no learner-state writes. */
(function(){
'use strict';
const label='문제 신고';
const css=document.createElement('style');
css.textContent='.meowde-qa-report{font:600 11px/1.3 system-ui;border:1px solid #d7c7d0;border-radius:10px;background:#fff;color:#6c4458;padding:7px 10px;margin:10px 0 0;cursor:pointer}.meowde-qa-dialog{border:1px solid #d7c7d0;border-radius:16px;max-width:min(90vw,420px);padding:22px;background:white;color:#29232c}.meowde-qa-dialog::backdrop{background:#0006}.meowde-qa-dialog label{display:block;margin-top:12px}.meowde-qa-dialog select,.meowde-qa-dialog textarea{width:100%;box-sizing:border-box;padding:9px;margin-top:5px}.meowde-qa-dialog button{margin:8px 6px 0 0;padding:9px;border-radius:9px}';
document.head.append(css);
function context(){
 if(typeof S==='undefined'||S.screen!=='lesson'||typeof cur!=='function'||typeof lessons!=='function')return null;
 const exercise=cur(),lesson=lessons()[S.lessonIndex];
 if(!exercise||!lesson)return null;
 return {subject:'python',lessonId:String(lesson.slug||S.lessonIndex),exerciseId:String(exercise.id||'unknown'),type:String(exercise.type||'unknown')};
}
function openDialog(info){
 const dialog=document.createElement('dialog');dialog.className='meowde-qa-dialog';
 const heading=document.createElement('h3');heading.textContent=label;
 const note=document.createElement('p');note.textContent='신고 초안을 복사할 수 있어요. 외부로 자동 전송되지 않으며 답안·학습 기록·문제 원문은 포함되지 않아요.';
 const id=document.createElement('p');id.textContent='문제 ID: '+info.lessonId+' / '+info.exerciseId;
 const categoryLabel=document.createElement('label');categoryLabel.textContent='오류 유형';
 const category=document.createElement('select');
 for(const [value,title] of [['question','문제 조건'],['grading','채점 오류'],['answer','정답·해설'],['ui','화면 오류'],['other','기타']]){const option=document.createElement('option');option.value=value;option.textContent=title;category.append(option);}
 categoryLabel.append(category);
 const memoLabel=document.createElement('label');memoLabel.textContent='간단한 설명 (선택, 개인정보 제외)';
 const memo=document.createElement('textarea');memo.rows=3;memo.maxLength=400;memoLabel.append(memo);
 const copy=document.createElement('button');copy.type='button';copy.textContent='신고 내용 복사';
 const close=document.createElement('button');close.type='button';close.textContent='닫기';
 const status=document.createElement('p');status.setAttribute('role','status');
 const draft=document.createElement('textarea');draft.readOnly=true;draft.rows=5;draft.setAttribute('aria-label','신고 초안');
 const refresh=()=>{draft.value=JSON.stringify({...info,category:category.value,note:memo.value},null,2)};
 category.onchange=refresh;memo.oninput=refresh;refresh();
 copy.onclick=async()=>{try{await navigator.clipboard.writeText(draft.value);status.textContent='복사했습니다. 접수하려면 개발팀에 직접 전달해 주세요.'}catch(_){draft.focus();draft.select();status.textContent='초안을 선택했습니다. 직접 복사해 주세요.'}};
 close.onclick=()=>dialog.close();
 dialog.addEventListener('close',()=>dialog.remove());
 dialog.append(heading,note,id,categoryLabel,memoLabel,draft,copy,close,status);
 document.body.append(dialog);dialog.showModal();
}
function mount(){
 const top=document.querySelector('.lesson-main .bubble');
 const info=context();
 // Keep the narrow mobile lesson header unchanged; place report within the question bubble.
 if(!top||!info)return;
 const existing=top.querySelector('.meowde-qa-report');
 if(existing){existing.dataset.exerciseId=info.exerciseId;return;}
 const button=document.createElement('button');button.type='button';button.className='meowde-qa-report';button.textContent=label;
 button.setAttribute('aria-label','현재 문제 신고 초안 만들기');
 button.onclick=()=>{const current=context();if(current)openDialog(current)};
 top.append(button);
}
new MutationObserver(mount).observe(document.getElementById('app'),{childList:true,subtree:false});
mount();
})();

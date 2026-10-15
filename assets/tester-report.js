/* Explicit tester mode; local preview and copy only. No network or learning-state writes. */
(function(){
'use strict';
if(new URLSearchParams(location.search).get('tester')!=='1')return;
const english=()=>typeof S!=='undefined'&&S.lang==='en';
const text=(ko,en)=>english()?en:ko;
const clip=value=>String(value||'').slice(0,6000);
function snapshot(){
 if(typeof S!=='undefined'&&S.screen==='lesson'&&typeof cur==='function'){
  const ex=cur(),context=typeof meowdeExerciseContext==='function'?meowdeExerciseContext(ex):{lesson:lessons()[S.lessonIndex]};
  return {subject:'python',language:S.lang,lessonId:context.lesson?.slug||'UNKNOWN',exerciseId:ex.id||'UNKNOWN',exerciseType:ex.type,prompt:clip(ex.prompt||ex.body),code:clip(ex.code||(ex.lines||[]).join('\n')),choices:(ex.choices||ex.tokens||[]).map(clip),visibleHint:S.hint?clip(ex.hint):'',visibleExplanation:S.checked?clip(ex.explain):''};
 }
 const title=document.getElementById('lesson-title');
 if(title&&document.getElementById('lesson-body'))return {subject:'linux',language:'ko',lessonId:'mkdir-intro',exerciseId:'mkdir-intro-step-'+document.getElementById('lesson-progress').getAttribute('aria-valuenow'),exerciseType:'guided',prompt:clip(title.textContent+'\n'+document.getElementById('lesson-body').querySelector('.explain')?.textContent)};
 if(typeof LESSONS!=='undefined'&&typeof index!=='undefined'){
  const lesson=LESSONS[index];return {subject:'linux',language:'ko',lessonId:'linux-e'+(index+1),exerciseId:'linux-e'+(index+1)+'-quiz',exerciseType:'concept-quiz',prompt:clip(lesson.challenge),code:clip(lesson.example),choices:lesson.choices.map(clip)};
 }
 return null;
}
function element(tag,content){const node=document.createElement(tag);if(content)node.textContent=content;return node;}
function open(button){
 const context=snapshot();if(!context)return;
 const dialog=element('dialog');dialog.className='tester-report-dialog';
 dialog.setAttribute('aria-labelledby','tester-report-title');
 const title=element('h2',text('문제 신고 · 로컬 초안','Report a problem · local draft'));title.id='tester-report-title';
 const note=element('p',text('외부로 전송하지 않아요. 내 답안·실행 출력·학습 기록은 자동 첨부하지 않아요.','Nothing is sent. Your answer, execution output and learning records are not attached.'));
 const label=element('label',text('오류 유형','Problem type'));label.htmlFor='tester-report-category';
 const select=element('select');select.id=label.htmlFor;
 for(const [value,ko,en] of [['question','문제·조건','Question'],['hint','힌트','Hint'],['grading','채점','Grading'],['explanation','풀이·설명','Explanation'],['other','기타','Other']]){const option=element('option',text(ko,en));option.value=value;select.append(option);}
 const memoLabel=element('label',text('메모 (선택 · 개인정보나 비밀키를 적지 마세요)','Note (optional · omit personal data and secrets)'));memoLabel.htmlFor='tester-report-note';
 const memo=element('textarea');memo.id=memoLabel.htmlFor;memo.maxLength=2000;memo.rows=3;
 const previewLabel=element('label',text('복사할 초안 미리보기','Draft preview'));previewLabel.htmlFor='tester-report-preview';
 const preview=element('textarea');preview.id=previewLabel.htmlFor;preview.readOnly=true;preview.rows=10;
 const status=element('p');status.setAttribute('role','status');
 const copy=element('button',text('초안 복사','Copy draft'));copy.type='button';
 const close=element('button',text('닫기','Close'));close.type='button';
 const createdAt=new Date().toISOString(),reportId=crypto.randomUUID();
 function update(){preview.value=JSON.stringify({schemaVersion:1,reportId,createdAt,url:location.origin+location.pathname,appVersion:window.__MEOWDE_VERSION__||'UNKNOWN',buildSHA:'UNKNOWN',...context,category:select.value,note:memo.value},null,2);status.textContent=text('미전송 · 이 화면에서만 보관되는 초안이에요.','Not sent · this draft exists only in this dialog.');}
 select.onchange=update;memo.oninput=update;update();
 copy.onclick=async()=>{try{await navigator.clipboard.writeText(preview.value);status.textContent=text('복사했어요. 외부 접수는 되지 않았어요.','Copied. This has not been submitted.');}catch(_){preview.focus();preview.select();status.textContent=text('자동 복사가 안 돼요. 선택된 초안을 직접 복사해 주세요.','Automatic copy is unavailable. Copy the selected draft manually.');}};
 close.onclick=()=>dialog.close();dialog.addEventListener('close',()=>{dialog.remove();if(button.isConnected)button.focus();});
 dialog.append(title,note,label,select,memoLabel,memo,previewLabel,preview,status,copy,close);document.body.append(dialog);dialog.showModal();
}
function mount(){
 const target=document.querySelector('.lesson-top')||document.querySelector('#lesson-title')?.parentElement||document.querySelector('#lesson');
 if(!target||target.querySelector('[data-tester-report]')||!snapshot())return;
 const button=element('button',text('문제 신고','Report problem'));button.type='button';button.className='tester-report-button';button.dataset.testerReport='';button.onclick=()=>open(button);target.append(button);
}
const style=element('style');style.textContent='.tester-report-button{font-size:12px;min-height:40px;padding:7px;border:1px solid #edbdd0;border-radius:12px;color:#85234f;background:#fff2f7}.tester-report-dialog{box-sizing:border-box;width:min(92vw,560px);max-height:88dvh;overflow:auto;border:1px solid #edbdd0;border-radius:20px;padding:20px;color:#272631;background:white}.tester-report-dialog::backdrop{background:#27263180}.tester-report-dialog h2{font-size:20px}.tester-report-dialog p{font-size:13px;line-height:1.6;margin:10px 0}.tester-report-dialog label{display:block;font-size:13px;margin-top:12px}.tester-report-dialog textarea,.tester-report-dialog select{box-sizing:border-box;display:block;width:100%;font-size:14px;padding:10px;border:1px solid #d3bdc8;border-radius:10px;margin:6px 0}.tester-report-dialog button{min-height:44px;margin:6px;padding:10px 16px;border:1px solid #edbdd0;border-radius:12px;background:#fff2f7;color:#85234f}';document.head.append(style);
const root=document.getElementById('app')||document.getElementById('lesson')||document.body;
new MutationObserver(mount).observe(root,{childList:true,subtree:true});mount();
})();

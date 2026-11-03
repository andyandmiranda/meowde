/* Explicit tester mode; local preview and copy only. No network or learning-state writes. */
(function(){
'use strict';
if(new URLSearchParams(location.search).get('tester')!=='1')return;
// Replaced at deployment build time; LOCAL is intentional for unbuilt previews.
const BUILD_INFO=/* MEOWDE_BUILD_START */{"appVersion":"4.57.0","buildSHA":"LOCAL"}/* MEOWDE_BUILD_END */;
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
  // Prefer the visibly selected lesson in the rendered navigation to avoid stale lexical state.
  const navButtons=Array.from(document.querySelectorAll('#nav button'));
  const selectedIndex=navButtons.findIndex(button=>button.getAttribute('aria-current')==='true');
  const currentIndex=selectedIndex>=0?selectedIndex:index;
  const lesson=LESSONS[currentIndex];if(!lesson)return null;
  return {subject:'linux',language:'ko',lessonId:'linux-e'+(currentIndex+1),exerciseId:'linux-e'+(currentIndex+1)+'-quiz',exerciseType:'concept-quiz',prompt:clip(lesson.challenge),code:clip(lesson.example),choices:lesson.choices.map(clip)};
 }
 return null;
}
const REPORT_KEY='meowde-tester-reports-v1';
function readReports(){
 const raw=localStorage.getItem(REPORT_KEY);if(raw===null)return [];
 const rows=JSON.parse(raw);if(!Array.isArray(rows)||rows.some(r=>!r||typeof r.reportId!=='string'||!Number.isFinite(Date.parse(r.createdAt))))throw Error('invalid reports');
 return rows.filter(r=>Date.now()-Date.parse(r.createdAt)<7*24*60*60*1000);
}
function saveReport(report){
 if(new TextEncoder().encode(JSON.stringify(report)).length>16384)throw Error('report too large');
 const rows=readReports().filter(r=>r.reportId!==report.reportId&&markerKey(r)!==markerKey(report));rows.push(report);
 if(rows.length>10)throw Error('report limit');
 localStorage.setItem(REPORT_KEY,JSON.stringify(rows));return rows.length;
}
function markerKey(context){return [context.subject,context.language,context.lessonId,context.exerciseId].map(v=>String(v||'UNKNOWN')).join(':');}
function removeReport(key){
 const rows=readReports(),next=rows.filter(r=>markerKey(r)!==key);
 if(next.length===rows.length)return rows.length;
 localStorage.setItem(REPORT_KEY,JSON.stringify(next));return next.length;
}
function quickReport(context){
 const key=markerKey(context),existing=readReports().find(r=>markerKey(r)===key);
 if(existing){removeReport(key);return {marked:false,count:readReports().length};}
 const report={schemaVersion:1,reportId:crypto.randomUUID(),markerKey:key,createdAt:new Date().toISOString(),url:location.origin+location.pathname,...BUILD_INFO,...context,category:'quick',note:''};
 return {marked:true,count:saveReport(report)};
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
 const mark=element('button',text('이 문제 표시해 두기','Save problem marker'));mark.type='button';
 const saved=element('button',text('저장된 표시 보기','View saved markers'));saved.type='button';
 const savedPreview=element('textarea');savedPreview.readOnly=true;savedPreview.rows=10;savedPreview.hidden=true;savedPreview.setAttribute('aria-label',text('저장된 문제 표시 · 선택해 복사할 수 있어요','Saved problem markers · select to copy'));
 const copy=element('button',text('초안 복사','Copy draft'));copy.type='button';
 mark.onclick=()=>{try{const count=saveReport(JSON.parse(preview.value));status.textContent=text('이 브라우저에 표시했어요 ('+count+'/10). 7일간 보관되며 외부 접수는 되지 않았어요.','Saved in this browser ('+count+'/10) for 7 days. Not submitted.');}catch(_){status.textContent=text('저장하지 못했어요. 용량·저장 권한·기존 표시를 확인하고 초안을 복사해 주세요. 기존 기록은 바꾸지 않았어요.','Could not save. Check storage or existing markers and copy the draft. Existing records were not changed.');}};
 saved.onclick=()=>{try{savedPreview.value=JSON.stringify(readReports(),null,2);savedPreview.hidden=false;savedPreview.focus();savedPreview.select();status.textContent=text('저장된 표시예요. 선택된 내용을 복사할 수 있어요. 다른 기기로 동기화되거나 자동 접수되지 않아요.','Saved markers. Copy the selected text. No device sync or automatic submission.');}catch(_){status.textContent=text('기존 표시를 읽지 못했어요. 원본은 보존했어요.','Cannot read saved markers. Original data preserved.');}};
 const close=element('button',text('닫기','Close'));close.type='button';
 let existing;try{existing=readReports().find(r=>markerKey(r)===markerKey(context));}catch(_){}
 const createdAt=existing?.createdAt||new Date().toISOString(),reportId=existing?.reportId||crypto.randomUUID(),key=markerKey(context);
 if(existing){select.value=existing.category==='quick'?'other':existing.category;memo.value=existing.note||'';}
 function update(){preview.value=JSON.stringify({schemaVersion:1,reportId,markerKey:key,createdAt,url:location.origin+location.pathname,...BUILD_INFO,...(existing?{appVersion:existing.appVersion||'UNKNOWN',buildSHA:existing.buildSHA||'UNKNOWN'}:{}),...context,category:select.value,note:memo.value},null,2);status.textContent=text('미전송 · 표시해 두면 이 브라우저에 보관돼요.','Not sent · save a marker to keep it in this browser.');}
 select.onchange=update;memo.oninput=update;update();
 copy.onclick=async()=>{try{await navigator.clipboard.writeText(preview.value);status.textContent=text('복사했어요. 외부 접수는 되지 않았어요.','Copied. This has not been submitted.');}catch(_){preview.focus();preview.select();status.textContent=text('자동 복사가 안 돼요. 선택된 초안을 직접 복사해 주세요.','Automatic copy is unavailable. Copy the selected draft manually.');}};
 close.onclick=()=>dialog.close();dialog.addEventListener('close',()=>{dialog.remove();mount();if(button.isConnected)button.focus();});
 dialog.append(title,note,label,select,memoLabel,memo,previewLabel,preview,status,mark,saved,savedPreview,copy,close);document.body.append(dialog);dialog.showModal();
}
function mount(){
 const target=document.querySelector('.lesson-top')||document.querySelector('#lesson-title')?.parentElement||document.querySelector('#lesson');
 if(!target||!snapshot())return;
 const current=target.querySelector('[data-tester-report]');if(current){current.refreshMarker();return;}
 const button=element('button',text('🚩 문제 표시','🚩 Mark problem'));button.type='button';button.className='tester-report-button';button.dataset.testerReport='';
 const detail=element('button',text('상세 신고','Add details'));detail.type='button';detail.className='tester-report-details';detail.onclick=()=>open(button);
 const status=element('span');status.className='tester-report-status';status.setAttribute('role','status');
 function refresh(){try{const marked=readReports().some(r=>markerKey(r)===markerKey(snapshot()));const label=marked?text('🚩 표시됨 · 취소','🚩 Marked · undo'):text('🚩 문제 표시','🚩 Mark problem');if(button.textContent!==label)button.textContent=label;button.setAttribute('aria-pressed',String(marked));button.dataset.marked=marked?'true':'false';}catch(_){const label=text('🚩 문제 표시','🚩 Mark problem');if(button.textContent!==label)button.textContent=label;}}
 button.onclick=()=>{try{const result=quickReport(snapshot());refresh();status.textContent=result.marked?text('이 브라우저에 표시했어요 · 미전송','Marked in this browser · not sent'):text('표시를 취소했어요.','Marker removed.');}catch(_){status.textContent=text('표시하지 못했어요. 상세 신고에서 초안을 복사해 주세요.','Could not save. Use details to copy a draft.');}};
 button.refreshMarker=refresh;refresh();target.append(button,detail,status);
}
const style=element('style');style.textContent='.tester-report-button,.tester-report-details{font-size:12px;min-height:40px;padding:7px;border:1px solid #edbdd0;border-radius:12px;color:#85234f;background:#fff2f7}.tester-report-status{font-size:12px;margin-left:6px;color:#85234f}.tester-report-dialog{box-sizing:border-box;width:min(92vw,560px);max-height:88dvh;overflow:auto;border:1px solid #edbdd0;border-radius:20px;padding:20px;color:#272631;background:white}.tester-report-dialog::backdrop{background:#27263180}.tester-report-dialog h2{font-size:20px}.tester-report-dialog p{font-size:13px;line-height:1.6;margin:10px 0}.tester-report-dialog label{display:block;font-size:13px;margin-top:12px}.tester-report-dialog textarea,.tester-report-dialog select{box-sizing:border-box;display:block;width:100%;font-size:14px;padding:10px;border:1px solid #d3bdc8;border-radius:10px;margin:6px 0}.tester-report-dialog button{min-height:44px;margin:6px;padding:10px 16px;border:1px solid #edbdd0;border-radius:12px;background:#fff2f7;color:#85234f}';document.head.append(style);
const root=document.getElementById('app')||document.getElementById('lesson')||document.body;
new MutationObserver(mount).observe(root,{childList:true,subtree:true});mount();
})();

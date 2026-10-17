/* Additive, subject-isolated future-attempt history. Never infers historic misses. */
(function(root){
'use strict';
const keys={python:'meowde-python-focused-review-v1',linux:'meowde-linux-focused-review-v1'};
const stages=['missed','concept','similar','application','check'];
const id=value=>typeof value==='string'&&/^[a-zA-Z0-9_:-]{1,100}$/.test(value);
const validRecord=r=>r&&id(r.lessonId)&&id(r.exerciseId)&&['ko','en'].includes(r.lang)&&typeof r.firstMissedAt==='string'&&Number.isFinite(Date.parse(r.firstMissedAt))&&Number.isInteger(r.attempts)&&r.attempts>=1&&Number.isInteger(r.retrySuccesses)&&r.retrySuccesses>=0&&r.stages&&typeof r.stages==='object'&&!Array.isArray(r.stages)&&Object.entries(r.stages).every(([key,value])=>stages.includes(key)&&value&&typeof value==='object'&&(key==='concept'?value.viewed===true:Number.isInteger(value.attempts)&&value.attempts>=1&&typeof value.firstCorrect==='boolean'&&typeof value.passed==='boolean'&&typeof value.assisted==='boolean'));
function open(storage,subject){
 if(!keys[subject])throw Error('Unknown subject');
 const key=keys[subject];let state={version:1,records:[]},writable=true,issue='';
 try{
  const raw=storage.getItem(key);
  if(raw!==null){const value=JSON.parse(raw);if(!value||value.version!==1||!Array.isArray(value.records)||value.records.length>100||value.records.some(r=>!validRecord(r)))throw Error('Unreadable review');state=value;}
 }catch(_){writable=false;issue='복습 기록을 읽지 못했어요. 원본은 보존했으며 이번 복습은 저장되지 않아요.';}
 const find=(lessonId,exerciseId,lang)=>state.records.find(r=>r.lessonId===lessonId&&r.exerciseId===exerciseId&&r.lang===lang);
 function save(){
  if(!writable)return false;
  try{storage.setItem(key,JSON.stringify(state));issue='';return true;}catch(_){issue='복습 기록을 저장하지 못했어요. 화면을 닫으면 이번 복습 기록이 사라질 수 있어요.';return false;}
 }
 function attempt({lessonId,exerciseId,lang='ko',correct,retry=false,stage=null,hint=false}){
  if(!id(lessonId)||!id(exerciseId)||!['ko','en'].includes(lang)||typeof correct!=='boolean'||stage&&!stages.includes(stage))return null;
  let record=find(lessonId,exerciseId,lang);
  if(!record){
   if(correct||stage)return null;
   if(state.records.length>=100){issue='복습 기록 보관 한도에 도달했어요. 기존 기록은 유지했어요.';return null;}
   record={lessonId,exerciseId,lang,firstMissedAt:new Date().toISOString(),attempts:0,retrySuccesses:0,stages:{}};state.records.push(record);
  }
  record.attempts++;record.lastAttemptAt=new Date().toISOString();record.lastCorrect=correct;
  if(correct&&retry)record.retrySuccesses++;
  if(stage){const previous=record.stages[stage]||{attempts:0,firstCorrect:correct};previous.attempts++;previous.passed=correct;previous.assisted=!!previous.assisted||hint||retry||previous.attempts>1;record.stages[stage]=previous;}
  save();return record;
 }
 function viewed(lessonId,exerciseId,lang,stage){const record=find(lessonId,exerciseId,lang);if(!record||stage!=='concept')return;record.stages.concept={viewed:true};save();}
 return {key,state,find,attempt,viewed,save,get issue(){return issue;}};
}
root.MeowFocusedReviewStore={keys,stages,open};
})(typeof window!=='undefined'?window:globalThis);

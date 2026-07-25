(function applyMeowdeV433Learning(){
  "use strict";

  const KEY="meowde-v433-learning";
  const MAX_RECENT=24;

  function read(){
    try{
      const value=JSON.parse(localStorage.getItem(KEY)||"{}");
      return value&&typeof value==="object"?value:{};
    }catch(error){
      console.warn("Meowde learning quality state was reset:",error);
      return {};
    }
  }

  const L=read();
  L.recent=Array.isArray(L.recent)?L.recent:[];
  L.attempts=L.attempts&&typeof L.attempts==="object"?L.attempts:{};
  L.retries=Number(L.retries)||0;
  L.deduped=Number(L.deduped)||0;

  function persist(){
    L.recent=L.recent.slice(-MAX_RECENT);
    try{localStorage.setItem(KEY,JSON.stringify(L))}
    catch(error){console.warn("Meowde could not save learning quality state:",error)}
  }

  function clean(value){
    return String(value||"")
      .toLowerCase()
      .replace(/\s+/g," ")
      .replace(/[‘’“”'"`]/g,"")
      .trim();
  }

  function signature(exercise){
    if(!exercise)return "";
    const body=[
      exercise.type,
      exercise.prompt,
      exercise.code,
      exercise.title,
      Array.isArray(exercise.choices)?exercise.choices.join("|"):"",
      Array.isArray(exercise.lines)?exercise.lines.join("|"):"",
      Array.isArray(exercise.tokens)?exercise.tokens.join("|"):"",
      exercise.testcase
    ].map(clean).filter(Boolean).join("::");
    let hash=2166136261;
    for(let index=0;index<body.length;index++){
      hash^=body.charCodeAt(index);
      hash=Math.imul(hash,16777619);
    }
    return `${exercise.type||"general"}:${hash>>>0}`;
  }

  function dedupeQueue(queue){
    if(!Array.isArray(queue))return queue;
    const seen=new Set();
    const unique=[];
    queue.forEach(item=>{
      const key=signature(item)||`id:${item&&item.id||unique.length}`;
      if(seen.has(key)){L.deduped++;return}
      seen.add(key);
      unique.push(item);
    });
    const recentIndex=new Map(L.recent.map((key,index)=>[key,index]));
    unique.sort((a,b)=>{
      const aIndex=recentIndex.has(signature(a))?recentIndex.get(signature(a)):-1;
      const bIndex=recentIndex.has(signature(b))?recentIndex.get(signature(b)):-1;
      if(aIndex===-1&&bIndex!==-1)return -1;
      if(aIndex!==-1&&bIndex===-1)return 1;
      return aIndex-bIndex;
    });
    persist();
    return unique;
  }

  function mistakeCount(exercise){
    if(!window.S||!Array.isArray(S.mistakes)||!exercise)return 0;
    const context=typeof window.meowdeExerciseContext==="function"?meowdeExerciseContext(exercise):{lessonIndex:S.lessonIndex};
    const item=S.mistakes.find(entry=>entry&&entry.lang===S.lang&&entry.lessonIndex===context.lessonIndex&&entry.exerciseId===exercise.id);
    return Number(item&&item.count)||0;
  }

  function difficulty(exercise){
    const mistakes=mistakeCount(exercise);
    if(mistakes>=2||exercise&&exercise.type==="write")return "hard";
    if(mistakes===1||exercise&&["bughunt","fill"].includes(exercise.type))return "medium";
    return "easy";
  }

  function difficultyLabel(level){
    if(S.lang==="en")return {easy:"Warm-up",medium:"Practice",hard:"Challenge"}[level];
    return {easy:"워밍업",medium:"연습",hard:"도전"}[level];
  }

  function hintStage(exercise){
    try{
      const mentor=window.MeowMentor&&MeowMentor.state;
      if(!mentor||!mentor.hints)return 0;
      const context=typeof window.meowdeExerciseContext==="function"?meowdeExerciseContext(exercise):{lang:S.lang,lessonIndex:S.lessonIndex};
      const key=[context.lang||S.lang,context.lessonIndex,exercise&&exercise.id||S.idx].join(":");
      return Math.max(0,Math.min(3,Number(mentor.hints[key])||0));
    }catch(error){return 0}
  }

  function decorateLesson(){
    if(!window.S)return;
    const exercise=typeof window.cur==="function"?cur():null;
    if(!exercise)return;
    const bubble=document.querySelector(".coach .bubble");
    if(bubble&&!bubble.querySelector(".v433-meta")){
      const level=difficulty(exercise);
      const mistakes=mistakeCount(exercise);
      bubble.insertAdjacentHTML("beforeend",`<div class="v433-meta"><span class="v433-chip ${level}">${difficultyLabel(level)}</span>${mistakes?`<span class="v433-chip">${S.lang==="ko"?`이 유형 오답 ${mistakes}회`:`${mistakes} prior miss${mistakes>1?"es":""}`}</span>`:""}</div>`);
    }

    const mentor=document.querySelector(".v418-mentor");
    if(mentor&&!mentor.querySelector(".v433-hint-progress")){
      const stage=hintStage(exercise);
      mentor.insertAdjacentHTML("beforeend",`<div class="v433-hint-progress" aria-label="Hint progress">${[1,2,3].map(index=>`<i class="${index<=stage?"on":""}"></i>`).join("")}</div>`);
    }

    const feedback=document.querySelector(".feedback.no");
    if(feedback&&!feedback.querySelector(".v433-retry-actions")){
      const continueButton=feedback.querySelector(".btn");
      if(continueButton)continueButton.style.display="none";
      feedback.insertAdjacentHTML("beforeend",`<div class="v433-retry-actions"><button class="primary" onclick="MeowLearning.retryCurrent()">${S.lang==="ko"?"같은 문제 다시 풀기":"Retry this question"}</button><button onclick="MeowLearning.continueAfterWrong()">${S.lang==="ko"?"설명 확인 후 다음":"Continue"}</button></div>`);
    }
  }

  function resetAnswer(exercise){
    S.checked=false;
    S.correct=false;
    S.loading=false;
    S.output="";
    S.hint=false;
    if(exercise){
      exercise.retry=true;
      if(exercise.type==="predict"||exercise.type==="bughunt")S.sel=null;
      if(exercise.type==="fill")S.fill="";
      if(exercise.type==="write")S.write=exercise.starter||S.write||"";
    }
    save();
  }

  function retryCurrent(){
    const exercise=typeof window.cur==="function"?cur():null;
    if(!exercise)return;
    L.retries++;
    resetAnswer(exercise);
    persist();
    renderLesson();
  }

  function continueAfterWrong(){
    if(typeof window.nextQ==="function")window.nextQ();
  }

  function recordAttempt(exercise){
    const key=signature(exercise);
    if(!key)return;
    L.attempts[key]=(Number(L.attempts[key])||0)+1;
    L.recent=L.recent.filter(item=>item!==key);
    L.recent.push(key);
    persist();
  }

  function reviewQualityCard(){
    const ko=S.lang==="ko";
    const duplicateCount=L.deduped;
    const recentCount=L.recent.length;
    return `<section class="card v433-review-quality"><div class="section-title"><div><div class="section-kicker">${ko?"학습 품질":"Learning quality"}</div><h3>${ko?"반복은 줄이고, 필요한 문제는 다시":"Less repetition, smarter review"}</h3></div></div><div class="v433-quality-grid"><div><b>${duplicateCount}</b><small>${ko?"제거한 중복":"duplicates removed"}</small></div><div><b>${recentCount}</b><small>${ko?"최근 문항 기억":"recent questions"}</small></div><div><b>${L.retries}</b><small>${ko?"직접 재시도":"retries"}</small></div></div><p class="v433-quality-note">${ko?"Smart Review는 내용이 같은 문항을 한 번만 포함하고, 최근에 본 문제는 가능한 뒤쪽에 배치합니다.":"Smart Review removes content duplicates and pushes recently seen questions later when possible."}</p></section>`;
  }

  const baseStartLesson=window.startLesson;
  if(typeof baseStartLesson==="function")window.startLesson=function(index,daily=false,queueOverride=null,options={}){
    const queue=Array.isArray(queueOverride)?dedupeQueue(queueOverride):queueOverride;
    return baseStartLesson.call(this,index,daily,queue,options);
  };

  const baseRenderLesson=window.renderLesson;
  if(typeof baseRenderLesson==="function")window.renderLesson=function(){
    baseRenderLesson.apply(this,arguments);
    decorateLesson();
  };

  const baseCheckQ=window.checkQ;
  if(typeof baseCheckQ==="function")window.checkQ=async function(){
    const exercise=typeof window.cur==="function"?cur():null;
    const first=exercise&&!S.checked&&!exercise.retry;
    await baseCheckQ.apply(this,arguments);
    if(first&&exercise&&exercise.type!=="concept")recordAttempt(exercise);
    decorateLesson();
  };

  const baseNextQ=window.nextQ;
  if(typeof baseNextQ==="function")window.nextQ=function(){
    const exercise=typeof window.cur==="function"?cur():null;
    if(exercise&&exercise.retry)delete exercise.retry;
    return baseNextQ.apply(this,arguments);
  };

  const baseRenderReview=window.renderReview;
  if(typeof baseRenderReview==="function")window.renderReview=function(){
    baseRenderReview.apply(this,arguments);
    const scroll=document.querySelector(".screen>.scroll");
    if(scroll&&!scroll.querySelector(".v433-review-quality"))scroll.insertAdjacentHTML("beforeend",reviewQualityCard());
  };

  window.MeowLearning={state:L,signature,dedupeQueue,difficulty,retryCurrent,continueAfterWrong,decorateLesson};
  window.__MEOWDE_VERSION__="4.33";
  persist();

  if(window.S&&S.screen==="lesson")decorateLesson();
  if(window.S&&S.screen==="review"&&typeof window.renderReview==="function")window.renderReview();
})();

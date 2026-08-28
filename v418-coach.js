(function applyMeowdeV418Mentor(){
  "use strict";

  const KEY="meowde-v418-mentor";

  function read(){
    try{
      const value=JSON.parse(localStorage.getItem(KEY)||"{}");
      return value&&typeof value==="object"?value:{};
    }catch(error){
      console.warn("Meowde mentor state could not be read:",error);
      return {};
    }
  }

  const M=read();
  M.hints=M.hints&&typeof M.hints==="object"?M.hints:{};
  M.patterns=M.patterns&&typeof M.patterns==="object"?M.patterns:{};
  M.sessions=Number(M.sessions)||0;

  function persist(){
    try{localStorage.setItem(KEY,JSON.stringify(M))}
    catch(error){console.warn("Meowde mentor state could not be saved:",error)}
  }

  function contextFor(exercise){
    if(typeof window.meowdeExerciseContext==="function")return meowdeExerciseContext(exercise);
    return {lang:S.lang,lessonIndex:S.lessonIndex,exercise:exercise||null};
  }

  function exerciseKey(exercise){
    const context=contextFor(exercise);
    return [context.lang||S.lang,context.lessonIndex,exercise&&exercise.id||S.idx].join(":");
  }

  function classify(exercise){
    if(!exercise)return "general";
    if(exercise.type==="write")return "code-writing";
    if(exercise.type==="bughunt")return "debugging";
    if(exercise.type==="fill")return "syntax";
    if(exercise.type==="predict")return "prediction";
    return "general";
  }

  function patternKey(exercise){
    const context=contextFor(exercise);
    return [context.lang||S.lang,context.lessonIndex,classify(exercise)].join(":");
  }

  function patternCount(exercise){return Math.max(0,Number(M.patterns[patternKey(exercise)])||0)}

  // Kept for storage/API compatibility. Phase 4 no longer renders the separate
  // Meow Mentor panel; the canonical lesson bubble owns the single hint surface.
  window.MeowMentor={
    reveal:function(){
      const exercise=typeof window.cur==="function"?cur():null;
      if(!exercise)return;
      const key=exerciseKey(exercise);
      M.hints[key]=Math.min(3,(Number(M.hints[key])||0)+1);
      persist();
    },
    reset:function(){
      const exercise=typeof window.cur==="function"?cur():null;
      if(!exercise)return;
      M.hints[exerciseKey(exercise)]=0;
      persist();
    },
    state:M,
    patternCount
  };

  const baseCheckQ=window.checkQ;
  if(typeof baseCheckQ==="function")window.checkQ=async function(){
    const exercise=typeof window.cur==="function"?cur():null;
    const first=Boolean(exercise&&!S.checked&&!exercise.retry);
    await baseCheckQ.apply(this,arguments);
    if(first&&exercise&&exercise.type!=="concept"){
      M.sessions++;
      if(!S.correct){
        const key=patternKey(exercise);
        M.patterns[key]=(Number(M.patterns[key])||0)+1;
      }
      persist();
    }
  };

  document.documentElement.dataset.mentorSurface="background-only";
  window.__MEOWDE_VERSION__="4.18-phase4";
  persist();
})();
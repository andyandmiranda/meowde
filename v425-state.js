(function applyMeowdeV425State(){
  "use strict";

  const STORAGE_KEY="meowde-v410-state";
  const BACKUP_KEY="meowde-v425-state-backup";
  const CORRUPT_KEY="meowde-v425-corrupt-state";
  const SCHEMA_VERSION=425;
  const MAX_DEFERRED_INDEX=999;
  const baseSave=save;

  function finiteNumber(value,fallback=0){
    const parsed=Number(value);
    return Number.isFinite(parsed)?parsed:fallback;
  }

  function integer(value,fallback=0,min=0,max=Number.MAX_SAFE_INTEGER){
    return Math.max(min,Math.min(max,Math.trunc(finiteNumber(value,fallback))));
  }

  function uniqueIntegers(value,max){
    if(!Array.isArray(value))return [];
    return [...new Set(value.map(item=>integer(item,-1,-1,max)).filter(item=>item>=0))].sort((a,b)=>a-b);
  }

  function cloneJson(value){
    if(!value||typeof value!=="object")return null;
    try{return JSON.parse(JSON.stringify(value))}catch(error){return null}
  }

  function readStoredState(){
    const raw=localStorage.getItem(STORAGE_KEY);
    if(!raw)return null;

    try{
      return JSON.parse(raw);
    }catch(error){
      localStorage.setItem(CORRUPT_KEY,raw);
      localStorage.removeItem(STORAGE_KEY);
      console.warn("Meowde v4.25 moved unreadable progress to quarantine.",error);
      return null;
    }
  }

  const bootLessonCount=Math.max(1,lessons().length);
  const bootUnitCount=Math.max(1,Math.ceil(bootLessonCount/10));
  const bootStoredState=readStoredState();
  const deferredProgress={
    done:bootStoredState?uniqueIntegers(bootStoredState.done,MAX_DEFERRED_INDEX).filter(index=>index>=bootLessonCount):[],
    next:bootStoredState&&integer(bootStoredState.next,0,0,MAX_DEFERRED_INDEX)>=bootLessonCount
      ?integer(bootStoredState.next,0,0,MAX_DEFERRED_INDEX)
      :null,
    unit:bootStoredState&&integer(bootStoredState.unit,0,0,99)>=bootUnitCount
      ?integer(bootStoredState.unit,0,0,99)
      :null,
    inProgress:bootStoredState&&bootStoredState.inProgress&&integer(bootStoredState.inProgress.lessonIndex,0,0,MAX_DEFERRED_INDEX)>=bootLessonCount
      ?cloneJson(bootStoredState.inProgress)
      :null
  };

  function hasDeferredProgress(){
    return deferredProgress.done.length>0||deferredProgress.next!==null||deferredProgress.unit!==null||Boolean(deferredProgress.inProgress);
  }

  function mergeDeferredProgressIntoStorage(){
    if(!hasDeferredProgress())return;
    const raw=localStorage.getItem(STORAGE_KEY);
    if(!raw)return;
    const state=JSON.parse(raw);
    state.done=[...new Set([
      ...uniqueIntegers(state.done,MAX_DEFERRED_INDEX),
      ...deferredProgress.done
    ])].sort((a,b)=>a-b);
    if(deferredProgress.next!==null)state.next=deferredProgress.next;
    if(deferredProgress.unit!==null)state.unit=deferredProgress.unit;
    if(deferredProgress.inProgress)state.inProgress=cloneJson(deferredProgress.inProgress);
    localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
  }

  function normalizeRuntimeState(){
    const lessonCount=Math.max(1,lessons().length);
    S.lang=DATA[S.lang]?S.lang:"ko";
    S.done=uniqueIntegers(S.done,lessonCount-1);
    S.next=integer(S.next,0,0,lessonCount-1);
    S.xp=integer(S.xp,0);
    S.churu=integer(S.churu,0);
    S.streak=integer(S.streak,1,0);
    S.milk=integer(S.milk,5,0);
    S.cat=["a","b","c","d"].includes(S.cat)?S.cat:"a";
    const unitCount=Math.max(1,Math.ceil(lessonCount/10));
    S.unit=integer(S.unit,0,0,unitCount-1);
    S.lessonIndex=integer(S.lessonIndex,0,0,lessonCount-1);
    S.queue=Array.isArray(S.queue)?S.queue:[];
    S.idx=integer(S.idx,0,0,S.queue.length?S.queue.length-1:0);
    S.mistakes=Array.isArray(S.mistakes)?S.mistakes:[];
    S.dailyHistory=S.dailyHistory&&typeof S.dailyHistory==="object"?S.dailyHistory:{};
    S.activityDates=Array.isArray(S.activityDates)?S.activityDates:[];
  }

  function enrichPersistedState(){
    const raw=localStorage.getItem(STORAGE_KEY);
    if(!raw)return;

    const state=JSON.parse(raw);
    state.schemaVersion=SCHEMA_VERSION;
    state.savedAt=new Date().toISOString();
    state.milkMode="unlimited";
    localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
    localStorage.setItem(BACKUP_KEY,JSON.stringify(state));
  }

  function safeSave(){
    normalizeRuntimeState();

    try{
      baseSave();
      mergeDeferredProgressIntoStorage();
      enrichPersistedState();
      window.__MEOWDE_SAVE_STATUS__="saved";
    }catch(error){
      window.__MEOWDE_SAVE_STATUS__="failed";
      console.warn("Meowde v4.25 could not persist progress:",error);
    }
  }

  function restoreDeferredProgress(){
    const lessonCount=Math.max(1,lessons().length);
    const unitCount=Math.max(1,Math.ceil(lessonCount/10));
    let changed=false;

    const restorableDone=deferredProgress.done.filter(index=>index<lessonCount);
    if(restorableDone.length){
      S.done=[...new Set([...uniqueIntegers(S.done,lessonCount-1),...restorableDone])].sort((a,b)=>a-b);
      deferredProgress.done=deferredProgress.done.filter(index=>index>=lessonCount);
      changed=true;
    }
    if(deferredProgress.next!==null&&deferredProgress.next<lessonCount){
      S.next=deferredProgress.next;
      deferredProgress.next=null;
      changed=true;
    }
    if(deferredProgress.unit!==null&&deferredProgress.unit<unitCount){
      S.unit=deferredProgress.unit;
      deferredProgress.unit=null;
      changed=true;
    }
    if(deferredProgress.inProgress){
      const progress=deferredProgress.inProgress;
      const lessonIndex=integer(progress.lessonIndex,-1,-1,MAX_DEFERRED_INDEX);
      if(lessonIndex>=0&&lessonIndex<lessonCount){
        S.lessonIndex=lessonIndex;
        if(Array.isArray(progress.queue))S.queue=cloneJson(progress.queue)||[];
        const directFields=["idx","combo","maxCombo","firstTotal","firstCorrect","xpEarned","daily","sel","fill","checked","correct","hint","output","write","stdinExerciseId","stdinValue"];
        directFields.forEach(key=>{if(Object.prototype.hasOwnProperty.call(progress,key))S[key]=progress[key]});
        if(Object.prototype.hasOwnProperty.call(progress,"mode"))S.v414Mode=progress.mode||"";
        if(Object.prototype.hasOwnProperty.call(progress,"dailyKey"))S.v414DailyKey=progress.dailyKey||"";
        if(Object.prototype.hasOwnProperty.call(progress,"mistakeId"))S.v414MistakeId=progress.mistakeId||"";
        deferredProgress.inProgress=null;
        changed=true;
      }
    }

    if(changed)safeSave();
    return changed;
  }

  function restoreBackup(){
    const raw=localStorage.getItem(BACKUP_KEY);
    if(!raw)return false;

    try{
      JSON.parse(raw);
      localStorage.setItem(STORAGE_KEY,raw);
      window.location.reload();
      return true;
    }catch(error){
      console.warn("Meowde v4.25 backup is unreadable:",error);
      return false;
    }
  }

  save=safeSave;
  useMilk=function(){return true};

  function preserveCurrentState(){
    if(document.visibilityState==="hidden")safeSave();
  }

  normalizeRuntimeState();
  safeSave();
  document.addEventListener("visibilitychange",preserveCurrentState);
  window.addEventListener("pagehide",safeSave);

  window.meowdeV425={
    schemaVersion:SCHEMA_VERSION,
    storageKey:STORAGE_KEY,
    backupKey:BACKUP_KEY,
    corruptKey:CORRUPT_KEY,
    save:safeSave,
    restoreBackup,
    restoreDeferredProgress,
    normalize:normalizeRuntimeState,
    diagnostics:function(){
      return {
        schemaVersion:SCHEMA_VERSION,
        saveStatus:window.__MEOWDE_SAVE_STATUS__||"unknown",
        hasProgress:hasLessonProgress(),
        lessonIndex:S.lessonIndex,
        queueLength:Array.isArray(S.queue)?S.queue.length:0,
        milkMode:"unlimited",
        deferredDone:deferredProgress.done.slice(),
        deferredNext:deferredProgress.next,
        deferredUnit:deferredProgress.unit,
        hasDeferredLesson:Boolean(deferredProgress.inProgress),
        hasBackup:Boolean(localStorage.getItem(BACKUP_KEY)),
        hasQuarantinedState:Boolean(localStorage.getItem(CORRUPT_KEY))
      };
    }
  };
})();
(function applyMeowdeV425State(){
  "use strict";

  const STORAGE_KEY="meowde-v410-state";
  const BACKUP_KEY="meowde-v425-state-backup";
  const SCHEMA_VERSION=425;
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

  function normalizeRuntimeState(){
    const lessonCount=Math.max(1,lessons().length);
    S.lang=DATA[S.lang]?S.lang:"ko";
    S.done=uniqueIntegers(S.done,lessonCount-1);
    S.next=integer(S.next,0,0,lessonCount-1);
    S.xp=integer(S.xp,0);
    S.churu=integer(S.churu,0);
    S.streak=integer(S.streak,1,0);
    S.milk=integer(S.milk,5,0);
    S.cat=["a","b","c"].includes(S.cat)?S.cat:"a";
    S.unit=integer(S.unit,0,0,2);
    S.lessonIndex=integer(S.lessonIndex,0,0,lessonCount-1);
    S.idx=integer(S.idx,0,0,Array.isArray(S.queue)&&S.queue.length?S.queue.length-1:0);
    S.queue=Array.isArray(S.queue)?S.queue:[];
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
  }

  function safeSave(){
    normalizeRuntimeState();
    try{
      baseSave();
      enrichPersistedState();
      window.__MEOWDE_SAVE_STATUS__="saved";
    }catch(error){
      window.__MEOWDE_SAVE_STATUS__="failed";
      console.warn("Meowde v4.25 could not persist progress:",error);
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
    save:safeSave,
    normalize:normalizeRuntimeState,
    diagnostics:function(){
      return {
        schemaVersion:SCHEMA_VERSION,
        saveStatus:window.__MEOWDE_SAVE_STATUS__||"unknown",
        hasProgress:hasLessonProgress(),
        lessonIndex:S.lessonIndex,
        queueLength:Array.isArray(S.queue)?S.queue.length:0,
        milkMode:"unlimited"
      };
    }
  };
})();

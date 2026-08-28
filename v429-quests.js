(function applyMeowdeV429Quests(){
  "use strict";

  const KEY="meowde-v429-quests";
  const DAILY_XP_CAP=80;
  const DAILY_CHURU_CAP=30;

  function dateKey(){
    const value=new Date();
    const y=value.getFullYear();
    const m=String(value.getMonth()+1,"0").padStart(2,"0");
    const d=String(value.getDate()).padStart(2,"0");
    return `${y}-${m}-${d}`;
  }

  function read(){
    try{
      const value=JSON.parse(localStorage.getItem(KEY)||"{}");
      return value&&typeof value==="object"?value:{};
    }catch(error){
      console.warn("Meowde legacy quest state could not be read:",error);
      return {};
    }
  }

  const Q=read();
  Q.days=Q.days&&typeof Q.days==="object"?Q.days:{};

  function snapshotFor(key=dateKey()){
    const stored=Q.days[key];
    if(!stored||typeof stored!=="object")return null;
    return {
      answers:Math.max(0,Number(stored.answers)||0),
      correct:Math.max(0,Number(stored.correct)||0),
      completions:Math.max(0,Number(stored.completions)||0),
      claimed:stored.claimed&&typeof stored.claimed==="object"?stored.claimed:{},
      bonusClaimed:Boolean(stored.bonusClaimed),
      ledger:stored.ledger&&typeof stored.ledger==="object"
        ?{xp:Math.max(0,Number(stored.ledger.xp)||0),churu:Math.max(0,Number(stored.ledger.churu)||0)}
        :{xp:0,churu:0}
    };
  }

  // Phase 2: Daily Quest is retired from the active learning loop.
  // Existing localStorage is intentionally left untouched for backup compatibility.
  // No Home card, answer/completion hook, hidden reward accrual, or claim prompt is created.
  window.MeowQuests=Object.freeze({
    active:false,
    legacy:true,
    storageKey:KEY,
    state:Q,
    today:()=>snapshotFor(dateKey()),
    snapshotFor,
    limits:Object.freeze({xp:DAILY_XP_CAP,churu:DAILY_CHURU_CAP})
  });

  document.documentElement.dataset.dailyQuestSystem="legacy";
  window.__MEOWDE_VERSION__="4.29-phase2";
})();

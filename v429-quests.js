(function applyMeowdeV429Quests(){
  "use strict";

  const KEY="meowde-v429-quests";
  const DAILY_XP_CAP=80;
  const DAILY_CHURU_CAP=30;

  function dateKey(){
    const value=new Date();
    const y=value.getFullYear();
    const m=String(value.getMonth()+1).padStart(2,"0");
    const d=String(value.getDate()).padStart(2,"0");
    return `${y}-${m}-${d}`;
  }

  function read(){
    try{
      const value=JSON.parse(localStorage.getItem(KEY)||"{}");
      return value&&typeof value==="object"?value:{};
    }catch(error){
      console.warn("Meowde quest state was reset:",error);
      return {};
    }
  }

  const Q=read();
  Q.days=Q.days&&typeof Q.days==="object"?Q.days:{};

  function today(){
    const key=dateKey();
    if(!Q.days[key])Q.days[key]={answers:0,correct:0,completions:0,claimed:{},bonusClaimed:false,ledger:{xp:0,churu:0}};
    const value=Q.days[key];
    value.answers=Math.max(0,Number(value.answers)||0);
    value.correct=Math.max(0,Number(value.correct)||0);
    value.completions=Math.max(0,Number(value.completions)||0);
    value.claimed=value.claimed&&typeof value.claimed==="object"?value.claimed:{};
    value.ledger=value.ledger&&typeof value.ledger==="object"?value.ledger:{xp:0,churu:0};
    value.ledger.xp=Math.max(0,Number(value.ledger.xp)||0);
    value.ledger.churu=Math.max(0,Number(value.ledger.churu)||0);
    value.bonusClaimed=Boolean(value.bonusClaimed);
    return value;
  }

  function persist(){
    const keys=Object.keys(Q.days).sort().slice(-45);
    Q.days=keys.reduce((result,key)=>{result[key]=Q.days[key];return result},{});
    try{localStorage.setItem(KEY,JSON.stringify(Q))}
    catch(error){console.warn("Meowde could not save daily quests:",error)}
  }

  const QUESTS=[
    {id:"answer-3",icon:"🧩",titleKo:"문제 워밍업",titleEn:"Question Warm-up",descKo:"문제 3개에 답하세요.",descEn:"Answer 3 questions.",target:3,value:day=>day.answers,reward:{xp:15,churu:4}},
    {id:"correct-2",icon:"🎯",titleKo:"정답 두 발",titleEn:"Two on Target",descKo:"문제 2개를 맞히세요.",descEn:"Answer 2 questions correctly.",target:2,value:day=>day.correct,reward:{xp:20,churu:5}},
    {id:"complete-1",icon:"📚",titleKo:"오늘의 한 걸음",titleEn:"One Step Today",descKo:"레슨 또는 오늘의 챌린지를 완료하세요.",descEn:"Complete a lesson or daily challenge.",target:1,value:day=>day.completions,reward:{xp:25,churu:6}}
  ];

  const BONUS={xp:20,churu:8};

  function grantReward(reward){
    const day=today();
    const xpRoom=Math.max(0,DAILY_XP_CAP-day.ledger.xp);
    const churuRoom=Math.max(0,DAILY_CHURU_CAP-day.ledger.churu);
    const granted={xp:Math.min(xpRoom,Math.max(0,Number(reward.xp)||0)),churu:Math.min(churuRoom,Math.max(0,Number(reward.churu)||0))};
    if(granted.xp)S.xp=(Number(S.xp)||0)+granted.xp;
    if(granted.churu)S.churu=(Number(S.churu)||0)+granted.churu;
    day.ledger.xp+=granted.xp;
    day.ledger.churu+=granted.churu;
    persist();save();
    return granted;
  }

  function complete(item,day=today()){
    return Math.min(Math.max(0,Number(item.value(day))||0),item.target)>=item.target;
  }

  function claim(id){
    const day=today();
    const item=QUESTS.find(quest=>quest.id===id);
    if(!item||day.claimed[id]||!complete(item,day))return false;
    const granted=grantReward(item.reward);
    day.claimed[id]={claimedAt:new Date().toISOString(),granted};
    persist();
    if(typeof toast==="function")toast(S.lang==="ko"?`퀘스트 보상 +${granted.xp} XP`:`Quest reward +${granted.xp} XP`);
    return true;
  }

  function allClaimed(day=today()){
    return QUESTS.every(item=>Boolean(day.claimed[item.id]));
  }

  function claimBonus(){
    const day=today();
    if(day.bonusClaimed||!allClaimed(day))return false;
    const granted=grantReward(BONUS);
    day.bonusClaimed={claimedAt:new Date().toISOString(),granted};
    persist();
    if(typeof toast==="function")toast(S.lang==="ko"?"오늘의 퀘스트 올클리어!":"Daily quests complete!");
    return true;
  }

  function recordAnswer(correct){
    const day=today();
    day.answers++;
    if(correct)day.correct++;
    persist();
  }

  function recordCompletion(){
    const day=today();
    day.completions++;
    persist();
  }

  function questMarkup(item,day){
    const ko=S.lang==="ko",value=Math.min(item.target,Math.max(0,Number(item.value(day))||0)),done=value>=item.target,claimed=Boolean(day.claimed[item.id]);
    const percent=Math.round(value/item.target*100);
    return `<div class="v429-quest ${claimed?"claimed":done?"ready":""}"><span class="v429-quest-icon">${item.icon}</span><div class="v429-quest-copy"><b>${ko?item.titleKo:item.titleEn}</b><small>${ko?item.descKo:item.descEn}</small><span class="v429-quest-progress"><i style="width:${percent}%"></i></span></div><div class="v429-quest-action"><span>${value}/${item.target} · +${item.reward.xp} XP</span><button ${claimed||!done?"disabled":""} onclick="MeowQuests.claim('${item.id}');renderHome()">${claimed?(ko?"완료":"Claimed"):(ko?"받기":"Claim")}</button></div></div>`;
  }

  function board(){
    const ko=S.lang==="ko",day=today(),remainingXp=Math.max(0,DAILY_XP_CAP-day.ledger.xp),remainingChuru=Math.max(0,DAILY_CHURU_CAP-day.ledger.churu),ready=allClaimed(day)&&!day.bonusClaimed;
    return `<section class="card v429-quest-board"><div class="v429-quest-head"><div><div class="section-kicker">${ko?"오늘의 퀘스트":"Daily quests"}</div><h3>${ko?"가볍게 3개만 완료해요":"Complete three small goals"}</h3><p>${ko?"퀘스트 보상은 매일 초기화되며 중복 지급되지 않아요.":"Quest rewards reset daily and cannot be claimed twice."}</p></div><div class="v429-economy-pill"><span>${ko?"오늘 남은 보상":"Reward room"}</span><b>${remainingXp} XP · ${remainingChuru} ${ko?"츄르":"Churu"}</b></div></div><div class="v429-quest-list">${QUESTS.map(item=>questMarkup(item,day)).join("")}</div><div class="v429-complete"><span>🎁</span><div><b>${ko?"올클리어 보너스":"All-clear bonus"}</b><p>+${BONUS.xp} XP · +${BONUS.churu} ${ko?"츄르":"Churu"}</p></div><button ${day.bonusClaimed||!ready?"disabled":""} onclick="MeowQuests.claimBonus();renderHome()">${day.bonusClaimed?(ko?"수령 완료":"Claimed"):(ko?"보너스 받기":"Claim bonus")}</button></div><div class="v429-ledger"><span>${ko?"오늘 퀘스트 지급":"Quest rewards today"}: <b>${day.ledger.xp}/${DAILY_XP_CAP} XP</b></span><span><b>${day.ledger.churu}/${DAILY_CHURU_CAP}</b> ${ko?"츄르":"Churu"}</span></div></section>`;
  }

  function decorateHome(){
    const scroll=document.querySelector(".screen>.scroll");
    if(!scroll||scroll.querySelector(".v429-quest-board"))return;
    const season=scroll.querySelector(".v428-season-card");
    if(season)season.insertAdjacentHTML("beforebegin",board());
    else scroll.insertAdjacentHTML("afterbegin",board());
  }

  const baseRenderHome=window.renderHome;
  if(typeof baseRenderHome==="function")window.renderHome=function(){baseRenderHome.apply(this,arguments);decorateHome()};

  const baseCheckQ=window.checkQ;
  if(typeof baseCheckQ==="function")window.checkQ=async function(){
    const first=window.S&&!S.checked;
    await baseCheckQ.apply(this,arguments);
    if(first&&window.S)recordAnswer(Boolean(S.correct));
  };

  const baseFinish=window.finish;
  if(typeof baseFinish==="function")window.finish=function(){
    const modeBefore=typeof meowdeMode==="function"?meowdeMode():(S.daily?"daily":"lesson");
    const lessonBefore=S.lessonIndex;
    const wasDone=Array.isArray(S.done)&&S.done.includes(lessonBefore);
    const dailyWasDone=Boolean(S.dailyHistory&&S.dailyHistory[dateKey()]);
    baseFinish.apply(this,arguments);
    const newCompletion=(modeBefore==="lesson"&&!wasDone)||(modeBefore==="daily"&&!dailyWasDone);
    if(newCompletion){
      recordCompletion();
      const reward=document.querySelector(".reward-screen");
      if(reward)reward.insertAdjacentHTML("beforeend",`<button class="v429-reward-banner" onclick="renderHome()"><span>📋</span><div><b>${S.lang==="ko"?"오늘의 퀘스트가 진행됐어요":"Daily quest progressed"}</b><p>${S.lang==="ko"?"홈에서 보상을 확인하세요.":"Check your rewards on the home screen."}</p></div></button>`);
    }
  };

  window.MeowQuests={state:Q,quests:QUESTS,today,claim,claimBonus,recordAnswer,recordCompletion,limits:{xp:DAILY_XP_CAP,churu:DAILY_CHURU_CAP}};
  window.__MEOWDE_VERSION__="4.29";
  persist();

  if(window.S&&S.screen==="home"&&typeof window.renderHome==="function")window.renderHome();
})();

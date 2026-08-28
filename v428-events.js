(function applyMeowdeV428Events(){
  "use strict";

  const KEY="meowde-v428-events";
  const date=new Date();

  function read(){
    try{
      const value=JSON.parse(localStorage.getItem(KEY)||"{}");
      return value&&typeof value==="object"?value:{};
    }catch(error){
      console.warn("Meowde event state was reset:",error);
      return {};
    }
  }

  const E=read();
  E.claimed=E.claimed&&typeof E.claimed==="object"?E.claimed:{};
  E.progress=E.progress&&typeof E.progress==="object"?E.progress:{};
  E.visitors=E.visitors&&typeof E.visitors==="object"?E.visitors:{};
  E.collectibles=Array.isArray(E.collectibles)?E.collectibles:[];

  function localDateKey(value=date){
    const y=value.getFullYear();
    const m=String(value.getMonth()+1).padStart(2,"0");
    const d=String(value.getDate()).padStart(2,"0");
    return `${y}-${m}-${d}`;
  }
  function persist(){
    try{localStorage.setItem(KEY,JSON.stringify(E))}
    catch(error){console.warn("Meowde could not save event state:",error)}
  }
  function season(){
    const month=date.getMonth()+1;
    if(month===12||month<=2)return {id:"winter",icon:"❄️",titleKo:"포근한 겨울 코딩",titleEn:"Cozy Winter Coding",accent:"winter",goal:5,reward:{xp:60,churu:20,item:"snowflake",itemKo:"눈꽃 배지",itemEn:"Snowflake Badge"}};
    if(month<=5)return {id:"spring",icon:"🌷",titleKo:"봄날의 코드 정원",titleEn:"Spring Code Garden",accent:"spring",goal:5,reward:{xp:60,churu:20,item:"tulip",itemKo:"튤립 배지",itemEn:"Tulip Badge"}};
    if(month<=8)return {id:"summer",icon:"🍉",titleKo:"여름 코딩 피크닉",titleEn:"Summer Coding Picnic",accent:"summer",goal:5,reward:{xp:60,churu:20,item:"watermelon",itemKo:"수박 배지",itemEn:"Watermelon Badge"}};
    return {id:"autumn",icon:"🍂",titleKo:"가을 코드 산책",titleEn:"Autumn Code Walk",accent:"autumn",goal:5,reward:{xp:60,churu:20,item:"maple",itemKo:"단풍 배지",itemEn:"Maple Badge"}};
  }
  function seasonKey(){return `${date.getFullYear()}-${season().id}`}
  function progress(){return Math.max(0,Number(E.progress[seasonKey()])||0)}
  function claimed(){return Boolean(E.claimed[seasonKey()])}
  function incrementSeason(amount=1){
    if(claimed())return;
    E.progress[seasonKey()]=Math.min(season().goal,progress()+Math.max(0,Number(amount)||0));
    persist();
  }
  function claimSeason(){
    const current=season();
    if(claimed()||progress()<current.goal)return false;
    E.claimed[seasonKey()]={claimedAt:new Date().toISOString(),reward:current.reward};
    if(!E.collectibles.includes(current.reward.item))E.collectibles.push(current.reward.item);
    S.xp=(Number(S.xp)||0)+current.reward.xp;
    S.churu=(Number(S.churu)||0)+current.reward.churu;
    persist();save();
    if(typeof toast==="function")toast(S.lang==="ko"?`${current.reward.itemKo} 획득!`:`${current.reward.itemEn} unlocked!`);
    return true;
  }
  function hash(text){
    let value=2166136261;
    for(let i=0;i<text.length;i++){value^=text.charCodeAt(i);value=Math.imul(value,16777619)}
    return value>>>0;
  }

  const VISITORS=[
    {id:"mori",icon:"🐈‍⬛",nameKo:"모리",nameEn:"Mori",lineKo:"쉿, 비밀 지름길을 찾았어. 오늘 한 문제만 더 풀어볼래?",lineEn:"I found a secret shortcut. Want to solve one more problem?",reward:{xp:15,churu:5}},
    {id:"biscuit",icon:"🐕",nameKo:"비스킷",nameEn:"Biscuit",lineKo:"고양이 마을까지 간식 배달 왔어요! 공부 중이면 하나 더 줄게요.",lineEn:"Snack delivery for Cat Town! Study today and I will add one more.",reward:{xp:10,churu:8}},
    {id:"orbit",icon:"🛸",nameKo:"오빗",nameEn:"Orbit",lineKo:"코딩 신호를 따라 착륙했어요. 지구의 반복문을 보여주세요.",lineEn:"I landed by following a coding signal. Show me an Earth loop.",reward:{xp:20,churu:3}},
    {id:"podo",icon:"🦝",nameKo:"포도",nameEn:"Podo",lineKo:"희귀 배지를 모으고 있어. 오늘의 출석 도장을 교환할래?",lineEn:"I collect rare badges. Shall we trade for today's check-in?",reward:{xp:12,churu:6}}
  ];
  function visitorForToday(){
    const key=localDateKey();
    const roll=hash(`meowde:${key}`)%100;
    if(roll>=38)return null;
    return VISITORS[hash(`visitor:${key}`)%VISITORS.length];
  }
  function visitorState(){
    const key=localDateKey();
    if(!E.visitors[key])E.visitors[key]={seen:false,claimed:false};
    return E.visitors[key];
  }
  function claimVisitor(){
    const visitor=visitorForToday();
    const state=visitorState();
    if(!visitor||state.claimed)return false;
    const studiedToday=Boolean(S.dailyHistory&&S.dailyHistory[localDateKey()])||Boolean(S.activityDates&&S.activityDates.includes(localDateKey()));
    if(!studiedToday){
      if(typeof toast==="function")toast(S.lang==="ko"?"오늘 학습을 완료하면 선물을 받을 수 있어요.":"Complete learning today to receive the gift.");
      return false;
    }
    state.claimed=true;
    state.claimedAt=new Date().toISOString();
    S.xp=(Number(S.xp)||0)+visitor.reward.xp;
    S.churu=(Number(S.churu)||0)+visitor.reward.churu;
    persist();save();
    if(typeof toast==="function")toast(S.lang==="ko"?`${visitor.nameKo}의 선물을 받았어요!`:`You received ${visitor.nameEn}'s gift!`);
    return true;
  }
  function seasonalCard(){
    const ko=S.lang==="ko",current=season(),value=progress(),percent=Math.round(value/current.goal*100),ready=value>=current.goal&&!claimed();
    const rewardName=ko?current.reward.itemKo:current.reward.itemEn;
    return `<section class="card v428-season-card" data-season="${current.accent}"><div class="v428-season-head"><span>${current.icon}</span><div><div class="section-kicker">${ko?"시즌 이벤트":"Seasonal event"}</div><h3>${ko?current.titleKo:current.titleEn}</h3><p>${ko?"학습 5회를 완료하면 Meowde의 한정 배지가 열려요.":"Complete 5 learning sessions to unlock a limited Meowde badge."}</p></div></div><div class="v428-event-track"><i style="width:${percent}%"></i></div><div class="v428-event-foot"><b>${value}/${current.goal}</b><span>🎁 ${rewardName} · +${current.reward.xp} XP</span></div>${ready?`<button class="btn" onclick="MeowEvents.claimSeason();renderRoom()">${ko?"시즌 보상 받기":"Claim seasonal reward"}</button>`:""}${claimed()?`<div class="v428-claimed">✓ ${ko?"이번 시즌 보상 수령 완료":"Season reward claimed"}</div>`:""}</section>`;
  }
  function visitorCard(){
    const visitor=visitorForToday();
    if(!visitor)return "";
    const ko=S.lang==="ko",state=visitorState();
    state.seen=true;persist();
    return `<section class="card v428-visitor-card"><div class="v428-visitor-avatar">${visitor.icon}</div><div class="v428-visitor-copy"><div class="section-kicker">${ko?"오늘의 방문자":"Today's visitor"}</div><h3>${ko?visitor.nameKo:visitor.nameEn}</h3><p>${ko?visitor.lineKo:visitor.lineEn}</p><small>+${visitor.reward.xp} XP · +${visitor.reward.churu} ${ko?"츄르":"Churu"}</small></div><button class="btn ${state.claimed?"ghost":""}" ${state.claimed?"disabled":`onclick="MeowEvents.claimVisitor();renderRoom()"`}>${state.claimed?(ko?"선물 받음":"Claimed"):(ko?"선물 확인":"Check gift")}</button></section>`;
  }
  function collectionCard(){
    if(!E.collectibles.length)return "";
    const ko=S.lang==="ko";
    const icons={snowflake:"❄️",tulip:"🌷",watermelon:"🍉",maple:"🍂"};
    return `<section class="card v428-collection"><div><div class="section-kicker">${ko?"한정 컬렉션":"Limited collection"}</div><h3>${ko?"시즌 기념품":"Season keepsakes"}</h3></div><div>${E.collectibles.map(id=>`<span title="${id}">${icons[id]||"🎖️"}</span>`).join("")}</div></section>`;
  }
  function decorateRoom(){
    const scroll=document.querySelector(".screen>.scroll");
    if(!scroll)return;
    scroll.querySelectorAll(".v428-season-card,.v428-visitor-card,.v428-collection").forEach(node=>node.remove());
    scroll.insertAdjacentHTML("beforeend",seasonalCard()+visitorCard()+collectionCard());
  }

  const baseRenderRoom=typeof window.renderRoom==="function"?window.renderRoom:null;
  if(baseRenderRoom)window.renderRoom=function(){baseRenderRoom.apply(this,arguments);decorateRoom()};

  const baseFinish=window.finish;
  if(typeof baseFinish==="function")window.finish=function(){
    const modeBefore=typeof meowdeMode==="function"?meowdeMode():(S.daily?"daily":"lesson");
    const lessonBefore=S.lessonIndex;
    const wasDone=Array.isArray(S.done)&&S.done.includes(lessonBefore);
    const dailyKey=localDateKey();
    const dailyDone=Boolean(S.dailyHistory&&S.dailyHistory[dailyKey]);
    baseFinish.apply(this,arguments);
    const newCompletion=(modeBefore==="lesson"&&!wasDone)||(modeBefore==="daily"&&!dailyDone);
    if(newCompletion){incrementSeason(1);persist()}
  };

  window.MeowEvents={state:E,season,progress,visitorForToday,claimSeason,claimVisitor,incrementSeason};
  document.documentElement.dataset.eventSurface="meowde";
  window.__MEOWDE_VERSION__="4.28-phase3";
  persist();

  if(window.S&&S.screen==="room"&&typeof window.renderRoom==="function")window.renderRoom();
})();
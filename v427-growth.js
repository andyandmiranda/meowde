(function applyMeowdeV427Growth(){
  "use strict";

  const KEY="meowde-v427-growth";
  const now=Date.now();

  function read(){
    try{
      const value=JSON.parse(localStorage.getItem(KEY)||"{}");
      return value&&typeof value==="object"?value:{};
    }catch(error){
      console.warn("Meowde growth state was reset:",error);
      return {};
    }
  }

  const G=read();
  G.firstSeenAt=Number(G.firstSeenAt)||now;
  G.lastSeenAt=Number(G.lastSeenAt)||now;
  G.sessionStartedAt=now;
  G.returnCount=Number(G.returnCount)||0;
  G.correctToday=Number(G.correctToday)||0;
  G.wrongToday=Number(G.wrongToday)||0;
  G.lastStudyDate=typeof G.lastStudyDate==="string"?G.lastStudyDate:"";
  G.lastEmotion=typeof G.lastEmotion==="string"?G.lastEmotion:"curious";

  const previousVisitGap=Math.max(0,now-G.lastSeenAt);
  if(previousVisitGap>1000*60*30)G.returnCount++;
  G.lastSeenAt=now;

  function todayKey(){
    const value=new Date();
    const y=value.getFullYear();
    const m=String(value.getMonth()+1).padStart(2,"0");
    const d=String(value.getDate()).padStart(2,"0");
    return `${y}-${m}-${d}`;
  }
  if(G.lastStudyDate!==todayKey()){
    G.correctToday=0;
    G.wrongToday=0;
    G.lastStudyDate=todayKey();
  }

  function persist(){
    try{localStorage.setItem(KEY,JSON.stringify(G))}
    catch(error){console.warn("Meowde could not save growth memory:",error)}
  }
  function xp(){return Math.max(0,Number(window.S&&S.xp)||0)}
  function isKorean(){return !window.S||S.lang==="ko"}

  const STAGES=[
    {id:"kitten",min:0,max:99,labelKo:"아기 냥",labelEn:"Kitten",icon:"🐱"},
    {id:"junior",min:100,max:299,labelKo:"꼬마 코더",labelEn:"Junior Coder",icon:"🐾"},
    {id:"explorer",min:300,max:699,labelKo:"코드 탐험가",labelEn:"Code Explorer",icon:"🧭"},
    {id:"mentor",min:700,max:1499,labelKo:"코딩 멘토",labelEn:"Coding Mentor",icon:"🎓"},
    {id:"legend",min:1500,max:Infinity,labelKo:"레전더리 캣",labelEn:"Legendary Cat",icon:"🌟"}
  ];

  function stage(){const value=xp();return STAGES.find(item=>value>=item.min&&value<=item.max)||STAGES[0]}
  function nextStage(){const current=stage();const index=STAGES.findIndex(item=>item.id===current.id);return STAGES[index+1]||null}
  function evolutionProgress(){
    const current=stage(),next=nextStage();
    if(!next)return {current:xp(),target:xp(),percent:100};
    const span=Math.max(1,next.min-current.min),gained=Math.max(0,xp()-current.min);
    return {current:gained,target:span,percent:Math.min(100,Math.round(gained/span*100))};
  }
  function emotion(){
    const total=G.correctToday+G.wrongToday;
    if(previousVisitGap>1000*60*60*24*3)return "lonely";
    if(previousVisitGap>1000*60*60*12)return "welcome";
    if(G.correctToday>=5&&G.correctToday>=G.wrongToday*2)return "proud";
    if(total>=3&&G.wrongToday>G.correctToday)return "supportive";
    return "curious";
  }
  function recordAnswer(correct){
    if(correct)G.correctToday++;else G.wrongToday++;
    G.lastEmotion=emotion();
    persist();
  }
  function evolutionCard(){
    const ko=isKorean(),current=stage(),next=nextStage(),progress=evolutionProgress();
    return `<section class="card v427-growth-card"><div class="v427-growth-head"><span class="v427-stage-icon">${current.icon}</span><div><div class="section-kicker">${ko?"Meowde 성장":"Meowde growth"}</div><h3>${ko?current.labelKo:current.labelEn}</h3><p>${next?(ko?`${next.labelKo}까지 ${Math.max(0,next.min-xp())} XP`:`${Math.max(0,next.min-xp())} XP to ${next.labelEn}`):(ko?"최종 성장 단계 달성":"Final evolution reached")}</p></div><span class="pill">${xp()} XP</span></div><div class="v427-growth-track"><i style="width:${progress.percent}%"></i></div><div class="v427-growth-stages">${STAGES.map(item=>`<span class="${xp()>=item.min?"reached":""}" title="${ko?item.labelKo:item.labelEn}">${item.icon}</span>`).join("")}</div></section>`;
  }
  function decorateRoom(){
    const scroll=document.querySelector(".screen>.scroll");
    if(!scroll)return;
    const existing=scroll.querySelector(".v427-growth-card");
    if(existing)existing.outerHTML=evolutionCard();
    else{
      const head=scroll.querySelector(".simple-head");
      if(head)head.insertAdjacentHTML("afterend",evolutionCard());
      else scroll.insertAdjacentHTML("afterbegin",evolutionCard());
    }
  }

  const baseRenderRoom=window.renderRoom;
  if(typeof baseRenderRoom==="function")window.renderRoom=function(){baseRenderRoom.apply(this,arguments);decorateRoom()};

  const baseCheckQ=window.checkQ;
  if(typeof baseCheckQ==="function")window.checkQ=async function(){
    const first=window.S&&!S.checked;
    await baseCheckQ.apply(this,arguments);
    if(first&&window.S)recordAnswer(Boolean(S.correct));
  };

  document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){G.lastSeenAt=Date.now();persist()}});
  window.addEventListener("pagehide",()=>{G.lastSeenAt=Date.now();persist()});

  window.MeowGrowth={state:G,stages:STAGES,stage,nextStage,emotion,evolutionProgress,recordAnswer};
  document.documentElement.dataset.growthSurface="meowde";
  document.documentElement.dataset.lessonEmotionSurface="none";
  window.__MEOWDE_GROWTH_VERSION__="4.38-phase4";
  persist();

  if(window.S&&S.screen==="room"&&typeof window.renderRoom==="function")window.renderRoom();
})();
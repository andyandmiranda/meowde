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

  function todayKey(){return new Date().toISOString().slice(0,10)}
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

  function stage(){
    const value=xp();
    return STAGES.find(item=>value>=item.min&&value<=item.max)||STAGES[0];
  }

  function nextStage(){
    const current=stage();
    const index=STAGES.findIndex(item=>item.id===current.id);
    return STAGES[index+1]||null;
  }

  function evolutionProgress(){
    const current=stage();
    const next=nextStage();
    if(!next)return {current:xp(),target:xp(),percent:100};
    const span=Math.max(1,next.min-current.min);
    const gained=Math.max(0,xp()-current.min);
    return {current:gained,target:span,percent:Math.min(100,Math.round(gained/span*100))};
  }

  function emotion(){
    const total=G.correctToday+G.wrongToday;
    if(previousVisitGap>1000*60*60*24*3)return "lonely";
    if(previousVisitGap>1000*60*60*12)return "welcome";
    if(G.correctToday>=5&&G.correctToday>=G.wrongToday*2)return "proud";
    if(total>=3&&G.wrongToday>G.correctToday)return "supportive";
    if(window.S&&S.checked&&!S.correct)return "supportive";
    if(window.S&&S.checked&&S.correct)return "proud";
    return "curious";
  }

  function emotionCopy(){
    const ko=isKorean();
    const copy={
      curious:ko?"오늘은 어떤 코드를 같이 발견할까요?":"What code shall we discover today?",
      welcome:ko?"다시 왔네요! 기다리고 있었어요.":"You are back! I was waiting for you.",
      lonely:ko?"오랜만이에요. 천천히 다시 시작해도 괜찮아요.":"It has been a while. We can restart slowly.",
      proud:ko?"오늘 정말 잘하고 있어요. 제가 다 뿌듯해요.":"You are doing great today. I am proud of you.",
      supportive:ko?"괜찮아요. 어려운 날도 같이 지나가면 돼요.":"It is okay. We will work through the hard ones together."
    };
    return copy[emotion()]||copy.curious;
  }

  function recordAnswer(correct){
    if(correct)G.correctToday++;
    else G.wrongToday++;
    G.lastEmotion=emotion();
    persist();
  }

  function evolutionCard(){
    const ko=isKorean();
    const current=stage();
    const next=nextStage();
    const progress=evolutionProgress();
    return `<section class="card v427-growth-card"><div class="v427-growth-head"><span class="v427-stage-icon">${current.icon}</span><div><div class="section-kicker">${ko?"고양이 성장":"Cat evolution"}</div><h3>${ko?current.labelKo:current.labelEn}</h3><p>${next?(ko?`${next.labelKo}까지 ${Math.max(0,next.min-xp())} XP`:`${Math.max(0,next.min-xp())} XP to ${next.labelEn}`):(ko?"최종 성장 단계 달성":"Final evolution reached")}</p></div><span class="pill">${xp()} XP</span></div><div class="v427-growth-track"><i style="width:${progress.percent}%"></i></div><div class="v427-growth-stages">${STAGES.map(item=>`<span class="${xp()>=item.min?"reached":""}" title="${ko?item.labelKo:item.labelEn}">${item.icon}</span>`).join("")}</div></section>`;
  }

  function emotionCard(){
    const ko=isKorean();
    return `<section class="card v427-emotion-card" data-emotion="${emotion()}"><div><span class="v427-emotion-dot"></span><b>${ko?"오늘의 마음":"Today's mood"}</b></div><p>${emotionCopy()}</p></section>`;
  }

  function replaceCard(scroll,selector,markup,position){
    const existing=scroll.querySelector(selector);
    if(existing){existing.outerHTML=markup;return}
    scroll.insertAdjacentHTML(position,markup);
  }

  function decorateHome(){
    const scroll=document.querySelector(".screen>.scroll");
    if(!scroll)return;
    replaceCard(scroll,".v427-emotion-card",emotionCard(),"afterbegin");
    replaceCard(scroll,".v427-growth-card",evolutionCard(),"beforeend");
  }

  function decorateRoom(){
    const scroll=document.querySelector(".screen>.scroll");
    if(!scroll)return;
    replaceCard(scroll,".v427-growth-card",evolutionCard(),"afterbegin");
  }

  function decorateLesson(){
    const bubble=document.querySelector(".coach .bubble");
    if(!bubble)return;
    let line=bubble.querySelector(".v427-emotion-line");
    if(!line){
      line=document.createElement("div");
      line.className="v427-emotion-line";
      bubble.appendChild(line);
    }
    line.textContent=emotionCopy();
    const coach=document.querySelector(".coach");
    if(coach){
      coach.dataset.emotion=emotion();
      coach.dataset.stage=stage().id;
    }
  }

  const baseRenderHome=window.renderHome;
  if(typeof baseRenderHome==="function")window.renderHome=function(){baseRenderHome.apply(this,arguments);decorateHome()};
  const baseRenderRoom=window.renderRoom;
  if(typeof baseRenderRoom==="function")window.renderRoom=function(){baseRenderRoom.apply(this,arguments);decorateRoom()};
  const baseRenderLesson=window.renderLesson;
  if(typeof baseRenderLesson==="function")window.renderLesson=function(){baseRenderLesson.apply(this,arguments);decorateLesson()};
  const baseCheckQ=window.checkQ;
  if(typeof baseCheckQ==="function")window.checkQ=async function(){
    const first=window.S&&!S.checked;
    await baseCheckQ.apply(this,arguments);
    if(first&&window.S)recordAnswer(Boolean(S.correct));
    decorateLesson();
  };

  document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){G.lastSeenAt=Date.now();persist()}});
  window.addEventListener("pagehide",()=>{G.lastSeenAt=Date.now();persist()});

  window.MeowGrowth={state:G,stages:STAGES,stage,nextStage,emotion,evolutionProgress,recordAnswer};
  window.__MEOWDE_GROWTH_VERSION__="4.38";
  persist();

  if(window.S){
    if(S.screen==="home"&&typeof window.renderHome==="function")window.renderHome();
    else if(S.screen==="room"&&typeof window.renderRoom==="function")window.renderRoom();
    else if(S.screen==="lesson"&&typeof window.renderLesson==="function")window.renderLesson();
  }
})();

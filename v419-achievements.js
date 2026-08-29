(function applyMeowdeAchievements(){
  "use strict";

  const KEY="meowde-v419-achievements";
  const VERSION="4.19-phase5-secondary";
  const BASE_ASSET="/assets/meowde-approved-base.svg?v=450";

  function read(){
    try{
      const value=JSON.parse(localStorage.getItem(KEY)||"{}");
      return value&&typeof value==="object"?value:{};
    }catch(error){
      console.warn("Meowde achievement state was reset:",error);
      return {};
    }
  }

  const A=read();
  A.unlocked=A.unlocked&&typeof A.unlocked==="object"?A.unlocked:{};
  A.currentCorrectStreak=Number(A.currentCorrectStreak)||0;
  A.bestCorrectStreak=Number(A.bestCorrectStreak)||0;
  A.totalCorrect=Number(A.totalCorrect)||0;
  A.totalAttempts=Number(A.totalAttempts)||0;
  A.noHintWins=Number(A.noHintWins)||0;
  A.featured=typeof A.featured==="string"?A.featured:"";
  A.equippedAccessory=typeof A.equippedAccessory==="string"?A.equippedAccessory:"none";

  const DEFINITIONS=[
    {id:"first-step",icon:"🐾",titleKo:"첫 발자국",titleEn:"First Step",descKo:"첫 번째 레슨을 완료하세요.",descEn:"Complete your first lesson.",xp:20,churu:5,progress:()=>[Math.min((S.done||[]).length,1),1],test:()=>Array.isArray(S.done)&&S.done.length>=1},
    {id:"daily-one",icon:"☀️",titleKo:"오늘도 출석",titleEn:"Daily Check-in",descKo:"오늘의 연습을 처음 완료하세요.",descEn:"Complete your first Daily Practice.",xp:20,churu:5,progress:()=>[Math.min(Object.keys(S.dailyHistory||{}).length,1),1],test:()=>S.dailyHistory&&Object.keys(S.dailyHistory).length>=1},
    {id:"no-hints",icon:"💡",titleKo:"스스로 해결",titleEn:"No Hints Needed",descKo:"힌트 없이 문제를 정답 처리하세요.",descEn:"Solve a problem without opening a hint.",xp:25,churu:8,progress:()=>[Math.min(A.noHintWins,1),1],test:()=>A.noHintWins>=1},
    {id:"five-correct",icon:"⭐",titleKo:"감 잡은 냥",titleEn:"Getting the Hang of It",descKo:"문제 5개를 맞히세요.",descEn:"Answer 5 questions correctly.",xp:25,churu:8,progress:()=>[Math.min(A.totalCorrect,5),5],test:()=>A.totalCorrect>=5},
    {id:"steady-paws",icon:"🔥",titleKo:"꾸준한 발걸음",titleEn:"Steady Paws",descKo:"3일 연속 학습하세요.",descEn:"Build a 3-day learning streak.",xp:30,churu:10,progress:()=>[Math.min(Number(S.streak)||0,3),3],test:()=>Number(S.streak)>=3},
    {id:"three-in-row",icon:"🕶️",titleKo:"선글라스 ON",titleEn:"Sunglasses On",descKo:"3문제를 연속으로 맞히세요.",descEn:"Answer 3 questions correctly in a row.",xp:30,churu:10,progress:()=>[Math.min(A.bestCorrectStreak,3),3],test:()=>A.bestCorrectStreak>=3},
    {id:"ten-in-row",icon:"⚡",titleKo:"정답 행진",titleEn:"Ten in a Row",descKo:"10문제를 연속으로 맞히세요.",descEn:"Answer 10 questions correctly in a row.",xp:50,churu:15,progress:()=>[Math.min(A.bestCorrectStreak,10),10],test:()=>A.bestCorrectStreak>=10},
    {id:"fifty-correct",icon:"👑",titleKo:"코딩 캣",titleEn:"Coding Cat",descKo:"문제 50개를 맞히세요.",descEn:"Answer 50 questions correctly.",xp:70,churu:20,progress:()=>[Math.min(A.totalCorrect,50),50],test:()=>A.totalCorrect>=50},
    {id:"python-basics",icon:"🐍",titleKo:"Python 기초 졸업",titleEn:"Python Basics Graduate",descKo:"첫 번째 유닛의 10개 레슨을 완료하세요.",descEn:"Complete all 10 lessons in the first unit.",xp:80,churu:25,progress:()=>{const total=Math.min(10,lessons().length);const done=Array.from({length:total},(_,i)=>S.done.includes(i)).filter(Boolean).length;return [done,total||1]},test:()=>{const total=Math.min(10,lessons().length);return total>0&&Array.from({length:total},(_,i)=>S.done.includes(i)).every(Boolean)}},
    {id:"master",icon:"🏆",titleKo:"Meowde 마스터",titleEn:"Meowde Master",descKo:"모든 레슨을 완료하세요.",descEn:"Complete every lesson.",xp:200,churu:50,progress:()=>[Math.min((S.done||[]).length,lessons().length),Math.max(lessons().length,1)],test:()=>lessons().length>0&&S.done.length>=lessons().length}
  ];

  const ACCESSORIES=[
    {id:"none",icon:"✨",titleKo:"기본 모습",titleEn:"Classic",descKo:"액세서리 없이 깔끔하게",descEn:"The clean original look",achievement:null},
    {id:"glasses",icon:"🕶️",titleKo:"캣아이 선글라스",titleEn:"Cat-eye Sunglasses",descKo:"연속 정답 3회 보상",descEn:"Reward for a 3-answer streak",achievement:"three-in-row"},
    {id:"star",icon:"⭐",titleKo:"별 머리핀",titleEn:"Star Hairpin",descKo:"정답 5개 달성 보상",descEn:"Reward for 5 correct answers",achievement:"five-correct"},
    {id:"crown",icon:"👑",titleKo:"코딩 왕관",titleEn:"Coding Crown",descKo:"정답 50개 달성 보상",descEn:"Reward for 50 correct answers",achievement:"fifty-correct"}
  ];

  function persist(){
    try{localStorage.setItem(KEY,JSON.stringify(A))}
    catch(error){console.warn("Meowde could not save achievements:",error)}
  }
  function definition(id){return DEFINITIONS.find(item=>item.id===id)}
  function accessory(id){return ACCESSORIES.find(item=>item.id===id)}
  function isUnlocked(id){return Boolean(A.unlocked[id])}
  function accessoryUnlocked(item){return !item.achievement||isUnlocked(item.achievement)}
  function title(item){return S.lang==="ko"?item.titleKo:item.titleEn}
  function description(item){return S.lang==="ko"?item.descKo:item.descEn}
  function unlockedCount(){return DEFINITIONS.filter(item=>isUnlocked(item.id)).length}
  function featured(){
    const selected=definition(A.featured);
    if(selected&&isUnlocked(selected.id))return selected;
    return DEFINITIONS.slice().reverse().find(item=>isUnlocked(item.id))||null;
  }
  function evaluate(notify){
    const newly=[];
    DEFINITIONS.forEach(item=>{
      if(!isUnlocked(item.id)&&item.test()){
        A.unlocked[item.id]={unlockedAt:new Date().toISOString(),xp:item.xp,churu:item.churu};
        S.xp=(Number(S.xp)||0)+item.xp;
        S.churu=(Number(S.churu)||0)+item.churu;
        if(!A.featured)A.featured=item.id;
        newly.push(item);
      }
    });
    if(newly.length){
      persist();save();
      if(notify&&typeof toast==="function")toast(S.lang==="ko"?`새 업적 ${newly.length}개 달성!`:`${newly.length} new achievement${newly.length>1?"s":""}!`);
    }
    return newly;
  }
  function mentorStage(ex){
    try{
      const state=window.MeowMentor&&window.MeowMentor.state;
      if(!state||!state.hints)return 0;
      const key=[S.lang,S.lessonIndex,ex&&ex.id||S.idx].join(":");
      return Number(state.hints[key])||0;
    }catch(error){return 0}
  }
  function badgeMarkup(item,size){
    const locked=!item||!isUnlocked(item.id);
    return `<span class="v419-badge ${locked?"locked":""} ${size||""}"><span>${item?item.icon:"🔒"}</span></span>`;
  }
  function achievementProgress(item){
    const values=item.progress?item.progress():[0,1];
    const current=Math.max(0,Number(values[0])||0);
    const target=Math.max(1,Number(values[1])||1);
    return {current,target,percent:Math.min(100,Math.round(current/target*100))};
  }
  function achievementCard(item){
    const unlocked=isUnlocked(item.id),selected=A.featured===item.id,ko=S.lang==="ko",progress=achievementProgress(item);
    return `<button class="v419-achievement ${unlocked?"unlocked":"locked"} ${selected?"featured":""}" ${unlocked?`onclick="MeowAchievements.feature('${item.id}')"`:"disabled"}>${badgeMarkup(item)}<span class="v419-achievement-copy"><b>${esc(title(item))}</b><small>${esc(description(item))}</small><span class="v419-mini-progress"><i style="width:${progress.percent}%"></i></span><span class="v419-reward">${unlocked?"✓ ":`${progress.current}/${progress.target} · `}+${item.xp} XP · +${item.churu} ${ko?"츄르":"Churu"}</span></span><span class="v419-state">${unlocked?(selected?(ko?"대표 배지":"Featured"):"✓"):"🔒"}</span></button>`;
  }
  function accessoryCard(item){
    const unlocked=accessoryUnlocked(item),selected=A.equippedAccessory===item.id;
    return `<button class="v426-accessory ${unlocked?"unlocked":"locked"} ${selected?"selected":""}" ${unlocked?`onclick="MeowAchievements.equip('${item.id}')"`:"disabled"}><span>${unlocked?item.icon:"🔒"}</span><b>${esc(title(item))}</b><small>${esc(description(item))}</small><em>${selected?(S.lang==="ko"?"착용 중":"Equipped"):(unlocked?(S.lang==="ko"?"착용":"Equip"):(S.lang==="ko"?"잠김":"Locked"))}</em></button>`;
  }
  function summaryCard(){
    const ko=S.lang==="ko",count=unlockedCount(),item=featured(),percent=Math.round(count/DEFINITIONS.length*100);
    return `<section class="card v419-summary"><div class="v419-summary-head">${badgeMarkup(item,"large")}<div><div class="section-kicker">${ko?"업적":"Achievements"}</div><h3>${item?esc(title(item)):(ko?"첫 업적에 도전하세요":"Earn your first badge")}</h3><p>${count}/${DEFINITIONS.length} ${ko?"달성":"unlocked"}</p></div><span class="pill">${percent}%</span></div><div class="v419-progress"><span style="width:${percent}%"></span></div><button class="text-link" onclick="renderAchievements()">${ko?"업적과 액세서리 보기":"View achievements & accessories"} →</button></section>`;
  }
  function canonicalBrand(){
    const ko=S.lang==="ko",tagline=typeof t==="function"?t("tagline"):"Learn to code playfully.";
    return `<div class="top"><div class="brand"><span class="brand-mark"><img class="v449-character v449-pose-base v448-brand-cat" src="${BASE_ASSET}" alt="" width="42" height="42" data-v449-pose="base" data-character-version="4.50" decoding="async"></span><div><h1 class="v444-brand-wordmark">Meowde</h1><p>${esc(tagline)}</p></div></div><button class="lang" onclick="langSheet()">${ko?"KO":"EN"}</button></div>`;
  }
  function canonicalTabs(){
    const ko=S.lang==="ko";
    return `<div class="tabbar" data-phase1-navigation="four-tabs"><button onclick="renderHome()" aria-label="${ko?"홈":"Home"}">${icon("home")}<span>${ko?"홈":"Home"}</span></button><button onclick="renderMap()" aria-label="${ko?"학습":"Learn"}">${icon("map")}<span>${ko?"학습":"Learn"}</span></button><button onclick="renderReview()" aria-label="${ko?"복습":"Review"}">${icon("code")}<span>${ko?"복습":"Review"}</span></button><button class="on" onclick="renderRoom()" aria-label="Meowde">${icon("cat")}<span>Meowde</span></button></div>`;
  }

  window.renderAchievements=function(){
    evaluate(false);
    S.screen="achievements";save();
    const ko=S.lang==="ko",count=unlockedCount();
    app.innerHTML=`<div class="screen">${canonicalBrand()}<div class="scroll"><div class="simple-head"><h2>${ko?"업적과 액세서리":"Achievements & accessories"}</h2><p>${ko?"학습으로 얻은 배지와 Meowde 꾸미기 아이템을 확인하세요.":"See badges and Meowde accessories earned through learning."}</p></div><section class="card v419-overview"><div><b>${count}</b><span> / ${DEFINITIONS.length}</span><p>${ko?"달성한 업적":"Achievements unlocked"}</p></div><div><b>${A.bestCorrectStreak}</b><p>${ko?"최고 연속 정답":"Best answer streak"}</p></div><div><b>${A.totalCorrect}</b><p>${ko?"누적 정답":"Total correct"}</p></div></section><div class="v426-section-title"><h3>${ko?"액세서리":"Accessories"}</h3></div><div class="v426-accessory-grid">${ACCESSORIES.map(accessoryCard).join("")}</div><div class="v426-section-title"><h3>${ko?"배지 컬렉션":"Badge collection"}</h3></div><div class="v419-list">${DEFINITIONS.map(achievementCard).join("")}</div></div>${canonicalTabs()}</div>`;
    document.documentElement.dataset.achievementsRenderer="canonical-v419";
    document.documentElement.dataset.navigation="phase1-four-tabs";
  };
  window.__MEOWDE_CANONICAL_ACHIEVEMENTS_RENDERER__=window.renderAchievements;

  window.MeowAchievements={
    state:A,definitions:DEFINITIONS,accessories:ACCESSORIES,summaryCard,
    feature:function(id){
      if(!isUnlocked(id))return;
      A.featured=id;persist();
      if(typeof toast==="function")toast(S.lang==="ko"?"대표 배지를 변경했어요.":"Featured badge updated.");
      renderAchievements();
    },
    equip:function(id){
      const item=accessory(id);
      if(!item||!accessoryUnlocked(item))return;
      A.equippedAccessory=id;persist();
      if(typeof toast==="function")toast(S.lang==="ko"?`${title(item)} 착용 완료!`:`${title(item)} equipped!`);
      if(S.screen==="achievements")renderAchievements();
      else if(S.screen==="room")renderRoom();
    },
    evaluate
  };

  const baseCheckQ=checkQ;
  checkQ=async function(){
    const ex=typeof cur==="function"?cur():null,first=!S.checked;
    const noHint=first&&ex&&ex.type!=="concept"&&!S.hint&&mentorStage(ex)===0;
    await baseCheckQ();
    if(first&&ex&&ex.type!=="concept"){
      A.totalAttempts++;
      if(S.correct){
        A.totalCorrect++;
        A.currentCorrectStreak++;
        A.bestCorrectStreak=Math.max(A.bestCorrectStreak,A.currentCorrectStreak);
        if(noHint)A.noHintWins++;
      }else A.currentCorrectStreak=0;
      persist();evaluate(true);
    }
  };
  const baseFinish=finish;
  finish=function(){
    const before=unlockedCount();
    baseFinish();
    const newly=evaluate(true);
    if(newly.length&&unlockedCount()>before){
      const reward=document.querySelector(".reward-screen");
      if(reward)reward.insertAdjacentHTML("beforeend",`<button class="v419-unlock-banner" onclick="renderAchievements()"><span>${newly[newly.length-1].icon}</span><div><b>${S.lang==="ko"?"새 업적 달성!":"Achievement unlocked!"}</b><p>${esc(title(newly[newly.length-1]))}</p></div><strong>→</strong></button>`);
    }
  };

  evaluate(false);
  document.documentElement.dataset.achievementSurface="meowde";
  window.__MEOWDE_ACHIEVEMENTS_VERSION__=VERSION;
  if(S.screen==="achievements")renderAchievements();
})();
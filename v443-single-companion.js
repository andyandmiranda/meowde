(function applyMeowdeV443SingleCompanion(){
  "use strict";

  const VERSION="4.43-coach-modes-nav-stable";
  const MODE_STORAGE_KEY="meowde-v443-coach-mode";
  const COACH_MODES=Object.freeze([
    Object.freeze({id:"focus",asset:"coding",labelKo:"집중 모드",labelEn:"Focus mode",copyKo:"코딩에 몰입하는 Meowde",copyEn:"Meowde focused on coding"}),
    Object.freeze({id:"dance",asset:"music",labelKo:"댄싱 모드",labelEn:"Dancing mode",copyKo:"음악과 함께 신나게 공부해요",copyEn:"Study with music and energy"}),
    Object.freeze({id:"study",asset:"reading",labelKo:"공부 모드",labelEn:"Study mode",copyKo:"차분하게 힌트와 개념을 읽어요",copyEn:"Read hints and concepts calmly"}),
    Object.freeze({id:"cheer",asset:"happy",labelKo:"응원 모드",labelEn:"Cheer mode",copyKo:"잘하고 있다고 힘껏 응원해요",copyEn:"A cheerful boost while you learn"}),
    Object.freeze({id:"challenge",asset:"challenge",labelKo:"도전 모드",labelEn:"Challenge mode",copyKo:"혼자 풀어보는 도전에 집중해요",copyEn:"Ready for a solo coding challenge"}),
    Object.freeze({id:"debug",asset:"debug",labelKo:"디버그 모드",labelEn:"Debug mode",copyKo:"오류의 원인을 함께 찾아봐요",copyEn:"Track down the cause of an error"})
  ]);
  let decorationQueued=false;

  function runtimeState(){try{return typeof S!=="undefined"&&S&&typeof S==="object"?S:null}catch(error){return null}}
  function isKorean(){const current=runtimeState();return !current||current.lang!=="en"}
  function coachModeById(id){return COACH_MODES.find(mode=>mode.id===id)||null}
  function currentCoachMode(){
    try{return coachModeById(localStorage.getItem(MODE_STORAGE_KEY))||COACH_MODES[0]}
    catch(error){return COACH_MODES[0]}
  }
  function coachModeImageMarkup(mode=currentCoachMode(),extraClass="",label=""){
    const selected=typeof mode==="string"?coachModeById(mode):mode;
    const safe=selected||COACH_MODES[0];
    const alt=label||(isKorean()?safe.labelKo:safe.labelEn);
    return `<img class="v443-coach-mode-image ${extraClass}" src="/assets/characters/v451/meowde-${safe.asset}.webp" alt="${esc(alt)}" data-coach-mode="${safe.id}" data-coach-asset="${safe.asset}" decoding="async">`;
  }
  function selectCoachMode(id){
    const mode=coachModeById(id);if(!mode)return false;
    try{localStorage.setItem(MODE_STORAGE_KEY,mode.id)}catch(error){console.warn("Meowde coach mode could not be saved:",error)}
    document.documentElement.dataset.coachMode=mode.id;
    const current=runtimeState();
    if(current&&["room","my"].includes(current.screen))renderCompanionHub();
    return true;
  }
  function coachModeGrid(){
    const selected=currentCoachMode(),ko=isKorean();
    return `<div class="room-grid v443-single-companion v443-mode-grid" role="group" aria-label="${ko?'Meowde 코치 모드 선택':'Choose Meowde coach mode'}">${COACH_MODES.map(mode=>{const active=mode.id===selected.id;return `<button type="button" class="v443-mode-card ${active?'selected':''}" aria-pressed="${active?'true':'false'}" onclick="MeowCoachMode.select('${mode.id}')">${coachModeImageMarkup(mode,"v443-mode-thumb")}<span class="v443-mode-copy"><b>${esc(ko?mode.labelKo:mode.labelEn)}</b><small>${esc(ko?mode.copyKo:mode.copyEn)}</small></span><span class="v443-mode-status">${active?(ko?'선택됨':'Selected'):''}</span></button>`}).join("")}</div>`;
  }
  function forceSingleCompanion(){
    const current=runtimeState();
    if(!current||current.cat==="meowde")return false;
    current.cat="meowde";
    try{if(typeof window.save==="function")window.save()}catch(error){console.warn("Meowde companion state could not be saved:",error)}
    return true;
  }
  function tabMarkup(){
    const current=runtimeState();
    if(!current)return "";
    const screen=current.screen||"home";
    const ko=isKorean();
    const learnActive=screen==="map";
    const reviewActive=screen==="review";
    const meowdeActive=["room","my","achievements","profile"].includes(screen);
    return [
      `<button class="${screen==='home'?'on':''}" onclick="renderHome()" aria-label="${ko?'홈':'Home'}">${icon('home')}<span>${ko?'홈':'Home'}</span></button>`,
      `<button class="${learnActive?'on':''}" onclick="renderMap()" aria-label="${ko?'학습':'Learn'}">${icon('map')}<span>${ko?'학습':'Learn'}</span></button>`,
      `<button class="${reviewActive?'on':''}" onclick="renderReview()" aria-label="${ko?'복습':'Review'}">${icon('code')}<span>${ko?'복습':'Review'}</span></button>`,
      `<button class="${meowdeActive?'on':''}" onclick="renderRoom()" aria-label="Meowde">${icon('cat')}<span>Meowde</span></button>`
    ].join("");
  }
  function canonicalTabs(){return `<div class="tabbar" data-phase1-navigation="four-tabs">${tabMarkup()}</div>`}
  function normalizeNavigation(root=document){
    if(!root||typeof root.querySelectorAll!=="function")return;
    root.querySelectorAll(".tabbar").forEach(bar=>{
      const expected=tabMarkup();
      if(expected&&bar.innerHTML!==expected)bar.innerHTML=expected;
      bar.dataset.phase1Navigation="four-tabs";
    });
  }
  function progressPercent(){
    const current=runtimeState();
    const total=typeof window.lessons==="function"?lessons().length:0;
    return current?Math.min(100,Math.round(((current.done||[]).length/Math.max(1,total))*100)):0;
  }
  function achievementSummary(){
    const api=window.MeowAchievements;
    if(!api||!Array.isArray(api.definitions))return "";
    if(typeof api.evaluate==="function")api.evaluate(false);
    const definitions=api.definitions,state=api.state||{},unlocked=state.unlocked||{};
    const count=definitions.filter(item=>Boolean(unlocked[item.id])).length;
    const selected=definitions.find(item=>item.id===state.featured&&unlocked[item.id])||definitions.slice().reverse().find(item=>unlocked[item.id])||null;
    const ko=isKorean(),percent=Math.round(count/Math.max(1,definitions.length)*100);
    const title=selected?(ko?selected.titleKo:selected.titleEn):(ko?"첫 업적에 도전하세요":"Earn your first badge");
    const badge=`<span class="v419-badge ${selected?"":"locked"} large"><span>${selected?selected.icon:"🔒"}</span></span>`;
    return `<section class="card v419-summary"><div class="v419-summary-head">${badge}<div><div class="section-kicker">${ko?"업적":"Achievements"}</div><h3>${esc(title)}</h3><p>${count}/${definitions.length} ${ko?"달성":"unlocked"}</p></div><span class="pill">${percent}%</span></div><div class="v419-progress"><span style="width:${percent}%"></span></div><button class="text-link" onclick="renderAchievements()">${ko?"업적과 액세서리 보기":"View achievements & accessories"} →</button></section>`;
  }
  function growthCard(){
    const api=window.MeowGrowth;
    if(!api||typeof api.stage!=="function"||typeof api.evolutionProgress!=="function")return "";
    const currentState=runtimeState();if(!currentState)return "";
    const ko=isKorean(),current=api.stage(),next=typeof api.nextStage==="function"?api.nextStage():null,progress=api.evolutionProgress(),xp=Math.max(0,Number(currentState.xp)||0),stages=Array.isArray(api.stages)?api.stages:[];
    return `<section class="card v427-growth-card"><div class="v427-growth-head"><span class="v427-stage-icon">${current&&current.icon||"🐱"}</span><div><div class="section-kicker">${ko?"Meowde 성장":"Meowde growth"}</div><h3>${esc(current?(ko?current.labelKo:current.labelEn):(ko?"아기 냥":"Kitten"))}</h3><p>${next?(ko?`${next.labelKo}까지 ${Math.max(0,next.min-xp)} XP`:`${Math.max(0,next.min-xp)} XP to ${next.labelEn}`):(ko?"최종 성장 단계 달성":"Final evolution reached")}</p></div><span class="pill">${xp} XP</span></div><div class="v427-growth-track"><i style="width:${progress.percent}%"></i></div><div class="v427-growth-stages">${stages.map(item=>`<span class="${xp>=item.min?"reached":""}" title="${esc(ko?item.labelKo:item.labelEn)}">${item.icon}</span>`).join("")}</div></section>`;
  }
  function milestoneCard(){
    const api=window.MeowJourney;
    if(!api||typeof api.pendingRewardUnit!=="function")return "";
    const state=api.pendingRewardUnit();if(!state)return "";
    const ko=isKorean(),reward=50,name=typeof api.unitName==="function"?api.unitName(state.unit):(ko?`유닛 ${state.unit+1}`:`Unit ${state.unit+1}`);
    return `<section class="card v416-milestone-card"><div><div class="section-kicker">${ko?"학습 마일스톤":"Learning milestone"}</div><h3>${esc(name)} ✓</h3><p>${ko?"유닛을 모두 완료했어요. Meowde와 함께 보상을 받아요.":"Unit complete. Collect the milestone reward with Meowde."}</p></div><button class="btn butter" onclick="claimUnitChest(${state.unit})">🎁 +${reward} ${ko?"츄르":"Churu"}</button></section>`;
  }
  function localDateKey(value=new Date()){const y=value.getFullYear(),m=String(value.getMonth()+1).padStart(2,"0"),d=String(value.getDate()).padStart(2,"0");return `${y}-${m}-${d}`}
  function persistEventState(api){try{localStorage.setItem("meowde-v428-events",JSON.stringify(api.state||{}))}catch(error){console.warn("Meowde event view state could not be saved:",error)}}
  function eventCards(){
    const api=window.MeowEvents;
    if(!api||typeof api.season!=="function"||typeof api.progress!=="function")return "";
    const ko=isKorean(),current=api.season(),value=api.progress(),key=`${new Date().getFullYear()}-${current.id}`,claimed=Boolean(api.state&&api.state.claimed&&api.state.claimed[key]),percent=Math.round(value/Math.max(1,current.goal)*100),ready=value>=current.goal&&!claimed,rewardName=ko?current.reward.itemKo:current.reward.itemEn;
    const season=`<section class="card v428-season-card" data-season="${current.accent}"><div class="v428-season-head"><span>${current.icon}</span><div><div class="section-kicker">${ko?"시즌 이벤트":"Seasonal event"}</div><h3>${esc(ko?current.titleKo:current.titleEn)}</h3><p>${ko?"학습 5회를 완료하면 Meowde의 한정 배지가 열려요.":"Complete 5 learning sessions to unlock a limited Meowde badge."}</p></div></div><div class="v428-event-track"><i style="width:${percent}%"></i></div><div class="v428-event-foot"><b>${value}/${current.goal}</b><span>🎁 ${esc(rewardName)} · +${current.reward.xp} XP</span></div>${ready?`<button class="btn" onclick="MeowEvents.claimSeason();renderRoom()">${ko?"시즌 보상 받기":"Claim seasonal reward"}</button>`:""}${claimed?`<div class="v428-claimed">✓ ${ko?"이번 시즌 보상 수령 완료":"Season reward claimed"}</div>`:""}</section>`;
    let visitor="";
    const currentVisitor=typeof api.visitorForToday==="function"?api.visitorForToday():null;
    if(currentVisitor){
      const dateKey=localDateKey(),visitors=api.state.visitors||(api.state.visitors={}),state=visitors[dateKey]||(visitors[dateKey]={seen:false,claimed:false});
      if(!state.seen){state.seen=true;persistEventState(api)}
      visitor=`<section class="card v428-visitor-card"><div class="v428-visitor-avatar">${currentVisitor.icon}</div><div class="v428-visitor-copy"><div class="section-kicker">${ko?"오늘의 방문자":"Today's visitor"}</div><h3>${esc(ko?currentVisitor.nameKo:currentVisitor.nameEn)}</h3><p>${esc(ko?currentVisitor.lineKo:currentVisitor.lineEn)}</p><small>+${currentVisitor.reward.xp} XP · +${currentVisitor.reward.churu} ${ko?"츄르":"Churu"}</small></div><button class="btn ${state.claimed?"ghost":""}" ${state.claimed?"disabled":`onclick="MeowEvents.claimVisitor();renderRoom()"`}>${state.claimed?(ko?"선물 받음":"Claimed"):(ko?"선물 확인":"Check gift")}</button></section>`;
    }
    let collection="";
    const collectibles=Array.isArray(api.state&&api.state.collectibles)?api.state.collectibles:[];
    if(collectibles.length){const icons={snowflake:"❄️",tulip:"🌷",watermelon:"🍉",maple:"🍂"};collection=`<section class="card v428-collection"><div><div class="section-kicker">${ko?"한정 컬렉션":"Limited collection"}</div><h3>${ko?"시즌 기념품":"Season keepsakes"}</h3></div><div>${collectibles.map(id=>`<span title="${esc(id)}">${icons[id]||"🎖️"}</span>`).join("")}</div></section>`}
    return season+visitor+collection;
  }
  function renderCompanionHub(){
    const current=runtimeState();
    if(!current)return;
    forceSingleCompanion();current.screen="room";try{if(typeof save==="function")save()}catch(error){}
    const ko=isKorean(),done=Number(current.done&&current.done.length)||0,streak=Number(current.streak)||0,mode=currentCoachMode();
    const intro=ko?"오늘 함께 공부할 Meowde의 코치 모드를 고르고, 성장과 업적도 확인하세요.":"Choose Meowde's coach mode for today, then check growth and achievements.";
    const profileCopy=ko?`${done}개 레슨 완료 · ${streak}일 연속 학습`:`${done} lessons complete · ${streak} day streak`;
    const modeLabel=ko?mode.labelKo:mode.labelEn;
    const modeCopy=ko?mode.copyKo:mode.copyEn;
    const sections=growthCard()+achievementSummary()+milestoneCard()+eventCards();
    app.innerHTML=`<div class="screen">${brand()}${stats()}<div class="scroll" data-phase3-companion-hub="ordered"><div class="simple-head"><h2>Meowde</h2><p>${intro}</p></div><section class="card profile-card v443-selected-mode">${coachModeImageMarkup(mode,"v443-selected-mode-image",modeLabel)}<div class="profile-copy"><div class="section-kicker">${ko?'현재 코치 모드':'Current coach mode'}</div><h3>${esc(modeLabel)}</h3><p>${esc(modeCopy)} · ${profileCopy}</p></div></section><div class="v443-mode-heading"><div><h3>${ko?'코치 모드 6가지':'6 coach modes'}</h3><p>${ko?'원하는 모습을 누르면 바로 저장돼요.':'Tap a mode to save it instantly.'}</p></div></div>${coachModeGrid()}${sections}<div class="profile-stats"><div class="profile-stat"><b>${Number(current.xp)||0}</b><span>XP</span></div><div class="profile-stat"><b>${Number(current.churu)||0}</b><span>${ko?"츄르":"Churu"}</span></div><div class="profile-stat"><b>${progressPercent()}%</b><span>${ko?"진도":"Progress"}</span></div></div></div>${canonicalTabs()}</div>`;
    document.documentElement.dataset.companionSystem="single";document.documentElement.dataset.navigation="phase1-four-tabs";document.documentElement.dataset.roomRenderer="canonical-v443";document.documentElement.dataset.coachMode=mode.id;
    if(window.MeowCharacterMaster&&typeof MeowCharacterMaster.purgeLegacyCats==="function")MeowCharacterMaster.purgeLegacyCats();
  }
  function decorate(root=document){
    forceSingleCompanion();
    const current=runtimeState();
    const canonicalSurface=current&&["home","map","review","profile","achievements","room","my"].includes(current.screen);
    if(!canonicalSurface)normalizeNavigation(root);
    document.documentElement.dataset.companionSystem="single";document.documentElement.dataset.navigation="phase1-four-tabs";document.documentElement.dataset.coachMode=currentCoachMode().id;
  }
  function queueDecoration(root=document){if(decorationQueued)return;decorationQueued=true;requestAnimationFrame(()=>{decorationQueued=false;decorate(root&&root.isConnected?root:document)})}

  window.renderRoom=renderCompanionHub;window.renderMy=renderCompanionHub;

  const observer=new MutationObserver(records=>{const added=records.some(record=>record.addedNodes&&record.addedNodes.length);if(added)queueDecoration(document)});
  observer.observe(document.documentElement,{childList:true,subtree:true});

  window.MeowCoachMode=Object.freeze({version:VERSION,storageKey:MODE_STORAGE_KEY,modes:COACH_MODES,current:currentCoachMode,select:selectCoachMode,imageMarkup:coachModeImageMarkup});
  window.MeowSingleCompanion=Object.freeze({version:VERSION,render:renderCompanionHub,tabs:canonicalTabs,decorate,normalizeNavigation,forceSingleCompanion});
  window.__MEOWDE_VERSION__=VERSION;
  if(typeof window.__MEOWDE_CANONICAL_HOME_RENDERER__==="function")window.renderHome=window.__MEOWDE_CANONICAL_HOME_RENDERER__;
  if(typeof window.__MEOWDE_CANONICAL_LEARN_RENDERER__==="function")window.renderMap=window.__MEOWDE_CANONICAL_LEARN_RENDERER__;
  if(typeof window.__MEOWDE_CANONICAL_REVIEW_RENDERER__==="function")window.renderReview=window.__MEOWDE_CANONICAL_REVIEW_RENDERER__;
  if(typeof window.__MEOWDE_CANONICAL_PROFILE_RENDERER__==="function")window.renderProfile=window.__MEOWDE_CANONICAL_PROFILE_RENDERER__;
  if(typeof window.__MEOWDE_CANONICAL_ACHIEVEMENTS_RENDERER__==="function")window.renderAchievements=window.__MEOWDE_CANONICAL_ACHIEVEMENTS_RENDERER__;
  forceSingleCompanion();
  const current=runtimeState();
  if(current&&["room","my"].includes(current.screen))renderCompanionHub();
  else if(current&&current.screen==="map"&&typeof window.renderMap==="function")window.renderMap();
  else if(current&&current.screen==="review"&&typeof window.renderReview==="function")window.renderReview();
  else if(current&&current.screen==="profile"&&typeof window.renderProfile==="function")window.renderProfile();
  else if(current&&current.screen==="achievements"&&typeof window.renderAchievements==="function")window.renderAchievements();
  else decorate();
})();
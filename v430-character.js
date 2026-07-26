(function installApprovedMeowde(){
  "use strict";
  const VERSION="4.39-preview.1";
  const ASSET="/assets/meowde-approved-base.svg?v=4391";
  const ALLOWED=new Set(["none","glasses","headphones","star","crown"]);
  const achievementState=()=>window.MeowAchievements&&MeowAchievements.state?MeowAchievements.state:{equippedAccessory:"none"};
  const selected=forced=>{const value=forced||achievementState().equippedAccessory||"none";return ALLOWED.has(value)?value:"none"};

  function installHeadphones(){
    const api=window.MeowAchievements;
    if(!api||!Array.isArray(api.accessories)||api.accessories.some(item=>item.id==="headphones"))return;
    api.accessories.splice(2,0,{id:"headphones",icon:"🎧",titleKo:"실버 헤드폰",titleEn:"Silver Headphones",descKo:"정답 10연속 달성 보상",descEn:"Reward for a 10-answer streak",achievement:"ten-in-row"});
  }

  function accessory(id){
    if(id==="glasses")return '<g aria-hidden="true"><path d="M24 53q14-7 31 1c-1 13-8 19-19 17-8-2-12-8-12-18zM104 53q-14-7-31 1c1 13 8 19 19 17 8-2 12-8 12-18z" fill="#2f3036" stroke="#75664b" stroke-width="3.2"/><path d="M54 55q10-4 20 0M24 55l-9-2M104 55l9-2" fill="none" stroke="#75664b" stroke-width="3.2" stroke-linecap="round"/><path d="M31 56q7-4 15-1M80 56q7-4 15-1" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="2" stroke-linecap="round"/></g>';
    if(id==="headphones")return '<g aria-hidden="true"><path d="M24 78V60c0-31 17-49 40-49s40 18 40 49v18" fill="none" stroke="#d5d2d0" stroke-width="5.5" stroke-linecap="round"/><ellipse cx="23" cy="78" rx="10" ry="17" fill="#d5d2d0" stroke="#898684" stroke-width="2.5"/><ellipse cx="105" cy="78" rx="10" ry="17" fill="#d5d2d0" stroke="#898684" stroke-width="2.5"/><path d="M19 71v14M101 71v14" stroke="#f4f2ef" stroke-width="2.3" stroke-linecap="round"/></g>';
    if(id==="star")return '<path d="M103 27l3.5 7 7.8 1.1-5.7 5.5 1.4 7.8-7-3.7-7 3.7 1.4-7.8-5.7-5.5 7.8-1.1z" fill="#c9a8e8" stroke="#785b99" stroke-width="1.8"/>';
    if(id==="crown")return '<path d="M43 31l6-14 11 10 7-17 8 17 11-10 6 14-4 10H47z" fill="#e7c45a" stroke="#8a6818" stroke-width="2.2"/>';
    return "";
  }

  function renderMascot(_kind="meowde",mood="idle",size=80,options){
    const item=selected(options&&options.accessory);
    return `<svg class="meowde-cat meowde-cat-v430 meowde-approved-character mood-${mood||"idle"}" width="${size}" height="${size}" viewBox="0 0 128 174" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Meowde coding companion" data-character-version="${VERSION}"><image href="${ASSET}" width="128" height="174"/>${accessory(item)}</svg>`;
  }

  function renderFace(size=38){
    return `<svg class="meowde-brand-face" width="${size}" height="${size}" viewBox="8 5 112 96" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Meowde"><image href="${ASSET}" width="128" height="174"/></svg>`;
  }

  function installTypography(){
    if(!document.getElementById("meowde-serif-font")){
      const link=document.createElement("link");
      link.id="meowde-serif-font";
      link.rel="stylesheet";
      link.href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }

  function styles(){
    if(document.getElementById("meowde-approved-style"))return;
    installTypography();
    const style=document.createElement("style");
    style.id="meowde-approved-style";
    style.textContent='html[lang="ko"] h1,html[lang="ko"] h2,html[lang="ko"] h3,html[lang="ko"] .prompt,html[lang="ko"] .section-title h3,html[lang="ko"] .section-kicker{font-family:"Noto Serif KR","Nanum Myeongjo","AppleMyungjo","Batang",serif}html[lang="ko"] h1,html[lang="ko"] h2,html[lang="ko"] h3{font-weight:700;letter-spacing:-.045em}.brand-mark{display:grid;place-items:center;width:40px;height:40px;overflow:hidden;border:1px solid rgba(68,49,36,.09);border-radius:14px;background:linear-gradient(145deg,#fffdf8,#f4eadc);box-shadow:0 4px 12px rgba(73,54,43,.1)}.meowde-brand-face{display:block;width:39px;height:39px;transform:scale(1.08) translateY(2px);filter:drop-shadow(0 2px 3px rgba(73,54,43,.12))}.meowde-approved-character{overflow:visible;filter:drop-shadow(0 5px 9px rgba(73,54,43,.14))}.meowde-approved-character.mood-happy,.meowde-approved-character.mood-party{animation:approvedHappy .55s cubic-bezier(.2,.8,.2,1)}.meowde-approved-character.mood-focus{animation:approvedBreathe 2.8s ease-in-out infinite}.v435-coding-scene{position:relative;display:grid;place-items:center;width:132px;min-width:132px;height:128px;margin:-12px -10px -3px -12px}.v435-coding-scene .meowde-approved-character{position:absolute;z-index:1;top:-13px;left:50%;width:112px;height:142px;transform:translateX(-50%);animation:approvedHero 2.5s ease-in-out infinite}.v435-laptop{position:absolute;z-index:3;left:50%;bottom:0;width:90px;height:50px;transform:translateX(-50%)}.v435-laptop-screen{position:absolute;inset:0 7px 8px;border:2px solid #665b70;border-radius:8px;background:linear-gradient(145deg,#b8a7cf,#e5dcef)}.v435-laptop-screen:before{content:"";position:absolute;inset:7px 8px 11px;border-radius:4px;background:#302d35}.v435-laptop-screen:after{content:">_";position:absolute;left:15px;top:12px;color:#92ddbd;font:800 9px/1 monospace}.v435-laptop-base{position:absolute;left:0;right:0;bottom:3px;height:9px;border:2px solid #665b70;border-radius:3px 3px 9px 9px;background:#c8bdd7}.v435-scene-note{position:absolute;z-index:5;right:0;top:5px;padding:5px 7px;border:1px solid rgba(128,107,176,.18);border-radius:999px;background:#fff;color:#806bb0;font-size:8.5px;font-weight:950}@keyframes approvedHappy{50%{transform:translateY(-3px) scale(1.02)}}@keyframes approvedBreathe{50%{transform:scale(1.015)}}@keyframes approvedHero{50%{transform:translateX(-50%) translateY(-2px)}}@media(max-width:360px){.v435-coding-scene{width:118px;min-width:118px;margin-left:-16px}.v435-coding-scene .meowde-approved-character{width:102px}.v435-scene-note{display:none}}@media(prefers-reduced-motion:reduce){.meowde-approved-character,.v435-coding-scene .meowde-approved-character{animation:none}}';
    document.head.appendChild(style);
  }

  function syncLanguage(){
    const lang=typeof S!=="undefined"&&S&&S.lang==="en"?"en":"ko";
    document.documentElement.lang=lang;
  }

  function brandMarkup(){
    syncLanguage();
    const tagline=typeof t==="function"?t("tagline"):"Learn to code playfully.";
    const lang=typeof S!=="undefined"&&S&&S.lang?S.lang.toUpperCase():"KO";
    return `<div class="top"><div class="brand"><span class="brand-mark">${renderFace(38)}</span><div><h1>Meowde</h1><p>${tagline}</p></div></div><button class="lang" onclick="langSheet()">${lang}</button></div>`;
  }

  function hero(){
    const current=selected();
    const item=current==="glasses"||current==="headphones"?current:"glasses";
    return `<div class="v435-coding-scene">${renderMascot("meowde","focus",122,{accessory:item})}<div class="v435-laptop"><div class="v435-laptop-screen"></div><div class="v435-laptop-base"></div></div><div class="v435-scene-note">ship it</div></div>`;
  }

  function decorateHome(){
    styles();
    syncLanguage();
    const root=document.querySelector(".hero .hero-main");
    if(!root||root.querySelector(":scope > .v435-coding-scene"))return;
    const cat=root.querySelector(":scope > .meowde-cat");
    if(cat)cat.outerHTML=hero();
  }

  function cleanRoom(){
    syncLanguage();
    const grid=document.querySelector(".room-grid");if(!grid)return;
    const cards=Array.from(grid.querySelectorAll(".cat-card"));cards.slice(1).forEach(card=>card.remove());
    const first=cards[0];if(!first)return;
    const h=first.querySelector("h3");if(h)h.textContent="Meowde";
    const p=first.querySelector("p");if(p)p.textContent=typeof S!=="undefined"&&S.lang==="en"?"Your one coding companion":"함께 코딩하는 단 하나의 파트너";
    const b=first.querySelector("button");if(b){b.disabled=true;b.textContent=typeof S!=="undefined"&&S.lang==="en"?"Selected":"기본 캐릭터";b.className="btn"}
  }

  try{if(typeof S!=="undefined"&&S){S.cat="meowde";if(typeof save==="function")save()}}catch(error){}
  styles();syncLanguage();window.catSVG=renderMascot;window.brand=brandMarkup;installHeadphones();
  const oldHome=window.renderHome;if(typeof oldHome==="function")window.renderHome=function(){syncLanguage();oldHome.apply(this,arguments);decorateHome()};
  const oldRoom=window.renderRoom;if(typeof oldRoom==="function")window.renderRoom=function(){syncLanguage();oldRoom.apply(this,arguments);cleanRoom()};
  window.MeowCharacterV430=window.MeowCharacterMaster=Object.freeze({version:VERSION,asset:ASSET,render:renderMascot,renderFace,accessory:selected,decorateHome,cleanRoom,installHeadphones});
  if(typeof S!=="undefined"){
    if(S.screen==="lesson"&&typeof renderLesson==="function")renderLesson();
    else if(S.screen==="room"&&typeof renderRoom==="function")renderRoom();
    else if(S.screen==="profile"&&typeof renderProfile==="function")renderProfile();
    else if(S.screen==="achievements"&&typeof renderAchievements==="function")renderAchievements();
    else if(typeof renderHome==="function")renderHome();
  }
})();

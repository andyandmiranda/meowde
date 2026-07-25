(function installApprovedMeowde(){
  "use strict";
  const VERSION="4.38-preview";
  const ASSET="/assets/meowde-approved-base.svg?v=438";
  const ALLOWED=new Set(["none","glasses","headphones","star","crown"]);
  const achievementState=()=>window.MeowAchievements&&MeowAchievements.state?MeowAchievements.state:{equippedAccessory:"none"};
  const selected=forced=>{const value=forced||achievementState().equippedAccessory||"none";return ALLOWED.has(value)?value:"none"};

  function installHeadphones(){
    const api=window.MeowAchievements;
    if(!api||!Array.isArray(api.accessories)||api.accessories.some(item=>item.id==="headphones"))return;
    api.accessories.splice(2,0,{id:"headphones",icon:"🎧",titleKo:"실버 헤드폰",titleEn:"Silver Headphones",descKo:"정답 10연속 달성 보상",descEn:"Reward for a 10-answer streak",achievement:"ten-in-row"});
  }

  function accessory(id){
    if(id==="glasses")return '<g aria-hidden="true"><path d="M22 47q15-9 34 1c-2 13-9 19-20 17-8-2-13-9-14-18zM106 47q-15-9-34 1c2 13 9 19 20 17 8-2 13-9 14-18z" fill="#2f3036" stroke="#eee9df" stroke-width="4"/><path d="M55 50q9-5 18 0M22 49l-10-3M106 49l10-3" fill="none" stroke="#eee9df" stroke-width="4" stroke-linecap="round"/></g>';
    if(id==="headphones")return '<g aria-hidden="true"><path d="M22 82V58c0-27 18-45 42-45s42 18 42 45v24" fill="none" stroke="#d8d5d1" stroke-width="8" stroke-linecap="round"/><rect x="13" y="65" width="22" height="43" rx="10" fill="#d8d5d1" stroke="#898684" stroke-width="3"/><rect x="93" y="65" width="22" height="43" rx="10" fill="#d8d5d1" stroke="#898684" stroke-width="3"/></g>';
    if(id==="star")return '<path d="M101 25l4 8 9 1-6.5 6.2 1.5 9-8-4.3-8 4.3 1.6-9-6.6-6.2 9-1z" fill="#c9a8e8" stroke="#785b99" stroke-width="2"/>';
    if(id==="crown")return '<path d="M38 34l7-18 13 12 9-20 10 20 13-12 7 18-5 12H43z" fill="#e7c45a" stroke="#8a6818" stroke-width="2.5"/>';
    return "";
  }

  function renderMascot(_kind="meowde",mood="idle",size=80,options){
    const item=selected(options&&options.accessory);
    return `<svg class="meowde-cat meowde-cat-v430 meowde-approved-character mood-${mood||"idle"}" width="${size}" height="${size}" viewBox="0 0 128 174" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Meowde coding companion" data-character-version="${VERSION}"><image href="${ASSET}" width="128" height="174"/>${accessory(item)}</svg>`;
  }

  function styles(){
    if(document.getElementById("meowde-approved-style"))return;
    const style=document.createElement("style");
    style.id="meowde-approved-style";
    style.textContent='.meowde-approved-character{overflow:visible;filter:drop-shadow(0 5px 9px rgba(73,54,43,.16))}.meowde-approved-character.mood-happy,.meowde-approved-character.mood-party{animation:approvedHappy .55s cubic-bezier(.2,.8,.2,1)}.meowde-approved-character.mood-focus{animation:approvedBreathe 2.8s ease-in-out infinite}.v435-coding-scene{position:relative;display:grid;place-items:center;width:126px;min-width:126px;height:122px;margin:-11px -8px -2px -10px}.v435-coding-scene .meowde-approved-character{position:absolute;z-index:1;top:-8px;left:50%;width:104px;height:125px;transform:translateX(-50%);animation:approvedHero 2.5s ease-in-out infinite}.v435-laptop{position:absolute;z-index:3;left:50%;bottom:0;width:86px;height:49px;transform:translateX(-50%)}.v435-laptop-screen{position:absolute;inset:0 7px 8px;border:2px solid #665b70;border-radius:8px;background:linear-gradient(145deg,#b8a7cf,#e5dcef)}.v435-laptop-screen:before{content:"";position:absolute;inset:7px 8px 11px;border-radius:4px;background:#302d35}.v435-laptop-screen:after{content:">_";position:absolute;left:15px;top:12px;color:#92ddbd;font:800 9px/1 monospace}.v435-laptop-base{position:absolute;left:0;right:0;bottom:3px;height:9px;border:2px solid #665b70;border-radius:3px 3px 9px 9px;background:#c8bdd7}.v435-scene-note{position:absolute;z-index:5;right:-1px;top:4px;padding:5px 7px;border:1px solid rgba(128,107,176,.18);border-radius:999px;background:#fff;color:#806bb0;font-size:8.5px;font-weight:950}@keyframes approvedHappy{50%{transform:translateY(-3px) scale(1.02)}}@keyframes approvedBreathe{50%{transform:scale(1.015)}}@keyframes approvedHero{50%{transform:translateX(-50%) translateY(-2px)}}@media(prefers-reduced-motion:reduce){.meowde-approved-character,.v435-coding-scene .meowde-approved-character{animation:none}}';
    document.head.appendChild(style);
  }

  function hero(){
    const current=selected();
    const item=current==="glasses"||current==="headphones"?current:"headphones";
    return `<div class="v435-coding-scene">${renderMascot("meowde","focus",118,{accessory:item})}<div class="v435-laptop"><div class="v435-laptop-screen"></div><div class="v435-laptop-base"></div></div><div class="v435-scene-note">ship it</div></div>`;
  }

  function decorateHome(){
    styles();
    const root=document.querySelector(".hero .hero-main");
    if(!root||root.querySelector(":scope > .v435-coding-scene"))return;
    const cat=root.querySelector(":scope > .meowde-cat");
    if(cat)cat.outerHTML=hero();
  }

  function cleanRoom(){
    const grid=document.querySelector(".room-grid");if(!grid)return;
    const cards=Array.from(grid.querySelectorAll(".cat-card"));cards.slice(1).forEach(card=>card.remove());
    const first=cards[0];if(!first)return;
    const h=first.querySelector("h3");if(h)h.textContent="Meowde";
    const p=first.querySelector("p");if(p)p.textContent=typeof S!=="undefined"&&S.lang==="en"?"Your one coding companion":"함께 코딩하는 단 하나의 파트너";
    const b=first.querySelector("button");if(b){b.disabled=true;b.textContent=typeof S!=="undefined"&&S.lang==="en"?"Selected":"기본 캐릭터";b.className="btn"}
  }

  try{if(typeof S!=="undefined"&&S){S.cat="meowde";if(typeof save==="function")save()}}catch(error){}
  styles();window.catSVG=renderMascot;installHeadphones();
  const oldHome=window.renderHome;if(typeof oldHome==="function")window.renderHome=function(){oldHome.apply(this,arguments);decorateHome()};
  const oldRoom=window.renderRoom;if(typeof oldRoom==="function")window.renderRoom=function(){oldRoom.apply(this,arguments);cleanRoom()};
  window.MeowCharacterV430=window.MeowCharacterMaster=Object.freeze({version:VERSION,asset:ASSET,render:renderMascot,accessory:selected,decorateHome,cleanRoom,installHeadphones});
  if(typeof S!=="undefined"){
    if(S.screen==="lesson"&&typeof renderLesson==="function")renderLesson();
    else if(S.screen==="room"&&typeof renderRoom==="function")renderRoom();
    else if(S.screen==="profile"&&typeof renderProfile==="function")renderProfile();
    else if(S.screen==="achievements"&&typeof renderAchievements==="function")renderAchievements();
    else if(typeof renderHome==="function")renderHome();
  }
})();

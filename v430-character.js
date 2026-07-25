(function installMeowdeCharacterMaster(){
  "use strict";

  const VERSION="4.37";
  const P=Object.freeze({fur:"#FFF4E8",shadow:"#EEDBC8",ink:"#4A3B37",inner:"#F3B7B0",nose:"#E89A96",blush:"#F2A7B8",stripe:"#D6B291",olive:"#7C8654",lens:"#2F3036",silver:"#D5D2D0",silverDark:"#898684"});
  const ALLOWED=new Set(["none","glasses","headphones","star","crown"]);

  function achievementState(){return window.MeowAchievements&&MeowAchievements.state?MeowAchievements.state:{equippedAccessory:"none"}}
  function selectedAccessory(forced){const value=forced||achievementState().equippedAccessory||"none";return ALLOWED.has(value)?value:"none"}

  function installHeadphones(){
    const api=window.MeowAchievements;
    if(!api||!Array.isArray(api.accessories)||api.accessories.some(item=>item.id==="headphones"))return;
    api.accessories.splice(2,0,{id:"headphones",icon:"🎧",titleKo:"실버 헤드폰",titleEn:"Silver Headphones",descKo:"정답 10연속 달성 보상",descEn:"Reward for a 10-answer streak",achievement:"ten-in-row"});
  }

  function eyes(mood){
    if(mood==="happy"||mood==="party")return `<path d="M38 59q6.5-7.5 13 0M69 59q6.5-7.5 13 0" fill="none" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>`;
    const tears=mood==="oops"||mood==="sad"?`<circle cx="42" cy="61" r="1" fill="#fff" opacity=".65"/><circle cx="74" cy="61" r="1" fill="#fff" opacity=".65"/>`:"";
    return `<ellipse cx="44" cy="58" rx="7.5" ry="9.4" fill="${P.ink}"/><ellipse cx="76" cy="58" rx="7.5" ry="9.4" fill="${P.ink}"/><circle cx="47" cy="54" r="2.8" fill="#fff"/><circle cx="79" cy="54" r="2.8" fill="#fff"/>${tears}`;
  }

  function mouth(mood){
    if(mood==="happy"||mood==="party")return `<path d="M52 73q4 5.7 8 0q4 5.7 8 0" fill="none" stroke="${P.ink}" stroke-width="2.5" stroke-linecap="round"/><path d="M57 78q3 2 6 0" fill="none" stroke="#E98FA2" stroke-width="2" stroke-linecap="round"/>`;
    if(mood==="oops"||mood==="sad")return `<path d="M55 76q5-4.8 10 0" fill="none" stroke="${P.ink}" stroke-width="2.5" stroke-linecap="round"/>`;
    return `<path d="M53 73q3.5 3.8 7 0q3.5 3.8 7 0" fill="none" stroke="${P.ink}" stroke-width="2.4" stroke-linecap="round"/>`;
  }

  function accessory(id){
    if(id==="glasses")return `<g class="v430-accessory" aria-hidden="true"><path d="M27 47q13-8 29 1c-2 11-8 16-17 14-7-2-11-8-12-15zM93 47q-13-8-29 1c2 11 8 16 17 14 7-2 11-8 12-15z" fill="${P.lens}" stroke="${P.olive}" stroke-width="3"/><path d="M55 49q5-3 10 0M27 48l-8-2M93 48l8-2" fill="none" stroke="${P.olive}" stroke-width="3" stroke-linecap="round"/></g>`;
    if(id==="headphones")return `<g class="v430-accessory" aria-hidden="true"><path d="M27 55V43c0-17 13-29 33-29s33 12 33 29v12" fill="none" stroke="${P.silver}" stroke-width="6" stroke-linecap="round"/><rect x="19" y="44" width="18" height="32" rx="8" fill="${P.silver}" stroke="${P.silverDark}" stroke-width="2.5"/><rect x="83" y="44" width="18" height="32" rx="8" fill="${P.silver}" stroke="${P.silverDark}" stroke-width="2.5"/></g>`;
    if(id==="star")return `<path class="v430-accessory" d="M89 23l3 6 6.7 1-4.8 4.7 1.1 6.6-6-3.2-6 3.2 1.2-6.6-4.9-4.7 6.7-1z" fill="#C9A8E8" stroke="#785B99" stroke-width="1.6"/>`;
    if(id==="crown")return `<path class="v430-accessory" d="M42 29l5-13 10 9 7-14 8 14 10-9 5 13-4 9H46z" fill="#E7C45A" stroke="#8A6818" stroke-width="2"/>`;
    return "";
  }

  function renderMascot(_kind="meowde",mood="idle",size=80,options){
    const active=mood||"idle";
    const item=selectedAccessory(options&&options.accessory);
    const blush=active==="happy"||active==="party"?.68:active==="oops"||active==="sad"?.26:.46;
    return `<svg class="meowde-cat meowde-cat-v430 meowde-character-master mood-${active}" width="${size}" height="${size}" viewBox="0 0 120 116" role="img" aria-label="Meowde coding companion" data-character-version="${VERSION}"><ellipse cx="60" cy="106" rx="30" ry="5" fill="#463B3A" opacity=".08"/><path d="M31 48 36 22c.6-3.1 4.3-4.4 6.7-2.3L57 32M89 48l-5-26c-.6-3.1-4.3-4.4-6.7-2.3L63 32" fill="${P.fur}" stroke="${P.ink}" stroke-width="3.2" stroke-linecap="round"/><path d="M38 29l2-5 8 9M82 29l-2-5-8 9" fill="${P.inner}" stroke="${P.ink}" stroke-width="1.4"/><ellipse cx="60" cy="67" rx="42" ry="37" fill="${P.fur}" stroke="${P.ink}" stroke-width="3.2"/><ellipse cx="60" cy="91" rx="31" ry="18" fill="${P.shadow}" opacity=".55"/><ellipse cx="39" cy="92" rx="12" ry="10" fill="${P.fur}" stroke="${P.ink}" stroke-width="2.4"/><ellipse cx="81" cy="92" rx="12" ry="10" fill="${P.fur}" stroke="${P.ink}" stroke-width="2.4"/><path d="M50 32q4 6 10 0q6 6 10 0" fill="none" stroke="${P.stripe}" stroke-width="3.6" stroke-linecap="round"/>${eyes(active)}<path d="M56.5 67.5h7L60 71z" fill="${P.nose}" stroke="${P.ink}" stroke-width="1.4"/>${mouth(active)}<ellipse cx="31" cy="72" rx="7" ry="4" fill="${P.blush}" opacity="${blush}"/><ellipse cx="89" cy="72" rx="7" ry="4" fill="${P.blush}" opacity="${blush}"/>${accessory(item)}</svg>`;
  }

  function injectHomeStyle(){
    if(document.getElementById("v437-home-style"))return;
    const style=document.createElement("style");
    style.id="v437-home-style";
    style.textContent='.v435-coding-scene{position:relative;display:grid;place-items:center;width:126px;min-width:126px;height:116px;margin:-8px -8px -2px -10px}.v435-coding-scene .meowde-character-master{position:absolute;z-index:1;top:-8px;left:50%;width:112px;height:108px;transform:translateX(-50%);filter:drop-shadow(0 7px 8px rgba(71,55,46,.13));animation:v437bob 2.5s ease-in-out infinite}.v435-laptop{position:absolute;z-index:3;left:50%;bottom:2px;width:82px;height:48px;transform:translateX(-50%)}.v435-laptop-screen{position:absolute;inset:0 7px 8px;border:2px solid #4e4a52;border-radius:8px;background:linear-gradient(145deg,#c7c2ce,#efedf2)}.v435-laptop-screen:before{content:"";position:absolute;inset:7px 8px 11px;border-radius:4px;background:#302d35}.v435-laptop-screen:after{content:">_";position:absolute;left:15px;top:12px;color:#92ddbd;font:800 9px/1 monospace}.v435-laptop-base{position:absolute;left:0;right:0;bottom:3px;height:9px;border:2px solid #4e4a52;border-radius:3px 3px 9px 9px;background:#c8c3ce}.v435-scene-note{position:absolute;z-index:5;right:-3px;top:4px;padding:5px 7px;border:1px solid rgba(128,107,176,.18);border-radius:999px;background:#fff;color:#806bb0;font-size:8.5px;font-weight:950}@keyframes v437bob{50%{transform:translateX(-50%) translateY(-2px)}}@media(prefers-reduced-motion:reduce){.v435-coding-scene .meowde-character-master{animation:none}}';
    document.head.appendChild(style);
  }

  function heroCat(){
    const current=selectedAccessory();
    const heroAccessory=current==="glasses"||current==="headphones"?current:"headphones";
    return `<div class="v435-coding-scene">${renderMascot("meowde","focus",112,{accessory:heroAccessory})}<div class="v435-laptop"><div class="v435-laptop-screen"></div><div class="v435-laptop-base"></div></div><div class="v435-scene-note">ship it</div></div>`;
  }

  function decorateHome(){
    injectHomeStyle();
    const hero=document.querySelector(".hero .hero-main");
    if(!hero)return;
    const existing=hero.querySelector(":scope > .v435-coding-scene");
    if(existing)return;
    const cat=hero.querySelector(":scope > .meowde-cat");
    if(cat)cat.outerHTML=heroCat();
  }

  function cleanRoom(){
    const grid=document.querySelector(".room-grid");
    if(!grid)return;
    const cards=Array.from(grid.querySelectorAll(".cat-card"));
    cards.slice(1).forEach(card=>card.remove());
    const first=cards[0];
    if(!first)return;
    first.classList.remove("locked","selected");
    const heading=first.querySelector("h3");if(heading)heading.textContent="Meowde";
    const copy=first.querySelector("p");if(copy)copy.textContent=typeof S!=="undefined"&&S.lang==="en"?"Your one coding companion":"함께 코딩하는 단 하나의 파트너";
    const button=first.querySelector("button");if(button){button.disabled=true;button.textContent=typeof S!=="undefined"&&S.lang==="en"?"Selected":"기본 캐릭터";button.className="btn"}
  }

  function normalize(){try{if(typeof S!=="undefined"&&S){S.cat="meowde";if(typeof save==="function")save()}}catch(error){}}

  window.catSVG=renderMascot;
  installHeadphones();
  normalize();

  const baseRenderHome=window.renderHome;
  if(typeof baseRenderHome==="function")window.renderHome=function renderHomeCharacterMaster(){baseRenderHome.apply(this,arguments);decorateHome()};
  const baseRenderRoom=window.renderRoom;
  if(typeof baseRenderRoom==="function")window.renderRoom=function renderRoomCharacterMaster(){baseRenderRoom.apply(this,arguments);cleanRoom()};

  window.MeowCharacterV430=window.MeowCharacterMaster=Object.freeze({version:VERSION,render:renderMascot,palette:P,accessory:selectedAccessory,decorateHome,cleanRoom,installHeadphones});
  window.__MEOWDE_VERSION__=VERSION;

  if(typeof S!=="undefined"){
    if(S.screen==="lesson"&&typeof renderLesson==="function")renderLesson();
    else if(S.screen==="room"&&typeof renderRoom==="function")renderRoom();
    else if(S.screen==="profile"&&typeof renderProfile==="function")renderProfile();
    else if(S.screen==="achievements"&&typeof renderAchievements==="function")renderAchievements();
    else if(typeof renderHome==="function")renderHome();
  }
})();

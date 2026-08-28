(function installApprovedMeowde(){
  "use strict";

  const VERSION="4.47-phase5-home";
  const LEGACY_VIEWBOX="0 0 120 112";
  const ASSETS=Object.freeze({
    none:"/assets/meowde-approved-base.svg?v=4471",
    glasses:"/assets/meowde-approved-glasses.svg?v=4471",
    headphones:"/assets/meowde-approved-headphones.svg?v=4471",
    hero:"/assets/meowde-approved-hero.svg?v=4471"
  });
  const VARIANTS=Object.freeze({
    none:{src:ASSETS.none,x:2,y:0,width:124,height:174},
    glasses:{src:ASSETS.glasses,x:-1,y:0,width:130,height:173},
    headphones:{src:ASSETS.headphones,x:-18.5,y:0,width:165,height:174}
  });
  const ALLOWED=new Set(["none","glasses","headphones","star","crown"]);
  const achievementState=()=>window.MeowAchievements&&MeowAchievements.state?window.MeowAchievements.state:{equippedAccessory:"none"};
  const selected=forced=>{const value=forced||achievementState().equippedAccessory||"none";return ALLOWED.has(value)?value:"none"};

  function installHeadphones(){
    const api=window.MeowAchievements;
    if(!api||!Array.isArray(api.accessories)||api.accessories.some(item=>item.id==="headphones"))return;
    api.accessories.splice(2,0,{id:"headphones",icon:"🎧",titleKo:"실버 헤드폰",titleEn:"Silver Headphones",descKo:"정답 10연속 달성 보상",descEn:"Reward for a 10-answer streak",achievement:"ten-in-row"});
  }

  function overlayAccessory(id){
    if(id==="star")return '<path d="M103 27l3.5 7 7.8 1.1-5.7 5.5 1.4 7.8-7-3.7-7 3.7 1.4-7.8-5.7-5.5 7.8-1.1z" fill="#c9a8e8" stroke="#785b99" stroke-width="1.8"/>';
    if(id==="crown")return '<path d="M43 31l6-14 11 10 7-17 8 17 11-10 6 14-4 10H47z" fill="#e7c45a" stroke="#8a6818" stroke-width="2.2"/>';
    return "";
  }

  function variantFor(item){return VARIANTS[item]||VARIANTS.none}

  function renderMascot(_kind="meowde",mood="idle",size=80,options){
    const item=selected(options&&options.accessory);
    const variant=variantFor(item);
    const overlay=item==="star"||item==="crown"?overlayAccessory(item):"";
    return `<svg class="meowde-cat meowde-cat-v430 meowde-approved-character mood-${mood||"idle"}" width="${size}" height="${size}" viewBox="0 0 128 174" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Meowde coding companion" data-character-version="${VERSION}" data-accessory="${item}"><image href="${variant.src}" x="${variant.x}" y="${variant.y}" width="${variant.width}" height="${variant.height}" preserveAspectRatio="xMidYMid meet"/>${overlay}</svg>`;
  }

  function renderFace(size=38){
    return `<svg class="meowde-brand-face" width="${size}" height="${size}" viewBox="10 6 108 94" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Meowde"><image href="${ASSETS.none}" x="2" width="124" height="174"/></svg>`;
  }

  function installTypography(){
    if(!document.getElementById("meowde-serif-font")){
      const link=document.createElement("link");
      link.id="meowde-serif-font";link.rel="stylesheet";link.href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }

  function styles(){
    if(document.getElementById("meowde-approved-style"))return;
    installTypography();
    const style=document.createElement("style");
    style.id="meowde-approved-style";
    style.textContent='svg[viewBox="0 0 120 112"]{visibility:hidden!important}html[lang="ko"] h1,html[lang="ko"] h2,html[lang="ko"] h3,html[lang="ko"] .prompt,html[lang="ko"] .section-title h3,html[lang="ko"] .section-kicker{font-family:"Noto Serif KR","Nanum Myeongjo","AppleMyungjo","Batang",serif}html[lang="ko"] h1,html[lang="ko"] h2,html[lang="ko"] h3{font-weight:700;letter-spacing:-.045em}.brand-mark{display:grid;place-items:center;width:40px;height:40px;overflow:hidden;border:1px solid rgba(68,49,36,.09);border-radius:14px;background:linear-gradient(145deg,#fffdf8,#f4eadc);box-shadow:0 4px 12px rgba(73,54,43,.1)}.meowde-brand-face{display:block;width:39px;height:39px;transform:scale(1.08) translateY(2px);filter:drop-shadow(0 2px 3px rgba(73,54,43,.12))}.meowde-approved-character{overflow:visible;filter:drop-shadow(0 5px 9px rgba(73,54,43,.14))}.meowde-approved-character.mood-happy,.meowde-approved-character.mood-party{animation:approvedHappy .55s cubic-bezier(.2,.8,.2,1)}.meowde-approved-character.mood-focus{animation:approvedBreathe 2.8s ease-in-out infinite}.v435-coding-scene{position:relative;display:grid;place-items:center;width:154px;min-width:154px;height:126px;margin:-7px -15px -5px -18px;overflow:visible}.v447-coding-hero{display:block;width:160px;height:auto;max-width:none;filter:drop-shadow(0 7px 11px rgba(73,54,43,.14));animation:approvedHero 2.8s ease-in-out infinite}@keyframes approvedHappy{50%{transform:translateY(-3px) scale(1.02)}}@keyframes approvedBreathe{50%{transform:scale(1.015)}}@keyframes approvedHero{50%{transform:translateY(-2px) rotate(-.3deg)}}@media(max-width:360px){.v435-coding-scene{width:136px;min-width:136px;height:116px;margin-left:-18px}.v447-coding-hero{width:145px}}@media(prefers-reduced-motion:reduce){.meowde-approved-character,.v447-coding-hero{animation:none}}';
    document.head.appendChild(style);
  }

  function syncLanguage(){const lang=typeof S!=="undefined"&&S&&S.lang==="en"?"en":"ko";document.documentElement.lang=lang;return lang}
  function setLanguage(language){
    if(typeof S==="undefined"||!S)return;
    S.lang=language==="en"?"en":"ko";syncLanguage();
    try{if(typeof save==="function")save()}catch(error){}
    if(typeof closeOverlay==="function")closeOverlay();
    if(typeof renderHome==="function")renderHome();
  }
  function languageSheet(){
    const ko=syncLanguage()==="ko";
    if(typeof overlay!=="function")return;
    overlay(`<h3>${ko?"언어 선택":"Choose language"}</h3><p>${ko?"한국어와 영어로 학습 화면과 안내 문구를 볼 수 있어요.":"Use Meowde's lessons and interface in Korean or English."}</p><div class="grid2"><button class="btn" onclick="setMeowdeLanguage('ko')">한국어</button><button class="btn ghost" onclick="setMeowdeLanguage('en')">English</button></div>`);
  }
  function brandMarkup(){
    syncLanguage();
    const tagline=typeof t==="function"?t("tagline"):"Learn to code playfully.";
    const lang=typeof S!=="undefined"&&S&&S.lang?S.lang.toUpperCase():"KO";
    return `<div class="top"><div class="brand"><span class="brand-mark">${renderFace(38)}</span><div><h1>Meowde</h1><p>${tagline}</p></div></div><button class="lang" onclick="langSheet()">${lang}</button></div>`;
  }
  function hero(){return `<div class="v435-coding-scene" data-character-version="${VERSION}"><img class="v447-coding-hero" src="${ASSETS.hero}" alt="Meowde coding with silver headphones" width="484" height="340"></div>`}
  function legacySvg(node){return node instanceof SVGElement&&node.getAttribute("viewBox")===LEGACY_VIEWBOX}
  function replaceLegacySvg(svg){
    if(!legacySvg(svg)||!svg.isConnected)return;
    const brand=svg.closest(".brand-mark");if(brand){svg.outerHTML=renderFace(38);return}
    const heroCard=svg.closest(".hero");if(heroCard){if(!heroCard.querySelector(".v435-coding-scene"))svg.outerHTML=hero();else svg.remove();return}
    if(svg.closest(".trail-cat")){svg.outerHTML=renderMascot("meowde","idle",44,{accessory:"none"});return}
    if(svg.closest(".coach")){svg.outerHTML=renderMascot("meowde","idle",58,{accessory:"none"});return}
    if(svg.closest(".cat-card-head")){svg.outerHTML=renderMascot("meowde","idle",88,{accessory:"none"});return}
    svg.outerHTML=renderMascot("meowde","idle",80,{accessory:"none"});
  }
  function purgeLegacyCats(root=document){
    if(root instanceof SVGElement&&legacySvg(root))replaceLegacySvg(root);
    if(root&&typeof root.querySelectorAll==="function")root.querySelectorAll(`svg[viewBox="${LEGACY_VIEWBOX}"]`).forEach(replaceLegacySvg);
  }
  function decorateHome(){
    styles();syncLanguage();purgeLegacyCats();
    const heroCard=document.querySelector(".hero");
    if(!heroCard||heroCard.querySelector(".v435-coding-scene"))return;
    const root=heroCard.querySelector(".hero-main")||heroCard;
    const cat=root.querySelector(":scope > .meowde-cat, :scope > svg");
    if(cat)cat.outerHTML=hero();else root.insertAdjacentHTML("afterbegin",hero());
  }
  function cleanRoom(){
    syncLanguage();purgeLegacyCats();
    const grid=document.querySelector(".room-grid");if(!grid)return;
    const cards=Array.from(grid.querySelectorAll(".cat-card"));cards.slice(1).forEach(card=>card.remove());
    const first=cards[0];if(!first)return;
    const head=first.querySelector(".cat-card-head");if(head&&!head.querySelector(".meowde-approved-character"))head.insertAdjacentHTML("afterbegin",renderMascot("meowde","idle",88,{accessory:"none"}));
    const h=first.querySelector("h3");if(h)h.textContent="Meowde";
    const p=first.querySelector("p");if(p)p.textContent=typeof S!=="undefined"&&S.lang==="en"?"Your one coding companion":"함께 코딩하는 단 하나의 파트너";
    const b=first.querySelector("button");if(b){b.disabled=true;b.textContent=typeof S!=="undefined"&&S.lang==="en"?"Selected":"기본 캐릭터";b.className="btn"}
  }

  try{if(typeof S!=="undefined"&&S){S.cat="meowde";if(typeof save==="function")save()}}catch(error){}
  styles();syncLanguage();window.catSVG=renderMascot;window.brand=brandMarkup;window.langSheet=languageSheet;window.setMeowdeLanguage=setLanguage;installHeadphones();
  const observer=new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(node=>{if(node.nodeType===1)purgeLegacyCats(node)})));
  observer.observe(document.documentElement,{childList:true,subtree:true});
  const oldRoom=window.renderRoom;if(typeof oldRoom==="function")window.renderRoom=function(){syncLanguage();oldRoom.apply(this,arguments);cleanRoom();purgeLegacyCats()};
  window.MeowCharacterV430=window.MeowCharacterMaster=Object.freeze({version:VERSION,asset:ASSETS.none,assets:ASSETS,render:renderMascot,renderFace,accessory:selected,decorateHome,cleanRoom,purgeLegacyCats,installHeadphones,setLanguage,languageSheet});
  document.documentElement.dataset.homeCharacterSurface="canonical-v414";
  if(typeof S!=="undefined"){
    if(S.screen==="lesson"&&typeof renderLesson==="function")renderLesson();
    else if(S.screen==="room"&&typeof renderRoom==="function")renderRoom();
    else if(S.screen==="profile"&&typeof renderProfile==="function")renderProfile();
    else if(S.screen==="achievements"&&typeof renderAchievements==="function")renderAchievements();
    else if(typeof renderHome==="function")renderHome();
  }
  purgeLegacyCats();
})();
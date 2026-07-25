(function applyMeowdeV430Character(){
  "use strict";

  const palettes={
    a:{fur:"#FFF4E5",shadow:"#EFDCC5",ink:"#4B3C37",inner:"#F2B6AE",mark:"#D6B493",accent:"#8E7AAE"},
    b:{fur:"#2F3035",shadow:"#1F2024",ink:"#F6EFE6",inner:"#DFAEAF",mark:"#5E616B",accent:"#C7C3BC"},
    c:{fur:"#C9A8E8",shadow:"#A886CB",ink:"#45364D",inner:"#EDB7C8",mark:"#8665AA",accent:"#D9A62E"},
    d:{fur:"#FFF0B8",shadow:"#E5CC79",ink:"#5A4314",inner:"#EFB5A0",mark:"#D9B85F",accent:"#C8A63A"}
  };

  function achievementState(){
    return window.MeowAchievements&&window.MeowAchievements.state?window.MeowAchievements.state:{equippedAccessory:"none"};
  }

  function installHeadphones(){
    const api=window.MeowAchievements;
    if(!api||!Array.isArray(api.accessories))return;
    if(api.accessories.some(item=>item.id==="headphones"))return;
    api.accessories.splice(2,0,{id:"headphones",icon:"🎧",titleKo:"실버 헤드폰",titleEn:"Silver Headphones",descKo:"정답 10연속 달성 보상",descEn:"Reward for a 10-answer streak",achievement:"ten-in-row"});
  }

  function eyes(mood,p){
    if(mood==="happy")return `<path d="M37 58q7-8 14 0M69 58q7-8 14 0" fill="none" stroke="${p.ink}" stroke-width="4.2" stroke-linecap="round"/>`;
    if(mood==="oops")return `<ellipse cx="44" cy="57" rx="8.3" ry="10.2" fill="${p.ink}"/><ellipse cx="76" cy="57" rx="8.3" ry="10.2" fill="${p.ink}"/><circle class="v430-eye-shine" cx="47" cy="53" r="3" fill="#fff"/><circle class="v430-eye-shine" cx="79" cy="53" r="3" fill="#fff"/><circle cx="41" cy="61" r="1.5" fill="#fff" opacity=".5"/><circle cx="73" cy="61" r="1.5" fill="#fff" opacity=".5"/>`;
    if(mood==="focus")return `<ellipse cx="44" cy="57" rx="7.6" ry="9.7" fill="${p.ink}"/><ellipse cx="76" cy="57" rx="7.6" ry="9.7" fill="${p.ink}"/><circle class="v430-eye-shine" cx="47" cy="53" r="2.8" fill="#fff"/><circle class="v430-eye-shine" cx="79" cy="53" r="2.8" fill="#fff"/><path d="M35 44q9-4 18 0M67 44q9-4 18 0" fill="none" stroke="${p.ink}" stroke-width="2" stroke-linecap="round" opacity=".55"/>`;
    return `<ellipse cx="44" cy="57" rx="8" ry="10" fill="${p.ink}"/><ellipse cx="76" cy="57" rx="8" ry="10" fill="${p.ink}"/><circle class="v430-eye-shine" cx="47" cy="53" r="3" fill="#fff"/><circle class="v430-eye-shine" cx="79" cy="53" r="3" fill="#fff"/>`;
  }

  function mouth(mood,p){
    if(mood==="happy")return `<path d="M52 72q4 6 8 0q4 6 8 0" fill="none" stroke="${p.ink}" stroke-width="2.6" stroke-linecap="round"/><path d="M57 77q3 2 6 0" fill="none" stroke="#E98FA2" stroke-width="2" stroke-linecap="round"/>`;
    if(mood==="oops")return `<path d="M55 75q5-5 10 0" fill="none" stroke="${p.ink}" stroke-width="2.6" stroke-linecap="round"/>`;
    return `<path d="M53 72q3.5 4 7 0q3.5 4 7 0" fill="none" stroke="${p.ink}" stroke-width="2.5" stroke-linecap="round"/>`;
  }

  function accessoryMarkup(id,p){
    if(id==="glasses")return `<g class="v430-accessory" transform="translate(0 2)"><path d="M27 46q13-8 29 1c-2 11-8 17-17 15-7-2-11-8-12-16zM93 46q-13-8-29 1c2 11 8 17 17 15 7-2 11-8 12-16z" fill="#313439" stroke="#737D4A" stroke-width="3"/><path d="M55 48q5-3 10 0M27 47l-8-2M93 47l8-2" fill="none" stroke="#737D4A" stroke-width="3" stroke-linecap="round"/></g>`;
    if(id==="headphones")return `<g class="v430-accessory"><path d="M27 54V42c0-17 13-29 33-29s33 12 33 29v12" fill="none" stroke="#B9B6B3" stroke-width="6" stroke-linecap="round"/><rect x="19" y="43" width="18" height="32" rx="8" fill="#D9D6D2" stroke="#8D8987" stroke-width="2.5"/><rect x="83" y="43" width="18" height="32" rx="8" fill="#D9D6D2" stroke="#8D8987" stroke-width="2.5"/><rect x="24" y="48" width="8" height="22" rx="4" fill="#F3F1EE"/><rect x="88" y="48" width="8" height="22" rx="4" fill="#F3F1EE"/></g>`;
    if(id==="star")return `<path class="v430-accessory" d="M89 23l3 6 6.7 1-4.8 4.7 1.1 6.6-6-3.2-6 3.2 1.2-6.6-4.9-4.7 6.7-1z" fill="#C9A8E8" stroke="#785B99" stroke-width="1.6"/>`;
    if(id==="crown")return `<g class="v430-accessory"><path d="M42 29l5-13 10 9 7-14 8 14 10-9 5 13-4 9H46z" fill="#E7C45A" stroke="#8A6818" stroke-width="2"/><circle cx="64" cy="19" r="2.5" fill="#B98AD9"/></g>`;
    return "";
  }

  window.catSVG=function catSVG(kind="a",mood="idle",size=80){
    const p=palettes[kind]||palettes.a;
    const selected=achievementState().equippedAccessory||"none";
    const accessory=["glasses","headphones","star","crown"].includes(selected)?selected:"none";
    const blush=mood==="happy"?.7:mood==="oops"?.28:.5;
    return `<svg class="meowde-cat meowde-cat-v430 meowde-cat-${kind} mood-${mood}" width="${size}" height="${size}" viewBox="0 0 120 116" role="img" aria-label="Meowde coding companion">
      <ellipse cx="60" cy="106" rx="30" ry="5" fill="#463B3A" opacity=".09"/>
      <path d="M31 48 36 22c.6-3.1 4.3-4.4 6.7-2.3L57 32M89 48l-5-26c-.6-3.1-4.3-4.4-6.7-2.3L63 32" fill="${p.fur}" stroke="${p.ink}" stroke-width="3.3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M38 29l2-5 8 9M82 29l-2-5-8 9" fill="${p.inner}" stroke="${p.ink}" stroke-width="1.4" stroke-linecap="round"/>
      <ellipse cx="60" cy="67" rx="42" ry="37" fill="${p.fur}" stroke="${p.ink}" stroke-width="3.3"/>
      <ellipse cx="60" cy="91" rx="31" ry="18" fill="${p.shadow}" opacity=".62"/>
      <ellipse cx="39" cy="92" rx="12" ry="10" fill="${p.fur}" stroke="${p.ink}" stroke-width="2.5"/>
      <ellipse cx="81" cy="92" rx="12" ry="10" fill="${p.fur}" stroke="${p.ink}" stroke-width="2.5"/>
      <path d="M50 32q4 6 10 0q6 6 10 0" fill="none" stroke="${p.mark}" stroke-width="3.8" stroke-linecap="round"/>
      <path d="M34 39q5-5 10-6M76 33q5 1 10 6" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".48"/>
      ${eyes(mood,p)}
      <path d="M56.5 67.5h7L60 71z" fill="#E9A39A" stroke="${p.ink}" stroke-width="1.4" stroke-linejoin="round"/>
      ${mouth(mood,p)}
      <ellipse class="v430-blush" cx="31" cy="72" rx="7" ry="4" fill="#F1A8B8" opacity="${blush}"/><ellipse class="v430-blush" cx="89" cy="72" rx="7" ry="4" fill="#F1A8B8" opacity="${blush}"/>
      <g fill="none" stroke="${p.ink}" stroke-width="1.7" stroke-linecap="round" opacity=".28"><path d="M19 66h17M20 72l16-3M101 66H84M100 72l-16-3"/></g>
      ${accessoryMarkup(accessory,p)}
    </svg>`;
  };

  installHeadphones();
  window.MeowCharacterV430={palettes,installHeadphones,accessory:function(){return achievementState().equippedAccessory||"none"}};
  window.__MEOWDE_VERSION__="4.30";

  if(window.S){
    if(S.screen==="lesson"&&typeof window.renderLesson==="function")window.renderLesson();
    else if(S.screen==="room"&&typeof window.renderRoom==="function")window.renderRoom();
    else if(S.screen==="achievements"&&typeof window.renderAchievements==="function")window.renderAchievements();
    else if(typeof window.renderHome==="function")window.renderHome();
  }
})();

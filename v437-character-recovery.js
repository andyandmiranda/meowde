(function installMeowdeV437CharacterMaster(){
  "use strict";

  const MASTER = Object.freeze({
    fur: "#FFF4E8",
    furShadow: "#EEDBC8",
    outline: "#4A3B37",
    innerEar: "#F3B7B0",
    nose: "#E89A96",
    blush: "#F2A7B8",
    stripe: "#D6B291",
    olive: "#7C8654",
    lens: "#2F3036",
    silver: "#D5D2D0",
    silverDark: "#898684"
  });

  const ALLOWED_ACCESSORIES = new Set(["none", "glasses", "headphones", "star", "crown"]);

  function achievementState(){
    return window.MeowAchievements && window.MeowAchievements.state
      ? window.MeowAchievements.state
      : { equippedAccessory: "none" };
  }

  function normalizedAccessory(forced){
    const value = forced || achievementState().equippedAccessory || "none";
    return ALLOWED_ACCESSORIES.has(value) ? value : "none";
  }

  function eyes(mood){
    if(mood === "happy" || mood === "party"){
      return '<path d="M38 59q6.5-7.5 13 0M69 59q6.5-7.5 13 0" fill="none" stroke="'+MASTER.outline+'" stroke-width="4" stroke-linecap="round"/>';
    }
    if(mood === "oops" || mood === "sad"){
      return '<ellipse cx="44" cy="58" rx="7.6" ry="9.5" fill="'+MASTER.outline+'"/><ellipse cx="76" cy="58" rx="7.6" ry="9.5" fill="'+MASTER.outline+'"/><circle cx="47" cy="54" r="2.8" fill="#fff"/><circle cx="79" cy="54" r="2.8" fill="#fff"/><circle cx="42" cy="61" r="1" fill="#fff" opacity=".65"/><circle cx="74" cy="61" r="1" fill="#fff" opacity=".65"/>';
    }
    return '<ellipse cx="44" cy="58" rx="7.4" ry="9.3" fill="'+MASTER.outline+'"/><ellipse cx="76" cy="58" rx="7.4" ry="9.3" fill="'+MASTER.outline+'"/><circle cx="47" cy="54" r="2.8" fill="#fff"/><circle cx="79" cy="54" r="2.8" fill="#fff"/>';
  }

  function mouth(mood){
    if(mood === "happy" || mood === "party"){
      return '<path d="M52 73q4 5.7 8 0q4 5.7 8 0" fill="none" stroke="'+MASTER.outline+'" stroke-width="2.5" stroke-linecap="round"/><path d="M57 78q3 2 6 0" fill="none" stroke="#E98FA2" stroke-width="2" stroke-linecap="round"/>';
    }
    if(mood === "oops" || mood === "sad"){
      return '<path d="M55 76q5-4.8 10 0" fill="none" stroke="'+MASTER.outline+'" stroke-width="2.5" stroke-linecap="round"/>';
    }
    return '<path d="M53 73q3.5 3.8 7 0q3.5 3.8 7 0" fill="none" stroke="'+MASTER.outline+'" stroke-width="2.4" stroke-linecap="round"/>';
  }

  function accessoryMarkup(accessory){
    if(accessory === "glasses"){
      return '<g class="meowde-master-accessory" aria-hidden="true"><path d="M27 47q13-8 29 1c-2 11-8 16-17 14-7-2-11-8-12-15zM93 47q-13-8-29 1c2 11 8 16 17 14 7-2 11-8 12-15z" fill="'+MASTER.lens+'" stroke="'+MASTER.olive+'" stroke-width="3"/><path d="M55 49q5-3 10 0M27 48l-8-2M93 48l8-2" fill="none" stroke="'+MASTER.olive+'" stroke-width="3" stroke-linecap="round"/></g>';
    }
    if(accessory === "headphones"){
      return '<g class="meowde-master-accessory" aria-hidden="true"><path d="M27 55V43c0-17 13-29 33-29s33 12 33 29v12" fill="none" stroke="'+MASTER.silver+'" stroke-width="6" stroke-linecap="round"/><rect x="19" y="44" width="18" height="32" rx="8" fill="'+MASTER.silver+'" stroke="'+MASTER.silverDark+'" stroke-width="2.5"/><rect x="83" y="44" width="18" height="32" rx="8" fill="'+MASTER.silver+'" stroke="'+MASTER.silverDark+'" stroke-width="2.5"/></g>';
    }
    if(accessory === "star"){
      return '<path class="meowde-master-accessory" d="M89 23l3 6 6.7 1-4.8 4.7 1.1 6.6-6-3.2-6 3.2 1.2-6.6-4.9-4.7 6.7-1z" fill="#C9A8E8" stroke="#785B99" stroke-width="1.6"/>';
    }
    if(accessory === "crown"){
      return '<path class="meowde-master-accessory" d="M42 29l5-13 10 9 7-14 8 14 10-9 5 13-4 9H46z" fill="#E7C45A" stroke="#8A6818" stroke-width="2"/>';
    }
    return "";
  }

  function renderMascot(_kind, mood, size, options){
    const activeMood = mood || "idle";
    const accessory = normalizedAccessory(options && options.accessory);
    const blushOpacity = activeMood === "happy" || activeMood === "party" ? .68 : activeMood === "oops" || activeMood === "sad" ? .26 : .46;
    return '<svg class="meowde-cat meowde-character-master mood-'+activeMood+'" width="'+(size || 80)+'" height="'+(size || 80)+'" viewBox="0 0 120 116" role="img" aria-label="Meowde coding companion" data-character-version="4.37"><ellipse cx="60" cy="106" rx="30" ry="5" fill="#463B3A" opacity=".08"/><path d="M31 48 36 22c.6-3.1 4.3-4.4 6.7-2.3L57 32M89 48l-5-26c-.6-3.1-4.3-4.4-6.7-2.3L63 32" fill="'+MASTER.fur+'" stroke="'+MASTER.outline+'" stroke-width="3.2" stroke-linecap="round"/><path d="M38 29l2-5 8 9M82 29l-2-5-8 9" fill="'+MASTER.innerEar+'" stroke="'+MASTER.outline+'" stroke-width="1.4"/><ellipse cx="60" cy="67" rx="42" ry="37" fill="'+MASTER.fur+'" stroke="'+MASTER.outline+'" stroke-width="3.2"/><ellipse cx="60" cy="91" rx="31" ry="18" fill="'+MASTER.furShadow+'" opacity=".55"/><ellipse cx="39" cy="92" rx="12" ry="10" fill="'+MASTER.fur+'" stroke="'+MASTER.outline+'" stroke-width="2.4"/><ellipse cx="81" cy="92" rx="12" ry="10" fill="'+MASTER.fur+'" stroke="'+MASTER.outline+'" stroke-width="2.4"/><path d="M50 32q4 6 10 0q6 6 10 0" fill="none" stroke="'+MASTER.stripe+'" stroke-width="3.6" stroke-linecap="round"/>'+eyes(activeMood)+'<path d="M56.5 67.5h7L60 71z" fill="'+MASTER.nose+'" stroke="'+MASTER.outline+'" stroke-width="1.4"/>'+mouth(activeMood)+'<ellipse cx="31" cy="72" rx="7" ry="4" fill="'+MASTER.blush+'" opacity="'+blushOpacity+'"/><ellipse cx="89" cy="72" rx="7" ry="4" fill="'+MASTER.blush+'" opacity="'+blushOpacity+'"/>'+accessoryMarkup(accessory)+'</svg>';
  }

  function normalizeSavedCharacter(){
    try{
      if(typeof S !== "undefined" && S){
        S.cat = "meowde";
        if(typeof save === "function") save();
      }
    }catch(error){}
  }

  function cleanRoom(){
    const grid = document.querySelector(".room-grid");
    if(!grid) return;
    const cards = Array.from(grid.querySelectorAll(".cat-card"));
    cards.slice(1).forEach(card => card.remove());
    const first = cards[0];
    if(first){
      first.classList.remove("locked", "selected");
      const heading = first.querySelector("h3");
      if(heading) heading.textContent = "Meowde";
      const copy = first.querySelector("p");
      if(copy) copy.textContent = typeof S !== "undefined" && S.lang === "en" ? "Your coding companion" : "함께 코딩하는 단 하나의 파트너";
      const button = first.querySelector("button");
      if(button){
        button.disabled = true;
        button.textContent = typeof S !== "undefined" && S.lang === "en" ? "Selected" : "기본 캐릭터";
        button.className = "btn";
      }
    }
  }

  window.catSVG = renderMascot;
  window.MeowCharacterMaster = Object.freeze({
    version: "4.37",
    render: renderMascot,
    palette: MASTER,
    accessory: normalizedAccessory,
    cleanRoom
  });

  normalizeSavedCharacter();

  if(typeof window.renderRoom === "function"){
    const baseRenderRoom = window.renderRoom;
    window.renderRoom = function renderRoomV437(){
      baseRenderRoom.apply(this, arguments);
      cleanRoom();
    };
  }

  const rerender = () => {
    if(typeof S === "undefined") return;
    if(S.screen === "lesson" && typeof renderLesson === "function") renderLesson();
    else if(S.screen === "room" && typeof renderRoom === "function") renderRoom();
    else if(S.screen === "profile" && typeof renderProfile === "function") renderProfile();
    else if(S.screen === "achievements" && typeof renderAchievements === "function") renderAchievements();
    else if(typeof renderHome === "function") renderHome();
  };

  rerender();
})();

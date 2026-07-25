(function applyMeowdeV431Stability(){
  "use strict";

  const VALID_ACCESSORIES=new Set(["none","glasses","headphones","star","crown"]);
  const VALID_SCREENS=new Set(["home","map","lesson","room","my","profile","review","achievements"]);

  function normalizeState(){
    let changed=false;

    if(window.MeowAchievements&&window.MeowAchievements.state){
      const state=window.MeowAchievements.state;
      if(!VALID_ACCESSORIES.has(state.equippedAccessory)){
        state.equippedAccessory="none";
        changed=true;
      }
    }

    if(window.S){
      if(!VALID_SCREENS.has(S.screen)){
        S.screen="home";
        changed=true;
      }
      if(!Number.isFinite(Number(S.xp))||Number(S.xp)<0){S.xp=0;changed=true}
      if(!Number.isFinite(Number(S.churu))||Number(S.churu)<0){S.churu=0;changed=true}
      if(!Array.isArray(S.done)){S.done=[];changed=true}
      if(!Array.isArray(S.activityDates)){S.activityDates=[];changed=true}
      if(!S.dailyHistory||typeof S.dailyHistory!=="object"){S.dailyHistory={};changed=true}
    }

    if(changed&&typeof window.save==="function"){
      try{window.save()}catch(error){console.warn("Meowde stability save failed:",error)}
    }
    return changed;
  }

  function rerender(){
    if(!window.S)return;
    try{
      if(S.screen==="lesson"&&typeof window.renderLesson==="function")window.renderLesson();
      else if(S.screen==="room"&&typeof window.renderRoom==="function")window.renderRoom();
      else if(S.screen==="achievements"&&typeof window.renderAchievements==="function")window.renderAchievements();
      else if(S.screen==="map"&&typeof window.renderMap==="function")window.renderMap();
      else if(typeof window.renderHome==="function")window.renderHome();
    }catch(error){
      console.error("Meowde screen recovery failed:",error);
      try{S.screen="home";if(typeof window.save==="function")window.save();if(typeof window.renderHome==="function")window.renderHome()}catch(recoveryError){console.error("Meowde home recovery failed:",recoveryError)}
    }
  }

  function ensureSingleAccessory(svg){
    if(!(svg instanceof SVGElement))return;
    const accessories=svg.querySelectorAll(".v430-accessory");
    accessories.forEach((node,index)=>{if(index>0)node.remove()});
  }

  function inspectRenderedCats(){
    document.querySelectorAll("svg.meowde-cat-v430").forEach(ensureSingleAccessory);
  }

  const observer=new MutationObserver(()=>inspectRenderedCats());
  observer.observe(document.documentElement,{childList:true,subtree:true});

  normalizeState();
  inspectRenderedCats();
  window.addEventListener("pageshow",event=>{
    normalizeState();
    if(event.persisted)rerender();
  });
  window.addEventListener("error",event=>{
    const message=String(event&&event.message||"");
    if(/catSVG|render(Home|Lesson|Room|Achievements|Map)/.test(message))rerender();
  });

  window.MeowStabilityV431={normalizeState,inspectRenderedCats,rerender};
  window.__MEOWDE_VERSION__="4.31";
})();

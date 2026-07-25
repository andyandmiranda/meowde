(function applyMeowdeV435HomeScene(){
  "use strict";

  function preferredAccessory(){
    const state=window.MeowAchievements&&MeowAchievements.state;
    const equipped=state&&state.equippedAccessory;
    if(equipped==="headphones"||equipped==="glasses")return equipped;
    return "headphones";
  }

  function sceneMarkup(){
    const state=window.MeowAchievements&&MeowAchievements.state;
    const previous=state&&state.equippedAccessory;
    const accessory=preferredAccessory();
    let cat="";
    if(state)state.equippedAccessory=accessory;
    try{cat=typeof window.catSVG==="function"?catSVG(S.cat||"a","focus",112):""}
    finally{if(state)state.equippedAccessory=previous||"none"}
    return `<div class="v435-coding-scene" aria-label="Meowde coding on a laptop">${cat}<div class="v435-key-hands"></div><div class="v435-laptop"><div class="v435-laptop-screen"></div><div class="v435-laptop-base"></div></div><div class="v435-scene-note">ship it</div></div>`;
  }

  function decorateHome(){
    const hero=document.querySelector(".hero .hero-main");
    if(!hero||hero.querySelector(".v435-coding-scene"))return;
    const svg=hero.querySelector(":scope > svg.meowde-cat, :scope > .meowde-cat");
    if(svg)svg.outerHTML=sceneMarkup();
    else hero.insertAdjacentHTML("afterbegin",sceneMarkup());
  }

  const baseRenderHome=window.renderHome;
  if(typeof baseRenderHome==="function")window.renderHome=function(){
    baseRenderHome.apply(this,arguments);
    decorateHome();
  };

  window.MeowHomeScene={decorateHome,sceneMarkup,preferredAccessory};
  window.__MEOWDE_VERSION__="4.35";
  if(window.S&&S.screen==="home")decorateHome();
})();

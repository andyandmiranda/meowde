(function applyMeowdeV443SingleCompanion(){
  "use strict";

  const VERSION="4.43";
  const WRAPPED=Symbol("meowde-v443-wrapped");
  let decorationQueued=false;

  function isKorean(){
    return !window.S||S.lang!=="en";
  }

  function forceSingleCompanion(){
    if(!window.S||S.cat==="meowde")return false;
    S.cat="meowde";
    try{if(typeof window.save==="function")window.save()}catch(error){console.warn("Meowde companion state could not be saved:",error)}
    return true;
  }

  function normalizeNavigation(root=document){
    if(!root||typeof root.querySelectorAll!=="function")return;
    root.querySelectorAll('button[onclick*="renderRoom"]').forEach(button=>{
      const tabLabel=button.querySelector(":scope > span:last-child");
      if(button.closest(".tabbar")&&tabLabel){
        if(tabLabel.textContent!=="Meowde")tabLabel.textContent="Meowde";
      }else if(button.closest(".v420-profile-actions")){
        if(button.textContent.trim()!=="🐱 Meowde")button.textContent="🐱 Meowde";
      }
      button.setAttribute("aria-label",isKorean()?"Meowde 파트너":"Meowde companion");
    });
  }

  function normalizeRoom(){
    if(!window.S)return;
    forceSingleCompanion();
    const scroll=document.querySelector(".screen>.scroll");
    if(!scroll)return;

    const head=scroll.querySelector(".simple-head");
    if(head){
      const title=head.querySelector("h2");
      const copy=head.querySelector("p");
      if(title&&title.textContent!=="Meowde")title.textContent="Meowde";
      const expectedCopy=isKorean()
        ?"단 하나의 코딩 파트너와 성장 기록과 액세서리를 관리하세요."
        :"Manage growth and accessories for your one coding companion.";
      if(copy&&copy.textContent!==expectedCopy)copy.textContent=expectedCopy;
    }

    const grid=scroll.querySelector(".room-grid");
    if(!grid)return;
    grid.classList.add("v443-single-companion");

    const cards=Array.from(grid.querySelectorAll(".cat-card"));
    cards.slice(1).forEach(card=>card.remove());
    const card=cards[0];
    if(!card)return;
    card.classList.add("v443-companion-card");

    const title=card.querySelector("h3");
    const copy=card.querySelector("p");
    if(title&&title.textContent!=="Meowde")title.textContent="Meowde";
    const expectedCardCopy=isKorean()
      ?"함께 코딩하며 성장하는 나의 파트너"
      :"Your one companion for learning and growing through code";
    if(copy&&copy.textContent!==expectedCardCopy)copy.textContent=expectedCardCopy;

    const button=card.querySelector("button");
    if(button){
      button.disabled=true;
      button.className="v443-companion-status";
      const label=isKorean()?"나의 파트너":"My companion";
      if(button.textContent!==label)button.textContent=label;
      button.setAttribute("aria-label",label);
    }
  }

  function normalizeProfile(){
    const actions=document.querySelector(".v420-profile-actions");
    if(!actions)return;
    const roomButton=actions.querySelector('button[onclick*="renderRoom"]');
    if(roomButton&&roomButton.textContent.trim()!=="🐱 Meowde")roomButton.textContent="🐱 Meowde";
  }

  function decorate(root=document){
    forceSingleCompanion();
    normalizeNavigation(root);
    if(window.S&&["room","my"].includes(S.screen))normalizeRoom();
    if(window.S&&S.screen==="profile")normalizeProfile();
    document.documentElement.dataset.companionSystem="single";
  }

  function queueDecoration(root=document){
    if(decorationQueued)return;
    decorationQueued=true;
    requestAnimationFrame(()=>{
      decorationQueued=false;
      decorate(root&&root.isConnected?root:document);
    });
  }

  function wrapRenderer(name){
    const current=window[name];
    if(typeof current!=="function"||current[WRAPPED])return;
    function wrappedRenderer(){
      const result=current.apply(this,arguments);
      decorate();
      return result;
    }
    wrappedRenderer[WRAPPED]=true;
    window[name]=wrappedRenderer;
  }

  ["renderHome","renderMap","renderReview","renderRoom","renderMy","renderProfile","renderAchievements"].forEach(wrapRenderer);

  const observer=new MutationObserver(records=>{
    const added=records.some(record=>record.addedNodes&&record.addedNodes.length);
    if(added)queueDecoration(document);
  });
  observer.observe(document.documentElement,{childList:true,subtree:true});

  window.MeowSingleCompanion=Object.freeze({
    version:VERSION,
    decorate,
    normalizeRoom,
    normalizeProfile,
    normalizeNavigation,
    forceSingleCompanion
  });
  window.__MEOWDE_VERSION__=VERSION;
  decorate();
})();

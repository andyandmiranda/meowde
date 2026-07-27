(function applyMeowdeV447HeaderFlow(){
  "use strict";

  const VERSION="4.47";
  const WRAPPED=Symbol("meowde-v447-wrapped");
  const GENERAL_SCREENS=new Set(["home","map","review","room","my","profile","achievements","league"]);
  let queued=false;

  function currentScreen(){
    try{return window.S&&typeof S.screen==="string"?S.screen:"home"}catch(error){return "home"}
  }

  function isLesson(){return currentScreen()==="lesson"}

  function appRoot(){
    return document.getElementById("app")||document.querySelector(".app");
  }

  function currentScreenRoot(){
    const root=appRoot();
    return root&&root.querySelector(":scope > .screen");
  }

  function updateViewportMode(){
    const root=appRoot();
    if(!root)return;
    const viewportHeight=Math.min(window.innerHeight||9999,window.visualViewport&&window.visualViewport.height||9999);
    root.dataset.viewportHeight=String(Math.round(viewportHeight));
    root.classList.toggle("v447-compact-header",viewportHeight<720&&!isLesson());
    root.classList.toggle("v447-tight-header",viewportHeight<620&&!isLesson());
  }

  function resetStatusRail(root=currentScreenRoot()){
    if(!root)return;
    const status=root.querySelector(":scope > .status");
    if(status&&status.scrollLeft!==0)status.scrollLeft=0;
  }

  function resetGeneralScroll(root=currentScreenRoot(),force=false){
    if(!root||isLesson())return false;
    const screen=currentScreen();
    if(!force&&!GENERAL_SCREENS.has(screen))return false;
    const scroller=root.querySelector(":scope > .scroll");
    if(!scroller)return false;
    scroller.style.scrollBehavior="auto";
    scroller.scrollTop=0;
    scroller.scrollLeft=0;
    requestAnimationFrame(()=>{
      scroller.scrollTop=0;
      scroller.scrollLeft=0;
      scroller.style.removeProperty("scroll-behavior");
    });
    return true;
  }

  function markHeader(root=currentScreenRoot()){
    if(!root)return;
    const top=root.querySelector(":scope > .top");
    const status=root.querySelector(":scope > .status");
    if(top)top.dataset.meowdeHeader="brand";
    if(status)status.dataset.meowdeHeader="status";
    root.dataset.meowdeScreen=currentScreen();
  }

  function stabilize(options={}){
    const root=currentScreenRoot();
    if(!root)return;
    markHeader(root);
    updateViewportMode();
    resetStatusRail(root);
    if(options.resetScroll)resetGeneralScroll(root,true);
    document.documentElement.dataset.headerFlowVersion=VERSION;
  }

  function queueStabilize(options={}){
    if(queued)return;
    queued=true;
    requestAnimationFrame(()=>{
      queued=false;
      stabilize(options);
    });
  }

  function wrapRenderer(name){
    const current=window[name];
    if(typeof current!=="function"||current[WRAPPED])return;
    function wrappedRenderer(){
      const result=current.apply(this,arguments);
      queueStabilize({resetScroll:name!=="renderLesson"});
      return result;
    }
    wrappedRenderer[WRAPPED]=true;
    window[name]=wrappedRenderer;
  }

  ["renderHome","renderMap","renderReview","renderRoom","renderMy","renderProfile","renderAchievements","renderLeague","renderLesson"].forEach(wrapRenderer);

  const observer=new MutationObserver(records=>{
    if(records.some(record=>record.addedNodes&&record.addedNodes.length))queueStabilize({resetScroll:false});
  });
  observer.observe(document.documentElement,{childList:true,subtree:true});

  window.addEventListener("resize",()=>queueStabilize({resetScroll:false}),{passive:true});
  window.visualViewport?.addEventListener("resize",()=>queueStabilize({resetScroll:false}),{passive:true});
  window.addEventListener("pageshow",event=>{
    stabilize({resetScroll:Boolean(event.persisted)&&!isLesson()});
  });

  window.MeowHeaderFlow=Object.freeze({
    version:VERSION,
    stabilize,
    resetGeneralScroll,
    resetStatusRail,
    updateViewportMode
  });
  window.__MEOWDE_VERSION__=VERSION;
  stabilize({resetScroll:false});
})();

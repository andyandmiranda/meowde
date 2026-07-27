(function applyMeowdeV446UpdateRecovery(){
  "use strict";

  const VERSION="4.46";
  const UPDATE_PARAM="_meowde_update";
  let bannerObserver=null;
  let mutationQueued=false;

  function isLessonScreen(){
    try{return Boolean(window.S&&S.screen==="lesson")}catch(error){return false}
  }

  function scrollContainer(){
    return document.querySelector(".screen>.scroll");
  }

  function resetScroll(){
    if(isLessonScreen())return false;
    const container=scrollContainer();
    if(container)container.scrollTo({top:0,left:0,behavior:"auto"});
    window.scrollTo({top:0,left:0,behavior:"auto"});
    return true;
  }

  function removeUpdateParameter(){
    const url=new URL(window.location.href);
    if(!url.searchParams.has(UPDATE_PARAM))return;
    url.searchParams.delete(UPDATE_PARAM);
    const query=url.searchParams.toString();
    history.replaceState(history.state,"",`${url.pathname}${query?`?${query}`:""}${url.hash}`);
  }

  function recoverAfterUpdate(){
    const url=new URL(window.location.href);
    if(!url.searchParams.has(UPDATE_PARAM))return false;
    if("scrollRestoration" in history)history.scrollRestoration="manual";
    if(isLessonScreen()){
      removeUpdateParameter();
      return false;
    }
    resetScroll();
    requestAnimationFrame(()=>{
      resetScroll();
      requestAnimationFrame(resetScroll);
    });
    window.setTimeout(resetScroll,80);
    window.setTimeout(()=>{
      resetScroll();
      removeUpdateParameter();
    },260);
    return true;
  }

  function clearBannerLayout(){
    document.documentElement.classList.remove("has-meowde-pwa-banner");
    document.documentElement.style.removeProperty("--meowde-pwa-banner-height");
    if(bannerObserver){bannerObserver.disconnect();bannerObserver=null}
  }

  function measureBanner(){
    const banner=document.querySelector(".meowde-pwa-banner");
    if(!banner){clearBannerLayout();return}
    document.documentElement.classList.add("has-meowde-pwa-banner");
    const height=Math.ceil(banner.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--meowde-pwa-banner-height",`${height}px`);
    if(!bannerObserver&&"ResizeObserver" in window){
      bannerObserver=new ResizeObserver(()=>measureBanner());
      bannerObserver.observe(banner);
    }
  }

  function queueMeasure(){
    if(mutationQueued)return;
    mutationQueued=true;
    requestAnimationFrame(()=>{
      mutationQueued=false;
      measureBanner();
    });
  }

  const observer=new MutationObserver(queueMeasure);
  observer.observe(document.documentElement,{childList:true,subtree:true});

  if("scrollRestoration" in history&&new URL(window.location.href).searchParams.has(UPDATE_PARAM)){
    history.scrollRestoration="manual";
  }

  recoverAfterUpdate();
  measureBanner();
  window.addEventListener("pageshow",recoverAfterUpdate);
  window.addEventListener("resize",queueMeasure,{passive:true});

  window.MeowUpdateRecovery=Object.freeze({
    version:VERSION,
    recoverAfterUpdate,
    resetScroll,
    measureBanner
  });
})();

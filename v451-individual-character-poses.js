(function applyMeowdeV451IndividualCharacterPoses(){
  "use strict";

  const VERSION="4.51";
  const ASSET_VERSION="4514";
  const ASSETS=Object.freeze({
    base:`/assets/characters/v451/meowde-base.svg?v=${ASSET_VERSION}`,
    happy:`/assets/characters/v451/meowde-happy.webp?v=${ASSET_VERSION}`,
    smug:`/assets/characters/v451/meowde-challenge.webp?v=${ASSET_VERSION}`,
    challenge:`/assets/characters/v451/meowde-challenge.webp?v=${ASSET_VERSION}`,
    focus:`/assets/characters/v451/meowde-coding.webp?v=${ASSET_VERSION}`,
    surprised:`/assets/characters/v451/meowde-happy.webp?v=${ASSET_VERSION}`,
    meh:`/assets/characters/v451/meowde-base.svg?v=${ASSET_VERSION}`,
    coding:`/assets/characters/v451/meowde-coding.webp?v=${ASSET_VERSION}`,
    music:`/assets/characters/v451/meowde-music.webp?v=${ASSET_VERSION}`,
    reading:`/assets/characters/v451/meowde-reading.webp?v=${ASSET_VERSION}`,
    error:`/assets/characters/v451/meowde-debug.webp?v=${ASSET_VERSION}`
  });
  let queued=false;

  function applyPose(node){
    if(!(node instanceof HTMLImageElement))return;
    if(!node.classList.contains("v449-character"))return;
    const pose=node.dataset.v449Pose||"base";
    const source=ASSETS[pose]||ASSETS.base;
    if(node.getAttribute("src")!==source)node.setAttribute("src",source);
    node.dataset.characterVersion=VERSION;
    node.decoding="async";
    node.loading=node.closest(".hero,.coach,.feedback,.reward-screen")?"eager":"lazy";
    node.onerror=()=>{
      node.onerror=null;
      node.src=ASSETS.base;
      node.dataset.assetFallback="true";
    };
  }

  function decorate(root=document){
    if(root instanceof HTMLImageElement)applyPose(root);
    root.querySelectorAll?.("img.v449-character[data-v449-pose]").forEach(applyPose);
    document.documentElement.dataset.individualCharacterPoses=VERSION;
    window.__MEOWDE_CHARACTER_ASSET_VERSION__=ASSET_VERSION;
  }

  function queue(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(()=>{queued=false;decorate()});
  }

  new MutationObserver(records=>{
    for(const record of records){
      if(record.type==="attributes"){applyPose(record.target);continue}
      record.addedNodes.forEach(node=>{if(node.nodeType===1)decorate(node)});
    }
  }).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:["data-v449-pose","src"]});

  window.MeowIndividualCharacterPoses=Object.freeze({version:VERSION,assetVersion:ASSET_VERSION,assets:ASSETS,decorate});
  decorate();
})();
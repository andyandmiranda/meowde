(function applyMeowdeV451IndividualCharacterPoses(){
  "use strict";

  const VERSION="4.51";
  const ASSETS=Object.freeze({
    base:"/assets/characters/v451/meowde-base.svg?v=4513",
    happy:"/assets/characters/v451/meowde-happy.svg?v=4513",
    smug:"/assets/characters/v451/meowde-challenge.svg?v=4513",
    challenge:"/assets/characters/v451/meowde-challenge.svg?v=4513",
    focus:"/assets/characters/v451/meowde-coding.svg?v=4513",
    surprised:"/assets/characters/v451/meowde-happy.svg?v=4513",
    meh:"/assets/characters/v451/meowde-base.svg?v=4513",
    coding:"/assets/characters/v451/meowde-coding.svg?v=4513",
    music:"/assets/characters/v451/meowde-music.svg?v=4513",
    reading:"/assets/characters/v451/meowde-reading.svg?v=4513",
    error:"/assets/characters/v451/meowde-debug.svg?v=4513"
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
    window.__MEOWDE_VERSION__=VERSION;
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

  window.MeowIndividualCharacterPoses=Object.freeze({version:VERSION,assets:ASSETS,decorate});
  decorate();
})();
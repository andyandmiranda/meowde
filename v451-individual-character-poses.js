(function applyMeowdeV451IndividualCharacterPoses(){
  "use strict";

  const VERSION="4.51";
  const ASSETS=Object.freeze({
    base:"/assets/meowde-approved-base.svg?v=451",
    happy:"/assets/meowde-happy.svg?v=451",
    smug:"/assets/meowde-smug.svg?v=451",
    focus:"/assets/meowde-focus.svg?v=451",
    surprised:"/assets/meowde-surprised.svg?v=451",
    meh:"/assets/meowde-meh.svg?v=451",
    coding:"/assets/meowde-coding-cutout.svg?v=451",
    music:"/assets/meowde-music.svg?v=451",
    reading:"/assets/meowde-reading.svg?v=451",
    error:"/assets/meowde-error.svg?v=451"
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
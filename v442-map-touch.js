(function applyMeowdeV442MapTouch(){
  "use strict";

  const VERSION="4.42-phase5-bootstrap";
  const UNIT_SIZE=10;
  let queued=false;

  function state(){
    try{return typeof S!=="undefined"&&S?S:null}catch(error){return null}
  }

  function lessonCount(){
    try{return typeof lessons==="function"&&Array.isArray(lessons())?lessons().length:0}catch(error){return 0}
  }

  function normalizeMapState(){
    const current=state();
    if(!current)return false;
    let changed=false;
    if(current.screen==="study"){current.screen="map";changed=true}
    const unitCount=Math.max(1,Math.ceil(lessonCount()/UNIT_SIZE));
    const unit=Math.max(0,Math.min(Number(current.unit)||0,unitCount-1));
    if(current.unit!==unit){current.unit=unit;changed=true}
    if(changed&&typeof save==="function")save();
    return changed;
  }

  function activateMapTab(){
    const bar=document.querySelector(".tabbar");
    if(!bar)return;
    const buttons=Array.from(bar.querySelectorAll("button"));
    buttons.forEach(button=>button.classList.remove("on"));
    const mapButton=buttons.find(button=>String(button.getAttribute("onclick")||"").includes("renderMap"));
    if(mapButton){
      mapButton.classList.add("on");
      mapButton.setAttribute("aria-current","page");
    }
    buttons.filter(button=>button!==mapButton).forEach(button=>button.removeAttribute("aria-current"));
  }

  function linkedNode(label){
    if(!(label instanceof Element))return null;
    const direct=label.previousElementSibling;
    if(direct&&direct.matches("button.node"))return direct;
    const trail=label.closest(".trail");
    if(!trail)return null;
    const labels=Array.from(trail.querySelectorAll(".node-label"));
    const index=labels.indexOf(label);
    const nodes=Array.from(trail.querySelectorAll("button.node"));
    return index>=0?nodes[index]||null:null;
  }

  function decorateMap(){
    normalizeMapState();
    if(!state()||state().screen!=="map")return false;
    activateMapTab();
    const trail=document.querySelector(".trail");
    if(!trail)return false;
    trail.classList.add("v442-map-ready");
    const unit=Math.max(0,Number(state().unit)||0);
    const nodes=Array.from(trail.querySelectorAll("button.node"));
    const labels=Array.from(trail.querySelectorAll(".node-label"));

    nodes.forEach((node,index)=>{
      const lessonIndex=unit*UNIT_SIZE+index;
      const label=labels[index];
      node.type="button";
      node.dataset.lessonIndex=String(lessonIndex);
      node.style.touchAction="manipulation";
      if(label){
        const id=`meowde-map-label-${lessonIndex}`;
        label.id=id;
        label.dataset.lessonIndex=String(lessonIndex);
        label.setAttribute("role","button");
        label.setAttribute("tabindex","0");
        label.setAttribute("aria-label",node.getAttribute("aria-label")||label.textContent.trim());
        node.setAttribute("aria-describedby",id);
      }
    });
    document.documentElement.dataset.mapTouchSurface="enhancement-only";
    return true;
  }

  function triggerLabel(label,event){
    const node=linkedNode(label);
    if(!node)return;
    event.preventDefault();
    event.stopPropagation();
    node.focus({preventScroll:true});
    node.click();
  }

  document.addEventListener("click",event=>{
    const label=event.target instanceof Element?event.target.closest(".trail .node-label"):null;
    if(label)triggerLabel(label,event);
  });

  document.addEventListener("keydown",event=>{
    if(event.key!=="Enter"&&event.key!==" ")return;
    const label=event.target instanceof Element?event.target.closest(".trail .node-label"):null;
    if(label)triggerLabel(label,event);
  });

  function queueDecorate(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(()=>{queued=false;decorateMap()});
  }
  const observer=new MutationObserver(records=>{
    if(!state()||state().screen!=="map")return;
    if(records.some(record=>record.addedNodes&&record.addedNodes.length))queueDecorate();
  });
  observer.observe(document.documentElement,{childList:true,subtree:true});

  // Phase 5-7: accessibility/touch behavior is enhancement-only. It no longer
  // wraps tabs() or renderMap(), so v4.13 remains the sole Learn DOM owner.
  window.MeowMapTouch=Object.freeze({version:VERSION,decorateMap,activateMapTab,normalizeMapState});
  window.__MEOWDE_MAP_TOUCH_VERSION__=VERSION;
  document.documentElement.dataset.learnTouchOwnership="canonical-v413";

  const current=state();
  if(current&&(current.screen==="map"||current.screen==="study"))queueDecorate();
})();
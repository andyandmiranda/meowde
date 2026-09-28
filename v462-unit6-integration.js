(function applyMeowdeV462Unit6Integration(){
  "use strict";

  const VERSION="4.62-unit6-integration";
  const UNIT_INDEX=5;
  const LABELS={ko:"06 객체·상태·프로젝트",en:"06 Objects, State & Projects"};
  const NAMES={ko:"객체·상태·프로젝트",en:"Objects, State & Projects"};

  function state(){try{return typeof S!=="undefined"&&S&&typeof S==="object"?S:null}catch(error){return null}}
  function language(){const current=state();return current&&current.lang==="en"?"en":"ko"}
  function label(){return LABELS[language()]}
  function name(){return NAMES[language()]}
  function lessonCount(){return Array.isArray(window.MEOWDE_LESSONS_KO)?window.MEOWDE_LESSONS_KO.length:0}

  function restoreExpandedProgress(){
    const recovery=window.meowdeV425;
    const restored=Boolean(recovery&&typeof recovery.restoreDeferredProgress==="function"&&recovery.restoreDeferredProgress());
    const current=state();
    let unlocked=false;
    if(current&&lessonCount()>=60&&Array.isArray(current.done)){
      const completedUnit5=Array.from({length:50},(_,index)=>index).every(index=>current.done.includes(index));
      if(completedUnit5&&Number(current.next)<50){
        current.next=50;
        if(typeof save==="function")save();
        unlocked=true;
      }
    }
    return Object.freeze({restored,unlocked});
  }

  const progressRecovery=restoreExpandedProgress();

  function decorateMap(){
    const current=state();
    if(!current||current.screen!=="map"||lessonCount()<60)return;
    const tabs=document.querySelector(".unit-tabs");
    if(!tabs)return;
    let button=tabs.querySelector('[data-v462-unit="6"]');
    if(!button){
      button=document.createElement("button");
      button.type="button";
      button.dataset.v462Unit="6";
      button.addEventListener("click",()=>{
        const active=state();if(!active)return;
        active.unit=UNIT_INDEX;
        if(typeof save==="function")save();
        if(typeof renderMap==="function")renderMap();
      });
      tabs.appendChild(button);
    }
    const nextLabel=label();
    if(button.textContent!==nextLabel)button.textContent=nextLabel;
    const shouldBeOn=Number(current.unit)===UNIT_INDEX;
    if(button.classList.contains("on")!==shouldBeOn)button.classList.toggle("on",shouldBeOn);
  }

  function decorateHome(){
    const current=state();
    if(!current||current.screen!=="home"||lessonCount()<60)return;
    const next=Math.max(0,Number(current.next)||0);
    if(Math.floor(next/10)!==UNIT_INDEX)return;
    const unitName=name();
    const title=document.querySelector(".phase1-unit-copy b");
    if(title&&title.textContent!==unitName)title.textContent=unitName;
    const kicker=document.querySelector(".phase1-hero .section-kicker");
    if(kicker){
      const lessonMatch=kicker.textContent.match(/^Lesson\s+\d+/i);
      const nextText=lessonMatch?`${lessonMatch[0]} · ${unitName}`:unitName;
      if(kicker.textContent!==nextText)kicker.textContent=nextText;
    }
  }

  function decorateMilestone(){
    if(lessonCount()<60)return;
    const heading=document.querySelector(".v416-milestone-card h3");
    if(!heading)return;
    const generic=language()==="ko"?"유닛 6":"Unit 6";
    if(heading.textContent.includes(generic))heading.textContent=heading.textContent.replace(generic,name());
  }

  function decorate(){decorateMap();decorateHome();decorateMilestone()}
  const root=document.getElementById("app")||document.body;
  const observer=new MutationObserver(()=>decorate());
  if(root)observer.observe(root,{childList:true,subtree:true});
  decorate();

  window.MeowUnit6Integration=Object.freeze({version:VERSION,unitIndex:UNIT_INDEX,label,name,decorate,observer,progressRecovery});
  document.documentElement.dataset.unit6Integration="v462";
  window.__MEOWDE_VERSION__=VERSION;
})();
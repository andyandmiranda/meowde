(function applyMeowdeV459Unit5Integration(){
  "use strict";

  const VERSION="4.59-unit5-integration";
  const UNIT_INDEX=4;
  const LABELS={ko:"05 예외·모듈·파일",en:"05 Exceptions, Modules & Files"};
  const NAMES={ko:"예외·모듈·파일",en:"Exceptions, Modules & Files"};

  function state(){try{return typeof S!=="undefined"&&S&&typeof S==="object"?S:null}catch(error){return null}}
  function language(){const current=state();return current&&current.lang==="en"?"en":"ko"}
  function label(){return LABELS[language()]}
  function name(){return NAMES[language()]}
  function lessonCount(){return Array.isArray(window.MEOWDE_LESSONS_KO)?window.MEOWDE_LESSONS_KO.length:0}
  function hiddenFailure(){
    const api=window.MeowWriteGrading;
    if(!api||typeof api.lastResult!=="function")return null;
    const result=api.lastResult();
    return result&&result.visiblePassed===true&&result.passed===false?result:null;
  }

  function restoreExpandedProgress(){
    const recovery=window.meowdeV425;
    const restored=Boolean(recovery&&typeof recovery.restoreDeferredProgress==="function"&&recovery.restoreDeferredProgress());
    const current=state();
    let unlocked=false;
    if(current&&lessonCount()>=50&&Array.isArray(current.done)){
      const completedUnit4=Array.from({length:40},(_,index)=>index).every(index=>current.done.includes(index));
      if(completedUnit4&&Number(current.next)<40){
        current.next=40;
        if(typeof save==="function")save();
        unlocked=true;
      }
    }
    return Object.freeze({restored,unlocked});
  }

  const progressRecovery=restoreExpandedProgress();

  const baseDiagnostic=window.MeowDiagnosticFeedback;
  if(baseDiagnostic&&typeof baseDiagnostic.diagnose==="function"){
    const baseDiagnose=baseDiagnostic.diagnose.bind(baseDiagnostic);
    const diagnose=function(exercise){
      const current=state();
      if(exercise&&exercise.type==="write"&&current&&current.checked&&!current.correct&&hiddenFailure()&&exercise.diagnostic){
        const detail=exercise.diagnostic[language()];
        if(detail)return Object.assign({kind:"generalization"},detail);
      }
      return baseDiagnose(exercise);
    };
    window.MeowDiagnosticFeedback=Object.freeze(Object.assign({},baseDiagnostic,{version:VERSION,diagnose}));
  }

  function decorateMap(){
    const current=state();
    if(!current||current.screen!=="map"||lessonCount()<50)return;
    const tabs=document.querySelector(".unit-tabs");
    if(!tabs)return;
    let button=tabs.querySelector('[data-v459-unit="5"]');
    if(!button){
      button=document.createElement("button");
      button.type="button";
      button.dataset.v459Unit="5";
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
    if(!current||current.screen!=="home"||lessonCount()<50)return;
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
    if(lessonCount()<50)return;
    const heading=document.querySelector(".v416-milestone-card h3");
    if(!heading)return;
    const generic=language()==="ko"?"유닛 5":"Unit 5";
    if(heading.textContent.includes(generic))heading.textContent=heading.textContent.replace(generic,name());
  }

  function decorate(){decorateMap();decorateHome();decorateMilestone()}
  const root=document.getElementById("app")||document.body;
  const observer=new MutationObserver(()=>decorate());
  if(root)observer.observe(root,{childList:true,subtree:true});
  decorate();

  window.MeowUnit5Integration=Object.freeze({version:VERSION,unitIndex:UNIT_INDEX,label,name,decorate,observer,progressRecovery});
  document.documentElement.dataset.unit5Integration="v459";
  window.__MEOWDE_VERSION__=VERSION;
})();
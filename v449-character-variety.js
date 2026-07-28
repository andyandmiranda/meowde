(function applyMeowdeV449CharacterVariety(){
  "use strict";

  const VERSION="4.49";
  const ASSETS=Object.freeze({
    base:"/assets/meowde-approved-base.svg?v=4481",
    coding:"/assets/meowde-coding-cutout.svg?v=4493",
    happy:"/assets/meowde-happy.svg?v=4493",
    focus:"/assets/meowde-focus.svg?v=4493",
    surprised:"/assets/meowde-surprised.svg?v=4493",
    smug:"/assets/meowde-smug.svg?v=4493",
    meh:"/assets/meowde-meh.svg?v=4493",
    music:"/assets/meowde-music.svg?v=4493",
    reading:"/assets/meowde-reading.svg?v=4493",
    error:"/assets/meowde-error.svg?v=4493"
  });
  const DIMENSIONS=Object.freeze({
    base:[139,190],coding:[180,140],happy:[141,135],focus:[139,131],
    surprised:[137,131],smug:[100,94],meh:[100,92],music:[89,100],
    reading:[85,100],error:[100,64]
  });
  const RENDERERS=["renderHome","renderMap","renderLesson","renderReview","renderRoom","renderProfile","renderAchievements","renderLeague"];
  let queued=false;

  function appState(){
    try{return typeof S!=="undefined"&&S?S:{}}catch(error){return {}}
  }
  function ko(){return appState().lang!=="en"}
  function poseMarkup(pose,className="",alt="Meowde"){
    const key=ASSETS[pose]?pose:"base";
    const [width,height]=DIMENSIONS[key]||DIMENSIONS.base;
    return `<img class="v449-pose ${className}" data-meowde-pose="${key}" src="${ASSETS[key]}" alt="${alt}" width="${width}" height="${height}">`;
  }
  function directMascot(container){
    if(!container)return null;
    return Array.from(container.children).find(node=>node.matches&&node.matches(".v449-pose,.meowde-cat,.meowde-approved-character,svg"))||null;
  }
  function setPose(container,pose,className="",alt="Meowde"){
    if(!container)return null;
    const current=directMascot(container);
    if(current&&current.classList.contains("v449-pose")&&current.dataset.meowdePose===pose){
      className.split(/\s+/).filter(Boolean).forEach(name=>current.classList.add(name));
      return current;
    }
    const markup=poseMarkup(pose,className,alt);
    if(current)current.outerHTML=markup;
    else container.insertAdjacentHTML("afterbegin",markup);
    return directMascot(container);
  }
  function currentExercise(){
    try{return typeof cur==="function"?cur():null}catch(error){return null}
  }
  function runtimeErrorVisible(){
    const state=appState();
    const text=[state.output,state.error]
      .concat(Array.from(document.querySelectorAll(".console,.v431-runtime-error,.v446-runtime-error")).map(node=>node.textContent))
      .filter(Boolean).join(" ");
    return /(traceback|syntaxerror|nameerror|typeerror|exception|runtimeerror|오류|에러)/i.test(text);
  }
  function lessonPose(){
    const state=appState();
    const exercise=currentExercise();
    if(runtimeErrorVisible())return "error";
    if(state.checked)return state.correct?"happy":"surprised";
    if(exercise&&exercise.type==="concept")return "reading";
    return "focus";
  }
  function decorateLesson(){
    if(!document.querySelector(".lesson-main,.lesson-bg"))return;
    const pose=lessonPose();
    document.querySelectorAll(".coach").forEach(coach=>{
      coach.classList.add("v449-variety-coach");
      setPose(coach,pose,"v449-lesson-pose",ko()?"학습 상태를 표현하는 Meowde":"Meowde reacting to the lesson");
    });
    document.documentElement.dataset.lessonPose=pose;
  }
  function decorateMap(){
    document.querySelectorAll(".trail-cat").forEach(slot=>{
      slot.classList.add("v449-variety-trail");
      setPose(slot,"smug","v449-map-pose",ko()?"현재 위치에서 자신만만한 Meowde":"Confident Meowde at the current lesson");
    });
  }
  function rewardAccuracy(screen){
    const value=screen&&screen.querySelector(".stats3 .stat3:nth-child(3) b");
    const match=value&&String(value.textContent||"").match(/\d+/);
    return match?Number(match[0]):100;
  }
  function decorateReward(){
    document.querySelectorAll(".reward-screen").forEach(screen=>{
      const accuracy=rewardAccuracy(screen);
      const pose=accuracy>=85?"happy":accuracy>=65?"smug":"meh";
      setPose(screen,pose,"v449-reward-pose",ko()?"학습 결과에 반응하는 Meowde":"Meowde reacting to the result");
      screen.dataset.meowdeRewardPose=pose;
    });
  }
  function decorateProfile(){
    document.querySelectorAll(".v420-avatar").forEach(slot=>{
      setPose(slot,"music","v449-profile-pose",ko()?"헤드폰으로 쉬는 Meowde":"Meowde relaxing with headphones");
    });
  }
  function reviewPose(){
    const mistakes=Array.isArray(appState().mistakes)?appState().mistakes.length:0;
    return mistakes>0?"meh":"smug";
  }
  function decorateReview(){
    if(appState().screen!=="review")return;
    const pose=reviewPose();
    const head=document.querySelector(".screen .simple-head");
    if(head){
      head.classList.add("v449-review-head");
      const current=head.querySelector(":scope > .v449-review-pose");
      if(current&&current.dataset.meowdePose!==pose)current.outerHTML=poseMarkup(pose,"v449-review-pose",ko()?"복습 상태를 보여주는 Meowde":"Meowde showing review status");
      else if(!current)head.insertAdjacentHTML("beforeend",poseMarkup(pose,"v449-review-pose",ko()?"복습 상태를 보여주는 Meowde":"Meowde showing review status"));
    }
    document.querySelectorAll(".v417-smart-card").forEach(card=>{
      card.classList.add("v449-smart-card");
      if(!card.querySelector(":scope > .v449-smart-pose"))card.insertAdjacentHTML("beforeend",poseMarkup("reading","v449-smart-pose",ko()?"맞춤 복습을 준비하는 Meowde":"Meowde preparing smart review"));
    });
  }
  function cardHeading(card){
    const heading=card&&card.querySelector("h3");
    return heading?heading.textContent.trim().toLowerCase():"";
  }
  function addHomeCardPose(card,pose,label){
    if(!card||card.querySelector(":scope > .v449-card-pose"))return;
    card.classList.add("v449-pose-card");
    card.insertAdjacentHTML("beforeend",poseMarkup(pose,"v449-card-pose",label));
  }
  function decorateHomeCards(){
    if(appState().screen!=="home")return;
    document.querySelectorAll(".screen .scroll > .card").forEach(card=>{
      if(card.classList.contains("hero")||card.classList.contains("v427-growth-card"))return;
      const title=cardHeading(card);
      if(title.includes("challenge")||title.includes("챌린지"))addHomeCardPose(card,"music",ko()?"코딩 리듬을 즐기는 Meowde":"Meowde enjoying a coding rhythm");
      else if(title.includes("goal")||title.includes("목표")||title.includes("quest"))addHomeCardPose(card,"reading",ko()?"다음 목표를 읽는 Meowde":"Meowde reading the next quest");
      else if(title.includes("next")||title.includes("다음")||title.includes("저장"))addHomeCardPose(card,"smug",ko()?"다음 레슨을 준비한 Meowde":"Meowde ready for the next lesson");
    });
  }
  function decorateRecovery(){
    document.querySelectorAll(".v434-release-error,.v446-update-recovery,.v446-recovery-panel").forEach(panel=>{
      panel.classList.add("v449-character-error");
      if(!panel.querySelector(":scope > .v449-error-pose"))panel.insertAdjacentHTML("afterbegin",poseMarkup("error","v449-error-pose",ko()?"오류를 확인하는 Meowde":"Meowde checking an error"));
    });
  }
  function decorate(){
    decorateLesson();
    decorateMap();
    decorateReward();
    decorateProfile();
    decorateReview();
    decorateHomeCards();
    decorateRecovery();
    document.documentElement.dataset.characterVariety=VERSION;
  }
  function queue(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(()=>{queued=false;decorate()});
  }
  RENDERERS.forEach(name=>{
    const current=window[name];
    if(typeof current!=="function"||current.__meowdeV449Variety)return;
    function wrapped(){
      const result=current.apply(this,arguments);
      queue();
      return result;
    }
    wrapped.__meowdeV449Variety=true;
    window[name]=wrapped;
  });
  const observer=new MutationObserver(queue);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  window.MeowCharacterVariety=Object.freeze({version:VERSION,assets:ASSETS,decorate,lessonPose,setPose});
  window.__MEOWDE_VERSION__=VERSION;
  decorate();
})();

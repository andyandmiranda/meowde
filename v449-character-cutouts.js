(function applyMeowdeV450CharacterImages(){
  "use strict";

  const VERSION="4.50";
  const POSES=new Set(["base","happy","smug","focus","surprised","meh","coding","music","reading","error"]);
  const ASSETS={
    base:"/assets/meowde-approved-base.svg?v=450",
    happy:"/assets/meowde-approved-base.svg?v=450",
    smug:"/assets/meowde-approved-glasses.svg?v=450",
    focus:"/assets/meowde-approved-base.svg?v=450",
    surprised:"/assets/meowde-approved-base.svg?v=450",
    meh:"/assets/meowde-approved-base.svg?v=450",
    coding:"/assets/meowde-approved-headphones.svg?v=450",
    music:"/assets/meowde-approved-headphones.svg?v=450",
    reading:"/assets/meowde-approved-base.svg?v=450",
    error:"/assets/meowde-approved-base.svg?v=450"
  };
  let queued=false;

  function state(){try{return window.S&&S?S:{}}catch(error){return {}}}
  function english(){return state().lang==="en"}
  function exercise(){try{return typeof cur==="function"?cur():null}catch(error){return null}}
  function runtimeError(){
    const value=[state().output,state().error]
      .concat(Array.from(document.querySelectorAll(".console,.v431-runtime-error,.v446-runtime-error")).map(node=>node.textContent))
      .filter(Boolean).join(" ");
    return /(traceback|syntaxerror|nameerror|typeerror|exception|runtimeerror|오류|에러)/i.test(value);
  }
  function safePose(pose){return POSES.has(pose)?pose:"base"}
  function imageMarkup(pose="base",extraClass="",label="Meowde"){
    const safe=safePose(pose);
    return `<img class="v449-character v449-pose-${safe} ${extraClass}" src="${ASSETS[safe]}" alt="${label}" data-v449-pose="${safe}" data-character-version="${VERSION}" decoding="async">`;
  }
  function updateImage(node,pose,extraClass="",label="Meowde"){
    if(!node)return null;
    const safe=safePose(pose);
    if(node.tagName==="IMG"&&node.classList.contains("v449-character")){
      node.src=ASSETS[safe];
      node.alt=label;
      POSES.forEach(item=>node.classList.remove(`v449-pose-${item}`));
      node.classList.add(`v449-pose-${safe}`);
      extraClass.split(/\s+/).filter(Boolean).forEach(item=>node.classList.add(item));
      node.dataset.v449Pose=safe;
      return node;
    }
    const holder=document.createElement("div");
    holder.innerHTML=imageMarkup(safe,extraClass,label);
    const replacement=holder.firstElementChild;
    node.replaceWith(replacement);
    return replacement;
  }
  function replaceSlot(root,selector,pose,extraClass,label){
    if(!root)return null;
    const current=root.querySelector(selector);
    if(current)return updateImage(current,pose,extraClass,label);
    root.insertAdjacentHTML("afterbegin",imageMarkup(pose,extraClass,label));
    return root.querySelector(`.${extraClass.split(/\s+/)[0]||"v449-character"}`);
  }

  function decorateHero(){
    const hero=document.querySelector(".hero");
    if(!hero)return;
    let scene=hero.querySelector(".v449-coding-scene");
    if(!scene){
      const current=hero.querySelector(".v448-approved-hero,.v444-coding-scene,.v435-coding-scene");
      const label=english()?"Meowde learning with headphones":"헤드폰을 쓰고 학습하는 Meowde";
      const markup=`<div class="v444-coding-scene v448-approved-hero v449-coding-scene">${imageMarkup("coding","",label)}</div>`;
      if(current)current.outerHTML=markup;
      else (hero.querySelector(".hero-main")||hero).insertAdjacentHTML("afterbegin",markup);
      scene=hero.querySelector(".v449-coding-scene");
    }
    scene.querySelectorAll(".v449-character").forEach((node,index)=>{if(index)node.remove()});
    const character=scene.querySelector(".v449-character");
    if(character)updateImage(character,"coding","",english()?"Meowde learning with headphones":"헤드폰을 쓰고 학습하는 Meowde");
  }
  function decorateBrand(){
    const mark=document.querySelector(".brand-mark");
    if(!mark)return;
    mark.innerHTML=imageMarkup("base","v448-brand-cat","Meowde");
  }
  function level(){
    const current=window.MeowGrowth&&typeof MeowGrowth.stage==="function"?MeowGrowth.stage():null;
    const stages=window.MeowGrowth&&Array.isArray(MeowGrowth.stages)?MeowGrowth.stages:[];
    return Math.max(1,stages.findIndex(item=>current&&item.id===current.id)+1);
  }
  function growthPose(value){return ["base","happy","smug","focus","surprised"][Math.max(0,Math.min(4,value-1))]}
  function decorateGrowth(){
    const slot=document.querySelector(".v427-growth-card .v427-stage-icon");
    if(!slot)return;
    const value=level();
    slot.innerHTML=`${imageMarkup(growthPose(value),"v448-growth-cat",`Meowde level ${value}`)}<span class="v448-level-badge" aria-label="Level ${value}">${value}</span>`;
  }
  function lessonPose(){
    if(runtimeError())return "error";
    if(state().checked)return state().correct?"happy":"surprised";
    if(exercise()&&exercise().type==="concept")return "reading";
    return "focus";
  }
  function decorateCoach(){
    const pose=lessonPose();
    document.querySelectorAll(".coach").forEach(coach=>{
      const current=coach.querySelector(":scope > .v449-character,:scope > .meowde-approved-character,:scope > svg,:scope > img");
      if(current)updateImage(current,pose,"",english()?`Meowde ${pose}`:"학습 상태를 표현하는 Meowde");
      else coach.insertAdjacentHTML("afterbegin",imageMarkup(pose,"",english()?`Meowde ${pose}`:"학습 상태를 표현하는 Meowde"));
    });
  }
  function decorateTrail(){
    document.querySelectorAll(".trail-cat").forEach(slot=>{slot.innerHTML=imageMarkup("smug","",english()?"Confident Meowde":"자신만만한 Meowde")});
  }
  function title(card){const heading=card&&card.querySelector("h3");return heading?heading.textContent.trim().toLowerCase():""}
  function addCardPose(card,pose,label){
    if(!card)return;
    card.classList.add("v449-decorated-card");
    const current=card.querySelector(":scope > .v449-card-pose");
    if(current)updateImage(current,pose,"v449-card-pose",label);
    else card.insertAdjacentHTML("beforeend",imageMarkup(pose,"v449-card-pose",label));
  }
  function decorateCards(){
    document.querySelectorAll(".screen .scroll > .card").forEach(card=>{
      if(card.classList.contains("hero")||card.classList.contains("v427-growth-card"))return;
      const text=title(card);
      if(text.includes("challenge")||text.includes("챌린지"))addCardPose(card,"music",english()?"Music break":"뮤직 브레이크");
      else if(text.includes("goal")||text.includes("목표")||text.includes("quest"))addCardPose(card,"reading",english()?"Reading goals":"목표를 읽는 Meowde");
      else if(text.includes("next")||text.includes("다음")||text.includes("저장"))addCardPose(card,"smug",english()?"Ready for the next lesson":"다음 레슨 준비");
    });
  }
  function accuracy(reward){const value=reward&&reward.querySelector(".stats3 .stat3:nth-child(3) b");const match=value&&String(value.textContent||"").match(/\d+/);return match?Number(match[0]):100}
  function decorateFeedback(){
    const reward=document.querySelector(".reward-screen");
    if(reward){
      const value=accuracy(reward),pose=value>=85?"happy":value>=65?"smug":"meh";
      const current=reward.querySelector(".v449-character,.meowde-approved-character,svg,img");
      if(current)updateImage(current,pose,"v449-feedback-character",english()?"Meowde result":"학습 결과 Meowde");
      else reward.insertAdjacentHTML("afterbegin",imageMarkup(pose,"v449-feedback-character",english()?"Meowde result":"학습 결과 Meowde"));
    }
    const feedback=document.querySelector(".feedback");
    if(feedback){
      const pose=runtimeError()?"error":feedback.classList.contains("ok")?"happy":"surprised";
      const current=feedback.querySelector(".v449-feedback-character");
      if(current)updateImage(current,pose,"v449-feedback-character","Meowde");
      else feedback.insertAdjacentHTML("afterbegin",imageMarkup(pose,"v449-feedback-character","Meowde"));
    }
  }
  function roomItems(){return english()?[["coding","Coding mode","Focused learning"],["music","Music break","Headphones on"],["reading","Study mode","Reading clues"],["happy","Victory face","Correct answer"],["smug","Confident mode","Ready for more"],["error","Debug mode","Checking an error"]]:[["coding","코딩 모드","집중 학습"],["music","뮤직 브레이크","헤드폰 장착"],["reading","공부 모드","다음 힌트 읽기"],["happy","정답 표정","문제 해결 완료"],["smug","자신감 모드","다음 문제 준비"],["error","디버그 모드","오류 확인 중"]]}
  function decorateRoom(){
    const grid=document.querySelector(".room-grid");
    if(!grid)return;
    grid.classList.add("v449-room-grid");
    const items=roomItems();
    grid.innerHTML=items.map(([pose,name,copy])=>`<article class="v449-room-pose">${imageMarkup(pose,"",name)}<b>${name}</b><small>${copy}</small></article>`).join("");
    const heading=document.querySelector(".simple-head h2"),copy=document.querySelector(".simple-head p");
    if(heading)heading.textContent=english()?"Meowde pose collection":"Meowde 포즈 컬렉션";
    if(copy)copy.textContent=english()?"One mascot used across different states.":"하나의 캐릭터를 상황에 맞게 활용해요.";
  }
  function decorateProfile(){
    document.querySelectorAll(".v420-avatar").forEach(slot=>{
      const current=slot.querySelector(":scope > .v449-character,:scope > .meowde-approved-character,:scope > svg,:scope > img");
      if(current)updateImage(current,"music","v449-profile-pose",english()?"Meowde with headphones":"헤드폰을 쓴 Meowde");
      else slot.insertAdjacentHTML("afterbegin",imageMarkup("music","v449-profile-pose",english()?"Meowde with headphones":"헤드폰을 쓴 Meowde"));
    });
  }
  function decorateReview(){
    if(state().screen!=="review")return;
    const pose=Array.isArray(state().mistakes)&&state().mistakes.length?"meh":"smug";
    const head=document.querySelector(".screen .simple-head");
    if(head){
      head.classList.add("v449-review-head");
      const current=head.querySelector(":scope > .v449-review-pose");
      if(current)updateImage(current,pose,"v449-review-pose","Meowde");
      else head.insertAdjacentHTML("beforeend",imageMarkup(pose,"v449-review-pose","Meowde"));
    }
  }
  function decorateRecovery(){
    document.querySelectorAll(".v434-release-error,.v446-update-recovery,.v446-recovery-panel").forEach(panel=>{
      panel.classList.add("v449-character-error");
      if(!panel.querySelector(":scope > .v449-error-pose"))panel.insertAdjacentHTML("afterbegin",imageMarkup("error","v449-error-pose","Meowde"));
    });
  }
  function decorate(){
    decorateHero();decorateBrand();decorateGrowth();decorateCoach();decorateTrail();decorateCards();decorateFeedback();decorateRoom();decorateProfile();decorateReview();decorateRecovery();
    document.documentElement.dataset.characterImages=VERSION;
  }
  function queue(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;decorate()})}
  new MutationObserver(queue).observe(document.documentElement,{childList:true,subtree:true});
  ["renderHome","renderMap","renderRoom","renderLesson","renderReview","renderMy","renderProfile","renderAchievements","finish"].forEach(name=>{
    const current=window[name];if(typeof current!=="function"||current.__v450Wrapped)return;
    function wrapped(){const result=current.apply(this,arguments);queue();return result}
    wrapped.__v450Wrapped=true;window[name]=wrapped;
  });
  window.MeowCharacterCutouts=Object.freeze({version:VERSION,poses:Array.from(POSES),decorate,imageMarkup,lessonPose});
  window.__MEOWDE_VERSION__=VERSION;
  decorate();
})();
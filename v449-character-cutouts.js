(function applyMeowdeV449CharacterCutouts(){
  "use strict";

  const VERSION="4.49";
  const SPRITE=window.__MEOWDE_V449_SPRITE__||"";
  const POSES=new Set(["base","happy","smug","focus","surprised","meh","coding","music","reading","error"]);
  let queued=false;

  function isEnglish(){
    try{return Boolean(window.S&&S.lang==="en")}catch(error){return false}
  }

  function poseMarkup(pose="base",extraClass="",label="Meowde"){
    const safe=POSES.has(pose)?pose:"base";
    return `<span class="v449-character v449-pose-${safe} ${extraClass}" role="img" aria-label="${label}" data-v449-pose="${safe}" data-character-version="${VERSION}"></span>`;
  }

  function updatePose(node,pose,extraClass="",label="Meowde"){
    if(!node)return null;
    const safe=POSES.has(pose)?pose:"base";
    if(node.classList&&node.classList.contains("v449-character")){
      if(node.dataset.v449Pose!==safe){
        POSES.forEach(item=>node.classList.remove(`v449-pose-${item}`));
        node.classList.add(`v449-pose-${safe}`);
        node.dataset.v449Pose=safe;
      }
      extraClass.split(/\s+/).filter(Boolean).forEach(item=>node.classList.add(item));
      if(node.getAttribute("aria-label")!==label)node.setAttribute("aria-label",label);
      return node;
    }
    const holder=document.createElement("div");
    holder.innerHTML=poseMarkup(safe,extraClass,label);
    const replacement=holder.firstElementChild;
    node.replaceWith(replacement);
    return replacement;
  }

  function heroLabel(){
    return isEnglish()?"Meowde coding with headphones and a laptop":"헤드폰을 쓰고 노트북으로 코딩하는 Meowde";
  }

  function decorateHero(){
    const hero=document.querySelector(".hero");
    if(!hero)return;
    let scene=hero.querySelector(".v449-coding-scene");
    if(!scene){
      const current=hero.querySelector(".v448-approved-hero,.v444-coding-scene,.v435-coding-scene");
      const markup=`<div class="v444-coding-scene v448-approved-hero v449-coding-scene" data-character-version="${VERSION}">${poseMarkup("coding","",heroLabel())}</div>`;
      if(current)current.outerHTML=markup;
      else (hero.querySelector(".hero-main")||hero).insertAdjacentHTML("afterbegin",markup);
      scene=hero.querySelector(".v449-coding-scene");
    }
    if(!scene)return;
    scene.querySelectorAll("img,.v444-hero-art").forEach(node=>node.remove());
    const character=scene.querySelector(".v449-character");
    if(character)updatePose(character,"coding","",heroLabel());
    else scene.insertAdjacentHTML("afterbegin",poseMarkup("coding","",heroLabel()));
  }

  function decorateBrand(){
    const mark=document.querySelector(".brand-mark");
    if(!mark)return;
    const current=mark.querySelector(".v449-character");
    if(current){updatePose(current,"base","v448-brand-cat","Meowde");return}
    mark.innerHTML=poseMarkup("base","v448-brand-cat","Meowde");
  }

  function stageNumber(){
    const current=window.MeowGrowth&&typeof MeowGrowth.stage==="function"?MeowGrowth.stage():null;
    const stages=window.MeowGrowth&&Array.isArray(MeowGrowth.stages)?MeowGrowth.stages:[];
    const index=stages.findIndex(item=>current&&item.id===current.id);
    return Math.max(1,index+1);
  }

  function growthPose(level){
    return ["base","happy","smug","focus","surprised"][Math.max(0,Math.min(4,level-1))];
  }

  function decorateGrowth(){
    const stageIcon=document.querySelector(".v427-growth-card .v427-stage-icon");
    if(!stageIcon)return;
    const level=stageNumber();
    const pose=growthPose(level);
    let character=stageIcon.querySelector(".v449-character");
    if(character)updatePose(character,pose,"v448-growth-cat",`Meowde level ${level}`);
    else{
      stageIcon.innerHTML=`${poseMarkup(pose,"v448-growth-cat",`Meowde level ${level}`)}<span class="v448-level-badge" aria-label="Level ${level}">${level}</span>`;
      character=stageIcon.querySelector(".v449-character");
    }
    let badge=stageIcon.querySelector(".v448-level-badge");
    if(!badge){stageIcon.insertAdjacentHTML("beforeend",`<span class="v448-level-badge" aria-label="Level ${level}">${level}</span>`);badge=stageIcon.querySelector(".v448-level-badge")}
    if(badge&&badge.textContent!==String(level))badge.textContent=String(level);
  }

  function coachPose(node){
    const classes=node&&node.classList;
    if(classes&&classes.contains("mood-happy"))return "happy";
    if(classes&&classes.contains("mood-party"))return "surprised";
    if(classes&&classes.contains("mood-oops"))return "error";
    if(classes&&classes.contains("mood-focus"))return "focus";
    return "reading";
  }

  function decorateCoach(){
    document.querySelectorAll(".coach").forEach(coach=>{
      const current=coach.querySelector(":scope > .v449-character,:scope > .meowde-approved-character,:scope > svg");
      if(!current)return;
      let pose=coachPose(current);
      try{if(window.S&&S.checked)pose=S.correct?"happy":"error"}catch(error){}
      updatePose(current,pose,"",isEnglish()?`Meowde ${pose}`:`Meowde ${pose}`);
    });
  }

  function decorateTrail(){
    document.querySelectorAll(".trail-cat").forEach(holder=>{
      const label=isEnglish()?"Meowde exploring the code map":"코드 지도를 탐험하는 Meowde";
      const current=holder.querySelector(".v449-character,.meowde-approved-character,svg");
      if(current)updatePose(current,"focus","",label);
      else holder.innerHTML=poseMarkup("focus","",label);
    });
  }

  function titleText(card){
    const heading=card&&card.querySelector("h3");
    return heading?heading.textContent.trim().toLowerCase():"";
  }

  function addCardPose(card,pose,label){
    if(!card)return;
    card.classList.add("v449-decorated-card");
    const current=card.querySelector(":scope > .v449-card-pose");
    if(current)updatePose(current,pose,"v449-card-pose",label);
    else card.insertAdjacentHTML("beforeend",poseMarkup(pose,"v449-card-pose",label));
  }

  function decorateHomeCards(){
    document.querySelectorAll(".screen .scroll > .card").forEach(card=>{
      if(card.classList.contains("hero")||card.classList.contains("v427-growth-card"))return;
      const title=titleText(card);
      if(title.includes("challenge")||title.includes("챌린지"))addCardPose(card,"music",isEnglish()?"Meowde enjoying a coding rhythm":"코딩 리듬을 즐기는 Meowde");
      else if(title.includes("goal")||title.includes("목표")||title.includes("quest"))addCardPose(card,"reading",isEnglish()?"Meowde reading the next quest":"다음 목표를 읽는 Meowde");
      else if(title.includes("next")||title.includes("다음")||title.includes("저장"))addCardPose(card,"smug",isEnglish()?"Meowde ready for the next lesson":"다음 레슨을 준비한 Meowde");
    });
  }

  function decorateFeedback(){
    const reward=document.querySelector(".reward-screen");
    if(reward){
      const current=reward.querySelector(".v449-character,.meowde-approved-character,svg");
      const label=isEnglish()?"Meowde celebrating":"축하하는 Meowde";
      if(current)updatePose(current,"surprised","v449-feedback-character",label);
      else if(!reward.querySelector(".v449-feedback-character"))reward.insertAdjacentHTML("afterbegin",poseMarkup("surprised","v449-feedback-character",label));
    }
    const feedback=document.querySelector(".feedback");
    if(feedback){
      const pose=feedback.classList.contains("ok")?"happy":"error";
      const label=pose==="happy"?(isEnglish()?"Meowde is proud":"뿌듯한 Meowde"):(isEnglish()?"Meowde debugging":"오류를 고치는 Meowde");
      const current=feedback.querySelector(".v449-feedback-character");
      if(current)updatePose(current,pose,"v449-feedback-character",label);
      else feedback.insertAdjacentHTML("afterbegin",poseMarkup(pose,"v449-feedback-character",label));
    }
  }

  function roomLabels(){
    if(isEnglish())return [
      ["coding","Coding mode","Laptop focus"],
      ["music","Music break","Headphones on"],
      ["reading","Study mode","Reading the next clue"],
      ["happy","Victory face","Correct answer"],
      ["smug","Confident mode","Ready for more"],
      ["error","Debug mode","Fixing one bug"]
    ];
    return [
      ["coding","코딩 모드","노트북 집중"],
      ["music","뮤직 브레이크","헤드폰 장착"],
      ["reading","공부 모드","다음 힌트 읽기"],
      ["happy","정답 표정","문제 해결 완료"],
      ["smug","자신감 모드","다음 문제 준비"],
      ["error","디버그 모드","버그 하나 수정 중"]
    ];
  }

  function decorateRoom(){
    const grid=document.querySelector(".room-grid");
    if(!grid)return;
    grid.classList.add("v449-room-grid");
    const labels=roomLabels();
    const signature=`${isEnglish()?"en":"ko"}:${labels.map(item=>item[0]).join("|")}`;
    if(grid.dataset.v449Gallery!==signature){
      grid.dataset.v449Gallery=signature;
      grid.innerHTML=labels.map(([pose,title,copy])=>`<article class="v449-room-pose">${poseMarkup(pose,"",title)}<b>${title}</b><small>${copy}</small></article>`).join("");
    }
    const heading=document.querySelector(".simple-head h2");
    const copy=document.querySelector(".simple-head p");
    if(heading)heading.textContent=isEnglish()?"Meowde pose collection":"Meowde 포즈 컬렉션";
    if(copy)copy.textContent=isEnglish()?"One mascot, many useful expressions and activities.":"하나의 캐릭터를 표정과 행동에 맞게 다양하게 활용해요.";
  }

  function decorateProfile(){
    const profile=document.querySelector(".v420-profile-card,.profile-card");
    if(profile&&!profile.querySelector(".v449-profile-pose"))profile.insertAdjacentHTML("afterbegin",poseMarkup("meh","v449-profile-pose",isEnglish()?"Meowde profile":"Meowde 프로필"));
    const achievements=document.querySelector(".v419-achievement-summary,.v419-achievements-hero");
    if(achievements&&!achievements.querySelector(".v449-achievement-pose"))achievements.insertAdjacentHTML("afterbegin",poseMarkup("smug","v449-achievement-pose",isEnglish()?"Proud Meowde":"뿌듯한 Meowde"));
  }

  function decorate(){
    document.documentElement.style.setProperty("--v449-sprite",`url("${SPRITE}")`);
    decorateHero();
    decorateBrand();
    decorateGrowth();
    decorateCoach();
    decorateTrail();
    decorateHomeCards();
    decorateFeedback();
    decorateRoom();
    decorateProfile();
    document.documentElement.dataset.characterCutouts=VERSION;
  }

  function queue(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(()=>{queued=false;decorate()});
  }

  const observer=new MutationObserver(queue);
  observer.observe(document.documentElement,{childList:true,subtree:true});

  ["renderHome","renderMap","renderRoom","renderLesson","renderReview","renderMy","renderProfile","renderAchievements","finish"].forEach(name=>{
    const current=window[name];
    if(typeof current!=="function"||current.__v449Wrapped)return;
    function wrapped(){const result=current.apply(this,arguments);queue();return result}
    wrapped.__v449Wrapped=true;
    window[name]=wrapped;
  });

  window.MeowCharacterCutouts=Object.freeze({version:VERSION,poses:Array.from(POSES),decorate,poseMarkup});
  window.__MEOWDE_VERSION__=VERSION;
  decorate();
})();

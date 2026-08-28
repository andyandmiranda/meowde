(function applyMeowdeV416Journey(){
  "use strict";

  const STORAGE_KEY="meowde-v416-journey";
  const UNIT_SIZE=10;
  const UNIT_REWARD=50;

  function readJourney(){
    try{
      const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}");
      return parsed&&typeof parsed==="object"?parsed:{};
    }catch(error){
      console.warn("Meowde journey state could not be read:",error);
      return {};
    }
  }

  const J=readJourney();
  J.unitRewards=J.unitRewards&&typeof J.unitRewards==="object"?J.unitRewards:{};

  function saveJourney(){
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(J))}
    catch(error){console.warn("Meowde journey state could not be saved:",error)}
  }

  function unitCount(){return Math.max(1,Math.ceil(lessons().length/UNIT_SIZE))}
  function safeUnit(value){return Math.max(0,Math.min(Number(value)||0,unitCount()-1))}
  function unitBounds(unit){
    const start=safeUnit(unit)*UNIT_SIZE;
    const end=Math.min(start+UNIT_SIZE,lessons().length);
    return {start,end,total:Math.max(0,end-start)};
  }
  function unitState(unit){
    const bounds=unitBounds(unit);
    let completed=0;
    for(let index=bounds.start;index<bounds.end;index++){
      if(Array.isArray(S.done)&&S.done.includes(index))completed++;
    }
    return {
      unit:safeUnit(unit),start:bounds.start,end:bounds.end,total:bounds.total,completed,
      complete:bounds.total>0&&completed===bounds.total,
      claimed:Boolean(J.unitRewards[String(safeUnit(unit))])
    };
  }
  function unitName(unit){
    const ko=S.lang==="ko";
    const names=ko?["Python 기초","조건과 반복","함수와 프로젝트"]:["Python Basics","Control & Loops","Functions & Projects"];
    return names[safeUnit(unit)]||(ko?`유닛 ${safeUnit(unit)+1}`:`Unit ${safeUnit(unit)+1}`);
  }
  function pendingRewardUnit(){
    for(let unit=0;unit<unitCount();unit++){
      const state=unitState(unit);
      if(state.complete&&!state.claimed)return state;
    }
    return null;
  }

  window.goToCurrentUnit=function(){
    const last=Math.max(0,lessons().length-1);
    const next=Math.max(0,Math.min(Number(S.next)||0,last));
    S.unit=safeUnit(Math.floor(next/UNIT_SIZE));
    save();
    renderMap();
  };

  window.claimUnitChest=function(unit){
    const state=unitState(unit);
    if(!state.complete||state.claimed)return;
    J.unitRewards[String(state.unit)]={claimedAt:new Date().toISOString(),reward:UNIT_REWARD};
    S.churu=(Number(S.churu)||0)+UNIT_REWARD;
    saveJourney();
    save();
    if(typeof toast==="function")toast(S.lang==="ko"?`${unitName(state.unit)} 완료 보상으로 츄르 ${UNIT_REWARD}개를 받았어요!`:`You received ${UNIT_REWARD} Churu for completing ${unitName(state.unit)}!`);
    if(typeof renderRoom==="function")renderRoom();
  };

  function milestoneCard(){
    const state=pendingRewardUnit();
    if(!state)return "";
    const ko=S.lang==="ko";
    return `<section class="card v416-milestone-card"><div><div class="section-kicker">${ko?"학습 마일스톤":"Learning milestone"}</div><h3>${esc(unitName(state.unit))} ✓</h3><p>${ko?"유닛을 모두 완료했어요. Meowde와 함께 보상을 받아요.":"Unit complete. Collect the milestone reward with Meowde."}</p></div><button class="btn butter" onclick="claimUnitChest(${state.unit})">🎁 +${UNIT_REWARD} ${ko?"츄르":"Churu"}</button></section>`;
  }

  function decorateRoom(){
    const scroll=document.querySelector(".screen>.scroll");
    if(!scroll||scroll.querySelector(".v416-milestone-card"))return;
    const markup=milestoneCard();
    if(!markup)return;
    scroll.insertAdjacentHTML("beforeend",markup);
  }

  const baseRenderRoom=typeof window.renderRoom==="function"?window.renderRoom:null;
  if(baseRenderRoom){
    window.renderRoom=function(){
      baseRenderRoom.apply(this,arguments);
      decorateRoom();
    };
  }

  // Phase 3: Learn owns only the learning path. Unit summary cards, NOW tags,
  // decorative milestone icons, and reward CTAs are no longer injected into Map.
  // Existing reward state remains compatible and any unclaimed unit reward moves to Meowde.
  window.MeowJourney=Object.freeze({
    storageKey:STORAGE_KEY,state:J,unitSize:UNIT_SIZE,unitState,unitName,pendingRewardUnit
  });
  document.documentElement.dataset.learningJourney="simplified";
  window.__MEOWDE_VERSION__="4.16-phase3";
})();
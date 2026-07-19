(function applyMeowdeV416Journey(){
  const STORAGE_KEY='meowde-v416-journey';
  const UNIT_SIZE=10;
  const UNIT_REWARD=50;

  function readJourney(){
    try{
      const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');
      return parsed&&typeof parsed==='object'?parsed:{};
    }catch(error){
      console.warn('Meowde v4.16 journey state was reset:',error);
      return {};
    }
  }

  const J=readJourney();
  J.unitRewards=J.unitRewards&&typeof J.unitRewards==='object'?J.unitRewards:{};

  function saveJourney(){
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(J))}
    catch(error){console.warn('Meowde v4.16 could not save journey state:',error)}
  }

  function unitCount(){return Math.max(1,Math.ceil(lessons().length/UNIT_SIZE))}

  function safeUnit(value){
    return Math.max(0,Math.min(Number(value)||0,unitCount()-1));
  }

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
      unit:safeUnit(unit),
      start:bounds.start,
      end:bounds.end,
      total:bounds.total,
      completed,
      percent:bounds.total?Math.round(completed/bounds.total*100):0,
      complete:bounds.total>0&&completed===bounds.total,
      claimed:Boolean(J.unitRewards[String(safeUnit(unit))])
    };
  }

  function activeUnit(){
    const last=Math.max(0,lessons().length-1);
    const next=Math.max(0,Math.min(Number(S.next)||0,last));
    return safeUnit(Math.floor(next/UNIT_SIZE));
  }

  function unitName(unit){
    const ko=S.lang==='ko';
    const names=ko
      ?['Python 기초','조건과 반복','함수와 프로젝트']
      :['Python Basics','Control & Loops','Functions & Projects'];
    return names[safeUnit(unit)]||(ko?`유닛 ${safeUnit(unit)+1}`:`Unit ${safeUnit(unit)+1}`);
  }

  function focusCopy(state){
    const ko=S.lang==='ko';
    if(state.complete)return ko?'이 유닛의 모든 레슨을 완료했습니다.':'Every lesson in this unit is complete.';
    const current=activeUnit();
    if(state.unit<current)return ko?'완료한 레슨을 눌러 다시 연습할 수 있어요.':'Tap a completed lesson to practice it again.';
    if(state.unit>current)return ko?'앞 유닛을 완료하면 순서대로 열립니다.':'Complete the earlier unit to unlock this path.';
    const nextIndex=Math.max(state.start,Math.min(Number(S.next)||state.start,state.end-1));
    const lesson=lessons()[nextIndex];
    return lesson
      ?(ko?`다음 목표: ${lesson.title}`:`Next goal: ${lesson.title}`)
      :(ko?'현재 유닛을 계속 진행하세요.':'Continue through the current unit.');
  }

  function renderUnitSummary(unit){
    const ko=S.lang==='ko';
    const state=unitState(unit);
    const current=activeUnit();
    let action='';

    if(state.complete&&state.claimed){
      action=`<button class="btn ghost" disabled>✓ ${ko?'유닛 보상 수령 완료':'Unit reward claimed'}</button>`;
    }else if(state.complete){
      action=`<button class="btn butter v416-unit-claim" onclick="claimUnitChest(${state.unit})">🎁 ${ko?`유닛 보상 받기 · +${UNIT_REWARD} 츄르`:`Claim unit reward · +${UNIT_REWARD} Churu`}</button>`;
    }else if(state.unit!==current){
      action=`<button class="btn ghost" onclick="goToCurrentUnit()">${ko?'현재 학습 위치로':'Go to current path'}</button>`;
    }

    return `<section class="card v416-unit-summary ${state.complete?'complete':''}">
      <div class="v416-summary-top">
        <div class="v416-unit-icon">${state.complete?'🏆':String(state.unit+1).padStart(2,'0')}</div>
        <div class="v416-unit-copy">
          <div class="section-kicker">${ko?'학습 여정':'Learning journey'}</div>
          <h3>${esc(unitName(state.unit))}</h3>
          <p>${esc(focusCopy(state))}</p>
        </div>
        <span class="pill">${state.completed}/${state.total}</span>
      </div>
      <div class="v416-unit-progress"><span style="width:${state.percent}%"></span></div>
      <div class="v416-unit-meta"><span>${state.percent}%</span><span>${state.complete?(ko?'완료':'Complete'):(ko?`${state.total-state.completed}개 남음`:`${state.total-state.completed} remaining`)}</span></div>
      ${action?`<div class="v416-unit-action">${action}</div>`:''}
    </section>`;
  }

  window.goToCurrentUnit=function(){
    S.unit=activeUnit();
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
    toast(S.lang==='ko'?`유닛 보상으로 츄르 ${UNIT_REWARD}개를 받았어요!`:`You received ${UNIT_REWARD} Churu for completing the unit!`);
    renderMap();
  };

  function decorateMap(){
    const scroll=document.querySelector('.screen>.scroll');
    if(!scroll)return;
    const unit=safeUnit(S.unit);
    const unitTabs=scroll.querySelector('.unit-tabs');
    const trail=scroll.querySelector('.trail');

    if(unitTabs){
      unitTabs.querySelectorAll('button').forEach((button,index)=>{
        const state=unitState(index);
        const label=button.textContent.replace(/\s+\d+\/\d+$/,'').trim();
        button.innerHTML=`<span>${esc(label)}</span><small>${state.completed}/${state.total}</small>`;
      });
      unitTabs.insertAdjacentHTML('afterend',renderUnitSummary(unit));
    }else{
      scroll.insertAdjacentHTML('afterbegin',renderUnitSummary(unit));
    }

    if(!trail)return;
    const currentIndex=Math.max(0,Math.min(Number(S.next)||0,lessons().length-1));
    trail.querySelectorAll('.node').forEach((node,index)=>{
      const absoluteIndex=unit*UNIT_SIZE+index;
      if(absoluteIndex===currentIndex&&!S.done.includes(absoluteIndex)){
        node.classList.add('v416-current-node');
        node.insertAdjacentHTML('beforeend',`<span class="v416-now-tag">${S.lang==='ko'?'지금':'NOW'}</span>`);
      }
      if(index===4||index===9){
        const milestoneDone=S.done.includes(absoluteIndex);
        node.insertAdjacentHTML('beforeend',`<span class="v416-node-reward ${milestoneDone?'earned':''}" aria-hidden="true">${index===9?'🎁':'★'}</span>`);
      }
    });

    const flag=trail.querySelector('.unit-flag');
    if(flag&&unitState(unit).complete){
      flag.insertAdjacentHTML('afterend',`<div class="v416-finish-label">UNIT COMPLETE</div>`);
    }
  }

  const baseRenderMap=renderMap;
  renderMap=function(){
    baseRenderMap();
    decorateMap();
  };

  const baseFinish=finish;
  finish=function(){
    const unit=safeUnit(Math.floor((Number(S.lessonIndex)||0)/UNIT_SIZE));
    const before=unitState(unit);
    baseFinish();
    const after=unitState(unit);
    if(!before.complete&&after.complete){
      const rewardScreen=document.querySelector('.reward-screen');
      if(rewardScreen){
        rewardScreen.insertAdjacentHTML('beforeend',`<div class="v416-unit-unlocked"><span>🏆</span><div><b>${S.lang==='ko'?'유닛 완료!':'Unit complete!'}</b><p>${S.lang==='ko'?'학습 지도에서 유닛 보상 상자를 열 수 있어요.':'Open your unit reward chest on the learning path.'}</p></div></div>`);
      }
    }
  };

  document.title='Meowde v4.16 — Journey Rewards';
  window.__MEOWDE_VERSION__='4.16';
  if(S.screen==='map')renderMap();
})();

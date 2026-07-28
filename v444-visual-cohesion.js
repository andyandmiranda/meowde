(function applyMeowdeV449VisualCohesion(){
  "use strict";

  const VERSION="4.49";
  const HERO_ASSET="/assets/meowde-coding-cutout.svg?v=4491";
  const BASE_ASSET="/assets/meowde-approved-base.svg?v=4481";
  const HAPPY_ASSET="/assets/meowde-happy.svg?v=4491";
  let queued=false;

  function ko(){return !window.S||S.lang!=="en"}

  function heroMarkup(){
    const label=ko()?"노트북으로 코딩하는 Meowde":"Meowde coding on a laptop";
    return `<div class="v444-coding-scene v449-cutout-hero" aria-label="${label}" data-character-version="${VERSION}"><img class="v444-hero-art" src="${HERO_ASSET}" alt="${label}" width="180" height="140"></div>`;
  }

  function refineHero(){
    const hero=document.querySelector(".hero");
    if(!hero)return;
    const current=hero.querySelector(".v435-coding-scene,.v444-coding-scene");
    if(current&&current.classList.contains("v449-cutout-hero"))return;
    if(current){current.outerHTML=heroMarkup();return}
    const root=hero.querySelector(".hero-main")||hero;
    root.insertAdjacentHTML("afterbegin",heroMarkup());
  }

  function refineBrand(){
    const brand=document.querySelector(".brand");
    const title=brand&&brand.querySelector("h1");
    const mark=brand&&brand.querySelector(".brand-mark");
    if(title){title.classList.add("v444-brand-wordmark");title.textContent="Meowde"}
    if(mark&&!mark.querySelector(".v448-brand-cat"))mark.innerHTML=`<img class="v448-brand-cat" src="${BASE_ASSET}" alt="" width="42" height="42">`;
  }

  function stageNumber(current){
    const stages=window.MeowGrowth&&Array.isArray(MeowGrowth.stages)?MeowGrowth.stages:[];
    const index=stages.findIndex(item=>current&&item.id===current.id);
    return Math.max(1,index+1);
  }

  function growthVisual(level){
    return `<img class="v448-growth-cat v449-growth-expression" src="${HAPPY_ASSET}" alt="Meowde" width="82" height="80"><span class="v448-level-badge" aria-label="Level ${level}">${level}</span>`;
  }

  function refineGrowth(){
    const card=document.querySelector(".v427-growth-card");
    if(!card)return;
    card.classList.add("v444-growth-card","v448-growth-card","v449-varied-character");
    const current=window.MeowGrowth&&typeof MeowGrowth.stage==="function"?MeowGrowth.stage():null;
    const level=stageNumber(current);
    const kicker=card.querySelector(".section-kicker");
    const title=card.querySelector(".v427-growth-head h3");
    const copy=card.querySelector(".v427-growth-head p");
    const xpPill=card.querySelector(".v427-growth-head>.pill");
    const stageIcon=card.querySelector(".v427-stage-icon");
    if(stageIcon&&!stageIcon.querySelector(".v449-growth-expression"))stageIcon.innerHTML=growthVisual(level);
    if(kicker)kicker.textContent=ko()?"코치 성장":"Coach growth";
    if(title){
      const labels={kitten:["새싹 코더","Sprout coder"],junior:["꼬마 코더","Junior coder"],explorer:["코드 탐험가","Code explorer"],mentor:["코딩 메이트","Coding mate"],legend:["코드 마스터","Code master"]};
      const pair=current&&labels[current.id]?labels[current.id]:labels.kitten;
      title.textContent=ko()?`Lv.${level} ${pair[0]}`:`Lv.${level} ${pair[1]}`;
    }
    if(copy){
      const next=window.MeowGrowth&&typeof MeowGrowth.nextStage==="function"?MeowGrowth.nextStage():null;
      const value=Math.max(0,Number(window.S&&S.xp)||0);
      copy.textContent=next?(ko()?`${Math.max(0,next.min-value)} XP 후 다음 레벨`:`${Math.max(0,next.min-value)} XP to the next level`):(ko()?"최고 성장 단계에 도달했어요":"You reached the highest growth stage");
      copy.classList.add("v444-growth-next");
    }
    if(xpPill){xpPill.classList.add("v444-xp-pill");xpPill.textContent=`${Math.max(0,Number(window.S&&S.xp)||0)} XP`}
  }

  function decorate(){refineHero();refineBrand();refineGrowth();document.documentElement.dataset.visualCohesion=VERSION}
  function queue(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;decorate()})}

  const observer=new MutationObserver(queue);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  ["renderHome","renderRoom","renderProfile"].forEach(name=>{const current=window[name];if(typeof current!=="function")return;window[name]=function(){const result=current.apply(this,arguments);decorate();return result}});

  window.MeowVisualCohesion=Object.freeze({version:VERSION,decorate,refineHero,refineGrowth,refineBrand});
  window.__MEOWDE_VERSION__=VERSION;
  decorate();
})();

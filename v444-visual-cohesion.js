(function applyMeowdeV444VisualCohesion(){
  "use strict";

  const VERSION="4.44";
  const ASSET="/assets/meowde-approved-base.svg?v=4441";
  let queued=false;

  function ko(){return !window.S||S.lang!=="en"}

  function heroMarkup(){
    const label=ko()?"차분하게 코딩 중":"Calm coding mode";
    return `<div class="v444-coding-scene" aria-label="${label}"><svg class="v444-hero-cat" viewBox="0 0 128 174" role="img" aria-label="Meowde"><image href="${ASSET}" width="128" height="174"/></svg><div class="v444-laptop" aria-hidden="true"><div class="v444-laptop-lid"><span class="v444-screen-glow"></span><span class="v444-code-line one"></span><span class="v444-code-line two"></span><span class="v444-code-line three"></span><span class="v444-paw-mark">⌁</span></div><div class="v444-laptop-base"><span></span></div></div></div>`;
  }

  function refineHero(){
    const scene=document.querySelector(".hero .v435-coding-scene");
    if(!scene||scene.classList.contains("v444-refined"))return;
    scene.outerHTML=heroMarkup();
  }

  function refineBrand(){
    const title=document.querySelector(".brand h1");
    if(title){
      title.classList.add("v444-brand-wordmark");
      title.textContent="Meowde";
    }
  }

  function refineGrowth(){
    const card=document.querySelector(".v427-growth-card");
    if(!card)return;
    card.classList.add("v444-growth-card");

    const kicker=card.querySelector(".section-kicker");
    const title=card.querySelector(".v427-growth-head h3");
    const copy=card.querySelector(".v427-growth-head p");
    const xpPill=card.querySelector(".v427-growth-head>.pill");

    if(kicker)kicker.textContent=ko()?"Meowde 성장":"Meowde growth";
    if(title){
      const current=window.MeowGrowth&&typeof MeowGrowth.stage==="function"?MeowGrowth.stage():null;
      const labels={kitten:["첫걸음 냥","First-step kitten"],junior:["꼬마 코더","Junior coder"],explorer:["코드 탐험가","Code explorer"],mentor:["코딩 메이트","Coding mate"],legend:["코드 마스터","Code master"]};
      const pair=current&&labels[current.id]?labels[current.id]:labels.kitten;
      title.textContent=ko()?pair[0]:pair[1];
    }

    if(copy){
      const next=window.MeowGrowth&&typeof MeowGrowth.nextStage==="function"?MeowGrowth.nextStage():null;
      const value=Math.max(0,Number(window.S&&S.xp)||0);
      if(next){
        const left=Math.max(0,next.min-value);
        const nextLabels={junior:["꼬마 코더","Junior coder"],explorer:["코드 탐험가","Code explorer"],mentor:["코딩 메이트","Coding mate"],legend:["코드 마스터","Code master"]};
        const pair=nextLabels[next.id]||[next.labelKo,next.labelEn];
        copy.textContent=ko()?`${left} XP를 더 모으면 ${pair[0]}`:`${left} XP until ${pair[1]}`;
      }else{
        copy.textContent=ko()?"최고 성장 단계에 도달했어요":"You reached the highest growth stage";
      }
      copy.classList.add("v444-growth-next");
    }

    if(xpPill)xpPill.classList.add("v444-xp-pill");
  }

  function decorate(){
    refineHero();
    refineBrand();
    refineGrowth();
    document.documentElement.dataset.visualCohesion="4.44";
  }

  function queue(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(()=>{queued=false;decorate()});
  }

  const observer=new MutationObserver(queue);
  observer.observe(document.documentElement,{childList:true,subtree:true});

  ["renderHome","renderRoom","renderProfile"].forEach(name=>{
    const current=window[name];
    if(typeof current!=="function")return;
    window[name]=function(){const result=current.apply(this,arguments);decorate();return result};
  });

  window.MeowVisualCohesion=Object.freeze({version:VERSION,decorate,refineHero,refineGrowth,refineBrand});
  window.__MEOWDE_VERSION__=VERSION;
  decorate();
})();

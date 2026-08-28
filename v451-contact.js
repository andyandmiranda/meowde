(function applyMeowdeV451Contact(){
  "use strict";

  const FEEDBACK_URL="https://amis-os.vercel.app/feedback";
  const CONTACT_CLASS="v451-contact";

  function appRoot(){
    return document.getElementById("app")||document.querySelector(".app");
  }

  function isHome(){
    return typeof S!=="undefined"&&S&&S.screen==="home";
  }

  function label(){
    return typeof S!=="undefined"&&S&&S.lang==="ko"
      ? "피드백 & 문의 ↗"
      : "Feedback & Contact ↗";
  }

  function inject(){
    const app=appRoot();
    if(!app||!isHome())return;

    const scroll=app.querySelector(".screen .scroll");
    if(!scroll)return;

    let container=scroll.querySelector(`.${CONTACT_CLASS}`);
    if(!container){
      container=document.createElement("div");
      container.className=CONTACT_CLASS;
      container.innerHTML=`<a href="${FEEDBACK_URL}" target="_blank" rel="noopener noreferrer"></a>`;
      scroll.appendChild(container);
    }

    const anchor=container.querySelector("a");
    if(anchor){
      const nextLabel=label();
      const nextAriaLabel=nextLabel.replace(" ↗","");
      if(anchor.textContent!==nextLabel)anchor.textContent=nextLabel;
      if(anchor.getAttribute("aria-label")!==nextAriaLabel)anchor.setAttribute("aria-label",nextAriaLabel);
    }
  }

  const app=appRoot();
  const observer=app?new MutationObserver(()=>queueMicrotask(inject)):null;
  if(observer)observer.observe(app,{childList:true,subtree:true});

  inject();
  window.MeowContact={inject,url:FEEDBACK_URL,destroy:function(){if(observer)observer.disconnect()}};
})();
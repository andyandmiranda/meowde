(function(){
  "use strict";
  function attach(){
    const main=document.querySelector("#app .scroll");
    if(!main||document.getElementById("python-lab-entry")||typeof S==="undefined"||!["home","map","review"].includes(S.screen))return;
    const link=document.createElement("a");
    link.id="python-lab-entry";
    link.href="/python-lab.html";
    link.className="tile";
    link.style.cssText="margin:12px 18px;width:calc(100% - 36px);text-decoration:none;color:inherit";
    link.textContent=S.lang==="en"?"Python concept & application lab (Korean) →":"파이썬 개념·응용 실험실 · 기초부터 데이터 분석까지 →";
    const hero=main.querySelector(".hero");
    if(hero)hero.after(link);else main.prepend(link);
  }
  const root=document.getElementById("app");
  if(root)new MutationObserver(attach).observe(root,{childList:true,subtree:true});
  attach();
  window.MeowPythonLab={version:1};
})();

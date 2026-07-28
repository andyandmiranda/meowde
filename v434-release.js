(function applyMeowdeV448ReleaseGuard(){
  "use strict";

  const VERSION="4.48";
  const REQUIRED_FUNCTIONS=["renderHome","renderLesson","renderMap","renderReview","renderMy","startLesson","checkQ","finish","save","catSVG"];
  const REQUIRED_APIS=["MeowAchievements","MeowGrowth","MeowEvents","MeowQuests","MeowCharacterV430","MeowLearning","MeowPWA"];
  const ALLOWED_ACCESSORIES=new Set(["none","glasses","headphones","star","crown"]);
  const report={version:VERSION,checkedAt:new Date().toISOString(),errors:[],warnings:[],checks:{}};

  function check(name,condition,message,severity="error"){
    report.checks[name]=Boolean(condition);
    if(condition)return;
    const target=severity==="warning"?report.warnings:report.errors;
    target.push(message);
  }

  function appRoot(){
    if(typeof app!=="undefined"&&app&&app.nodeType===1)return app;
    return document.getElementById("app")||document.querySelector(".app");
  }

  function stateAvailable(){return typeof S!=="undefined"&&S&&typeof S==="object"}
  function isEnglish(){return stateAvailable()&&S.lang==="en"}

  function storageAvailable(){
    try{
      const key="__meowde_release_check__";
      localStorage.setItem(key,"1");
      localStorage.removeItem(key);
      return true;
    }catch(error){return false}
  }

  function normalizeAccessory(){
    const api=window.MeowAchievements;
    const state=api&&api.state;
    if(!state)return true;
    if(ALLOWED_ACCESSORIES.has(state.equippedAccessory||"none"))return true;
    state.equippedAccessory="none";
    try{localStorage.setItem("meowde-v419-achievements",JSON.stringify(state))}catch(error){}
    return false;
  }

  function loadExtension({id,css,script,version,readyGlobal,warning}){
    if(css&&!document.getElementById(`${id}-style`)){
      const link=document.createElement("link");
      link.id=`${id}-style`;
      link.rel="stylesheet";
      link.href=`/${css}?v=${version}`;
      document.head.appendChild(link);
    }
    if(readyGlobal&&window[readyGlobal])return;
    if(document.getElementById(`${id}-script`))return;
    const element=document.createElement("script");
    element.id=`${id}-script`;
    element.src=`/${script}?v=${version}`;
    element.async=true;
    element.addEventListener("error",()=>{
      if(!report.warnings.includes(warning))report.warnings.push(warning);
      document.documentElement.dataset.releaseHealth=report.errors.length?"error":"warning";
    });
    document.head.appendChild(element);
  }

  function loadEnhancements(){
    loadExtension({id:"meowde-v442-map-touch",css:"v442-map-touch.css",script:"v442-map-touch.js",version:"442",readyGlobal:"MeowMapTouch",warning:"Map touch enhancement could not be loaded."});
    loadExtension({id:"meowde-v443-single-companion",css:"v443-single-companion.css",script:"v443-single-companion.js",version:"443",readyGlobal:"MeowSingleCompanion",warning:"Single companion branding could not be loaded."});
    loadExtension({id:"meowde-v444-visual-cohesion",css:"v444-visual-cohesion.css",script:"v444-visual-cohesion.js",version:"448",readyGlobal:"MeowVisualCohesion",warning:"Visual cohesion enhancement could not be loaded."});
    loadExtension({id:"meowde-v446-update-recovery",css:"v446-update-recovery.css",script:"v446-update-recovery.js",version:"446",readyGlobal:"MeowUpdateRecovery",warning:"Update recovery enhancement could not be loaded."});
  }

  function run(){
    report.checks={};
    check("app-root",Boolean(appRoot()),"App root is unavailable.");
    check("state",stateAvailable(),"Application state is unavailable.");
    check("storage",storageAvailable(),"Local storage is unavailable. Progress may not persist.");
    REQUIRED_FUNCTIONS.forEach(name=>check(`function:${name}`,typeof window[name]==="function",`Required function ${name} is missing.`));
    REQUIRED_APIS.forEach(name=>check(`api:${name}`,Boolean(window[name]),`Extension API ${name} is missing.`,"warning"));
    const accessoryValid=normalizeAccessory();
    check("accessory-state",accessoryValid,"Invalid accessory state was reset.","warning");
    check("service-worker",("serviceWorker" in navigator),"Service worker is not supported in this browser.","warning");
    check("lessons",typeof window.lessons==="function"&&Array.isArray(window.lessons())&&window.lessons().length>0,"Lesson data is unavailable.");
    window.__MEOWDE_VERSION__=VERSION;
    document.title=`Meowde v${VERSION}`;
    document.documentElement.dataset.meowdeVersion=VERSION;
    document.documentElement.dataset.releaseHealth=report.errors.length?"error":report.warnings.length?"warning":"ready";
    return report;
  }

  function recoveryPanel(){
    const existing=document.querySelector(".v434-release-error");
    if(!report.errors.length){if(existing)existing.remove();return}
    if(existing)return;
    const english=isEnglish();
    const panel=document.createElement("aside");
    panel.className="v434-release-error";
    panel.setAttribute("role","alert");
    panel.innerHTML=`<strong>${english?"Meowde needs a refresh":"Meowde를 다시 불러와야 해요"}</strong><p>${english?"Some required files did not load correctly.":"필수 파일 일부가 정상적으로 로드되지 않았습니다."}</p><button type="button">${english?"Reload":"새로고침"}</button>`;
    panel.querySelector("button").addEventListener("click",()=>location.reload());
    document.body.appendChild(panel);
  }

  function rerun(){
    report.errors.length=0;
    report.warnings.length=0;
    report.checkedAt=new Date().toISOString();
    run();
    recoveryPanel();
    return report;
  }

  loadEnhancements();
  run();
  window.MeowRelease={version:VERSION,report,rerun,isReady:function(){return report.errors.length===0}};
  recoveryPanel();
  console.info("Meowde release health",report);
})();

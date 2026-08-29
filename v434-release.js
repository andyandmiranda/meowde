(function applyMeowdeV450ReleaseGuard(){
  "use strict";

  const VERSION="4.50-phase5-bootstrap";
  const REQUIRED_FUNCTIONS=["renderHome","renderLesson","renderMap","renderReview","renderRoom","renderMy","renderProfile","renderAchievements","startLesson","checkQ","finish","save","catSVG"];
  const REQUIRED_APIS=["MeowAchievements","MeowGrowth","MeowEvents","MeowQuests","MeowCharacterV430","MeowLearning","MeowPWA","MeowSingleCompanion"];
  const ENHANCEMENT_APIS=["MeowMapTouch","MeowVisualCohesion","MeowUpdateRecovery","MeowCharacterCutouts","MeowContact"];
  const ALLOWED_ACCESSORIES=new Set(["none","glasses","headphones","star","crown"]);
  const ENHANCEMENTS=[
    {id:"meowde-v442-map-touch",css:"v442-map-touch.css",script:"v442-map-touch.js",version:"442",readyGlobal:"MeowMapTouch",warning:"Map touch enhancement could not be loaded."},
    {id:"meowde-v444-visual-cohesion",css:"v444-visual-cohesion.css",script:"v444-visual-cohesion.js",version:"448",readyGlobal:"MeowVisualCohesion",warning:"Visual cohesion enhancement could not be loaded."},
    {id:"meowde-v446-update-recovery",css:"v446-update-recovery.css",script:"v446-update-recovery.js",version:"446",readyGlobal:"MeowUpdateRecovery",warning:"Update recovery enhancement could not be loaded."},
    {id:"meowde-v450-character-images",css:"v449-character-cutouts.css",script:"v449-character-cutouts.js",version:"450",readyGlobal:"MeowCharacterCutouts",warning:"Character image enhancement could not be loaded."},
    {id:"meowde-v451-contact",css:"v451-contact.css",script:"v451-contact.js",version:"451",readyGlobal:"MeowContact",warning:"Contact link could not be loaded."}
  ];
  const report={version:VERSION,checkedAt:new Date().toISOString(),errors:[],warnings:[],checks:{},enhancementOrder:ENHANCEMENTS.map(item=>item.id)};

  function check(name,condition,message,severity="error"){
    report.checks[name]=Boolean(condition);
    if(condition)return;
    (severity==="warning"?report.warnings:report.errors).push(message);
  }
  function appRoot(){return document.getElementById("app")||document.querySelector(".app")}
  function stateAvailable(){return typeof S!=="undefined"&&S&&typeof S==="object"}
  function isEnglish(){return stateAvailable()&&S.lang==="en"}
  function storageAvailable(){try{const key="__meowde_release_check__";localStorage.setItem(key,"1");localStorage.removeItem(key);return true}catch(error){return false}}
  function normalizeAccessory(){
    const state=window.MeowAchievements&&MeowAchievements.state;
    if(!state)return true;
    if(ALLOWED_ACCESSORIES.has(state.equippedAccessory||"none"))return true;
    state.equippedAccessory="none";
    try{localStorage.setItem("meowde-v419-achievements",JSON.stringify(state))}catch(error){}
    return false;
  }
  function noteWarning(message){if(!report.warnings.includes(message))report.warnings.push(message);document.documentElement.dataset.releaseHealth=report.errors.length?"error":"warning"}
  function ensureStyle(item){
    if(!item.css||document.getElementById(`${item.id}-style`))return;
    const link=document.createElement("link");
    link.id=`${item.id}-style`;
    link.rel="stylesheet";
    link.href=`/${item.css}?v=${item.version}`;
    document.head.appendChild(link);
  }
  function loadEnhancement(item){
    ensureStyle(item);
    if(item.readyGlobal&&window[item.readyGlobal])return Promise.resolve(true);
    const existing=document.getElementById(`${item.id}-script`);
    if(existing){
      if(item.readyGlobal&&window[item.readyGlobal])return Promise.resolve(true);
      return new Promise(resolve=>{
        existing.addEventListener("load",()=>resolve(true),{once:true});
        existing.addEventListener("error",()=>{noteWarning(item.warning);resolve(false)},{once:true});
      });
    }
    return new Promise(resolve=>{
      const element=document.createElement("script");
      element.id=`${item.id}-script`;
      element.src=`/${item.script}?v=${item.version}`;
      element.async=false;
      element.addEventListener("load",()=>resolve(true),{once:true});
      element.addEventListener("error",()=>{noteWarning(item.warning);resolve(false)},{once:true});
      document.head.appendChild(element);
    });
  }
  async function loadEnhancementsInOrder(){
    const results=[];
    for(const item of ENHANCEMENTS)results.push(await loadEnhancement(item));
    document.documentElement.dataset.enhancementLoader="ordered";
    return results;
  }
  function run(includeEnhancements=false){
    report.checks={};
    report.errors.length=0;
    report.warnings.length=0;
    report.checkedAt=new Date().toISOString();
    check("app-root",Boolean(appRoot()),"App root is unavailable.");
    check("state",stateAvailable(),"Application state is unavailable.");
    check("storage",storageAvailable(),"Local storage is unavailable. Progress may not persist.");
    REQUIRED_FUNCTIONS.forEach(name=>check(`function:${name}`,typeof window[name]==="function",`Required function ${name} is missing.`));
    REQUIRED_APIS.forEach(name=>check(`api:${name}`,Boolean(window[name]),`Core API ${name} is missing.`,"warning"));
    if(includeEnhancements)ENHANCEMENT_APIS.forEach(name=>check(`enhancement:${name}`,Boolean(window[name]),`Enhancement API ${name} is missing.`,"warning"));
    check("accessory-state",normalizeAccessory(),"Invalid accessory state was reset.","warning");
    check("service-worker",("serviceWorker" in navigator),"Service worker is not supported in this browser.","warning");
    check("lessons",typeof window.lessons==="function"&&Array.isArray(window.lessons())&&window.lessons().length>0,"Lesson data is unavailable.");
    window.__MEOWDE_VERSION__=VERSION;
    document.title=`Meowde v4.50`;
    document.documentElement.dataset.meowdeVersion=VERSION;
    document.documentElement.dataset.releaseHealth=report.errors.length?"error":report.warnings.length?"warning":"ready";
    return report;
  }
  function recoveryPanel(){
    const existing=document.querySelector(".v434-release-error");
    if(!report.errors.length){if(existing)existing.remove();return}
    if(existing)return;
    const panel=document.createElement("aside");panel.className="v434-release-error";panel.setAttribute("role","alert");
    panel.innerHTML=`<strong>${isEnglish()?"Meowde needs a refresh":"Meowde를 다시 불러와야 해요"}</strong><p>${isEnglish()?"Some required files did not load correctly.":"필수 파일 일부가 정상적으로 로드되지 않았습니다."}</p><button type="button">${isEnglish()?"Reload":"새로고침"}</button>`;
    panel.querySelector("button").addEventListener("click",()=>location.reload());document.body.appendChild(panel);
  }
  function rerun(){run(true);recoveryPanel();return report}

  run(false);
  recoveryPanel();
  const loadPromise=loadEnhancementsInOrder().then(()=>rerun()).catch(error=>{
    noteWarning(`Enhancement bootstrap failed: ${error&&error.message?error.message:"unknown error"}`);
    return rerun();
  });
  window.MeowRelease={version:VERSION,report,rerun,isReady:function(){return report.errors.length===0},loadPromise,enhancementOrder:report.enhancementOrder.slice()};
  console.info("Meowde release health",report);
})();
(function applyMeowdeV434ReleaseGuard(){
  "use strict";

  const VERSION="4.34";
  const REQUIRED_FUNCTIONS=["renderHome","renderLesson","renderMap","renderReview","renderMy","startLesson","checkQ","finish","save","catSVG"];
  const REQUIRED_APIS=["MeowAchievements","MeowGrowth","MeowEvents","MeowQuests","MeowCharacterV430","MeowLearning"];
  const ALLOWED_ACCESSORIES=new Set(["none","glasses","headphones","star","crown"]);
  const report={version:VERSION,checkedAt:new Date().toISOString(),errors:[],warnings:[],checks:{}};

  function check(name,condition,message,severity="error"){
    report.checks[name]=Boolean(condition);
    if(condition)return;
    const target=severity==="warning"?report.warnings:report.errors;
    target.push(message);
  }

  function storageAvailable(){
    try{
      const key="__meowde_release_check__";
      localStorage.setItem(key,"1");
      localStorage.removeItem(key);
      return true;
    }catch(error){return false}
  }

  function normalizeAccessory(){
    const state=window.MeowAchievements&&MeowAchievements.state;
    if(!state)return true;
    if(ALLOWED_ACCESSORIES.has(state.equippedAccessory||"none"))return true;
    state.equippedAccessory="none";
    try{localStorage.setItem("meowde-v419-achievements",JSON.stringify(state))}catch(error){}
    return false;
  }

  function run(){
    check("app-root",Boolean(window.app&&app.nodeType===1),"App root is unavailable.");
    check("state",Boolean(window.S&&typeof S==="object"),"Application state is unavailable.");
    check("storage",storageAvailable(),"Local storage is unavailable. Progress may not persist.");

    REQUIRED_FUNCTIONS.forEach(name=>check(`function:${name}`,typeof window[name]==="function",`Required function ${name} is missing.`));
    REQUIRED_APIS.forEach(name=>check(`api:${name}`,Boolean(window[name]),`Extension API ${name} is missing.`,"warning"));

    const accessoryValid=normalizeAccessory();
    check("accessory-state",accessoryValid,"Invalid accessory state was reset.","warning");
    check("service-worker",("serviceWorker" in navigator),"Service worker is not supported in this browser.","warning");
    check("lessons",typeof window.lessons==="function"&&Array.isArray(lessons())&&lessons().length>0,"Lesson data is unavailable.");

    window.__MEOWDE_VERSION__=VERSION;
    document.documentElement.dataset.meowdeVersion=VERSION;
    document.documentElement.dataset.releaseHealth=report.errors.length?"error":report.warnings.length?"warning":"ready";
    return report;
  }

  function recoveryPanel(){
    if(!report.errors.length||document.querySelector(".v434-release-error"))return;
    const panel=document.createElement("aside");
    panel.className="v434-release-error";
    panel.setAttribute("role","alert");
    panel.innerHTML=`<strong>${window.S&&S.lang==="en"?"Meowde needs a refresh":"Meowde를 다시 불러와야 해요"}</strong><p>${window.S&&S.lang==="en"?"Some required files did not load correctly.":"필수 파일 일부가 정상적으로 로드되지 않았습니다."}</p><button type="button">${window.S&&S.lang==="en"?"Reload":"새로고침"}</button>`;
    panel.querySelector("button").addEventListener("click",()=>location.reload());
    document.body.appendChild(panel);
  }

  function exposeStatus(){
    window.MeowRelease={
      version:VERSION,
      report,
      rerun:function(){
        report.errors.length=0;
        report.warnings.length=0;
        report.checkedAt=new Date().toISOString();
        run();
        recoveryPanel();
        return report;
      },
      isReady:function(){return report.errors.length===0}
    };
  }

  run();
  exposeStatus();
  recoveryPanel();
  console.info("Meowde release health",report);
})();

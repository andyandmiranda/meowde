(function(){
  "use strict";
  // Standalone practice pages also need to check an existing PWA registration.
  // Never reload automatically: the old engine may still own a running submission.
  if(!("serviceWorker" in navigator))return;
  const sw=navigator.serviceWorker,initialController=sw.controller;
  let registration=null,ready=false,requested=false,banner=null,checking=false;
  function notice(message,canOpen=true){
    if(!banner){
      banner=document.createElement("aside");banner.id="practice-update";
      banner.setAttribute("aria-label","실습 버전 업데이트");
      banner.style.cssText="max-width:430px;margin:8px auto;padding:12px 18px;border:1px solid #b7a48f;border-radius:12px;background:#fff9ef;color:#48392c;box-sizing:border-box";
      const text=document.createElement("p");text.id="practice-update-status";text.setAttribute("role","status");
      const open=document.createElement("button");open.id="practice-update-open";open.type="button";open.textContent="새 화면 열기";
      open.style.cssText="min-height:44px;padding:8px 14px";open.onclick=apply;
      const later=document.createElement("button");later.type="button";later.textContent="나중에";later.style.cssText="min-height:44px;margin-left:8px;padding:8px 14px";later.onclick=()=>{banner.remove();banner=null};
      banner.append(text,open,later);document.getElementById("lab").before(banner);
    }
    banner.querySelector("p").textContent=message;
    banner.querySelector("#practice-update-open").hidden=!canOpen;
  }
  function showReady(){ready=true;notice("새 실습 화면이 준비됐어요. 지금 문제를 계속 풀거나, 저장한 코드를 유지하고 새 화면을 열 수 있어요.")}
  function safeToReload(){
    if(window.MeowValuesPathSession){
      if(window.MeowValuesPathSession.safeToReload())return true;
      notice("새 연습의 답안이 저장되지 않았거나 코드가 실행 중이에요. 현재 탭에서 작업을 마친 뒤 다시 시도해 주세요.");return false;
    }
    const running=document.getElementById("stop-run");
    if(running&&!running.hidden){notice("코드가 실행 중이에요. 결과를 기다리거나 실행을 중지한 뒤 새 화면을 열어주세요.");return false}
    const editor=document.getElementById("learner-code");
    if(!editor||editor.value===editor.defaultValue)return true;
    // Verify changed text against the existing engine's saved draft. Do not write,
    // repair, clear, or migrate either legacy learning state or practice records.
    try{
      const id=document.querySelector('#unit-nav a[aria-current="page"]')?.getAttribute("href")?.slice(1);
      const stage=location.hash.slice(1).split("/")[1];
      const recordId=id==="function-slots"&&stage==="practice"?id+":practice":id;
      const saved=JSON.parse(localStorage.getItem("meowde-python-lab-v1"));
      if(saved?.version===1&&recordId&&saved.units?.[recordId]?.draft===editor.value)return true;
    }catch{}
    notice("현재 코드가 저장됐는지 확인하지 못해 새로고침하지 않았어요. 코드를 따로 복사해두고 저장 문제를 해결한 뒤 다시 시도해주세요.");return false;
  }
  function apply(){
    if(!ready||!safeToReload())return;
    if(registration?.waiting){requested=true;registration.waiting.postMessage({type:"SKIP_WAITING"});return}
    if(sw.controller===initialController){requested=true;notice("새 화면을 준비하고 있어요. 현재 코드는 그대로 유지합니다.",false);return}
    location.reload();
  }
  sw.addEventListener("controllerchange",()=>{
    if(!initialController)return;
    if(requested){requested=false;if(safeToReload())location.reload();return}
    showReady();
  });
  function watch(){
    const installing=registration.installing;
    if(installing)installing.addEventListener("statechange",()=>{
      if(initialController&&(installing.state==="activated"||(installing.state==="installed"&&registration.waiting)))showReady();
    });
  }
  async function check(){
    if(checking)return;checking=true;
    try{
      registration=await sw.getRegistration("/");
      if(!registration)return; // Keep fresh standalone visits free of forced installs.
      registration.addEventListener("updatefound",watch);watch();
      if(registration.waiting&&initialController)showReady();
      await registration.update();
    }catch{
      // Offline/runtime failures never discard the active editor or claim success.
      if(navigator.onLine!==false)notice("새 버전을 확인하지 못했어요. 현재 연습을 계속할 수 있으며, 다시 연결되면 확인합니다.",false);
    }finally{checking=false}
  }
  window.addEventListener("online",check);
  check();
})();

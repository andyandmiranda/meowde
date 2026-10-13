(function(){
  "use strict";
  const KEY="meowde-v5-subject-navigation";
  const subjects=[
    {id:"python",ko:"Python",en:"Python",subtitleKo:"이어서 코딩하기",subtitleEn:"Continue coding"},
    {id:"linux",ko:"Linux",en:"Linux",subtitleKo:"터미널 학습 준비 중",subtitleEn:"Terminal lessons coming soon"},
    {id:"italian",ko:"Italiano",en:"Italian",subtitleKo:"이탈리아어 학습 준비 중",subtitleEn:"Italian lessons coming soon"},
    {id:"korean",ko:"한국어",en:"Korean",subtitleKo:"한국어 학습 준비 중",subtitleEn:"Korean lessons coming soon"}
  ];
  function read(){try{const v=JSON.parse(localStorage.getItem(KEY)||"{}");return v&&subjects.some(s=>s.id===v.active)?v:{active:"python"}}catch{return {active:"python"}}}
  let state=read(), sheet=null, placeholder=null, busy=false;
  function isEnglish(){return typeof S!=="undefined"&&S.lang==="en"}
  function text(ko,en){return isEnglish()?en:ko}
  function persist(){try{localStorage.setItem(KEY,JSON.stringify({active:state.active}))}catch{}}
  function current(){return subjects.find(s=>s.id===state.active)||subjects[0]}
  function label(s){return isEnglish()?s.en:s.ko}
  function close(){if(sheet){sheet.remove();sheet=null}}
  function resumePython(){
    placeholder=null;
    state.active="python";persist();close();
    if(typeof hasLessonProgress==="function"&&hasLessonProgress()&&typeof renderLesson==="function")renderLesson();
    else if(typeof renderHome==="function")renderHome();
  }
  function showSubject(id){
    if(id==="python")return resumePython();
    state.active=id;persist();close();
    const s=current(), app=document.getElementById("app");
    if(!app)return;
    app.innerHTML='<div class="screen"><div class="top"><div class="brand"><div><h1>Meowde</h1></div></div><button class="lang" type="button" data-subject-trigger></button></div><main class="scroll" style="padding:30px 20px"><p style="font-size:12px;color:var(--muted)">LEARNING SPACE</p><h2 style="font-size:30px;letter-spacing:-.04em;margin:14px 0">'+label(s)+'</h2><p style="line-height:1.65;color:var(--muted)">'+(isEnglish()?"This course is not available yet. Your Python progress and companion remain unchanged.":"이 과목의 레슨은 아직 준비 중이에요. Python 진도와 고양이 기록은 그대로 보관돼요.")+'</p><button type="button" class="btn ghost" data-return-python style="margin-top:28px">'+text("Python으로 돌아가기","Back to Python")+'</button></main></div>';
    placeholder=app.firstElementChild;
    app.querySelector("[data-return-python]").addEventListener("click",resumePython);
    enhance();
  }
  function open(){
    close();
    const overlay=document.createElement("div"); overlay.className="meowde-subject-overlay";
    overlay.innerHTML='<div class="meowde-subject-backdrop"></div><div class="meowde-subject-sheet" role="dialog" aria-modal="true" aria-label="'+text("학습 과목 선택","Choose a subject")+'"><div class="meowde-subject-header"><strong>'+text("학습 과목","Subjects")+'</strong><button type="button" data-close aria-label="Close">×</button></div><div class="meowde-subject-options"></div></div>';
    const options=overlay.querySelector(".meowde-subject-options");
    subjects.forEach(s=>{
      const b=document.createElement("button");b.type="button";b.className="meowde-subject-option";b.innerHTML='<span><strong>'+label(s)+'</strong><small>'+(isEnglish()?s.subtitleEn:s.subtitleKo)+'</small></span><span>'+(s.id===state.active?"✓":"→")+'</span>';
      b.addEventListener("click",()=>showSubject(s.id));options.appendChild(b);
    });
    overlay.querySelector(".meowde-subject-backdrop").addEventListener("click",close);
    overlay.querySelector("[data-close]").addEventListener("click",close);
    document.body.appendChild(overlay);sheet=overlay;
  }
  function enhance(){
    if(busy)return;
    busy=true;
    try{
      const top=document.querySelector("#app .top");if(!top)return;
      let btn=top.querySelector("[data-subject-trigger]");
      if(!btn){btn=document.createElement("button");btn.type="button";btn.className="meowde-subject-trigger";btn.dataset.subjectTrigger="";const lang=top.querySelector(".lang");if(lang)top.insertBefore(btn,lang);else top.appendChild(btn);}
      btn.textContent=label(current())+" ⌄";
      if(!btn.dataset.subjectBound){btn.addEventListener("click",open);btn.dataset.subjectBound="1";}
    }finally{busy=false}
  }
  const css=document.createElement("style");css.textContent=`
.meowde-subject-trigger{margin-left:auto;padding:7px 10px;border:1px solid var(--line,#ddd);border-radius:14px;background:var(--paper,#fff);font:inherit;font-size:12px;font-weight:700;white-space:nowrap}
.meowde-subject-overlay{position:fixed;inset:0;z-index:10000;display:flex;align-items:flex-end;justify-content:center}
.meowde-subject-backdrop{position:absolute;inset:0;background:rgba(25,25,25,.38)}
.meowde-subject-sheet{position:relative;width:min(100%,430px);max-height:75dvh;overflow:auto;background:var(--cream,#fff);border-radius:22px 22px 0 0;padding:21px 18px max(22px,env(safe-area-inset-bottom));box-shadow:0 -12px 36px rgba(0,0,0,.09)}
.meowde-subject-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:15px;font-size:18px}
.meowde-subject-header button{font-size:25px;color:var(--muted);padding:2px 7px}
.meowde-subject-options{display:grid;gap:7px}
.meowde-subject-option{background:var(--paper,#fff);border:1px solid var(--line,#eee);border-radius:15px;width:100%;display:flex;align-items:center;justify-content:space-between;padding:13px;text-align:left}
.meowde-subject-option strong,.meowde-subject-option small{display:block}
.meowde-subject-option strong{font-size:15px}.meowde-subject-option small{font-size:12px;color:var(--muted);margin-top:4px}
`;document.head.appendChild(css);
  const target=document.getElementById("app");
  if(!target)return;
  const observer=new MutationObserver(()=>{if(state.active!=="python"&&placeholder&&!placeholder.isConnected){placeholder=null;state.active="python";persist()}enhance()});
  observer.observe(target,{childList:true,subtree:false});
  enhance();
  if(state.active!=="python")showSubject(state.active);
  window.MeowSubjects={getActive:()=>state.active,switchTo:showSubject,open};
})();
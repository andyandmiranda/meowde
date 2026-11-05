(function(){
"use strict";
const app=document.getElementById("app");if(!app)return;
function enhance(){
 const english=typeof S!=="undefined"&&S.lang==="en";
 // Course readiness belongs in the dedicated learning-path page, not above every tab.
 const top=app.querySelector(".top,.lesson-top");if(!top||top.querySelector("select"))return;
 top.classList.add("meowde-canonical-top");
 const select=document.createElement("select");select.className="meowde-root-subject";select.dataset.subjectNavigation="";
 select.setAttribute("aria-label",english?"Learning subject":"학습 과목");
 let language=top.querySelector("button.lang");
 if(!language&&top.matches('.top')){language=document.createElement('button');language.type='button';language.className='lang';language.textContent=english?'EN':'KO';language.setAttribute('aria-label',english?'Change language':'표시 언어 변경');language.addEventListener('click',()=>{if(typeof langSheet==='function')langSheet();});}
 let actions=top.querySelector(".meowde-top-actions");
 if(!actions){actions=document.createElement("div");actions.className="meowde-top-actions";top.append(actions);}
 actions.append(select);if(language)actions.append(language);
 if(window.MeowdeSubjects)window.MeowdeSubjects.sync();
}
new MutationObserver(enhance).observe(app,{childList:true});enhance();
window.MeowSubjects={version:1};
})();

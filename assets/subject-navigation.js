(function(){
"use strict";
const app=document.getElementById("app");if(!app)return;
function enhance(){
 const english=typeof S!=="undefined"&&S.lang==="en";
 const scroll=app.querySelector('.scroll');
 // Course readiness belongs in the dedicated learning-path page, not above every tab.
 const top=app.querySelector(".top,.lesson-top");if(!top||top.querySelector("[data-subject-navigation]"))return;
 const select=document.createElement("select");select.className="lang";select.dataset.subjectNavigation="";
 select.setAttribute("aria-label",english?"Learning subject":"학습 과목");
 for(const [value,label] of [["python","Python"],["linux",english?"Linux (Korean)":"Linux"]]){const option=document.createElement("option");option.value=value;option.textContent=label;select.append(option);}
 select.value="python";select.addEventListener("change",()=>{if(select.value==="linux"){if(typeof save==="function")save();location.href="/linux-home.html";}});
 const language=top.querySelector(".lang");if(language)top.insertBefore(select,language);else top.append(select);
}
new MutationObserver(enhance).observe(app,{childList:true});enhance();
window.MeowSubjects={version:1};
})();

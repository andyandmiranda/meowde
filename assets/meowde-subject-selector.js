/* One course selector across Meowde screens. No course state or storage mutation. */
(function(root){
"use strict";
const choices=[
 ["python","Python","/?tab=map",true],
 ["linux","Linux","/linux-home.html?tab=learn",true],
 ["ml","머신러닝","/ml-foundations.html",true],
 ["data","데이터 분석 · 준비 중",null,false],
 ["deep","딥러닝 · 준비 중",null,false],
 ["robotics","AI 로보틱스 · 준비 중",null,false]
];
function current(){const p=root.location.pathname;return /linux-/.test(p)?"linux":p.endsWith("/ml-foundations.html")?"ml":"python";}
function sync(){
 root.document.querySelectorAll("select.meowde-root-subject,select.meowde-shell-subject,select.meowde-compact-subject").forEach(select=>{
  if(select.dataset.sharedSubjects==="1")return;
  select.dataset.sharedSubjects="1";
  select.removeAttribute("onchange");select.onchange=null;
  select.replaceChildren();
  choices.forEach(([id,label,url,enabled])=>{const option=root.document.createElement("option");option.value=id;option.textContent=label;option.disabled=!enabled;select.append(option);});
  select.value=current();
  select.addEventListener("change",()=>{const choice=choices.find(c=>c[0]===select.value);if(choice&&choice[2])root.location.assign(choice[2]);});
 });
}
sync();
if(root.MutationObserver){const observer=new root.MutationObserver(sync);observer.observe(root.document.body,{childList:true,subtree:true});}
root.MeowdeSubjects={sync};
})(window);

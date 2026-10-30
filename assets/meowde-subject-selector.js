/* One six-subject selector across Meowde screens. No course state or storage mutation. */
(function(root){
"use strict";
const choices=[
 ["python","Python",true],
 ["linux","Linux",true],
 ["ml","머신러닝",true],
 ["data","데이터 분석 · 준비 중",false],
 ["deep","딥러닝 · 준비 중",false],
 ["robotics","AI 로보틱스 · 준비 중",false]
];
function params(){return new URLSearchParams(root.location.search);}
function current(){
 const p=root.location.pathname,q=params();
 const explicit=q.get("subject");if(["python","linux","ml"].includes(explicit))return explicit;
 if(p.endsWith("/together.html"))return "python";
 return /linux-/.test(p)?"linux":p.endsWith("/ml-foundations.html")?"ml":"python";
}
function routeFor(id){
 const p=root.location.pathname,q=params();
 if(p.endsWith("/together.html"))return "/together.html?subject="+id;
 if(p==="/"&&q.get("tab")==="my")return id==="linux"?"/?tab=my&subject=linux":id==="ml"?"/ml-foundations.html":"/?tab=my&subject=python";
 if(/linux-/.test(p)){
  if(id==="python"){
   if(p.endsWith("/linux-crash-course.html")||p.endsWith("/linux-review.html"))return "/python-lab.html?view=overview";
   if(p.endsWith("/linux-home.html")&&q.get("tab")==="home")return "/?tab=home";
   if(p.endsWith("/linux-home.html")&&q.get("tab")==="my")return "/?tab=my";
   return "/?tab=map";
  }
  if(id==="ml")return "/ml-foundations.html";
 }
 if(p.endsWith("/python-lab.html")){
  if(id==="linux")return "/linux-crash-course.html?view=concept";
  if(id==="ml")return "/ml-foundations.html";
  return "/python-lab.html?view=overview";
 }
 if(id==="linux"){
  const tab=q.get("tab");
  if(tab==="home")return "/linux-home.html?tab=home";
  if(tab==="my")return "/?tab=my&subject=linux";
  return "/linux-home.html?tab=learn";
 }
 if(id==="ml")return "/ml-foundations.html";
 const tab=q.get("tab");
 return "/?tab="+(tab==="map"||tab==="my"||tab==="home"?tab:"home");
}
function sync(){
 root.document.querySelectorAll("select.meowde-root-subject,select.meowde-shell-subject,select.meowde-compact-subject").forEach(select=>{
  if(select.dataset.sharedSubjects==="1")return;
  select.dataset.sharedSubjects="1";
  select.removeAttribute("onchange");select.onchange=null;
  select.replaceChildren();
  choices.forEach(([id,label,enabled])=>{const option=root.document.createElement("option");option.value=id;option.textContent=label;option.disabled=!enabled;select.append(option);});
  select.value=current();
  select.addEventListener("change",()=>{const choice=choices.find(c=>c[0]===select.value);if(choice&&choice[2])root.location.assign(routeFor(choice[0]));});
 });
}
sync();
if(root.MutationObserver){const observer=new root.MutationObserver(sync);observer.observe(root.document.body,{childList:true,subtree:true});}
root.MeowdeSubjects={sync};
})(window);

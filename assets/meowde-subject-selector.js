/* One six-subject selector across Meowde screens. No course/progress storage mutation. */
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
function currentSubject(){
 const p=root.location.pathname,q=params(),s=q.get("subject");
 if(p.endsWith("/together.html")&&["python","linux","ml"].includes(s))return s;
 if(/\/linux-/.test(p)||p.endsWith("/robotics.html"))return "linux";
 if(p.endsWith("/ml-foundations.html"))return "ml";
 return "python";
}
function currentTab(){
 const p=root.location.pathname,q=params(),tab=q.get("tab");
 if(p.endsWith("/together.html"))return "together";
 if(p.endsWith("/python-lab.html")||p.endsWith("/linux-crash-course.html")||p.endsWith("/linux-review.html"))return "deepen";
 if(p.endsWith("/ml-foundations.html")&&!["home","learn","my"].includes(tab))return "deepen";
 if(["home","learn","my"].includes(tab))return tab;
 if(p==="/"||p.endsWith("/index.html")){
  if(tab==="map")return "learn";
  if(tab==="my")return "my";
  return "home";
 }
 if(p.endsWith("/linux-start.html")||p.endsWith("/linux-course.html"))return "learn";
 return "home";
}
function routes(subject){
 if(subject==="linux")return {
  home:"/linux-home.html?tab=home",
  learn:"/linux-home.html?tab=learn",
  deepen:"/linux-crash-course.html?view=concept",
  together:"/together.html?subject=linux",
  my:"/linux-home.html?tab=my"
 };
 if(subject==="ml")return {
  home:"/ml-foundations.html?tab=home",
  learn:"/ml-foundations.html?tab=learn",
  deepen:"/ml-foundations.html",
  together:"/together.html?subject=ml",
  my:"/ml-foundations.html?tab=my"
 };
 return {
  home:"/?tab=home",
  learn:"/?tab=map",
  deepen:"/python-lab.html?view=overview",
  together:"/together.html?subject=python",
  my:"/?tab=my"
 };
}
function routeFor(subject,tab=currentTab()){return routes(subject)[tab]||routes(subject).home;}
function syncSubjects(){
 root.document.querySelectorAll("select.meowde-root-subject,select.meowde-shell-subject,select.meowde-compact-subject").forEach(select=>{
  if(select.dataset.sharedSubjects!=="1"){
   select.dataset.sharedSubjects="1";select.removeAttribute("onchange");select.onchange=null;select.replaceChildren();
   choices.forEach(([id,label,enabled])=>{const option=root.document.createElement("option");option.value=id;option.textContent=label;option.disabled=!enabled;select.append(option);});
   select.addEventListener("change",()=>{const choice=choices.find(c=>c[0]===select.value);if(choice&&choice[2])root.location.assign(routeFor(choice[0]));});
  }
  select.value=currentSubject();
 });
}
function readLanguage(){
 try{
  const raw=root.localStorage.getItem("meowde-v410-state");
  const parsed=raw&&JSON.parse(raw);
  return parsed&&parsed.lang==="en"?"en":"ko";
 }catch{return "ko";}
}
function ensureTopActions(header){
 let actions=header.querySelector(":scope > .meowde-top-actions");
 if(!actions){actions=root.document.createElement("div");actions.className="meowde-top-actions";header.append(actions);}
 const subject=header.querySelector("select.meowde-shell-subject,select.meowde-compact-subject");
 if(subject&&subject.parentElement!==actions)actions.prepend(subject);
 if(!actions.querySelector(".lang,.meowde-shell-language")){
  const language=root.document.createElement("button");
  language.type="button";language.className="lang meowde-shell-language";language.textContent=readLanguage().toUpperCase();
  language.setAttribute("aria-label","표시 언어");
  language.setAttribute("aria-disabled","true");
  language.title="이 화면의 영문 콘텐츠는 아직 준비 중이에요.";
  actions.append(language);
 }
}
function syncTop(){
 root.document.querySelectorAll(".meowde-shell-header,body.linux-five-tabs .top").forEach(ensureTopActions);
}
function syncTabs(){
 const subject=currentSubject(),table=routes(subject);
 root.document.querySelectorAll(".meowde-lab-tabbar").forEach(nav=>{
  nav.querySelectorAll("a").forEach(a=>{
   const label=a.getAttribute("aria-label");
   const id=label==="홈"?"home":label==="학습"?"learn":label==="심화"?"deepen":label==="함께"?"together":label==="마이"?"my":null;
   if(!id)return;
   a.href=table[id];
   if(id===currentTab())a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");
  });
  nav.dataset.subject=subject;
 });
}
function sync(){syncSubjects();syncTop();syncTabs();}
sync();
if(root.MutationObserver){
 const observer=new root.MutationObserver(sync);
 observer.observe(root.document.body,{childList:true,subtree:true});
}
root.MeowdeSubjects=Object.freeze({sync,current:currentSubject,currentTab,routeFor,routes});
})(window);

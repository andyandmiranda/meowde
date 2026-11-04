/* Unified navigation for the four MEOWDE learning entry points.
 * Additive UI only: never reads, mutates, or resets learning records. */
(function(root) {
  "use strict";
  const script=document.currentScript;
  const subject=script && script.dataset.subject;
  const routes=Object.freeze({
    python:{label:"Python",home:"/?tab=home",learn:"/?tab=map",deepen:"/python-lab.html?view=overview",together:"/together.html?subject=python",my:"/?tab=my"},
    linux:{label:"Linux",home:"/linux-home.html?tab=home",learn:"/linux-home.html?tab=learn",deepen:"/linux-crash-course.html?view=concept",together:"/together.html?subject=linux",my:"/linux-home.html?tab=my"},
    ml:{label:"머신러닝",home:"/ml-foundations.html?tab=home",learn:"/ml-foundations.html?tab=learn",deepen:"/ml-foundations.html",together:"/together.html?subject=ml",my:"/ml-foundations.html?tab=my"},
    dl:{label:"딥러닝",home:"/deep-learning-overview.html?tab=home",learn:"/deep-learning.html#units",deepen:null,together:null,my:"/deep-learning-overview.html?tab=my"}
  });
  if(!Object.prototype.hasOwnProperty.call(routes,subject) || !document.body)return;
  const selected=routes[subject];
  function currentTab(){
    const tab=new URLSearchParams(root.location.search).get("tab");
    if(subject==="python")return tab==="my"?"my":tab==="map"?"learn":"home";
    if(subject==="linux")return ["home","learn","my"].includes(tab)?tab:"home";
    if(subject==="ml")return ["home","learn","my"].includes(tab)?tab:"deepen";
    if(root.location.pathname.endsWith("/deep-learning-overview.html"))return tab==="my"?"my":"home";
    return "learn";
  }
  function node(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text)n.textContent=text;return n;}
  const header=node("header","meowde-unified-header");
  header.setAttribute("aria-label","MEOWDE 공통 헤더");
  const inner=node("div","meowde-unified-header-inner");
  const brand=node("a","meowde-unified-brand");
  brand.href="/?tab=home";
  const logo=node("img","meowde-unified-logo");logo.src="/assets/meowde-approved-base.svg?v=450";logo.alt="";logo.width=35;logo.height=35;
  brand.append(logo,node("span","", "Meowde"));
  const subtitle=node("span","meowde-unified-current",selected.label+" · 첫걸음");
  const picker=node("select","meowde-unified-picker");
  picker.setAttribute("aria-label","학습 과목 선택");
  for(const [key,info] of Object.entries(routes)){
    const option=node("option","",info.label);option.value=key;picker.append(option);
  }
  picker.value=subject;
  picker.addEventListener("change",()=>{const next=routes[picker.value];if(next)root.location.assign(next.learn);});
  inner.append(brand,subtitle,picker);header.append(inner);
  const nav=node("nav","meowde-unified-tabs");nav.setAttribute("aria-label","MEOWDE 공통 5탭");
  const icons={home:"⌂",learn:"▤",deepen:"⌘",together:"♡",my:"♙"};
  const labels={home:"홈",learn:"학습",deepen:"심화",together:"함께",my:"마이"};
  const active=currentTab();
  for(const id of ["home","learn","deepen","together","my"]){
    const url=selected[id];
    const link=node(url?"a":"span","meowde-unified-tab");
    if(url)link.href=url;
    else{link.setAttribute("aria-disabled","true");link.title="이 과목의 기능은 준비 중이에요.";}
    if(active===id)link.setAttribute("aria-current","page");
    const symbol=node("span","meowde-unified-tab-icon",icons[id]);symbol.setAttribute("aria-hidden","true");
    link.append(symbol,node("span","meowde-unified-tab-label",labels[id]));
    nav.append(link);
  }
  document.body.classList.add("meowde-unified");
  document.body.dataset.meowdeSubject=subject;
  document.body.prepend(header);
  document.body.append(nav);
  root.MeowdeUnifiedShell=Object.freeze({routes,subject,currentTab});
})(window);

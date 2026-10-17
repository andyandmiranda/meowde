(function(){
"use strict";
const path=location.pathname;
const active=path.endsWith("/linux-home.html")?"home":path.endsWith("/linux-review.html")?"review":path.endsWith("/linux-crash-course.html")?"practice":path.endsWith("/robotics.html")?"":"learn";
const items=[
 ["home","홈","/linux-home.html","⌂"],
 ["learn","학습","/learning-path.html?subject=linux","▦"],
 ["review","복습","/linux-review.html","↻"],
 ["practice","실습","/linux-crash-course.html","⌘"],
 ["my","마이","/?tab=my","♧"]
];
const nav=document.createElement("nav");nav.className="meowde-lab-tabbar";nav.setAttribute("aria-label","메인 메뉴");nav.dataset.subject="linux";
for(const [key,label,href,symbol] of items){
 const a=document.createElement("a");a.href=href;a.setAttribute("aria-label",label);
 if(key===active){a.className="is-active";a.setAttribute("aria-current","page")}
 const icon=document.createElement("span");icon.className="lab-nav-icon";icon.setAttribute("aria-hidden","true");icon.textContent=symbol;
 const text=document.createElement("span");text.textContent=label;a.append(icon,text);nav.append(a);
}
document.body.append(nav);
})();
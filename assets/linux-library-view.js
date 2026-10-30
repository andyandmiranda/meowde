(function(){
"use strict";
document.documentElement.classList.add("learning-library");
const more=document.getElementById("more-learning");more.open=true;
const sections=[
 more.querySelector("#nav").parentElement,
 document.getElementById("lesson"),
 more.querySelector('[aria-label="가상 리눅스 터미널"]'),
 more.querySelector('[aria-label="E8 E9 조건문 실습"]'),
 more.querySelector('[aria-label="Bash 조건문 직접 작성"]')
];
const modes={
 concept:["E1~E9 실습 문제",1],
 terminal:["파일·검색 미션",2],
 condition:["조건문 이해 실습",3],
 bash:["조건문 직접 작성",4]
};
const rawView=new URLSearchParams(location.search).get("view");
const requested=rawView==="practice"?"terminal":rawView;
const mode=Object.prototype.hasOwnProperty.call(modes,requested)?requested:"concept";
const picker=document.createElement("details");picker.className="practice-picker";
const summary=document.createElement("summary");summary.textContent="다른 Linux 심화 실습 보기";
const links=document.createElement("nav");links.setAttribute("aria-label","다른 Linux 심화 실습");
Object.entries(modes).forEach(([value,[title]])=>{if(value===mode)return;const link=document.createElement("a");link.href="/linux-crash-course.html?view="+value;link.textContent=title;links.append(link);});
picker.append(summary,links);more.after(picker);
sections.forEach((section,i)=>{section.hidden=i!==modes[mode][1]});
document.querySelector(".app>h1").textContent=modes[mode][0];
document.querySelector(".app>p.sub").textContent=mode==="concept"?"강의자료의 E 실습 세트예요. 정식 개념 과정은 학습 탭에서 먼저 익혀요.":"배운 개념을 실제 문제 형태로 적용해 봐요.";
window.MeowdeOpenPractice=function(value){if(!Object.prototype.hasOwnProperty.call(modes,value))return;location.href="/linux-crash-course.html?view="+value;};
})();
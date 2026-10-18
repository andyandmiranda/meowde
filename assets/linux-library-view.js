(function(){
"use strict";
document.documentElement.classList.add("learning-library");
const more=document.getElementById("more-learning");more.open=true;
const sections=[more.querySelector("#nav").parentElement,document.getElementById("lesson"),more.querySelector('[aria-label="가상 리눅스 터미널"]'),more.querySelector('[aria-label="E8 E9 조건문 실습"]'),more.querySelector('[aria-label="Bash 조건문 직접 작성"]')];
const control=document.createElement("div");control.className="library-control";
const label=document.createElement("label");label.textContent="무엇을 연습할까요?";label.htmlFor="library-mode";
const select=document.createElement("select");select.id="library-mode";
[["concept","개념과 짧은 퀴즈"],["terminal","파일·검색 미션"],["condition","조건문 이해하기"],["bash","조건문 직접 작성"]].forEach(([value,title])=>{const o=document.createElement("option");o.value=value;o.textContent=title;select.append(o)});
control.append(label,select);more.before(control);
function show(mode){sections.forEach((s,i)=>{s.hidden=!(mode==="concept"?(i===0||i===1):mode==="terminal"?i===2:mode==="condition"?i===3:i===4)})}
window.MeowdeOpenPractice=function(mode){if(!["concept","terminal","condition","bash"].includes(mode))return;select.value=mode;show(mode);};
select.onchange=()=>show(select.value);show("concept");
})();

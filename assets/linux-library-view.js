(function(){
"use strict";
document.documentElement.classList.add("learning-library");
const more=document.getElementById("more-learning");more.open=true;
const navSection=more.querySelector("#nav")?.parentElement;
const lesson=document.getElementById("lesson");
const terminal=more.querySelector('[aria-label="가상 리눅스 터미널"]');
const condition=more.querySelector('[aria-label="E8 E9 조건문 실습"]');
const bash=more.querySelector('[aria-label="Bash 조건문 직접 작성"]');

const practiceHub=document.createElement("section");
practiceHub.className="card linux-source-exercises";
practiceHub.setAttribute("aria-label","강의자료 원본 Linux 실습 세트");
const sets=[
 ["exercise1","기초 실습 세트 1","README + check.sh"],
 ["exercise2","기초 실습 세트 2","README + check.sh"],
 ["exercise3","기초 실습 세트 3","README 기반 문제"],
 ["exercise4","기초 실습 세트 4","README 기반 문제"],
 ["E5","권한 단원 실습","01~10 + check.sh"],
 ["E6","프로세스 단원 실습","01~10 + check.sh"],
 ["E7","패키지 단원 실습","01~05 + check.sh"],
 ["E8","Shell Script·Network 자료 실습","README + check.sh"],
 ["E9","Shell Script·Network 자료 실습","README + check.sh"],
 ["E10","Shell Script·Network 자료 실습","README + check.sh"]
];
practiceHub.innerHTML='<h2>원본 Exercise · E5~E10</h2><p class="sub">강의자료의 실습 구조를 그대로 구분했어요. 실제 문제는 각 폴더의 README와 check.sh가 기준이며, 원문이 확보되지 않은 개별 문항을 임의로 만들어 넣지 않아요.</p><div class="linux-source-grid">'+sets.map(([id,title,meta])=>'<article class="linux-source-card"><b>'+id+'</b><span>'+title+'</span><small>'+meta+'</small><em>원본 실습 세트</em></article>').join("")+'</div><p class="sub" style="margin-top:14px">아래의 가상 터미널·조건문·Bash 실습은 앱 안에서 바로 할 수 있는 별도 응용 실습이에요.</p>';

const modes={
 concept:["원본 실습 세트","concept"],
 terminal:["가상 터미널 미션","terminal"],
 condition:["조건문 이해 실습","condition"],
 bash:["Bash 직접 작성","bash"]
};
const rawView=new URLSearchParams(location.search).get("view");
const requested=rawView==="practice"?"terminal":rawView;
const mode=Object.prototype.hasOwnProperty.call(modes,requested)?requested:"concept";

more.before(practiceHub);
const all=[navSection,lesson,terminal,condition,bash,practiceHub].filter(Boolean);
all.forEach(x=>x.hidden=true);
if(mode==="concept")practiceHub.hidden=false;
if(mode==="terminal"&&terminal)terminal.hidden=false;
if(mode==="condition"&&condition)condition.hidden=false;
if(mode==="bash"&&bash)bash.hidden=false;

const picker=document.createElement("details");picker.className="practice-picker";
const summary=document.createElement("summary");summary.textContent="다른 Linux 심화 실습 보기";
const links=document.createElement("nav");links.setAttribute("aria-label","다른 Linux 심화 실습");
Object.entries(modes).forEach(([value,[title]])=>{if(value===mode)return;const link=document.createElement("a");link.href="/linux-crash-course.html?view="+value;link.textContent=title;links.append(link);});
picker.append(summary,links);more.after(picker);

const title=document.querySelector(".app>h1"),sub=document.querySelector(".app>p.sub");
if(title)title.textContent=modes[mode][0];
if(sub)sub.textContent=mode==="concept"?"E/exercise는 정식 개념 과정이 아니라 강의자료의 실습 문제 묶음이에요.":"정식 학습에서 배운 개념을 실제 문제 형태로 적용해 봐요.";

window.MeowdeOpenPractice=function(value){if(!Object.prototype.hasOwnProperty.call(modes,value))return;location.href="/linux-crash-course.html?view="+value;};
})();
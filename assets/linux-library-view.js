(function(){
"use strict";
document.documentElement.classList.add("learning-library");
const more=document.getElementById("more-learning");more.open=true;
const navSection=more.querySelector("#nav")?.parentElement,lesson=document.getElementById("lesson");
const terminal=more.querySelector('[aria-label="가상 리눅스 터미널"]'),condition=more.querySelector('[aria-label="E8 E9 조건문 실습"]'),bash=more.querySelector('[aria-label="Bash 조건문 직접 작성"]');
const practiceHub=document.createElement("section");practiceHub.className="card linux-source-exercises";practiceHub.setAttribute("aria-label","강의자료 원본 Linux 실습 세트");
const sets=[["exercise1","기초 실습 1","README + check.sh"],["exercise2","기초 실습 2","README + check.sh"],["exercise3","기초 실습 3","README 기반"],["exercise4","기초 실습 4","README 기반"],["E5","권한","01~10 + check.sh"],["E6","프로세스","01~10 + check.sh"],["E7","패키지","01~05 + check.sh"],["E8","Shell Script·Network","README + check.sh"],["E9","Shell Script·Network","README + check.sh"],["E10","Shell Script·Network","README + check.sh"]];
practiceHub.innerHTML='<h2>원본 실습</h2><p class="sub">강의자료의 Exercise·E5~E10 구조만 보존해요. 원문이 없는 문제는 임의로 만들지 않아요.</p><div class="linux-source-list">'+sets.map(([id,title,meta])=>'<div class="linux-source-row"><b>'+id+'</b><span>'+title+'</span><small>'+meta+'</small></div>').join("")+'</div>';
const modes={concept:["원본 실습","concept"],terminal:["가상 터미널","terminal"],condition:["조건문","condition"],bash:["Bash 작성","bash"]};
const raw=new URLSearchParams(location.search).get("view"),requested=raw==="practice"?"terminal":raw,mode=Object.prototype.hasOwnProperty.call(modes,requested)?requested:"concept";
more.before(practiceHub);const all=[navSection,lesson,terminal,condition,bash,practiceHub].filter(Boolean);all.forEach(x=>x.hidden=true);if(mode==="concept")practiceHub.hidden=false;if(mode==="terminal"&&terminal)terminal.hidden=false;if(mode==="condition"&&condition)condition.hidden=false;if(mode==="bash"&&bash)bash.hidden=false;
const tabs=document.createElement("nav");tabs.className="linux-deepen-tabs";tabs.setAttribute("aria-label","Linux 심화 학습 유형");Object.entries(modes).forEach(([value,[title]])=>{const a=document.createElement("a");a.href="/linux-crash-course.html?view="+value;a.textContent=title;if(value===mode)a.setAttribute("aria-current","page");tabs.append(a)});practiceHub.before(tabs);if(mode!=="concept"){const visible=mode==="terminal"?terminal:mode==="condition"?condition:bash;visible.before(tabs)}
const title=document.querySelector(".linux-deepen-head h1"),sub=document.querySelector(".linux-deepen-head p.sub");if(title)title.textContent="심화 학습";if(sub)sub.textContent=modes[mode][0]+"을 연습해요.";
window.MeowdeOpenPractice=value=>{if(Object.prototype.hasOwnProperty.call(modes,value))location.href="/linux-crash-course.html?view="+value};
})();
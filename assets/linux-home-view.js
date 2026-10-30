(function(){
"use strict";
const params=new URLSearchParams(location.search);
if(params.get("tab")!=="home")return;
const main=document.querySelector("main.shell");if(!main)return;
const header=main.querySelector("header.top");
const units=["Linux와 Ubuntu","경로와 디렉터리","파일과 폴더 관리","파일 읽기와 편집","검색","파이프와 리디렉션","사용자·그룹·권한","프로세스","패키지","Shell Script와 변수","조건문과 반복문","Network와 자동화"];
let state={version:1,unit:0,step:0,done:{}};
try{const raw=localStorage.getItem("meowde-linux-course-v1");if(raw){const p=JSON.parse(raw);if(p&&p.version===1)state={...state,...p,done:p.done&&typeof p.done==="object"?p.done:{}}}}catch{}
const done=Object.keys(state.done||{}).filter(k=>state.done[k]===true).length;
const next=units.findIndex((_,i)=>!state.done[i]);const index=next>=0?next:Math.min(11,Number(state.unit)||0);
const section=document.createElement("section");section.className="linux-home-dashboard";
section.innerHTML=
'<div class="linux-home-kicker">오늘의 학습</div>'+
'<section class="lesson-card linux-home-hero"><div class="linux-home-hero-main"><img src="/assets/meowde-approved-headphones.svg?v=450" alt="" width="110" height="118"><div><span class="meta">LESSON '+String(index+1).padStart(2,"0")+'</span><h1>'+units[index]+'</h1><p class="muted">개념을 읽고 문제로 바로 확인해요.</p></div></div><a class="primary" href="/linux-course.html?unit='+(index+1)+'">'+(state.step||done?"이어하기":"학습 시작하기")+'</a><a class="secondary" href="/linux-home.html?tab=learn">전체 학습 경로 보기 →</a></section>'+
'<section class="lesson-card linux-home-row"><div><span class="meta">현재 과정</span><h2>Linux 기초</h2><p class="muted">'+done+' / 12 완료</p></div><a class="secondary" href="/linux-home.html?tab=learn" aria-label="Linux 학습 지도 열기">→</a></section>'+
'<section class="lesson-card linux-home-row"><div><span class="meta">심화 학습</span><h2>Linux 실습</h2><p class="muted">원본 Exercise·터미널·Bash 실습</p></div><a class="secondary" href="/linux-crash-course.html?view=concept" aria-label="Linux 심화 학습 열기">→</a></section>';
main.replaceChildren(header,section);
const style=document.createElement("style");style.textContent=`
.linux-home-dashboard{padding:0 0 18px}.linux-home-kicker{padding:0 4px 10px;font-size:13px;font-weight:800;color:#80556A}
.linux-home-hero{padding:20px}.linux-home-hero-main{display:grid;grid-template-columns:118px minmax(0,1fr);align-items:center;gap:16px}.linux-home-hero-main img{width:110px;height:118px;object-fit:contain}.linux-home-hero h1{font-size:28px;margin:5px 0 8px}.linux-home-hero .primary{margin-top:14px}.linux-home-row{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:20px}.linux-home-row h2{font-size:18px;margin:5px 0 2px}.linux-home-row .muted{margin:0;font-size:13px}.linux-home-row>.secondary{width:48px;min-width:48px;font-size:24px;padding:8px}
@media(max-width:370px){.linux-home-hero-main{grid-template-columns:92px minmax(0,1fr)}.linux-home-hero-main img{width:88px;height:96px}.linux-home-hero h1{font-size:24px}}
`;document.head.append(style);
})();
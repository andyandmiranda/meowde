(function(){
"use strict";
const params=new URLSearchParams(location.search);
if(params.get("tab")&&params.get("tab")!=="home")return;
const main=document.querySelector("main.shell");if(!main)return;
const header=main.querySelector("header.top");
const units=["Linux와 Ubuntu","경로와 디렉터리","파일과 폴더 관리","파일 읽기와 편집","검색","파이프와 리디렉션","사용자·그룹·권한","프로세스","패키지","Shell Script와 변수","조건문과 반복문","Network와 자동화"];
let course={done:{},unit:0,step:0},practice={done:{}};
try{const raw=localStorage.getItem("meowde-linux-course-v1");if(raw){const p=JSON.parse(raw);if(p&&p.version===1)course={...course,...p,done:p.done&&typeof p.done==="object"?p.done:{}}}}catch{}
try{const raw=localStorage.getItem("meowde-linux-cram-v1");if(raw){const p=JSON.parse(raw);if(p&&typeof p==="object")practice={...practice,...p,done:p.done&&typeof p.done==="object"?p.done:{}}}}catch{}
const courseDone=Object.keys(course.done||{}).filter(k=>course.done[k]===true).length;
const oldDone=Object.keys(practice.done||{}).filter(k=>practice.done[k]===true).length;
const next=units.findIndex((_,i)=>!course.done[i]);
const nextIndex=next>=0?next:Math.min(units.length-1,Number(course.unit)||0);
const section=document.createElement("section");section.className="linux-home-dashboard";
section.innerHTML=
'<div class="linux-home-intro"><img src="/assets/meowde-approved-headphones.svg?v=450" alt="" width="64" height="68"><div><p class="eyebrow">오늘 학습</p><h1>'+units[nextIndex]+'</h1></div></div>'+
'<section class="lesson-card linux-home-card"><span class="meta">현재 과정 · '+courseDone+' / 12단원 완료</span><h2>Linux 기초</h2><p class="muted">'+units[nextIndex]+'부터 이어서 학습해요.</p><div class="linux-home-actions"><a class="primary" href="/linux-course.html?unit='+(nextIndex+1)+'">'+(courseDone||course.step?'이어하기 →':'시작하기 →')+'</a><a class="secondary" href="/linux-home.html?tab=learn">지도 보기</a></div></section>'+
'<section class="lesson-card linux-home-card"><span class="meta">기록 '+oldDone+'개 보존</span><h2>심화 학습</h2><p class="muted">Exercise와 터미널·Bash 실습을 이어가요.</p><a class="primary" href="/linux-crash-course.html?view=concept">심화 열기 →</a></section>'+
'<a class="legal" href="/content-notice.html">학습 콘텐츠 안내</a>';
main.replaceChildren(header,section);
})();

(function(){
"use strict";
const params=new URLSearchParams(location.search);
if(params.get("tab")!=="home")return;
const main=document.querySelector("main.shell");if(!main)return;
const header=main.querySelector("header.top");
let course={done:{},unit:0,step:0},practice={done:{}};
try{const raw=localStorage.getItem("meowde-linux-course-v1");if(raw){const p=JSON.parse(raw);if(p&&p.version===1)course={...course,...p,done:p.done&&typeof p.done==="object"?p.done:{}}}}catch{}
try{const raw=localStorage.getItem("meowde-linux-cram-v1");if(raw){const p=JSON.parse(raw);if(p&&typeof p==="object")practice={...practice,...p,done:p.done&&typeof p.done==="object"?p.done:{}}}}catch{}
const courseDone=Object.keys(course.done||{}).filter(k=>course.done[k]===true).length;
const oldDone=Object.keys(practice.done||{}).filter(k=>practice.done[k]===true).length;
const section=document.createElement("section");section.className="linux-home-dashboard";
section.innerHTML=
'<div class="hero compact" style="padding-top:4px"><img src="/assets/meowde-approved-headphones.svg?v=450" alt="" width="92" height="98"><div><p class="eyebrow">LINUX</p><h1 style="margin-bottom:6px">오늘 할 Linux 학습을 골라요.</h1><p class="muted" style="margin:0">개념 학습과 원본 실습을 분리해서 보여줘요.</p></div></div>'+
'<section class="lesson-card"><span class="meta">정식 학습 · '+courseDone+' / 12단원 완료</span><h2>개념 → Lv1 → Lv2 → Lv3</h2><p class="muted">강의자료 순서대로 개념을 익히고 난이도별 문제로 이해도를 확인해요.</p><a class="primary" href="/linux-home.html?tab=learn">'+(courseDone||course.step?'학습 이어가기 →':'정식 학습 시작하기 →')+'</a></section>'+
'<section class="lesson-card"><span class="meta">심화 실습 · 기존 기록 '+oldDone+'개 보존</span><h2>Exercise · E5~E10</h2><p class="muted">README/check.sh 기반 원본 실습 세트와 터미널·Bash 응용을 모아둬요. 임의의 개념 레슨으로 바꾸지 않아요.</p><a class="primary" href="/linux-crash-course.html?view=concept">심화 실습 보기 →</a></section>'+
'<a class="secondary" href="/linux-review.html">집중 복습 보기</a><a class="legal" href="/content-notice.html">학습 콘텐츠 안내</a>';
main.replaceChildren(header,section);
})();
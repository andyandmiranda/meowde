/* Read-only subject overview. Existing Python and Linux progress remain owned by their own course engines. */
(function(root){
"use strict";
const PYTHON_KEY="meowde-v410-state",LINUX_KEY="meowde-linux-guided-v1";
function read(storage,key){try{const raw=storage.getItem(key);return raw===null?null:JSON.parse(raw);}catch(_){return null;}}
function pythonStatus(storage){const value=read(storage,PYTHON_KEY);if(!value||typeof value!=="object")return "처음 시작하기";const done=Array.isArray(value.done)?new Set(value.done.filter(n=>Number.isInteger(n)&&n>=0&&n<60)).size:0;const progress=value.inProgress||value;const inProgress=!!(Array.isArray(progress.queue)&&progress.queue.length&&Number.isInteger(progress.idx)&&progress.idx>=0&&progress.idx<progress.queue.length);return done?done+"개 레슨 완료"+(inProgress?" · 이어하기":""):inProgress?"진행 중인 레슨 이어하기":"학습 기록에서 이어하기";}
function linuxStatus(storage){const value=read(storage,LINUX_KEY);if(!value||value.version!==1||!Number.isInteger(value.step)||value.step<0||value.step>4)return "첫 레슨 시작하기";return value.step===4?"첫 레슨 완료":value.step>0?"첫 레슨 "+(value.step+1)+"/4 이어하기":"첫 레슨 시작하기";}
function render(storage,subject){const current=subject==="linux"?"linux":"python";return '<section class="meowde-subject-overview" aria-label="과목별 학습 현황"><h2>나의 학습</h2><p>한 제품에서 두 과목을 골라 배워요. 실습은 과목에 맞는 도구로 진행해요.</p><div class="subject-options"><a href="/"'+(current==="python"?' aria-current="page"':'')+'><b>Python</b><small>'+pythonStatus(storage)+'</small></a><a href="/linux-home.html"'+(current==="linux"?' aria-current="page"':'')+'><b>Linux</b><small>'+linuxStatus(storage)+'</small></a></div><p class="overview-note">진도는 이 브라우저에만 저장되며 두 과목의 점수는 합산하지 않아요.</p></section>';}
function mount(subject){let storage;try{storage=root.localStorage;}catch(_){storage=null;}const target=root.document&&root.document.getElementById("meowde-subject-overview");if(target){target.innerHTML=render(storage||{getItem(){return null;}},subject);}}
root.MeowdeSubjectHub={PYTHON_KEY,LINUX_KEY,pythonStatus,linuxStatus,render,mount};
})(typeof window!=="undefined"?window:globalThis);

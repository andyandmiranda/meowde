(function(){
'use strict';
if(new URLSearchParams(location.search).get('tab')!=='learn')return;
const main=document.querySelector('main.shell'),map=document.getElementById('linux-learning-map'),list=document.getElementById('linux-map-list');
if(!main||!map||!list)return;
document.body.classList.add('subject-map-screen');
for(const el of main.children)if(el!==main.querySelector('header.top')&&el!==map)el.hidden=true;
map.hidden=false;map.style.display='block';
const units=['위치와 파일','파일 읽기','찾기와 검색','파이프와 텍스트','권한','프로세스','패키지','쉘 스크립트','조건문'];
let saved={index:0,done:{}};try{const raw=localStorage.getItem('meowde-linux-cram-v1');if(raw){const parsed=JSON.parse(raw);if(parsed&&typeof parsed==='object'&&!Array.isArray(parsed))saved={...saved,...parsed,done:parsed.done&&typeof parsed.done==='object'&&!Array.isArray(parsed.done)?parsed.done:{}}}}catch{}
const done=units.filter((_,index)=>saved.done[index]===true).length;
const current=Math.min(units.length-1,Math.max(0,Number.isInteger(saved.index)?saved.index:units.findIndex((_,index)=>!saved.done[index])));
document.getElementById('linux-map-progress-count').textContent=done+' / '+units.length+' 완료';
document.getElementById('linux-map-progress-bar').style.width=(done/units.length*100)+'%';
list.className='subject-map-trail';
list.replaceChildren(...units.map((title,index)=>{
 const link=document.createElement('a'),complete=saved.done[index]===true;
 link.className='subject-map-node '+(complete?'complete':index===current?'current':'');link.href='/linux-crash-course.html?lesson='+(index+1);
 link.setAttribute('aria-label',title+' · '+(complete?'완료':index===current?'현재 학습':'학습하기'));
 link.innerHTML='<span class="subject-map-ball" aria-hidden="true">'+(complete?'✓':String(index+1).padStart(2,'0'))+'</span><strong>'+title+'</strong><small>'+(complete?'완료':index===current?'이어서 학습':'시작하기')+'</small>';
 return link;
}));
})();

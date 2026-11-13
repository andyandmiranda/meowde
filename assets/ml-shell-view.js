(function(){
'use strict';
const style=document.createElement('link');style.rel='stylesheet';style.href='/assets/ml-shell-view.css?v=1';document.head.append(style);
const tab=new URLSearchParams(location.search).get('tab');if(!['home','learn','my'].includes(tab))return;
const main=document.querySelector('main'),lesson=document.getElementById('lesson'),status=document.getElementById('storage-status');
let done=0;try{const raw=localStorage.getItem('meowde-ml-foundations-v1'),saved=raw&&JSON.parse(raw);done=Array.isArray(saved?.done)?new Set(saved.done.filter(id=>['linear','logistic','knn','bayes'].includes(id))).size:0;}catch{}
const links=document.querySelectorAll('.meowde-lab-tabbar a');links.forEach(link=>link.removeAttribute('aria-current'));
const active=tab==='home'?0:tab==='learn'?1:4;links[active]?.setAttribute('aria-current','page');
const subtitle=document.querySelector('.meowde-shell-brand small');if(subtitle)subtitle.textContent='머신러닝 · '+(tab==='home'?'홈':tab==='learn'?'학습':'마이');
if(tab==='home')main.innerHTML='<section class="ml-shell-page meowde-subject-page"><p class="ml-kicker">오늘 학습</p><h1>머신러닝 첫걸음</h1><article class="meowde-subject-card"><small>현재 과정 · '+done+' / 4 완료</small><h2>ML 핵심 개념</h2><p>Linear Regression부터 Naive Bayes까지 연습해요.</p><a class="unit meowde-subject-primary" href="/ml-foundations.html">학습 시작하기 →</a></article><article class="meowde-subject-card"><small>준비 중</small><h2>심화 학습</h2><p>실제 모델 학습과 수학 심화는 준비 중이에요.</p></article></section>';
if(tab==='learn'){
 document.body.classList.add('subject-map-screen');main.classList.add('ml-learn-page');
 const requested=new URLSearchParams(location.search).get('unit');
 const units=window.MeowdeMLFoundations?.units||[];
 const valid=units.some(unit=>unit.id===requested);
 const title=document.querySelector('main>h1'),copy=document.querySelector('main>h1+p'),nav=document.getElementById('units');
 if(valid){title.textContent=units.find(unit=>unit.id===requested).title;copy.innerHTML='<a href="/ml-foundations.html?tab=learn">← 머신러닝 학습 지도</a>';nav.hidden=true;if(lesson)lesson.hidden=false;}
 else{
  title.textContent='머신러닝 학습 지도';copy.textContent='전체 4개 단원을 한눈에 보고 원하는 노드를 바로 열 수 있어요.';
  if(lesson)lesson.hidden=true;
  const progress=document.createElement('section');progress.className='subject-map-progress';progress.innerHTML='<div class="subject-map-progress-row"><strong>ML 핵심 개념</strong><span>'+done+' / 4 완료</span></div><div class="subject-map-progress-track"><span style="width:'+(done/4*100)+'%"></span></div>';
  nav.before(progress);nav.className='subject-map-trail';
  const completed=new Set();try{const saved=JSON.parse(localStorage.getItem('meowde-ml-foundations-v1')||'{}');(saved.done||[]).forEach(id=>completed.add(id));}catch{}
  Array.from(nav.children).forEach((button,index)=>{const unit=units[index],complete=completed.has(unit.id);button.className='subject-map-node '+(complete?'complete':index===done?'current':'');button.innerHTML='<span class="subject-map-ball" aria-hidden="true">'+(complete?'✓':String(index+1).padStart(2,'0'))+'</span><strong>'+unit.title.replace(/^\d+\.\s*/, '')+'</strong><small>'+(complete?'완료':index===done?'이어서 학습':'시작하기')+'</small>';button.onclick=()=>location.assign('/ml-foundations.html?tab=learn&unit='+encodeURIComponent(unit.id));});
  if(status)status.textContent='완료 '+done+' / 4 · 단원을 자유롭게 선택할 수 있어요.';
 }
}
if(tab==='my')main.innerHTML='<section class="ml-shell-page meowde-subject-page"><h1>마이</h1><p>머신러닝 학습 기록과 설정을 확인해요.</p><article class="meowde-subject-card"><small>학습 진도</small><h2>'+done+' / 4 단원 완료</h2><progress class="meowde-subject-progress" max="4" value="'+done+'" aria-label="ML 단원 완료율"></progress><p><a class="unit meowde-subject-primary" href="/ml-foundations.html">학습 이어하기 →</a></p></article><article class="meowde-subject-card"><small>제공 범위</small><h2>ML 첫걸음</h2><p>4개 입문 개념을 제공해요. 심화 과정은 준비 중이에요.</p></article><a class="ml-settings meowde-subject-secondary" href="/?tab=my">공통 프로필·설정</a></section>';
})();

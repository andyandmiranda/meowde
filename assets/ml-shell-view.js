(function(){
'use strict';
const style=document.createElement('link');style.rel='stylesheet';style.href='/assets/ml-shell-view.css?v=1';document.head.append(style);
const tab=new URLSearchParams(location.search).get('tab');if(!['home','learn','my'].includes(tab))return;
const main=document.querySelector('main'),lesson=document.getElementById('lesson'),status=document.getElementById('storage-status');
let done=0;try{const raw=localStorage.getItem('meowde-ml-foundations-v1'),saved=raw&&JSON.parse(raw);done=Array.isArray(saved?.done)?saved.done.length:0;}catch{}
const links=document.querySelectorAll('.meowde-lab-tabbar a');links.forEach(link=>link.removeAttribute('aria-current'));
const active=tab==='home'?0:tab==='learn'?1:4;links[active]?.setAttribute('aria-current','page');
const subtitle=document.querySelector('.meowde-shell-brand small');if(subtitle)subtitle.textContent='머신러닝 · '+(tab==='home'?'홈':tab==='learn'?'학습':'마이');
if(tab==='home')main.innerHTML='<section class="ml-shell-page"><p class="ml-kicker">오늘 학습</p><h1>머신러닝 첫걸음</h1><article><small>현재 과정 · '+done+' / 4 완료</small><h2>ML 핵심 개념</h2><p>Linear Regression부터 Naive Bayes까지 연습해요.</p><a class="unit" href="/ml-foundations.html">학습 시작하기 →</a></article><article><small>준비 중</small><h2>심화 학습</h2><p>실제 모델 학습과 수학 심화는 준비 중이에요.</p></article></section>';
if(tab==='learn'){main.classList.add('ml-learn-page');document.querySelector('main>h1').textContent='학습 지도';document.querySelector('main>h1+p').textContent='4개 입문 단원을 선택해요.';if(lesson)lesson.hidden=true;if(status)status.textContent='완료 '+done+' / 4';}
if(tab==='my')main.innerHTML='<section class="ml-shell-page"><h1>마이</h1><p>머신러닝 학습 기록과 설정을 확인해요.</p><article><small>학습 진도</small><h2>'+done+' / 4 단원 완료</h2><progress max="4" value="'+done+'" aria-label="ML 단원 완료율"></progress><p><a class="unit" href="/ml-foundations.html">학습 이어하기 →</a></p></article><article><small>제공 범위</small><h2>ML 첫걸음</h2><p>4개 입문 개념을 제공해요. 심화 과정은 준비 중이에요.</p></article><a class="ml-settings" href="/?tab=my">공통 프로필·설정</a></section>';
})();

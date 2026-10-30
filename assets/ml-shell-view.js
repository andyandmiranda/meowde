(function(){
'use strict';
const tab=new URLSearchParams(location.search).get('tab');if(!['home','learn','my'].includes(tab))return;
const main=document.querySelector('main'),lesson=document.getElementById('lesson'),status=document.getElementById('storage-status');
let done=0;try{const raw=localStorage.getItem('meowde-ml-foundations-v1'),saved=raw&&JSON.parse(raw);done=Array.isArray(saved?.done)?saved.done.length:0;}catch{}
const links=document.querySelectorAll('.meowde-lab-tabbar a');links.forEach(link=>link.removeAttribute('aria-current'));
const active=tab==='home'?0:tab==='learn'?1:4;links[active]?.setAttribute('aria-current','page');
if(tab==='home')main.innerHTML='<h1>머신러닝 홈</h1><p>현재 제공되는 4개 입문 개념부터 시작해요. 실제 모델 학습과 수학 심화는 준비 중이에요.</p><article><small>현재 과정 · '+done+' / 4 완료</small><h2>ML 첫걸음</h2><p>Linear Regression부터 Naive Bayes까지 핵심 개념을 연습해요.</p><a class="unit" href="/ml-foundations.html">학습 시작하기 →</a></article>';
if(tab==='learn'){document.querySelector('main>h1').textContent='학습 지도';document.querySelector('main>h1+p').textContent='현재 제공되는 4개 입문 단원을 한곳에서 선택해요.';if(lesson)lesson.hidden=true;if(status)status.textContent='완료 '+done+' / 4';}
if(tab==='my')main.innerHTML='<h1>마이 · 머신러닝</h1><p>머신러닝 학습 기록</p><article><small>전체 진도</small><h2>'+done+' / 4 단원</h2><progress max="4" value="'+done+'" aria-label="ML 단원 완료율"></progress><p><a class="unit" href="/ml-foundations.html">저장한 학습 이어하기 →</a></p></article><article><h2>현재 제공 범위</h2><p>4개 입문 개념을 제공해요. 실제 모델 학습과 수학 심화는 준비 중이에요.</p></article>';
})();

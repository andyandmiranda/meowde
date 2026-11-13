(function(){
'use strict';
const style=document.createElement('link');style.rel='stylesheet';style.href='/assets/ml-shell-view.css?v=1';document.head.append(style);
const tab=new URLSearchParams(location.search).get('tab');if(!['home','learn','my'].includes(tab))return;
const main=document.querySelector('main'),lesson=document.getElementById('lesson'),status=document.getElementById('storage-status');
let done=0;try{const raw=localStorage.getItem('meowde-ml-foundations-v1'),saved=raw&&JSON.parse(raw);done=Array.isArray(saved?.done)?new Set(saved.done.filter(id=>['linear','logistic','knn','bayes'].includes(id))).size:0;}catch{}
const links=document.querySelectorAll('.meowde-lab-tabbar a');links.forEach(link=>link.removeAttribute('aria-current'));
const active=tab==='home'?0:tab==='learn'?1:4;links[active]?.setAttribute('aria-current','page');
const subtitle=document.querySelector('.meowde-shell-brand small');if(subtitle)subtitle.textContent='머신러닝 · '+(tab==='home'?'홈':tab==='learn'?'학습':'마이');
if(tab==='home')main.innerHTML='<section class="ml-shell-page meowde-subject-page"><p class="ml-kicker">오늘 학습</p><h1>머신러닝 첫걸음</h1><article class="meowde-subject-card"><small>현재 과정 · '+done+' / 4 완료</small><h2>ML 핵심 개념</h2><p>Linear Regression부터 Naive Bayes까지 연습해요.</p><a class="unit meowde-subject-primary" href="/ml-foundations.html?tab=learn">학습 시작하기 →</a></article><article class="meowde-subject-card"><small>준비 중</small><h2>심화 학습</h2><p>실제 모델 학습과 수학 심화는 준비 중이에요.</p></article></section>';
if(tab==='learn'){
 main.classList.add('ml-learn-page');
 const units=window.MeowdeMLFoundations?.units||[];
 const requested=new URLSearchParams(location.search).get('unit');
 const selected=units.find(unit=>unit.id===requested);
 const title=main.querySelector('h1'),description=main.querySelector('h1+p');
 const nav=document.getElementById('units');
 if(selected){
  // The existing ML engine already renders the selected unit and owns grading/storage.
  title.textContent=selected.title;
  description.replaceChildren();
  const back=document.createElement('a');back.href='/ml-foundations.html?tab=learn';back.textContent='← 머신러닝 학습 지도';
  description.append(back);
  if(nav)nav.hidden=true;
  if(lesson)lesson.hidden=false;
 }else{
  title.textContent='머신러닝 학습 지도';
  description.textContent='전체 4개 단원을 선택해요.';
  if(lesson)lesson.hidden=true;
  if(nav){
   const progress=document.createElement('p');progress.className='ml-map-progress';progress.textContent='완료 '+done+' / '+units.length;
   nav.before(progress);nav.classList.add('ml-learning-trail');
   const completed=new Set();
   try{const raw=localStorage.getItem('meowde-ml-foundations-v1');const saved=raw&&JSON.parse(raw);if(Array.isArray(saved?.done))saved.done.forEach(id=>completed.add(id));}catch{}
   let nextIndex=units.findIndex(unit=>!completed.has(unit.id));if(nextIndex<0)nextIndex=units.length-1;
   Array.from(nav.children).forEach((button,index)=>{
    const unit=units[index];if(!unit)return;
    const complete=completed.has(unit.id);
    button.className='ml-learning-node'+(complete?' complete':index===nextIndex?' current':'');
    button.textContent=(complete?'✓ ':String(index+1).padStart(2,'0')+' · ')+unit.title.replace(/^\d+\.\s*/, '');
    button.setAttribute('aria-label',unit.title+' · '+(complete?'완료':index===nextIndex?'현재 학습':'학습하기'));
    button.onclick=()=>location.assign('/ml-foundations.html?tab=learn&unit='+encodeURIComponent(unit.id));
   });
  }
 }
 if(status)status.textContent='완료 '+done+' / '+units.length;
}
if(tab==='my')main.innerHTML='<section class="ml-shell-page meowde-subject-page"><h1>마이</h1><p>머신러닝 학습 기록과 설정을 확인해요.</p><article class="meowde-subject-card"><small>학습 진도</small><h2>'+done+' / 4 단원 완료</h2><progress class="meowde-subject-progress" max="4" value="'+done+'" aria-label="ML 단원 완료율"></progress><p><a class="unit meowde-subject-primary" href="/ml-foundations.html?tab=learn">학습 이어하기 →</a></p></article><article class="meowde-subject-card"><small>제공 범위</small><h2>ML 첫걸음</h2><p>4개 입문 개념을 제공해요. 심화 과정은 준비 중이에요.</p></article><a class="ml-settings meowde-subject-secondary" href="/?tab=my">공통 프로필·설정</a></section>';
})();

(function(){
'use strict';
const style=document.createElement('link');style.rel='stylesheet';style.href='/assets/ml-shell-view.css?v=1';document.head.append(style);
const tab=new URLSearchParams(location.search).get('tab')||'learn';if(!['home','learn','my'].includes(tab))return;
const main=document.querySelector('main'),lesson=document.getElementById('lesson'),status=document.getElementById('storage-status');
let done=0;try{const raw=localStorage.getItem('meowde-ml-foundations-v1'),saved=raw&&JSON.parse(raw);done=Array.isArray(saved?.done)?new Set(saved.done.filter(id=>['linear','logistic','knn','bayes'].includes(id))).size:0;}catch{}
const links=document.querySelectorAll('.meowde-lab-tabbar a');links.forEach(link=>link.removeAttribute('aria-current'));
const active=tab==='home'?0:tab==='learn'?1:4;links[active]?.setAttribute('aria-current','page');
const subtitle=document.querySelector('.meowde-shell-brand small');if(subtitle)subtitle.textContent='머신러닝 · '+(tab==='home'?'홈':tab==='learn'?'학습':'마이');
if(tab==='home')main.innerHTML='<section class="ml-shell-page meowde-subject-page"><p class="ml-kicker">오늘 학습</p><h1>머신러닝 첫걸음</h1><article class="meowde-subject-card"><small>현재 과정 · '+done+' / 4 완료</small><h2>ML 핵심 개념</h2><p>Linear Regression부터 Naive Bayes까지 연습해요.</p><a class="unit meowde-subject-primary" href="/ml-foundations.html">학습 시작하기 →</a></article><article class="meowde-subject-card"><small>준비 중</small><h2>심화 학습</h2><p>실제 모델 학습과 수학 심화는 준비 중이에요.</p></article></section>';
if(tab==='learn'){main.classList.add('ml-learn-page');document.querySelector('main>h1').textContent='학습 지도';document.querySelector('main>h1+p').textContent='4개 입문 단원을 선택해요.';if(lesson)lesson.hidden=false;if(status)status.textContent='완료 '+done+' / 4';}
if(tab==='my')main.innerHTML='<section class="ml-shell-page meowde-subject-page"><h1>마이</h1><p>머신러닝 학습 기록과 설정을 확인해요.</p><article class="meowde-subject-card"><small>학습 진도</small><h2>'+done+' / 4 단원 완료</h2><progress class="meowde-subject-progress" max="4" value="'+done+'" aria-label="ML 단원 완료율"></progress><p><a class="unit meowde-subject-primary" href="/ml-foundations.html">학습 이어하기 →</a></p></article><article class="meowde-subject-card"><small>제공 범위</small><h2>ML 첫걸음</h2><p>4개 입문 개념을 제공해요. 심화 과정은 준비 중이에요.</p></article><a class="ml-settings meowde-subject-secondary" href="/?tab=my">공통 프로필·설정</a></section>';

if(tab==='learn'&&main&&lesson){
 const map=document.getElementById('units');
 const heading=main.querySelector(':scope > h1');
 const intro=heading?.nextElementSibling;
 const extraLinks=[...main.querySelectorAll(':scope > a,:scope > p')].filter(el=>el!==status&&el!==intro);
 const back=document.createElement('button');
 back.type='button';back.id='ml-return-map';back.textContent='← 학습 지도';
 back.setAttribute('aria-label','머신러닝 학습 지도로 돌아가기');
 lesson.before(back);
 const css=document.createElement('style');
 css.textContent=[
  '#ml-return-map{display:inline-flex;align-items:center;justify-content:flex-start;min-height:44px;width:auto;padding:8px 5px;margin:2px 0 9px;border:0;background:transparent;color:#80556a;font:750 13px/1.4 "Pretendard Variable",Pretendard,system-ui,sans-serif;cursor:pointer}',
  '#ml-return-map:focus-visible{outline:3px solid #80556a;outline-offset:2px;border-radius:8px}',
  'main.ml-lesson-only #units,main.ml-lesson-only>h1,main.ml-lesson-only>h1+p,main.ml-lesson-only>a{display:none!important}',
  'main.ml-map-only #lesson{display:none!important}'
 ].join('\n');
 document.head.append(css);
 const ids=window.MeowdeMLFoundations?.units?.map(u=>u.id)||['linear','logistic','knn','bayes'];
 function show(view){
  const isLesson=view==='lesson';
  main.classList.toggle('ml-lesson-only',isLesson);
  main.classList.toggle('ml-map-only',!isLesson);
  if(map)map.hidden=isLesson;
  if(heading)heading.hidden=isLesson;
  if(intro)intro.hidden=isLesson;
  extraLinks.forEach(el=>{el.hidden=isLesson});
  back.hidden=!isLesson;
  lesson.hidden=!isLesson;
 }
 function setUrl(unit){
  const u=new URL(location.href);u.searchParams.set('tab','learn');
  if(unit)u.searchParams.set('unit',unit);else u.searchParams.delete('unit');
  history.replaceState(null,'',u.pathname+u.search+u.hash);
 }
 map?.addEventListener('click',event=>{
  const button=event.target.closest('button');
  if(!button||!map.contains(button))return;
  const index=[...map.querySelectorAll(':scope > button')].indexOf(button);
  if(index>=0){setUrl(ids[index]);show('lesson');}
 },true);
 lesson.addEventListener('click',event=>{
  if(!event.target.closest('.ml-next'))return;
  const index=ids.indexOf(new URLSearchParams(location.search).get('unit'));
  if(index>=0&&index<ids.length-1)setUrl(ids[index+1]);
 },true);
 back.addEventListener('click',()=>{setUrl(null);show('map')});
 const requested=new URLSearchParams(location.search).get('unit');
 show(ids.includes(requested)?'lesson':'map');
}
})();

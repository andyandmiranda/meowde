/* Presentation adapters only. Existing lessons, handlers and persisted records own all learning behavior. */
(function(){
'use strict';
const subject=window.MeowdeSubjects.current(),tab=window.MeowdeSubjects.currentTab();
const routes=window.MeowdeSubjects.routes(subject);
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function home(target,info){
 target.className='meowde-course-home';
 target.innerHTML='<p class="meowde-home-day">오늘의 학습</p><section class="meowde-home-hero"><div class="meowde-home-intro"><img src="/assets/meowde-approved-headphones.svg?v=450" alt="헤드폰을 쓰고 학습하는 Meowde" width="148" height="164"><div><small>'+escape(info.label)+' · 첫걸음</small><h1>'+escape(info.title)+'</h1><p>'+escape(info.description)+'</p></div></div><a class="meowde-home-primary" href="'+info.entry+'">▷ 학습 '+(info.done?'이어하기':'시작하기')+'</a><a class="meowde-home-map" href="'+routes.learn+'">전체 학습 경로 보기 →</a></section><a class="meowde-home-progress" href="'+routes.learn+'"><span><small>현재 과정</small><strong>'+escape(info.course)+'</strong><span>'+info.done+' / '+info.total+'</span></span><progress max="'+info.total+'" value="'+info.done+'" aria-label="과정 완료율"></progress><span aria-hidden="true">→</span></a><a class="meowde-home-deepen" href="'+routes.deepen+'"><small>심화 학습</small><strong>'+escape(info.deepenTitle)+'</strong><p>'+escape(info.deepenDescription)+'</p><span aria-hidden="true">→</span></a>';
}
if(subject==='linux'&&tab==='home'){
 const area=document.querySelector('.linux-home-dashboard');
 if(area){const cards=area.querySelectorAll('.lesson-card'),count=cards[0].querySelector('.meta').textContent.match(/(\d+)\s*\/\s*(\d+)/);
 home(area,{label:'LINUX',title:area.querySelector('h1').textContent,description:cards[0].querySelector('p').textContent,course:'Linux 기초',done:Number(count?.[1]||0),total:12,entry:cards[0].querySelector('a.primary').getAttribute('href'),deepenTitle:'터미널·Bash 실습',deepenDescription:cards[1].querySelector('p').textContent+' '+cards[1].querySelector('.meta').textContent});}
}
if(subject==='ml'&&tab==='home'){
 const area=document.querySelector('.ml-shell-page');
 if(area){const cards=area.querySelectorAll('article'),count=cards[0].querySelector('small').textContent.match(/(\d+)\s*\/\s*(\d+)/);
 home(area,{label:'ML',title:'머신러닝 첫걸음',description:cards[0].querySelector('p').textContent,course:'ML 핵심 개념',done:Number(count?.[1]||0),total:4,entry:'/ml-foundations.html?tab=learn&unit=linear',deepenTitle:'ML 개념 연습',deepenDescription:cards[1].querySelector('p').textContent});}
}
if(subject==='deep'&&['home','my'].includes(tab)){
 // Derive the summary from the engine's rendered 17-unit state, including verified completion.
 const main=document.querySelector('main'),buttons=[...document.querySelectorAll('#units>button')];
 const count=buttons.filter(b=>b.classList.contains('complete')).length,total=buttons.length;
 const selected=buttons.find(b=>b.getAttribute('aria-current')==='true')||buttons[0];
 const title=selected?.querySelector('strong')?.textContent||'딥러닝 첫걸음';
 const entry='/deep-learning.html?tab=learn&unit='+encodeURIComponent(units[buttons.indexOf(selected)]?.id||units[0].id);
 const warning=document.querySelector('#storage-status').textContent;
 const header=main.querySelector('.meowde-shell-header');
 const content=document.createElement('section');
 if(tab==='home')home(content,{label:'DL',title,description:'데이터에서 신경망·학습 루프·모델 저장까지 차근차근 배워요.',course:'딥러닝 첫걸음',done:count,total,entry,deepenTitle:'GPU·Colab·모델 저장',deepenDescription:'후반부 6개 단원을 살펴봐요. 실제 모델 훈련 실습은 준비 중이에요.'});
 else{content.className='meowde-course-my';content.innerHTML='<h1>마이</h1><p>딥러닝 학습 기록</p><section class="card"><h2>전체 진도</h2><p>'+count+' / '+total+' 단원 완료</p><progress max="'+total+'" value="'+count+'" aria-label="딥러닝 단원 완료율"></progress><p><a href="'+entry+'">학습 이어하기 →</a></p></section><section class="card"><h2>현재 학습</h2><p>'+escape(title)+'</p><a href="/?tab=my">공통 프로필·설정</a></section>';}
 const note=document.createElement('p');note.className='meowde-course-note';note.setAttribute('role','status');note.textContent=warning;
 main.replaceChildren(...(header?[header]:[]),content,note);
}
if(subject==='linux'&&tab==='my'){
 const area=document.querySelector('.linux-my-dashboard');
 if(area){let count=null;try{const raw=localStorage.getItem('meowde-linux-course-v1');const record=raw&&JSON.parse(raw);if(!raw||record?.version===1)count=Object.entries(record?.done||{}).filter(([id,done])=>/^(?:[0-9]|1[01])$/.test(id)&&done===true).length;}catch{}
 const card=document.createElement('section');card.className='lesson-card linux-my-card';card.innerHTML='<h2>전체 진도</h2><p>Linux 기초 · '+(count===null?'기록을 읽지 못했어요':count+' / 12단원 완료')+'</p>'+(count===null?'':'<progress max="12" value="'+count+'" aria-label="Linux 단원 완료율"></progress>');area.querySelector('.lesson-card')?.before(card);}
}
function pathLine(list,points,height){
 const previous=list.querySelector(':scope > .meowde-path-line');if(previous)previous.remove();
 if(points.length<2)return;
 const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg'),path=document.createElementNS(ns,'path');
 svg.classList.add('meowde-path-line');svg.setAttribute('aria-hidden','true');svg.setAttribute('viewBox','0 0 100 '+height);svg.setAttribute('preserveAspectRatio','none');
 let d='M'+points[0].join(' ');for(let i=1;i<points.length;i++){const [x,y]=points[i-1],[nx,ny]=points[i],mid=(y+ny)/2;d+=' C'+x+' '+mid+' '+nx+' '+mid+' '+nx+' '+ny;}
 path.setAttribute('d',d);path.setAttribute('vector-effect','non-scaling-stroke');svg.append(path);list.prepend(svg);
}
function decorateMap(list){
 const stops=[...list.children].filter(n=>n.matches('a,button'));
 if(!stops.length||stops.every(n=>n.dataset.pathStop==='1'))return;
 list.classList.add('meowde-connected-map');
 const xs=[50,26,50,74];
 stops.forEach((stop,i)=>{
 if(stop.dataset.pathStop==='1')return;
 stop.dataset.pathStop='1';stop.classList.add('meowde-path-stop');stop.style.setProperty('--node-x',xs[i%4]+'%');
 let number=stop.querySelector('.linux-python-ball,.meowde-node-number');
 let title=stop.querySelector('strong');
 if(!number){const label=stop.textContent;stop.replaceChildren();number=document.createElement('span');number.textContent=label.includes('✓')?'✓':String(i+1).padStart(2,'0');title=document.createElement('strong');title.textContent=label.replace(/^\d+\.\s*/, '').replace(/\s*✓$/,'');stop.append(number,title);}
 number.classList.add('meowde-path-number');if(title)title.classList.add('meowde-path-title');
 if(!stop.getAttribute('aria-label')&&title)stop.setAttribute('aria-label',title.textContent);
 });
 pathLine(list,stops.map((_,i)=>[xs[i%4],40+i*126]),stops.length*126);
}
const map=subject==='linux'?document.getElementById('linux-map-list'):['ml','deep'].includes(subject)&&tab==='learn'?document.getElementById('units'):null;
if(map){decorateMap(map);new MutationObserver(()=>decorateMap(map)).observe(map,{childList:true});
 // Keep the map as the entry view. Existing unit clicks reveal the unchanged lesson engine.
 if(subject==='ml'||subject==='deep'){
 const lesson=document.getElementById('lesson');if(lesson&&!new URLSearchParams(location.search).has('unit'))lesson.hidden=true;
 map.addEventListener('click',event=>{if(event.target.closest('button')&&lesson)lesson.hidden=false;});
 }
}
const root=document.getElementById('app');
if(root){const connectPython=()=>{const trail=root.querySelector('.trail[data-learn-path]');if(!trail||trail.querySelector('.meowde-path-line'))return;const nodes=[...trail.querySelectorAll('button.node')];pathLine(trail,nodes.map(n=>[parseFloat(n.style.left),parseFloat(n.style.top)]),parseFloat(trail.style.height));};connectPython();new MutationObserver(connectPython).observe(root,{childList:true,subtree:true});}
// Correct the subject context without introducing another header or changing language support.
document.querySelectorAll('.meowde-shell-brand a,.meowde-shell-brand[href],.meowde-linux-title').forEach(a=>a.href=routes.home);
const subtitle=document.querySelector('.meowde-linux-subtitle');if(subtitle)subtitle.textContent='Linux · '+({home:'홈',learn:'학습',deepen:'심화',my:'마이'}[tab]||'학습');
})();

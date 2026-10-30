(function(){
'use strict';
if(!document.querySelector('link[href="/assets/linux-learning-ui.css"]')){const l=document.createElement('link');l.rel='stylesheet';l.href='/assets/linux-learning-ui.css';document.head.append(l)}
if(!document.querySelector('link[href^="/assets/app-shell-canonical.css"]')){const l=document.createElement('link');l.rel='stylesheet';l.href='/assets/app-shell-canonical.css?v=2';document.head.append(l)}
const path=location.pathname,params=new URLSearchParams(location.search);
const library=path.endsWith('/linux-crash-course.html');
let active=path.endsWith('/linux-home.html')&&params.get('tab')==='home'?'home':
 path.endsWith('/linux-home.html')&&params.get('tab')==='my'?'my':
 library||path.endsWith('/linux-review.html')?'deepen':
 path.endsWith('/linux-home.html')||path.endsWith('/linux-start.html')||path.endsWith('/linux-course.html')?'learn':'home';

const main=document.querySelector('main.shell,main.app');
let header=main&&main.querySelector('header.top');
if(main){
 if(!header){header=document.createElement('header');header.className='top';main.prepend(header)}
 header.className='top meowde-canonical-top';
 header.setAttribute('aria-label','상단 메뉴');
 header.innerHTML='<div class="brand"><img class="brand-mark" src="/assets/meowde-approved-base.svg?v=450" alt=""><div><h1>Meowde</h1><p>'+(active==='deepen'?'심화 · Linux 실습':active==='my'?'Linux · 마이':'고양이와 배우는 Linux')+'</p></div></div><div class="meowde-top-actions"><select class="meowde-root-subject" aria-label="과목 선택"><option value="python">Python</option><option value="linux" selected>Linux</option><option value="ml">머신러닝</option><option value="data" disabled>데이터 분석 · 준비 중</option><option value="deep" disabled>딥러닝 · 준비 중</option><option value="robotics" disabled>AI 로보틱스 · 준비 중</option></select></div>';
}

document.querySelectorAll('.meowde-linux-back').forEach(x=>x.remove());
const old=document.querySelector('.linux-tabbar');if(old)old.remove();
const navEl=document.createElement('nav');navEl.className='linux-tabbar';navEl.setAttribute('aria-label','메인 메뉴');
const tabs=[
 ['home','홈','⌂','/linux-home.html?tab=home'],
 ['learn','학습','◫','/linux-home.html?tab=learn'],
 ['deepen','심화','‹/›','/linux-crash-course.html?view=concept'],
 ['together','함께','✧','/together.html?subject=linux'],
 ['my','마이','♧','/?tab=my&subject=linux']
];
for(const [id,label,icon,href] of tabs){const a=document.createElement('a');a.href=href;a.dataset.tab=id;a.setAttribute('aria-label',label);if(id===active)a.setAttribute('aria-current','page');const s=document.createElement('span');s.className='lab-nav-icon';s.textContent=icon;s.setAttribute('aria-hidden','true');a.append(s,document.createElement('span'));a.lastChild.textContent=label;navEl.append(a)}
document.body.append(navEl);document.body.classList.add('linux-five-tabs');
const subjects=document.createElement('script');subjects.src='/assets/meowde-subject-selector.js?v=3';document.body.append(subjects);
const icons=document.createElement('script');icons.src='/assets/app-shell-icons.js?v=1';document.body.append(icons);

if(active==='my'&&path.endsWith('/linux-home.html'))location.replace('/?tab=my&subject=linux');

if(library){
 const KEY='meowde-linux-practice-session-v1';let previous={},writable=true;
 try{const raw=sessionStorage.getItem(KEY);if(raw!==null){previous=JSON.parse(raw);if(!previous||previous.version!==1||typeof previous.fields!=='object'||!previous.fields||!Array.isArray(previous.terminal?.commands))throw Error('Unsupported session')}}
 catch{writable=false;previous={}}
 const fields=['sim-input','bash-source','bash-task','cond-case','cond-value'],outputs=['sim-out','sim-feedback','bash-feedback','cond-output'];
 const target=document.getElementById('more-learning'),notice=document.createElement('p');notice.setAttribute('role','status');notice.id='practice-session-status';if(target)target.after(notice);
 function warning(){notice.textContent='이번 실습 상태를 저장하지 못했습니다. 기존 기록은 보존했으며, 화면을 나가기 전 작성한 코드를 복사해두세요.'}
 try{if(previous.terminal)window.MeowdeTerminalSession.restore(previous.terminal);for(const id of fields)if(typeof previous.fields?.[id]==='string')document.getElementById(id).value=previous.fields[id];for(const id of outputs)if(typeof previous.outputs?.[id]==='string')document.getElementById(id).textContent=previous.outputs[id]}catch{writable=false;warning()}
 let practiceMode=['terminal','condition','bash'].includes(params.get('view'))?params.get('view'):'concept';
 function save(){if(!writable){warning();return}try{const terminal={...(previous.terminal&&typeof previous.terminal==='object'&&!Array.isArray(previous.terminal)?previous.terminal:{}),...window.MeowdeTerminalSession.snapshot()};const fieldValues={...(previous.fields&&typeof previous.fields==='object'&&!Array.isArray(previous.fields)?previous.fields:{}),...Object.fromEntries(fields.map(id=>[id,document.getElementById(id).value]))};const outputValues={...(previous.outputs&&typeof previous.outputs==='object'&&!Array.isArray(previous.outputs)?previous.outputs:{}),...Object.fromEntries(outputs.map(id=>[id,document.getElementById(id).textContent]))};previous={...previous,version:1,mode:practiceMode,terminal,fields:fieldValues,outputs:outputValues};sessionStorage.setItem(KEY,JSON.stringify(previous))}catch{warning()}}
 if(!writable)warning();navEl.addEventListener('click',save);for(const event of ['input','change','click','keyup'])main.addEventListener(event,save);window.addEventListener('pagehide',save);
}
})();
(function(){
'use strict';
if(!document.querySelector('link[href="/assets/linux-learning-ui.css"]')){
 const design=document.createElement('link');design.rel='stylesheet';design.href='/assets/linux-learning-ui.css';document.head.append(design);
}
if(!document.querySelector('link[href="/assets/linux-focus-flow.css"]')){
 const focus=document.createElement('link');focus.rel='stylesheet';focus.href='/assets/linux-focus-flow.css';document.head.append(focus);
}
const path=location.pathname,params=new URLSearchParams(location.search);
const library=path.endsWith('/linux-crash-course.html');
if(library){
 const main=document.querySelector('main.app');
 const duplicate=main&&main.querySelector('nav[aria-label="학습 화면 이동"]');if(duplicate)duplicate.remove();
 if(main&&!main.querySelector('.top')){const shellHeader=document.createElement('header');shellHeader.className='top';const shellBrand=document.createElement('span');shellBrand.className='brand';shellBrand.textContent='MEOWDE';shellHeader.append(shellBrand);main.prepend(shellHeader);}
}

// Match the existing compact top-right course selector instead of adding a second nav row.
const header=document.querySelector('main.shell .top,main.app .top');
let brand=header&&header.querySelector('.brand');
if(header&&!brand){brand=document.createElement('span');brand.className='brand';brand.textContent='MEOWDE';header.append(brand);}
if(brand&&!header.querySelector('.meowde-compact-subject')){
 const selector=document.createElement('select');
 selector.className='meowde-compact-subject';
 selector.setAttribute('aria-label','과목 선택');
 const python=document.createElement('option');python.value='python';python.textContent='Python';
 const linux=document.createElement('option');linux.value='linux';linux.textContent='Linux';
 const ml=document.createElement('option');ml.value='ml';ml.textContent='머신러닝';
 const pending=['데이터 분석','딥러닝','AI 로보틱스'].map(label=>{const option=document.createElement('option');option.textContent=label+' · 준비 중';option.disabled=true;return option;});
 selector.append(python,linux,ml,...pending);selector.value='linux';
 selector.addEventListener('change',()=>{if(selector.value==='python')location.assign('/?tab=map');else if(selector.value==='ml')location.assign('/ml-foundations.html');});
 brand.append(selector);
}


/* Preserve the original back link, but use the same top-row hierarchy as Python. */
if(header&&brand&&!header.querySelector('.meowde-linux-mark')){
 const back=header.querySelector('a:not(.meowde-linux-title)');
 if(back){back.classList.add('meowde-linux-back');header.insertAdjacentElement('afterend',back);}
 Array.from(brand.childNodes).filter(node=>node.nodeType===3).forEach(node=>node.remove());
 const mark=document.createElement('img');mark.className='meowde-linux-mark';mark.src='/assets/meowde-approved-base.svg?v=450';mark.alt='';
 const name=document.createElement('span');name.className='meowde-linux-name';
 const title=document.createElement('a');title.className='meowde-linux-title';title.href='/linux-home.html?tab=home';title.textContent='Meowde';
 const subtitle=document.createElement('small');subtitle.className='meowde-linux-subtitle';subtitle.textContent='Linux · 학습';
 name.append(title,subtitle);brand.insertBefore(name,brand.firstChild);brand.insertBefore(mark,name);
}
if(!document.querySelector('link[href^="/assets/app-shell-canonical.css"]')){
 const common=document.createElement('link');common.rel='stylesheet';common.href='/assets/app-shell-canonical.css?v=1';document.head.append(common);
}

let active=path.endsWith('/linux-home.html')&&params.get('tab')==='my'?'my':library||path.endsWith('/linux-review.html')?'deepen':path.endsWith('/linux-start.html')||path.endsWith('/linux-course.html')?'learn':path.endsWith('/linux-home.html')&&params.get('tab')==='learn'?'learn':'home';
const nav=document.createElement('nav');nav.className='linux-tabbar';nav.setAttribute('aria-label','메인 메뉴');
const tabs=[['home','홈','⌂','/linux-home.html?tab=home'],['learn','학습','◫','/linux-home.html?tab=learn'],['deepen','심화','‹/›','/linux-crash-course.html?view=concept'],['together','함께','✧','/together.html?subject=linux'],['my','마이','♧','/linux-home.html?tab=my']];
for(const [id,label,icon,href] of tabs){const a=document.createElement('a');a.href=href;a.dataset.tab=id;a.setAttribute('aria-label',label);const symbol=document.createElement('span');symbol.textContent=icon;symbol.setAttribute('aria-hidden','true');a.append(symbol,document.createTextNode(label));nav.append(a);}
document.body.append(nav);document.body.classList.add('linux-five-tabs');
const sharedSubjects=document.createElement('script');sharedSubjects.src='/assets/meowde-subject-selector.js?v=1';document.body.append(sharedSubjects);
const commonIcons=document.createElement('script');commonIcons.src='/assets/app-shell-icons.js?v=1';document.body.append(commonIcons);
function select(id){active=id;nav.querySelectorAll('a').forEach(a=>{if(a.dataset.tab===id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});}
if(active==='my'&&path.endsWith('/linux-home.html')){
 const main=document.querySelector('main');const section=document.createElement('section');section.className='linux-my-dashboard';
 let summary='학습 전',count=0;
 try{
  const guided=MeowdeLinuxProgress.open(localStorage),raw=localStorage.getItem('meowde-linux-cram-v1'),quiz=raw===null?{}:JSON.parse(raw);
  if(guided.issue||!quiz||typeof quiz!=='object'||Array.isArray(quiz)||quiz.done&&(typeof quiz.done!=='object'||Array.isArray(quiz.done)))throw Error('Unreadable records');
  count=Object.keys(quiz.done||{}).filter(k=>/^[0-8]$/.test(k)&&quiz.done[k]===true).length;
  summary=guided.state.step===4?'완료':guided.state.step===0?'학습 전':'진행 중';
 }catch{summary='기록을 읽지 못했어요';}
 section.innerHTML='<h1>마이</h1><p class="muted">Linux 학습 기록과 설정을 확인해요.</p><section class="lesson-card linux-my-card"><span class="meta">학습 진도</span><h2>개념 퀴즈 '+count+' / 9 완료</h2><p class="muted">첫 폴더 만들기 · '+summary+'</p><a class="primary" href="/linux-home.html?tab=learn">학습 이어하기 →</a></section><section class="lesson-card linux-my-card"><span class="meta">최근 기록</span><h2>Linux 학습</h2><a class="secondary" href="/robotics.html">이전 학습 기록 보기</a></section><a class="secondary linux-settings-link" href="/?tab=my">공통 프로필·설정</a>';
 main.replaceChildren(header,section);
}
if(library){
 const KEY='meowde-linux-practice-session-v1';let previous={},writable=true;
 try{const raw=sessionStorage.getItem(KEY);if(raw!==null){previous=JSON.parse(raw);if(!previous||previous.version!==1||typeof previous.fields!=='object'||!previous.fields||!Array.isArray(previous.terminal?.commands))throw Error('Unsupported session');}}
 catch{writable=false;previous={};}
 const fields=['sim-input','bash-source','bash-task','cond-case','cond-value'];
 const outputs=['sim-out','sim-feedback','bash-feedback','cond-output'];
 const notice=document.createElement('p');notice.setAttribute('role','status');notice.id='practice-session-status';document.getElementById('more-learning').after(notice);
 function warning(){notice.textContent='이번 실습 상태를 저장하지 못했습니다. 기존 기록은 보존했으며, 화면을 나가기 전 작성한 코드를 복사해두세요.';}
 try{
  if(previous.terminal)window.MeowdeTerminalSession.restore(previous.terminal);
  for(const id of fields)if(typeof previous.fields?.[id]==='string')document.getElementById(id).value=previous.fields[id];
  for(const id of outputs)if(typeof previous.outputs?.[id]==='string')document.getElementById(id).textContent=previous.outputs[id];
 }catch{writable=false;warning();}
 let practiceMode=['terminal','condition','bash'].includes(params.get('view'))?params.get('view'):'concept';
 function save(){if(!writable){warning();return;}try{
  const terminal={...(previous.terminal&&typeof previous.terminal==='object'&&!Array.isArray(previous.terminal)?previous.terminal:{}),...window.MeowdeTerminalSession.snapshot()};
  const fieldValues={...(previous.fields&&typeof previous.fields==='object'&&!Array.isArray(previous.fields)?previous.fields:{}),...Object.fromEntries(fields.map(id=>[id,document.getElementById(id).value]))};
  const outputValues={...(previous.outputs&&typeof previous.outputs==='object'&&!Array.isArray(previous.outputs)?previous.outputs:{}),...Object.fromEntries(outputs.map(id=>[id,document.getElementById(id).textContent]))};
  previous={...previous,version:1,mode:practiceMode,terminal,fields:fieldValues,outputs:outputValues};
  sessionStorage.setItem(KEY,JSON.stringify(previous));
 }catch{warning();}}
 if(!writable)warning();
 nav.addEventListener('click',save);
 for(const event of ['input','change','click','keyup'])document.querySelector('main').addEventListener(event,save);
 window.addEventListener('pagehide',save);
}
select(active);
})();

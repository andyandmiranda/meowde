(function(){
'use strict';
const path=location.pathname,params=new URLSearchParams(location.search);
const library=path.endsWith('/linux-crash-course.html');
let active=library?'learn':path.endsWith('/linux-review.html')?'review':path.endsWith('/linux-start.html')?'learn':params.get('tab')==='my'?'my':'home';
const nav=document.createElement('nav');nav.className='linux-tabbar';nav.setAttribute('aria-label','메인 메뉴');
const tabs=[['home','홈','⌂','/linux-home.html'],['learn','학습','▦','/linux-crash-course.html?view=concept'],['practice','실습','⌘','/linux-crash-course.html?view=practice'],['review','복습','↻','/linux-review.html'],['my','마이','♧','/linux-home.html?tab=my']];
for(const [id,label,icon,href] of tabs){const a=document.createElement('a');a.href=href;a.dataset.tab=id;a.setAttribute('aria-label',label);const symbol=document.createElement('span');symbol.textContent=icon;symbol.setAttribute('aria-hidden','true');a.append(symbol,document.createTextNode(label));nav.append(a);}
document.body.append(nav);document.body.classList.add('linux-five-tabs');
function select(id){active=id;nav.querySelectorAll('a').forEach(a=>{if(a.dataset.tab===id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});}
if(active==='my'){
 const main=document.querySelector('main');const title=document.createElement('h1');title.textContent='마이 · Linux';
 const description=document.createElement('p');description.textContent='학습 기록은 이 브라우저에 저장됩니다.';
 const records=document.createElement('p');records.setAttribute('role','status');
 try{
  const guided=MeowdeLinuxProgress.open(localStorage),raw=localStorage.getItem('meowde-linux-cram-v1'),quiz=raw===null?{}:JSON.parse(raw);
  if(guided.issue||!quiz||typeof quiz!=='object'||Array.isArray(quiz)||quiz.done&&(typeof quiz.done!=='object'||Array.isArray(quiz.done)))throw Error('Unreadable records');
  const count=Object.keys(quiz.done||{}).filter(k=>/^[0-8]$/.test(k)&&quiz.done[k]===true).length;
  records.textContent=`첫 폴더 만들기: ${guided.state.step===4?'완료':guided.state.step===0?'학습 전':'진행 중'} · 개념 퀴즈: ${count} / 9 완료`;
 }catch{records.textContent='학습 기록을 읽지 못했습니다. 기존 기록은 변경하지 않았습니다.';}
 const legacy=document.createElement('a');legacy.href='/robotics.html';legacy.className='secondary';legacy.textContent='이전 학습 기록 보기';
 const settings=document.createElement('a');settings.href='/?tab=my';settings.className='secondary';settings.textContent='공통 프로필·설정';
 main.replaceChildren(title,description,records,legacy,settings);
}
if(library){
 const mode=document.getElementById('library-mode');
 const KEY='meowde-linux-practice-session-v1';let previous={},writable=true;
 try{const raw=sessionStorage.getItem(KEY);if(raw!==null){previous=JSON.parse(raw);if(!previous||previous.version!==1||typeof previous.fields!=='object'||!previous.fields||!Array.isArray(previous.terminal?.commands))throw Error('Unsupported session');}}
 catch{writable=false;previous={};}
 const fields=['sim-input','bash-source','bash-task','cond-case','cond-value'];
 const outputs=['sim-out','sim-feedback','bash-feedback','cond-output'];
 const notice=document.createElement('p');notice.setAttribute('role','status');notice.id='practice-session-status';mode.parentElement.after(notice);
 function warning(){notice.textContent='이번 실습 상태를 저장하지 못했습니다. 기존 기록은 보존했으며, 화면을 나가기 전 작성한 코드를 복사해두세요.';}
 try{
  if(previous.terminal)window.MeowdeTerminalSession.restore(previous.terminal);
  for(const id of fields)if(typeof previous.fields?.[id]==='string')document.getElementById(id).value=previous.fields[id];
  for(const id of outputs)if(typeof previous.outputs?.[id]==='string')document.getElementById(id).textContent=previous.outputs[id];
 }catch{writable=false;warning();}
 let practiceMode=['terminal','condition','bash'].includes(previous.mode)?previous.mode:'terminal';
 const openPractice=window.MeowdeOpenPractice;
 window.MeowdeOpenPractice=function(value){openPractice(value);select(value==='concept'?'learn':'practice');if(value!=='concept')practiceMode=value;};
 function show(value){window.MeowdeOpenPractice(value);}
 function save(){if(!writable){warning();return;}try{sessionStorage.setItem(KEY,JSON.stringify({version:1,mode:practiceMode,terminal:window.MeowdeTerminalSession.snapshot(),fields:Object.fromEntries(fields.map(id=>[id,document.getElementById(id).value])),outputs:Object.fromEntries(outputs.map(id=>[id,document.getElementById(id).textContent]))}));}catch{warning();}}
 show(params.get('view')==='practice'?practiceMode:'concept');if(!writable)warning();
 mode.addEventListener('change',()=>{select(mode.value==='concept'?'learn':'practice');if(mode.value!=='concept')practiceMode=mode.value;save();history.replaceState(null,'',`?view=${mode.value==='concept'?'concept':'practice'}`);});
 nav.addEventListener('click',event=>{const link=event.target.closest('a');if(!link)return;if(['learn','practice'].includes(link.dataset.tab)){event.preventDefault();show(link.dataset.tab==='learn'?'concept':practiceMode);history.pushState(null,'',link.href);save();window.scrollTo(0,0);}else save();});
 window.addEventListener('popstate',()=>show(new URLSearchParams(location.search).get('view')==='practice'?practiceMode:'concept'));
 for(const event of ['input','change','click','keyup'])document.querySelector('main').addEventListener(event,save);
 window.addEventListener('pagehide',save);
}
select(active);
})();

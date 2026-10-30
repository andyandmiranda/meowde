(()=>{'use strict';const map=document.getElementById('linux-learning-map');if(!map)return;document.body.classList.add('linux-map-page');const learn=new URLSearchParams(location.search).get('tab')==='learn';map.style.display=learn?'block':'none';if(!learn)return;const hero=document.querySelector('.hero'),first=document.querySelector('.first-action');if(hero)hero.style.display='none';if(first)first.style.display='none';const list=document.getElementById('linux-map-list');const units=['Linux와 Ubuntu','경로와 디렉터리','파일과 폴더 관리','파일 읽기와 편집','검색','파이프와 리디렉션','사용자·그룹·권한','프로세스','패키지','Shell Script와 변수','조건문과 반복문','Network와 자동화'];let state={version:1,unit:0,step:0,done:{}};try{const raw=localStorage.getItem('meowde-linux-course-v1');if(raw){const p=JSON.parse(raw);if(p&&p.version===1)state={...state,...p,done:p.done&&typeof p.done==='object'?p.done:{}}}}catch{}const next=units.findIndex((_,i)=>!state.done[i]);const resumeIndex=next>=0?next:Math.min(units.length-1,Number(state.unit)||0);const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));const regions=['Linux 기본','파일 다루기','시스템 기초','Shell과 운영'];
const style=document.createElement('style');style.textContent=`
#linux-map-list.linux-python-trail{position:relative;display:flex;flex-direction:column;gap:10px;margin:18px auto 24px;max-width:520px;padding:10px 10px 20px}
#linux-map-list.linux-python-trail::before{content:"";position:absolute;z-index:0;left:50%;top:30px;bottom:40px;border-left:5px dotted #F5DDE5;transform:translateX(-50%)}
.linux-python-trail .linux-python-region{font-size:13px;color:#80556A;text-align:center;font-weight:800;position:relative;z-index:1;padding:12px 0 3px}
.linux-python-trail .linux-python-node{position:relative;z-index:1;display:flex;flex-direction:column;gap:4px;align-items:center;min-height:80px;width:68%;padding:5px 10px;text-align:center;text-decoration:none;background:transparent;border:0;color:#38343A}
.linux-python-trail .linux-python-node:nth-of-type(odd){align-self:flex-start}
.linux-python-trail .linux-python-node:nth-of-type(even){align-self:flex-end}
.linux-python-trail .linux-python-ball{display:grid;place-items:center;width:52px;height:52px;border-radius:50%;border:4px solid white;background:#FFF5F9;box-shadow:0 0 0 3px #D9A7B9;color:#80556A;font-weight:850;font-size:18px}
.linux-python-trail .linux-python-node.current .linux-python-ball{background:#F5DDE5;box-shadow:0 0 0 4px #BC718F}
.linux-python-trail .linux-python-node.complete .linux-python-ball{background:#80556A;color:#fff}
.linux-python-trail .linux-python-node strong{background:#fff;border-radius:7px;padding:0 6px;font-size:13px;line-height:1.3}
.linux-python-trail .linux-python-node small{color:#80556A;font-size:11px}
.linux-python-trail .linux-python-node:focus-visible{outline:3px solid #80556A;outline-offset:3px}
@media(max-width:400px){.linux-python-trail .linux-python-node{width:78%}}
`;style.textContent+=`
.linux-region-picker{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:12px 0}
.linux-region-picker button{min-height:46px;border:1px solid #E7C9D5;border-radius:14px;background:#fff;color:#38343A;font:inherit;font-size:13px;font-weight:750}
.linux-region-picker button[aria-pressed=true]{background:#F5DDE5;border-color:#B77F94}
#linux-map-list.linux-python-trail{min-height:310px;margin-top:6px}
`;document.head.append(style);
const picker=document.createElement('nav');picker.className='linux-region-picker';picker.setAttribute('aria-label','Linux 대단원 선택');map.insertBefore(picker,list);
const selectedFromUrl=Number(new URLSearchParams(location.search).get('group'));
let selectedGroup=Number.isInteger(selectedFromUrl)&&selectedFromUrl>=1&&selectedFromUrl<=4?selectedFromUrl-1:Math.floor(resumeIndex/3);
function paint(){
picker.innerHTML=regions.map((title,i)=>'<button type="button" aria-pressed="'+(selectedGroup===i)+'">'+(i+1)+'. '+escape(title)+'</button>').join('');
Array.from(picker.children).forEach((button,i)=>button.onclick=()=>{selectedGroup=i;paint();});
list.innerHTML=units.map((title,idx)=>{const complete=!!state.done[idx],ongoing=!complete&&idx===resumeIndex;if(Math.floor(idx/3)!==selectedGroup)return '';return '<a class="linux-python-node '+(complete?'complete':ongoing?'current':'')+'" href="/linux-course.html?unit='+(idx+1)+'" aria-label="'+escape(title)+' · '+(complete?'완료':ongoing?'현재 학습':'학습하기')+'"><span class="linux-python-ball" aria-hidden="true">'+(complete?'✓':String(idx+1).padStart(2,'0'))+'</span><strong>'+escape(title)+'</strong><small>'+(complete?'완료':ongoing?'이어서 학습':'시작하기')+'</small></a>'}).join('');}
paint();})();
(()=>{'use strict';
const map=document.getElementById('linux-learning-map');if(!map)return;
document.body.classList.add('linux-map-page');
const learn=new URLSearchParams(location.search).get('tab')==='learn';map.style.display=learn?'block':'none';if(!learn)return;
const hero=document.querySelector('.hero'),first=document.querySelector('.first-action');if(hero)hero.style.display='none';if(first)first.style.display='none';
const list=document.getElementById('linux-map-list');list.classList.add('linux-python-trail');
const units=['Linux와 Ubuntu','경로와 디렉터리','파일과 폴더 관리','파일 읽기와 편집','검색','파이프와 리디렉션','사용자·그룹·권한','프로세스','패키지','Shell Script와 변수','조건문과 반복문','Network와 자동화'];
let state={version:1,unit:0,step:0,done:{}};try{const raw=localStorage.getItem('meowde-linux-course-v1');if(raw){const p=JSON.parse(raw);if(p&&p.version===1)state={...state,...p,done:p.done&&typeof p.done==='object'?p.done:{}}}}catch{}
const next=units.findIndex((_,i)=>!state.done[i]);const resumeIndex=next>=0?next:Math.min(units.length-1,Number(state.unit)||0);
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const style=document.createElement('style');style.textContent=`
#linux-map-list.linux-python-trail{position:relative;display:flex;flex-direction:column;gap:18px;margin:4px 0 22px;padding:24px 12px;border:1.5px solid #EEE7EC;border-radius:26px;background:linear-gradient(180deg,#FAF5F7,#F9F3E2)}
#linux-map-list.linux-python-trail::before{content:'';position:absolute;top:54px;bottom:54px;left:50%;width:5px;transform:translateX(-50%);border-radius:10px;background:repeating-linear-gradient(to bottom,#E7C9D5 0 12px,transparent 12px 22px)}
.linux-python-trail .linux-python-node{position:relative;z-index:1;box-sizing:border-box;width:78%;min-height:92px;padding:13px 12px;border:1px solid #F0D9E3;border-radius:22px;background:#fff;box-shadow:0 5px 16px #642f4912;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;text-decoration:none;color:#38343A}
.linux-python-trail .linux-python-node:nth-child(odd){align-self:flex-start}.linux-python-trail .linux-python-node:nth-child(even){align-self:flex-end}
.linux-python-trail .linux-python-ball{display:grid;place-items:center;width:48px;height:48px;border-radius:50%;border:3px solid #fff;background:#FFF5F9;box-shadow:0 0 0 3px #D9A7B9;color:#80556A;font-weight:900;font-size:15px}
.linux-python-trail .linux-python-node.current .linux-python-ball{background:#F5DDE5;box-shadow:0 0 0 4px #BC718F}.linux-python-trail .linux-python-node.complete .linux-python-ball{background:#80556A;color:#fff}
.linux-python-trail .linux-python-node strong{font-size:13px;line-height:1.35}.linux-python-trail .linux-python-node small{font-size:11px;color:#80556A;font-weight:750}.linux-python-trail .linux-python-node:focus-visible{outline:3px solid #80556A;outline-offset:3px}
@media(max-width:360px){.linux-python-trail .linux-python-node{width:88%}}
`;document.head.append(style);
map.querySelector('h2').textContent='학습 지도';
map.querySelector('.linux-map-hint')?.remove();
const description=map.querySelector('h2 + .muted');if(description)description.textContent='전체 Linux 레슨을 한 지도에서 이어서 학습해요.';
list.innerHTML=units.map((title,idx)=>{const complete=!!state.done[idx],ongoing=!complete&&idx===resumeIndex;return '<a class="linux-python-node '+(complete?'complete':ongoing?'current':'')+'" href="/linux-course.html?unit='+(idx+1)+'" aria-label="'+escape(title)+' · '+(complete?'완료':ongoing?'현재 학습':'학습하기')+'"><span class="linux-python-ball" aria-hidden="true">'+(complete?'✓':String(idx+1).padStart(2,'0'))+'</span><strong>'+escape(title)+'</strong><small>'+(complete?'완료':ongoing?'이어서 학습':'시작하기')+'</small></a>'}).join('');
})();

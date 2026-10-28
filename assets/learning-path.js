(async function(){
'use strict';
const el=id=>document.getElementById(id),node=(tag,text)=>{const n=document.createElement(tag);n.textContent=text;return n;};
try{
 const response=await fetch('/assets/learning-readiness.json');if(!response.ok)throw Error('unavailable');
 const data=await response.json();
 function show(subject){
  const python=subject==='python',items=python?data.python:data.linux;
  el('path-list').classList.add('journey-map');
  el('path-python').setAttribute('aria-pressed',String(python));el('path-linux').setAttribute('aria-pressed',String(!python));
  el('path-status').textContent=python?'60레슨 구현 · 한국어·영어 작성형 정답 120개와 추가 입력·오답 자동 검사. 모든 단원의 전체 학습 흐름은 검증을 더 해야 해요.':'10개 학습 단위 구현(첫 안내 레슨 + E1~E9). 권한·프로세스·파이프 등은 개념 퀴즈만 있으며, 전체 Linux 실습 과정은 아직 준비 중이에요.';
  el('path-start').href=python?'/':'/linux-start.html';el('path-start').textContent=python?'Python 시작·이어하기 →':'Linux 첫 레슨 시작·이어하기 →';
  el('path-list').replaceChildren(...items.map(item=>{const li=node('li','');li.className='journey-stop';const pin=node('span',item.number?String(item.number).padStart(2,'0'):String(items.indexOf(item)+1).padStart(2,'0'));pin.className='journey-pin';pin.setAttribute('aria-hidden','true');li.append(pin,node('h3',item.title),node('p',item.implementation),node('p',item.verification));if(python&&item.id){const a=node('a','이 레슨 시작·이어하기 →');a.href='/?lesson='+encodeURIComponent(item.id);li.append(a);}else if(item.href){const a=node('a',item.id==='mkdir-intro'?'첫 레슨 열기 →':'개념·실습 모음 열기 →');a.href=item.href;li.append(a);}return li;}));
  el('path-missing').replaceChildren(...(python?data.missingPython:data.missingLinux).map(text=>node('li',text)));el('path-warning').textContent=data.warning;
 }
 el('path-python').onclick=()=>show('python');el('path-linux').onclick=()=>show('linux');show(new URLSearchParams(location.search).get('subject')==='linux'?'linux':'python');
}catch(_){el('path-status').textContent='준비 현황을 불러오지 못했어요. 위의 돌아가기 링크로 기존 학습을 이어갈 수 있어요.';}
})();

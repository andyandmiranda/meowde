/* Invitation sharing only. No account fields, progress reads or persistent writes. */
(function(){
'use strict';
const params=new URLSearchParams(location.search),linux=params.get('subject')==='linux';
const status=document.getElementById('status'),link=document.getElementById('link');
const inviteURL=new URL('/together.html',location.origin);
inviteURL.searchParams.set('invite','1');
if(linux){
 inviteURL.searchParams.set('subject','linux');
 document.querySelector('.meowde-shell-subject').value='linux';
 document.querySelector('.meowde-shell-brand a').href='/linux-home.html?tab=home';
 const tabs=document.querySelectorAll('.meowde-lab-tabbar a');
 tabs[0].href='/linux-home.html?tab=home';tabs[1].href='/linux-home.html?tab=learn';tabs[2].href='/linux-crash-course.html?view=concept';tabs[4].href='/linux-home.html?tab=my';
 document.querySelector('#received a').href='/linux-home.html?tab=learn';
}
link.value=inviteURL.href;
// Old invitation links remain readable; new links include no names or free text.
if(params.get('invite')==='1'||params.get('topic')){
 document.getElementById('received').hidden=false;
 document.getElementById('received-name').textContent='같은 학습 공간에서 시작해요.';
 document.getElementById('received-topic').textContent=(params.get('topic')||(linux?'Linux 기초':'Python 기초')).trim().slice(0,70);
}
document.getElementById('share').addEventListener('click',async()=>{
 try{await navigator.clipboard.writeText(inviteURL.href);status.textContent='초대 링크를 복사했어요.';}
 catch(error){document.getElementById('copy-fallback').hidden=false;link.focus();link.select();status.textContent='아래 링크를 복사해 주세요.';}
});
document.getElementById('show-qr').addEventListener('click',()=>{
 const panel=document.getElementById('invite-qr'),button=document.getElementById('show-qr');
 if(!panel.hidden){panel.hidden=true;button.setAttribute('aria-expanded','false');return;}
 try{
  const code=qrcode(0,'M');code.addData(inviteURL.href);code.make();
  document.getElementById('qr-image').innerHTML=code.createSvgTag({cellSize:6,margin:24,scalable:true});
  panel.hidden=false;button.setAttribute('aria-expanded','true');
 }catch(error){status.textContent='QR 코드를 만들지 못했어요. 링크 복사를 이용해 주세요.';}
});
})();

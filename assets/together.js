/* Invitation sharing only. No account fields, progress reads or persistent writes. */
(function(){
'use strict';
const params=new URLSearchParams(location.search);
const subject=['linux','ml'].includes(params.get('subject'))?params.get('subject'):'python';
const linux=subject==='linux',ml=subject==='ml',course=linux?'Linux 기초':ml?'ML 첫걸음':'Python 기초';
const status=document.getElementById('status'),link=document.getElementById('link');
const inviteURL=new URL('/together.html',location.origin);
inviteURL.searchParams.set('invite','1');
if(subject!=='python')inviteURL.searchParams.set('subject',subject);
document.querySelector('.meowde-shell-subject').value=subject;
document.getElementById('course-label').textContent=course;
const destination=linux?'/linux-home.html?tab=learn':ml?'/ml-foundations.html':'/?tab=map';
document.querySelector('#received a').href=destination;
if(linux||ml){
 const tabs=document.querySelectorAll('.meowde-lab-tabbar a');
 tabs[1].href=destination;tabs[3].href='/together.html?subject='+subject;tabs[2].href=linux?'/linux-crash-course.html?view=concept':'/ml-foundations.html';
 if(linux){document.querySelector('.meowde-shell-brand a').href='/linux-home.html?tab=home';tabs[0].href='/linux-home.html?tab=home';tabs[4].href='/linux-home.html?tab=my';}
}
link.value=inviteURL.href;
// Old invitation links remain readable; new links include no names or free text.
if(params.get('invite')==='1'||params.get('topic')){
 document.getElementById('received').hidden=false;
 document.getElementById('received-name').textContent='같은 학습 공간에서 시작해요.';
 document.getElementById('received-topic').textContent=(params.get('topic')||course).trim().slice(0,70);
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

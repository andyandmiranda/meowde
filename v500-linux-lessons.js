(function(){
"use strict";
const KEY="meowde-v500-linux-progress";
const lessons=[
{id:"permissions-1",unit:"권한",title:"권한 읽기",prompt:"-rwxr-xr-- 에서 파일 소유자가 가진 권한은?",options:["읽기만","읽기·쓰기·실행","읽기·실행"],answer:1,why:"첫 세 글자 rwx는 소유자의 읽기(r), 쓰기(w), 실행(x) 권한이야.",tryIt:"mkdir -p ~/meowde-linux-lab; touch ~/meowde-linux-lab/permissions-demo.txt; chmod 754 ~/meowde-linux-lab/permissions-demo.txt; ls -l ~/meowde-linux-lab/permissions-demo.txt"},
{id:"permissions-2",unit:"권한",title:"chmod",prompt:"파일을 소유자만 읽고 쓸 수 있게, 다른 사용자는 아무 권한이 없게 설정하려면?",options:["chmod 600 file.txt","chmod 644 file.txt","chmod 777 file.txt"],answer:0,why:"6은 읽기(4)+쓰기(2), 0은 권한 없음이야.",tryIt:"mkdir -p ~/meowde-linux-lab && touch ~/meowde-linux-lab/practice.txt && chmod 600 ~/meowde-linux-lab/practice.txt && ls -l ~/meowde-linux-lab/practice.txt"},
{id:"permissions-3",unit:"권한",title:"소유자 변경",prompt:"파일 소유자를 바꾸는 명령은?",options:["chmod","chown","grep"],answer:1,why:"chown은 소유자를, chmod는 권한을 바꿔.",tryIt:"ls -l ~/meowde-linux-lab/practice.txt"},
{id:"process-1",unit:"프로세스",title:"프로세스 목록",prompt:"현재 실행 중인 프로세스들을 넓게 확인하는 명령은?",options:["ps aux","cat /etc/passwd","pwd"],answer:0,why:"ps aux는 프로세스 목록과 사용자, PID, 자원 사용량 등을 보여줘.",tryIt:"ps aux | head"},
{id:"process-2",unit:"프로세스",title:"PID와 PPID",prompt:"PPID는 무엇을 나타낼까?",options:["프로그램 설치 경로","부모 프로세스의 ID","프로세스 우선순위"],answer:1,why:"PID는 현재 프로세스의 식별자, PPID는 부모 프로세스의 식별자야.",tryIt:"ps -ef | head"},
{id:"process-3",unit:"프로세스",title:"grep과 파이프",prompt:"ps aux | grep python은 무엇을 할까?",options:["Python을 설치한다","프로세스 목록에서 python이 포함된 줄을 찾는다","Python 프로세스를 모두 종료한다"],answer:1,why:"파이프(|)는 출력 내용을 다음 명령의 입력으로 연결해. grep 자신도 출력에 포함될 수 있어.",tryIt:"ps aux | grep python"},
{id:"script-1",unit:"셸 스크립트",title:"셰뱅",prompt:"스크립트 첫 줄 #!/bin/bash는 보통 어떤 의미일까?",options:["사용할 인터프리터 지정","실행 중인 모든 프로세스 종료","변수 삭제"],answer:0,why:"셰뱅(shebang)은 스크립트를 어떤 인터프리터로 실행할지 알려줘.",tryIt:"printf '#!/bin/bash\\necho Hello\\n' | bash"},
{id:"script-2",unit:"셸 스크립트",title:"변수 참조",prompt:"name=cat 다음에 변수 값을 출력하려면?",options:["echo name","echo $name","print(name)"],answer:1,why:"셸 변수의 값을 참조할 때는 $name처럼 $를 붙여. = 앞뒤에는 공백을 넣지 않아.",tryIt:"name=cat; echo $name"},
{id:"text-1",unit:"텍스트 처리",title:"출력 리다이렉션",prompt:"echo hello > log.txt를 두 번 실행하면 어떻게 될까?",options:["hello가 두 줄 생긴다","파일의 내용이 매번 덮어써진다","파일이 실행된다"],answer:1,why:">는 덮어쓰기, >>는 기존 파일의 끝에 추가하기야.",tryIt:"labfile=$(mktemp); echo hello > \"$labfile\"; echo world >> \"$labfile\"; cat \"$labfile\""},
{id:"text-2",unit:"텍스트 처리",title:"awk",prompt:"awk '$3 > 10 {print $1}' data.txt의 역할은?",options:["세 번째 필드가 10보다 큰 줄의 첫 번째 필드를 출력","첫 번째 줄을 삭제","데이터를 날짜별로 정렬"],answer:0,why:"awk의 $3은 세 번째 필드이고, 조건을 충족하면 print $1로 첫 번째 필드를 출력해.",tryIt:"printf 'cat 5 12\\ndog 4 8\\n' | awk '$3 > 10 {print $1}'"}
];
const safe=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function load(){try{let x=JSON.parse(localStorage.getItem(KEY)||"{}");return {index:Math.max(0,Math.min(lessons.length-1,Number(x.index)||0)),done:Array.isArray(x.done)?x.done.filter(id=>lessons.some(l=>l.id===id)):[]}}catch{return {index:0,done:[]}}}
const state=load();let selected=null,checked=false;
function save(){try{localStorage.setItem(KEY,JSON.stringify({index:state.index,done:state.done}))}catch{}}
function draw(){
const app=document.getElementById("app");if(!app)return;
const q=lessons[state.index],isDone=state.done.includes(q.id);
app.innerHTML='<div class="screen"><div class="top"><div class="brand"><h1>Meowde</h1></div><button class="lang" type="button" data-subject-trigger>Linux ⌄</button></div><main class="scroll" style="padding:20px 18px"><div style="font-size:12px;color:var(--muted)">LINUX · '+safe(q.unit)+' · '+(state.index+1)+'/'+lessons.length+'</div><h2 style="font-size:25px;margin:12px 0 20px">'+safe(q.title)+'</h2><section class="card" style="margin:0;padding:18px"><p style="font-size:16px;line-height:1.6;margin-bottom:20px">'+safe(q.prompt)+'</p><div id="linux-options" style="display:grid;gap:10px"></div><div id="linux-feedback" aria-live="polite"></div></section><section class="card" style="margin:16px 0 0;padding:16px"><strong style="font-size:13px">Ubuntu에서 직접 확인하기</strong><p style="margin:10px 0;font-size:12px;color:var(--muted)">아래 명령은 복사만 할 수 있어요. 앱 안에서 실행되지는 않습니다.</p><code style="display:block;white-space:pre-wrap;word-break:break-word;font-size:12px">'+safe(q.tryIt)+'</code><button id="linux-copy" class="btn ghost small" style="margin-top:14px">명령 복사</button></section><div style="display:flex;gap:8px;margin-top:16px"><button id="linux-prev" class="btn ghost small">이전</button><button id="linux-next" class="btn small" style="flex:1">다음 문제 →</button></div><p style="margin-top:12px;font-size:12px;color:var(--muted)">학습 기록: '+state.done.length+'/'+lessons.length+'문제</p></main></div>';
const options=app.querySelector("#linux-options"),feedback=app.querySelector("#linux-feedback");
q.options.forEach((o,i)=>{const btn=document.createElement("button");btn.className="btn ghost";btn.style.cssText="text-align:left;justify-content:flex-start;padding:12px;height:auto;min-height:44px;font-size:13px;white-space:normal";btn.textContent=(i+1)+". "+o;if(selected===i)btn.style.outline="2px solid var(--ink)";btn.onclick=()=>{if(checked)return;selected=i;draw()};options.appendChild(btn)});
if(checked){
 const correct=selected===q.answer;
 feedback.innerHTML='<p style="margin-top:18px;font-weight:800">'+(correct?"정답!":"아직 정답이 아니야. 다시 선택해 봐.")+'</p>'+(correct?'<p style="margin-top:8px;font-size:13px;line-height:1.6">'+safe(q.why)+'</p>':'');
 if(!correct){const retry=document.createElement("button");retry.className="btn ghost";retry.style.marginTop="12px";retry.textContent="다시 풀기";retry.onclick=()=>{selected=null;checked=false;draw()};feedback.appendChild(retry)}
}else{
 const btn=document.createElement("button");btn.className="btn";btn.style.marginTop="18px";btn.textContent="정답 확인";btn.disabled=selected===null;
 btn.onclick=()=>{checked=true;if(selected===q.answer&&!state.done.includes(q.id)){state.done.push(q.id);save()}draw()};feedback.appendChild(btn)
}
app.querySelector("#linux-copy").onclick=()=>{if(navigator.clipboard)navigator.clipboard.writeText(q.tryIt).catch(()=>{});else alert(q.tryIt)};
app.querySelector("#linux-prev").onclick=()=>move(-1);
app.querySelector("#linux-next").onclick=()=>move(1);
const sw=app.querySelector("[data-subject-trigger]");sw.onclick=()=>window.MeowSubjects?.open();
window.MeowLinux.currentScreen=app.firstElementChild;
}
function move(delta){state.index=(state.index+delta+lessons.length)%lessons.length;selected=null;checked=false;save();draw()}
window.MeowLinux={render:draw,currentScreen:null,lessonsCount:lessons.length,getProgress:()=>({...state})};
})();
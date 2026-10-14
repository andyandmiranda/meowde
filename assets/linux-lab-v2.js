/* Meowde Linux learning extension: E1-E4 README titles, practice console, error review */
(function(){
const titles=[
["내 위치 확인하기","폴더 한 번에 만들기","새 파일 만들고 정리하기","원본은 남기고 복사본 만들기","필요 없는 것만 골라서 지우기","확장자별로 자동 분류하기","이동과 동시에 이름 바꾸기","폴더 전체를 통째로 복제하기","이름이 겹칠 때 충돌 피하기","시스템 전체 이전하기"],
["회사 폴더 구조 파악 + 신입사원 등록","서버 로그 점검 (장애 원인 찾기)","편집기로 파일 수정하기","원본은 두고 복사본 만들기","파일 종류별로 분류하기","필요한 것만 남기고 정리하기","긴 문서 단계별로 읽기","vim으로 파일 수정하기","vim으로 여러 파일 합치기","오래된 메모 정리하기"],
["온보딩 파일 찾기","사진 파일 목록 만들기","설정 파일 점검 - TODO 개수 세기","공지사항에서 줄 번호 찾기","백업 파일 개수 확인","이름으로 파일 찾기","빈 폴더 찾아서 정리하기","로그에서 에러 줄 찾기","코드에 하드코딩된 비밀정보 찾기","프로젝트 인수인계 준비"],
["날짜별 로그 파일 찾기","에러 로그 건수 집계","특정 날짜 오류 로그 모으기","특정 IP의 이틀치 접속 합계","결제 실패 요청 찾기","느린 응답 찾기","GET 외 요청 중 실패 찾기","특정 경로 요청 수 세기","특정 순번의 접속 IP 찾기","주간 트래픽 점검 보고서 작성"]
];
const prompts=[
["docs/notes 폴더까지 이동한 뒤 절대경로를 확인해.","02 안에 지정된 project 폴더 구조를 만들어.","memo.txt를 만들고 file1.txt와 함께 archive로 이동해. file2.txt는 그대로 둬.","report.txt를 유지하면서 backup/report_backup.txt를 만들어.","temp.log와 빈 old_data 폴더만 삭제해.","mixed의 jpg와 txt 파일을 sorted/photos, sorted/documents로 분류해.","summary.txt를 최상위로 옮기면서 이름을 바꿔.","project 폴더 전체를 project_backup에 복제해.","teamA와 teamB의 report.txt를 덮어쓰기 없이 합쳐.","old_system의 파일을 new_system의 지정된 경로로 옮겨."],
["company의 하위 폴더를 조사하고 employees.csv에 신입사원을 추가해.","server.log 첫 5줄과 마지막 5줄을 보고 장애 원인을 기록해.","nano로 todo.txt 마지막에 주간 보고서 제출을 추가해.","draft의 보고서를 원본 유지하면서 submitted로 복사해.","inbox 파일을 유형별 폴더로 나눠.","temp_files의 지정된 임시 파일을 정리해.","manual.txt를 읽고 설치 방법 항목을 찾아.","vim으로 draft.txt 첫 줄에 문장을 추가해.","vim으로 날짜별 일지를 week_summary.txt에 모아.","old_notes의 파일을 지시대로 분류해."],
["orientation_schedule.txt를 find로 찾아 상대경로를 found_file.txt에 저장해.","photos 바로 아래 jpg 파일명 목록을 jpg_list.txt에 저장해.","settings.txt의 TODO 줄 수를 세어 todo_count.txt에 적어.","notice.txt에서 긴급을 포함한 줄 번호를 찾아 저장해.","storage 바로 아래 bak 파일 개수를 저장해.","teamproject 아래 py 파일 경로를 모아.","project에서 비어 있는 디렉터리만 찾아 삭제해.","app.log에서 ERROR 줄을 찾아 incident_note.txt에 기록해.","src 안의 API_KEY 하드코딩 값을 REPLACE_ME로 변경해.","handoff의 백업 파일 및 비밀번호 항목을 점검해."],
["logs에서 .log 파일을 찾아 found_logs.txt로 저장해.","access.log의 500·404 건수를 각각 집계해.","2024-02-12 로그의 500 줄을 day12_report.txt로 저장해.","2024-02-10·11의 IP 203.0.113.7 접속 건수를 합산해.","/checkout 중 500 오류를 checkout_failures.txt로 저장해.","7번째 열이 1000 이상인 줄에서 첫 줄과 마지막 줄을 기록해.","GET 이외의 요청 중 500 오류를 추출해.","경로가 정확히 /account인 요청 개수를 세어.","2024-02-13 로그의 500 오류를 조사해.","server 로그에서 특정 IP를 찾아 주간 보고서를 작성해."]
];
const samples={
0:[["pwd","/home/student/E1/01 (연습용 예시)"],["ls","docs   README.txt (연습용 예시)"],["mkdir -p project/src project/docs","폴더 생성 명령의 형태가 맞아."],["touch memo.txt","빈 파일을 만드는 명령이야."],["cp report.txt backup/report_backup.txt","원본을 유지하며 복사해."],["rm temp.log","파일을 삭제하는 명령이야. 실제 터미널 실행 아님."],["rmdir old_data","빈 디렉터리를 삭제하는 명령이야."]],
1:[["head -n 5 server.log","파일 앞 5줄 확인 명령이야."],["tail -n 5 server.log","파일 뒤 5줄 확인 명령이야."],["nano todo.txt","편집기에서 파일을 여는 명령이야."],["vim draft.txt","Vim 편집기에서 파일을 여는 명령이야."]],
2:[["find onboarding -name orientation_schedule.txt","이름으로 파일을 검색하는 명령이야."],["grep -n 긴급 notice.txt","줄 번호와 함께 검색해."],["grep -c TODO settings.txt","일치하는 줄의 개수를 세어."]],
3:[["find logs -name '*.log'","로그 파일을 찾아."],["awk '$7>=1000' access.log","7번째 필드가 1000 이상인 줄을 골라."],["grep '500' access.log","500 문자열을 포함하는 줄을 골라. 실제 상태코드 위치까지 확인해야 해."]],
4:[["chmod 755 deploy/run.sh","소유자 rwx, 나머지 r-x."],["umask 077","새 파일·폴더의 그룹·기타 권한을 제한해."],["sudo usermod -aG interns webmaster","기존 보조 그룹을 유지하며 추가해."]],
5:[["ps aux","시스템 전체 프로세스 표시 형식이야. 실제 목록 아님."],["jobs","현재 셸 작업 목록을 확인하는 명령이야."],["kill 1234","예시 PID에 SIGTERM을 보내는 형식이야. 실제 전송은 하지 않아."]],
6:[["sudo apt update","패키지 목록을 갱신하는 명령 형식이야."],["apt search figlet","패키지를 검색하는 명령 형식이야."],["sudo apt install tree","패키지 설치 명령 형식이야. 실제 설치는 하지 않아."]]
};
for(let u=0;u<4;u++)for(let k=0;k<10;k++){if(DATA[u].tasks[k])DATA[u].tasks[k]=titles[u][k];}
const normalize=s=>String(s||"").trim().replace(/\s+/g," ");
const original=render;render=function(){original();let u=state.unit,t=state.task;const area=document.getElementById("viewer");if(!area)return;
if(u<4){let n=document.createElement("section");n.className="card";n.innerHTML='<span class="pill">원본 README 기반 핵심 과제</span><h2>'+esc(titles[u][t])+'</h2><p>'+esc(prompts[u][t])+'</p><p class="sub">요약이므로 세부 조건과 정확한 요구사항은 ZIP '+String(t+1).padStart(2,"0")+'/README.txt를 확인하세요.</p>';area.appendChild(n);}
const lab=document.createElement("section");lab.className="card";lab.innerHTML='<h2>⌨ 안전한 명령어 연습</h2><p class="sub">아래 예제 중 하나를 입력해 봐. 이 창은 실제 Ubuntu가 아니며 파일 수정·삭제·패키지 설치는 실행하지 않아.</p><pre id="linux-out" aria-live="polite">student@meowde:~$</pre><input id="linux-in" aria-label="Linux 연습 명령어" placeholder="예: '+esc(samples[u][0][0])+'" autocomplete="off" spellcheck="false"><button id="linux-run" class="btn" style="margin-top:10px">입력 확인</button><p class="sub">이 단원 연습 예시: '+samples[u].map(x=>'<code>'+esc(x[0])+'</code>').join(' · ')+'</p>';area.appendChild(lab);
document.getElementById("linux-run").onclick=()=>{const raw=document.getElementById("linux-in").value,match=samples[u].find(x=>normalize(x[0])===normalize(raw));document.getElementById("linux-out").textContent="student@meowde:~$ "+raw+"\n"+(match?match[1]:"등록된 연습 명령어가 아니야. 아래 예제를 참고해 봐. 자유로운 실제 명령어 실행은 지원하지 않아.");};document.getElementById("linux-in").onkeydown=e=>{if(e.key==="Enter")document.getElementById("linux-run").click()};
const wrong=Object.keys(state.quiz).filter(key=>{const [ui,ki]=key.split("-").map(Number);return DATA[ui]&&DATA[ui].quiz[ki]&&state.quiz[key]!==DATA[ui].quiz[ki][2]});
const review=document.createElement("section");review.className="card";review.innerHTML='<div class="row"><b>틀린 문제 다시 보기</b><span class="pill">'+wrong.length+'개</span></div><p class="sub">'+(wrong.length?wrong.slice(0,4).map(k=>{let [ui,qi]=k.split("-").map(Number);return esc(DATA[ui].title+" · "+DATA[ui].quiz[qi][0])}).join("<br>"):"현재 기록된 오답이 없어.")+'</p>'+(wrong.length?'<button class="btn ghost" id="linux-review">오답 초기화 후 다시 풀기</button>':'');area.appendChild(review);if(wrong.length)document.getElementById("linux-review").onclick=()=>{wrong.forEach(k=>delete state.quiz[k]);save();render()};};
render();
})();
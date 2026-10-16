(async function(){
  "use strict";
  const root=document.getElementById("lab"),KEY="meowde-python-lab-v1";
  const escape=value=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const list=(items,ordered=false)=>`<${ordered?"ol":"ul"}>${items.map(item=>`<li>${escape(item)}</li>`).join("")}</${ordered?"ol":"ul"}>`;
  let data,progress={},unit,worker=null,timer=null,busy=false,storageProblem=false;
  let runAssisted=false;
  try{const stored=JSON.parse(localStorage.getItem(KEY)||"{}");if(stored&&stored.version===1&&stored.units&&typeof stored.units==="object"&&!Array.isArray(stored.units))progress=stored.units}catch{storageProblem=true}
  function record(id=unit.id){
    if(!progress[id]||typeof progress[id]!=="object"||Array.isArray(progress[id]))progress[id]={};
    return progress[id];
  }
  function save(){try{localStorage.setItem(KEY,JSON.stringify({version:1,units:progress}));return true}catch{storageProblem=true;showStorageProblem();return false}}
  function showStorageProblem(){const notice=document.getElementById("storage-status");if(notice)notice.textContent="이 브라우저에 기록을 저장하지 못했습니다. 현재 탭에서는 계속할 수 있지만 새로고침하면 사라질 수 있습니다."}
  function stateLabel(u){const r=record(u.id);return r.lastPassed===false?"최근 재시도 · 복습 권장":r.independentPassed&&r.quizPassed?"혼자 적용 확인":r.passed?"코드 통과 · 이해/독립 재도전 권장":r.attempts?"복습 권장":"학습 시작"}
  function navigation(){return data.units.map((u,i)=>`<a href="#${u.id}" ${u.id===unit.id?'aria-current="page"':''}>${i+1}. ${escape(u.title)}<small>${stateLabel(u)}</small></a>`).join("")}
  function stop(message){
    if(worker)worker.terminate();worker=null;clearTimeout(timer);busy=false;
    const status=document.getElementById("run-status");if(status&&message)status.textContent=message;
    root.querySelectorAll("[data-run]").forEach(b=>b.disabled=false);
    const cancel=document.getElementById("stop-run");if(cancel)cancel.hidden=true;
  }
  function render(){
    stop();
    const r=record(),u=unit,t=u.task;
    root.innerHTML=`<section class="hero"><img src="/assets/meowde-approved-headphones.svg?v=450" alt=""><div><h1>Python 실습</h1><p>학습한 개념을 직접 적용해 봐요.</p><p class="meta">${escape(data.notice)}</p></div></section>
      <div class="practice-mode-switch" aria-label="실습 방식 안내"><div><strong>기본 문제</strong><span>레슨 속 짧은 문제부터</span><a href="/learning-path.html?subject=python">학습 경로에서 풀기 →</a></div><div class="is-active"><strong>추가 코드 실습</strong><span>18개 응용 단원 · 현재: ${escape(u.title)}</span><span class="mode-current">지금 이 화면</span></div></div>
      <p id="storage-status" class="storage-warning" role="status"></p>
      <button class="nav-toggle" id="nav-toggle" aria-controls="unit-nav" aria-expanded="false">단원 목록 열기</button>
      <div class="layout"><nav id="unit-nav" class="unit-nav" data-collapsed="true" aria-label="학습 단원">${navigation()}</nav>
      <article class="lesson" aria-labelledby="unit-title"><h2 id="unit-title" tabindex="-1">${escape(u.title)}</h2><p class="badge">${stateLabel(u)}</p>
      <section class="card"><h3>학습 목표와 준비 사항</h3><div class="prerequisites">선수 개념: ${u.prerequisites.length?u.prerequisites.map(id=>`<a href="#${id}">${escape(data.units.find(x=>x.id===id).title)}</a>`).join(""):"없음 · 첫 학습부터 시작할 수 있습니다."}</div>${list(u.goals)}<p class="meta">목표를 읽고 낯선 용어가 있으면 아래 용어 설명부터 확인하세요. 어느 단원이든 자유롭게 열 수 있습니다.</p></section>
      <section class="card"><h3>왜 필요하고, 어떻게 동작할까?</h3><p>${escape(u.concept)}</p><details><summary>새 용어와 문법 확인하기</summary><dl>${Object.entries(u.glossary).map(([k,v])=>`<dt>${escape(k)}</dt><dd>${escape(v)}</dd>`).join("")}</dl></details></section>
      <section class="card"><h3>실행 흐름 따라가기</h3><pre>${escape(u.example)}</pre><p>예상 출력</p><pre>${escape(u.output)}</pre>${list(u.flow,true)}<button data-run="example">예제 실행</button><h4>흔한 오해</h4>${list(u.pitfalls)}</section>
      <section class="card" id="quiz"><h3>이해 확인 · 결과 예측</h3><p class="meta">${escape(u.quiz.difficulty)} · 목표: ${escape(u.quiz.goal)}<br>평가 기준: ${escape(u.quiz.criteria)}<br>선수 개념: 이 단원의 개념과 실행 흐름</p><pre>${escape(u.quiz.code)}</pre><div>${u.quiz.choices.map((c,i)=>`<button class="choice" data-choice="${i}" aria-pressed="false">${escape(c)}</button>`).join("")}</div><p id="quiz-feedback" role="status"></p></section>
      <section class="card" id="practice"><h3>이번 문제 · ${escape(t.type)}</h3><p class="meta">${escape(t.difficulty)} · 학습 목표: ${escape(u.goals.join(" / "))}<br>선수 개념: ${escape(u.prerequisites.map(id=>data.units.find(x=>x.id===id).title).concat(u.title).join(" → "))}</p><p>${escape(t.prompt)}</p><h4>평가 기준</h4>${list(t.criteria)}
      <label for="learner-code">내 코드 · 공백 4칸으로 들여쓰세요</label><textarea id="learner-code" class="code" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-describedby="code-info">${escape(typeof r.draft==="string"?r.draft:t.starter)}</textarea><p id="code-info" class="meta">Tab으로 공백 4칸을 넣을 수 있습니다. 실행은 브라우저의 임시 환경에서 진행합니다. 입력 대기는 지원하지 않으며 각 테스트는 새 변수·임시 폴더에서 시작합니다.</p>
      <div class="actions"><button data-run="grade" class="primary">코드 실행 · 기준 확인</button><button id="hint-button">힌트 한 단계 보기</button><button id="stop-run" hidden>실행 중지</button></div><div id="hints">${(t.hints.slice(0,r.hints||0)).map((h,i)=>`<p class="feedback">힌트 ${i+1}: ${escape(h)}</p>`).join("")}</div>
      <details id="solution"><summary>풀이와 대안 보기 · 도움받은 학습으로 기록</summary><p>먼저 힌트를 적용해 직접 작성해보세요. 풀이를 본 뒤에는 다른 날 다시 작성해 독립 적용을 확인할 수 있습니다.</p>${list(t.steps,true)}<pre>${escape(t.model)}</pre><h4>흔한 실수</h4><p>${escape(t.mistake)}</p><h4>대안과 장단점</h4><p>${escape(t.alternative)}</p></details>
      <p id="run-status" role="status" aria-live="polite"></p><div id="run-results"></div><p class="meta">${escape(data.runtime)} 초기 로딩이 끝난 후 실행이 15초를 넘으면 중단합니다. 네트워크·실행기 오류는 오답으로 기록하지 않습니다.</p></section>
      ${u.reflection?`<section class="card"><h3>분석 판단 · 자기 점검</h3><p>${escape(u.reflection.prompt)}</p>${list(u.reflection.criteria)}<label for="reflection">내 판단과 추가 자료</label><textarea class="reflection" id="reflection">${escape(r.reflection||"")}</textarea><button id="reflection-save">자기 점검 메모 저장</button><p id="reflection-status" role="status"></p><details><summary>판단 비교하기 · 자동 채점 없음</summary><p>${escape(u.reflection.guidance)}</p></details></section>`:""}
      <section class="card"><h3>복습과 다음 학습</h3><div id="recommendation">${recommendation()}</div><button id="independent-retry">도움 없이 다시 작성하기</button><p class="meta">저장한 코드를 비우고 힌트를 접습니다. 기존 통과 이력은 유지하며 다음 제출은 독립 적용으로 다시 확인합니다.</p></section>
      </article></div>`;
    // Practice is the primary destination. Preserve all original learning sections,
    // feedback, hints, editor draft and grading; only improve their presentation order.
    const lesson=root.querySelector(".lesson");
    const practice=root.querySelector("#practice");
    const intro=lesson?.querySelector("#unit-title");
    if(lesson&&practice&&intro){
      const start=document.createElement("section");
      start.className="practice-entry";
      start.setAttribute("aria-label","실습 바로 시작");
      const title=document.createElement("h3");title.textContent="바로 풀어보기";
      const explanation=document.createElement("p");explanation.textContent="먼저 직접 풀고, 막히면 아래의 개념·예제·힌트를 확인해요.";
      const links=document.createElement("div");links.className="practice-entry-links";
      for(const [href,label] of [["#practice","문제 풀기"],["#practice-concept","개념 보기"],["#quiz","결과 예측"]]){
        const a=document.createElement("a");a.href=href;a.textContent=label;links.append(a);
      }
      start.append(title,explanation,links);
      const firstCard=lesson.querySelector(".card");
      if(firstCard)lesson.insertBefore(start,firstCard);
      lesson.insertBefore(practice,start.nextSibling);
      const conceptCards=[...lesson.querySelectorAll(".card")];
      const concept=conceptCards.find(el=>el.querySelector("h3")?.textContent?.includes("왜 필요하고"));
      if(concept)concept.id="practice-concept";
      practice.classList.add("practice-primary");
    }
    if(storageProblem)showStorageProblem();
    bind();
  }
  function recommendation(){
    const r=record(),index=data.units.indexOf(unit),next=data.units[index+1];
    const weak=unit.prerequisites.filter(id=>!record(id).independentPassed);
    const text=r.lastPassed===false?`최근 실패한 기준: ${(r.lastFailed||[]).join(" / ")}. 이 단원의 실행 흐름과 흔한 오해를 다시 읽고 한 기준씩 수정해보세요.`:r.passed?(r.independentPassed?"테스트 기준을 통과했습니다. 설명을 읽고 결과 예측도 확인한 뒤 다음 개념으로 연결해보세요.":"도움을 사용한 뒤 코드 기준을 통과했습니다. 풀이를 접고 다시 작성해 적용을 확인하세요."):"실패한 평가 기준과 관련된 실행 흐름을 다시 읽고, 힌트 한 단계만 적용해 재시도하세요.";
    return `<p>${escape(text)}</p><div class="next">${weak.map(id=>`<a href="#${id}">선수 복습: ${escape(data.units.find(x=>x.id===id).title)}</a>`).join("")}${next?`<a href="#${next.id}">다음: ${escape(next.title)}</a>`:'<a href="#values">처음부터 다시 적용하기</a>'}</div>`;
  }
  function refreshProgress(){
    const nav=document.getElementById("unit-nav");if(nav)nav.innerHTML=navigation();
    const badge=root.querySelector(".lesson > .badge");if(badge)badge.textContent=stateLabel(unit);
    const box=document.getElementById("recommendation");if(box)box.innerHTML=recommendation();
  }
  function bind(){
    document.getElementById("nav-toggle").onclick=event=>{const nav=document.getElementById("unit-nav"),open=nav.dataset.collapsed==="true";nav.dataset.collapsed=String(!open);event.currentTarget.setAttribute("aria-expanded",String(open));event.currentTarget.textContent=open?"단원 목록 접기":"단원 목록 열기"};
    root.querySelectorAll("[data-choice]").forEach(button=>button.onclick=()=>{
      const index=Number(button.dataset.choice),correct=index===unit.quiz.answer,r=record();
      r.quizAttempts=(r.quizAttempts||0)+1;r.quizPassed=correct;r.lastQuizChoice=index;
      root.querySelectorAll("[data-choice]").forEach(b=>b.setAttribute("aria-pressed",String(b===button)));
      const box=document.getElementById("quiz-feedback");box.className="feedback "+(correct?"good":"bad");box.textContent=(correct?"맞았습니다. ":"다시 생각해보세요. ")+unit.quiz.reasons[index];save();refreshProgress();
    });
    const editor=document.getElementById("learner-code");
    editor.oninput=()=>{record().draft=editor.value;save()};
    editor.onkeydown=event=>{if(event.key==="Tab"&&!event.shiftKey){event.preventDefault();editor.setRangeText("    ",editor.selectionStart,editor.selectionEnd,"end");record().draft=editor.value;save()}};
    document.getElementById("hint-button").onclick=()=>{const r=record();r.hints=Math.min(unit.task.hints.length,(r.hints||0)+1);r.assisted=true;if(busy)runAssisted=true;save();document.getElementById("hints").innerHTML=unit.task.hints.slice(0,r.hints).map((h,i)=>`<p class="feedback">힌트 ${i+1}: ${escape(h)}</p>`).join("");if(r.hints===unit.task.hints.length)document.getElementById("hint-button").disabled=true};
    document.getElementById("solution").addEventListener("toggle",event=>{if(event.target.open){record().assisted=true;if(busy)runAssisted=true;save()}});
    root.querySelectorAll("[data-run]").forEach(button=>button.onclick=()=>run(button.dataset.run));
    document.getElementById("stop-run").onclick=()=>stop("실행을 중지했습니다. 코드는 남아 있고 오답으로 기록하지 않았습니다.");
    document.getElementById("independent-retry").onclick=()=>{const r=record();r.assisted=false;r.hints=0;r.draft=unit.task.starter;save();render();document.getElementById("learner-code").focus()};
    const reflection=document.getElementById("reflection");if(reflection){reflection.oninput=()=>{record().reflection=reflection.value;save()};document.getElementById("reflection-save").onclick=()=>{record().reflection=reflection.value;document.getElementById("reflection-status").textContent=save()?"메모를 저장했습니다. 서술의 적절성은 자기 점검 기준과 비교하세요.":"저장하지 못했습니다. 메모를 별도로 복사해두세요."}}
  }
  function diagnosis(result){
    const guides={SyntaxError:"문장 끝의 콜론·괄호·따옴표를 확인하세요.",IndentationError:"같은 블록은 같은 깊이로 들여써야 합니다.",NameError:"이 이름을 사용하기 전에 정의했는지, 철자가 맞는지 확인하세요.",TypeError:"문자열·수·반환값의 자료형이 계약과 같은지 확인하세요.",IndexError:"빈 입력과 끝 인덱스를 확인하세요.",KeyError:"요구된 키·열 이름과 실제 키를 대조하세요.",ValueError:"변환 가능한 값인지 또는 배열의 모양이 호환되는지 확인하세요.",EOFError:"이 실험실에서는 입력 대기를 지원하지 않습니다. 문제에서 지정한 함수 인자를 사용하세요."};
    return guides[result.errorType]||"해당 평가 기준의 입력·출력 계약과 경계 조건을 다시 확인하세요.";
  }
  function run(mode){
    if(busy)return;
    if(typeof Worker==="undefined"){document.getElementById("run-status").textContent="이 브라우저는 실행에 필요한 Worker를 지원하지 않습니다. 다른 브라우저에서 다시 시도하세요.";return}
    busy=true;runAssisted=!!record().assisted;
    root.querySelectorAll("[data-run]").forEach(b=>b.disabled=true);document.getElementById("stop-run").hidden=false;
    document.getElementById("run-status").textContent="실행 환경을 준비하고 있습니다. 첫 실행은 인터넷 연결과 시간이 필요합니다.";
    document.getElementById("run-results").replaceChildren();
    const id=unit.id,code=mode==="example"?unit.example:document.getElementById("learner-code").value;
    const fail=message=>stop(message+" 진도는 변경하지 않았습니다.");
    try{worker=new Worker("/assets/python-lab-worker.js?v=1")}catch(error){fail("실행 환경을 시작하지 못했습니다. "+error.message);return}
    timer=setTimeout(()=>fail("실행 환경 로딩 시간이 초과되었습니다. 네트워크를 확인하고 다시 실행하세요."),120000);
    worker.onerror=()=>fail("실행 환경을 불러오지 못했습니다. 네트워크를 확인하고 다시 시도하세요.");
    worker.onmessage=({data:message})=>{
      if(id!==unit.id)return;
      if(message.stage==="running"){clearTimeout(timer);timer=setTimeout(()=>fail("실행이 15초를 초과했습니다. 반복문의 종료 조건을 확인하세요."),15000);document.getElementById("run-status").textContent="코드와 평가 기준을 확인하고 있습니다…";return}
      if(message.stage==="error"){fail("실행기 오류: "+message.message);return}
      if(message.stage!=="complete")return;
      const result=message.result;stop();
      const passed=result.results.every(x=>x.pass),r=record();
      if(mode==="grade"){
        r.attempts=(r.attempts||0)+1;r.lastPassed=passed;r.lastFailed=result.results.filter(x=>!x.pass).map(x=>x.label);r.draft=code;
        if(passed){r.passed=true;if(!runAssisted)r.independentPassed=true;r.lastPassedWithHelp=runAssisted}
        save();refreshProgress();
      }
      document.getElementById("run-status").textContent=mode==="example"?(passed?"예제 실행을 마쳤습니다. 예상 출력과 비교하세요.":"예제 실행 중 오류가 발생했습니다."):(passed?(runAssisted?"모든 기준 통과 · 도움을 사용한 학습으로 기록했습니다.":"모든 기준 통과 · 도움 없이 적용한 결과로 기록했습니다."):"일부 기준을 통과하지 못했습니다. 실패 이유를 확인하고 다시 작성하세요.");
      document.getElementById("run-results").innerHTML=`<ul class="results">${result.results.map((x,i)=>`<li class="${x.pass?"result-pass":"result-fail"}">${x.pass?"✓ 통과":"× 재시도"} · ${escape(x.label)}${x.pass?"":`<p>${escape(mode==="grade"?unit.task.tests[i].feedback:diagnosis(x))}</p><p>${escape(diagnosis(x))}</p><details><summary>오류 위치 확인</summary><pre>${escape(x.trace||x.error||x.errorType)}</pre></details>`}</li>`).join("")}</ul>${result.output?`<h4>실제 출력 · 최대 20,000자</h4><pre>${escape(result.output)}</pre>`:""}<div class="chart-output">${(result.images||[]).map(png=>`<img src="data:image/png;base64,${png}" alt="내 코드에서 생성한 차트. 데이터와 축 레이블은 위 코드 및 평가 기준과 함께 확인하세요.">`).join("")}</div>`;
    };
    worker.postMessage({code,tests:mode==="grade"?unit.task.tests:[]});
  }
  try{
    const response=await fetch("/assets/python-lab-content.json?v=1");if(!response.ok)throw new Error("학습 내용 응답 "+response.status);
    data=await response.json();if(data.version!==1||!Array.isArray(data.units)||!data.units.length)throw new Error("지원하지 않는 학습 내용 형식");
    function route(focus){const id=location.hash.slice(1);unit=data.units.find(u=>u.id===id)||data.units[0];render();if(focus){document.getElementById("unit-title").focus();window.scrollTo(0,0)}}
    window.addEventListener("hashchange",()=>route(true));window.addEventListener("pagehide",()=>stop());route(false);
  }catch(error){root.innerHTML=`<div class="error-panel" role="alert"><h1>학습 내용을 열지 못했습니다</h1><p>${escape(error.message)}</p><a href="/python-lab.html">다시 시도</a> · <a href="/">먀오드 홈으로</a></div>`}
})();

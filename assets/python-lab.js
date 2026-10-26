(async function(){
  "use strict";
  const root=document.getElementById("lab"),KEY="meowde-python-lab-v1";
  const escape=value=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const list=(items,ordered=false)=>`<${ordered?"ol":"ul"}>${items.map(item=>`<li>${escape(item)}</li>`).join("")}</${ordered?"ol":"ul"}>`;
  let data,progress={},unit,worker=null,timer=null,busy=false,storageProblem=false;
  let runAssisted=false,storageReadBlocked=false,stage="understand",pathStep="",valuesPath=null;
  try{
    const raw=localStorage.getItem(KEY);
    if(raw!==null){
      const stored=JSON.parse(raw);
      const object=value=>value!==null&&typeof value==="object"&&!Array.isArray(value);
      if(!object(stored)||stored.version!==1||!object(stored.units)||!Object.values(stored.units).every(object))throw new Error("Unsupported practice records");
      progress=stored.units;
    }
  }catch{storageProblem=true;storageReadBlocked=true}
  function record(id=(unit.id==="function-slots"&&stage==="practice"?"function-slots:practice":unit.id)){
    if(!progress[id]||typeof progress[id]!=="object"||Array.isArray(progress[id]))progress[id]={};
    return progress[id];
  }
  function save(){if(storageReadBlocked){showStorageProblem();return false}try{localStorage.setItem(KEY,JSON.stringify({version:1,units:progress}));storageProblem=false;const notice=document.getElementById("storage-status");if(notice)notice.textContent="";return true}catch{storageProblem=true;showStorageProblem();return false}}
  function showStorageProblem(){const notice=document.getElementById("storage-status");if(notice)notice.textContent=storageReadBlocked?"기존 기록을 안전하게 읽을 수 없어 덮어쓰지 않았습니다. 현재 탭에서 연습할 수 있지만 새 작업은 저장되지 않으니 코드를 별도로 복사해두세요.":"이 브라우저에 기록을 저장하지 못했습니다. 현재 탭에서는 계속할 수 있지만 새로고침하면 사라질 수 있습니다."}
  function stateLabel(u){const r=u.id===unit.id&&u.id==="function-slots"?record():record(u.id);return r.lastPassed===false?"최근 재시도 · 복습 권장":r.independentPassed&&r.quizPassed?"혼자 적용 확인":r.passed?"코드 통과 · 이해/독립 재도전 권장":r.attempts?"복습 권장":"학습 시작"}
  function navigation(){return data.units.map((u,i)=>`<a href="#${u.id}" ${u.id===unit.id?'aria-current="page"':''}>${i+1}. ${escape(u.title)}<small>${stateLabel(u)}</small></a>`).join("")}
  function stop(message){
    if(valuesPath){valuesPath.stop();valuesPath=null;window.MeowValuesPathSession=null;}
    if(worker)worker.terminate();worker=null;clearTimeout(timer);busy=false;
    const status=document.getElementById("run-status");if(status&&message)status.textContent=message;
    root.querySelectorAll("[data-run]").forEach(b=>b.disabled=false);
    const cancel=document.getElementById("stop-run");if(cancel)cancel.hidden=true;
  }
  function render(){
    stop();
    const r=record(),u=unit,t=u.task;
    // Existing coding drafts keep their editor; new learners take one path.
    const hasCodingHistory=typeof r.draft==='string'||r.attempts||r.passed||r.independentPassed||Number(r.guideLevel)>=4;
    if(u.id==='values'&&pathStep!=='challenge'&&(r.valuesPath||!hasCodingHistory||pathStep==='learn')&&window.MeowValuesPath){
      valuesPath=window.MeowValuesPath.mount({root,record:r,save,escape,units:data.units,blocked:storageReadBlocked});
      window.MeowValuesPathSession=valuesPath;return;
    }
    root.innerHTML=`<section class="hero"><img src="/assets/meowde-approved-headphones.svg?v=450" alt=""><div><h1>${escape(data.title)}</h1><p>원리를 이해하고, 다른 입력에도 적용해보세요.</p><p class="meta">${escape(data.notice)}</p></div></section>
      <p id="storage-status" class="storage-warning" role="status"></p>
      <button class="nav-toggle" id="nav-toggle" aria-controls="unit-nav" aria-expanded="false">단원 목록 열기</button>
      <div class="layout"><nav id="unit-nav" class="unit-nav" data-collapsed="true" aria-label="학습 단원">${navigation()}</nav>
      <article class="lesson" aria-labelledby="unit-title"><h2 id="unit-title" tabindex="-1">${escape(u.title)}</h2><p class="badge">${stateLabel(u)}</p>
      <section class="card"><h3>준비와 학습 목표</h3><div class="prerequisites">선수 개념: ${u.prerequisites.length?u.prerequisites.map(id=>`<a href="#${id}">${escape(data.units.find(x=>x.id===id).title)}</a>`).join(""):"없음 · 첫 학습부터 시작할 수 있습니다."}</div>${list(u.goals)}<p class="meta">목표를 읽고 낯선 용어가 있으면 아래 용어 설명부터 확인하세요. 어느 단원이든 자유롭게 열 수 있습니다.</p></section>
      <section class="card"><h3>왜 필요하고, 어떻게 동작할까?</h3><p>${escape(u.concept)}</p><details><summary>새 용어와 문법 확인하기</summary><dl>${Object.entries(u.glossary).map(([k,v])=>`<dt>${escape(k)}</dt><dd>${escape(v)}</dd>`).join("")}</dl></details></section>
      <section class="card"><h3>실행 흐름 따라가기</h3><pre>${escape(u.example)}</pre><p>예상 출력</p><pre>${escape(u.output)}</pre>${list(u.flow,true)}<button data-run="example">예제 실행</button><h4>흔한 오해</h4>${list(u.pitfalls)}</section>
      <section class="card" id="quiz"><h3>이해 확인 · 결과 예측</h3><p class="meta">${escape(u.quiz.difficulty)} · 목표: ${escape(u.quiz.goal)}<br>평가 기준: ${escape(u.quiz.criteria)}<br>선수 개념: 이 단원의 개념과 실행 흐름</p><pre>${escape(u.quiz.code)}</pre><div>${u.quiz.choices.map((c,i)=>`<button class="choice" data-choice="${i}" aria-pressed="false">${escape(c)}</button>`).join("")}</div><p id="quiz-feedback" role="status"></p></section>
      <section class="card practice-task" id="practice"><p class="practice-kicker">실습 문제</p><h3>직접 작성 · ${escape(t.type)}</h3><p class="meta">${escape(t.difficulty)} · 학습 목표: ${escape(u.goals.join(" / "))}<br>선수 개념: ${escape(u.prerequisites.map(id=>data.units.find(x=>x.id===id).title).concat(u.title).join(" → "))}</p><p>${escape(t.prompt)}</p><h4>평가 기준</h4>${list(t.criteria)}
      <label for="learner-code">내 코드 · 공백 4칸으로 들여쓰세요</label><textarea id="learner-code" class="code" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-describedby="code-info">${escape(typeof r.draft==="string"?r.draft:t.starter)}</textarea><p id="code-info" class="meta">Tab으로 공백 4칸을 넣을 수 있습니다. 실행은 브라우저의 임시 환경에서 진행합니다. 입력 대기는 지원하지 않으며 각 테스트는 새 변수·임시 폴더에서 시작합니다.</p>
      <div class="actions"><button data-run="grade" class="primary">코드 실행 · 기준 확인</button><button id="hint-button">힌트 한 단계 보기</button><button id="stop-run" hidden>실행 중지</button></div><div id="hints">${(t.hints.slice(0,r.hints||0)).map((h,i)=>`<p class="feedback">힌트 ${i+1}: ${escape(h)}</p>`).join("")}</div>
      <details id="solution"><summary>풀이와 대안 보기 · 도움받은 학습으로 기록</summary><p>먼저 힌트를 적용해 직접 작성해보세요. 풀이를 본 뒤에는 다른 날 다시 작성해 독립 적용을 확인할 수 있습니다.</p>${list(t.steps,true)}<pre>${escape(t.model)}</pre><h4>흔한 실수</h4><p>${escape(t.mistake)}</p><h4>대안과 장단점</h4><p>${escape(t.alternative)}</p></details>
      <p id="run-status" role="status" aria-live="polite"></p><div id="run-results"></div><p class="meta">${escape(data.runtime)} 초기 로딩이 끝난 후 실행이 15초를 넘으면 중단합니다. 네트워크·실행기 오류는 오답으로 기록하지 않습니다.</p></section>
      ${u.reflection?`<section class="card"><h3>분석 판단 · 자기 점검</h3><p>${escape(u.reflection.prompt)}</p>${list(u.reflection.criteria)}<label for="reflection">내 판단과 추가 자료</label><textarea class="reflection" id="reflection">${escape(r.reflection||"")}</textarea><button id="reflection-save">자기 점검 메모 저장</button><p id="reflection-status" role="status"></p><details><summary>판단 비교하기 · 자동 채점 없음</summary><p>${escape(u.reflection.guidance)}</p></details></section>`:""}
      <section class="card"><h3>복습과 다음 학습</h3><div id="recommendation">${recommendation()}</div><button id="independent-retry">도움 없이 다시 작성하기</button><p class="meta">저장한 코드를 비우고 힌트를 접습니다. 기존 통과 이력은 유지하며 다음 제출은 독립 적용으로 다시 확인합니다.</p></section>
      </article></div>`;
    // Keep all existing learning aids but place the hands-on task first.
    // This is a presentation-only move: IDs, inputs, grading and storage are unchanged.
    const article=root.querySelector(".lesson"),practice=root.querySelector("#practice");
    if(article&&practice){
      const firstSection=article.querySelector(":scope > section.card");
      if(firstSection)article.insertBefore(practice,firstSection);
      const support=[...article.querySelectorAll(":scope > section.card")].filter(card=>card!==practice&&card.id!=="quiz"&&
        ["준비와 학습 목표","왜 필요하고, 어떻게 동작할까?","실행 흐름 따라가기"].some(title=>card.querySelector("h3")?.textContent?.includes(title)));
      if(support.length){
        const details=document.createElement("details");
        details.className="practice-support";
        const summary=document.createElement("summary");
        summary.textContent="개념 · 예제 · 학습 목표 보기";
        details.append(summary);
        support.forEach(card=>details.append(card));
        practice.after(details);
      }
      const actions=practice.querySelector(".actions"),status=practice.querySelector("#run-status"),results=practice.querySelector("#run-results");
      if(actions&&status&&results){actions.after(status);status.after(results);}
      // Secondary grading criteria and long runtime help remain available on demand.
      // Never collapse the problem prompt, editor, run action, hint, or live results.
      const criteria=practice.querySelector("h4");
      if(criteria&&criteria.textContent==="평가 기준"){
        const group=document.createElement("details");
        group.className="practice-criteria";
        const title=document.createElement("summary");
        title.textContent="채점 기준 · 도움말";
        group.append(title);
        const criteriaList=criteria.nextElementSibling;
        const description=practice.querySelector(":scope > p.meta");
        if(description)group.append(description);
        group.append(criteria);
        if(criteriaList?.tagName==="UL"||criteriaList?.tagName==="OL")group.append(criteriaList);
        const info=practice.querySelector("#code-info");
        if(info)group.append(info);
        const runtime=practice.querySelector("#run-results + p.meta");
        if(runtime)group.append(runtime);
        const prompt=practice.querySelector(":scope > p:not(.meta)");
        if(prompt)prompt.after(group);else practice.prepend(group);
      }
      practice.classList.add("practice-primary");
      // Focus mode: keep just ONE task visible. All educational material remains
      // intact in a separate accessible dialog, not another long scrolling page.
      const sheet=document.createElement("dialog");
      sheet.id="practice-tools";
      sheet.className="practice-tools-sheet";
      sheet.setAttribute("aria-label","학습 도구");
      const sheetHeading=document.createElement("div");
      sheetHeading.className="practice-tools-heading";
      const sheetTitle=document.createElement("h2");
      sheetTitle.textContent="학습 도구";
      const close=document.createElement("button");
      close.type="button";
      close.className="practice-tools-close";
      close.textContent="닫기";
      close.addEventListener("click",()=>sheet.close());
      sheetHeading.append(sheetTitle,close);
      sheet.append(sheetHeading);
      const tools=document.createElement("div");
      tools.className="practice-tools-content";
      sheet.append(tools);
      const move=(node,label)=>{
        if(!node)return;
        const detail=document.createElement("details");
        detail.className="practice-tools-group";
        const title=document.createElement("summary");
        title.textContent=label;
        detail.append(title,node);
        tools.append(detail);
      };
      // Existing DOM handlers still bind by ID after the move.
      move(article.querySelector("#values-bridge"),"연결 연습 · 기초에서 응용으로");
      move(article.querySelector(".practice-support"),"개념과 예제");
      // Open the existing concept section directly when requested; keep the original learning content intact.
      const conceptGroup=tools.querySelector(".practice-tools-group");
      const conceptDetails=conceptGroup?.querySelector(".practice-support");
      if(conceptDetails)conceptDetails.open=true;
      move(article.querySelector("#quiz"),"이해 확인 문제");
      move(article.querySelector(".card:has(#reflection)"),"생각 정리");
      move(article.querySelector("#recommendation")?.closest(".card"),"복습과 다음 학습");
      const criteriaPanel=practice.querySelector(".practice-criteria");
      move(criteriaPanel,"채점 기준");
      move(practice.querySelector("#solution"),"해설과 풀이");
      article.append(sheet);
      const toolsButton=document.createElement("button");
      toolsButton.id="practice-tools-open";
      toolsButton.type="button";
      toolsButton.textContent="개념 · 예제 · 해설";
      toolsButton.setAttribute("aria-haspopup","dialog");
      toolsButton.addEventListener("click",()=>sheet.showModal());
      // The hint button remains one-tap, with inline feedback shown only when requested.
      const row=practice.querySelector(".actions");
      if(row)row.append(toolsButton);
      sheet.addEventListener("click",event=>{
        if(event.target===sheet)sheet.close();
      });
      document.body.classList.add("meowde-practice-focus");

    }
    renderFunctionStages();
    if(storageProblem)showStorageProblem();
    bind();
  }
  function renderFunctionStages(){
    if(unit.id!=="function-slots")return;
    const article=root.querySelector(".lesson"),practice=root.querySelector("#practice");
    const steps=document.createElement("nav");
    steps.className="function-stages";steps.setAttribute("aria-label","함수 심화 단계");
    steps.innerHTML=[["understand","1. 이해"],["practice","2. 연습"],["challenge","3. 도전"]].map(([id,label])=>`<a href="#function-slots/${id}" ${stage===id?'aria-current="step"':''}>${label}</a>`).join("");
    article.querySelector(".badge").after(steps);
    const introduction=document.createElement("p");introduction.className="meta";
    introduction.textContent="이해 → 연습 → 도전 · 순서는 자유입니다. 연습과 도전은 따로 이어갈 수 있습니다. 도움받은 통과와 혼자 푼 결과를 구분해 복습합니다.";
    steps.after(introduction);
    if(stage==="understand"){
      practice.hidden=true;
      const understanding=document.createElement("section");understanding.className="function-understanding";
      const support=root.querySelector(".practice-support");
      if(support){support.open=true;understanding.append(support)}
      const quiz=root.querySelector("#quiz");if(quiz)understanding.append(quiz);
      const status=root.querySelector("#run-status"),results=root.querySelector("#run-results"),cancel=root.querySelector("#stop-run");
      if(status&&results&&cancel)understanding.append(cancel,status,results);
      const next=document.createElement("a");next.className="primary";next.href="#function-slots/practice";next.textContent="반환값을 직접 만들어보기 → 연습";
      understanding.append(next);introduction.after(understanding);
    }else{
      const label=stage==="practice"?"2. 연습 · 하나의 사용 수 계산":"3. 도전 · 여러 예약에 적용";
      practice.querySelector(".practice-kicker").textContent=label;
      const next=document.createElement("p");next.className="function-next";
      next.innerHTML=stage==="practice"?'<a href="#function-slots/challenge">새로운 예약 문제에 적용하기 → 도전</a>':'<a href="#function-slots/understand">반환값 개념 다시 확인하기</a> · <a href="/?tab=map">학습으로 돌아가기</a>';
      practice.append(next);
    }
  }
  function recommendation(){
    const r=record(),index=data.units.findIndex(u=>u.id===unit.id),next=data.units[index+1];
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
    const quizFeedback=index=>{const correct=index===unit.quiz.answer;const answer=unit.quiz.choices[unit.quiz.answer];return (correct?"맞았습니다. ":"다시 생각해보세요. 정답: "+answer+". ")+unit.quiz.reasons[index]+(correct?"":" "+unit.quiz.reasons[unit.quiz.answer]);};
    root.querySelectorAll("[data-choice]").forEach(button=>button.onclick=()=>{
      const index=Number(button.dataset.choice),correct=index===unit.quiz.answer,r=record();
      r.quizAttempts=(r.quizAttempts||0)+1;r.quizPassed=correct;r.lastQuizChoice=index;
      root.querySelectorAll("[data-choice]").forEach(b=>b.setAttribute("aria-pressed",String(b===button)));
      const box=document.getElementById("quiz-feedback");box.className="feedback "+(correct?"good":"bad");box.textContent=quizFeedback(index);save();refreshProgress()
    });
    if(Number.isInteger(record().lastQuizChoice)){
      const index=record().lastQuizChoice;
      const selected=root.querySelector(`[data-choice="${index}"]`);
      if(selected){selected.setAttribute("aria-pressed","true");const correct=index===unit.quiz.answer;const box=document.getElementById("quiz-feedback");box.className="feedback "+(correct?"good":"bad");box.textContent=quizFeedback(index);}
    }
    // Optional no-keyboard code assembly: reusable snippets keep the real editor and grader intact.
    const editorArea=document.getElementById("learner-code");
    if(editorArea){
      const snippets=['print()','if :','else:','for  in :','def ():','return ','    ','" "','0','1','=',':','(',')'];
      const panel=document.createElement("details");
      panel.className="tap-code-tools";
      const summary=document.createElement("summary");
      summary.textContent="키보드 없이 코드 만들기";
      panel.append(summary);
      const note=document.createElement("p");
      note.className="meta";
      note.textContent="코드를 터치해 추가하고, 필요하면 입력창에서 수정하세요.";
      panel.append(note);
      const buttons=document.createElement("div");
      buttons.className="tap-code-buttons";
      snippets.forEach(snippet=>{
        const button=document.createElement("button");
        button.type="button";
        button.textContent=snippet==="    "?"들여쓰기":snippet;
        button.addEventListener("click",()=>{
          const start=editorArea.selectionStart,end=editorArea.selectionEnd;
          editorArea.setRangeText(snippet,start,end,"end");
          editorArea.dispatchEvent(new Event("input",{bubbles:true}));
        });
        buttons.append(button);
      });
      const newline=document.createElement("button");
      newline.type="button";
      newline.textContent="줄바꿈";
      newline.addEventListener("click",()=>{
        editorArea.setRangeText("\n",editorArea.selectionStart,editorArea.selectionEnd,"end");
        editorArea.dispatchEvent(new Event("input",{bubbles:true}));
      });
      buttons.append(newline);
      panel.append(buttons);
      editorArea.before(panel);
    }
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
        if(!r.attempts)r.firstAttemptPassed=passed;
        r.attempts=(r.attempts||0)+1;r.lastPassed=passed;r.lastFailed=result.results.filter(x=>!x.pass).map(x=>x.label);r.draft=code;
        if(passed){r.passed=true;if(!runAssisted)r.independentPassed=true;r.lastPassedWithHelp=runAssisted}
        save();refreshProgress();
      }
      document.getElementById("run-status").textContent=mode==="example"?(passed?"예제 실행을 마쳤습니다. 예상 출력과 비교하세요.":"예제 실행 중 오류가 발생했습니다."):(passed?(runAssisted?"모든 기준 통과 · 도움을 사용한 학습으로 기록했습니다.":"모든 기준 통과 · 도움 없이 적용한 결과로 기록했습니다."):"일부 기준을 통과하지 못했습니다. 실패 이유를 확인하고 다시 작성하세요.");
      document.getElementById("run-results").innerHTML=`<ul class="results">${result.results.map((x,i)=>`<li class="${x.pass?"result-pass":"result-fail"}">${x.pass?"✓ 통과":"× 재시도"} · ${escape(x.label)}${x.pass?"":`<p>${escape(mode==="grade"?unit.task.tests[i].feedback:diagnosis(x))}</p><p>${escape(diagnosis(x))}</p><details><summary>오류 위치 확인</summary><pre>${escape(x.trace||x.error||x.errorType)}</pre></details>`}</li>`).join("")}</ul>${result.output?`<h4>실제 출력 · 최대 20,000자</h4><pre>${escape(result.output)}</pre>`:""}<div class="chart-output">${(result.images||[]).map(png=>`<img src="data:image/png;base64,${png}" alt="내 코드에서 생성한 차트. 데이터와 축 레이블은 위 코드 및 평가 기준과 함께 확인하세요.">`).join("")}</div>`;
      // Show the next learning action next to the submitted feedback, not only inside the tools sheet.
      if(mode==="grade"&&passed){
        const nextIndex=data.units.findIndex(candidate=>candidate.id===unit.id)+1;
        const upcoming=data.units[nextIndex];
        const destination=unit.id==="function-slots"&&stage==="practice"
          ?{hash:"#function-slots/challenge",label:"다음 문제 · 도전"}
          :upcoming?{hash:"#"+upcoming.id,label:"다음 문제 · "+upcoming.title}:null;
        if(destination){
          const link=document.createElement("a");
          link.className="primary practice-next-action";
          link.href=destination.hash;
          link.textContent=destination.label;
          document.getElementById("run-results").append(link);
        }
      }
    };
    worker.postMessage({code,tests:mode==="grade"?unit.task.tests:[]});
  }
  // Read-only entry hub: learning records remain untouched until the learner opens a unit.
  function renderOverview(){
    stop();
    const savedValues=progress.values?.valuesPath;
    const hasValues=!!(window.MeowValuesPath?.valid(savedValues));
    const valuesCompleted=hasValues&&savedValues.complete===true;
    const other=data.units.find(u=>u.id!=="values"&&(typeof progress[u.id]?.draft==="string"||progress[u.id]?.attempts||typeof progress[u.id+":practice"]?.draft==="string"));
    const legacyValues=typeof progress.values?.draft==="string"||progress.values?.attempts||progress.values?.passed;
    const hasHistory=!!(hasValues||legacyValues||other);
    const resume=hasValues?{hash:"#values",title:valuesCompleted?"문자에서 계산으로 · 학습 완료":"문자에서 계산으로 · Lv."+savedValues.level}
      :legacyValues?{hash:"#values/challenge",title:"문자에서 계산으로 · 기존 코드 이어하기"}
      :other?{hash:"#"+other.id+(other.id==="function-slots"&&typeof progress["function-slots:practice"]?.draft==="string"?"/practice":""),title:other.title}
      :{hash:"#values",title:"문자에서 계산으로 · 처음부터"};
    const stages=[
      {title:"이해",description:"개념과 실행 예제를 살펴봐요",hash:"#function-slots/understand"},
      {title:"연습",description:"함수 코드를 직접 완성하고 피드백을 받아요",hash:"#function-slots/practice"},
      {title:"응용",description:"새로운 입력과 실전 문제에 도전해요",hash:"#function-slots/challenge"}
    ];
    root.innerHTML='<section class="deepen-hub" aria-label="심화 학습 시작">'
      +'<p class="deepen-hub-kicker">PYTHON · 심화 학습</p><h2 id="unit-title" tabindex="-1">이해하고, 직접 풀고, 응용해요</h2>'
      +'<p class="deepen-hub-intro">개념부터 코딩까지 내 속도로 학습해요. 각 화면에서는 한 문제에 집중하고 채점 후 다음으로 이동할 수 있어요.</p>'
      +'<section class="deepen-resume"><h3>'+(valuesCompleted?'학습 완료 · 복습 확인':hasHistory?'이어서 학습하기':'첫 심화 학습 시작')+'</h3><p>'+escape(resume.title)+'</p><a class="primary" href="'+resume.hash+'">'+(valuesCompleted?'복습 시점 확인':hasHistory?'학습 이어하기':'학습 시작하기')+'</a></section>'
      +'<p class="deepen-stage-caption">함수 심화 · 이해 → 연습 → 응용</p><nav class="deepen-stage-list" aria-label="함수 심화 학습 방식">'+stages.map((s,i)=>'<a href="'+s.hash+'"><span class="deepen-stage-number">0'+(i+1)+'</span><span><strong>'+s.title+'</strong><small>'+s.description+'</small></span><span aria-hidden="true">›</span></a>').join('')+'</nav>'
      +'<details class="deepen-unit-list"><summary>모든 심화 단원 보기 · '+data.units.length+'개</summary><nav aria-label="심화 단원 목록">'+data.units.map(u=>'<a href="#'+encodeURIComponent(u.id)+'">'+escape(u.title)+'</a>').join('')+'</nav></details></section>';
  }
  try{
    const response=await fetch("/assets/python-lab-content.json?v=2");if(!response.ok)throw new Error("학습 내용 응답 "+response.status);
    data=await response.json();if(data.version!==1||!Array.isArray(data.units)||!data.units.length)throw new Error("지원하지 않는 학습 내용 형식");
    function route(focus){if(!location.hash&&new URLSearchParams(location.search).get("view")==="overview"){renderOverview();if(focus){document.getElementById("unit-title")?.focus();window.scrollTo(0,0);}return;}const [id,step]=location.hash.slice(1).split("/");pathStep=step||"";const source=data.units.find(u=>u.id===id)||data.units[0];stage=["understand","practice","challenge"].includes(step)?step:"understand";unit=source.id==="function-slots"&&stage==="practice"?{...source,task:source.practiceTask}:source;render();if(focus){document.getElementById("unit-title").setAttribute("tabindex","-1");document.getElementById("unit-title").focus();window.scrollTo(0,0)}}
    window.addEventListener("hashchange",()=>route(true));window.addEventListener("pagehide",()=>stop());route(false);
  }catch(error){root.innerHTML=`<div class="error-panel" role="alert"><h1>학습 내용을 열지 못했습니다</h1><p>${escape(error.message)}</p><a href="/python-lab.html">다시 시도</a> · <a href="/">먀오드 홈으로</a></div>`}
})();

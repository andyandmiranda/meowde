(function applyMeowdeV413LessonUX(){
  function contextFor(exercise){
    if(typeof meowdeExerciseContext==='function')return meowdeExerciseContext(exercise);
    const lessonIndex=Math.max(0,Math.min(Number(S.lessonIndex)||0,lessons().length-1));
    return {lessonIndex,lesson:lessons()[lessonIndex]||null,exercise:exercise||null};
  }

  function lessonOutcome(){
    if(!S.checked)return 'idle';
    return S.correct?'correct':'wrong';
  }

  function coachModeStyle(exercise){
    const api=window.MeowCoachMode;
    const mode=api&&typeof api.current==='function'?api.current():null;
    const id=mode&&mode.id||'focus';
    const ko=S.lang==='ko';
    const styles={
      focus:{id:'focus',kind:'focus',helper:'',hint:ko?'힌트 보기':'Show hint',concept:t('conceptCoach'),feedback:''},
      dance:{id:'dance',kind:'dance',helper:ko?'리듬 타듯 한 줄씩 봐요 🎵':'Take it one line at a time 🎵',hint:ko?'힌트 살짝 보기':'Peek at a hint',concept:ko?'한 줄씩 리듬 타듯 읽어봐요 🎵':'Read it one line at a time 🎵',feedback:ko?'리듬 체크':'Rhythm check'},
      study:{id:'study',kind:'study',helper:ko?'핵심 개념을 먼저 찾아봐요 📚':'Find the key concept first 📚',hint:ko?'개념 힌트 보기':'Show concept hint',concept:ko?'핵심 개념부터 천천히 읽어봐요 📚':'Start with the key concept and read slowly 📚',feedback:ko?'핵심':'Key point'},
      cheer:{id:'cheer',kind:'cheer',helper:ko?'정답보다 한 번 시도하는 게 먼저예요 ✨':'Trying once matters more than being perfect ✨',hint:ko?'도움 받기':'Get a little help',concept:ko?'완벽히 외우지 않아도 돼요. 먼저 읽어봐요 ✨':'You do not need to memorize it perfectly. Start by reading ✨',feedback:ko?'좋아요':'Nice'},
      challenge:{id:'challenge',kind:'challenge',helper:ko?'먼저 힌트 없이 풀어봐요 🔥':'Try it without a hint first 🔥',hint:ko?'그래도 힌트 보기':'Show hint anyway',concept:ko?'예제를 보고 규칙을 직접 찾아봐요 🔥':'Look at the example and find the rule yourself 🔥',feedback:ko?'정답 확인':'Answer check'},
      debug:{id:'debug',kind:'debug',helper:ko?(exercise&&['bughunt','write'].includes(exercise.type)?'입력 → 실행 → 오류 지점을 추적해봐요 🐞':'값이 어디서 바뀌는지 추적해봐요 🐞'):(exercise&&['bughunt','write'].includes(exercise.type)?'Trace input → run → failure point 🐞':'Track where the value changes 🐞'),hint:ko?'디버그 힌트 보기':'Show debug hint',concept:ko?'코드가 왜 이렇게 동작하는지 원인을 따라가봐요 🐞':'Trace why the code behaves this way 🐞',feedback:ko?'원인':'Cause'}
    };
    return styles[id]||styles.focus;
  }

  function auxiliaryMarkup(exercise){
    const style=coachModeStyle(exercise);
    const learning=window.MeowLearning;
    const learningLabel=learning&&typeof learning.auxiliaryLabel==='function'?learning.auxiliaryLabel(exercise):null;
    let label=null;
    if(style.id==='focus')label=learningLabel;
    else if(['dance','cheer','challenge'].includes(style.id)&&style.helper)label={kind:`coach-${style.kind}`,text:style.helper};
    else label=learningLabel||(style.helper?{kind:`coach-${style.kind}`,text:style.helper}:null);
    if(!label)return '';
    return `<div class="v433-meta" data-coach-style="${esc(style.id)}"><span class="v433-chip ${esc(label.kind||'')}">${esc(label.text||'')}</span></div>`;
  }

  const beginnerHintSteps={"ko":{"if-gate-w":"조건식 끝에 콜론(:)을 붙이고 다음 줄은 공백 네 칸을 들여쓰세요. 거짓 조건이라면 그 줄은 실행되지 않아요.","if-gate-b":"조건문 끝의 콜론(:)을 먼저 확인하고, 실행할 줄의 들여쓰기도 확인하세요.","list-garden-b":"원소 개수를 세고 유효한 위치를 0부터 적어 보세요. 원소가 두 개라면 0과 1만 있어요.","list-garden-w":"리스트의 값을 왼쪽부터 0, 1, 2로 번호 매긴 후 출력할 값의 위치를 골라 보세요.","index-tower-b":"마지막으로 사용할 수 있는 인덱스는 원소 개수에서 1을 뺀 값이에요.","index-tower-w":"코드를 복사하기보다 새 리스트의 각 값에 0부터 번호를 붙여 목표 값을 찾아보세요.","append-dock-b":"append() 호출 전후의 리스트를 써 보세요. 맨 뒤에 원소 한 개가 추가돼요.","append-dock-w":"이미 snacks = ["milk"]가 준비되어 있어요. 여기에 append("churu")로 새 값을 추가한 다음, 두 번째 원소의 인덱스 1을 사용해 출력해 보세요."},"en":{"if-gate-w":"End the condition with a colon, then indent the next statement four spaces. A false condition skips that statement.","if-gate-b":"Check the colon at the end of the if line, then inspect the indentation of its body.","list-garden-b":"Count the elements and label valid positions starting at zero. Two elements have only indices 0 and 1.","list-garden-w":"Label the elements 0, 1, 2 from left to right, then select the requested position.","index-tower-b":"The last valid index is one less than the number of elements.","index-tower-w":"Label each element of the new list from zero instead of copying the previous code.","append-dock-b":"Trace the list before and after append; one element is added to the end.","append-dock-w":"The starter already provides snacks = ["milk"]. Append "churu" to that list, then use index 1 to print the second element."}};
  function hintControl(exercise){
    if(S.hint){const extra=beginnerHintSteps[S.lang==='en'?'en':'ko'][exercise.id];return '<div class="hint">'+esc(exercise.hint)+(extra?'<p data-hint-step>'+esc(extra)+'</p>':'')+'</div>';};
    const style=coachModeStyle(exercise);
    return `<button class="hint" data-coach-hint="${esc(style.id)}" onclick="S.hint=true;save();renderLesson()">${esc(style.hint||t('hint'))}</button>`;
  }

  function inputValue(exercise){
    if(!exercise||!exercise.stdin)return '';
    const fallback=String(exercise.stdin.default||'');
    if(S.stdinExerciseId!==exercise.id){
      S.stdinExerciseId=exercise.id||'';
      S.stdinValue=fallback;
      save();
    }else if(typeof S.stdinValue!=='string'){
      S.stdinValue=fallback;
      save();
    }
    return S.stdinValue;
  }

  function inputControl(exercise){
    if(!exercise||!exercise.stdin)return '';
    const value=inputValue(exercise);
    const label=S.lang==='ko'?(exercise.stdin.labelKo||'프로그램 입력값'):(exercise.stdin.labelEn||'Program input');
    const help=S.lang==='ko'?'이 값이 Python의 input()으로 전달돼요.':'This value is sent to Python input().';
    return `<label class="program-input"><span><b>${esc(label)}</b><small>${esc(help)}</small></span><input id="program-stdin" type="text" value="${esc(value)}" autocomplete="off" autocapitalize="off" spellcheck="false" oninput="S.stdinExerciseId='${esc(exercise.id||'')}';S.stdinValue=this.value;save()"></label>`;
  }

  function reactionMarkup(){
    if(!S.checked)return '';
    const humor=window.MeowHumor;
    if(!humor||typeof humor.line!=='function')return '';
    const text=humor.line();
    return text?`<div class="v432-reaction">${esc(text)}</div>`:'';
  }

  function feedbackExplanation(exercise){
    const style=coachModeStyle(exercise);
    const prefix=style.feedback?`<strong class="v443-feedback-prefix">${esc(style.feedback)}:</strong> `:'';
    return `${prefix}${esc(exercise.explain)} ${!S.correct?t('tryAgain'):''}`;
  }

  function diagnosticMarkup(exercise){
    const api=window.MeowDiagnosticFeedback;
    const diagnosis=api&&typeof api.diagnose==='function'?api.diagnose(exercise):null;
    if(!diagnosis)return `<p>${feedbackExplanation(exercise)}</p>`;
    const labels=typeof api.labels==='function'?api.labels():{cause:'Cause',reason:'Why',action:'Next'};
    const row=(label,value)=>value?`<div class="v457-diagnostic-row"><b>${esc(label)}</b><span>${esc(value)}</span></div>`:'';
    return `<div class="v457-diagnostic" data-diagnostic-kind="${esc(diagnosis.kind||'general')}">${row(labels.cause,diagnosis.cause)}${row(labels.reason,diagnosis.reason)}${row(labels.action,diagnosis.action)}</div>`;
  }

  // Presentation-only prerequisite coaching: preserve the effective curriculum and saved exercise snapshots.
  const beginnerGuides={
  "ko": {
    "if-gate": "if는 '만약 ~라면'이라는 질문이에요. 조건이 True일 때만 아래 줄이 실행돼요. 조건 끝에는 : 를 쓰고, 실행할 줄 앞에는 공백 4개를 넣어 들여써요. 들여쓰기는 모양이 아니라 파이썬 문법이에요. False이고 else가 없으면 해당 줄은 실행하지 않아요.",
    "list-garden": "리스트는 관련된 값 여러 개를 [ ] 안에 쉼표로 나눠 순서대로 보관해요. items = [\"키보드\", \"마우스\", \"노트북\"]라면 위치 0은 키보드, 1은 마우스, 2는 노트북이에요. items[0]처럼 대괄호 안의 위치 번호(인덱스)로 값을 꺼내요. 값이 세 개면 유효한 위치는 0부터 2까지이고 items[3]은 IndexError예요.",
    "index-tower": "리스트의 인덱스는 값 자체가 아니라 값이 놓인 위치 번호예요. pets = [\"cat\", \"dog\", \"bird\"]라면 pets[0]은 cat, pets[1]은 dog, pets[2]는 bird예요. 세 개의 값에 대해 pets[3]을 요청하면 존재하지 않는 위치라 IndexError가 발생해요.",
    "append-dock": "append(값)는 기존 리스트의 맨 끝에 값 하나를 추가해요. 예를 들어 snacks = []는 빈 리스트이고, snacks.append(\"milk\") 실행 후 snacks는 [\"milk\"]가 돼요. 이어서 snacks.append(\"cat\") 하면 [\"milk\", \"cat\"]이 돼요. append()는 리스트 자체를 바꾸므로 다시 대입하지 않아도 돼요. len(리스트)는 원소 개수를 돌려줘요. 한 개를 추가한 후 len(snacks)는 1이고, 두 개를 추가한 뒤에는 2예요."
  },
  "en": {
    "if-gate": "if means 'only when this condition holds.' A True condition runs the next indented block; False skips it when there is no else. End the condition with a colon (:), then indent the body by four spaces. Indentation is Python syntax, not decoration.",
    "list-garden": "A list stores ordered values between [ ] separated by commas. For items = [\"keyboard\", \"mouse\", \"laptop\"], index 0 is keyboard, index 1 is mouse, and index 2 is laptop. Use items[0] to retrieve a value. With three elements, valid indices are 0 through 2; items[3] raises IndexError.",
    "index-tower": "An index is a position, not the element itself. For pets = [\"cat\", \"dog\", \"bird\"], pets[0] returns cat, pets[1] returns dog, and pets[2] returns bird. pets[3] raises IndexError because a fourth element does not exist.",
    "append-dock": "append(value) adds one item to the end of the existing list. For example, snacks = [] starts empty; after snacks.append(\"milk\"), snacks is [\"milk\"]. After snacks.append(\"cat\"), it is [\"milk\", \"cat\"]. append() changes the list in place; you do not need to assign its result. len(list) returns the number of items. After one append, len(snacks) is 1; after two, it is 2."
  }
};
  function beginnerExplanation(lesson,concept){
    return beginnerGuides[S.lang==='en'?'en':'ko'][lesson.slug]||concept.body;
  }

  renderLesson=function(){
    if(!hasLessonProgress())return renderHome();
    S.screen='lesson';
    save();
    const ex=cur();
    const context=contextFor(ex);
    const lessonIndex=context.lessonIndex;
    const L=context.lesson||lessons()[S.lessonIndex]||lessons()[0];
    const step=Math.min(S.idx+1,S.queue.length);
    const pct=Math.round(step/Math.max(1,S.queue.length)*100);
    const qcode=`${String(lessonIndex+1).padStart(2,'0')}-${String(step).padStart(2,'0')} · ${ex.id||'concept'}`;
    const coachStyle=coachModeStyle(ex);
    let body='';
    let qhead='';
    if(ex.type!=='concept'){
      qhead=`<div class="coach" data-lesson-outcome="${lessonOutcome()}" data-coach-style="${esc(coachStyle.id)}">${catSVG(S.cat,S.checked?(S.correct?'happy':'oops'):'focus',62)}<div class="bubble"><div style="font-size:10.5px;font-weight:950;letter-spacing:.08em;color:var(--muted);margin-bottom:7px;text-transform:uppercase">Q ${esc(qcode)}</div><div class="prompt">${esc(ex.prompt)}</div>${hintControl(ex)}${auxiliaryMarkup(ex)}</div></div>`;
    }
    if(ex.type==='concept'){
      qhead=`<div class="coach" data-lesson-outcome="idle" data-coach-style="${esc(coachStyle.id)}">${catSVG(S.cat,'idle',62)}<div class="bubble"><div class="prompt">${esc(coachStyle.concept||t('conceptCoach'))}</div></div></div>`;
      body=`<div class="card"><div class="pill" style="display:inline-flex;margin-bottom:10px">Q ${esc(qcode)}</div><h3>${esc(ex.title)}</h3><p style="font-size:14px;color:var(--muted);line-height:1.6;margin:8px 0 12px">${esc(beginnerExplanation(L,ex))}</p><div class="code">${esc(ex.code)}</div></div>`;
    }else if(ex.type==='predict'){
      body=`<div class="code">${esc(ex.code)}</div><div class="choices">${ex.choices.map((choice,index)=>`<button class="choice ${S.sel===index?'sel':''} ${S.checked&&index===ex.answer?'right':''} ${S.checked&&S.sel===index&&index!==ex.answer?'wrong':''}" onclick="S.sel=${index};save();renderLesson()">${esc(choice)}</button>`).join('')}</div>${S.checked&&S.correct?`<div class="console">${esc(ex.output)}</div>`:''}`;
    }else if(ex.type==='fill'){
      body=`<div class="card fillcode">${esc(ex.code).replace('____',`<span class="blank ${S.fill?'filled':''}">${S.fill?esc(S.fill):''}</span>`)}</div><div class="tokens">${ex.tokens.map((token,index)=>`<button class="token ${S.fill===token?'used':''}" onclick="chooseFill(${index})">${esc(token)}</button>`).join('')}</div>`;
    }else if(ex.type==='bughunt'){
      body=`<div class="lines">${ex.lines.map((line,index)=>`<button class="linebtn ${S.sel===index?'sel':''} ${S.checked&&index===ex.buggy?'right':''}" onclick="S.sel=${index};save();renderLesson()">${index+1}. ${esc(line)}</button>`).join('')}</div>${S.checked?`<div class="fix">${S.lang==='ko'?'수정 코드':'Fixed code'}: ${esc(ex.fixed)}</div>`:''}`;
    }else if(ex.type==='write'){
      const initial=S.write||ex.starter;
      body=`${inputControl(ex)}<textarea id="code-editor" class="codearea" spellcheck="false" autocapitalize="off" autocomplete="off" oninput="S.write=this.value;save()">${esc(initial)}</textarea><div class="code-toolbar" aria-label="${S.lang==='ko'?'코딩 보조키':'Coding helper keys'}"><button class="code-key wide" onclick="insertCodeToken('TAB')">Tab</button><button class="code-key" onclick="insertCodeToken('()')">( )</button><button class="code-key" onclick="insertCodeToken('[]')">[ ]</button><button class="code-key" onclick="insertCodeToken(':')">:</button><button class="code-key" onclick="insertCodeToken('=')">=</button><button class="code-key" onclick="insertCodeToken('_')">_</button><button class="code-key" onclick="insertCodeToken(String.fromCharCode(34,34))">&quot; &quot;</button><button class="code-key" onclick="insertCodeToken(String.fromCharCode(39,39))">' '</button></div><div class="pill" style="margin-top:10px">${esc(ex.testcase)}</div>${S.output?`<div class="console">${esc(S.output)}</div>`:''}`;
    }
    // Keep prerequisite teaching within the active lesson instead of sending beginners to another page.
    const concept=L.exercises&&L.exercises.find(item=>item.type==='concept'&&item.body&&item.code);
    const conceptHelp=ex.type!=='concept'&&concept
      ?`<details class="card" data-inline-concept><summary>${S.lang==='ko'?'개념·예제 다시 보기':'Review concept and example'}</summary><h3>${esc(concept.title||L.title)}</h3><p>${esc(beginnerExplanation(L,concept))}</p><div class="code">${esc(concept.code)}</div></details>`
      :'';
    // Explain wrong answers on demand without erasing the original miss or overriding grading.
    const correctExample=ex.type==='predict'&&Array.isArray(ex.choices)?ex.choices[ex.answer]
      :ex.type==='fill'?ex.code.replace('____',String(ex.answer))
      :ex.type==='bughunt'?ex.fixed
      :ex.type==='write'?ex.model:'';
    const answerReview=S.checked&&!S.correct&&correctExample
      ?`<details class="card" data-answer-review><summary>${S.lang==='ko'?'정답 예시와 이유 확인':'See a correct example and why'}</summary><pre class="code">${esc(correctExample)}</pre><p>${esc(ex.explain||'')}</p></details>`
      :'';
    const can=ex.type==='concept'||S.checked||S.loading?true:(ex.type==='predict'||ex.type==='bughunt'?S.sel!==null:ex.type==='fill'?Boolean(S.fill):true);
    const foot=ex.type==='concept'
      ?`<div class="lesson-foot"><button class="btn" onclick="nextQ()">${t('got')}</button></div>`
      :S.checked
        ?`<div class="feedback ${S.correct?'ok':'no'}"><h3>${S.correct?t('correct'):t('wrong')}</h3>${reactionMarkup()}${S.correct?`<p>${feedbackExplanation(ex)}</p>`:diagnosticMarkup(ex)}<button class="btn" onclick="nextQ()">${t('continue')}</button></div>`
        :`<div class="lesson-foot"><button class="btn" ${!can||S.loading?'disabled':''} onclick="checkQ()">${ex.type==='write'?(S.loading?t('pyLoading'):(S.lang==='ko'?'코드 실행':'Run code')):t('check')}</button></div>`;
    const modeLabel=typeof meowdeMode==='function'&&meowdeMode()==='smart-review'?(S.lang==='ko'?'Smart Review':'Smart Review'):'';
    app.innerHTML=`<div class="screen"><div class="lesson-bg"></div><div class="lesson-top"><button class="close" aria-label="${S.lang==='ko'?'나가기':'Exit'}" onclick="renderHome()"></button><div class="lesson-title"><b>${modeLabel?`${esc(modeLabel)} · `:''}${esc(L.title)}</b><div class="progress"><span style="width:${pct}%"></span></div></div><div class="lesson-meta"><span class="autosave">${S.lang==='ko'?'자동 저장':'Saved'}</span><span class="pill">${step}/${S.queue.length}</span></div></div><div class="scroll"><main class="lesson-main">${qhead}${conceptHelp}${body}${answerReview}</main></div>${foot}</div>`;
    document.documentElement.dataset.lessonRenderer='canonical-v413';
    document.documentElement.dataset.lessonCoachStyle=coachStyle.id;
  };

  overlay=function(html){
    const backdrop=document.createElement('div');
    backdrop.className='sheet';
    backdrop.id='overlay';
    backdrop.innerHTML=`<div class="panel"><button class="panel-close" aria-label="Close" onclick="closeOverlay()">×</button>${html}</div>`;
    backdrop.addEventListener('click',event=>{if(event.target===backdrop)closeOverlay()});
    app.appendChild(backdrop);
  };

  langSheet=function(){
    const description=S.lang==='ko'?'학습 언어를 선택하세요. 진도는 그대로 유지됩니다.':'Choose the lesson language. Your progress stays saved.';
    overlay(`<h3>${t('chooseLang')}</h3><p>${description}</p><div class="grid2"><button class="btn" onclick="S.lang='ko';save();closeOverlay();renderHome()">한국어</button><button class="btn ghost" onclick="S.lang='en';save();closeOverlay();renderHome()">English</button></div>`);
  };

  window.MeowCoachLessonStyle=Object.freeze({current:coachModeStyle});
  document.title='Meowde v4.13 — Mobile UX Refresh';
  window.__MEOWDE_VERSION__='4.13-coach-learning-styles';
  if(S.screen==='lesson'&&hasLessonProgress())renderLesson();
  else renderHome();
})();

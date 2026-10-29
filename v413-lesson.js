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

  const beginnerHintSteps={"ko":{"if-gate-w":"조건식 끝에 콜론(:)을 붙이고 다음 줄은 공백 네 칸을 들여쓰세요. 거짓 조건이라면 그 줄은 실행되지 않아요.","if-gate-b":"조건문 끝의 콜론(:)을 먼저 확인하고, 실행할 줄의 들여쓰기도 확인하세요.","list-garden-b":"원소 개수를 세고 유효한 위치를 0부터 적어 보세요. 원소가 두 개라면 0과 1만 있어요.","list-garden-w":"리스트의 값을 왼쪽부터 0, 1, 2로 번호 매긴 후 출력할 값의 위치를 골라 보세요.","index-tower-b":"인덱스 1은 이미 올바르게 지정되어 있어요. print 다음의 여는 괄호와 닫는 괄호가 짝인지 확인하세요.","index-tower-w":"시작 코드에는 리스트가 없으므로 pets = [\"cat\", \"dog\", \"bird\"]부터 작성해야 해요. 인덱스 1은 dog이고 bird를 출력하려면 인덱스 2가 필요해요.","append-dock-b":"append()로 milk를 추가하는 줄은 올바르게 작성되어 있어요. 마지막 print 줄의 괄호 짝을 확인하세요.","append-dock-w":"먼저 snacks = []로 빈 리스트를 만들고, snacks.append(\"churu\")로 값을 추가하세요. 첫 번째 원소의 인덱스 0을 출력하면 돼요."},"en":{"if-gate-w":"End the condition with a colon, then indent the next statement four spaces. A false condition skips that statement.","if-gate-b":"Check the colon at the end of the if line, then inspect the indentation of its body.","list-garden-b":"Count the elements and label valid positions starting at zero. Two elements have only indices 0 and 1.","list-garden-w":"Label the elements 0, 1, 2 from left to right, then select the requested position.","index-tower-b":"Index 1 is already correct. Check that print has matching opening and closing parentheses.","index-tower-w":"The starter does not define a list. First create pets = [\"cat\", \"dog\", \"bird\"]. Index 1 selects dog; index 2 selects bird.","append-dock-b":"The append line already adds milk correctly. Check the matching parentheses on the final print line.","append-dock-w":"First create an empty list with snacks = [], then add the value using snacks.append(\"churu\"). Print the first element at index 0."}};
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
  // Additional worked reasoning for concepts whose original intro is too short for a coding task.
  // Append rather than replace current effective curriculum explanations (including unit 4-6 patches).
  const teachingNotes={
    ko:{
      "loop-hill":"for 변수 in 리스트: 는 리스트 안 값을 하나씩 변수에 넣고 들여쓴 코드를 실행해요. 반복이 세 번이면 본문도 세 번 실행돼요. 반복이 끝나면 아래의 들여쓰지 않은 코드로 이어져요. 예: for color in [\"red\", \"blue\"]: 아래에서 print(color)를 들여쓰면 각 색이 한 줄씩 나와요.",
      "range-rail":"range(3)은 0, 1, 2를 만들고 3은 포함하지 않아요. range(1, 4)는 1, 2, 3을 만들어요. for n in range(1, 4): 아래에서 print(n)을 들여쓰면 세 줄이 출력돼요. 시작값 포함, 끝값 제외를 먼저 손으로 세어 본 뒤 문제를 풀어 보세요.",
      "while-cave":"while은 조건을 검사해 True이면 들여쓴 코드를 실행하고 다시 조건을 검사해요. count=0, while count<3: 에서 반복 안의 count += 1이 빠지면 끝나지 않을 수 있어요. break는 즉시 반복을 끝내고 continue는 이번 회차의 남은 부분만 건너뛰어요. 실행 전 종료 조건부터 확인하세요.",
      "function-house":"def meow(): 다음 들여쓴 줄은 함수의 몸통이에요. 함수를 정의하는 것만으로는 몸통이 실행되지 않아요. 이후 meow()처럼 괄호를 붙여 호출해야 실행돼요. 함수 이름·콜론·들여쓰기·호출을 순서대로 확인하세요.",
      "parameter-mail":"def welcome(name): 의 name은 매개변수, welcome(\"Amy\")의 \"Amy\"는 전달한 값이에요. 함수가 호출되면 name에 \"Amy\"가 들어간 상태로 함수 안 코드를 실행해요. 함수 안에서 사용하는 이름과 호출할 때 전달하는 값이 연결되는지 먼저 추적해 보세요.",
      "return-spring":"print()는 화면에 보여주지만 return은 함수의 결과를 호출한 위치로 돌려줘요. def double(n): return n*2 라면 double(3)의 결과는 6이에요. 이 값으로 다시 계산하려면 result=double(3)처럼 받아 쓸 수 있어요. 함수의 반환값과 출력값을 혼동하지 마세요.",
      "mini-project":"여러 개념을 한꺼번에 쓰는 문제는 작은 부분으로 나눠요. 입력 데이터 준비 → 조건 판단 → 반복 적용 → 출력 확인 순서로 쪼개고, 각 부분이 먼저 작동하는지 살펴보세요. 함수나 리스트를 사용할 때는 앞에서 배운 예제의 역할을 하나씩 다시 연결해 보세요.",
      "boss-bug":"디버깅에서는 오류 메시지만 보지 말고 변수 값, 조건의 참·거짓, 반복 횟수, 함수 반환값을 차례로 확인해요. 먼저 예상 출력을 적고 실제 코드의 흐름을 비교해 달라지는 첫 줄을 찾아요. 한 줄씩 고친 뒤 같은 입력과 다른 입력으로 다시 점검하세요."
    },
    en:{
      "loop-hill":"A for loop takes one item at a time from a list and runs the indented body. For color in [\"red\", \"blue\"], printing color inside the loop produces two lines. After the loop, execution resumes outside the indentation.",
      "range-rail":"range(3) produces 0, 1, 2, not 3. range(1, 4) produces 1, 2, 3. The starting value is included and the stop value excluded. Count the iterations by hand before running the code.",
      "while-cave":"A while loop checks its condition before each iteration. Something inside the loop must make it false or a break must exit. break leaves the loop; continue skips the remaining work in the current iteration.",
      "function-house":"def meow(): defines a function with an indented body. Defining it does not run it. Call meow() to execute the body. Check the name, colon, indentation and function call.",
      "parameter-mail":"In def welcome(name), name is the parameter. In welcome(\"Amy\"), Amy is the argument. During the call, the function body uses the supplied value through the parameter.",
      "return-spring":"print displays a value; return sends a value back to the caller. If double(n) returns n*2, double(3) evaluates to 6. You can store that result in a variable or use it in another expression.",
      "mini-project":"Break a combined task into steps: prepare data, check conditions, repeat operations and inspect output. Test each step before putting everything together.",
      "boss-bug":"Trace variable values, condition results, loop counts and returned values. Find the first line where the actual execution differs from your prediction, then test the fix with more than one input."
    }
  };
  function beginnerExplanation(lesson,concept){
    const lang=S.lang==='en'?'en':'ko';
    const core=beginnerGuides[lang][lesson.slug]||concept.body;
    const note=teachingNotes[lang][lesson.slug];
    return note?core+' '+note:core;
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
      body=`<div class="card"><div class="pill" style="display:inline-flex;margin-bottom:10px">Q ${esc(qcode)}</div><h3>${esc(ex.title)}</h3><p style="font-size:14px;color:var(--muted);line-height:1.6;margin:8px 0 12px">${esc(beginnerExplanation(L,ex))}</p><div class="code">${esc(ex.code)}</div><div class="lesson-concept-check"><h4>${S.lang==='ko'?'문제를 풀기 전 확인':'Before the questions'}</h4><p>${S.lang==='ko'?'이 예제의 실행 순서와 출력이 왜 그렇게 되는지 먼저 설명해 보세요. 이해되지 않으면 예제를 다시 읽고 따라 해도 괜찮아요.':'Explain the execution order and output before continuing.'}</p></div></div>`;
    }else if(ex.type==='predict'){
      body=`<div class="code">${esc(ex.code)}</div><div class="choices">${ex.choices.map((choice,index)=>`<button class="choice ${S.sel===index?'sel':''} ${S.checked&&index===ex.answer?'right':''} ${S.checked&&S.sel===index&&index!==ex.answer?'wrong':''}" ${S.checked?'disabled':''} aria-pressed="${S.sel===index}" onclick="if(S.checked)return;S.sel=${index};save();checkQ()">${esc(choice)}</button>`).join('')}</div>${S.checked&&S.correct?`<div class="console">${esc(ex.output)}</div>`:''}`;
    }else if(ex.type==='fill'){
      body=`<div class="card fillcode">${esc(ex.code).replace('____',`<span class="blank ${S.fill?'filled':''}">${S.fill?esc(S.fill):''}</span>`)}</div><div class="tokens">${ex.tokens.map((token,index)=>`<button class="token ${S.fill===token?'used':''}" onclick="chooseFill(${index})">${esc(token)}</button>`).join('')}</div>`;
    }else if(ex.type==='bughunt'){
      body=`<div class="lines">${ex.lines.map((line,index)=>`<button class="linebtn ${S.sel===index?'sel':''} ${S.checked&&index===ex.buggy?'right':''}" ${S.checked?'disabled':''} aria-pressed="${S.sel===index}" onclick="if(S.checked)return;S.sel=${index};save();checkQ()">${index+1}. ${esc(line)}</button>`).join('')}</div>${S.checked?`<div class="fix">${S.lang==='ko'?'수정 코드':'Fixed code'}: ${esc(ex.fixed)}</div>`:''}`;
    }else if(ex.type==='write'){
      const initial=S.write||ex.starter;
      body=`${inputControl(ex)}<textarea id="code-editor" class="codearea" spellcheck="false" autocapitalize="off" autocomplete="off" oninput="S.write=this.value;save()">${esc(initial)}</textarea><div class="code-toolbar" aria-label="${S.lang==='ko'?'코딩 보조키':'Coding helper keys'}"><button class="code-key wide" onclick="insertCodeToken('TAB')">Tab</button><button class="code-key" onclick="insertCodeToken('()')">( )</button><button class="code-key" onclick="insertCodeToken('[]')">[ ]</button><button class="code-key" onclick="insertCodeToken(':')">:</button><button class="code-key" onclick="insertCodeToken('=')">=</button><button class="code-key" onclick="insertCodeToken('_')">_</button><button class="code-key" onclick="insertCodeToken(String.fromCharCode(34,34))">&quot; &quot;</button><button class="code-key" onclick="insertCodeToken(String.fromCharCode(39,39))">' '</button></div><div class="pill" style="margin-top:10px">${esc(ex.testcase)}</div>${S.output?`<div class="console">${esc(S.output)}</div>`:''}`;
    }
    // Pedagogical bridge only. No saved state, completion, score or rewards are changed.
    const ko=S.lang!=='en';
    const solveSteps={
      predict:ko?['변수 값을 먼저 적어요.','코드를 위에서 아래로 실행하며 값이 어떻게 바뀌는지 따라가요.','출력과 선택지를 비교해요.']:['Write down variable values.','Trace each line in execution order.','Compare the output with the choices.'],
      fill:ko?['빈칸 앞뒤 문법을 살펴봐요.','개념 예제에서 같은 역할을 하는 표현을 찾아요.','완성한 코드를 다시 읽으며 확인해요.']:['Inspect the surrounding syntax.','Find the matching expression in the concept example.','Read the completed code to check it.'],
      bughunt:ko?['코드를 한 줄씩 읽으며 값을 추적해요.','배운 정상 문법·실행 순서와 다른 부분을 찾아요.','해당 줄을 수정해야 하는 이유를 설명해 봐요.']:['Trace every line.','Compare it with the taught syntax and behavior.','Explain why the changed line fixes the issue.'],
      write:ko?['입력과 기대 출력을 구분해요.','개념 예제를 참고해 가장 작은 코드부터 작성해요.','다른 입력에서도 되는지 점검해요.']:['Identify inputs and expected outputs.','Write the smallest version based on the example.','Check another input.']
    };
    const guidedSteps=solveSteps[ex.type]||[];
    // Keep prerequisite teaching within the active lesson instead of sending beginners to another page.
    const concept=L.exercises&&L.exercises.find(item=>item.type==='concept'&&item.body&&item.code);
    const conceptHelp=ex.type!=='concept'&&concept
      ?`<details class="card" data-inline-concept><summary>${ko?'이 문제에 필요한 개념·풀이 순서':'Concept and steps for this question'}</summary><h3>${esc(concept.title||L.title)}</h3><p>${esc(beginnerExplanation(L,concept))}</p><div class="code">${esc(concept.code)}</div><h4>${ko?'예제에서 문제로 연결하기':'Bridge from example to problem'}</h4><ol data-solving-steps>${guidedSteps.map(item=>`<li>${esc(item)}</li>`).join('')}</ol><p>${ko?'숫자나 변수 이름이 달라져도 배운 규칙은 같아요.':'Use the same rule when values or names change.'}</p></details>`
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
    app.innerHTML=`<div class="screen"><div class="lesson-bg"></div><div class="lesson-top"><button class="close" aria-label="${S.lang==='ko'?'나가기':'Exit'}" onclick="renderHome()"></button><div class="lesson-title"><b>${modeLabel?`${esc(modeLabel)} · `:''}${esc(L.title)}</b><div class="progress"><span style="width:${pct}%"></span></div></div><div class="lesson-meta"><span class="autosave">${S.lang==='ko'?'자동 저장':'Saved'}</span><span class="pill">${step}/${S.queue.length}</span></div></div><div class="scroll"><main class="lesson-main">${lessonSaveFailed?'<div class="feedback no lesson-save-warning" role="alert" tabindex="-1">학습 기록을 저장하지 못했어요. 현재 화면에서는 계속 풀 수 있지만 새로고침하면 답안이 사라질 수 있어요. <button class="btn" onclick="retryLessonSave()">저장 다시 시도</button></div>':''}${qhead}${body}${conceptHelp}${answerReview}</main></div>${foot}</div>`;
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

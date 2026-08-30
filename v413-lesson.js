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

  function hintControl(exercise){
    if(S.hint)return `<div class="hint">${esc(exercise.hint)}</div>`;
    const style=coachModeStyle(exercise);
    return `<button class="hint" data-coach-hint="${esc(style.id)}" onclick="S.hint=true;save();renderLesson()">${esc(style.hint||t('hint'))}</button>`;
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
      body=`<div class="card"><div class="pill" style="display:inline-flex;margin-bottom:10px">Q ${esc(qcode)}</div><h3>${esc(ex.title)}</h3><p style="font-size:14px;color:var(--muted);line-height:1.6;margin:8px 0 12px">${esc(ex.body)}</p><div class="code">${esc(ex.code)}</div></div>`;
    }else if(ex.type==='predict'){
      body=`<div class="code">${esc(ex.code)}</div><div class="choices">${ex.choices.map((choice,index)=>`<button class="choice ${S.sel===index?'sel':''} ${S.checked&&index===ex.answer?'right':''} ${S.checked&&S.sel===index&&index!==ex.answer?'wrong':''}" onclick="S.sel=${index};save();renderLesson()">${esc(choice)}</button>`).join('')}</div>${S.checked&&S.correct?`<div class="console">${esc(ex.output)}</div>`:''}`;
    }else if(ex.type==='fill'){
      body=`<div class="card fillcode">${esc(ex.code).replace('____',`<span class="blank ${S.fill?'filled':''}">${S.fill?esc(S.fill):''}</span>`)}</div><div class="tokens">${ex.tokens.map((token,index)=>`<button class="token ${S.fill===token?'used':''}" onclick="chooseFill(${index})">${esc(token)}</button>`).join('')}</div>`;
    }else if(ex.type==='bughunt'){
      body=`<div class="lines">${ex.lines.map((line,index)=>`<button class="linebtn ${S.sel===index?'sel':''} ${S.checked&&index===ex.buggy?'right':''}" onclick="S.sel=${index};save();renderLesson()">${index+1}. ${esc(line)}</button>`).join('')}</div>${S.checked?`<div class="fix">${S.lang==='ko'?'수정 코드':'Fixed code'}: ${esc(ex.fixed)}</div>`:''}`;
    }else if(ex.type==='write'){
      const initial=S.write||ex.starter;
      body=`<textarea id="code-editor" class="codearea" spellcheck="false" autocapitalize="off" autocomplete="off" oninput="S.write=this.value;save()">${esc(initial)}</textarea><div class="code-toolbar" aria-label="${S.lang==='ko'?'코딩 보조키':'Coding helper keys'}"><button class="code-key wide" onclick="insertCodeToken('TAB')">Tab</button><button class="code-key" onclick="insertCodeToken('()')">( )</button><button class="code-key" onclick="insertCodeToken('[]')">[ ]</button><button class="code-key" onclick="insertCodeToken(':')">:</button><button class="code-key" onclick="insertCodeToken('=')">=</button><button class="code-key" onclick="insertCodeToken('_')">_</button><button class="code-key" onclick="insertCodeToken(String.fromCharCode(34,34))">&quot; &quot;</button><button class="code-key" onclick="insertCodeToken(String.fromCharCode(39,39))">' '</button></div><div class="pill" style="margin-top:10px">${esc(ex.testcase)}</div>${S.output?`<div class="console">${esc(S.output)}</div>`:''}`;
    }
    const can=ex.type==='concept'||S.checked||S.loading?true:(ex.type==='predict'||ex.type==='bughunt'?S.sel!==null:ex.type==='fill'?Boolean(S.fill):true);
    const foot=ex.type==='concept'
      ?`<div class="lesson-foot"><button class="btn" onclick="nextQ()">${t('got')}</button></div>`
      :S.checked
        ?`<div class="feedback ${S.correct?'ok':'no'}"><h3>${S.correct?t('correct'):t('wrong')}</h3>${reactionMarkup()}<p>${feedbackExplanation(ex)}</p><button class="btn" onclick="nextQ()">${t('continue')}</button></div>`
        :`<div class="lesson-foot"><button class="btn" ${!can?'disabled':''} onclick="checkQ()">${ex.type==='write'?(S.loading?t('pyLoading'):(S.lang==='ko'?'코드 실행':'Run code')):t('check')}</button></div>`;
    const modeLabel=typeof meowdeMode==='function'&&meowdeMode()==='smart-review'?(S.lang==='ko'?'Smart Review':'Smart Review'):'';
    app.innerHTML=`<div class="screen"><div class="lesson-bg"></div><div class="lesson-top"><button class="close" aria-label="${S.lang==='ko'?'나가기':'Exit'}" onclick="renderHome()"></button><div class="lesson-title"><b>${modeLabel?`${esc(modeLabel)} · `:''}${esc(L.title)}</b><div class="progress"><span style="width:${pct}%"></span></div></div><div class="lesson-meta"><span class="autosave">${S.lang==='ko'?'자동 저장':'Saved'}</span><span class="pill">${step}/${S.queue.length}</span></div></div><div class="scroll"><main class="lesson-main">${qhead}${body}</main></div>${foot}</div>`;
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
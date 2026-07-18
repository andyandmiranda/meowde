(function applyMeowdeV413LessonUX(){
  renderLesson=function(){
    if(!hasLessonProgress())return renderHome();
    S.screen='lesson';
    save();
    const ex=cur();
    const L=lessons()[S.lessonIndex];
    const step=Math.min(S.idx+1,S.queue.length);
    const pct=Math.round(step/S.queue.length*100);
    const qcode=`${String(S.lessonIndex+1).padStart(2,'0')}-${String(step).padStart(2,'0')} · ${ex.id||'concept'}`;
    let body='';
    let qhead='';
    if(ex.type!=='concept'){
      qhead=`<div class="coach">${catSVG(S.cat,S.checked?(S.correct?'happy':'oops'):'focus',62)}<div class="bubble"><div style="font-size:10.5px;font-weight:950;letter-spacing:.08em;color:var(--muted);margin-bottom:7px;text-transform:uppercase">Q ${esc(qcode)}</div><div class="prompt">${esc(ex.prompt)}</div>${S.hint?`<div class="hint">${esc(ex.hint)}</div>`:`<button class="hint" onclick="S.hint=true;save();renderLesson()">${t('hint')}</button>`}</div></div>`;
    }
    if(ex.type==='concept'){
      qhead=`<div class="coach">${catSVG(S.cat,'idle',62)}<div class="bubble"><div class="prompt">${t('conceptCoach')}</div></div></div>`;
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
        ?`<div class="feedback ${S.correct?'ok':'no'}"><h3>${S.correct?t('correct'):t('wrong')}</h3><p>${esc(ex.explain)} ${!S.correct?t('tryAgain'):''}</p><button class="btn" onclick="nextQ()">${t('continue')}</button></div>`
        :`<div class="lesson-foot"><button class="btn" ${!can?'disabled':''} onclick="checkQ()">${ex.type==='write'?(S.loading?t('pyLoading'):(S.lang==='ko'?'코드 실행':'Run code')):t('check')}</button></div>`;
    app.innerHTML=`<div class="screen"><div class="lesson-bg"></div><div class="lesson-top"><button class="close" aria-label="${S.lang==='ko'?'나가기':'Exit'}" onclick="renderHome()"></button><div class="lesson-title"><b>${esc(L.title)}</b><div class="progress"><span style="width:${pct}%"></span></div></div><div class="lesson-meta"><span class="autosave">${S.lang==='ko'?'자동 저장':'Saved'}</span><span class="pill">${step}/${S.queue.length}</span></div></div><div class="scroll"><main class="lesson-main">${qhead}${body}</main></div>${foot}</div>`;
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

  document.title='Meowde v4.13 — Mobile UX Refresh';
  window.__MEOWDE_VERSION__='4.13';
  if(S.screen==='lesson'&&hasLessonProgress())renderLesson();
  else renderHome();
})();

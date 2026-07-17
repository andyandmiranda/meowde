(function applyMeowdeV412Hotfix(){
  function safeSave(){
    const state={lang:S.lang,done:S.done,next:S.next,xp:S.xp,churu:S.churu,streak:S.streak,milk:S.milk,cat:S.cat,unit:S.unit};
    if(hasLessonProgress()){
      state.inProgress={lang:S.lang,lessonIndex:S.lessonIndex,idx:S.idx,queue:S.queue,combo:S.combo,maxCombo:S.maxCombo,firstTotal:S.firstTotal,firstCorrect:S.firstCorrect,xpEarned:S.xpEarned,daily:S.daily,sel:S.sel,fill:S.fill,checked:S.checked,correct:S.correct,hint:S.hint,output:S.output||'',write:S.write||''};
    }
    try{localStorage.setItem('meowde-v410-state',JSON.stringify(state))}
    catch(error){console.warn('Meowde could not save progress:',error)}
  }

  save=safeSave;

  warmPy=async function(){
    if(pyReady||pyLoading)return;
    if(typeof loadPyodide==='undefined'){
      console.error('Pyodide loader is unavailable');
      return;
    }
    pyLoading=true;
    try{
      pyodide=await loadPyodide({indexURL:'https://cdn.jsdelivr.net/pyodide/v0.28.0/full/'});
      pyReady=true;
    }catch(error){
      pyodide=null;
      pyReady=false;
      console.error('Pyodide failed to load',error);
    }finally{
      pyLoading=false;
      if(S.screen==='home')renderHome();
    }
  };

  runPython=async function(code){
    await warmPy();
    if(!pyodide)throw new Error('no pyodide');
    pyodide.globals.set('meowde_user_code',code);
    try{
      const output=await pyodide.runPythonAsync(`import sys, io, traceback
_buffer = io.StringIO()
_old_stdout, _old_stderr = sys.stdout, sys.stderr
sys.stdout = _buffer
sys.stderr = _buffer
try:
    exec(meowde_user_code, {})
except Exception:
    traceback.print_exc()
finally:
    sys.stdout = _old_stdout
    sys.stderr = _old_stderr
_buffer.getvalue()`);
      return String(output).trimEnd();
    }finally{
      pyodide.globals.delete('meowde_user_code');
    }
  };

  startDaily=function(){
    const lessonIndex=Math.max(0,S.next-1);
    const source=lessons()[lessonIndex].exercises;
    const exercise=source.find(item=>item.type==='write')||source.find(item=>item.type!=='concept')||source[0];
    startLesson(lessonIndex,true,exercise?[exercise]:null);
  };

  startLesson=function(index,daily=false,queueOverride=null){
    if(!useMilk())return;
    S.lessonIndex=Math.max(0,Math.min(index,lessons().length-1));
    const source=Array.isArray(queueOverride)&&queueOverride.length?queueOverride:lessons()[S.lessonIndex].exercises;
    S.queue=source.map(item=>Object.assign({},item));
    S.idx=0;
    S.combo=0;
    S.maxCombo=0;
    S.firstTotal=S.queue.filter(item=>item.type!=='concept').length;
    S.firstCorrect=0;
    S.xpEarned=0;
    S.daily=Boolean(daily);
    setup();
    save();
    renderLesson();
  };

  finish=function(){
    const finishedLessonIndex=S.lessonIndex;
    const wasDaily=S.daily;
    const earned=S.xpEarned;
    const maxCombo=S.maxCombo;
    const accuracy=Math.round((S.firstCorrect/Math.max(1,S.firstTotal))*100);
    const churuEarned=Math.max(1,Math.round(earned/10)+Math.floor(maxCombo/2));

    if(!wasDaily&&!S.done.includes(finishedLessonIndex)){
      S.done.push(finishedLessonIndex);
      S.done.sort((a,b)=>a-b);
      S.next=Math.min(lessons().length-1,S.done.length);
    }

    S.xp+=earned;
    S.churu+=churuEarned;
    clearLessonProgress();
    S.lessonIndex=finishedLessonIndex;
    save();

    const treatLabel=S.lang==='ko'?'츄르':'Churu';
    const doneTitle=wasDaily?(S.lang==='ko'?'오늘의 챌린지 완료':'Daily challenge complete'):t('lessonDone');
    const doneLabel=wasDaily?(S.lang==='ko'?'1문제 연습 완료':'One practice task complete'):lessons()[finishedLessonIndex].title;
    const nextAction=wasDaily?'renderHome()':'renderMap()';
    const nextLabel=wasDaily?t('backHome'):t('reward');

    app.innerHTML=`<div class="screen"><div class="reward-screen">${catSVG(S.cat,'happy',116)}<h2>${doneTitle}</h2><p class="pill">${esc(doneLabel)}</p><div class="stats3"><div class="stat3"><b>+${earned}</b><p>XP</p></div><div class="stat3"><b>+${churuEarned}</b><p>${treatLabel}</p></div><div class="stat3"><b>${accuracy}%</b><p>${t('accuracy')}</p></div></div><p style="margin-top:14px;font-size:13px;color:var(--muted);line-height:1.5">${S.lang==='ko'?'츄르는 학습을 막는 재화가 아니라 완료 보상이에요.':'Churu is a completion reward, not an energy gate.'}</p></div><div class="lesson-foot"><button class="btn" onclick="${nextAction}">${nextLabel}</button></div></div>`;
  };

  document.title='Meowde v4.12 — Progress Hotfix';
  window.__MEOWDE_VERSION__='4.12';
})();
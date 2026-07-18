(function applyMeowdeV414Screens(){
  function progressPercent(){return Math.min(100,Math.round((S.done.length/Math.max(1,lessons().length))*100))}
  function dailyDone(){const key=typeof meowdeTodayKey==='function'?meowdeTodayKey():(new Date()).toISOString().slice(0,10);return Boolean(S.dailyHistory&&S.dailyHistory[key])}
  function currentMistakes(){
    return (Array.isArray(S.mistakes)?S.mistakes:[])
      .filter(item=>item&&item.lang===S.lang&&lessons()[item.lessonIndex])
      .sort((a,b)=>(Number(b.count)||0)-(Number(a.count)||0)||String(b.lastWrongAt||'').localeCompare(String(a.lastWrongAt||'')));
  }
  function dailyCard(){
    const ko=S.lang==='ko',done=dailyDone();
    return `<section class="card daily-card ${done?'daily-done':''}"><div class="section-title"><div><div class="section-kicker">${ko?'오늘':'Daily'}</div><h3>${done?(ko?'오늘의 챌린지 완료':'Daily challenge complete'):(ko?'오늘의 1분 챌린지':'Today’s 1-minute challenge')}</h3></div><span class="pill">${done?'✓':'+20 XP'}</span></div><p style="font-size:13.5px;color:var(--muted);line-height:1.55">${done?(ko?'오늘 보상은 받았어요. 같은 문제를 다시 연습해도 보상은 중복되지 않습니다.':'Today’s reward is claimed. You may practice again without duplicate rewards.'):t('dailySub')}</p><button class="btn butter" style="margin-top:13px" onclick="startDaily()">${icon('code')}${done?(ko?'보상 없이 다시 연습':'Practice again'):(ko?'1문제 풀기':'Solve 1 task')}</button></section>`;
  }

  renderHome=function(){
    S.screen='home';save();
    const hasProgress=hasLessonProgress();
    const lessonIndex=hasProgress?S.lessonIndex:S.next;
    const L=lessons()[lessonIndex]||lessons()[0];
    const action=hasProgress?'resumeLesson()':`startLesson(${lessonIndex})`;
    const ko=S.lang==='ko';
    const actionLabel=hasProgress?(ko?'이어서 배우기':'Resume lesson'):(ko?'오늘 학습 시작':'Start today');
    const sub=hasProgress?(ko?`문제 ${Math.min(S.idx+1,S.queue.length)} / ${S.queue.length}에서 이어집니다.`:`Resume at step ${Math.min(S.idx+1,S.queue.length)} of ${S.queue.length}.`):L.description;
    const mistakes=currentMistakes().length;
    app.innerHTML=`<div class="screen">${brand()}${stats()}<div class="scroll"><section class="card hero"><div class="hero-main">${catSVG(S.cat,'focus',88)}<div class="hero-copy"><div class="section-kicker">${ko?'오늘의 학습':'Today’s lesson'}</div><h2>${esc(L.title)}</h2><p>${esc(sub)}</p></div></div><button class="btn" onclick="${action}">${icon('play')}${actionLabel}</button><div class="home-secondary"><button class="text-link" onclick="renderMap()">${ko?'전체 학습 경로 보기':'See full learning path'} →</button></div></section>${dailyCard()}<section class="card"><div class="section-title"><h3>${ko?'전체 진도':'Overall progress'}</h3><span class="pill">${progressPercent()}%</span></div><p style="font-size:13px;color:var(--muted)">${ko?`${S.done.length}개 완료 · ${lessons().length-S.done.length}개 남음`:`${S.done.length} complete · ${lessons().length-S.done.length} remaining`}</p><div class="compact-progress"><span style="width:${progressPercent()}%"></span></div>${mistakes?`<button class="text-link" style="margin-top:14px" onclick="renderReview()">${ko?`오답 ${mistakes}개 복습하기`:`Review ${mistakes} mistakes`} →</button>`:''}</section></div>${tabs('home')}</div>`;
  };

  renderReview=function(){
    S.screen='review';save();
    const ko=S.lang==='ko';
    const mistakes=currentMistakes();
    const mistakeRows=mistakes.map(item=>{
      const L=lessons()[item.lessonIndex];
      const ex=L.exercises.find(x=>x.id===item.exerciseId);
      if(!ex)return '';
      const prompt=ex.prompt||ex.title||L.description;
      return `<button class="review-item mistake-item" onclick="startMistakeReview(${item.lessonIndex},'${esc(item.exerciseId)}')"><span class="lesson-badge">!</span><span class="lesson-info"><b>${esc(L.title)}</b><p>${esc(prompt)}</p></span><span class="pill">${Number(item.count)||1}×</span></button>`;
    }).join('');
    const completed=S.done.slice().reverse().map(index=>{
      const L=lessons()[index];if(!L)return '';
      return `<button class="review-item" onclick="startLesson(${index},false,null,{mode:'review'})"><span class="lesson-badge">${String(index+1).padStart(2,'0')}</span><span class="lesson-info"><b>${esc(L.title)}</b><p>${esc(L.description)}</p></span><span class="pill">${ko?'다시':'Replay'}</span></button>`;
    }).join('');
    const empty=ko?'완료한 레슨이 아직 없습니다.<br>첫 레슨을 끝내면 여기서 다시 연습할 수 있어요.':'No completed lessons yet.<br>Finish your first lesson to review it here.';
    app.innerHTML=`<div class="screen">${brand()}${stats()}<div class="scroll"><div class="simple-head"><h2>${ko?'복습':'Review'}</h2><p>${ko?'틀린 문제를 먼저 정리하고 완료한 레슨을 다시 연습하세요.':'Clear mistakes first, then replay completed lessons.'}</p></div>${dailyCard()}${mistakeRows?`<div class="review-section-head"><h3>${ko?'오답 노트':'Mistake queue'}</h3><span>${mistakes.length}</span></div><div class="review-list">${mistakeRows}</div>`:''}<div class="review-section-head"><h3>${ko?'완료한 레슨':'Completed lessons'}</h3><span>${S.done.length}</span></div>${completed?`<div class="review-list">${completed}</div>`:`<div class="empty-state">${empty}</div>`}</div>${tabs('review')}</div>`;
  };

  document.title='Meowde v4.14 — Practice Memory';
  window.__MEOWDE_VERSION__='4.14';
  if(S.screen==='review')renderReview();
  else if(S.screen==='home'||!hasLessonProgress())renderHome();
})();

(function applyMeowdeV414Screens(){
  function progressPercent(){return Math.min(100,Math.round((S.done.length/Math.max(1,lessons().length))*100))}
  function dailyDone(){const key=typeof meowdeTodayKey==='function'?meowdeTodayKey():(new Date()).toISOString().slice(0,10);return Boolean(S.dailyHistory&&S.dailyHistory[key])}
  function currentMistakes(){
    return (Array.isArray(S.mistakes)?S.mistakes:[])
      .filter(item=>item&&item.lang===S.lang&&lessons()[item.lessonIndex])
      .sort((a,b)=>(Number(b.count)||0)-(Number(a.count)||0)||String(b.lastWrongAt||'').localeCompare(String(a.lastWrongAt||'')));
  }
  function currentUnit(){
    const size=10;
    const next=Math.max(0,Math.min(Number(S.next)||0,Math.max(0,lessons().length-1)));
    const unit=Math.floor(next/size);
    const start=unit*size;
    const end=Math.min(start+size,lessons().length);
    let done=0;
    for(let index=start;index<end;index++)if(Array.isArray(S.done)&&S.done.includes(index))done++;
    const names=S.lang==='ko'?['Python 기초','조건과 반복','함수와 프로젝트']:['Python Basics','Control & Loops','Functions & Projects'];
    return {unit,start,end,total:Math.max(0,end-start),done,name:names[unit]||(S.lang==='ko'?`유닛 ${unit+1}`:`Unit ${unit+1}`)};
  }
  function dailyCard(){
    const ko=S.lang==='ko',done=dailyDone();
    return `<section class="card daily-card phase1-compact-card ${done?'daily-done':''}"><button class="phase1-row-button" onclick="startDaily()"><span class="phase1-row-icon">${done?'✓':'☀️'}</span><span class="phase1-row-copy"><b>${done?(ko?'오늘의 연습 완료':'Daily practice complete'):(ko?'오늘의 연습':'Daily practice')}</b><small>${done?(ko?'+20 XP · 다시 풀어도 보상은 한 번만 받아요.':'+20 XP · Reward is granted once.'):(ko?'1문제 · 약 1분':'1 task · about 1 min')}</small></span><strong>→</strong></button></section>`;
  }
  function unitCard(){
    const ko=S.lang==='ko',unit=currentUnit(),percent=unit.total?Math.round(unit.done/unit.total*100):0;
    return `<section class="card phase1-unit-card"><button class="phase1-unit-button" onclick="S.unit=${unit.unit};save();renderMap()"><span class="phase1-unit-copy"><span class="section-kicker">${ko?'현재 과정':'Current unit'}</span><b>${esc(unit.name)}</b><small>${unit.done} / ${unit.total}</small></span><span class="phase1-mini-progress" aria-label="${percent}%"><i style="width:${percent}%"></i></span><strong>→</strong></button></section>`;
  }

  renderHome=function(){
    S.screen='home';save();
    const hasProgress=hasLessonProgress();
    const lessonIndex=hasProgress?S.lessonIndex:S.next;
    const L=lessons()[lessonIndex]||lessons()[0];
    const action=hasProgress?'resumeLesson()':`startLesson(${lessonIndex})`;
    const ko=S.lang==='ko';
    const actionLabel=hasProgress?(ko?'이어서 배우기':'Resume lesson'):(ko?'오늘 학습 시작':'Start learning');
    const sub=hasProgress?(ko?`문제 ${Math.min(S.idx+1,S.queue.length)} / ${S.queue.length}에서 이어집니다.`:`Resume at step ${Math.min(S.idx+1,S.queue.length)} of ${S.queue.length}.`):L.description;
    const unit=currentUnit();
    const streak=Math.max(0,Number(S.streak)||0);
    app.innerHTML=`<div class="screen phase1-home">${brand()}<div class="phase1-home-meta"><span>${ko?'오늘의 학습':'Today'}</span>${streak?`<span>🔥 ${streak}${ko?'일':'d'}</span>`:''}</div><div class="scroll"><section class="card hero phase1-hero"><div class="hero-main">${catSVG(S.cat,'focus',88)}<div class="hero-copy"><div class="section-kicker">Lesson ${String(lessonIndex+1).padStart(2,'0')} · ${esc(unit.name)}</div><h2>${esc(L.title)}</h2><p>${esc(sub)}</p></div></div><button class="btn" onclick="${action}">${icon('play')}${actionLabel}</button><div class="home-secondary"><button class="text-link" onclick="S.unit=${unit.unit};save();renderMap()">${ko?'전체 학습 경로 보기':'See learning path'} →</button></div></section>${dailyCard()}${unitCard()}</div>${tabs('home')}</div>`;
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
    app.innerHTML=`<div class="screen"><div class="scroll"><div class="simple-head"><h2>${ko?'복습':'Review'}</h2><p>${ko?'틀린 문제를 먼저 정리하고 완료한 레슨을 다시 연습하세요.':'Clear mistakes first, then replay completed lessons.'}</p></div>${mistakeRows?`<div class="review-section-head"><h3>${ko?'오답':'Mistakes'}</h3><span>${mistakes.length}</span></div><div class="review-list">${mistakeRows}</div>`:''}<div class="review-section-head"><h3>${ko?'완료한 레슨':'Completed lessons'}</h3><span>${S.done.length}</span></div>${completed?`<div class="review-list">${completed}</div>`:`<div class="empty-state">${empty}</div>`}</div>${tabs('review')}</div>`;
  };

  document.title='Meowde — Simplified Learning';
  window.__MEOWDE_VERSION__='4.14-phase1';
  if(S.screen==='review')renderReview();
  else if(S.screen==='home'||!hasLessonProgress())renderHome();
})();

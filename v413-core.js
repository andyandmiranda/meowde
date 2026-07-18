(function applyMeowdeV413UX(){
  const originalRenderMap=renderMap;

  function progressPercent(){
    return Math.min(100,Math.round((S.done.length/Math.max(1,lessons().length))*100));
  }

  stats=function(){
    const streakLabel=S.lang==='ko'?`${S.streak}일 연속`:`${S.streak} day streak`;
    return `<div class="status"><span class="pill good">🔥 ${streakLabel}</span><span class="pill">⭐ ${S.xp} XP</span><span class="pill">${t('progress')} ${S.done.length}/${lessons().length}</span></div>`;
  };

  tabs=function(active){
    const labels=S.lang==='ko'
      ?{home:'홈',study:'학습',review:'복습',my:'마이'}
      :{home:'Home',study:'Learn',review:'Review',my:'My'};
    return `<div class="tabbar">
      <button class="${active==='home'?'on':''}" onclick="renderHome()">${icon('home')}<span>${labels.home}</span></button>
      <button class="${active==='study'?'on':''}" onclick="renderMap()">${icon('map')}<span>${labels.study}</span></button>
      <button class="${active==='review'?'on':''}" onclick="renderReview()">${icon('code')}<span>${labels.review}</span></button>
      <button class="${active==='my'?'on':''}" onclick="renderMy()">${icon('room')}<span>${labels.my}</span></button>
    </div>`;
  };

  renderHome=function(){
    S.screen='home';
    save();
    const hasProgress=hasLessonProgress();
    const lessonIndex=hasProgress?S.lessonIndex:S.next;
    const L=lessons()[lessonIndex]||lessons()[0];
    const action=hasProgress?'resumeLesson()':`startLesson(${lessonIndex})`;
    const actionLabel=hasProgress?(S.lang==='ko'?'이어서 배우기':'Resume lesson'):(S.lang==='ko'?'오늘 학습 시작':'Start today');
    const sub=hasProgress
      ?(S.lang==='ko'?`문제 ${Math.min(S.idx+1,S.queue.length)} / ${S.queue.length}에서 이어집니다.`:`Resume at step ${Math.min(S.idx+1,S.queue.length)} of ${S.queue.length}.`)
      :L.description;
    const dailyTitle=S.lang==='ko'?'오늘의 1분 챌린지':'Today’s 1-minute challenge';
    const mapLabel=S.lang==='ko'?'전체 학습 경로 보기':'See full learning path';
    const unitLabel=S.lang==='ko'?'오늘의 학습':'Today’s lesson';
    app.innerHTML=`<div class="screen">${brand()}${stats()}<div class="scroll">
      <section class="card hero">
        <div class="hero-main">${catSVG(S.cat,'focus',88)}<div class="hero-copy"><div class="section-kicker">${unitLabel}</div><h2>${esc(L.title)}</h2><p>${esc(sub)}</p></div></div>
        <button class="btn" onclick="${action}">${icon('play')}${actionLabel}</button>
        <div class="home-secondary"><button class="text-link" onclick="renderMap()">${mapLabel} →</button></div>
      </section>
      <section class="card daily-card"><div class="section-title"><div><div class="section-kicker">${S.lang==='ko'?'오늘':'Daily'}</div><h3>${dailyTitle}</h3></div><span class="pill">+20 XP</span></div><p style="font-size:13.5px;color:var(--muted);line-height:1.55">${t('dailySub')}</p><button class="btn butter" style="margin-top:13px" onclick="startDaily()">${icon('code')}${S.lang==='ko'?'1문제 풀기':'Solve 1 task'}</button></section>
      <section class="card"><div class="section-title"><h3>${S.lang==='ko'?'전체 진도':'Overall progress'}</h3><span class="pill">${progressPercent()}%</span></div><p style="font-size:13px;color:var(--muted)">${S.lang==='ko'?`${S.done.length}개 완료 · ${lessons().length-S.done.length}개 남음`:`${S.done.length} complete · ${lessons().length-S.done.length} remaining`}</p><div class="compact-progress"><span style="width:${progressPercent()}%"></span></div></section>
    </div>${tabs('home')}</div>`;
  };

  renderMap=function(){
    originalRenderMap();
    S.screen='map';
    const heading=document.querySelector('.map-head h2');
    const copy=document.querySelector('.map-head p');
    if(heading)heading.textContent=S.lang==='ko'?'학습 경로':'Learning path';
    if(copy)copy.textContent=S.lang==='ko'?'레슨은 권장 순서대로 열립니다. 완료한 레슨은 언제든 다시 복습할 수 있어요.':'Lessons unlock in the recommended order. Completed lessons can be reviewed anytime.';
    const unitNames=S.lang==='ko'?['01 Python 기초','02 조건과 반복','03 함수와 프로젝트']:['01 Python Basics','02 Control & Loops','03 Functions & Projects'];
    document.querySelectorAll('.unit-tabs button').forEach((button,index)=>{button.textContent=unitNames[index]||button.textContent});
    const bar=document.querySelector('.tabbar');
    if(bar)bar.outerHTML=tabs('study');
  };

  renderReview=function(){
    S.screen='review';
    save();
    const completed=S.done.slice().reverse().map(index=>{
      const L=lessons()[index];
      if(!L)return '';
      return `<button class="review-item" onclick="startLesson(${index})"><span class="lesson-badge">${String(index+1).padStart(2,'0')}</span><span class="lesson-info"><b>${esc(L.title)}</b><p>${esc(L.description)}</p></span><span class="pill">${S.lang==='ko'?'다시':'Replay'}</span></button>`;
    }).join('');
    const empty=S.lang==='ko'?'완료한 레슨이 아직 없습니다.<br>첫 레슨을 끝내면 여기서 다시 연습할 수 있어요.':'No completed lessons yet.<br>Finish your first lesson to review it here.';
    app.innerHTML=`<div class="screen">${brand()}${stats()}<div class="scroll"><div class="simple-head"><h2>${S.lang==='ko'?'복습':'Review'}</h2><p>${S.lang==='ko'?'완료한 레슨을 다시 풀거나 오늘의 짧은 챌린지를 시작하세요.':'Replay completed lessons or start today’s short challenge.'}</p></div>
      <section class="card daily-card"><div class="section-title"><h3>${S.lang==='ko'?'오늘의 챌린지':'Daily Challenge'}</h3><span class="pill">1 ${S.lang==='ko'?'문제':'task'}</span></div><button class="btn butter" onclick="startDaily()">${icon('code')}${S.lang==='ko'?'바로 시작':'Start now'}</button></section>
      ${completed?`<div class="review-list">${completed}</div>`:`<div class="empty-state">${empty}</div>`}
    </div>${tabs('review')}</div>`;
  };

  renderMy=function(){
    S.screen='my';
    save();
    const names=S.lang==='ko'
      ?{a:['소프트 아이콘','가장 단정한 기본형'],b:['드림 스티커','조금 더 말랑한 스티커형'],c:['클린 마크','로고처럼 간결한 형태']}
      :{a:['Soft Icon','Clean default direction'],b:['Dream Sticker','Softer sticker direction'],c:['Clean Mark','Minimal logo direction']};
    const cards=['a','b','c'].map(key=>`<div class="cat-card"><div class="cat-card-head">${catSVG(key,'idle',82)}<div><h3>${names[key][0]}</h3><p>${names[key][1]}</p></div></div><button class="btn ${S.cat===key?'':'ghost'}" onclick="S.cat='${key}';save();renderMy()">${S.cat===key?(S.lang==='ko'?'선택됨':'Selected'):t('select')}</button></div>`).join('');
    app.innerHTML=`<div class="screen">${brand()}${stats()}<div class="scroll"><div class="simple-head"><h2>${S.lang==='ko'?'마이':'My'}</h2><p>${S.lang==='ko'?'학습 기록과 코치 캐릭터를 관리합니다.':'Manage your learning record and coach character.'}</p></div>
      <section class="card profile-card">${catSVG(S.cat,'happy',82)}<div class="profile-copy"><h3>${S.lang==='ko'?'코드냥과 학습 중':'Learning with Codenyang'}</h3><p>${S.lang==='ko'?`${S.done.length}개 레슨 완료 · ${S.streak}일 연속 학습`:`${S.done.length} lessons complete · ${S.streak} day streak`}</p></div></section>
      <div class="profile-stats"><div class="profile-stat"><b>${S.xp}</b><span>XP</span></div><div class="profile-stat"><b>${S.churu}</b><span>${S.lang==='ko'?'츄르':'Churu'}</span></div><div class="profile-stat"><b>${progressPercent()}%</b><span>${S.lang==='ko'?'진도':'Progress'}</span></div></div>
      <div class="simple-head" style="padding-top:5px"><h2 style="font-size:20px">${S.lang==='ko'?'코치 선택':'Choose coach'}</h2></div><div class="room-grid">${cards}</div>
    </div>${tabs('my')}</div>`;
  };

  renderRoom=renderMy;

  window.chooseFill=function(index){
    const exercise=cur();
    if(!exercise||!Array.isArray(exercise.tokens)||!exercise.tokens[index])return;
    S.fill=exercise.tokens[index];
    save();
    renderLesson();
  };

  window.insertCodeToken=function(token){
    const editor=document.getElementById('code-editor');
    if(!editor)return;
    const start=editor.selectionStart||0;
    const end=editor.selectionEnd||0;
    let text=token;
    let cursor=start+token.length;
    if(token==='()'){text='()';cursor=start+1}
    if(token==='[]'){text='[]';cursor=start+1}
    if(token==='""'){text='""';cursor=start+1}
    if(token==="''"){text="''";cursor=start+1}
    if(token==='TAB'){text='    ';cursor=start+4}
    const value=editor.value.slice(0,start)+text+editor.value.slice(end);
    editor.value=value;
    S.write=value;
    save();
    editor.focus();
    editor.setSelectionRange(cursor,cursor);
  };
})();

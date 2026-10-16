(function applyMeowdeV414Screens(){
  const FEEDBACK_URL="https://amis-os.vercel.app/feedback";
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
    const names=S.lang==='ko'?['Python 기초','입력과 조건','컬렉션·반복·함수','문자열·딕셔너리·데이터']:['Python Basics','Input & Decisions','Collections, Loops & Functions','Strings, Dictionaries & Data'];
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
  function homeBrand(){
    const ko=S.lang==='ko';
    const tagline=typeof t==='function'?t('tagline'):'Learn to code playfully.';
    return `<div class="top"><div class="brand"><span class="brand-mark"><img class="v449-character v449-pose-base v448-brand-cat" src="/assets/meowde-approved-base.svg?v=450" alt="" width="42" height="42" data-v449-pose="base" data-character-version="4.50" decoding="async"></span><div><h1 class="v444-brand-wordmark">Meowde</h1><p>${esc(tagline)}</p></div></div><button class="lang" onclick="langSheet()">${ko?'KO':'EN'}</button></div>`;
  }
  function homeHeroCharacter(){
    const label=S.lang==='ko'?'헤드폰을 쓰고 학습하는 Meowde':'Meowde learning with headphones';
    return `<div class="v444-coding-scene v448-approved-hero v449-coding-scene"><img class="v449-character v449-pose-coding" src="/assets/meowde-approved-headphones.svg?v=450" alt="${esc(label)}" data-v449-pose="coding" data-character-version="4.50" decoding="async"></div>`;
  }
  function canonicalTabs(active){
    const ko=S.lang==='ko';
    return `<div class="tabbar" data-phase1-navigation="three-tabs"><button class="${active==='home'?'on':''}" onclick="renderHome()" aria-label="${ko?'배우기':'Learn'}">${icon('home')}<span>${ko?'배우기':'Learn'}</span></button><button class="${active==='review'?'on':''}" onclick="renderReview()" aria-label="${ko?'복습':'Review'}">${icon('spark')}<span>${ko?'복습':'Review'}</span></button><button class="${active==='more'?'on':''}" onclick="renderMore()" aria-label="${ko?'더 보기':'More'}">${icon('cat')}<span>${ko?'더 보기':'More'}</span></button></div>`;
  }
  function renderMore(){
    S.screen='my';save();const ko=S.lang==='ko';
    app.innerHTML=`<div class="screen phase1-more">${homeBrand()}<div class="scroll"><div class="simple-head"><h2>${ko?'더 보기':'More'}</h2></div><section class="card"><button class="btn ghost" onclick="renderMap()">${ko?'전체 과정':'Course map'}</button><a class="btn ghost" href="/python-lab.html" style="margin-top:10px;text-decoration:none">${ko?'추가 문제 풀기':'Extra challenges'}</a><button class="btn ghost" onclick="renderProfile()" style="margin-top:10px">${ko?'내 기록과 꾸미기':'My progress and cat'}</button></section><section class="card"><p class="muted">${ko?'다른 과목':'Other subject'}</p><a class="btn ghost" href="/linux-home.html" style="text-decoration:none">Linux →</a></section></div>${canonicalTabs('more')}</div>`;
  }
  window.renderMore=renderMore;
  function contactMarkup(){
    const label=S.lang==='ko'?'피드백 & 문의 ↗':'Feedback & Contact ↗';
    return `<div class="v451-contact"><a href="${FEEDBACK_URL}" target="_blank" rel="noopener noreferrer" aria-label="${esc(label.replace(' ↗',''))}">${label}</a></div>`;
  }
  function reviewPoseMarkup(mistakes){
    const hasMistakes=mistakes.length>0;
    const pose=hasMistakes?'meh':'smug';
    const src=hasMistakes?'/assets/meowde-approved-base.svg?v=450':'/assets/meowde-approved-glasses.svg?v=450';
    const label=S.lang==='ko'?(hasMistakes?'복습할 내용을 확인하는 Meowde':'복습을 마친 자신만만한 Meowde'):(hasMistakes?'Meowde checking review items':'Confident Meowde after review');
    return `<img class="v449-character v449-pose-${pose} v449-review-pose" src="${src}" alt="${esc(label)}" data-v449-pose="${pose}" data-character-version="4.50" decoding="async">`;
  }
  function smartReviewCard(){
    try{return window.MeowSmartReview&&typeof MeowSmartReview.card==='function'?MeowSmartReview.card():''}catch(error){console.warn('Meowde Smart Review card could not render:',error);return ''}
  }
  function learningQualityCard(){
    try{return window.MeowLearning&&typeof MeowLearning.reviewQualityCard==='function'?MeowLearning.reviewQualityCard():''}catch(error){console.warn('Meowde learning quality card could not render:',error);return ''}
  }

  renderHome=function(){
    S.screen='home';save();
    const hasProgress=hasLessonProgress(),lessonIndex=hasProgress?S.lessonIndex:S.next,L=lessons()[lessonIndex]||lessons()[0],ko=S.lang==='ko';
    const action=hasProgress?'resumeLesson()':`startLesson(${lessonIndex})`;
    const label=hasProgress?(ko?'이어서 배우기':'Continue learning'):(ko?'배우기 시작':'Start learning');
    app.innerHTML=`<div class="screen phase1-home">${homeBrand()}<div class="scroll"><section class="card hero phase1-hero"><div class="hero-main">${homeHeroCharacter()}<div class="hero-copy"><h2>${ko?'오늘도 하나씩 배워볼까?':'Ready to learn?'}</h2><p>${esc(L.title)}</p></div></div><button class="btn" onclick="${action}">${icon('play')}${label}</button></section><section class="card"><div class="section-title"><h3>${ko?'지금 배우는 내용':'Current lesson'}</h3><span class="pill">${String(lessonIndex+1).padStart(2,'0')}</span></div><p class="muted">${hasProgress?(ko?`문제 ${Math.min(S.idx+1,S.queue.length)} / ${S.queue.length}`:`Question ${Math.min(S.idx+1,S.queue.length)} / ${S.queue.length}`):esc(L.description)}</p></section><details class="meowde-more"><summary>${ko?'더 보기 · 전체 과정과 내 기록':'More · course and progress'}</summary><div class="more-links"><button class="btn ghost" onclick="renderMap()">${ko?'전체 과정':'Course map'}</button><button class="btn ghost" onclick="renderProfile()">${ko?'내 기록':'My progress'}</button></div></details></div>${canonicalTabs('home')}</div>`;
    document.documentElement.dataset.homeRenderer='canonical-v414';
    document.documentElement.dataset.navigation='three-tabs';
  };
  window.__MEOWDE_CANONICAL_HOME_RENDERER__=renderHome;

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
    const smart=smartReviewCard();
    const quality=learningQualityCard();
    app.innerHTML=`<div class="screen phase5-review"><div class="scroll"><div class="simple-head"><h2>${ko?'복습':'Review'}</h2><p>${ko?'헷갈렸던 문제부터 다시 풀어봐.':'Try the questions you missed.'}</p></div>${mistakeRows?`<div class="review-section-head"><h3>${ko?'다시 풀기':'Try again'}</h3><span>${mistakes.length}</span></div><div class="review-list">${mistakeRows}</div>`:`<div class="empty-state">${ko?'틀린 문제가 아직 없어.':'No missed questions yet.'}</div>`}<details class="meowde-more"><summary>${ko?'완료한 레슨 다시 풀기':'Replay completed lessons'} · ${S.done.length}</summary><div class="more-links">${completed?`<div class="review-list">${completed}</div>`:`<p class="muted">${empty}</p>`}</div></details><details class="meowde-more"><summary>${ko?'추가 복습':'More review'}</summary><div class="more-links">${smart}${quality}</div></details></div>${canonicalTabs('review')}</div>`;
    document.documentElement.dataset.reviewRenderer='canonical-v414';
    document.documentElement.dataset.navigation='phase1-four-tabs';
  };
  window.__MEOWDE_CANONICAL_REVIEW_RENDERER__=renderReview;

  document.title='Meowde — Simplified Learning';
  window.__MEOWDE_VERSION__='4.14-phase5-review';
  if(S.screen==='review')renderReview();
  else if(S.screen==='home'||!hasLessonProgress())renderHome();
})();
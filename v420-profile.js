(function applyMeowdeV420Profile(){
  "use strict";

  const KEY='meowde-v420-profile';
  const VERSION='4.20-phase5-secondary';
  const BASE_ASSET='/assets/meowde-approved-base.svg?v=450';
  const HEADPHONES_ASSET='/assets/meowde-approved-headphones.svg?v=450';

  function readJSON(key){try{const value=JSON.parse(localStorage.getItem(key)||'{}');return value&&typeof value==='object'?value:{}}catch(error){return {}}}
  const P=readJSON(KEY);
  P.name=typeof P.name==='string'&&P.name.trim()?P.name.trim():'Amy';
  function persist(){try{localStorage.setItem(KEY,JSON.stringify(P))}catch(error){console.warn('Meowde v4.20 could not save profile:',error)}}
  function levelInfo(){
    const xp=Math.max(0,Number(S.xp)||0),level=Math.floor(xp/100)+1,current=xp%100;
    const titles=S.lang==='ko'?['새싹 코더','호기심 탐험가','코드 메이커','코드 장인','Meow Master']:['Seed Coder','Curious Explorer','Code Maker','Code Artisan','Meow Master'];
    return {xp,level,current,target:100,percent:current,title:titles[Math.min(titles.length-1,level-1)]};
  }
  function achievements(){return window.MeowAchievements&&Array.isArray(MeowAchievements.definitions)?MeowAchievements.definitions:[]}
  function achievementState(){return window.MeowAchievements&&MeowAchievements.state?MeowAchievements.state:{unlocked:{},featured:''}}
  function featuredBadge(){
    const defs=achievements(),state=achievementState(),unlocked=state.unlocked||{};
    return defs.find(item=>item.id===state.featured&&unlocked[item.id])||defs.slice().reverse().find(item=>unlocked[item.id])||null;
  }
  function unlockedCount(){const state=achievementState(),unlocked=state.unlocked||{};return achievements().filter(item=>unlocked[item.id]).length}
  function myLearningSummary(){
    const available=lessons(),done=new Set((Array.isArray(S.done)?S.done:[]).filter(i=>Number.isInteger(i)&&i>=0&&i<available.length));
    const missed=new Set((Array.isArray(S.mistakes)?S.mistakes:[]).filter(item=>item&&item.lang===S.lang&&available[item.lessonIndex]?.exercises?.some(ex=>ex.id===item.exerciseId)).map(item=>JSON.stringify([item.lessonIndex,item.exerciseId])));
    return {done:done.size,total:available.length,percent:available.length?Math.round(done.size/available.length*100):0,missed:missed.size};
  }
  function dateKey(date){const y=date.getFullYear(),m=String(date.getMonth()+1).padStart(2,'0'),d=String(date.getDate()).padStart(2,'0');return `${y}-${m}-${d}`}
  function weekDays(){
    const activity=new Set(Array.isArray(S.activityDates)?S.activityDates:[]),today=dateKey(new Date()),labels=S.lang==='ko'?['일','월','화','수','목','금','토']:['S','M','T','W','T','F','S'];
    return Array.from({length:7},(_,offset)=>{const date=new Date();date.setHours(12,0,0,0);date.setDate(date.getDate()-(6-offset));const key=dateKey(date);return {key,label:labels[date.getDay()],active:activity.has(key),today:key===today}});
  }
  function unitRows(){
    const available=lessons(),done=new Set(Array.isArray(S.done)?S.done:[]);
    const names=S.lang==='ko'?['Python 기초','입력과 조건','컬렉션·반복·함수','문자열·딕셔너리·데이터','예외·파일·모듈','클래스·객체']:['Python Basics','Input & Decisions','Collections, Loops & Functions','Strings, Dictionaries & Data','Exceptions, Files & Modules','Classes & Objects'];
    return Array.from({length:Math.ceil(available.length/10)},(_,unit)=>{const start=unit*10,end=Math.min(start+10,available.length),total=end-start;let count=0;for(let i=start;i<end;i++)if(done.has(i))count++;return {name:names[unit]||(S.lang==='ko'?`단원 ${unit+1}`:`Unit ${unit+1}`),done:count,total,percent:total?Math.round(count/total*100):0}});
  }
  function insightData(){
    const review=readJSON('meowde-v417-review'),mentor=window.MeowMentor&&MeowMentor.state?MeowMentor.state:readJSON('meowde-v418-mentor'),a=achievementState();
    const mistakes=(Array.isArray(S.mistakes)?S.mistakes:[]).filter(item=>item&&item.lang===S.lang).length;
    const hints=Object.values(mentor.hints||{}).reduce((sum,value)=>sum+(Number(value)||0),0);
    const patterns=mentor.patterns||{},top=Object.keys(patterns).sort((x,y)=>(Number(patterns[y])||0)-(Number(patterns[x])||0))[0]||'';
    const patternLabels={debugging:S.lang==='ko'?'디버깅':'Debugging',syntax:S.lang==='ko'?'문법':'Syntax',prediction:S.lang==='ko'?'실행 결과 예측':'Prediction','code-writing':S.lang==='ko'?'코드 작성':'Code writing',general:S.lang==='ko'?'기본 문제':'General'};
    return {mistakes,hints,reviews:Array.isArray(review.history)?review.history.length:0,best:Number(a.bestCorrectStreak)||0,noHints:Number(a.noHintWins)||0,top:top?patternLabels[top]||top:''};
  }
  function canonicalBrand(){
    const ko=S.lang==='ko',tagline=typeof t==='function'?t('tagline'):'Learn to code playfully.';
    return `<div class="top"><div class="brand"><span class="brand-mark"><img class="v449-character v449-pose-base v448-brand-cat" src="${BASE_ASSET}" alt="" width="42" height="42" data-v449-pose="base" data-character-version="4.50" decoding="async"></span><div><h1 class="v444-brand-wordmark">Meowde</h1><p>${esc(tagline)}</p></div></div></div>`;
  }
  function canonicalTabs(){
    const ko=S.lang==='ko',lab=ko?'심화':'Deepen',my=ko?'마이':'My';
    return `<div class="tabbar" data-phase1-navigation="five-tabs"><button onclick="renderHome()" aria-label="${ko?'홈':'Home'}">${icon('home')}<span>${ko?'홈':'Home'}</span></button><button onclick="renderMap()" aria-label="${ko?'학습':'Learn'}">${icon('map')}<span>${ko?'학습':'Learn'}</span></button><button onclick="location.href='/python-lab.html'" aria-label="${lab}">${icon('code')}<span>${lab}</span></button><button onclick="location.href='/together.html'" aria-label="${ko?'함께':'Together'}">${icon('spark')}<span>${ko?'함께':'Together'}</span></button><button class="on" onclick="renderProfile()" aria-label="${my}">${icon('cat')}<span>${my}</span></button></div>`;
  }
  function profileAvatar(level){
    const label=S.lang==='ko'?'헤드폰을 쓴 Meowde':'Meowde with headphones';
    return `<div class="v420-avatar"><img class="v449-character v449-pose-music v449-profile-pose" src="${HEADPHONES_ASSET}" alt="${label}" data-v449-pose="music" data-character-version="4.50" decoding="async"><span class="v420-avatar-level">${level}</span></div>`;
  }
  function statsGrid(){
    const ko=S.lang==='ko',daily=S.dailyHistory&&typeof S.dailyHistory==='object'?Object.keys(S.dailyHistory).length:0;
    const items=[[S.done.length,ko?'완료 레슨':'Lessons'],[Number(S.streak)||0,ko?'연속 학습일':'Day streak'],[daily,ko?'Daily 완료':'Dailies'],[unlockedCount(),ko?'달성 업적':'Badges']];
    return `<div class="v420-stat-grid">${items.map(item=>`<div class="v420-stat"><b>${item[0]}</b><span>${item[1]}</span></div>`).join('')}</div>`;
  }
  function weekCard(){
    const ko=S.lang==='ko',days=weekDays(),active=days.filter(day=>day.active).length;
    return `<section class="card"><div class="v420-card-title"><div><h3>${ko?'최근 7일':'Last 7 days'}</h3><p>${ko?'학습 완료 기록이 있는 날이에요.':'Days with completed learning records.'}</p></div><span class="pill">${active}/7</span></div><div class="v420-week">${days.map(day=>`<div class="v420-day ${day.active?'active':''} ${day.today?'today':''}"><span>${day.active?'✓':'·'}</span><small>${day.label}</small></div>`).join('')}</div></section>`;
  }
  function masteryCard(){
    const ko=S.lang==='ko';
    return `<section class="card"><div class="v420-card-title"><div><h3>${ko?'단원별 진도':'Progress by unit'}</h3><p>${ko?'유닛별 완료 비율입니다.':'Completion by learning unit.'}</p></div></div><div class="v420-mastery-list">${unitRows().map(unit=>`<div class="v420-mastery-row"><div class="v420-mastery-head"><span>${esc(unit.name)}</span><span>${unit.done}/${unit.total} · ${unit.percent}%</span></div><div class="v420-mastery-bar"><span style="width:${unit.percent}%"></span></div></div>`).join('')}</div></section>`;
  }
  function insightCard(){
    const ko=S.lang==='ko',data=insightData();
    const items=[['🧠',data.reviews,ko?'Smart Review':'Smart Reviews'],['⚡',data.best,ko?'최고 연속 정답':'Best answer streak'],['💡',data.hints,ko?'열어본 힌트':'Hints opened'],['📝',data.mistakes,ko?'남은 오답':'Mistakes']];
    return `<section class="card"><div class="v420-card-title"><div><h3>${ko?'학습 인사이트':'Learning insights'}</h3><p>${ko?'문제 풀이 기록을 한눈에 확인하세요.':'A compact view of your practice history.'}</p></div></div><div class="v420-insight-grid">${items.map(item=>`<div class="v420-insight"><span class="v420-insight-icon">${item[0]}</span><b>${item[1]}</b><small>${item[2]}</small></div>`).join('')}</div>${data.top?`<div class="v420-pattern">${ko?'가장 자주 막힌 유형':'Most frequent challenge'}: <b>${esc(data.top)}</b></div>`:''}</section>`;
  }
  function goalsCard(){
    const ko=S.lang==='ko',next=Math.max(0,Math.min(Number(S.next)||0,lessons().length-1)),lesson=lessons()[next],dailyDone=Boolean(S.dailyHistory&&S.dailyHistory[dateKey(new Date())]),mistakes=insightData().mistakes;
    const goals=[
      {icon:'▶️',title:ko?'다음 레슨':'Next lesson',detail:lesson?lesson.title:'Meowde',action:`startLesson(${next})`},
      {icon:'☀️',title:dailyDone?(ko?'오늘의 챌린지 완료':'Daily complete'):(ko?'오늘의 챌린지':'Daily challenge'),detail:dailyDone?(ko?'보상 수령 완료':'Reward claimed'):(ko?'1문제 학습':'One quick task'),action:'startDaily()'},
      {icon:'🧠',title:ko?'오답 복습':'Mistake review',detail:mistakes?(ko?`${mistakes}개 정리하기`:`Review ${mistakes} mistakes`):(ko?'현재 남은 오답 없음':'No pending mistakes'),action:'renderReview()'},
      {icon:'🏅',title:ko?'업적 컬렉션':'Achievement collection',detail:`${unlockedCount()}/${Math.max(achievements().length,7)}`,action:'renderAchievements()'}
    ];
    return `<section class="card"><div class="v420-card-title"><div><h3>${ko?'다음 행동':'Next actions'}</h3><p>${ko?'지금 할 수 있는 학습을 바로 시작하세요.':'Continue from the most useful next step.'}</p></div></div><div class="v420-goals">${goals.map(goal=>`<button class="v420-goal" onclick="${goal.action}"><span class="v420-goal-icon">${goal.icon}</span><span class="v420-goal-copy"><b>${esc(goal.title)}</b><small>${esc(goal.detail)}</small></span><strong>→</strong></button>`).join('')}</div></section>`;
  }
  window.editProfileName=function(){
    const ko=S.lang==='ko';
    overlay(`<h3>${ko?'프로필 이름':'Profile name'}</h3><p>${ko?'이 기기에만 저장됩니다.':'Saved only on this device.'}</p><input id="v420-name-input" maxlength="20" value="${esc(P.name)}" style="width:100%;height:48px;margin:14px 0;border:1.5px solid var(--line);border-radius:15px;padding:0 13px;font:inherit"><div class="grid2"><button class="btn ghost" onclick="closeOverlay()">${ko?'취소':'Cancel'}</button><button class="btn" onclick="saveProfileName()">${ko?'저장':'Save'}</button></div>`);
    setTimeout(()=>{const input=document.getElementById('v420-name-input');if(input){input.focus();input.select()}},0);
  };
  window.saveProfileName=function(){const input=document.getElementById('v420-name-input'),value=input&&input.value.trim();if(!value)return;P.name=value.slice(0,20);persist();closeOverlay();renderProfile()};
  window.renderProfile=function(){
    S.screen='profile';save();
    const ko=S.lang==='ko',summary=myLearningSummary(),draft=typeof hasLessonProgress==='function'&&hasLessonProgress();
    app.innerHTML=`<div class="screen">${canonicalBrand()}<div class="scroll my-overview"><div class="simple-head"><h2>${ko?'마이':'My'}</h2><p>${ko?'Python 학습 기록':'Your Python learning'}</p></div><section class="card my-progress-card"><div class="my-progress-head"><h3>${ko?'전체 진도':'Your progress'}</h3><strong>${summary.done}<span> / ${summary.total} ${ko?'레슨':'lessons'}</span></strong></div><div class="my-progress-track" role="progressbar" aria-label="${ko?'레슨 완료율':'Lesson completion'}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${summary.percent}"><span style="width:${summary.percent}%"></span></div><button type="button" class="btn" onclick="${draft?'resumeLesson()':'renderMap()'}">${draft?(ko?'저장한 학습 이어하기':'Resume saved lesson'):(ko?'학습 지도 열기':'Open learning path')} →</button></section>${summary.missed?`<section class="card my-review-card"><div><h3>${ko?'다시 볼 문제':'To revisit'} <span>${summary.missed}</span></h3><p>${ko?'틀렸던 문제를 다시 풀며 확인해요.':'Revisit questions you missed.'}</p></div><button type="button" class="btn ghost" onclick="renderReview()">${ko?'오답 복습':'Review mistakes'} →</button></section>`:''}${weekCard()}<details class="card my-records"><summary>${ko?'학습 기록 자세히':'Learning records'}</summary>${masteryCard()}<button type="button" class="text-link" onclick="renderReview()">${ko?'복습 기록 보기':'Review history'} →</button><button type="button" class="text-link" onclick="renderAchievements()">${ko?'업적 보기':'Achievements'} →</button><p class="my-local-note">${ko?'기록은 현재 브라우저에 저장돼요.':'Records are saved in this browser.'}</p></details><details class="card my-settings"><summary>${ko?'설정':'Settings'}</summary><button type="button" class="my-settings-row" onclick="renderRoom()">${ko?'캐릭터 바꾸기':'Change character'} <span>→</span></button><button type="button" class="my-settings-row" onclick="editProfileName()">${ko?'이름 수정':'Edit name'} <span>→</span></button></details></div>${canonicalTabs()}</div>`;
    document.documentElement.dataset.profileRenderer='canonical-v420';
    document.documentElement.dataset.navigation='phase1-five-tabs';
  };
  window.__MEOWDE_CANONICAL_PROFILE_RENDERER__=window.renderProfile;
  document.title='Meowde — Profile';
  window.__MEOWDE_VERSION__=VERSION;
  if(S.screen==='profile')renderProfile();
})();
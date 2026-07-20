(function applyMeowdeV420Profile(){
  const KEY='meowde-v420-profile';
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
  function dateKey(date){const y=date.getFullYear(),m=String(date.getMonth()+1).padStart(2,'0'),d=String(date.getDate()).padStart(2,'0');return `${y}-${m}-${d}`}
  function weekDays(){
    const activity=new Set(Array.isArray(S.activityDates)?S.activityDates:[]),today=dateKey(new Date()),labels=S.lang==='ko'?['일','월','화','수','목','금','토']:['S','M','T','W','T','F','S'];
    return Array.from({length:7},(_,offset)=>{const date=new Date();date.setHours(12,0,0,0);date.setDate(date.getDate()-(6-offset));const key=dateKey(date);return {key,label:labels[date.getDay()],active:activity.has(key),today:key===today}});
  }
  function unitRows(){
    const names=S.lang==='ko'?['Python 기초','조건과 반복','함수와 프로젝트']:['Python Basics','Control & Loops','Functions & Projects'];
    return [0,1,2].map(unit=>{const start=unit*10,end=Math.min(start+10,lessons().length),total=Math.max(0,end-start);let done=0;for(let i=start;i<end;i++)if(Array.isArray(S.done)&&S.done.includes(i))done++;return {name:names[unit],done,total,percent:total?Math.round(done/total*100):0}});
  }
  function insightData(){
    const review=readJSON('meowde-v417-review'),mentor=window.MeowMentor&&MeowMentor.state?MeowMentor.state:readJSON('meowde-v418-mentor'),a=achievementState();
    const mistakes=(Array.isArray(S.mistakes)?S.mistakes:[]).filter(item=>item&&item.lang===S.lang).length;
    const hints=Object.values(mentor.hints||{}).reduce((sum,value)=>sum+(Number(value)||0),0);
    const patterns=mentor.patterns||{},top=Object.keys(patterns).sort((x,y)=>(Number(patterns[y])||0)-(Number(patterns[x])||0))[0]||'';
    const patternLabels={debugging:S.lang==='ko'?'디버깅':'Debugging',syntax:S.lang==='ko'?'문법':'Syntax',prediction:S.lang==='ko'?'실행 결과 예측':'Prediction','code-writing':S.lang==='ko'?'코드 작성':'Code writing',general:S.lang==='ko'?'기본 문제':'General'};
    return {mistakes,hints,reviews:Array.isArray(review.history)?review.history.length:0,best:Number(a.bestCorrectStreak)||0,noHints:Number(a.noHintWins)||0,top:top?patternLabels[top]||top:''};
  }
  function statsGrid(){
    const ko=S.lang==='ko',daily=S.dailyHistory&&typeof S.dailyHistory==='object'?Object.keys(S.dailyHistory).length:0;
    const items=[[S.done.length,ko?'완료 레슨':'Lessons'],[Number(S.streak)||0,ko?'연속 학습일':'Day streak'],[daily,ko?'Daily 완료':'Dailies'],[unlockedCount(),ko?'달성 업적':'Badges']];
    return `<div class="v420-stat-grid">${items.map(item=>`<div class="v420-stat"><b>${item[0]}</b><span>${item[1]}</span></div>`).join('')}</div>`;
  }
  function weekCard(){
    const ko=S.lang==='ko',days=weekDays(),active=days.filter(day=>day.active).length;
    return `<section class="card"><div class="v420-card-title"><div><h3>${ko?'최근 7일':'Last 7 days'}</h3><p>${ko?'학습한 날이 자동으로 기록됩니다.':'Your study days are recorded automatically.'}</p></div><span class="pill">${active}/7</span></div><div class="v420-week">${days.map(day=>`<div class="v420-day ${day.active?'active':''} ${day.today?'today':''}"><span>${day.active?'✓':'·'}</span><small>${day.label}</small></div>`).join('')}</div></section>`;
  }
  function masteryCard(){
    const ko=S.lang==='ko';
    return `<section class="card"><div class="v420-card-title"><div><h3>${ko?'학습 숙련도':'Learning mastery'}</h3><p>${ko?'유닛별 완료 비율입니다.':'Completion by learning unit.'}</p></div></div><div class="v420-mastery-list">${unitRows().map(unit=>`<div class="v420-mastery-row"><div class="v420-mastery-head"><span>${esc(unit.name)}</span><span>${unit.done}/${unit.total} · ${unit.percent}%</span></div><div class="v420-mastery-bar"><span style="width:${unit.percent}%"></span></div></div>`).join('')}</div></section>`;
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
    const ko=S.lang==='ko',info=levelInfo(),badge=featuredBadge(),badgeTitle=badge?(ko?badge.titleKo:badge.titleEn):(ko?'대표 배지 없음':'No featured badge');
    app.innerHTML=`<div class="screen">${brand()}${stats()}<div class="scroll"><div class="simple-head"><h2>${ko?'프로필':'Profile'}</h2><p>${ko?'학습 진도와 성장 기록을 한곳에서 확인하세요.':'See progress, growth, and practice history in one place.'}</p></div><section class="v420-profile-hero"><div class="v420-profile-top"><div class="v420-avatar">${catSVG(S.cat,'happy',92)}<span class="v420-avatar-level">${info.level}</span></div><div class="v420-profile-copy"><div class="v420-profile-name-row"><h2>${esc(P.name)}</h2><button class="v420-edit-name" onclick="editProfileName()">✎</button></div><div class="v420-profile-title">Lv.${info.level} ${esc(info.title)}</div><div class="v420-featured"><span>${badge?badge.icon:'🔒'}</span><span>${esc(badgeTitle)}</span></div></div></div><div class="v420-level-track"><span style="width:${info.percent}%"></span></div><div class="v420-level-meta"><span>${info.current} XP</span><span>${info.target-info.current} XP ${ko?'후 레벨업':'to level up'}</span></div><div class="v420-profile-actions"><button class="btn ghost" onclick="renderAchievements()">🏅 ${ko?'업적':'Achievements'}</button><button class="btn ghost" onclick="renderRoom()">🐱 ${ko?'고양이':'Cat room'}</button></div></section><section class="card">${statsGrid()}</section>${weekCard()}${masteryCard()}${insightCard()}${goalsCard()}</div>${tabs('profile')}</div>`;
  };
  tabs=function(active){return `<div class="tabbar"><button class="${active==='home'?'on':''}" onclick="renderHome()">${icon('home')}<span>${t('home')}</span></button><button class="${active==='map'?'on':''}" onclick="renderMap()">${icon('map')}<span>${t('map')}</span></button><button class="${active==='league'?'on':''}" onclick="renderLeague()">${icon('league')}<span>${t('league')}</span></button><button class="${active==='room'?'on':''}" onclick="renderRoom()">${icon('room')}<span>${t('room')}</span></button><button class="${active==='profile'?'on':''}" onclick="renderProfile()">${icon('cat')}<span>${S.lang==='ko'?'프로필':'Profile'}</span></button></div>`};
  document.title='Meowde v4.20 — Player Profile';
  window.__MEOWDE_VERSION__='4.20';
  if(S.screen==='profile')renderProfile();
  else if(['home','map','league','room','review','achievements'].includes(S.screen)){const rerender={home:renderHome,map:renderMap,league:renderLeague,room:renderRoom,review:renderReview,achievements:renderAchievements}[S.screen];if(typeof rerender==='function')rerender()}
})();
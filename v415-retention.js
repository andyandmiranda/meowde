(function applyMeowdeV415Retention(){
  const STORAGE_KEY='meowde-v415-retention';
  const DAILY_XP_TARGET=20;
  const CHEST_REWARD=25;

  function todayKey(){
    if(typeof meowdeTodayKey==='function')return meowdeTodayKey();
    const now=new Date();
    const y=now.getFullYear();
    const m=String(now.getMonth()+1).padStart(2,'0');
    const d=String(now.getDate()).padStart(2,'0');
    return `${y}-${m}-${d}`;
  }

  function readRetention(){
    try{
      const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');
      return parsed&&typeof parsed==='object'?parsed:{};
    }catch(error){
      console.warn('Meowde v4.15 retention state was reset:',error);
      return {};
    }
  }

  const R=readRetention();
  R.days=R.days&&typeof R.days==='object'?R.days:{};

  function saveRetention(){
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(R))}
    catch(error){console.warn('Meowde v4.15 could not save retention state:',error)}
  }

  function ensureDay(){
    const key=todayKey();
    if(!R.days[key]){
      R.days[key]={
        startXP:Number(S.xp)||0,
        startDone:Array.isArray(S.done)?S.done.length:0,
        chestClaimed:false
      };
      saveRetention();
    }
    return R.days[key];
  }

  function levelInfo(){
    const xp=Math.max(0,Number(S.xp)||0);
    const level=Math.floor(xp/100)+1;
    const current=xp%100;
    const titles=S.lang==='ko'
      ?['새싹 코더','호기심 탐험가','코드 메이커','코드 장인','Meow Master']
      :['Seed Coder','Curious Explorer','Code Maker','Code Artisan','Meow Master'];
    return {
      level,
      current,
      target:100,
      percent:Math.min(100,current),
      title:titles[Math.min(titles.length-1,level-1)]
    };
  }

  function missionState(){
    const day=ensureDay();
    const lessonDone=(Array.isArray(S.done)?S.done.length:0)>Number(day.startDone||0);
    const dailyDone=Boolean(S.dailyHistory&&S.dailyHistory[todayKey()]);
    const earned=Math.max(0,(Number(S.xp)||0)-Number(day.startXP||0));
    const xpDone=earned>=DAILY_XP_TARGET;
    return {day,lessonDone,dailyDone,xpDone,earned,complete:lessonDone&&dailyDone&&xpDone};
  }

  function missionRow(done,label,detail){
    return `<div class="v415-mission-row ${done?'done':''}"><span class="v415-check">${done?'✓':'○'}</span><span><b>${esc(label)}</b><small>${esc(detail)}</small></span></div>`;
  }

  function renderMissionCard(){
    const ko=S.lang==='ko';
    const m=missionState();
    const button=m.day.chestClaimed
      ?`<button class="btn ghost" disabled>${ko?'오늘 보상 수령 완료':'Reward claimed today'}</button>`
      :m.complete
        ?`<button class="btn butter v415-chest-ready" onclick="claimDailyChest()">🎁 ${ko?`보상 상자 열기 · +${CHEST_REWARD} 츄르`:`Open reward chest · +${CHEST_REWARD} Churu`}</button>`
        :`<button class="btn ghost" disabled>${ko?'미션 3개를 모두 완료하세요':'Complete all 3 missions'}</button>`;
    return `<section class="card v415-mission-card"><div class="section-title"><div><div class="section-kicker">${ko?'오늘의 미션':'Daily missions'}</div><h3>${ko?'세 가지 목표':'Three goals'}</h3></div><span class="pill">${[m.lessonDone,m.dailyDone,m.xpDone].filter(Boolean).length}/3</span></div><div class="v415-mission-list">${missionRow(m.lessonDone,ko?'레슨 1개 완료':'Complete 1 lesson',ko?'오늘 처음 완료한 레슨 기준':'First completion today')}${missionRow(m.dailyDone,ko?'오늘의 챌린지':'Daily challenge',ko?'1문제 챌린지 완료':'Finish the 1-task challenge')}${missionRow(m.xpDone,ko?'20 XP 획득':'Earn 20 XP',`${Math.min(m.earned,DAILY_XP_TARGET)} / ${DAILY_XP_TARGET} XP`)}</div>${button}</section>`;
  }

  function renderLevelCard(){
    const ko=S.lang==='ko';
    const info=levelInfo();
    return `<section class="card v415-level-card"><div class="v415-growth-head"><div class="growth-avatar">${catSVG(S.cat,'happy',76)}<span>${info.level}</span></div><div class="v415-growth-copy"><div class="section-kicker">${ko?'코치 성장':'Coach growth'}</div><h3>Lv.${info.level} ${esc(info.title)}</h3><p>${ko?`${100-info.current} XP 후 다음 레벨`:`${100-info.current} XP to next level`}</p></div></div><div class="v415-level-track"><span style="width:${info.percent}%"></span></div><div class="v415-level-meta"><span>${info.current} XP</span><span>100 XP</span></div></section>`;
  }

  function achievementItems(){
    const ko=S.lang==='ko';
    const dailyCount=S.dailyHistory&&typeof S.dailyHistory==='object'?Object.keys(S.dailyHistory).length:0;
    return [
      {icon:'🌱',name:ko?'첫 발자국':'First step',note:ko?'첫 레슨 완료':'Complete the first lesson',done:S.done.length>=1},
      {icon:'🔥',name:ko?'연속 학습':'Study streak',note:ko?'3일 연속 학습':'Reach a 3-day streak',done:Number(S.streak)>=3},
      {icon:'⭐',name:ko?'XP 수집가':'XP collector',note:'500 XP',done:Number(S.xp)>=500},
      {icon:'☀️',name:ko?'매일 한 문제':'Daily habit',note:ko?'Daily 7회 완료':'Complete 7 dailies',done:dailyCount>=7},
      {icon:'🏁',name:ko?'코드 여행자':'Code traveler',note:ko?'레슨 10개 완료':'Complete 10 lessons',done:S.done.length>=10},
      {icon:'👑',name:'Meow Master',note:ko?'전체 레슨 완료':'Complete every lesson',done:S.done.length>=lessons().length}
    ];
  }

  function renderAchievements(){
    const ko=S.lang==='ko';
    const items=achievementItems();
    const unlocked=items.filter(item=>item.done).length;
    return `<section class="card v415-achievement-card"><div class="section-title"><h3>${ko?'업적':'Achievements'}</h3><span class="pill">${unlocked}/${items.length}</span></div><div class="v415-badges">${items.map(item=>`<div class="v415-badge ${item.done?'unlocked':''}"><span>${item.icon}</span><b>${esc(item.name)}</b><small>${esc(item.note)}</small></div>`).join('')}</div></section>`;
  }

  window.claimDailyChest=function(){
    const m=missionState();
    if(!m.complete||m.day.chestClaimed)return;
    m.day.chestClaimed=true;
    S.churu=(Number(S.churu)||0)+CHEST_REWARD;
    saveRetention();
    save();
    toast(S.lang==='ko'?`보상 상자에서 츄르 ${CHEST_REWARD}개를 받았어요!`:`You received ${CHEST_REWARD} Churu!`);
    renderHome();
  };

  const baseStats=stats;
  stats=function(){
    const info=levelInfo();
    const html=baseStats();
    return html.replace('</div>',`<span class="pill v415-level-pill">Lv.${info.level} ${esc(info.title)}</span></div>`);
  };

  const baseRenderHome=renderHome;
  renderHome=function(){
    baseRenderHome();
    ensureDay();
    const scroll=document.querySelector('.screen>.scroll');
    if(!scroll)return;
    const cards=scroll.querySelectorAll(':scope > .card');
    if(cards.length){
      cards[0].insertAdjacentHTML('afterend',renderLevelCard()+renderMissionCard());
    }else{
      scroll.insertAdjacentHTML('beforeend',renderLevelCard()+renderMissionCard());
    }
  };

  const baseRenderMy=typeof renderMy==='function'?renderMy:null;
  if(baseRenderMy){
    renderMy=function(){
      baseRenderMy();
      const scroll=document.querySelector('.screen>.scroll');
      if(!scroll)return;
      const info=levelInfo();
      const ko=S.lang==='ko';
      const growth=`<section class="card v415-profile-growth"><div class="v415-growth-head"><div class="growth-avatar large">${catSVG(S.cat,'happy',92)}<span>${info.level}</span></div><div class="v415-growth-copy"><div class="section-kicker">${ko?'현재 칭호':'Current title'}</div><h3>${esc(info.title)}</h3><p>${ko?`총 ${S.xp} XP · ${S.streak}일 연속`:`${S.xp} XP total · ${S.streak} day streak`}</p></div></div><div class="v415-level-track"><span style="width:${info.percent}%"></span></div></section>`;
      const statsBlock=scroll.querySelector('.profile-stats');
      if(statsBlock)statsBlock.insertAdjacentHTML('afterend',growth+renderAchievements());
      else scroll.insertAdjacentHTML('beforeend',growth+renderAchievements());
    };
    renderRoom=renderMy;
  }

  const baseFinish=finish;
  finish=function(){
    baseFinish();
    saveRetention();
  };

  ensureDay();
  document.title='Meowde v4.15 — Learning Journey';
  window.__MEOWDE_VERSION__='4.15';
  if(S.screen==='my'&&typeof renderMy==='function')renderMy();
  else if(S.screen==='home'||!hasLessonProgress())renderHome();
})();

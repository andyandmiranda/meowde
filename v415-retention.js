(function applyMeowdeV415Retention(){
  const STORAGE_KEY='meowde-v415-retention';

  function readRetention(){
    try{
      const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');
      return parsed&&typeof parsed==='object'?parsed:{};
    }catch(error){
      console.warn('Meowde legacy retention state could not be read:',error);
      return {};
    }
  }

  const R=readRetention();
  R.days=R.days&&typeof R.days==='object'?R.days:{};

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

  const baseStats=stats;
  stats=function(){
    const info=levelInfo();
    const html=baseStats();
    return html.replace('</div>',`<span class="pill v415-level-pill">Lv.${info.level} ${esc(info.title)}</span></div>`);
  };

  const baseRenderMy=typeof renderMy==='function'?renderMy:null;
  if(baseRenderMy){
    renderMy=function(){
      baseRenderMy();
      const scroll=document.querySelector('.screen>.scroll');
      if(!scroll)return;
      const info=levelInfo();
      const ko=S.lang==='ko';
      const growth=`<section class="card v415-profile-growth"><div class="v415-growth-head"><div class="growth-avatar large">${catSVG(S.cat,'smug',92)}<span>${info.level}</span></div><div class="v415-growth-copy"><div class="section-kicker">${ko?'현재 칭호':'Current title'}</div><h3>${esc(info.title)}</h3><p>${ko?`총 ${S.xp} XP · ${S.streak}일 연속`:`${S.xp} XP total · ${S.streak} day streak`}</p></div></div><div class="v415-level-track"><span style="width:${info.percent}%"></span></div></section>`;
      const statsBlock=scroll.querySelector('.profile-stats');
      if(statsBlock)statsBlock.insertAdjacentHTML('afterend',growth+renderAchievements());
      else scroll.insertAdjacentHTML('beforeend',growth+renderAchievements());
    };
    renderRoom=renderMy;
  }

  // Phase 2: the former three-part Daily Mission system is now legacy-only.
  // Its localStorage record remains untouched for backup compatibility, but it no longer
  // creates day records, inserts Home cards, accrues a hidden chest, or owns a reward flow.
  window.MeowLegacyRetention=Object.freeze({
    activeDailyMissions:false,
    storageKey:STORAGE_KEY,
    state:R,
    levelInfo
  });

  document.documentElement.dataset.dailyMissionSystem='legacy';
  document.title='Meowde v4.15 — Learning Journey';
  window.__MEOWDE_VERSION__='4.15-phase2';
  if(S.screen==='my'&&typeof renderMy==='function')renderMy();
})();

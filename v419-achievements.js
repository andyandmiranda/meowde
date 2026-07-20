(function applyMeowdeV419Achievements(){
  const KEY='meowde-v419-achievements';
  function read(){
    try{const value=JSON.parse(localStorage.getItem(KEY)||'{}');return value&&typeof value==='object'?value:{}}
    catch(error){console.warn('Meowde v4.19 achievement state was reset:',error);return {}}
  }
  const A=read();
  A.unlocked=A.unlocked&&typeof A.unlocked==='object'?A.unlocked:{};
  A.currentCorrectStreak=Number(A.currentCorrectStreak)||0;
  A.bestCorrectStreak=Number(A.bestCorrectStreak)||0;
  A.noHintWins=Number(A.noHintWins)||0;
  A.featured=typeof A.featured==='string'?A.featured:'';

  const DEFINITIONS=[
    {id:'first-step',icon:'🐾',titleKo:'첫 발자국',titleEn:'First Step',descKo:'첫 번째 레슨을 완료하세요.',descEn:'Complete your first lesson.',xp:20,churu:5,test:()=>Array.isArray(S.done)&&S.done.length>=1},
    {id:'daily-one',icon:'☀️',titleKo:'오늘도 출석',titleEn:'Daily Check-in',descKo:'오늘의 챌린지를 처음 완료하세요.',descEn:'Complete your first daily challenge.',xp:20,churu:5,test:()=>S.dailyHistory&&Object.keys(S.dailyHistory).length>=1},
    {id:'no-hints',icon:'💡',titleKo:'스스로 해결',titleEn:'No Hints Needed',descKo:'힌트 없이 문제를 정답 처리하세요.',descEn:'Solve a problem without opening a hint.',xp:25,churu:8,test:()=>A.noHintWins>=1},
    {id:'steady-paws',icon:'🔥',titleKo:'꾸준한 발걸음',titleEn:'Steady Paws',descKo:'3일 연속 학습하세요.',descEn:'Build a 3-day learning streak.',xp:30,churu:10,test:()=>Number(S.streak)>=3},
    {id:'ten-in-row',icon:'⚡',titleKo:'정답 행진',titleEn:'Ten in a Row',descKo:'10문제를 연속으로 맞히세요.',descEn:'Answer 10 questions correctly in a row.',xp:50,churu:15,test:()=>A.bestCorrectStreak>=10},
    {id:'python-basics',icon:'🐍',titleKo:'Python 기초 졸업',titleEn:'Python Basics Graduate',descKo:'첫 번째 유닛의 10개 레슨을 완료하세요.',descEn:'Complete all 10 lessons in the first unit.',xp:80,churu:25,test:()=>{const total=Math.min(10,lessons().length);return total>0&&Array.from({length:total},(_,i)=>S.done.includes(i)).every(Boolean)}},
    {id:'master',icon:'🏆',titleKo:'Meowde 마스터',titleEn:'Meowde Master',descKo:'모든 레슨을 완료하고 골든 캣을 잠금 해제하세요.',descEn:'Complete every lesson and unlock Golden Cat.',xp:200,churu:50,test:()=>lessons().length>0&&S.done.length>=lessons().length}
  ];

  function persist(){
    try{localStorage.setItem(KEY,JSON.stringify(A))}
    catch(error){console.warn('Meowde v4.19 could not save achievements:',error)}
  }
  function definition(id){return DEFINITIONS.find(item=>item.id===id)}
  function isUnlocked(id){return Boolean(A.unlocked[id])}
  function title(item){return S.lang==='ko'?item.titleKo:item.titleEn}
  function description(item){return S.lang==='ko'?item.descKo:item.descEn}
  function unlockedCount(){return DEFINITIONS.filter(item=>isUnlocked(item.id)).length}
  function featured(){
    const selected=definition(A.featured);
    if(selected&&isUnlocked(selected.id))return selected;
    return DEFINITIONS.slice().reverse().find(item=>isUnlocked(item.id))||null;
  }
  function evaluate(notify){
    const newly=[];
    DEFINITIONS.forEach(item=>{
      if(!isUnlocked(item.id)&&item.test()){
        A.unlocked[item.id]={unlockedAt:new Date().toISOString(),xp:item.xp,churu:item.churu};
        S.xp=(Number(S.xp)||0)+item.xp;
        S.churu=(Number(S.churu)||0)+item.churu;
        if(!A.featured)A.featured=item.id;
        newly.push(item);
      }
    });
    if(newly.length){persist();save();if(notify&&typeof toast==='function')toast(S.lang==='ko'?`새 업적 ${newly.length}개 달성!`:`${newly.length} new achievement${newly.length>1?'s':''}!`)}
    return newly;
  }
  function mentorStage(ex){
    try{
      const state=window.MeowMentor&&window.MeowMentor.state;
      if(!state||!state.hints)return 0;
      const key=[S.lang,S.lessonIndex,ex&&ex.id||S.idx].join(':');
      return Number(state.hints[key])||0;
    }catch(error){return 0}
  }
  function badgeMarkup(item,size){
    const locked=!item||!isUnlocked(item.id);
    return `<span class="v419-badge ${locked?'locked':''} ${size||''}"><span>${item?item.icon:'🔒'}</span></span>`;
  }
  function achievementCard(item){
    const unlocked=isUnlocked(item.id),selected=A.featured===item.id,ko=S.lang==='ko';
    return `<button class="v419-achievement ${unlocked?'unlocked':'locked'} ${selected?'featured':''}" ${unlocked?`onclick="MeowAchievements.feature('${item.id}')"`:'disabled'}>
      ${badgeMarkup(item)}
      <span class="v419-achievement-copy"><b>${esc(title(item))}</b><small>${esc(description(item))}</small><span class="v419-reward">+${item.xp} XP · +${item.churu} ${ko?'츄르':'Churu'}</span></span>
      <span class="v419-state">${unlocked?(selected?(ko?'대표 배지':'Featured'):'✓'):'🔒'}</span>
    </button>`;
  }
  function summaryCard(){
    const ko=S.lang==='ko',count=unlockedCount(),item=featured(),percent=Math.round(count/DEFINITIONS.length*100);
    return `<section class="card v419-summary"><div class="v419-summary-head">${badgeMarkup(item,'large')}<div><div class="section-kicker">${ko?'업적 컬렉션':'Achievement collection'}</div><h3>${item?esc(title(item)):(ko?'첫 업적에 도전하세요':'Earn your first badge')}</h3><p>${count}/${DEFINITIONS.length} ${ko?'달성':'unlocked'}</p></div><span class="pill">${percent}%</span></div><div class="v419-progress"><span style="width:${percent}%"></span></div><button class="text-link" onclick="renderAchievements()">${ko?'업적 전체 보기':'View all achievements'} →</button></section>`;
  }

  window.renderAchievements=function(){
    S.screen='achievements';save();
    const ko=S.lang==='ko',count=unlockedCount();
    app.innerHTML=`<div class="screen">${brand()}${stats()}<div class="scroll"><div class="simple-head"><h2>${ko?'업적':'Achievements'}</h2><p>${ko?'학습 기록을 배지로 모으고 대표 배지를 선택하세요.':'Turn learning milestones into badges and choose a featured badge.'}</p></div><section class="card v419-overview"><div><b>${count}</b><span> / ${DEFINITIONS.length}</span><p>${ko?'달성한 업적':'Achievements unlocked'}</p></div><div><b>${A.bestCorrectStreak}</b><p>${ko?'최고 연속 정답':'Best answer streak'}</p></div></section><div class="v419-list">${DEFINITIONS.map(achievementCard).join('')}</div></div>${tabs('room')}</div>`;
  };
  window.MeowAchievements={
    state:A,
    definitions:DEFINITIONS,
    feature:function(id){if(!isUnlocked(id))return;A.featured=id;persist();toast(S.lang==='ko'?'대표 배지를 변경했어요.':'Featured badge updated.');renderAchievements()},
    evaluate:evaluate
  };

  const baseCatSVG=catSVG;
  catSVG=function(kind,mood,size){
    if(kind!=='d')return baseCatSVG(kind,mood,size);
    return baseCatSVG('c',mood,size)
      .replace(/#FFFDF8/g,'#FFF1B8')
      .replace(/#2F2B28/g,'#5A4314')
      .replace(/#96D9BD/g,'#FFD76A')
      .replace(/#DDF4FF/g,'#FFF7D6');
  };

  function decorateHome(){
    const scroll=document.querySelector('.screen>.scroll');
    if(scroll&&!scroll.querySelector('.v419-summary'))scroll.insertAdjacentHTML('beforeend',summaryCard());
  }
  function decorateRoom(){
    const ko=S.lang==='ko',head=document.querySelector('.simple-head'),grid=document.querySelector('.room-grid');
    if(head&&!document.querySelector('.v419-room-link'))head.insertAdjacentHTML('afterend',`<div class="v419-room-link"><button class="btn ghost" onclick="renderAchievements()">🏅 ${ko?'업적과 대표 배지':'Achievements & featured badge'}</button></div>`);
    if(grid&&!grid.querySelector('.v419-golden-cat')){
      const unlocked=isUnlocked('master');
      grid.insertAdjacentHTML('beforeend',`<div class="cat-card v419-golden-cat ${unlocked?'':'locked'}"><div class="cat-card-head">${catSVG('d','idle',88)}<div><h3>Golden Cat</h3><p>${unlocked?(ko?'모든 레슨 완료 보상':'Reward for completing every lesson'):(ko?'Meowde 마스터 업적으로 잠금 해제':'Unlock with the Meowde Master achievement')}</p></div></div><button class="btn ${unlocked&&S.cat==='d'?'':'ghost'}" ${unlocked?`onclick="S.cat='d';save();renderRoom()"`:'disabled'}>${unlocked?(S.cat==='d'?'Selected':t('select')):'🔒'}</button></div>`);
    }
  }

  const baseRenderHome=renderHome;
  renderHome=function(){evaluate(false);baseRenderHome();decorateHome()};
  const baseRenderRoom=renderRoom;
  renderRoom=function(){evaluate(false);baseRenderRoom();decorateRoom()};
  const baseCheckQ=checkQ;
  checkQ=async function(){
    const ex=typeof cur==='function'?cur():null,first=!S.checked;
    const noHint=first&&ex&&ex.type!=='concept'&&!S.hint&&mentorStage(ex)===0;
    await baseCheckQ();
    if(first&&ex&&ex.type!=='concept'){
      if(S.correct){A.currentCorrectStreak++;A.bestCorrectStreak=Math.max(A.bestCorrectStreak,A.currentCorrectStreak);if(noHint)A.noHintWins++}
      else A.currentCorrectStreak=0;
      persist();evaluate(true);
    }
  };
  const baseFinish=finish;
  finish=function(){
    const before=unlockedCount();
    baseFinish();
    const newly=evaluate(true);
    if(newly.length&&unlockedCount()>before){
      const reward=document.querySelector('.reward-screen');
      if(reward)reward.insertAdjacentHTML('beforeend',`<button class="v419-unlock-banner" onclick="renderAchievements()"><span>${newly[newly.length-1].icon}</span><div><b>${S.lang==='ko'?'새 업적 달성!':'Achievement unlocked!'}</b><p>${esc(title(newly[newly.length-1]))}</p></div><strong>→</strong></button>`);
    }
  };

  evaluate(false);
  document.title='Meowde v4.19 — Achievements';
  window.__MEOWDE_VERSION__='4.19';
  if(S.screen==='home')renderHome();
  else if(S.screen==='room')renderRoom();
  else if(S.screen==='achievements')renderAchievements();
})();

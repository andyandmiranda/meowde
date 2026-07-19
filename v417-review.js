(function applyMeowdeV417SmartReview(){
  const KEY='meowde-v417-review', BONUS_XP=10, BONUS_CHURU=5, LIMIT=4;
  function dayKey(){
    if(typeof meowdeTodayKey==='function')return meowdeTodayKey();
    const n=new Date(),y=n.getFullYear(),m=String(n.getMonth()+1).padStart(2,'0'),d=String(n.getDate()).padStart(2,'0');
    return y+'-'+m+'-'+d;
  }
  function read(){
    try{const value=JSON.parse(localStorage.getItem(KEY)||'{}');return value&&typeof value==='object'?value:{}}
    catch(error){console.warn('Meowde v4.17 review state was reset:',error);return {}}
  }
  const R=read();
  R.days=R.days&&typeof R.days==='object'?R.days:{};
  R.history=Array.isArray(R.history)?R.history:[];
  function persist(){
    try{localStorage.setItem(KEY,JSON.stringify(R))}
    catch(error){console.warn('Meowde v4.17 could not save review state:',error)}
  }
  function mistakes(){
    return (Array.isArray(S.mistakes)?S.mistakes:[])
      .filter(item=>item&&item.lang===S.lang&&lessons()[item.lessonIndex])
      .sort((a,b)=>(Number(b.count)||0)-(Number(a.count)||0)||String(b.lastWrongAt||'').localeCompare(String(a.lastWrongAt||'')));
  }
  function recommendations(){
    const selected=[];
    mistakes().forEach(item=>{
      if(selected.length>=LIMIT)return;
      const lesson=lessons()[item.lessonIndex];
      const exercise=lesson&&lesson.exercises.find(x=>x.id===item.exerciseId);
      if(exercise)selected.push({lessonIndex:item.lessonIndex,key:item.key,exercise});
    });
    if(selected.length<LIMIT){
      (Array.isArray(S.done)?S.done.slice().reverse():[]).forEach(lessonIndex=>{
        const lesson=lessons()[lessonIndex];
        if(!lesson)return;
        lesson.exercises.filter(x=>x.type!=='concept').forEach(exercise=>{
          if(selected.length>=LIMIT)return;
          if(!selected.some(item=>item.exercise.id===exercise.id&&item.lessonIndex===lessonIndex))selected.push({lessonIndex,key:'',exercise});
        });
      });
    }
    if(!selected.length){
      const lessonIndex=Math.max(0,Math.min(Number(S.next)||0,lessons().length-1));
      const lesson=lessons()[lessonIndex];
      if(lesson){
        lesson.exercises.filter(x=>x.type!=='concept').slice(0,LIMIT).forEach(exercise=>selected.push({lessonIndex,key:'',exercise}));
      }
    }
    return selected.slice(0,LIMIT);
  }
  function streak(){
    let count=0,cursor=new Date(dayKey()+'T12:00:00');
    while(true){
      const y=cursor.getFullYear(),m=String(cursor.getMonth()+1).padStart(2,'0'),d=String(cursor.getDate()).padStart(2,'0');
      if(!R.days[y+'-'+m+'-'+d])break;
      count++;cursor.setDate(cursor.getDate()-1);
    }
    return count;
  }
  function card(){
    const ko=S.lang==='ko',list=recommendations(),wrong=mistakes().length,done=Boolean(R.days[dayKey()]);
    const labels=list.slice(0,3).map(item=>{
      const lesson=lessons()[item.lessonIndex];
      return '<span>'+esc(lesson?lesson.title:'Meowde')+'</span>';
    }).join('');
    return '<section class="card v417-smart-card '+(done?'done':'')+'">'
      +'<div class="v417-smart-head"><div><div class="section-kicker">'+(ko?'맞춤 복습':'Smart review')+'</div><h3>'+(ko?'오늘의 추천 복습':'Today’s recommended review')+'</h3></div><span class="pill">'+(done?'✓':list.length+(ko?'문제':' tasks'))+'</span></div>'
      +'<p>'+(wrong?(ko?'자주 틀린 문제부터 자동으로 구성했습니다.':'Built automatically from your highest-priority mistakes.'):(ko?'완료한 레슨에서 기억을 유지할 문제를 골랐습니다.':'Selected from completed lessons to keep the material fresh.'))+'</p>'
      +'<div class="v417-review-tags">'+labels+'</div>'
      +'<div class="v417-review-stats"><div><b>'+wrong+'</b><small>'+(ko?'남은 오답':'mistakes')+'</small></div><div><b>'+streak()+'</b><small>'+(ko?'복습 연속일':'review streak')+'</small></div><div><b>'+R.history.length+'</b><small>'+(ko?'완료 기록':'sessions')+'</small></div></div>'
      +'<button class="btn '+(done?'ghost':'butter')+'" onclick="startSmartReview()">🧠 '+(done?(ko?'보상 없이 다시 복습':'Practice again'):(ko?'Smart Review 시작 · +10 XP':'Start Smart Review · +10 XP'))+'</button></section>';
  }
  window.startSmartReview=function(){
    const items=recommendations();
    if(!items.length)return toast(S.lang==='ko'?'복습할 문제가 아직 없습니다.':'No review tasks are available yet.');
    const queue=items.map(item=>Object.assign({},item.exercise,{__v417LessonIndex:item.lessonIndex,__v417MistakeKey:item.key}));
    R.active={startedAt:new Date().toISOString(),total:queue.length,firstCorrect:0,firstTotal:0};
    persist();
    startLesson(items[0].lessonIndex,false,queue,{mode:'smart-review'});
  };
  const baseCheckQ=checkQ;
  checkQ=async function(){
    const exercise=cur(),firstAttempt=!S.checked;
    await baseCheckQ();
    if(typeof meowdeMode!=='function'||meowdeMode()!=='smart-review'||!exercise||exercise.type==='concept'||!S.checked)return;
    if(firstAttempt&&R.active){R.active.firstTotal=(Number(R.active.firstTotal)||0)+1;if(S.correct)R.active.firstCorrect=(Number(R.active.firstCorrect)||0)+1}
    if(S.correct&&exercise.__v417MistakeKey&&typeof meowdeRemoveMistake==='function')meowdeRemoveMistake(exercise.__v417MistakeKey);
    persist();save();
  };
  const baseFinish=finish;
  finish=function(){
    const smart=typeof meowdeMode==='function'&&meowdeMode()==='smart-review';
    const key=dayKey(),first=smart&&!R.days[key],active=R.active||{};
    baseFinish();
    if(!smart)return;
    const accuracy=Math.round((Number(active.firstCorrect)||0)/Math.max(1,Number(active.firstTotal)||0)*100);
    if(first){S.xp=(Number(S.xp)||0)+BONUS_XP;S.churu=(Number(S.churu)||0)+BONUS_CHURU}
    R.days[key]=R.days[key]||{completedAt:new Date().toISOString(),accuracy,total:Number(active.total)||0,xp:first?BONUS_XP:0,churu:first?BONUS_CHURU:0};
    R.history.push({date:key,completedAt:new Date().toISOString(),accuracy,total:Number(active.total)||0});
    R.history=R.history.slice(-30);delete R.active;persist();save();
    const screen=document.querySelector('.reward-screen');
    if(screen){
      const title=screen.querySelector('h2');if(title)title.textContent=S.lang==='ko'?'Smart Review 완료':'Smart Review complete';
      const values=screen.querySelectorAll('.stat3 b');if(values[0])values[0].textContent='+'+(first?BONUS_XP:0);if(values[1])values[1].textContent='+'+(first?BONUS_CHURU:0);if(values[2])values[2].textContent=accuracy+'%';
      const note=screen.querySelector('.reward-note');if(note)note.textContent=first?(S.lang==='ko'?'오늘의 맞춤 복습 보상을 받았습니다.':'Today’s Smart Review reward has been added.'):(S.lang==='ko'?'오늘 보상은 이미 받았으며 복습 기록만 추가했습니다.':'Today’s reward was already claimed; this practice was recorded.');
    }
  };
  const baseRenderReview=renderReview;
  renderReview=function(){
    baseRenderReview();
    const scroll=document.querySelector('.screen>.scroll'),head=scroll&&scroll.querySelector('.simple-head');
    if(head)head.insertAdjacentHTML('afterend',card());
  };
  document.title='Meowde v4.17 — Smart Review';
  window.__MEOWDE_VERSION__='4.17';
  if(S.screen==='review')renderReview();
})();
(function applyMeowdeV414State(){
  const baseStartLesson=startLesson;

  function todayKey(){
    const now=new Date();
    const y=now.getFullYear();
    const m=String(now.getMonth()+1).padStart(2,'0');
    const d=String(now.getDate()).padStart(2,'0');
    return `${y}-${m}-${d}`;
  }

  function normalizeMode(){
    if(S.v414Mode)return S.v414Mode;
    if(S.daily)return 'daily';
    if(S.done.includes(S.lessonIndex))return 'review';
    return 'lesson';
  }

  function exerciseContext(exercise){
    const current=exercise||(typeof cur==='function'?cur():null);
    let taggedIndex;
    if(current&&current.__meowdeLessonIndex!==undefined)taggedIndex=current.__meowdeLessonIndex;
    else if(current&&current.__v417LessonIndex!==undefined)taggedIndex=current.__v417LessonIndex;
    const parsedIndex=Number(taggedIndex);
    const fallbackIndex=Math.max(0,Math.min(Number(S.lessonIndex)||0,lessons().length-1));
    const lessonIndex=Number.isInteger(parsedIndex)&&parsedIndex>=0&&parsedIndex<lessons().length
      ?parsedIndex
      :fallbackIndex;
    const mistakeKeyValue=current&&current.__meowdeMistakeKey!==undefined
      ?current.__meowdeMistakeKey
      :(current&&current.__v417MistakeKey!==undefined?current.__v417MistakeKey:'');
    return {
      lang:S.lang,
      lessonIndex,
      lesson:lessons()[lessonIndex]||null,
      exercise:current||null,
      exerciseId:current&&current.id?current.id:'',
      mistakeKey:mistakeKeyValue||''
    };
  }

  S.mistakes=Array.isArray(S.mistakes)?S.mistakes:[];
  S.dailyHistory=S.dailyHistory&&typeof S.dailyHistory==='object'?S.dailyHistory:{};
  S.activityDates=Array.isArray(S.activityDates)?S.activityDates:[];
  if(rawState&&rawState.inProgress){
    S.v414Mode=rawState.inProgress.mode||normalizeMode();
    S.v414DailyKey=rawState.inProgress.dailyKey||'';
    S.v414MistakeId=rawState.inProgress.mistakeId||'';
  }else{
    S.v414Mode='';
    S.v414DailyKey='';
    S.v414MistakeId='';
  }

  function v414Save(){
    const state={
      lang:S.lang,done:S.done,next:S.next,xp:S.xp,churu:S.churu,streak:S.streak,
      milk:S.milk,cat:S.cat,unit:S.unit,mistakes:S.mistakes,
      dailyHistory:S.dailyHistory,activityDates:S.activityDates
    };
    if(hasLessonProgress()){
      state.inProgress={
        lang:S.lang,lessonIndex:S.lessonIndex,idx:S.idx,queue:S.queue,
        combo:S.combo,maxCombo:S.maxCombo,firstTotal:S.firstTotal,
        firstCorrect:S.firstCorrect,xpEarned:S.xpEarned,daily:S.daily,
        sel:S.sel,fill:S.fill,checked:S.checked,correct:S.correct,
        hint:S.hint,output:S.output||'',write:S.write||'',
        mode:normalizeMode(),dailyKey:S.v414DailyKey||'',
        mistakeId:S.v414MistakeId||''
      };
    }
    try{localStorage.setItem('meowde-v410-state',JSON.stringify(state))}
    catch(error){console.warn('Meowde could not save progress:',error)}
  }
  save=v414Save;

  function mistakeKey(lang,index,id){return `${lang}:${index}:${id}`}
  function addMistake(lang,index,exercise){
    if(!exercise||!exercise.id)return;
    const key=mistakeKey(lang,index,exercise.id);
    const existing=S.mistakes.find(item=>item.key===key);
    if(existing){
      existing.count=(Number(existing.count)||1)+1;
      existing.lastWrongAt=new Date().toISOString();
    }else{
      S.mistakes.push({
        key,lang,lessonIndex:index,exerciseId:exercise.id,
        count:1,lastWrongAt:new Date().toISOString()
      });
    }
    S.mistakes=S.mistakes.slice(-40);
  }
  function removeMistake(key){S.mistakes=S.mistakes.filter(item=>item.key!==key)}

  function beginLesson(index,daily,queueOverride,options){
    const mode=options&&options.mode?options.mode:(daily?'daily':(S.done.includes(index)?'review':'lesson'));
    S.v414Mode=mode;
    S.v414DailyKey=options&&options.dailyKey?options.dailyKey:'';
    S.v414MistakeId=options&&options.mistakeId?options.mistakeId:'';
    const previousQueue=S.queue;
    baseStartLesson(index,daily,queueOverride);
    if(
      options&&typeof options.onStarted==='function'&&
      hasLessonProgress()&&S.queue!==previousQueue
    )options.onStarted();
  }

  window.__v414PendingStart=null;
  window.confirmPendingStart=function(){
    const pending=window.__v414PendingStart;
    window.__v414PendingStart=null;
    closeOverlay();
    if(pending)beginLesson(pending.index,pending.daily,pending.queueOverride,pending.options);
  };
  window.resumeCurrentLesson=function(){
    window.__v414PendingStart=null;
    closeOverlay();
    resumeLesson();
  };

  function showStartGuard(index,daily,queueOverride,options){
    const current=lessons()[S.lessonIndex];
    const target=lessons()[index];
    window.__v414PendingStart={index,daily,queueOverride,options};
    const title=S.lang==='ko'?'진행 중인 학습이 있어요':'A lesson is in progress';
    const copy=S.lang==='ko'
      ?`${current?current.title:'현재 레슨'}의 저장 지점을 유지할까요? 새 학습을 시작하면 현재 지점이 교체됩니다.`
      :`Keep your saved place in ${current?current.title:'the current lesson'}? Starting ${target?target.title:'a new lesson'} replaces it.`;
    overlay(`<div class="start-guard"><h3>${esc(title)}</h3><p>${esc(copy)}</p><button class="btn" onclick="resumeCurrentLesson()">${S.lang==='ko'?'현재 학습 이어하기':'Resume current lesson'}</button><button class="btn ghost" onclick="confirmPendingStart()">${S.lang==='ko'?'새 학습 시작':'Start new lesson'}</button></div>`);
  }

  startLesson=function(index,daily=false,queueOverride=null,options={}){
    const safeIndex=Math.max(0,Math.min(Number(index)||0,lessons().length-1));
    const mode=options.mode||(daily?'daily':(S.done.includes(safeIndex)?'review':'lesson'));
    if(hasLessonProgress()&&!options.force){
      const currentMode=normalizeMode();
      const sameLesson=S.lessonIndex===safeIndex&&currentMode===mode;
      if(sameLesson)return resumeLesson();
      return showStartGuard(safeIndex,daily,queueOverride,Object.assign({},options,{mode}));
    }
    beginLesson(safeIndex,daily,queueOverride,Object.assign({},options,{mode}));
  };

  function dateHash(value){
    let hash=0;
    for(let i=0;i<value.length;i++)hash=((hash<<5)-hash+value.charCodeAt(i))|0;
    return Math.abs(hash);
  }

  startDaily=function(){
    const key=todayKey();
    const pool=[];
    const maxAccessible=Math.min(
      lessons().length-1,
      Math.max(0,Number(S.next)||0)
    );

    lessons()
      .slice(0,maxAccessible+1)
      .forEach((lesson,lessonIndex)=>{
        const exercise=lesson.exercises.find(item=>item.type==='write')||lesson.exercises.find(item=>item.type!=='concept');
        if(exercise)pool.push({lessonIndex,exercise});
      });

    if(!pool.length)return;
    const picked=pool[dateHash(`${key}:${S.lang}`)%pool.length];
    startLesson(picked.lessonIndex,true,[picked.exercise],{mode:'daily',dailyKey:key});
  };

  window.startMistakeReview=function(lessonIndex,exerciseId){
    const lesson=lessons()[lessonIndex];
    if(!lesson)return;
    const exercise=lesson.exercises.find(item=>item.id===exerciseId);
    if(!exercise)return;
    const key=mistakeKey(S.lang,lessonIndex,exerciseId);
    startLesson(lessonIndex,false,[exercise],{mode:'mistake',mistakeId:key});
  };

  const baseCheckQ=checkQ;
  checkQ=async function(){
    const exercise=cur();
    const context=exerciseContext(exercise);
    const mode=normalizeMode();
    await baseCheckQ();
    if(!exercise||exercise.type==='concept'||!S.checked)return;
    if(!S.correct)addMistake(context.lang,context.lessonIndex,exercise);
    else if(mode==='mistake'&&S.v414MistakeId)removeMistake(S.v414MistakeId);
    save();
  };

  window.meowdeTodayKey=todayKey;
  window.meowdeMode=normalizeMode;
  window.meowdeExerciseContext=exerciseContext;
  window.meowdeAddMistake=addMistake;
  window.meowdeRemoveMistake=removeMistake;
})();
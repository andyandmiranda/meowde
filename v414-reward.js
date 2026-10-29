(function applyMeowdeV414Rewards(){
  function todayKey(){return typeof meowdeTodayKey==='function'?meowdeTodayKey():(new Date()).toISOString().slice(0,10)}
  function mode(){return typeof meowdeMode==='function'?meowdeMode():(S.daily?'daily':(S.done.includes(S.lessonIndex)?'review':'lesson'))}
  function recordActivity(key){
    if(!Array.isArray(S.activityDates))S.activityDates=[];
    if(!S.activityDates.includes(key))S.activityDates.push(key);
    S.activityDates=S.activityDates.slice(-120).sort();
    let streak=0;
    const cursor=new Date(`${key}T12:00:00`);
    while(true){
      const y=cursor.getFullYear(),m=String(cursor.getMonth()+1).padStart(2,'0'),d=String(cursor.getDate()).padStart(2,'0');
      if(!S.activityDates.includes(`${y}-${m}-${d}`))break;
      streak++;
      cursor.setDate(cursor.getDate()-1);
    }
    S.streak=Math.max(1,streak);
  }

  finish=function(){
    if(!hasLessonProgress())return;
    const previous=JSON.parse(JSON.stringify(S));
    const finishedLessonIndex=S.lessonIndex;
    const finishedExercise=cur();
    const currentMode=mode();
    const key=todayKey();
    const rawEarned=Math.max(0,Number(S.xpEarned)||0);
    const accuracy=Math.round((S.firstCorrect/Math.max(1,S.firstTotal))*100);
    const firstLessonCompletion=currentMode==='lesson'&&!S.done.includes(finishedLessonIndex);
    const firstDailyCompletion=currentMode==='daily'&&!S.dailyHistory[key];
    const grantsReward=firstLessonCompletion||firstDailyCompletion;
    const earned=grantsReward?rawEarned:0;
    const churuEarned=grantsReward?Math.max(1,Math.round(rawEarned/10)+Math.floor((Number(S.maxCombo)||0)/2)):0;

    // Drop only the completed session, atomically with its completion/reward.
    if(S.lessonResumes&&typeof S.lessonResumes==='object'&&!Array.isArray(S.lessonResumes)&&S.v414ResumeKey){
      const pending=Object.assign({},S.lessonResumes);
      delete pending[S.v414ResumeKey];
      S.lessonResumes=pending;
    }
    S.v414ResumeKey='';
    if(firstLessonCompletion){
      S.done.push(finishedLessonIndex);
      S.done.sort((a,b)=>a-b);
      S.next=lessons().findIndex((lesson,index)=>!S.done.includes(index));
      if(S.next<0)S.next=lessons().length-1;
    }
    if(currentMode==='daily'){
      S.dailyHistory[key]=S.dailyHistory[key]||{
        completedAt:new Date().toISOString(),lessonIndex:finishedLessonIndex,
        exerciseId:finishedExercise&&finishedExercise.id?finishedExercise.id:'',xp:earned,churu:churuEarned
      };
    }
    S.xp+=earned;
    S.churu+=churuEarned;
    recordActivity(key);
    clearLessonProgress();
    S.lessonIndex=finishedLessonIndex;
    S.v414Mode='';
    S.v414DailyKey='';
    S.v414MistakeId='';
    const completionSaved=save()!==false;
    if(!completionSaved){
      Object.keys(S).forEach(key=>{if(!Object.prototype.hasOwnProperty.call(previous,key))delete S[key]});
      Object.assign(S,previous);
      renderLesson();
      return;
    }

    const ko=S.lang==='ko';
    const treatLabel=ko?'츄르':'Churu';
    const titles={
      lesson:ko?'레슨 완료':'Lesson complete',
      daily:ko?'오늘의 연습 완료':'Daily practice complete',
      review:ko?'재학습 완료':'Review complete',
      mistake:ko?'오답 복습 완료':'Mistake review complete',
      'focused-review':ko?'집중 복습 완료':'Focused review complete'
    };
    const labels={
      daily:ko?'오늘의 1문제':'Today’s practice',
      mistake:ko?'오답 1문제':'One mistake task'
    };
    const doneLabel=labels[currentMode]||(lessons()[finishedLessonIndex]?lessons()[finishedLessonIndex].title:'Meowde');
    const nextAction=currentMode==='daily'?'renderHome()':(currentMode==='lesson'?'renderMap()':'renderReview()');
    const nextLabel=currentMode==='daily'?(ko?'홈으로':'Back home'):(currentMode==='lesson'?(ko?'학습 지도로':'Learning path'):(ko?'복습으로':'Back to review'));
    let note='';
    if(currentMode==='daily'&&!firstDailyCompletion)note=ko?'오늘의 연습 보상은 이미 받았어요. 이번 기록은 연습으로만 저장됩니다.':'Today’s practice reward was already earned. This run is saved as practice only.';
    else if(currentMode==='daily')note=ko?'오늘의 연습 보상은 하루 한 번만 지급돼요.':'Daily Practice rewards are granted once per day.';
    else if(currentMode==='review'||currentMode==='mistake'||currentMode==='focused-review')note=ko?'재학습은 진도와 보상을 중복 지급하지 않아요.':'Review practice does not duplicate progress or rewards.';
    else note=ko?'츄르는 학습을 막는 재화가 아니라 완료 보상이에요.':'Churu is a completion reward, not an energy gate.';

    app.innerHTML=`<div class="screen"><div class="reward-screen">${catSVG(S.cat,'happy',116)}<h2>${titles[currentMode]||titles.lesson}</h2><p class="pill">${esc(doneLabel)}</p><div class="stats3"><div class="stat3"><b>+${earned}</b><p>XP</p></div><div class="stat3"><b>+${churuEarned}</b><p>${treatLabel}</p></div><div class="stat3"><b>${accuracy}%</b><p>${t('accuracy')}</p></div></div><p class="reward-note">${esc(note)}</p></div>${completionSaved?'':'<div id="lesson-reward-save-alert" class="feedback no" role="alert">진도와 보상을 저장하지 못했어요. 이 화면을 유지하고 저장을 다시 시도해 주세요. <button class="btn" onclick="retryFinishedSave()">저장 다시 시도</button></div>'}<div class="lesson-foot"><button id="lesson-reward-continue" class="btn" ${completionSaved?'':'disabled'} onclick="${nextAction}">${nextLabel}</button></div></div>`;
  };

  document.title='Meowde v4.14 — Practice Memory';
  window.__MEOWDE_VERSION__='4.14-phase2';
})();

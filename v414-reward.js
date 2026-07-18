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

    if(firstLessonCompletion){
      S.done.push(finishedLessonIndex);
      S.done.sort((a,b)=>a-b);
      S.next=Math.min(lessons().length-1,S.done.length);
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
    save();

    const ko=S.lang==='ko';
    const treatLabel=ko?'츄르':'Churu';
    const titles={
      lesson:ko?'레슨 완료':'Lesson complete',
      daily:ko?'오늘의 챌린지 완료':'Daily challenge complete',
      review:ko?'재학습 완료':'Review complete',
      mistake:ko?'오답 복습 완료':'Mistake review complete'
    };
    const labels={
      daily:ko?'오늘의 1문제':'Today’s task',
      mistake:ko?'오답 1문제':'One mistake task'
    };
    const doneLabel=labels[currentMode]||(lessons()[finishedLessonIndex]?lessons()[finishedLessonIndex].title:'Meowde');
    const nextAction=currentMode==='daily'?'renderHome()':(currentMode==='lesson'?'renderMap()':'renderReview()');
    const nextLabel=currentMode==='daily'?(ko?'홈으로':'Back home'):(currentMode==='lesson'?(ko?'학습 지도로':'Learning path'):(ko?'복습으로':'Back to review'));
    let note='';
    if(currentMode==='daily'&&!firstDailyCompletion)note=ko?'오늘의 보상은 이미 받았어요. 연습 기록만 저장했습니다.':'Today’s reward was already claimed. This run was saved as practice.';
    else if(currentMode==='review'||currentMode==='mistake')note=ko?'재학습은 진도와 보상을 중복 지급하지 않아요.':'Review practice does not duplicate progress or rewards.';
    else note=ko?'츄르는 학습을 막는 재화가 아니라 완료 보상이에요.':'Churu is a completion reward, not an energy gate.';

    app.innerHTML=`<div class="screen"><div class="reward-screen">${catSVG(S.cat,'happy',116)}<h2>${titles[currentMode]||titles.lesson}</h2><p class="pill">${esc(doneLabel)}</p><div class="stats3"><div class="stat3"><b>+${earned}</b><p>XP</p></div><div class="stat3"><b>+${churuEarned}</b><p>${treatLabel}</p></div><div class="stat3"><b>${accuracy}%</b><p>${t('accuracy')}</p></div></div><p class="reward-note">${esc(note)}</p></div><div class="lesson-foot"><button class="btn" onclick="${nextAction}">${nextLabel}</button></div></div>`;
  };

  document.title='Meowde v4.14 — Practice Memory';
  window.__MEOWDE_VERSION__='4.14';
})();

(function applyMeowdeV414DailyLimit(){
  function dateHash(value){
    let hash=0;
    for(let i=0;i<value.length;i++)hash=((hash<<5)-hash+value.charCodeAt(i))|0;
    return Math.abs(hash);
  }

  startDaily=function(){
    const key=window.meowdeTodayKey?window.meowdeTodayKey():new Date().toISOString().slice(0,10);
    const pool=[];
    const allLessons=lessons();
    const maxAccessible=Math.min(allLessons.length-1,Math.max(0,Number(S.next)||0));

    allLessons.slice(0,maxAccessible+1).forEach((lesson,lessonIndex)=>{
      const exercise=lesson.exercises.find(item=>item.type==='write')||lesson.exercises.find(item=>item.type!=='concept');
      if(exercise)pool.push({lessonIndex,exercise});
    });

    if(!pool.length)return;
    const picked=pool[dateHash(`${key}:${S.lang}`)%pool.length];
    startLesson(picked.lessonIndex,true,[picked.exercise],{mode:'daily',dailyKey:key});
  };
})();

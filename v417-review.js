(function applyMeowdeV417SmartReview(){
  const STORAGE_KEY='meowde-v417-review';
  const BONUS_XP=10;
  const BONUS_CHURU=5;
  const MAX_REVIEW_ITEMS=4;

  function todayKey(){
    if(typeof meowdeTodayKey==='function')return meowdeTodayKey();
    const now=new Date();
    const y=now.getFullYear();
    const m=String(now.getMonth()+1).padStart(2,'0');
    const d=String(now.getDate()).padStart(2,'0');
    return `${y}-${m
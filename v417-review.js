(function applyMeowdeV417Review(){
  const STORAGE_KEY='meowde-v417-review';
  const BONUS_XP=10;
  const BONUS_CHURU=5;

  function todayKey(){
    if(typeof meowdeTodayKey==='function')return meowdeTodayKey();
    const now=new Date();
    const y=now.getFullYear();
    const m=String(now.getMonth()+1).padStart(2,'0');
    const d=String(now.getDate()).padStart(2,'0');
    return `${y}-${m}-${d}`;
  }

  function readState(){
    try{
      const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');
      return parsed&&typeof parsed==='object'?parsed:{};
    }catch(error){
      console.warn('Meowde v4.17 review state was reset:',error);
      return {};
    }
  }

  const R=readState();
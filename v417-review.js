(function applyMeowdeV417Review(){
  const STORAGE_KEY='meowde-v417-review';

  function todayKey(){
    if(typeof meowdeTodayKey==='function')return meowdeTodayKey();
    return new Date().toISOString().slice(0,10);
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
  R.days=R.days&&typeof R.days==='object'?R.days:{};
  R.history=Array.isArray(R.history)?R.history:[];

  function saveReview(){
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(R))}
    catch(error){console.warn('Meowde v4
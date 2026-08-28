(function applyMeowdePlayfulReactions(){
  "use strict";

  const KO={
    correct:["잠깐. 우리 좀 잘하는데?","응, 이건 알 줄 알았어.","깔끔해. 버그도 조용히 퇴근했어.","정답. 키보드가 본인 공이라고 주장 중."],
    wrong:["이건 문제 쪽이 조금 수상해.","괜찮아. 디버깅 탐정 모드로 가자.","살짝 비껴갔어. 다시 맞추면 돼.","코드가 잠깐 낮잠 잤네."],
    streak:["연속 정답. 분위기 탔다.","콤보 유지. 지금 꽤 멋있어.","이 정도면 키보드가 먼저 눈치챘어.","정답 행진. 그대로 가자."]
  };
  const EN={
    correct:["Okay, that was clean.","Correct. The keyboard wants partial credit.","Nice. The bug quietly left.","We knew that one."],
    wrong:["The question looks a little suspicious.","Tiny miss. Debug mode on.","Close. The code took a catnap.","Try that one more time."],
    streak:["Streak. We have momentum.","Combo maintained. Looking sharp.","The keyboard already knew.","Keep shipping."]
  };

  function state(){try{return typeof S!=="undefined"&&S?S:null}catch(error){return null}}
  function hash(text){let value=2166136261;for(let index=0;index<text.length;index++){value^=text.charCodeAt(index);value=Math.imul(value,16777619)}return value>>>0}
  function pick(pool,key){return pool[hash(String(key))%pool.length]}
  function questionKey(){
    const current=state();
    const exercise=typeof window.cur==="function"?window.cur():null;
    return [exercise&&exercise.id||"concept",Number(current&&current.lessonIndex)||0,Number(current&&current.idx)||0,Boolean(current&&current.correct)].join(":");
  }
  function streakCount(){
    const current=state();
    if(!current)return 0;
    const candidates=[current.correctStreak,current.combo,current.sessionStreak];
    const found=candidates.find(value=>Number.isFinite(Number(value)));
    return Number(found)||0;
  }
  function currentMood(){
    const current=state();
    if(!current||!current.checked)return "focus";
    if(!current.correct)return "wrong";
    return streakCount()>=3?"streak":"correct";
  }
  function reaction(){
    const current=state();
    const copy=current&&current.lang==="en"?EN:KO;
    const mood=currentMood();
    if(mood==="wrong")return pick(copy.wrong,questionKey());
    if(mood==="streak")return pick(copy.streak,questionKey());
    if(mood==="correct")return pick(copy.correct,questionKey());
    return "";
  }

  // Phase 4: playful copy remains available to the canonical feedback owner,
  // but this layer no longer injects text or runs idle character animations.
  window.meowdePlayful=Object.freeze({version:"4.37-phase4",reaction,mood:currentMood});
  document.documentElement.dataset.lessonPlayfulness="feedback-only";
})();
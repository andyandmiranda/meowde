(function applyMeowdePlayfulReactions(){
  "use strict";

  const KO={
    correct:["잠깐. 우리 좀 잘하는데?","응, 이건 알 줄 알았어.","깔끔해. 버그도 조용히 퇴근했어.","정답. 키보드가 본인 공이라고 주장 중."],
    wrong:["이건 문제 쪽이 조금 수상해.","괜찮아. 디버깅 탐정 모드로 가자.","살짝 비껴갔어. 다시 맞추면 돼.","코드가 잠깐 낮잠 잤네."],
    streak:["연속 정답. 분위기 탔다.","콤보 유지. 지금 꽤 멋있어.","이 정도면 키보드가 먼저 눈치챘어.","정답 행진. 그대로 가자."],
    concept:["천천히 읽어도 돼. 자리 비워뒀어.","집중 모드. 아는 척은 내가 할게.","개념 한 스푼, 츄르 한 스푼.","CPU도 생각할 땐 잠깐 멈춰."],
    rare:["✨ 전설의 냥발 코딩 모드 발동.","🌟 고양이가 3초 동안 장난을 멈췄어.","💫 레전더리 집중력 등장."]
  };

  const EN={
    correct:["Okay, that was clean.","Correct. The keyboard wants partial credit.","Nice. The bug quietly left.","We knew that one."],
    wrong:["The question looks a little suspicious.","Tiny miss. Debug mode on.","Close. The code took a catnap.","Try that one more time."],
    streak:["Streak. We have momentum.","Combo maintained. Looking sharp.","The keyboard already knew.","Keep shipping."],
    concept:["Take your time. Your seat is saved.","Focus mode. I will do the pretending.","One concept, one Churu.","Even CPUs pause to think."],
    rare:["✨ Legendary paw-coding mode.","🌟 The cat stopped causing bugs for three seconds.","💫 Rare focus event unlocked."]
  };

  const IDLE_ACTIONS=["blink","stretch","look"];
  const IDLE_CLASS_PREFIX="is-idle-";
  const IDLE_DELAY_MIN=6500;
  const IDLE_DELAY_MAX=12500;
  let idleTimer=null;

  function state(){try{return typeof S!=="undefined"&&S?S:null}catch(error){return null}}
  function appRoot(){try{return typeof app!=="undefined"&&app&&app.querySelector?app:document}catch(error){return document}}
  function hash(text){let value=2166136261;for(let index=0;index<text.length;index+=1){value^=text.charCodeAt(index);value=Math.imul(value,16777619)}return value>>>0}
  function pick(pool,key){return pool[hash(String(key))%pool.length]}

  function questionKey(){
    const current=state();
    const exercise=typeof window.cur==="function"?window.cur():null;
    return [exercise&&exercise.id?exercise.id:"concept",Number(current&&current.lessonIndex)||0,Number(current&&current.idx)||0,Boolean(current&&current.correct)].join(":");
  }

  function streakCount(){
    const current=state();
    if(!current)return 0;
    const candidates=[current.correctStreak,current.streak,current.combo,current.sessionStreak];
    const found=candidates.find(value=>Number.isFinite(Number(value)));
    return Number(found)||0;
  }

  function isRareEvent(key){return hash(`${key}:legendary`)%97===0}

  function currentMood(){
    const current=state();
    if(!current)return "idle";
    if(current.checked&&!current.correct)return "sad";
    if(current.checked&&current.correct&&streakCount()>=3)return "party";
    if(current.checked&&current.correct)return "happy";
    if(current.screen==="lesson")return "focus";
    return "idle";
  }

  function reaction(){
    const current=state();
    const copy=current&&current.lang==="en"?EN:KO;
    const key=questionKey();
    if(isRareEvent(key))return pick(copy.rare,key);
    if(!current||!current.checked)return pick(copy.concept,key);
    if(!current.correct)return pick(copy.wrong,key);
    if(streakCount()>=3)return pick(copy.streak,key);
    return pick(copy.correct,key);
  }

  function clearIdleClasses(coach){IDLE_ACTIONS.forEach(action=>coach.classList.remove(`${IDLE_CLASS_PREFIX}${action}`))}

  function scheduleIdleBehavior(){
    if(idleTimer)window.clearTimeout(idleTimer);
    const delay=IDLE_DELAY_MIN+Math.floor(Math.random()*(IDLE_DELAY_MAX-IDLE_DELAY_MIN));
    idleTimer=window.setTimeout(()=>{
      const current=state();
      const coach=appRoot().querySelector(".coach");
      if(!coach||document.hidden||(current&&current.checked)){scheduleIdleBehavior();return}
      clearIdleClasses(coach);
      const action=IDLE_ACTIONS[Math.floor(Math.random()*IDLE_ACTIONS.length)];
      const className=`${IDLE_CLASS_PREFIX}${action}`;
      coach.classList.add(className);
      window.setTimeout(()=>coach.classList.remove(className),1100);
      scheduleIdleBehavior();
    },delay);
  }

  function decorateLesson(){
    const current=state();
    if(!current)return;
    const root=appRoot();
    const coach=root.querySelector(".coach");
    if(coach){
      coach.dataset.mood=currentMood();
      coach.classList.toggle("is-correct",Boolean(current.checked&&current.correct));
      coach.classList.toggle("is-wrong",Boolean(current.checked&&!current.correct));
      coach.classList.toggle("is-streak",Boolean(current.checked&&current.correct&&streakCount()>=3));
    }
    const copy=reaction();
    const bubble=root.querySelector(".coach .bubble");
    if(bubble){
      let line=bubble.querySelector(".v425-reaction");
      if(!line){line=document.createElement("div");line.className="v425-reaction";bubble.appendChild(line)}
      line.textContent=copy;
    }
    const feedback=root.querySelector(".feedback");
    if(feedback){
      let line=feedback.querySelector(".v425-punchline");
      if(!line){line=document.createElement("div");line.className="v425-punchline";const button=feedback.querySelector("button");feedback.insertBefore(line,button||null)}
      line.textContent=copy;
    }
  }

  const baseRenderLesson=window.renderLesson;
  if(typeof baseRenderLesson==="function"){
    window.renderLesson=function renderLessonPlayful(){baseRenderLesson.apply(this,arguments);decorateLesson();scheduleIdleBehavior()};
  }

  window.meowdePlayful={version:"4.37",reaction,mood:currentMood,decorateLesson,scheduleIdleBehavior,isRareEvent};
  scheduleIdleBehavior();
  const current=state();
  if(current&&current.screen==="lesson"&&typeof window.renderLesson==="function")window.renderLesson();
})();

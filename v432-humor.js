(function applyMeowdeV432Humor(){
  "use strict";

  const KO={
    correct:["응, 이건 알 줄 알았어.","좋아. 방금 좀 멋있었어.","정답. 고양이는 놀라지 않은 척하는 중.","깔끔해. 코드도 자세 고쳐 앉았어."],
    streak:["잠깐. 우리 좀 잘하는데?","연속 정답. 분위기 탔다.","이 정도면 키보드가 먼저 긴장하겠다.","그대로 가. 흐름 좋다."],
    wrong:["괜찮아. 어디서 갈렸는지만 보면 돼.","살짝 비껴갔어. 설명 보고 다음에 다시 잡자.","한 번 삐끗. 핵심만 확인하고 계속 가자.","다시 보면 보여. 지금은 이유부터 확인하자."]
  };
  const EN={
    correct:["Yeah, I knew you had that.","Nice. That was quietly impressive.","Correct. The cat is pretending not to be surprised.","Clean. Even the code sat up straighter."],
    streak:["Wait. We are actually good at this.","Streak mode. Keep the momentum.","Your keyboard looks nervous now.","Keep going. The rhythm is good."],
    wrong:["No problem. Find where the reasoning split.","Tiny miss. Read the explanation and catch it next time.","One slip. Check the key idea and keep moving.","Look again later. For now, focus on why."]
  };

  function hash(text){let value=2166136261;for(let i=0;i<text.length;i++){value^=text.charCodeAt(i);value=Math.imul(value,16777619)}return value>>>0}
  function pick(pool,key){return pool[hash(String(key))%pool.length]}
  function key(){const ex=typeof window.cur==="function"?cur():null;return [ex&&ex.id||"none",S.lessonIndex||0,S.idx||0,S.correct?1:0].join(":")}
  function streak(){const values=[S.correctStreak,S.combo,S.sessionStreak,window.MeowAchievements&&MeowAchievements.state&&MeowAchievements.state.currentCorrectStreak];return Number(values.find(v=>Number.isFinite(Number(v))))||0}
  function state(){if(!S.checked)return "idle";if(!S.correct)return "wrong";if(streak()>=3)return "streak";return "correct"}
  function copy(){return S.lang==="en"?EN:KO}
  function line(type=state()){
    if(type==="idle")return "";
    return pick(copy()[type]||copy().correct,`${key()}:${type}`);
  }

  function showOfflineChip(message){
    document.querySelectorAll(".v432-offline-chip").forEach(node=>node.remove());
    const node=document.createElement("div");
    node.className="v432-offline-chip";
    node.textContent=message;
    document.body.appendChild(node);
    setTimeout(()=>node.remove(),2200);
  }

  // Phase 5: this layer owns copy/error helpers only. The canonical v4.13
  // lesson renderer reads MeowHumor.line() directly and owns all Lesson DOM.
  const baseCheckQ=window.checkQ;
  if(typeof baseCheckQ==="function")window.checkQ=async function(){
    try{
      await baseCheckQ.apply(this,arguments);
    }catch(error){
      console.error("Meowde answer check failed:",error);
      showOfflineChip(S.lang==="ko"?"연결이 불안정해요. 잠시 후 다시 시도해 주세요.":"Connection issue. Please try again.");
      throw error;
    }
  };

  window.addEventListener("offline",()=>showOfflineChip(S&&S.lang==="en"?"Offline mode":"오프라인 모드"));
  window.addEventListener("online",()=>showOfflineChip(S&&S.lang==="en"?"Back online":"다시 연결됐어요"));

  window.MeowHumor=Object.freeze({line,state,showOfflineChip});
  document.documentElement.dataset.lessonReactionOwner="canonical-v413";
  window.__MEOWDE_VERSION__="4.32-phase5";
})();
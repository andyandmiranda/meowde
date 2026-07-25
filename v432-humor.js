(function applyMeowdeV432Humor(){
  "use strict";

  const KO={
    idle:["자리 비워뒀어. 천천히 와.","오늘 할 일? 거의 다 치우면 돼.","모르면 물어봐. 아는 척은 내가 할게.","집중 중. 간식 얘기는 나중에."],
    correct:["응, 이건 알 줄 알았어.","좋아. 방금 좀 멋있었어.","정답. 고양이는 놀라지 않은 척하는 중.","깔끔해. 코드도 자세 고쳐 앉았어."],
    streak:["잠깐. 우리 좀 잘하는데?","연속 정답. 선글라스 내려도 되겠어.","이 정도면 키보드가 먼저 긴장하겠다.","분위기 탔다. 그대로 가."],
    wrong:["이건 문제 쪽이 조금 수상해.","괜찮아. 방금 건 예고편이었어.","한 번 삐끗. 기록에는 별일 없던 걸로.","다시 보면 보여. 내가 옆에서 째려볼게."],
    reward:["오늘 할 일? 거의 다 치웠지.","좋아. 보상 챙기고 다음으로.","한 걸음 완료. 생각보다 꽤 컸어.","수고했어. 고양이도 인정."]
  };

  const EN={
    idle:["Your seat was saved.","Today's plan: clear a few things, casually.","Ask if needed. I will pretend I knew it first.","Focus mode. Snacks later."],
    correct:["Yeah, I knew you had that.","Nice. That was quietly impressive.","Correct. The cat is pretending not to be surprised.","Clean. Even the code sat up straighter."],
    streak:["Wait. We are actually good at this.","Streak mode. Sunglasses may come down.","Your keyboard looks nervous now.","Momentum acquired. Keep going."],
    wrong:["This question looks slightly suspicious.","It is fine. That was the trailer.","Tiny miss. We are not making it dramatic.","Look again. I will side-eye it with you."],
    reward:["Today's list? Mostly handled.","Nice. Claim it and move on.","One step done. Bigger than it looked.","Good work. Cat-approved."]
  };

  function hash(text){let value=2166136261;for(let i=0;i<text.length;i++){value^=text.charCodeAt(i);value=Math.imul(value,16777619)}return value>>>0}
  function pick(pool,key){return pool[hash(String(key))%pool.length]}
  function key(){const ex=typeof window.cur==="function"?window.cur():null;return [ex&&ex.id||"none",S.lessonIndex||0,S.idx||0,S.correct?1:0].join(":")}
  function streak(){const values=[S.correctStreak,S.combo,S.sessionStreak,window.MeowAchievements&&MeowAchievements.state&&MeowAchievements.state.currentCorrectStreak];return Number(values.find(v=>Number.isFinite(Number(v))))||0}
  function copy(){return S.lang==="en"?EN:KO}
  function state(){if(!S.checked)return "idle";if(!S.correct)return "wrong";if(streak()>=3)return "streak";return "correct"}
  function line(type=state()){return pick(copy()[type]||copy().idle,`${key()}:${type}`)}
  function pose(){const type=state();if(type==="streak")return hash(`${key()}:pose`)%2?"tiny-dance":"confetti";if(type==="wrong")return hash(`${key()}:pose`)%2?"side-eye":"peek";if(type==="correct")return "freeze";return "peek"}

  function decorateLesson(){
    const coach=document.querySelector(".coach");
    if(!coach)return;
    coach.dataset.v432Pose=pose();
    const bubble=coach.querySelector(".bubble");
    if(bubble){
      let node=bubble.querySelector(".v432-reaction");
      if(!node){node=document.createElement("div");node.className="v432-reaction";bubble.appendChild(node)}
      node.textContent=line();
    }
    const feedback=document.querySelector(".feedback");
    if(feedback){
      let tag=feedback.querySelector(".v432-feedback-tag");
      if(!tag){tag=document.createElement("div");tag.className="v432-feedback-tag";feedback.insertBefore(tag,feedback.firstChild)}
      tag.textContent=S.checked?(S.correct?(S.lang==="ko"?"고양이 승인":"Cat approved"):(S.lang==="ko"?"문제 재검토 중":"Question under review")):"";
      if(!S.correct&&!feedback.querySelector(".v432-retry-note")){
        const note=document.createElement("div");note.className="v432-retry-note";note.textContent=S.lang==="ko"?"정답을 바로 보여주기보다, 설명을 읽고 한 번 더 시도해도 괜찮아요.":"Read the explanation and try once more before moving on.";feedback.appendChild(note)
      }
    }
  }

  function decorateReward(){
    const reward=document.querySelector(".reward-screen");
    if(!reward||reward.querySelector(".v432-reward-delight"))return;
    reward.classList.add("v432-party");
    const text=pick(copy().reward,`${Date.now()}:${S.lessonIndex}`);
    reward.insertAdjacentHTML("beforeend",`<div class="v432-reward-delight"><span>🐾</span><div><b>${S.lang==="ko"?"Meowde 한마디":"Meowde says"}</b><p>${text}</p></div></div>`);
  }

  function showOfflineChip(message){
    document.querySelectorAll(".v432-offline-chip").forEach(node=>node.remove());
    const node=document.createElement("div");node.className="v432-offline-chip";node.textContent=message;document.body.appendChild(node);setTimeout(()=>node.remove(),2200)
  }

  const baseRenderLesson=window.renderLesson;
  if(typeof baseRenderLesson==="function")window.renderLesson=function(){baseRenderLesson.apply(this,arguments);decorateLesson()};

  const baseCheckQ=window.checkQ;
  if(typeof baseCheckQ==="function")window.checkQ=async function(){try{await baseCheckQ.apply(this,arguments);decorateLesson()}catch(error){console.error("Meowde answer check failed:",error);showOfflineChip(S.lang==="ko"?"연결이 불안정해요. 잠시 후 다시 시도해 주세요.":"Connection issue. Please try again.");throw error}};

  const baseFinish=window.finish;
  if(typeof baseFinish==="function")window.finish=function(){baseFinish.apply(this,arguments);decorateReward()};

  window.addEventListener("offline",()=>showOfflineChip(S&&S.lang==="en"?"Offline mode":"오프라인 모드"));
  window.addEventListener("online",()=>showOfflineChip(S&&S.lang==="en"?"Back online":"다시 연결됐어요"));

  window.MeowHumor={line,pose,decorateLesson,decorateReward};
  window.__MEOWDE_VERSION__="4.32";
  if(window.S&&S.screen==="lesson")decorateLesson();
  if(document.querySelector(".reward-screen"))decorateReward();
})();

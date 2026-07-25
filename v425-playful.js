(function applyMeowdeV426LivingCat() {
  "use strict";

  const KO = {
    correct: [
      "정답! 방금 코드가 코~드르렁 자다가 깼어요.",
      "정답입니다. 파이썬은 뱀인데 물지 않고 실행만 하네요.",
      "완벽해요. 이 정도면 변수도 변심하지 않겠어요.",
      "맞았어요! 조건문이 감동해서 if 눈물을 흘립니다.",
      "통과! 고양이도 인정했습니다. 냥벽하네요.",
      "좋아요. 리스트가 기뻐서 줄을 섰어요.",
      "정답입니다. 함수가 웃으면? 하하함수.",
      "코드가 아주 반듯하네요. 들여쓰기도 허리를 폈습니다.",
      "정답! 오늘의 버그는 조기 퇴근했습니다.",
      "실행 완료. 키보드가 슬쩍 본인 공이라고 주장합니다."
    ],
    wrong: [
      "괜찮아요. 버그는 원래 잡으라고 있는 벌레니까요.",
      "앗, 코드가 잠깐 코를 골았네요. 다시 깨워봅시다.",
      "오답이지만 데이터는 남았습니다. 실패도 저장하면 경력입니다.",
      "세미콜론이 멀리서 웃었지만, 파이썬이라 상관없어요.",
      "고양이가 키보드 위를 걸어갔다는 공식 해명을 발표합니다.",
      "이번 답은 살짝 비껴갔어요. 다시 끼워 가면 됩니다.",
      "에러가 왜 차가울까요? 버그가 소름 돋게 해서요.",
      "틀렸지만 괜찮아요. 코딩은 시행보다 시행착오가 많습니다.",
      "정답이 숨어 있네요. 디버깅 탐정 출동합니다.",
      "코드가 삐끗했지만 저장은 멀쩡합니다. 다시 갑시다."
    ],
    streak: [
      "연속 정답! 실력이 늘어서 배열도 어깨를 나란히 합니다.",
      "연승 중입니다. 캣아이 선글라스가 자동으로 내려옵니다.",
      "이 정도면 키보드가 먼저 답을 눈치채겠어요.",
      "정답 행진! 반복문도 당신을 따라 반복 박수 중입니다.",
      "연속 성공. 고양이가 이제 코치가 아니라 팬이 됐습니다.",
      "콤보 유지! 오늘의 코드 온도는 매우 뜨겁습니다."
    ],
    concept: [
      "개념을 읽는 중… 고양이는 아는 척하는 중.",
      "천천히 읽어도 됩니다. CPU도 생각할 땐 잠깐 멈춥니다.",
      "오늘의 지식 한 스푼. 고양이는 츄르 한 스푼을 요구합니다.",
      "집중 모드입니다. 선글라스는 아직 이마 위에 있습니다.",
      "개념을 익히면 코드는 덜 낯설고, 버그는 조금 더 낯섭니다."
    ],
    rare: [
      "✨ 전설의 냥발 코딩 모드 발동! 오늘은 키보드가 당신을 따라옵니다.",
      "🌟 희귀 이벤트! 고양이가 무려 3초 동안 장난을 멈췄습니다.",
      "💫 레전더리 캣 등장. 이 문제는 이미 분위기로 반쯤 풀었습니다."
    ]
  };

  const EN = {
    correct: [
      "Correct. The cat reviewed your code and found it purr-fect.",
      "Nice. Even the variables stayed loyal this time.",
      "Correct. Python approves—no snakes were harmed.",
      "Clean run. The bug has left the building.",
      "Correct. Your keyboard is taking partial credit."
    ],
    wrong: [
      "Not quite. We are blaming the cat on the keyboard.",
      "A bug appeared. Conveniently, bugs are what developers catch.",
      "Close. The code took a tiny catnap.",
      "The answer wandered off. Debug detective mode is on.",
      "Small miss, intact progress. Try again."
    ],
    streak: [
      "Streak! The cat-eye sunglasses are officially down.",
      "Another one. Your keyboard is getting suspiciously smart.",
      "Combo maintained. The cat is now your fan.",
      "Hot streak. Even the loop is applauding repeatedly."
    ],
    concept: [
      "Reading mode: on. Pretending to understand: also on.",
      "Take your time. Even CPUs pause to think.",
      "Focus mode. The sunglasses are still on the forehead."
    ],
    rare: [
      "✨ Legendary paw-coding mode unlocked.",
      "🌟 Rare event: the cat stopped causing bugs for three seconds.",
      "💫 Legendary Cat appeared. Style points awarded."
    ]
  };

  const IDLE_ACTIONS = ["blink", "stretch", "look"];
  const IDLE_CLASS_PREFIX = "is-idle-";
  const IDLE_DELAY_MIN = 6500;
  const IDLE_DELAY_MAX = 12500;
  let idleTimer = null;

  function hash(text) {
    let value = 2166136261;
    for (let index = 0; index < text.length; index += 1) {
      value ^= text.charCodeAt(index);
      value = Math.imul(value, 16777619);
    }
    return value >>> 0;
  }

  function pick(pool, key) {
    return pool[hash(String(key)) % pool.length];
  }

  function questionKey() {
    const exercise = typeof window.cur === "function" ? window.cur() : null;
    return [
      exercise && exercise.id ? exercise.id : "concept",
      Number(window.S && S.lessonIndex) || 0,
      Number(window.S && S.idx) || 0,
      Boolean(window.S && S.correct)
    ].join(":");
  }

  function streakCount() {
    if (!window.S) return 0;
    const candidates = [S.correctStreak, S.streak, S.combo, S.sessionStreak];
    const found = candidates.find((value) => Number.isFinite(Number(value)));
    return Number(found) || 0;
  }

  function isRareEvent(key) {
    return hash(`${key}:legendary`) % 97 === 0;
  }

  function currentMood() {
    if (!window.S) return "idle";
    if (S.checked && !S.correct) return "sad";
    if (S.checked && S.correct && streakCount() >= 3) return "party";
    if (S.checked && S.correct) return "happy";
    if (S.screen === "lesson") return "focus";
    return "idle";
  }

  function reaction() {
    const copy = window.S && S.lang === "en" ? EN : KO;
    const key = questionKey();

    if (isRareEvent(key)) return pick(copy.rare, key);
    if (!window.S || !S.checked) return pick(copy.concept, key);
    if (!S.correct) return pick(copy.wrong, key);
    if (streakCount() >= 3) return pick(copy.streak, key);
    return pick(copy.correct, key);
  }

  function clearIdleClasses(coach) {
    IDLE_ACTIONS.forEach((action) => coach.classList.remove(`${IDLE_CLASS_PREFIX}${action}`));
  }

  function scheduleIdleBehavior() {
    if (idleTimer) window.clearTimeout(idleTimer);
    const delay = IDLE_DELAY_MIN + Math.floor(Math.random() * (IDLE_DELAY_MAX - IDLE_DELAY_MIN));

    idleTimer = window.setTimeout(() => {
      const root = window.app && app.querySelector ? app : document;
      const coach = root.querySelector && root.querySelector(".coach");
      if (!coach || document.hidden || (window.S && S.checked)) {
        scheduleIdleBehavior();
        return;
      }

      clearIdleClasses(coach);
      const action = IDLE_ACTIONS[Math.floor(Math.random() * IDLE_ACTIONS.length)];
      const className = `${IDLE_CLASS_PREFIX}${action}`;
      coach.classList.add(className);
      window.setTimeout(() => coach.classList.remove(className), 1100);
      scheduleIdleBehavior();
    }, delay);
  }

  function decorateLesson() {
    if (!window.app || !app.querySelector || !window.S) return;

    const coach = app.querySelector(".coach");
    if (coach) {
      coach.dataset.mood = currentMood();
      coach.classList.toggle("is-correct", Boolean(S.checked && S.correct));
      coach.classList.toggle("is-wrong", Boolean(S.checked && !S.correct));
      coach.classList.toggle("is-streak", Boolean(S.checked && S.correct && streakCount() >= 3));
    }

    const copy = reaction();
    const bubble = app.querySelector(".coach .bubble");
    if (bubble) {
      let line = bubble.querySelector(".v425-reaction");
      if (!line) {
        line = document.createElement("div");
        line.className = "v425-reaction";
        bubble.appendChild(line);
      }
      line.textContent = copy;
    }

    const feedback = app.querySelector(".feedback");
    if (feedback) {
      let line = feedback.querySelector(".v425-punchline");
      if (!line) {
        line = document.createElement("div");
        line.className = "v425-punchline";
        const button = feedback.querySelector("button");
        feedback.insertBefore(line, button || null);
      }
      line.textContent = copy;
    }
  }

  const baseRenderLesson = window.renderLesson;
  if (typeof baseRenderLesson === "function") {
    window.renderLesson = function renderLessonV426() {
      baseRenderLesson.apply(this, arguments);
      decorateLesson();
      scheduleIdleBehavior();
    };
  }

  const baseCatSVG = window.catSVG;
  if (typeof baseCatSVG === "function") {
    window.catSVG = function catSVGV426(kind, mood, size) {
      const activeMood = mood || currentMood();
      let svg = baseCatSVG(kind, activeMood, size);
      const glassesDown = ["happy", "focus", "party", "confident"].includes(activeMood);
      const transform = glassesDown ? "translate(0 12)" : "translate(0 0)";
      const glasses = `
        <g class="cat-eye-glasses ${glassesDown ? "glasses-down" : "glasses-up"}"
          transform="${transform}" aria-hidden="true">
          <path d="M32 38c7-5 17-4 23 1-2 9-8 14-16 12-6-2-8-7-7-13z"
            fill="#3D3344" stroke="#2E2733" stroke-width="2.2"/>
          <path d="M88 38c-7-5-17-4-23 1 2 9 8 14 16 12 6-2 8-7 7-13z"
            fill="#3D3344" stroke="#2E2733" stroke-width="2.2"/>
          <path d="M54 40c4-2 8-2 12 0M32 39l-8-3M88 39l8-3"
            fill="none" stroke="#2E2733" stroke-width="2.2" stroke-linecap="round"/>
          <path d="M37 40c4-2 8-2 12 0M71 40c4-2 8-2 12 0"
            fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" opacity=".42"/>
        </g>`;

      if (typeof svg === "string" && svg.includes("</svg>")) {
        svg = svg.replace("</svg>", `${glasses}</svg>`);
      }
      return svg;
    };
  }

  window.meowdePlayful = {
    version: "4.26",
    reaction,
    mood: currentMood,
    decorateLesson,
    scheduleIdleBehavior,
    isRareEvent
  };

  scheduleIdleBehavior();
  if (window.S && S.screen === "lesson" && typeof window.renderLesson === "function") {
    window.renderLesson();
  }
})();

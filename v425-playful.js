(function applyMeowdeV425PlayfulLearning() {
  const KO = {
    correct: [
      "정답! 방금 코드가 코~드르렁 자다가 깼어요.",
      "정답입니다. 파이썬이 뱀인데 왜 이렇게 착하죠? 물지 않고 실행만 하네요.",
      "완벽해요. 이 정도면 변수도 변심하지 않겠어요.",
      "맞았어요! 조건문이 감동해서 if 눈물을 흘립니다.",
      "정답! 개발자가 가장 좋아하는 차는? 에러 없는 자동차.",
      "통과! 고양이도 인정했습니다. 냥벽하네요.",
      "좋아요. 리스트가 기뻐서 줄을 섰어요.",
      "정답입니다. 함수가 웃으면? 하하함수.",
    ],
    wrong: [
      "괜찮아요. 버그는 원래 잡으라고 있는 벌레니까요.",
      "앗, 코드가 잠깐 코를 골았네요. 다시 깨워봅시다.",
      "오답이지만 데이터는 남았습니다. 실패도 저장하면 경력입니다.",
      "세미콜론이 멀리서 웃었지만, 파이썬이라 상관없어요.",
      "고양이가 키보드 위를 걸어갔다는 공식 해명을 발표합니다.",
      "이번 답은 살짝 비껴갔어요. 비껴가도 다시 끼워 가면 됩니다.",
      "에러가 왜 차가울까요? 버그가 소름 돋게 해서요.",
      "틀렸지만 괜찮아요. 코딩은 원래 시행착오가 시행보다 많습니다.",
    ],
    streak: [
      "연속 정답! 실력이 늘어서 배열도 어깨를 나란히 합니다.",
      "연승 중입니다. 캣아이 선글라스가 자동으로 내려옵니다.",
      "이 정도면 키보드가 먼저 답을 눈치채겠어요.",
      "정답 행진! 반복문도 당신을 따라 반복 박수 중입니다.",
    ],
    concept: [
      "개념을 읽는 중… 고양이는 아는 척하는 중.",
      "천천히 읽어도 됩니다. CPU도 생각할 땐 잠깐 멈춥니다.",
      "오늘의 지식 한 스푼. 고양이는 츄르 한 스푼을 요구합니다.",
    ],
  };

  const EN = {
    correct: [
      "Correct. The cat has reviewed your code and found it purr-fect.",
      "Nice. Even the variables stayed loyal this time.",
      "Correct. Python approves—no snakes were harmed.",
    ],
    wrong: [
      "Not quite. We are blaming the cat on the keyboard.",
      "A bug appeared. Conveniently, bugs are what developers catch.",
      "Close. The code took a tiny catnap.",
    ],
    streak: [
      "Streak! The cat-eye sunglasses are officially down.",
      "Another one. Your keyboard is getting suspiciously smart.",
    ],
    concept: [
      "Reading mode: on. Pretending to understand: also on.",
    ],
  };

  function hash(text) {
    let value = 2166136261;
    for (let index = 0; index < text.length; index += 1) {
      value ^= text.charCodeAt(index);
      value = Math.imul(value, 16777619);
    }
    return value >>> 0;
  }

  function pick(pool, key) {
    return pool[hash(key) % pool.length];
  }

  function questionKey() {
    const exercise = typeof cur === "function" ? cur() : null;
    return [
      exercise && exercise.id ? exercise.id : "concept",
      Number(S.lessonIndex) || 0,
      Number(S.idx) || 0,
      Boolean(S.correct),
    ].join(":");
  }

  function streakCount() {
    const candidates = [S.correctStreak, S.streak, S.combo, S.sessionStreak];
    const found = candidates.find((value) => Number.isFinite(Number(value)));
    return Number(found) || 0;
  }

  function reaction() {
    const copy = S.lang === "en" ? EN : KO;
    const key = questionKey();

    if (!S.checked) return pick(copy.concept, key);
    if (!S.correct) return pick(copy.wrong, key);
    if (streakCount() >= 3) return pick(copy.streak, key);
    return pick(copy.correct, key);
  }

  function decorateLesson() {
    if (!app || !app.querySelector) return;

    const coach = app.querySelector(".coach");
    if (coach) {
      coach.classList.toggle("is-correct", Boolean(S.checked && S.correct));
      coach.classList.toggle("is-wrong", Boolean(S.checked && !S.correct));
      coach.classList.toggle("is-streak", Boolean(S.checked && S.correct && streakCount() >= 3));
    }

    const bubble = app.querySelector(".coach .bubble");
    if (bubble && !bubble.querySelector(".v425-reaction")) {
      const line = document.createElement("div");
      line.className = "v425-reaction";
      line.textContent = reaction();
      bubble.appendChild(line);
    }

    const feedback = app.querySelector(".feedback");
    if (feedback && !feedback.querySelector(".v425-punchline")) {
      const line = document.createElement("div");
      line.className = "v425-punchline";
      line.textContent = reaction();
      const button = feedback.querySelector("button");
      feedback.insertBefore(line, button || null);
    }
  }

  const baseRenderLesson = window.renderLesson;
  if (typeof baseRenderLesson === "function") {
    window.renderLesson = function renderLessonV425() {
      baseRenderLesson.apply(this, arguments);
      decorateLesson();
    };
  }

  const baseCatSVG = window.catSVG;
  if (typeof baseCatSVG === "function") {
    window.catSVG = function catSVGV425(kind, mood, size) {
      let svg = baseCatSVG(kind, mood, size);
      const activeMood = mood || "idle";
      const glassesDown = activeMood === "happy" || activeMood === "focus";
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

      svg = svg.replace("</svg>", `${glasses}</svg>`);
      return svg;
    };
  }

  window.meowdePlayful = {
    reaction,
    decorateLesson,
    version: "4.25",
  };

  if (S.screen === "lesson" && typeof window.renderLesson === "function") {
    window.renderLesson();
  }
})();

(function applyMeowdeV418Mentor(){
  const KEY='meowde-v418-mentor';
  function read(){
    try{const value=JSON.parse(localStorage.getItem(KEY)||'{}');return value&&typeof value==='object'?value:{}}
    catch(error){console.warn('Meowde v4.18 mentor state was reset:',error);return {}}
  }
  const M=read();
  M.hints=M.hints&&typeof M.hints==='object'?M.hints:{};
  M.patterns=M.patterns&&typeof M.patterns==='object'?M.patterns:{};
  M.sessions=Number(M.sessions)||0;
  function persist(){
    try{localStorage.setItem(KEY,JSON.stringify(M))}
    catch(error){console.warn('Meowde v4.18 could not save mentor state:',error)}
  }
  function contextFor(ex){
    if(typeof meowdeExerciseContext==='function')return meowdeExerciseContext(ex);
    return {lang:S.lang,lessonIndex:S.lessonIndex,exercise:ex||null};
  }
  function exerciseKey(ex){
    const context=contextFor(ex);
    return [context.lang,context.lessonIndex,ex&&ex.id||S.idx].join(':');
  }
  function classify(ex){
    if(!ex)return 'general';
    if(ex.type==='write')return 'code-writing';
    if(ex.type==='bughunt')return 'debugging';
    if(ex.type==='fill')return 'syntax';
    if(ex.type==='predict')return 'prediction';
    return 'general';
  }
  function patternKey(ex){
    const context=contextFor(ex);
    return [context.lang,context.lessonIndex,classify(ex)].join(':');
  }
  function hintsFor(ex){
    const ko=S.lang==='ko';
    const direct=Array.isArray(ex.hints)?ex.hints.filter(Boolean):[];
    if(direct.length)return direct.slice(0,3);
    const first=ex.hint||(ko?'문제에서 요구하는 핵심 동작을 먼저 한 문장으로 정리해 보세요.':'Restate the required behavior in one sentence.');
    let second=ko?'입력값과 출력값, 그리고 실행 순서를 차례대로 확인해 보세요.':'Check the input, expected output, and execution order.';
    let third=ko?'정답을 바로 쓰기보다 가장 작은 코드 조각부터 완성해 보세요.':'Build the smallest correct code fragment first.';
    if(ex.type==='predict'){
      second=ko?'코드를 위에서 아래로 한 줄씩 실행하며 변수 값을 적어 보세요.':'Trace the code line by line and write down each value.';
      third=ko?'마지막으로 출력되는 표현식만 다시 계산해 보세요.':'Recalculate only the final printed expression.';
    }else if(ex.type==='fill'){
      second=ko?'빈칸 앞뒤의 문법 형태와 자료형을 확인해 보세요.':'Inspect the syntax and data type on both sides of the blank.';
      third=ko?'각 토큰을 넣었을 때 문장이 자연스럽게 읽히는지 비교해 보세요.':'Test which token makes the statement syntactically complete.';
    }else if(ex.type==='bughunt'){
      second=ko?'각 줄의 괄호, 들여쓰기, 연산자를 따로 확인해 보세요.':'Check brackets, indentation, and operators line by line.';
      third=ex.fixed?(ko?'수정 코드의 구조와 다른 줄을 찾아보세요.':'Compare each line with the structure of the fixed code.'):third;
    }else if(ex.type==='write'){
      second=ko?'테스트 케이스를 만족시키는 가장 단순한 함수부터 작성해 보세요.':'Start with the simplest function that satisfies the test case.';
      third=ex.starter?(ko?'제공된 시작 코드의 함수명과 매개변수를 유지하세요.':'Keep the provided function name and parameters.'):third;
    }
    return [first,second,third];
  }
  function encouragement(ex){
    const ko=S.lang==='ko',count=Number(M.patterns[patternKey(ex)])||0;
    if(S.checked&&S.correct)return ko?'정답입니다. 지금 사용한 풀이 순서를 기억해 두세요.':'Correct. Remember the reasoning sequence you just used.';
    if(S.checked&&!S.correct&&count>=2)return ko?'같은 레슨의 유사 문제에서 반복해서 막히고 있어요. 힌트를 순서대로 열고 다시 시도해 보세요.':'This pattern has appeared more than once in this lesson. Open the hints in order and retry.';
    if(S.checked&&!S.correct)return ko?'오답은 다음 풀이를 위한 데이터입니다. 어느 단계에서 판단이 달라졌는지 확인해 보세요.':'A wrong answer is useful data. Identify where your reasoning changed direction.';
    return ko?'답을 고르기 전에 코드가 어떤 순서로 실행되는지 먼저 설명해 보세요.':'Before answering, explain the execution order to yourself.';
  }
  function explanation(ex){
    const ko=S.lang==='ko';
    return ex.explain||ex.explanation||(ko?'정답 확인 후 핵심 규칙을 다시 설명해 드릴게요.':'The core rule will appear after you check your answer.');
  }
  function renderMentor(){
    const ex=typeof cur==='function'?cur():null;
    if(!ex||ex.type==='concept')return;
    const main=document.querySelector('.lesson-main');
    if(!main||main.querySelector('.v418-mentor'))return;
    const key=exerciseKey(ex),stage=Math.max(0,Math.min(3,Number(M.hints[key])||0)),hints=hintsFor(ex),ko=S.lang==='ko';
    const rows=hints.slice(0,stage).map((text,index)=>'<div class="v418-hint-row"><b>'+(ko?'힌트 ':'Hint ')+(index+1)+'</b><span>'+esc(text)+'</span></div>').join('');
    const next=stage<3?'<button class="primary" onclick="MeowMentor.reveal()">💡 '+(ko?'힌트 '+(stage+1)+' 보기':'Show hint '+(stage+1))+'</button>':'';
    const reset=stage?'<button onclick="MeowMentor.reset()">'+(ko?'힌트 접기':'Hide hints')+'</button>':'';
    const explain=S.checked?'<div class="v418-explain"><strong>'+(S.correct?(ko?'왜 정답일까요?':'Why it works'):(ko?'어디를 다시 볼까요?':'What to review'))+'</strong><p>'+esc(explanation(ex))+'</p></div>':'';
    const pattern=Number(M.patterns[patternKey(ex)])||0;
    main.insertAdjacentHTML('beforeend','<section class="v418-mentor"><div class="v418-mentor-head"><div class="v418-mentor-title"><span>🐱</span><span>Meow Mentor</span></div><span class="v418-mentor-step">'+(ko?'힌트 ':'Hint ')+stage+'/3</span></div><p>'+esc(encouragement(ex))+'</p>'+(rows?'<div class="v418-hints">'+rows+'</div>':'')+'<div class="v418-mentor-actions">'+next+reset+'</div>'+explain+(pattern?'<div class="v418-pattern">'+(ko?'이 레슨의 유형별 오답 기록 ':'Mistakes in this lesson pattern: ')+pattern+'</div>':'')+'</section>');
  }
  window.MeowMentor={
    reveal:function(){
      const ex=cur();if(!ex)return;
      const key=exerciseKey(ex);M.hints[key]=Math.min(3,(Number(M.hints[key])||0)+1);persist();renderLesson();
    },
    reset:function(){
      const ex=cur();if(!ex)return;
      M.hints[exerciseKey(ex)]=0;persist();renderLesson();
    },
    state:M
  };
  const baseRenderLesson=renderLesson;
  renderLesson=function(){baseRenderLesson();renderMentor()};
  const baseCheckQ=checkQ;
  checkQ=async function(){
    const ex=cur(),first=!S.checked&&!ex.retry;
    await baseCheckQ();
    if(first&&ex&&ex.type!=='concept'){
      M.sessions++;
      if(!S.correct){const key=patternKey(ex);M.patterns[key]=(Number(M.patterns[key])||0)+1}
      persist();
    }
    renderMentor();
  };
  document.title='Meowde v4.18 — Meow Mentor';
  window.__MEOWDE_VERSION__='4.18';
  if(S.screen==='lesson'&&typeof hasLessonProgress==='function'&&hasLessonProgress())renderLesson();
})();
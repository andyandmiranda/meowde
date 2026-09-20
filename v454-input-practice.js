(function applyMeowdeV454InputPractice(){
  "use strict";

  const VERSION="4.54-input-practice";
  const PATCHES={
    ko:{
      "input-window":{
        description:"input()으로 실제 테스트 입력을 받아 문자열 변수로 사용하는 흐름을 연습해요.",
        exercises:{
          "input-window-c":{title:"실제 입력값 받기",body:"input()은 사용자가 입력한 값을 문자열로 돌려줘요. Meowde는 같은 결과를 다시 확인할 수 있도록 문제마다 테스트 입력을 정해 실행해요.",code:'name = input()\nprint("Hi " + name)',hint:"input()의 결과를 변수에 저장한 뒤 다른 문자열과 함께 사용할 수 있어요."},
          "input-window-p1":{prompt:"테스트 입력이 Amy라면 무엇이 출력될까요?",code:'name = input()\nprint("Hi " + name)',choices:["Hi Amy","Hi name","Amy Hi","에러"],answer:0,output:"Hi Amy",hint:"input()이 돌려준 Amy가 name에 저장돼요.",explain:"테스트 입력 Amy가 name에 저장되어 Hi Amy가 출력돼요."},
          "input-window-p2":{prompt:"테스트 입력이 meow라면 무엇이 출력될까요?",code:'word = input()\nprint(word + "!")',choices:["meow!","word!","!meow","에러"],answer:0,output:"meow!",hint:"input()의 결과는 문자열이라 !와 바로 이어 붙일 수 있어요.",explain:"input()이 문자열 meow를 돌려주고 !가 뒤에 붙어요."},
          "input-window-f":{prompt:"사용자의 입력을 name에 저장하려면 빈칸에 무엇이 들어갈까요?",code:"name = ____()\nprint(name)",tokens:["input","print","str","int"],answer:"input",hint:"사용자의 값을 받는 함수예요.",explain:"input()을 호출하면 입력 문자열을 받아 name에 저장할 수 있어요."},
          "input-window-b":{prompt:"입력을 받으려 했지만 함수를 호출하지 않은 줄을 고르세요.",lines:["name = input",'print("Hi " + name)'],buggy:0,fixed:"name = input()",hint:"함수는 이름 뒤에 ()를 붙여 호출해요.",explain:"input만 쓰면 함수 자체를 가리켜요. input()처럼 호출해야 실제 입력값을 받아요."},
          "input-window-w":{prompt:"직접 작성: input()으로 이름을 받아 Welcome Jieun을 출력하세요.",starter:'user = input()\n# Welcome 뒤에 user를 붙여 출력하세요\n',expected:"Welcome Jieun",testcase:"기대 출력: Welcome Jieun",stdin:["Jieun"],hint:'print("Welcome " + user)를 사용해보세요.',explain:"실제 input() 호출로 받은 테스트 입력 Jieun을 문자열과 연결했어요.",model:'user = input()\nprint("Welcome " + user)'}
        }
      },
      "debug-missing-quote":{
        description:"input()은 문자열을 돌려줘요. 계산하려면 int(), 글자로 합치려면 str() 같은 변환이 필요해요.",
        exercises:{
          "debug-missing-quote-c":{title:"입력은 먼저 문자열",body:"input()으로 받은 값은 숫자처럼 보여도 문자열이에요. 숫자 계산 전에는 int()로 바꾸고, 숫자를 일반 문자열 연결에 넣을 때는 str()로 바꿀 수 있어요.",code:'age_text = input()\nage = int(age_text)\nprint(age + 1)',hint:'테스트 입력이 7이어도 input()의 결과는 먼저 문자열 "7"이에요.'},
          "debug-missing-quote-p1":{prompt:"테스트 입력이 7일 때 int()로 변환하면 무엇이 출력될까요?",code:'age_text = input()\nage = int(age_text)\nprint(age + 1)',choices:["8","71","7","에러"],answer:0,output:"8",hint:'input() → "7" → int("7") → 7 순서로 생각해보세요.',explain:"입력 문자열 7을 int()로 정수 7로 바꾼 뒤 1을 더해 8이 돼요."},
          "debug-missing-quote-b":{prompt:"입력값으로 숫자 계산을 하려면 고쳐야 할 줄을 고르세요.",lines:["age_text = input()","age = age_text","print(age + 1)"],buggy:1,fixed:"age = int(age_text)",hint:"age가 아직 문자열인지 확인하세요.",explain:"input() 결과는 문자열이므로 int()로 바꾼 뒤 숫자를 더해야 해요."},
          "debug-missing-quote-w":{prompt:"직접 작성: input()으로 점수를 받고 int()로 바꾼 뒤 2를 더해 42를 출력하세요.",starter:'score_text = input()\n# int()로 변환한 뒤 2를 더해 출력하세요\n',expected:"42",testcase:"기대 출력: 42",stdin:["40"],hint:"score = int(score_text) 다음 print(score + 2)를 써보세요.",explain:"실제 input()으로 받은 문자열 40을 정수로 변환해 계산했어요.",model:'score_text = input()\nscore = int(score_text)\nprint(score + 2)'}
        }
      }
    },
    en:{
      "input-window":{
        description:"Practice receiving real test input with input() and using the returned string in a variable.",
        exercises:{
          "input-window-c":{title:"Receive real input",body:"input() returns what the user enters as a string. Meowde supplies a fixed test input for each exercise so the result is reproducible.",code:'name = input()\nprint("Hi " + name)',hint:"Store the value returned by input() in a variable, then use it like other text."},
          "input-window-p1":{prompt:"If the test input is Amy, what will this print?",code:'name = input()\nprint("Hi " + name)',choices:["Hi Amy","Hi name","Amy Hi","Error"],answer:0,output:"Hi Amy",hint:"input() returns Amy and stores it in name.",explain:"The test input Amy is stored in name, so the output is Hi Amy."},
          "input-window-p2":{prompt:"If the test input is meow, what will this print?",code:'word = input()\nprint(word + "!")',choices:["meow!","word!","!meow","Error"],answer:0,output:"meow!",hint:"input() returns a string, so ! can be joined directly.",explain:"input() returns the string meow and ! is appended."},
          "input-window-f":{prompt:"What belongs in the blank to store user input in name?",code:"name = ____()\nprint(name)",tokens:["input","print","str","int"],answer:"input",hint:"Choose the function that receives a user value.",explain:"Calling input() receives a string and stores it in name."},
          "input-window-b":{prompt:"Which line refers to the function without actually calling it?",lines:["name = input",'print("Hi " + name)'],buggy:0,fixed:"name = input()",hint:"A function call needs parentheses after its name.",explain:"input refers to the function itself. input() calls it and receives a value."},
          "input-window-w":{prompt:"Write code: use input() to receive a name and print Welcome Jieun.",starter:'user = input()\n# Print Welcome followed by user\n',expected:"Welcome Jieun",testcase:"Expected output: Welcome Jieun",stdin:["Jieun"],hint:'Try print("Welcome " + user).',explain:"You used a real input() call and joined the supplied test input Jieun with text.",model:'user = input()\nprint("Welcome " + user)'}
        }
      },
      "debug-missing-quote":{
        description:"input() returns text. Use int() before arithmetic and str() when a number must become ordinary text.",
        exercises:{
          "debug-missing-quote-c":{title:"Input starts as text",body:"Values from input() are strings even when they look like numbers. Use int() before arithmetic. Use str() when a number must become ordinary text.",code:'age_text = input()\nage = int(age_text)\nprint(age + 1)',hint:'Even with test input 7, input() first returns the string "7".'},
          "debug-missing-quote-p1":{prompt:"If the test input is 7, what prints after int() converts it?",code:'age_text = input()\nage = int(age_text)\nprint(age + 1)',choices:["8","71","7","Error"],answer:0,output:"8",hint:'Think input() → "7" → int("7") → 7.',explain:"The input string 7 becomes integer 7, then adding 1 produces 8."},
          "debug-missing-quote-b":{prompt:"Which line must change before this input value can be used in arithmetic?",lines:["age_text = input()","age = age_text","print(age + 1)"],buggy:1,fixed:"age = int(age_text)",hint:"Check whether age is still a string.",explain:"Convert the value returned by input() with int() before adding a number."},
          "debug-missing-quote-w":{prompt:"Write code: receive a score with input(), convert it with int(), add 2, and print 42.",starter:'score_text = input()\n# Convert with int(), add 2, and print\n',expected:"42",testcase:"Expected output: 42",stdin:["40"],hint:"Create score = int(score_text), then print(score + 2).",explain:"You converted real input text 40 into an integer that can be used in arithmetic.",model:'score_text = input()\nscore = int(score_text)\nprint(score + 2)'}
        }
      }
    }
  };

  function runtimeExercise(){try{return typeof cur==="function"?cur():null}catch(error){return null}}
  function patchLesson(lesson,patch){
    if(!lesson||!patch)return false;
    let changed=false;
    if(patch.description!==undefined){lesson.description=patch.description;changed=true}
    const exercisePatches=patch.exercises||{};
    Object.entries(exercisePatches).forEach(([id,exercisePatch])=>{
      const exercise=(lesson.exercises||[]).find(item=>item.id===id);
      if(exercise){Object.assign(exercise,exercisePatch);changed=true}
    });
    return changed;
  }
  function apply(){
    const changes=[];
    [[window.MEOWDE_LESSONS_KO,PATCHES.ko,"ko"],[window.MEOWDE_LESSONS_EN,PATCHES.en,"en"]].forEach(([lessons,patches,lang])=>{
      if(!Array.isArray(lessons))return;
      Object.entries(patches).forEach(([slug,patch])=>{
        const lesson=lessons.find(item=>item&&item.slug===slug);
        if(patchLesson(lesson,patch))changes.push(`${lang}:${slug}`);
      });
    });
    document.documentElement.dataset.inputPractice="v454";
    return changes;
  }
  function stdinPrelude(values){
    const payload=values.map(value=>String(value)).join("\n")+"\n";
    return `import sys, io\nsys.stdin = io.StringIO(${JSON.stringify(payload)})\n`;
  }

  const baseRunPython=typeof runPython==="function"?runPython:null;
  if(baseRunPython){
    runPython=async function(code){
      const exercise=runtimeExercise();
      if(!exercise||!Array.isArray(exercise.stdin)||!exercise.stdin.length)return baseRunPython(code);
      return baseRunPython(stdinPrelude(exercise.stdin)+code);
    };
  }

  const changes=apply();
  window.MeowInputPractice=Object.freeze({
    version:VERSION,
    changes:Object.freeze(changes),
    patches:PATCHES,
    inputsFor:function(exercise){return exercise&&Array.isArray(exercise.stdin)?exercise.stdin.slice():[]}
  });
  window.__MEOWDE_VERSION__=VERSION;
})();
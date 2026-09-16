(function applyMeowdeV452Curriculum(){
  "use strict";

  const VERSION="4.52-curriculum-v1";

  const PATCHES={
    ko:{
      "concat-bridge":{
        title:"포매팅 다리",short:"포매팅",focus:["포매팅","f-string"],
        description:"문자열 연결과 f-string으로 변수 값을 자연스럽게 문장에 넣어요.",output:"Hello Jieun",
        exercises:[
          {id:"concat-bridge-c",type:"concept",title:"문장에 변수 넣기",body:"문자열은 +로 이어 붙일 수 있지만, f-string을 쓰면 숫자나 변수도 { } 안에 바로 넣을 수 있어요.",code:'name = "Jieun"\nprint(f"Hello {name}")',hint:'문자열 앞에 f를 붙이고 변수 이름을 { } 안에 넣어요.'},
          {id:"concat-bridge-p1",type:"predict",prompt:"기존 + 연결 방식의 출력은 무엇일까요?",code:'name = "Amy"\nprint("Hi " + name)',choices:["Hi Amy","HiAmy","Amy Hi","에러"],answer:0,output:"Hi Amy",hint:"따옴표 안 공백과 변수 값을 함께 보세요.",explain:'"Hi " 뒤에 name의 값 Amy가 붙어요.'},
          {id:"concat-bridge-p2",type:"predict",prompt:"f-string을 사용한 이 코드는 무엇을 출력할까요?",code:'name = "Jieun"\nprint(f"Hello {name}")',choices:["Hello Jieun","Hello {name}","Jieun Hello","에러"],answer:0,output:"Hello Jieun",hint:"f-string의 {name} 자리에 변수 값이 들어가요.",explain:"f-string은 { } 안의 변수 값을 문자열에 바로 넣어요."},
          {id:"concat-bridge-f",type:"fill",prompt:"f-string을 만들려면 빈칸에 무엇이 들어갈까요?",code:'name = "Mina"\nprint(____"Hi {name}")',tokens:["f","str","+","input"],answer:"f",hint:"따옴표 바로 앞에 한 글자를 붙여요.",explain:'f"Hi {name}" 형태가 f-string이에요.'},
          {id:"concat-bridge-b",type:"bughunt",prompt:"문자열과 숫자를 바로 + 해서 문제가 되는 줄을 고르세요.",lines:["level = 3",'print("Lv." + level)'],buggy:1,fixed:'print(f"Lv.{level}")',hint:"문자열과 정수는 바로 + 할 수 없지만 f-string에는 숫자도 넣을 수 있어요.",explain:"f-string을 쓰면 level이 숫자여도 {level} 자리에 자연스럽게 들어가요."},
          {id:"concat-bridge-w",type:"write",prompt:"직접 작성: name과 level 변수를 f-string으로 사용해 Jieun Lv.4를 출력하세요.",starter:'name = "Jieun"\nlevel = 4\n# f-string으로 출력하세요\n',expected:"Jieun Lv.4",testcase:"기대 출력: Jieun Lv.4",hint:'print(f"{name} Lv.{level}") 형태를 떠올리세요.',explain:"f-string으로 문자열과 숫자 변수를 한 문장에 넣었어요.",model:'name = "Jieun"\nlevel = 4\nprint(f"{name} Lv.{level}")'}
        ]
      },
      "debug-missing-quote":{
        title:"입력값 변환",short:"변환",focus:["형변환","int"],
        description:"input()은 문자열을 돌려줘요. 계산하려면 int(), 글자로 합치려면 str() 같은 변환이 필요해요.",output:"8",
        exercises:[
          {id:"debug-missing-quote-c",type:"concept",title:"입력은 먼저 문자열",body:"input()으로 받은 값은 숫자처럼 보여도 문자열이에요. 숫자 계산 전에는 int()로 바꾸고, 숫자를 일반 문자열 연결에 넣을 때는 str()로 바꿀 수 있어요.",code:'age_text = "7"\nage = int(age_text)\nprint(age + 1)',hint:'"7"은 문자열이고 int("7")은 정수 7이에요.'},
          {id:"debug-missing-quote-p1",type:"predict",prompt:"문자열 숫자를 int()로 바꾸면 무엇이 출력될까요?",code:'age_text = "7"\nage = int(age_text)\nprint(age + 1)',choices:["8","71","7","에러"],answer:0,output:"8",hint:"int(\"7\")은 숫자 7이 돼요.",explain:"age가 정수 7이 되어서 1을 더하면 8이에요."},
          {id:"debug-missing-quote-p2",type:"predict",prompt:"숫자를 str()로 바꿔 문자열과 연결하면 출력은?",code:'level = 3\nprint("Lv." + str(level))',choices:["Lv.3","Lv.level","3","에러"],answer:0,output:"Lv.3",hint:"str(3)은 문자열 \"3\"을 만들어요.",explain:"str(level)로 숫자 3을 글자로 바꿔 Lv.와 연결할 수 있어요."},
          {id:"debug-missing-quote-f",type:"fill",prompt:"문자열 12에 1을 더해 숫자 13을 만들려면 무엇이 필요할까요?",code:'number_text = "12"\nnumber = ____(number_text)\nprint(number + 1)',tokens:["int","str","print","input"],answer:"int",hint:"계산할 숫자로 바꾸는 함수예요.",explain:"int(number_text)가 문자열 \"12\"를 정수 12로 바꿔요."},
          {id:"debug-missing-quote-b",type:"bughunt",prompt:"문자열 입력값을 숫자 계산에 쓰기 전에 고쳐야 할 줄을 고르세요.",lines:['age_text = "12"','age = age_text','print(age + 1)'],buggy:1,fixed:"age = int(age_text)",hint:"age가 아직 문자열인지 확인하세요.",explain:"age_text를 int()로 바꿔야 숫자 1을 더할 수 있어요."},
          {id:"debug-missing-quote-w",type:"write",prompt:"직접 작성: score_text의 문자열 40을 숫자로 바꿔 2를 더한 42를 출력하세요.",starter:'score_text = "40"\n# int()로 변환한 뒤 2를 더해 출력하세요\n',expected:"42",testcase:"기대 출력: 42",hint:"score = int(score_text) 다음 print(score + 2)를 써보세요.",explain:"사용자 입력처럼 들어온 문자열 숫자를 계산 가능한 정수로 바꿨어요.",model:'score_text = "40"\nscore = int(score_text)\nprint(score + 2)'}
        ]
      },
      "while-cave":{
        title:"while 동굴",short:"while",focus:["while","break"],
        description:"while로 조건이 참인 동안 반복하고, break로 필요한 순간 반복을 멈춰요.",output:"0\n1\n2",
        exercises:[
          {id:"while-cave-c",type:"concept",title:"반복을 안전하게 멈추기",body:"while은 조건이 참인 동안 계속 반복해요. 반복 안에서 값이 변해야 끝날 수 있고, break를 만나면 조건과 상관없이 즉시 반복을 빠져나와요.",code:'count = 0\nwhile count < 10:\n    print(count)\n    if count == 2:\n        break\n    count = count + 1',hint:"반복이 끝나는 조건이나 break가 있는지 항상 확인하세요."},
          {id:"while-cave-p",type:"predict",prompt:"count가 2일 때 break를 만나면 출력은 어디까지일까요?",code:'count = 0\nwhile count < 10:\n    print(count)\n    if count == 2:\n        break\n    count = count + 1',choices:["0\n1\n2","0부터 9까지","0\n1","무한 반복"],answer:0,output:"0\n1\n2",hint:"print 다음에 count == 2를 확인해 break해요.",explain:"2를 출력한 뒤 break를 만나 while이 바로 끝나요."},
          {id:"while-cave-f",type:"fill",prompt:"2를 출력한 뒤 반복을 즉시 끝내려면 빈칸에 무엇이 들어갈까요?",code:'count = 0\nwhile count < 10:\n    print(count)\n    if count == 2:\n        ____\n    count = count + 1',tokens:["break","continue","return","pass"],answer:"break",hint:"반복문 자체를 빠져나오는 키워드예요.",explain:"break는 가장 가까운 반복문을 즉시 끝내요."},
          {id:"while-cave-b",type:"bughunt",prompt:"반복 조건이 영원히 True가 될 수 있어 고쳐야 하는 줄은?",lines:["count = 0","while count < 3:","    print(count)","    count = count"],buggy:3,fixed:"    count = count + 1",hint:"반복할 때 count가 실제로 변하는지 보세요.",explain:"count = count는 값이 그대로라 조건이 계속 True예요. count를 증가시켜야 반복이 끝나요."},
          {id:"while-cave-w",type:"write",prompt:"직접 작성: 1부터 출력하다가 2를 출력하면 break로 멈추세요.",starter:'count = 1\nwhile True:\n    # count를 출력하고 2이면 break하세요\n',expected:"1\n2",testcase:"기대 출력: 1\n2",hint:"print(count) 뒤에 if count == 2: break를 두고, 그 아래에서 count를 1 늘리세요.",explain:"while True도 break 같은 종료 경로가 있으면 안전하게 끝낼 수 있어요.",model:'count = 1\nwhile True:\n    print(count)\n    if count == 2:\n        break\n    count = count + 1'}
        ]
      },
      "mini-project":{
        title:"미니 프로젝트",short:"프로젝트",focus:["프로젝트","통합"],
        description:"리스트, 반복문, 함수, 조건, return을 묶어 작은 학습 결과 프로그램을 만들어요.",output:"PASS\nRETRY",
        exercises:[
          {id:"mini-project-c",type:"concept",title:"작은 프로그램으로 조립하기",body:"실제 프로그램은 한 개념만 쓰지 않아요. 함수가 한 점수를 판정하고, 리스트의 여러 점수를 for로 꺼내 같은 함수를 반복해서 사용할 수 있어요.",code:'def result(score):\n    if score >= 70:\n        return "PASS"\n    return "RETRY"\n\nscores = [80, 60]\nfor score in scores:\n    print(result(score))',hint:"함수 하나를 만든 뒤 여러 데이터에 반복 적용하는 구조를 보세요."},
          {id:"mini-project-p",type:"predict",prompt:"학습 결과 프로그램은 무엇을 출력할까요?",code:'def result(score):\n    if score >= 70:\n        return "PASS"\n    return "RETRY"\n\nscores = [90, 65]\nfor score in scores:\n    print(result(score))',choices:["PASS\nRETRY","PASS\nPASS","RETRY\nPASS","90\n65"],answer:0,output:"PASS\nRETRY",hint:"90과 65를 각각 result()에 넣어보세요.",explain:"90은 70 이상이라 PASS, 65는 그렇지 않아 RETRY가 반환돼요."},
          {id:"mini-project-f",type:"fill",prompt:"함수에서 PASS 값을 호출한 곳으로 돌려주려면 무엇이 들어갈까요?",code:'def result(score):\n    if score >= 70:\n        ____ "PASS"\n    return "RETRY"\n\nprint(result(80))',tokens:["return","print","for","if"],answer:"return",hint:"함수의 결과값을 바깥으로 보내는 키워드예요.",explain:"return은 함수의 실행 결과를 호출한 곳으로 돌려줘요."},
          {id:"mini-project-b",type:"bughunt",prompt:"여러 점수를 반복 처리하려는데 문법이 잘못된 줄을 고르세요.",lines:['scores = [80, 60]','for score in scores','    print(score)'],buggy:1,fixed:"for score in scores:",hint:"for 문장 끝에 필요한 기호를 확인하세요.",explain:"for 조건 줄 끝에는 콜론(:)이 필요해요."},
          {id:"mini-project-w",type:"write",prompt:"프로젝트 직접 작성: 60점 이상이면 GO, 아니면 MORE를 반환하고 [75, 50]의 결과를 한 줄씩 출력하세요.",starter:'# result(score) 함수를 만들고 [75, 50]을 for로 반복하세요\n',expected:"GO\nMORE",testcase:"기대 출력: GO\nMORE",hint:"함수 안에서 if와 return을 쓰고, 리스트를 for로 순회하며 print(result(score)) 하세요.",explain:"지금까지 배운 리스트, 반복, 함수, 조건, return을 하나의 작은 프로그램으로 연결했어요.",model:'def result(score):\n    if score >= 60:\n        return "GO"\n    return "MORE"\n\nscores = [75, 50]\nfor score in scores:\n    print(result(score))'}
        ]
      }
    },
    en:{
      "concat-bridge":{
        title:"Formatting Bridge",short:"Formatting",focus:["formatting","f-string"],
        description:"Combine text and use f-strings to place variable values naturally inside a sentence.",output:"Hello Jieun",
        exercises:[
          {id:"concat-bridge-c",type:"concept",title:"Put variables into text",body:"You can join strings with +, but f-strings let you place variables and numbers directly inside { }.",code:'name = "Jieun"\nprint(f"Hello {name}")',hint:'Put f before the opening quote and the variable name inside { }.'},
          {id:"concat-bridge-p1",type:"predict",prompt:"What does the classic + concatenation version print?",code:'name = "Amy"\nprint("Hi " + name)',choices:["Hi Amy","HiAmy","Amy Hi","Error"],answer:0,output:"Hi Amy",hint:"Notice the space inside the quoted text.",explain:'The value Amy is joined after "Hi ".'},
          {id:"concat-bridge-p2",type:"predict",prompt:"What does this f-string print?",code:'name = "Jieun"\nprint(f"Hello {name}")',choices:["Hello Jieun","Hello {name}","Jieun Hello","Error"],answer:0,output:"Hello Jieun",hint:"{name} is replaced by the variable value.",explain:"An f-string replaces {name} with the value stored in name."},
          {id:"concat-bridge-f",type:"fill",prompt:"What belongs in the blank to create an f-string?",code:'name = "Mina"\nprint(____"Hi {name}")',tokens:["f","str","+","input"],answer:"f",hint:"Add one letter immediately before the quote.",explain:'f"Hi {name}" is an f-string.'},
          {id:"concat-bridge-b",type:"bughunt",prompt:"Which line incorrectly tries to add a string and an integer?",lines:["level = 3",'print("Lv." + level)'],buggy:1,fixed:'print(f"Lv.{level}")',hint:"A number can be placed directly inside an f-string.",explain:"The f-string safely inserts the integer value of level into the text."},
          {id:"concat-bridge-w",type:"write",prompt:"Write code using name and level in an f-string to print Jieun Lv.4.",starter:'name = "Jieun"\nlevel = 4\n# Print with an f-string\n',expected:"Jieun Lv.4",testcase:"Expected output: Jieun Lv.4",hint:'Try print(f"{name} Lv.{level}").',explain:"You used an f-string to combine text and variables of different types.",model:'name = "Jieun"\nlevel = 4\nprint(f"{name} Lv.{level}")'}
        ]
      },
      "debug-missing-quote":{
        title:"Converting Input",short:"Conversion",focus:["conversion","int"],
        description:"input() returns text. Use int() before arithmetic and str() when a number must become ordinary text.",output:"8",
        exercises:[
          {id:"debug-missing-quote-c",type:"concept",title:"Input starts as text",body:"Values from input() are strings even when they look like numbers. Use int() before arithmetic. Use str() when you need to join a number with ordinary strings.",code:'age_text = "7"\nage = int(age_text)\nprint(age + 1)',hint:'"7" is a string; int("7") is the integer 7.'},
          {id:"debug-missing-quote-p1",type:"predict",prompt:"What prints after the numeric string is converted with int()?",code:'age_text = "7"\nage = int(age_text)\nprint(age + 1)',choices:["8","71","7","Error"],answer:0,output:"8",hint:'int("7") produces the number 7.',explain:"age becomes integer 7, so adding 1 produces 8."},
          {id:"debug-missing-quote-p2",type:"predict",prompt:"What prints when the number is converted with str() before concatenation?",code:'level = 3\nprint("Lv." + str(level))',choices:["Lv.3","Lv.level","3","Error"],answer:0,output:"Lv.3",hint:'str(3) produces the string "3".',explain:"str(level) turns the number into text so it can be joined with Lv.."},
          {id:"debug-missing-quote-f",type:"fill",prompt:"What converts the string 12 into a number so adding 1 produces 13?",code:'number_text = "12"\nnumber = ____(number_text)\nprint(number + 1)',tokens:["int","str","print","input"],answer:"int",hint:"Choose the function that converts numeric text into an integer.",explain:'int(number_text) converts "12" to integer 12.'},
          {id:"debug-missing-quote-b",type:"bughunt",prompt:"Which line must change before this input-like string can be used in arithmetic?",lines:['age_text = "12"','age = age_text','print(age + 1)'],buggy:1,fixed:"age = int(age_text)",hint:"Check whether age is still a string.",explain:"Convert age_text with int() before adding a number."},
          {id:"debug-missing-quote-w",type:"write",prompt:"Convert score_text from the string 40 to a number, add 2, and print 42.",starter:'score_text = "40"\n# Convert with int(), add 2, and print\n',expected:"42",testcase:"Expected output: 42",hint:"Create score = int(score_text), then print(score + 2).",explain:"You converted input-like numeric text into an integer that can be used in arithmetic.",model:'score_text = "40"\nscore = int(score_text)\nprint(score + 2)'}
        ]
      },
      "while-cave":{
        title:"While Cave",short:"while",focus:["while","break"],
        description:"Repeat while a condition is true, and use break when the loop should stop immediately.",output:"0\n1\n2",
        exercises:[
          {id:"while-cave-c",type:"concept",title:"Stop loops safely",body:"A while loop repeats while its condition is true. Something must eventually change, or break must provide an exit. break leaves the loop immediately.",code:'count = 0\nwhile count < 10:\n    print(count)\n    if count == 2:\n        break\n    count = count + 1',hint:"Always identify what makes a while loop stop."},
          {id:"while-cave-p",type:"predict",prompt:"When count reaches 2 and break runs, how far does this print?",code:'count = 0\nwhile count < 10:\n    print(count)\n    if count == 2:\n        break\n    count = count + 1',choices:["0\n1\n2","0 through 9","0\n1","Infinite loop"],answer:0,output:"0\n1\n2",hint:"The code prints first, then checks count == 2 and breaks.",explain:"After printing 2, break immediately ends the while loop."},
          {id:"while-cave-f",type:"fill",prompt:"What belongs in the blank to stop the loop immediately after printing 2?",code:'count = 0\nwhile count < 10:\n    print(count)\n    if count == 2:\n        ____\n    count = count + 1',tokens:["break","continue","return","pass"],answer:"break",hint:"Choose the keyword that exits the loop itself.",explain:"break immediately exits the nearest loop."},
          {id:"while-cave-b",type:"bughunt",prompt:"Which line can make this loop stay true forever?",lines:["count = 0","while count < 3:","    print(count)","    count = count"],buggy:3,fixed:"    count = count + 1",hint:"Check whether count actually changes each time.",explain:"count = count keeps the value unchanged, so the loop condition never becomes false."},
          {id:"while-cave-w",type:"write",prompt:"Print from 1 and use break to stop after printing 2.",starter:'count = 1\nwhile True:\n    # Print count and break when it reaches 2\n',expected:"1\n2",testcase:"Expected output: 1\n2",hint:"Print count, then use if count == 2: break, and increment below it.",explain:"while True is safe here because break provides a clear exit path.",model:'count = 1\nwhile True:\n    print(count)\n    if count == 2:\n        break\n    count = count + 1'}
        ]
      },
      "mini-project":{
        title:"Mini Project",short:"Project",focus:["project","integration"],
        description:"Combine lists, loops, functions, decisions, and return in a small learning-results program.",output:"PASS\nRETRY",
        exercises:[
          {id:"mini-project-c",type:"concept",title:"Assemble a small program",body:"Real programs combine ideas. A function can classify one score, while a for loop takes multiple scores from a list and reuses the same function.",code:'def result(score):\n    if score >= 70:\n        return "PASS"\n    return "RETRY"\n\nscores = [80, 60]\nfor score in scores:\n    print(result(score))',hint:"Notice the pattern: define one function, then apply it repeatedly to data in a list."},
          {id:"mini-project-p",type:"predict",prompt:"What does this learning-results program print?",code:'def result(score):\n    if score >= 70:\n        return "PASS"\n    return "RETRY"\n\nscores = [90, 65]\nfor score in scores:\n    print(result(score))',choices:["PASS\nRETRY","PASS\nPASS","RETRY\nPASS","90\n65"],answer:0,output:"PASS\nRETRY",hint:"Pass 90 and 65 through result() one at a time.",explain:"90 returns PASS; 65 returns RETRY."},
          {id:"mini-project-f",type:"fill",prompt:"What sends the value PASS back to the code that called the function?",code:'def result(score):\n    if score >= 70:\n        ____ "PASS"\n    return "RETRY"\n\nprint(result(80))',tokens:["return","print","for","if"],answer:"return",hint:"Choose the keyword that sends a function result back to its caller.",explain:"return sends the function result back to the calling code."},
          {id:"mini-project-b",type:"bughunt",prompt:"Which line has a syntax error in the loop over multiple scores?",lines:['scores = [80, 60]','for score in scores','    print(score)'],buggy:1,fixed:"for score in scores:",hint:"Check the punctuation at the end of the for line.",explain:"A for statement ends with a colon (:)."},
          {id:"mini-project-w",type:"write",prompt:'Build a small program: return "GO" for scores 60 or higher, otherwise "MORE", then print results for [75, 50].',starter:'# Define result(score), then loop over [75, 50]\n',expected:"GO\nMORE",testcase:"Expected output: GO\nMORE",hint:"Use if and return inside a function, then loop through the list and print(result(score)).",explain:"You combined lists, loops, functions, decisions, and return into one small program.",model:'def result(score):\n    if score >= 60:\n        return "GO"\n    return "MORE"\n\nscores = [75, 50]\nfor score in scores:\n    print(result(score))'}
        ]
      }
    }
  };

  function runtimeState(){try{return typeof S!=="undefined"&&S&&typeof S==="object"?S:null}catch(error){return null}}
  function arrays(){return {ko:window.MEOWDE_LESSONS_KO,en:window.MEOWDE_LESSONS_EN}}
  function shape(lesson){return {slug:lesson.slug,ids:(lesson.exercises||[]).map(item=>item.id),types:(lesson.exercises||[]).map(item=>item.type)}}
  function sameShape(a,b){return a.slug===b.slug&&JSON.stringify(a.ids)===JSON.stringify(b.ids)&&JSON.stringify(a.types)===JSON.stringify(b.types)}
  function applyPatch(lessons,slug,patch){
    if(!Array.isArray(lessons))throw new Error(`Lesson array unavailable for ${slug}`);
    const index=lessons.findIndex(item=>item&&item.slug===slug);
    if(index<0)throw new Error(`Lesson not found: ${slug}`);
    const before=shape(lessons[index]);
    const replacement=Object.assign({},lessons[index],patch,{slug:lessons[index].slug});
    const after=shape(replacement);
    if(!sameShape(before,after))throw new Error(`Curriculum patch changed persisted lesson shape: ${slug}`);
    lessons[index]=replacement;
    return index;
  }
  function apply(){
    const data=arrays();
    const changed=[];
    ["ko","en"].forEach(lang=>{
      Object.entries(PATCHES[lang]).forEach(([slug,patch])=>changed.push({lang,slug,index:applyPatch(data[lang],slug,patch)}));
    });
    document.documentElement.dataset.curriculum=VERSION;
    return changed;
  }
  function refresh(){
    const current=runtimeState();if(!current||current.screen==="lesson")return;
    if(current.screen==="home"&&typeof window.__MEOWDE_CANONICAL_HOME_RENDERER__==="function")window.__MEOWDE_CANONICAL_HOME_RENDERER__();
    else if(current.screen==="map"&&typeof window.__MEOWDE_CANONICAL_LEARN_RENDERER__==="function")window.__MEOWDE_CANONICAL_LEARN_RENDERER__();
    else if(current.screen==="review"&&typeof window.__MEOWDE_CANONICAL_REVIEW_RENDERER__==="function")window.__MEOWDE_CANONICAL_REVIEW_RENDERER__();
  }

  const changes=apply();
  window.MeowCurriculum=Object.freeze({version:VERSION,changes:Object.freeze(changes.map(item=>Object.freeze(item))),patches:PATCHES});
  window.__MEOWDE_VERSION__=VERSION;
  refresh();
})();

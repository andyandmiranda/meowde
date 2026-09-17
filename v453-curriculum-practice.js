(function applyMeowdeV453CurriculumPractice(){
  "use strict";

  const VERSION="4.53-practice-quality";
  const PATCHES={
    ko:{
      "index-tower":{write:{prompt:"직접 작성: pets 리스트의 마지막 값 bird를 인덱스로 출력하세요.",starter:'pets = ["cat", "dog", "bird"]\n# 마지막 값을 출력하세요\n',expected:"bird",testcase:"기대 출력: bird",hint:"세 번째 값의 인덱스는 2예요.",explain:"0부터 시작하는 인덱스를 직접 적용했어요.",model:'pets = ["cat", "dog", "bird"]\nprint(pets[2])'}},
      "append-dock":{description:"append()로 값을 추가하고 len()으로 리스트 길이를 확인해요.",concept:{title:"추가하고 길이 확인하기",body:"append()는 리스트 끝에 값을 추가하고, len()은 현재 값이 몇 개인지 알려줘요.",code:'snacks = ["milk"]\nsnacks.append("churu")\nprint(len(snacks))',hint:"append()는 추가, len()은 개수 확인이에요."},write:{prompt:"직접 작성: snacks에 churu를 추가하고 추가된 값을 출력하세요.",starter:'snacks = ["milk"]\n# churu를 추가하고 출력하세요\n',expected:"churu",testcase:"기대 출력: churu",hint:'append("churu") 후 인덱스 1을 출력하세요.',explain:"append()로 리스트를 바꾸고 새 값을 다시 꺼냈어요.",model:'snacks = ["milk"]\nsnacks.append("churu")\nprint(snacks[1])'}},
      "loop-hill":{write:{prompt:"직접 작성: colors의 모든 값을 한 줄씩 출력하세요.",starter:'colors = ["red", "blue", "green"]\n# for문을 작성하세요\n',expected:"red\nblue\ngreen",testcase:"기대 출력: red\nblue\ngreen",hint:"for color in colors: 다음 줄에서 color를 출력하세요.",explain:"리스트의 값을 하나씩 꺼내는 for 반복을 직접 작성했어요.",model:'colors = ["red", "blue", "green"]\nfor color in colors:\n    print(color)'}},
      "range-rail":{write:{prompt:"직접 작성: range()로 1, 2, 3을 한 줄씩 출력하세요.",starter:"# range()를 사용하세요\n",expected:"1\n2\n3",testcase:"기대 출력: 1\n2\n3",hint:"range(1, 4)는 1부터 3까지 만들어요.",explain:"range의 시작값은 포함하고 끝값은 포함하지 않아요.",model:'for n in range(1, 4):\n    print(n)'}},
      "function-house":{write:{prompt:"직접 작성: meow를 출력하는 meow() 함수를 만들고 호출하세요.",starter:"# meow() 함수를 만들고 호출하세요\n",expected:"meow",testcase:"기대 출력: meow",hint:"def meow(): 안에서 출력하고, 마지막에 meow()를 호출하세요.",explain:"함수는 정의만 하면 실행되지 않고 호출해야 해요.",model:'def meow():\n    print("meow")\nmeow()'}},
      "parameter-mail":{write:{prompt:"직접 작성: name을 받아 Welcome name을 출력하는 함수를 만들고 Amy로 호출하세요.",starter:"# welcome(name) 함수를 만들고 Amy로 호출하세요\n",expected:"Welcome Amy",testcase:"기대 출력: Welcome Amy",hint:'함수 안에서 "Welcome " + name을 출력하세요.',explain:"파라미터를 사용하면 같은 함수를 다른 값으로 재사용할 수 있어요.",model:'def welcome(name):\n    print("Welcome " + name)\nwelcome("Amy")'}},
      "return-spring":{write:{prompt:"직접 작성: 숫자를 3배해 return하는 triple()을 만들고 triple(3)을 출력하세요.",starter:"# triple(x) 함수를 만들고 결과를 출력하세요\n",expected:"9",testcase:"기대 출력: 9",hint:"return x * 3을 사용하세요.",explain:"return 값은 함수 밖에서 다시 계산하거나 출력할 수 있어요.",model:'def triple(x):\n    return x * 3\nprint(triple(3))'}}
    },
    en:{
      "index-tower":{write:{prompt:"Write code: print the last value, bird, using its index.",starter:'pets = ["cat", "dog", "bird"]\n# Print the last value\n',expected:"bird",testcase:"Expected output: bird",hint:"The third value has index 2.",explain:"You applied zero-based indexing directly.",model:'pets = ["cat", "dog", "bird"]\nprint(pets[2])'}},
      "append-dock":{description:"Add values with append() and check list length with len().",concept:{title:"Add and count",body:"append() adds a value to the end of a list, and len() tells you how many items are in it.",code:'snacks = ["milk"]\nsnacks.append("churu")\nprint(len(snacks))',hint:"append() adds; len() counts."},write:{prompt:"Write code: append churu to snacks and print the new value.",starter:'snacks = ["milk"]\n# Append churu and print it\n',expected:"churu",testcase:"Expected output: churu",hint:'Use append("churu"), then print index 1.',explain:"You changed the list with append() and read the new value back.",model:'snacks = ["milk"]\nsnacks.append("churu")\nprint(snacks[1])'}},
      "loop-hill":{write:{prompt:"Write code: print every color on its own line.",starter:'colors = ["red", "blue", "green"]\n# Write a for loop\n',expected:"red\nblue\ngreen",testcase:"Expected output: red\nblue\ngreen",hint:"Use for color in colors:, then print color.",explain:"You wrote a for loop that visits every list item.",model:'colors = ["red", "blue", "green"]\nfor color in colors:\n    print(color)'}},
      "range-rail":{write:{prompt:"Write code: use range() to print 1, 2, 3 on separate lines.",starter:"# Use range()\n",expected:"1\n2\n3",testcase:"Expected output: 1\n2\n3",hint:"range(1, 4) produces 1 through 3.",explain:"range includes the start and excludes the stop value.",model:'for n in range(1, 4):\n    print(n)'}},
      "function-house":{write:{prompt:"Write code: define meow() so it prints meow, then call it.",starter:"# Define and call meow()\n",expected:"meow",testcase:"Expected output: meow",hint:"Print inside def meow():, then call meow().",explain:"Defining a function does not run it; you must call it.",model:'def meow():\n    print("meow")\nmeow()'}},
      "parameter-mail":{write:{prompt:"Write code: define welcome(name), then call it with Amy.",starter:"# Define welcome(name) and call it with Amy\n",expected:"Welcome Amy",testcase:"Expected output: Welcome Amy",hint:'Inside the function, print "Welcome " + name.',explain:"Parameters let one function work with different values.",model:'def welcome(name):\n    print("Welcome " + name)\nwelcome("Amy")'}},
      "return-spring":{write:{prompt:"Write code: define triple() to return three times a number, then print triple(3).",starter:"# Define triple(x) and print its result\n",expected:"9",testcase:"Expected output: 9",hint:"Use return x * 3.",explain:"A returned value can be used or printed outside the function.",model:'def triple(x):\n    return x * 3\nprint(triple(3))'}}
    }
  };

  function runtimeState(){try{return typeof S!=="undefined"&&S&&typeof S==="object"?S:null}catch(error){return null}}
  function patchLesson(lesson,patch){
    if(!lesson||!patch)return false;
    let changed=false;
    for(const key of ["title","short","description","output"]){if(patch[key]!==undefined){lesson[key]=patch[key];changed=true}}
    if(patch.focus){lesson.focus=patch.focus.slice();changed=true}
    if(patch.concept){const ex=lesson.exercises.find(item=>item.type==="concept");if(ex){Object.assign(ex,patch.concept);changed=true}}
    if(patch.write){const ex=lesson.exercises.find(item=>item.type==="write");if(ex){Object.assign(ex,patch.write);changed=true}}
    return changed;
  }
  function apply(){
    const changes=[];
    [[window.MEOWDE_LESSONS_KO,PATCHES.ko,"ko"],[window.MEOWDE_LESSONS_EN,PATCHES.en,"en"]].forEach(([lessons,patches,lang])=>{
      if(!Array.isArray(lessons))return;
      Object.entries(patches).forEach(([slug,patch])=>{const item=lessons.find(lesson=>lesson.slug===slug);if(patchLesson(item,patch))changes.push(`${lang}:${slug}`)});
    });
    document.documentElement.dataset.curriculumPractice="v453";
    return changes;
  }
  function refresh(){
    const current=runtimeState();if(!current||current.screen==="lesson")return;
    if(current.screen==="home"&&typeof window.__MEOWDE_CANONICAL_HOME_RENDERER__==="function")window.__MEOWDE_CANONICAL_HOME_RENDERER__();
    else if(current.screen==="map"&&typeof window.__MEOWDE_CANONICAL_LEARN_RENDERER__==="function")window.__MEOWDE_CANONICAL_LEARN_RENDERER__();
    else if(current.screen==="review"&&typeof window.__MEOWDE_CANONICAL_REVIEW_RENDERER__==="function")window.__MEOWDE_CANONICAL_REVIEW_RENDERER__();
  }

  const changes=apply();
  window.MeowCurriculumPractice=Object.freeze({version:VERSION,changes:Object.freeze(changes),patches:PATCHES});
  window.__MEOWDE_VERSION__=VERSION;
  refresh();
})();

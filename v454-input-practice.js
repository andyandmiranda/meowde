(function applyMeowdeV454InputPractice(){
  "use strict";

  const VERSION="4.54-real-input";
  const PATCHES={
    ko:{
      "input-window":{
        concept:{
          title:"실제 입력값 받기",
          body:"input()은 사용자가 입력한 값을 문자열로 받아요. 아래 프로그램 입력값 칸에 적은 내용이 실제 Python input()으로 전달됩니다.",
          code:'name = input()\nprint("Hi " + name)',
          hint:"input()이 돌려준 문자열을 변수에 저장해 그대로 사용할 수 있어요."
        },
        write:{
          prompt:"직접 실행: 프로그램 입력값에 Amy를 넣고 input()으로 받아 Welcome Amy를 출력하세요.",
          starter:'name = input()\n# Welcome + name을 출력하세요\n',
          expected:"Welcome Amy",
          testcase:"프로그램 입력: Amy · 기대 출력: Welcome Amy",
          hint:'print("Welcome " + name)을 사용하세요.',
          explain:"프로그램 입력값이 실제 input()을 통해 name에 들어왔어요.",
          model:'name = input()\nprint("Welcome " + name)',
          stdin:{default:"Amy",labelKo:"프로그램 입력값",labelEn:"Program input"}
        }
      }
    },
    en:{
      "input-window":{
        concept:{
          title:"Read real input",
          body:"input() reads what a user enters as a string. The Program input field below is passed to the real Python input() function.",
          code:'name = input()\nprint("Hi " + name)',
          hint:"Store the string returned by input() in a variable and use it like any other string."
        },
        write:{
          prompt:"Run it for real: set Program input to Amy, read it with input(), and print Welcome Amy.",
          starter:'name = input()\n# Print Welcome + name\n',
          expected:"Welcome Amy",
          testcase:"Program input: Amy · Expected output: Welcome Amy",
          hint:'Use print("Welcome " + name).',
          explain:"The Program input value entered Python through the real input() function.",
          model:'name = input()\nprint("Welcome " + name)',
          stdin:{default:"Amy",labelKo:"프로그램 입력값",labelEn:"Program input"}
        }
      }
    }
  };

  function runtimeState(){try{return typeof S!=="undefined"&&S&&typeof S==="object"?S:null}catch(error){return null}}
  function patchLesson(lesson,patch){
    if(!lesson||!patch)return false;
    let changed=false;
    if(patch.concept){const ex=lesson.exercises.find(item=>item.type==="concept");if(ex){Object.assign(ex,patch.concept);changed=true}}
    if(patch.write){const ex=lesson.exercises.find(item=>item.type==="write");if(ex){Object.assign(ex,patch.write);changed=true}}
    return changed;
  }
  function apply(){
    const changes=[];
    [[window.MEOWDE_LESSONS_KO,PATCHES.ko,"ko"],[window.MEOWDE_LESSONS_EN,PATCHES.en,"en"]].forEach(([lessons,patches,lang])=>{
      if(!Array.isArray(lessons))return;
      Object.entries(patches).forEach(([slug,patch])=>{
        const lesson=lessons.find(item=>item.slug===slug);
        if(patchLesson(lesson,patch))changes.push(`${lang}:${slug}`);
      });
    });
    document.documentElement.dataset.realInputPractice="v454";
    return changes;
  }

  const baseRunPython=runPython;
  runPython=async function(code){
    const exercise=typeof cur==="function"?cur():null;
    if(!exercise||!exercise.stdin)return baseRunPython(code);
    await warmPy();
    if(!pyodide)throw new Error("no pyodide");
    const current=runtimeState();
    const fallback=String(exercise.stdin.default||"");
    const value=current&&typeof current.stdinValue==="string"?current.stdinValue:fallback;
    const stdinText=`${value}\n`;
    pyodide.runPython('import sys, io\nsys.stdin = io.StringIO(' + JSON.stringify(stdinText) + ')');
    return baseRunPython(code);
  };

  function refresh(){
    const current=runtimeState();if(!current||current.screen==="lesson")return;
    if(current.screen==="home"&&typeof window.__MEOWDE_CANONICAL_HOME_RENDERER__==="function")window.__MEOWDE_CANONICAL_HOME_RENDERER__();
    else if(current.screen==="map"&&typeof window.__MEOWDE_CANONICAL_LEARN_RENDERER__==="function")window.__MEOWDE_CANONICAL_LEARN_RENDERER__();
    else if(current.screen==="review"&&typeof window.__MEOWDE_CANONICAL_REVIEW_RENDERER__==="function")window.__MEOWDE_CANONICAL_REVIEW_RENDERER__();
  }

  const changes=apply();
  window.MeowRealInput=Object.freeze({version:VERSION,changes:Object.freeze(changes),patches:PATCHES});
  window.__MEOWDE_VERSION__=VERSION;
  refresh();
})();
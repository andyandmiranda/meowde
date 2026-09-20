(function applyMeowdeV455WriteGrading(){
  "use strict";

  const VERSION="4.55-multicase-grading";
  const MARKER="__MEOWDE_TEST__";
  const PATCHES={
    "input-window":[
      {stdin:"Mina",expected:"Welcome Mina",labelKo:"다른 입력값",labelEn:"another input"}
    ],
    "function-house":[
      {append:'meow()',expected:"meow",labelKo:"함수 재호출",labelEn:"calling the function again"}
    ],
    "parameter-mail":[
      {append:'welcome("Mina")',expected:"Welcome Mina",labelKo:"다른 인자",labelEn:"another argument"}
    ],
    "return-spring":[
      {append:'print(triple(5))',expected:"15",labelKo:"다른 숫자",labelEn:"another number"}
    ]
  };

  function runtimeState(){try{return typeof S!=="undefined"&&S&&typeof S==="object"?S:null}catch(error){return null}}
  function normalize(value){return String(value==null?"":value).trim()}
  function attach(){
    const changed=[];
    for(const lessons of [window.MEOWDE_LESSONS_KO,window.MEOWDE_LESSONS_EN]){
      if(!Array.isArray(lessons))continue;
      for(const [slug,tests] of Object.entries(PATCHES)){
        const lesson=lessons.find(item=>item.slug===slug);
        const write=lesson&&lesson.exercises&&lesson.exercises.find(item=>item.type==="write");
        if(!write)continue;
        write.grading={tests:tests.map(test=>Object.assign({},test))};
        changed.push(slug);
      }
    }
    document.documentElement.dataset.writeGrading="v455";
    return changed;
  }

  let lastResult=null;
  const baseRunPython=runPython;

  async function runTest(code,test){
    const state=runtimeState();
    const previousInput=state&&state.stdinValue;
    try{
      if(state&&test.stdin!==undefined)state.stdinValue=String(test.stdin);
      let testCode=code;
      if(test.append)testCode+=`\nprint("${MARKER}")\n${test.append}`;
      const output=await baseRunPython(testCode);
      if(String(output).startsWith("ERROR:"))return {pass:false,output};
      let observed=String(output);
      if(test.append){
        const markerIndex=observed.lastIndexOf(MARKER);
        if(markerIndex<0)return {pass:false,output:observed};
        observed=observed.slice(markerIndex+MARKER.length).replace(/^\r?\n/,"");
      }
      return {pass:normalize(observed)===normalize(test.expected),output:observed};
    }finally{
      if(state&&test.stdin!==undefined)state.stdinValue=previousInput;
    }
  }

  runPython=async function(code){
    const exercise=typeof cur==="function"?cur():null;
    const tests=exercise&&exercise.grading&&Array.isArray(exercise.grading.tests)?exercise.grading.tests:[];
    if(!exercise||exercise.type!=="write"||!tests.length)return baseRunPython(code);

    const visible=await baseRunPython(code);
    if(normalize(visible)!==normalize(exercise.expected)){
      lastResult={passed:false,visiblePassed:false,total:tests.length,failed:[]};
      return visible;
    }

    const failed=[];
    for(const test of tests){
      const result=await runTest(code,test);
      if(!result.pass)failed.push({labelKo:test.labelKo||"",labelEn:test.labelEn||"",output:result.output});
    }
    const passed=failed.length===0;
    lastResult={passed,visiblePassed:true,total:tests.length,failed};
    if(passed)return visible;

    const ko=runtimeState()&&S.lang!=="en";
    const label=failed[0]&&(ko?failed[0].labelKo:failed[0].labelEn);
    const message=ko
      ?`추가 테스트 실패${label?` · ${label}`:""}: 같은 원리를 다른 값에도 적용해보세요.`
      :`Extra test failed${label?` · ${label}`:""}: make the same logic work for other values.`;
    return `${visible}\n${message}`;
  };

  const changes=attach();
  window.MeowWriteGrading=Object.freeze({version:VERSION,changes:Object.freeze(changes),tests:PATCHES,lastResult:()=>lastResult});
  window.__MEOWDE_VERSION__=VERSION;
})();
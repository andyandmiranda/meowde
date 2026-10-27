/* Outcome-based checks for the limited Linux learning simulator. */
(function(root){
"use strict";
const supported={
  0:{check:(state,result)=>result.ok&&result.output==="/home/student"},
  1:{check:(state,result)=>result.ok&&result.output==="INFO retry\nERROR timeout"},
  2:{check:(state,result)=>result.ok&&result.output==="2:ERROR network\n4:ERROR timeout"}
};
// A small, non-executing syntax checker. Only explicitly supported forms pass;
// this does not claim to simulate real shell execution or permissions.
const syntaxRules={
  3:{pattern:/^cat\\s+(?:names\\.txt|\\.\\/names\\.txt)\\s*\\|\\s*sort$/,goal:"names.txt를 sort로 정렬하는 파이프라인"},
  4:{pattern:/^chmod\\s+0?600\\s+(?:secret\\.txt|\\.\\/secret\\.txt)$/,goal:"secret.txt에 소유자 읽기·쓰기 권한만 설정"},
  5:{pattern:/^ps\\s+(?:aux|auxww)$/,goal:"프로세스 목록 표시"},
  6:{pattern:/^apt(?:-cache)?\\s+search\\s+tree$/,goal:"tree 패키지 검색"},
  7:{pattern:/^echo\\s+(?:"\\$name"|'\\$name'|\\$name)$/,goal:"name 변수 값 출력"}
};
function gradeSyntax(index,command){
 const rule=syntaxRules[index];if(!rule)return null;
 const input=String(command).trim().replace(/\\s+/g," ");
 const ok=rule.pattern.test(input);
 return {supported:true,ok,verified:"syntax",message:ok?"학습 목표에 맞는 명령 구조예요. 실제 Linux 실행은 확인하지 않았어요.":"이 단계의 지원 명령 구조와 달라요. "+rule.goal+"을 다시 확인하세요."};
}
function grade(index,command){
 const syntax=gradeSyntax(index,command);if(syntax)return syntax;
 const rule=supported[index];
 if(!rule)return {supported:false,ok:false,message:"이 단계는 실행 결과를 모의하지 않아요. 예제의 구조를 확인한 뒤 도전 문제로 넘어가세요."};
 const sim=root.MeowdeLinuxSim.create(),result=sim.run(command),state=sim.snapshot();
 if(!result.ok)return {supported:true,ok:false,message:"명령을 처리하지 못했어요. "+result.output};
 const ok=rule.check(state,result);
 return {supported:true,ok,message:ok?"예상한 결과가 확인됐어요. 이제 다른 상황에 적용해 보세요.":"명령은 실행됐지만 문제에서 요구한 결과와 달라요. 출력과 옵션을 확인해 보세요.",output:result.output};
}
root.MeowdeLinuxCommandPractice={supported,grade};
})(typeof window!=="undefined"?window:globalThis);

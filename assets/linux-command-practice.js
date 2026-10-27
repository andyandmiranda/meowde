/* Outcome-based checks for the limited Linux learning simulator. */
(function(root){
"use strict";
const supported={
  0:{check:(state,result)=>result.ok&&result.output==="/home/student"},
  1:{check:(state,result)=>result.ok&&result.output==="INFO retry\nERROR timeout"},
  2:{check:(state,result)=>result.ok&&result.output==="2:ERROR network\n4:ERROR timeout"}
};
function grade(index,command){
 const rule=supported[index];
 if(!rule)return {supported:false,ok:false,message:"이 단계는 실행 결과를 모의하지 않아요. 예제의 구조를 확인한 뒤 도전 문제로 넘어가세요."};
 const sim=root.MeowdeLinuxSim.create(),result=sim.run(command),state=sim.snapshot();
 if(!result.ok)return {supported:true,ok:false,message:"명령을 처리하지 못했어요. "+result.output};
 const ok=rule.check(state,result);
 return {supported:true,ok,message:ok?"예상한 결과가 확인됐어요. 이제 다른 상황에 적용해 보세요.":"명령은 실행됐지만 문제에서 요구한 결과와 달라요. 출력과 옵션을 확인해 보세요.",output:result.output};
}
root.MeowdeLinuxCommandPractice={supported,grade};
})(typeof window!=="undefined"?window:globalThis);

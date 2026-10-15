(function(){
"use strict";
let storage;try{storage=window.localStorage;}catch(error){storage={getItem(){throw error;}};}
const record=window.MeowdeLinuxProgress.open(storage),state=record.state;
const link=document.getElementById("guided-entry"),status=document.getElementById("guided-status");
if(record.issue){status.textContent=record.issue;return;}
if(state.step===4){link.textContent="완료한 레슨 보기 →";status.textContent="첫 폴더 만들기 완료 · 두 문제의 결과를 확인했어요.";}
else if(state.step>0||state.input){link.textContent="이어서 학습하기 →";status.textContent="저장된 "+(state.step+1)+" / 4 단계부터 이어가요.";}
})();

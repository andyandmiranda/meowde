(function(root){
"use strict";
const KEY="meowde-linux-guided-v1";
const fresh=()=>({version:1,step:0,input:"",solutions:{},hints:{training:0,travel:0}});
function verify(command,target){
 if(typeof command!=="string"||command.length>180)return false;
 const sim=root.MeowdeLinuxSim.create(),result=sim.run(command);
 return result.ok&&sim.snapshot().files["/home/student/"+target]?.type==="dir";
}
function normalize(value){
 if(!value||value.version!==1||!Number.isInteger(value.step)||value.step<0||value.step>4||typeof value.input!=="string"||value.input.length>180||!value.solutions||!value.hints)throw new Error("Unsupported progress");
 const state=fresh();state.step=value.step;state.input=value.input;
 for(const target of ["training","travel"]){
  if(verify(value.solutions[target],target))state.solutions[target]=value.solutions[target];
  state.hints[target]=Number.isInteger(value.hints[target])?Math.max(0,Math.min(2,value.hints[target])):0;
 }
 if(state.step>=3&&!state.solutions.training){state.step=2;state.input="";delete state.solutions.travel;}
 if(state.step===4&&!state.solutions.travel){state.step=3;state.input="";}
 return state;
}
function open(storage){
 let state=fresh(),writable=true,issue="";
 try{const raw=storage.getItem(KEY);if(raw!==null)state=normalize(JSON.parse(raw));}
 catch(error){writable=false;issue="저장된 기록을 읽지 못했어요. 원본은 보존했으며, 이번 연습은 저장되지 않아요.";}
 return {state,get issue(){return issue;},save(){
  if(!writable)return false;
  try{storage.setItem(KEY,JSON.stringify(state));issue="";return true;}
  catch(error){issue="지금은 기록을 저장하지 못했어요. 화면을 닫으면 이번 진행이 사라질 수 있어요.";return false;}
 }};
}
root.MeowdeLinuxProgress={KEY,fresh,verify,normalize,open};
})(typeof window!=="undefined"?window:globalThis);

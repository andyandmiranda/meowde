/* E8/E9 instructional condition evaluator; never evaluates user code. */
(function(root){"use strict";
const cases=[
{id:"battery",label:"배터리 충전 판단",limit:30,operator:"-lt",yes:"충전이 필요해요",no:"계속 사용할 수 있어요"},
{id:"pass",label:"점수 통과",limit:80,operator:"-ge",yes:"PASS",no:"RETRY"}
];
function run(id,value){
 const c=cases.find(c=>c.id===id);
 if(!c)return {ok:false,error:"알 수 없는 실습"};
 const raw=String(value).trim();
 if(!/^-?[0-9]{1,5}$/.test(raw))return {ok:false,error:"정수를 입력해 줘."};
 const n=Number(raw),matched=c.operator==="-lt"?n<c.limit:n>=c.limit;
 return {ok:true,input:n,matched,output:matched?c.yes:c.no,trace:["입력값: "+n,"조건: "+n+" "+c.operator+" "+c.limit+" → "+(matched?"참":"거짓"),"실행 분기: "+(matched?"then":"else")]};
}
root.MeowdeConditions={cases,run};
})(typeof window!=="undefined"?window:globalThis);
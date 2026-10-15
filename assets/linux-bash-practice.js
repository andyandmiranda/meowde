(function(root){"use strict";
const tasks=[{id:"battery",variable:"battery",operator:"-lt",limit:30,yes:"충전이 필요해요",no:"계속 사용할 수 있어요",samples:[15,29,30,75]},{id:"pass",variable:"score",operator:"-ge",limit:80,yes:"PASS",no:"RETRY",samples:[60,79,80,95]}];
function grade(id,source){
 const t=tasks.find(x=>x.id===id);if(!t)return {ok:false,error:"미지원 과제"};
 if(typeof source!=="string"||source.length>700)return {ok:false,error:"입력 길이를 확인해 줘."};
 const lines=source.replace(/\r\n?/g,"\n").trim().split("\n").map(x=>x.trim()).filter(Boolean);
 if(lines.length!==5||lines[2]!=="else"||lines[4]!=="fi")return {ok:false,error:"if / echo / else / echo / fi 구조를 확인해 봐."};
 const m=/^if\s+\[\s*"?\$([a-z]+)"?\s+(-lt|-le|-gt|-ge|-eq|-ne)\s+(-?\d+)\s*\]\s*;?\s*then$/.exec(lines[0]);
 const a=/^echo\s+["']([^"'\n]+)["']$/.exec(lines[1]),b=/^echo\s+["']([^"'\n]+)["']$/.exec(lines[3]);
 if(!m||m[1]!==t.variable||!a||!b)return {ok:false,error:"지원 문법은 if [ \"$변수\" -lt 숫자 ]; then 및 echo 문자열이야."};
 const op=m[2],lim=Number(m[3]);
 const check=n=>op==="-lt"?n<lim:op==="-le"?n<=lim:op==="-gt"?n>lim:op==="-ge"?n>=lim:op==="-eq"?n===lim:n!==lim;
 const errors=t.samples.filter(n=>{const expected=(t.operator==="-lt"?n<t.limit:n>=t.limit)?t.yes:t.no;return (check(n)?a[1]:b[1])!==expected});
 return {ok:errors.length===0,passed:t.samples.length-errors.length,total:t.samples.length,error:errors.length?"일부 입력에서 출력이 달라. 경계값과 분기를 확인해 봐.":null};
}
root.MeowdeBashPractice={tasks,grade};
})(typeof window!=="undefined"?window:globalThis);
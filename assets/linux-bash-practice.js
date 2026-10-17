(function(root){"use strict";
const tasks=[{id:"battery",variable:"battery",operator:"-lt",limit:30,yes:"충전이 필요해요",no:"계속 사용할 수 있어요",samples:[15,29,30,75]},{id:"pass",variable:"score",operator:"-ge",limit:80,yes:"PASS",no:"RETRY",samples:[60,79,80,95]}];
function grade(id,source){
 const t=tasks.find(x=>x.id===id);if(!t)return {ok:false,error:"미지원 과제"};
 if(typeof source!=="string"||source.length>700)return {ok:false,error:"입력 길이를 확인해 줘."};
 const lines=source.replace(/\r\n?/g,"\n").trim().split("\n").map(x=>x.trim()).filter(Boolean);
 if(lines.length!==5||lines[2]!=="else"||lines[4]!=="fi")return {ok:false,error:"if / echo / else / echo / fi 구조를 확인해 봐."};
 const m=/^if\s+\[\s+(?:"\$([a-z]+)"|\$([a-z]+))\s+(-lt|-le|-gt|-ge|-eq|-ne)\s+(-?\d+)\s+\]\s*;\s*then$/.exec(lines[0]);
 const a=/^echo\s+(["'])([^"'\n]+)\1$/.exec(lines[1]),b=/^echo\s+(["'])([^"'\n]+)\1$/.exec(lines[3]);
 if(!m||(m[1]||m[2])!==t.variable||!a||!b)return {ok:false,error:"if [ \"$변수\" -lt 숫자 ]; then 형식에서 [ ] 안쪽 공백, then 앞 세미콜론, 따옴표 짝을 확인해 봐."};
 const op=m[3],lim=Number(m[4]);
 const check=n=>op==="-lt"?n<lim:op==="-le"?n<=lim:op==="-gt"?n>lim:op==="-ge"?n>=lim:op==="-eq"?n===lim:n!==lim;
 const errors=t.samples.flatMap(n=>{const expected=(t.operator==="-lt"?n<t.limit:n>=t.limit)?t.yes:t.no,actual=check(n)?a[2]:b[2];return actual!==expected?[{input:n,expected,actual}]:[]});
 const first=errors[0];
 return {ok:errors.length===0,passed:t.samples.length-errors.length,total:t.samples.length,failures:errors,error:first?`${t.variable}=${first.input}일 때 기대 출력은 “${first.expected}”, 현재 출력은 “${first.actual}”이야. 경계값과 분기를 확인해 봐.`:null};
}
root.MeowdeBashPractice={tasks,grade};
})(typeof window!=="undefined"?window:globalThis);

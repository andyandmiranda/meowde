/* Optional curiosity-first pilot. No storage, grading engine, or reward mutations. */
(function(root){
'use strict';
const tasks=Object.freeze([
 Object.freeze({id:'cat-index',items:['나비','루나','모카','두부'],target:'모카',answer:2,concept:'Python 리스트는 0부터 번호를 세요.',code:"cats = ['나비', '루나', '모카', '두부']\nprint(cats[2])"}),
 Object.freeze({id:'transfer-index',items:['사과','바나나','포도','복숭아','수박'],target:'수박',answer:4,concept:'항목이 달라져도 첫 번째 위치는 0이에요.',code:"fruits = ['사과', '바나나', '포도', '복숭아', '수박']\nprint(fruits[4])"})
]);
function grade(taskId,choice){
 const task=tasks.find(item=>item.id===taskId);
 if(!task||!Number.isInteger(choice)||choice<0||choice>=task.items.length)return {valid:false,correct:false};
 return {valid:true,correct:choice===task.answer};
}
root.MeowdeCuriosityPilot=Object.freeze({tasks,grade});
})(typeof window!=='undefined'?window:globalThis);

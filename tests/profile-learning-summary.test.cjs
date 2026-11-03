const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('v420-profile.js','utf8');
function fixture(S){
 const c={S,lessons:()=>Array.from({length:60},(_,i)=>({exercises:[{id:'q'+i}]}))};vm.createContext(c);
 for(const [start,end] of [['function myLearningSummary(','function dateKey('],['function unitRows(','function insightData(']])vm.runInContext(source.slice(source.indexOf(start),source.indexOf(end)),c);
 return c;
}
test('progress ignores duplicates and unavailable indexes without changing stored state',()=>{
 const S={lang:'ko',done:[0,30,59,59,80,-1,'1'],mistakes:[{lang:'ko',lessonIndex:0,exerciseId:'q0'},{lang:'ko',lessonIndex:0,exerciseId:'q0'},{lang:'en',lessonIndex:1,exerciseId:'q1'},{lang:'ko',lessonIndex:2,exerciseId:'missing'}],future:{keep:true}};
 const before=JSON.stringify(S),c=fixture(S);assert.equal(JSON.stringify(c.myLearningSummary()),JSON.stringify({done:3,total:60,percent:5,missed:1}));assert.equal(JSON.stringify(S),before);
});
test('unit records cover all available lessons instead of truncating after the third unit',()=>{
 const c=fixture({lang:'ko',done:[0,30,59]});const units=c.unitRows();assert.equal(units.length,6);assert.equal(units.reduce((n,x)=>n+x.total,0),60);assert.equal(units[3].done,1);assert.equal(units[5].done,1);
});

const assert=require('node:assert/strict'),test=require('node:test'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('index.html','utf8').match(/async function checkQ\(\)\{[^\n]*\}/)[0];
function harness(){
 let resolve,calls=0;const pending=new Promise(r=>resolve=r),ex={type:'write',expected:'ok',starter:'print("ok")'};
 const state={loading:false,checked:false,correct:false,write:'print("ok")',firstCorrect:0,firstTotal:1,combo:0,maxCombo:0,xpEarned:0,daily:false,queue:[ex]};
 const context={S:state,cur:()=>ex,renderLesson(){},runPython(){calls++;return pending;},t:()=>'',Object};
 vm.runInNewContext(source+'\nthis.check=checkQ;',context);
 return {state,check:()=>context.check(),resolve:()=>resolve('ok'),calls:()=>calls};
}
test('concurrent run clicks execute and award only once',async()=>{
 const h=harness(),first=h.check(),second=h.check();h.resolve();await Promise.all([first,second]);
 assert.equal(h.calls(),1);assert.equal(h.state.firstCorrect,1);assert.equal(h.state.xpEarned,10);
});
test('already checked submissions cannot receive another score or reward',async()=>{
 const h=harness(),first=h.check();h.resolve();await first;await h.check();
 assert.equal(h.calls(),1);assert.equal(h.state.firstCorrect,1);assert.equal(h.state.xpEarned,10);
});

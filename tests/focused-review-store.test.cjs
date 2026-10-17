const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const c={};vm.runInNewContext(fs.readFileSync('assets/focused-review-store.js','utf8'),c);const api=c.MeowFocusedReviewStore;
function storage(){const values=new Map([['meowde-v410-state','legacy python'],['meowde-linux-guided-v1','legacy linux']]);return {values,getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v)};}
const miss={lessonId:'start-field',exerciseId:'start-field-w',lang:'ko',correct:false};
test('future misses remain after retry and subjects stay isolated',()=>{
 const s=storage(),py=api.open(s,'python');assert.equal(py.attempt({...miss,correct:true}),null);
 py.attempt(miss);const first=py.state.records[0].firstMissedAt;py.attempt({...miss,correct:true,retry:true});
 const restored=api.open(s,'python');assert.equal(restored.state.records[0].firstMissedAt,first);assert.equal(restored.state.records[0].attempts,2);assert.equal(restored.state.records[0].retrySuccesses,1);
 assert.equal(api.open(s,'linux').state.records.length,0);assert.equal(s.values.get('meowde-v410-state'),'legacy python');assert.equal(s.values.get('meowde-linux-guided-v1'),'legacy linux');
});
test('review stages distinguish initial errors and assisted success',()=>{
 const py=api.open(storage(),'python');py.attempt(miss);py.attempt({...miss,stage:'application'});py.attempt({...miss,correct:true,stage:'application',retry:true});
 const stage=py.state.records[0].stages.application;assert.equal(stage.firstCorrect,false);assert.equal(stage.passed,true);assert.equal(stage.assisted,true);py.viewed(miss.lessonId,miss.exerciseId,'ko','concept');assert.equal(py.state.records[0].stages.concept.viewed,true);
});
test('unreadable records are never overwritten, and quota errors remain visible',()=>{
 const s=storage();s.values.set(api.keys.python,'{broken');const py=api.open(s,'python');py.attempt(miss);assert.equal(s.values.get(api.keys.python),'{broken');assert.match(py.issue,/원본은 보존/);
 const denied=api.open({getItem(){throw Error('denied');}},'linux');assert.match(denied.issue,/저장되지/);
 const quota=api.open({getItem(){return null;},setItem(){throw Error('quota');}},'python');quota.attempt(miss);assert.match(quota.issue,/저장하지 못/);
});

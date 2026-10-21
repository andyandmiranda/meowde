const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync('v417-review.js','utf8');
function makeFixture({done=[],mistakes=[]}={}){
  const records=new Map();
  const lessonsData=[{title:'First lesson',exercises:[{id:'e1',type:'choice'},{id:'e2',type:'choice'}]},{title:'Second lesson',exercises:[{id:'e3',type:'choice'}]}];
  const S={lang:'ko',lessonIndex:0,next:0,done,mistakes,screen:'home',checked:false};
  const doc={documentElement:{dataset:{}},title:''};
  const context={S,document:doc,localStorage:{getItem:k=>records.get(k)||null,setItem:(k,v)=>records.set(k,v)},lessons:()=>lessonsData,checkQ:async()=>{},finish:()=>{},save:()=>{},startLesson:()=>{},toast:()=>{},esc:s=>String(s),console};
  context.window=context;
  vm.runInNewContext(source,context);
  return {api:context.MeowSmartReview,context,records};
}
test('fresh learners never receive unseen exercises under completed-lesson review copy',()=>{
  const {api}=makeFixture();
  assert.equal(api.recommendations().length,0);
  const html=api.card();
  assert.match(html,/아직 복습할 문제가 없어요/);
  assert.match(html,/disabled aria-disabled="true"/);
  assert.doesNotMatch(html,/완료한 레슨에서 기억을 유지할 문제를 골랐습니다/);
});
test('completed lesson unlocks only its own exercises',()=>{
  const {api}=makeFixture({done:[0]});
  const selected=api.recommendations();
  assert.equal(selected.length,2);
  assert.deepEqual(Array.from(selected,x=>x.exercise.id),['e1','e2']);
  assert.match(api.card(),/onclick="startSmartReview\(\)"/);
});
test('existing recorded mistakes remain reviewable before completion',()=>{
  const {api}=makeFixture({mistakes:[{lang:'ko',lessonIndex:1,exerciseId:'e3',key:'wrong-e3',count:2}]});
  const selected=api.recommendations();
  assert.equal(selected.length,1);
  assert.equal(selected[0].exercise.id,'e3');
});

const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync('v417-review.js','utf8');
const KEY='meowde-v417-review';
function fixture(raw=null,{denyRead=false,xp=123,churu=57}={}){
  const records=new Map(raw===null?[]:[[KEY,raw]]);
  let mode='lesson',starts=0,finishes=0,writes=0;
  const S={lang:'ko',lessonIndex:0,done:[0],next:1,xp,churu,mistakes:[],screen:'home'};
  const context={S,document:{documentElement:{dataset:{}},querySelector:()=>null},
    localStorage:{getItem:key=>{if(denyRead)throw new Error('SecurityError');return records.get(key)??null;},setItem:(key,value)=>{writes++;records.set(key,value);}},
    lessons:()=>[{title:'First lesson',exercises:[{id:'e1',type:'predict'}]}],
    startLesson:(index,daily,queue,options)=>{starts++;mode=options.mode;options.onStarted();},
    meowdeMode:()=>mode,meowdeTodayKey:()=>'2026-10-20',
    checkQ:async()=>{},finish:()=>{finishes++;mode='lesson';},save:()=>{},toast:()=>{},esc:String,console:{warn:()=>{}}};
  context.window=context;vm.runInNewContext(source,context);
  return {context,records,counts:()=>({starts,finishes,writes}),resume:()=>{mode='smart-review';}};
}
for(const raw of ['{broken','null','[]','42','{"days":[],"history":[]}','{"days":{},"history":{}}']){
  test('unreadable review record stays byte-identical: '+raw,()=>{
    const f=fixture(raw);f.context.startSmartReview();
    assert.equal(f.records.get(KEY),raw);
    assert.deepEqual(f.counts(),{starts:0,finishes:0,writes:0});
    assert.match(f.context.MeowSmartReview.card(),/원본.*보존/);
    assert.match(f.context.MeowSmartReview.card(),/disabled aria-disabled="true"/);
    f.context.S.lang='en';assert.match(f.context.MeowSmartReview.card(),/original.*preserved/);
  });
}
test('read denial cannot overwrite a hidden claimed reward or grant it again',()=>{
  const raw='{"days":{"2026-10-20":{"xp":10,"churu":5}},"history":[]}';
  const f=fixture(raw,{denyRead:true});f.context.startSmartReview();
  f.resume();f.context.finish();
  assert.equal(f.records.get(KEY),raw);
  assert.deepEqual(f.counts(),{starts:0,finishes:0,writes:0});
  assert.equal(f.context.S.xp,123);assert.equal(f.context.S.churu,57);
  const reopened=fixture(f.records.get(KEY));reopened.context.startSmartReview();reopened.context.finish();
  assert.equal(reopened.context.S.xp,123);assert.equal(reopened.context.S.churu,57);
});
test('valid new review earns exact daily reward once, including reload and repeat',()=>{
  const f=fixture();f.context.startSmartReview();f.context.finish();
  assert.equal(f.context.S.xp,133);assert.equal(f.context.S.churu,62);
  assert.deepEqual(Array.from(f.context.S.done),[0]);assert.equal(f.context.S.next,1);
  const reopened=fixture(f.records.get(KEY),{xp:133,churu:62});
  reopened.context.startSmartReview();reopened.context.finish();
  assert.equal(reopened.context.S.xp,133);assert.equal(reopened.context.S.churu,62);
  const saved=JSON.parse(reopened.records.get(KEY));
  assert.equal(saved.days['2026-10-20'].xp,10);assert.equal(saved.days['2026-10-20'].churu,5);
  assert.equal(saved.history.length,2);
});

const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
function boot(record={}){
 const disk=new Map([['meowde-v410-state',JSON.stringify(record)]]);
 let fail=false;
 const c={console,Date,document:{},window:null,rawState:record,DATA:{ko:[],en:[]},
  S:{lang:'ko',done:[],next:0,xp:7,churu:8,queue:[],idx:0,lessonIndex:0,...record},
  lessons:()=>Array.from({length:60},(_,i)=>({title:'Lesson '+i,exercises:[{id:'q'+i,type:'predict',choices:['a','b'],answer:0}]})),
  localStorage:{getItem:k=>disk.get(k)||null,setItem:(k,v)=>{if(fail)throw new Error('quota');disk.set(k,v)}},
  hasLessonProgress:()=>c.S.queue.length>0&&c.S.idx<c.S.queue.length,
  cur:()=>c.S.queue[c.S.idx],save:()=>{},renderLesson:()=>{},resumeLesson:()=>{},
  closeOverlay:()=>{},overlay:()=>{},toast:message=>{c.message=message},esc:String,
  checkQ:async()=>{},startLesson:(i,daily,queue)=>{Object.assign(c.S,{lessonIndex:i,idx:0,queue:queue||c.lessons()[i].exercises,write:'',xpEarned:0,combo:0,maxCombo:0,firstTotal:1,firstCorrect:0,daily});return c.save()},
  clearLessonProgress:()=>{c.S.queue=[];c.S.idx=0},catSVG:()=>'',t:k=>k,app:{},renderMap:()=>{}};
 c.window=c;vm.createContext(c);
 vm.runInContext(fs.readFileSync('assets/lesson-access-policy.js','utf8'),c);
 vm.runInContext(fs.readFileSync('v414-state.js','utf8'),c);
 vm.runInContext(fs.readFileSync('v414-reward.js','utf8'),c);
 return {c,disk,setFailure:()=>{fail=true},saved:()=>JSON.parse(disk.get('meowde-v410-state'))};
}
test('switch/reload/return keeps each lesson draft, retry queue, inputs and rewards',()=>{
 let b=boot();const {c}=b;
 c.startLesson(0);Object.assign(c.S,{idx:1,queue:[{id:'q0',type:'predict'},{id:'q0',type:'predict',retry:true}],write:'private draft',stdinValue:'17',checked:true,correct:false,hint:true,xpEarned:10});
 c.startLesson(59,false,null,{force:true});
 assert.equal(c.S.lessonIndex,59);assert.equal(c.S.xp,7);assert.equal(c.S.churu,8);assert.deepEqual(c.S.done,[]);
 const stored=b.saved();b=boot(stored);b.c.startLesson(0,false,null,{force:true});
 assert.equal(b.c.S.idx,1);assert.equal(b.c.S.write,'private draft');assert.equal(b.c.S.stdinValue,'17');assert.equal(b.c.S.hint,true);assert.equal(b.c.S.checked,true);assert.equal(b.c.S.queue[1].retry,true);
 b.c.startLesson(59,false,null,{force:true});assert.equal(b.c.S.idx,0);assert.equal(b.c.S.write,'');
});
test('storage failure blocks switching without mutating active lesson or persisted bytes',()=>{
 const b=boot();b.c.startLesson(0);b.c.S.write='keep me';b.c.save();const before=b.disk.get('meowde-v410-state');
 b.setFailure();b.c.startLesson(59,false,null,{force:true});
 assert.equal(b.c.S.lessonIndex,0);assert.equal(b.c.S.write,'keep me');assert.equal(b.disk.get('meowde-v410-state'),before);assert.match(b.c.message,/저장/);
});
test('unknown snapshot collection is preserved and blocks switching',()=>{
 const b=boot({lessonResumes:['future data']});b.c.startLesson(10);
 assert.equal(b.c.S.queue.length,0);assert.deepEqual(b.c.S.lessonResumes,['future data']);
});
test('out-of-order completion recommends first unfinished lesson; resume does not duplicate XP',()=>{
 const b=boot();const c=b.c;c.startLesson(59);c.S.xpEarned=20;c.S.firstCorrect=1;c.finish();
 assert.deepEqual(c.S.done,[59]);assert.equal(c.S.next,0);assert.equal(c.S.xp,27);assert.equal(Object.keys(c.S.lessonResumes).length,0);
 c.startLesson(59);c.S.xpEarned=20;c.finish();assert.equal(c.S.xp,27);assert.deepEqual(c.S.done,[59]);
 c.startLesson(0);c.S.xpEarned=10;c.finish();assert.equal(c.S.next,1);assert.deepEqual(c.S.done,[0,59]);
});
test('invalid selection and loading execution cannot replace a live session',()=>{
 const b=boot();b.c.startLesson(0);const q=b.c.S.queue;
 for(const index of [-1,60,'2',NaN])b.c.startLesson(index,false,null,{force:true});
 b.c.S.loading=true;b.c.startLesson(59,false,null,{force:true});assert.equal(b.c.S.queue,q);
});

test('early serializers retain future lesson 60 and archived places until curriculum loads',()=>{
 const html=fs.readFileSync('index.html','utf8');
 const saveStart=html.indexOf('function save(');
 const helper=html.slice(html.indexOf('function preserveDeferredLessonState('),saveStart);
 const original={lang:'ko',lessonIndex:59,idx:1,queue:[{id:'late',type:'concept'}, {id:'late-q',type:'predict'}],resumeKey:'lesson-60'};
 const archives={old:{lessonIndex:0,write:'keep'}};
 const c={rawState:{inProgress:original,lessonResumes:archives},lessons:()=>Array(30)};vm.createContext(c);vm.runInContext(helper,c);
 const saved=c.preserveDeferredLessonState({inProgress:{lessonIndex:29}});
 assert.equal(saved.inProgress,original);assert.equal(saved.lessonResumes,archives);
 c.lessons=()=>Array(60);
 const current={inProgress:{lessonIndex:0},lessonResumes:{new:'latest'}};
 assert.equal(c.preserveDeferredLessonState(current),current);assert.equal(current.inProgress.lessonIndex,0);
 for(const file of ['v412-hotfix.js','v414-state.js']){
  const source=fs.readFileSync(file,'utf8');
  assert.match(source,/preserveDeferredLessonState\(next\)/);
  assert.match(source,/JSON.stringify\(preserved\)/);
  assert.match(source,/storageReadProblem/);
 }
 assert.match(html,/const next=preserveDeferredLessonState\(state\)/);
 assert.match(html,/JSON.stringify\(prepared\)/);
});

test('a changing review recommendation order resumes the saved identity instead of restarting',()=>{
 const b=boot();const c=b.c;
 c.startLesson(0,false,[{id:'a',type:'predict'},{id:'b',type:'predict'}],{mode:'smart-review'});
 c.S.checked=true;c.S.firstCorrect=1;
 c.startLesson(59,false,null,{force:true});
 const key=Object.keys(c.S.lessonResumes).find(key=>c.S.lessonResumes[key].mode==='smart-review');
 c.startLesson(0,false,[{id:'b',type:'predict'},{id:'a',type:'predict'}],{mode:'smart-review',resumeKey:key,force:true,onStarted:()=>{throw Error('must not start a fresh session')}});
 assert.equal(c.S.checked,true);assert.equal(c.S.firstCorrect,1);assert.equal(c.S.queue[0].id,'a');
});

test('legacy serializer wrappers preserve unknown fields and deferred future progress',()=>{
 for(const [file,fnName] of [['v412-hotfix.js','safeSave'],['v414-state.js','v414Save']]){
  const source=fs.readFileSync(file,'utf8');
  const start=source.indexOf('function '+fnName+'(');
  const end=source.indexOf('\n  save='+fnName+';',start);
  assert.ok(start>=0&&end>start);
  const wrapper=source.slice(start,end);
  for(const mode of ['normal','unreadable','quota']){
   let writes=0,persisted=null;
   const original={futureField:{keep:true},inProgress:{lessonIndex:59,queue:[{id:'later'}]}};
   const context={
    S:{lang:'ko',done:[0],next:1,xp:11,churu:7,streak:0,milk:0,cat:'a',unit:0,mistakes:[],dailyHistory:{},activityDates:[],lessonResumes:{}},
    rawState:original,storageReadProblem:mode==='unreadable'?'unreadable':'',
    hasLessonProgress:()=>false,
    preserveDeferredLessonState:state=>({...state,inProgress:original.inProgress}),
    localStorage:{setItem:(key,value)=>{writes++;if(mode==='quota')throw Error('QuotaExceededError');persisted=JSON.parse(value)}},
    snapshot:()=>({}),console:{warn:()=>{}}
   };
   vm.createContext(context);
   vm.runInContext(wrapper+'\nthis.result='+fnName+'();',context);
   if(mode==='normal'){
    assert.equal(context.result,true);
    assert.equal(writes,1);
    assert.deepEqual(persisted.futureField,{keep:true});
    assert.equal(persisted.inProgress.lessonIndex,59);
   }else{
    assert.equal(context.result,false);
    assert.equal(writes,mode==='quota'?1:0);
    assert.equal(persisted,null);
    assert.equal(context.rawState,original);
   }
  }
 }
});

test('shipped reward override rolls back a failed final save and retries exactly once',()=>{
 const b=boot(),c=b.c;c.startLesson(0);
 Object.assign(c.S,{write:'keep answer',checked:true,correct:true,xpEarned:35,firstCorrect:1});
 c.save();
 const before=JSON.stringify(c.S),bytes=b.disk.get('meowde-v410-state');
 const realSave=c.save;c.save=()=>false;
 c.finish();
 assert.equal(JSON.stringify(c.S),before);
 assert.equal(b.disk.get('meowde-v410-state'),bytes);
 c.save=realSave;c.finish();
 assert.equal(c.S.xp,42);assert.deepEqual(Array.from(c.S.done),[0]);
 const awarded=JSON.stringify(c.S);c.finish();assert.equal(JSON.stringify(c.S),awarded);
});


test('failure after switch checkpoint preserves the active draft and suppresses onStarted',()=>{
 const b=boot(),c=b.c;c.startLesson(0);c.S.write='keep after checkpoint';c.S.checked=true;
 const realSave=c.save;let writes=0,starts=0;
 c.save=()=>++writes===2?false:realSave();
 c.startLesson(59,false,null,{force:true,onStarted:()=>starts++});
 assert.equal(c.S.lessonIndex,0);assert.equal(c.S.write,'keep after checkpoint');assert.equal(c.S.checked,true);assert.equal(starts,0);
});

test('season wrapper never counts a failed or repeated completion',()=>{
 const b=boot(),c=b.c;c.startLesson(0);
 let increments=0;
 c.incrementSeason=()=>increments++;c.persist=()=>{};c.localDateKey=()=> '2026-10-29';
 const source=fs.readFileSync('v428-events.js','utf8');
 vm.runInContext(source.slice(source.indexOf('  const baseFinish=window.finish;'),source.indexOf('  window.MeowEvents=')),c);
 const realSave=c.save;c.save=()=>false;c.finish();assert.equal(increments,0);
 c.save=realSave;c.finish();assert.equal(increments,1);c.finish();assert.equal(increments,1);
});

test('backup denial after the primary commit cannot roll back or duplicate a completed reward',()=>{
 const b=boot(),c=b.c;c.document.addEventListener=()=>{};c.addEventListener=()=>{};
 vm.runInContext(fs.readFileSync('v425-state.js','utf8'),c);
 c.startLesson(0);c.S.xpEarned=35;
 const set=c.localStorage.setItem;let primaryWrites=0;
 c.localStorage.setItem=(key,value)=>{if(key==='meowde-v425-state-backup')throw Error('backup quota');if(key==='meowde-v410-state')primaryWrites++;set(key,value)};
 c.finish();
 assert.equal(c.__MEOWDE_SAVE_STATUS__,'saved');assert.equal(primaryWrites,1);
 assert.equal(c.S.xp,42);assert.equal(b.saved().xp,42);assert.equal(c.S.queue.length,0);
 c.finish();assert.equal(c.S.xp,42);assert.equal(b.saved().xp,42);
});

test('atomic serializer keeps future fields and deferred progress when the primary write is denied',()=>{
 const record={xp:7,done:[80],next:80,unit:8,future:{keep:true},inProgress:{lessonIndex:80,queue:[{id:'future'}],idx:0}};
 const b=boot(record),c=b.c;c.document.addEventListener=()=>{};c.addEventListener=()=>{};
 vm.runInContext(fs.readFileSync('v425-state.js','utf8'),c);
 const bytes=b.disk.get('meowde-v410-state');const set=c.localStorage.setItem;let primaryWrites=0;
 c.localStorage.setItem=(key,value)=>{if(key==='meowde-v410-state'){primaryWrites++;throw Error('primary quota')}set(key,value)};
 c.S.xp=99;assert.equal(c.save(),false);assert.equal(primaryWrites,1);assert.equal(b.disk.get('meowde-v410-state'),bytes);
 c.localStorage.setItem=set;assert.equal(c.save(),true);
 const saved=b.saved();assert.equal(saved.xp,99);assert.deepEqual(saved.done,[80]);assert.equal(saved.next,80);assert.equal(saved.unit,8);assert.equal(saved.inProgress.lessonIndex,80);assert.deepEqual(saved.future,{keep:true});assert.equal(saved.schemaVersion,425);
});

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
  checkQ:async()=>{},startLesson:(i,daily,queue)=>{Object.assign(c.S,{lessonIndex:i,idx:0,queue:queue||c.lessons()[i].exercises,write:'',xpEarned:0,combo:0,maxCombo:0,firstTotal:1,firstCorrect:0,daily});c.save()},
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

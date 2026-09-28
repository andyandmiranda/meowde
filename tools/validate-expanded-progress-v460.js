"use strict";

const fs=require("fs");
const vm=require("vm");

function assert(condition,message){
  if(!condition){console.error(`FAIL: ${message}`);process.exitCode=1}
  else console.log(`PASS: ${message}`);
}

const storage=new Map();
const stored={
  lang:"ko",
  done:Array.from({length:40},(_,i)=>i),
  next:39,
  xp:120,
  churu:50,
  streak:3,
  milk:5,
  cat:"a",
  unit:3,
  mistakes:[],dailyHistory:{},activityDates:[],
  inProgress:{lessonIndex:35,idx:1,queue:[{id:"future-q",type:"write"}],write:"print(1)",checked:false,correct:false}
};
storage.set("meowde-v410-state",JSON.stringify(stored));

let runtimeLessonCount=30;
const S={...stored,done:stored.done.slice(),queue:stored.inProgress.queue.slice(),lessonIndex:35,idx:1,write:"print(1)",checked:false,correct:false};
const localStorage={
  getItem:key=>storage.has(key)?storage.get(key):null,
  setItem:(key,value)=>storage.set(key,String(value)),
  removeItem:key=>storage.delete(key)
};
const document={visibilityState:"visible",addEventListener:()=>{}};
const window={addEventListener:()=>{},location:{reload:()=>{}},__MEOWDE_SAVE_STATUS__:""};
const DATA={ko:[],en:[]};
const lessons=()=>Array.from({length:runtimeLessonCount},(_,i)=>({slug:`lesson-${i}`}));
const hasLessonProgress=()=>Array.isArray(S.queue)&&S.queue.length>0;
let save=function baseSave(){
  const state={lang:S.lang,done:S.done.slice(),next:S.next,xp:S.xp,churu:S.churu,streak:S.streak,milk:S.milk,cat:S.cat,unit:S.unit,mistakes:S.mistakes,dailyHistory:S.dailyHistory,activityDates:S.activityDates};
  if(hasLessonProgress())state.inProgress={lessonIndex:S.lessonIndex,idx:S.idx,queue:S.queue,write:S.write||"",checked:Boolean(S.checked),correct:Boolean(S.correct)};
  localStorage.setItem("meowde-v410-state",JSON.stringify(state));
};
let useMilk=()=>false;

const context={console,localStorage,document,window,DATA,S,lessons,hasLessonProgress,save,useMilk};
vm.createContext(context);
vm.runInContext(fs.readFileSync("v425-state.js","utf8"),context,{filename:"v425-state.js"});

const afterBoot=JSON.parse(storage.get("meowde-v410-state"));
assert(context.S.done.length===30,"runtime state is safely clamped while only 30 lessons are loaded");
assert(afterBoot.done.length===40&&afterBoot.done[39]===39,"persisted completion for lessons 31-40 survives early normalization");
assert(afterBoot.next===39,"persisted next index survives early normalization");
assert(afterBoot.unit===3,"persisted Unit 04 selection survives early normalization");
assert(afterBoot.inProgress&&afterBoot.inProgress.lessonIndex===35,"future in-progress lesson survives early normalization on disk");
assert(JSON.parse(storage.get("meowde-v425-state-backup")).done.length===40,"backup also retains expanded-course completion");

runtimeLessonCount=50;
const restored=context.window.meowdeV425.restoreDeferredProgress();
assert(restored===true,"deferred progress restores after expanded lessons load");
assert(context.S.done.length===40&&context.S.done[39]===39,"runtime completion for lessons 31-40 is restored");
assert(context.S.next===39,"runtime next index is restored");
assert(context.S.unit===3,"runtime unit selection is restored");
assert(context.S.lessonIndex===35,"future in-progress lesson index is restored");
assert(Array.isArray(context.S.queue)&&context.S.queue[0].id==="future-q","future in-progress queue is restored");

const afterRestore=JSON.parse(storage.get("meowde-v410-state"));
assert(afterRestore.done.length===40,"restored progress remains persisted after save");
assert(context.window.meowdeV425.diagnostics().deferredDone.length===0,"restored completion is removed from the deferred queue");
assert(context.window.meowdeV425.diagnostics().deferredNext===null,"restored next index is removed from the deferred queue");
assert(context.window.meowdeV425.diagnostics().hasDeferredLesson===false,"restored in-progress lesson is removed from the deferred queue");

const integrationSource=fs.readFileSync("v459-unit5-integration.js","utf8");
assert(integrationSource.includes("restoreDeferredProgress"),"Unit 05 integration restores deferred progress after 50 lessons load");
assert(integrationSource.includes("completedUnit4")&&integrationSource.includes("current.next=40"),"Unit 05 integration unlocks lesson 41 after restored Unit 04 completion");
assert(!integrationSource.includes("localStorage"),"Unit 05 integration still creates no new storage path");

if(process.exitCode)process.exit(process.exitCode);
console.log("Expanded-course progress preservation validation passed.");

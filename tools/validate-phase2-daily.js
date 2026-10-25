const fs=require('fs');
const vm=require('node:vm');

function read(path){return fs.readFileSync(path,'utf8')}
function assert(condition,message){if(!condition)throw new Error(message)}

const retention=read('v415-retention.js');
const quests=read('v429-quests.js');
const reward=read('v414-reward.js');
const screens=read('v414-screens.js');

assert(!retention.includes('renderMissionCard()'),'Legacy Daily Mission card must not render.');
assert(!retention.includes('claimDailyChest=function'),'Legacy Daily Mission chest must not own an active reward flow.');
assert(!retention.includes("insertAdjacentHTML('afterend',renderLevelCard()+renderMissionCard())"),'Legacy mission/level cards must not decorate Home.');
assert(retention.includes("activeDailyMissions:false"),'Daily Mission system must be explicitly marked inactive.');

assert(quests.includes('active:false'),'Daily Quest system must be explicitly marked inactive.');
assert(!quests.includes('window.checkQ=async function'),'Daily Quest must not hook answer checking.');
assert(!quests.includes('window.finish=function'),'Daily Quest must not hook lesson completion.');
assert(!quests.includes('decorateHome()'),'Daily Quest must not decorate Home.');
assert(!quests.includes('localStorage.setItem(KEY'),'Legacy quest storage must not be rewritten during Phase 2.');

assert(reward.includes("daily:ko?'오늘의 연습 완료':'Daily practice complete'"),'Daily completion copy must use Daily Practice naming.');
assert(reward.includes('firstDailyCompletion'),'Daily Practice must keep once-per-day reward semantics.');
// Home now leads directly into the current lesson. Render it rather than
// matching copy inside the retained, unused dailyCard() helper.
for(const lang of ['ko','en'])for(const inProgress of [false,true]){
  const state={lang,screen:'home',done:[0],next:1,lessonIndex:2,idx:0,
    queue:[{id:'pending'}],xp:37,churu:9,dailyHistory:{previous:{xp:20}}};
  const before=JSON.stringify(state);
  const context={S:state,app:{innerHTML:''},document:{documentElement:{dataset:{}}},
    lessons:()=>Array.from({length:10},(_,index)=>({title:'Lesson '+index,description:'Learn'})),
    hasLessonProgress:()=>inProgress,save:()=>{},esc:String,icon:()=>'',t:()=>'',console};
  context.window=context;
  vm.runInNewContext(screens,context,{filename:'v414-screens.js'});
  const html=context.app.innerHTML;
  const action=inProgress?'resumeLesson()':'startLesson(1)';
  assert(html.split('onclick="'+action+'"').length-1===1,'Home must expose exactly one current-lesson start/resume action.');
  assert(!/onclick="startDaily\(/.test(html)&&!html.includes('daily-card'),'Home must not reintroduce the removed daily challenge entry.');
  assert(JSON.stringify(state)===before,'Rendering Home must preserve progress, pending lessons and rewards.');
}

console.log('Phase 2 daily consolidation validation passed.');

const fs=require('fs');

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
assert(screens.includes("ko?'오늘의 연습':'Daily practice'"),'Home must expose a single Daily Practice entry point.');

console.log('Phase 2 daily consolidation validation passed.');

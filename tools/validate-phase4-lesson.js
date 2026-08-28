const fs=require('fs');

function read(path){return fs.readFileSync(path,'utf8')}
function assert(condition,message){if(!condition){console.error(`FAIL: ${message}`);process.exitCode=1}else console.log(`PASS: ${message}`)}

const mentor=read('v418-coach.js');
const playful=read('v425-playful.js');
const growth=read('v427-growth.js');
const humor=read('v432-humor.js');
const learning=read('v433-learning.js');
const lesson=read('v413-lesson.js');
const playfulCss=read('v425-playful.css');
const humorCss=read('v432-humor.css');

assert(mentor.includes('dataset.mentorSurface="background-only"'),'mentor UI is background-only');
assert(!mentor.includes('function renderMentor'),'separate mentor panel renderer is retired');
assert(playful.includes('dataset.lessonPlayfulness="feedback-only"'),'playful layer is feedback-only');
assert(!playful.includes('scheduleIdleBehavior'),'idle lesson behavior is retired');
assert(!playful.includes('setTimeout'),'playful layer has no recurring idle timer');
assert(growth.includes('dataset.lessonEmotionSurface="none"'),'growth emotion is not rendered in lessons');
assert(!growth.includes('v427-emotion-line'),'growth layer no longer injects a lesson emotion line');
assert(humor.includes('dataset.lessonReactionOwner="canonical-v413"'),'canonical lesson renderer owns the single Meowde reaction');
assert(!humor.includes('function decorateReward'),'humor layer no longer adds reward-screen delight');
assert(learning.includes('dataset.lessonMetadata="canonical-v413"'),'canonical lesson renderer owns the single auxiliary metadata item');
assert(!learning.includes('onclick="MeowLearning.retryCurrent()"'),'wrong-answer UI no longer forks into immediate retry actions');
assert(!learning.includes('style.display="none"'),'canonical Continue button is not hidden');
assert(lesson.includes("S.hint?`<div class=\"hint\">"),'canonical lesson hint remains available');
assert(lesson.includes('onclick="nextQ()"'),'canonical Continue flow remains available');
assert(!playfulCss.includes('@keyframes'),'playful CSS has no idle/outcome animation keyframes');
assert(!humorCss.includes('@keyframes'),'humor CSS has no lesson/reward animation keyframes');

if(process.exitCode)process.exit(process.exitCode);
console.log('Phase 4 lesson simplification validation passed.');

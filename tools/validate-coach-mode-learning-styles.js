const fs=require('fs');

function read(path){return fs.readFileSync(path,'utf8')}
function assert(condition,message){if(!condition){console.error(`FAIL: ${message}`);process.exitCode=1}else console.log(`PASS: ${message}`)}

const lesson=read('v413-lesson.js');
const companion=read('v443-single-companion.js');

assert(lesson.includes('function coachModeStyle(exercise)'),'canonical Lesson resolves a coach learning style');
assert(lesson.includes('window.MeowCoachMode'),'Lesson reads the persisted coach-mode API');
['focus','dance','study','cheer','challenge','debug'].forEach(id=>assert(lesson.includes(`id:'${id}'`),`Lesson supports ${id} learning style`));
assert(lesson.includes("data-coach-hint=\"${esc(style.id)}\""),'hint control is tagged with the active coach style');
assert(lesson.includes("dataset.lessonCoachStyle=coachStyle.id"),'active coach style is observable for runtime verification');
assert(lesson.includes("window.MeowCoachLessonStyle=Object.freeze"),'Lesson style helper is exposed read-only');
assert(lesson.includes("style.id==='focus'"),'Focus mode can stay low-distraction');
assert(lesson.includes("['dance','cheer','challenge'].includes(style.id)"),'playful/encouraging/challenge modes can prioritize their own guidance line');
assert(lesson.includes("['bughunt','write'].includes(exercise.type)"),'Debug mode adapts guidance to debugging/code-writing exercises');
assert(lesson.includes("feedbackExplanation(ex)"),'mode-specific feedback framing is rendered without replacing answer evaluation');
assert(!lesson.includes('localStorage.setItem('),'Lesson style rendering does not create or mutate persisted learning state');
assert(!lesson.includes('window.checkQ='),'Lesson style rendering does not wrap the answer pipeline');
assert(!lesson.includes('window.nextQ='),'Lesson style rendering does not wrap progression');
assert(!lesson.includes('S.xp=')&&!lesson.includes('S.churu='),'Lesson style rendering does not alter rewards');
assert(companion.includes('const MODE_STORAGE_KEY="meowde-v443-coach-mode"'),'coach selection remains owned by the existing additive persistence key');
assert(!companion.includes('localStorage.removeItem(MODE_STORAGE_KEY)'),'coach selection is never destructively reset');

if(process.exitCode)process.exit(process.exitCode);
console.log('Coach mode learning-style validation passed.');
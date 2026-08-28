const fs=require('fs');

function read(path){return fs.readFileSync(path,'utf8')}
function assert(condition,message){if(!condition){console.error(`FAIL: ${message}`);process.exitCode=1}else console.log(`PASS: ${message}`)}

const files={
  lesson:read('v413-lesson.js'),
  mentor:read('v418-coach.js'),
  playful:read('v425-playful.js'),
  growth:read('v427-growth.js'),
  humor:read('v432-humor.js'),
  learning:read('v433-learning.js')
};

assert(files.lesson.includes("dataset.lessonRenderer='canonical-v413'"),'v4.13 declares canonical Lesson renderer ownership');
assert(files.lesson.includes('window.MeowHumor'),'canonical Lesson renderer reads reaction helper directly');
assert(files.lesson.includes('window.MeowLearning'),'canonical Lesson renderer reads learning metadata helper directly');
assert(files.lesson.includes('reactionMarkup()'),'post-answer reaction is rendered in canonical markup');
assert(files.lesson.includes('auxiliaryMarkup(ex)'),'pre-answer auxiliary metadata is rendered in canonical markup');

['mentor','playful','growth','humor','learning'].forEach(name=>{
  assert(!files[name].includes('baseRenderLesson'),`${name} does not wrap renderLesson`);
});
assert(!files.humor.includes('decorateLesson'),'humor layer has no Lesson DOM decorator');
assert(!files.learning.includes('decorateLesson'),'learning layer has no Lesson DOM decorator');
assert(files.humor.includes('lessonReactionOwner="canonical-v413"'),'reaction helper points to canonical owner');
assert(files.learning.includes('lessonMetadata="canonical-v413"'),'metadata helper points to canonical owner');

const rendererAssignments=Object.entries(files).filter(([,source])=>/\brenderLesson\s*=\s*function\b/.test(source));
assert(rendererAssignments.length===1&&rendererAssignments[0][0]==='lesson','selected Lesson stack has exactly one renderLesson assignment');

assert(files.mentor.includes('const KEY="meowde-v418-mentor"'),'mentor persistence key is unchanged');
assert(files.growth.includes('const KEY="meowde-v427-growth"'),'growth persistence key is unchanged');
assert(files.learning.includes('const KEY="meowde-v433-learning"'),'learning persistence key is unchanged');
assert(files.learning.includes('const baseCheckQ=window.checkQ'),'learning attempt tracking remains in answer pipeline');
assert(files.humor.includes('const baseCheckQ=window.checkQ'),'answer-check error handling remains in answer pipeline');

if(process.exitCode)process.exit(process.exitCode);
console.log('Phase 5 canonical Lesson renderer validation passed.');

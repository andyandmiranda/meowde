const fs=require('fs');

function read(path){return fs.readFileSync(path,'utf8')}
function assert(condition,message){if(!condition){console.error(`FAIL: ${message}`);process.exitCode=1}else console.log(`PASS: ${message}`)}

const companion=read('v443-single-companion.js');
const visual=read('v444-visual-cohesion.js');
const cutouts=read('v449-character-cutouts.js');
const journey=read('v416-journey.js');
const achievements=read('v419-achievements.js');
const growth=read('v427-growth.js');
const events=read('v428-events.js');

assert(companion.includes('window.renderRoom=renderCompanionHub'),'v443 owns the final Room renderer');
assert(companion.includes('window.renderMy=renderCompanionHub'),'legacy My route resolves to the canonical Meowde hub');
assert(companion.includes('dataset.roomRenderer="canonical-v443"'),'canonical Room renderer marker is present');
assert(companion.includes('data-phase3-companion-hub="ordered"'),'canonical Meowde section ordering marker is rendered directly');
assert(companion.includes('v427-growth-card'),'canonical Room renders growth directly');
assert(companion.includes('v419-summary'),'canonical Room renders achievement summary directly');
assert(companion.includes('v416-milestone-card'),'canonical Room renders pending milestone rewards directly');
assert(companion.includes('v428-season-card'),'canonical Room renders seasonal events directly');
assert(companion.includes('v443-single-companion'),'canonical Room renders one companion card directly');
assert(companion.includes('["renderMap","renderReview","renderProfile","renderAchievements"].forEach(wrapRenderer)'),'v443 wrappers exclude Room, My, and canonical Home');

assert(!visual.includes('renderRoom'),'visual cohesion does not wrap Room');
assert(visual.includes('["renderProfile"].forEach(name=>'),'visual cohesion keeps Profile enhancement only');
assert(!cutouts.includes('decorateRoom()'),'character cutouts do not replace Room contents');
assert(cutouts.includes('decorateFeedback();decorateProfile()'),'character cutouts keep non-Room visual decoration');
assert(cutouts.includes('["renderMap","renderLesson","renderReview","renderProfile","renderAchievements","finish"]'),'character cutout wrappers exclude Room, My, and canonical Home');

assert(journey.includes('meowde-v416-journey'),'journey persistence key is preserved');
assert(achievements.includes('meowde-v419-achievements'),'achievement persistence key is preserved');
assert(growth.includes('meowde-v427-growth'),'growth persistence key is preserved');
assert(events.includes('meowde-v428-events'),'event persistence key is preserved');

if(process.exitCode)process.exit(process.exitCode);
console.log('Phase 5 Room renderer consolidation validation passed.');
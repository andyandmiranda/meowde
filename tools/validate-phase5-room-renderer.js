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
assert(companion.includes('v419-summary'),'Achievements must be in canonical Meowde ordering');
assert(companion.includes('v416-milestone-card'),'canonical Room renders pending milestone rewards directly');
assert(companion.includes('v428-season-card'),'canonical Room renders seasonal events directly');
assert(companion.includes('v443-single-companion'),'canonical Room renders the single Meowde identity directly');
assert(!companion.includes('wrapRenderer'),'v443 no longer wraps secondary canonical screens');
assert(companion.includes('function runtimeState()'),'v443 resolves the lexical runtime state explicitly');
assert(companion.includes('typeof S!=="undefined"'),'v443 checks the actual runtime S binding');
assert(!companion.includes('window.S'),'v443 does not gate Room on a nonexistent window.S property');
assert(companion.includes('["home","map","review","profile","achievements","room","my"].includes(current.screen)'),'v443 observer does not re-normalize canonical Room/My navigation');

assert(companion.includes('const MODE_STORAGE_KEY="meowde-v443-coach-mode"'),'coach mode uses an additive persistence key');
['focus','dance','study','cheer','challenge','debug'].forEach(id=>assert(companion.includes(`id:"${id}"`),`coach mode ${id} is available`));
['coding','music','reading','happy','challenge','debug'].forEach(asset=>assert(companion.includes(`asset:"${asset}"`),`approved coach asset ${asset} is mapped`));
assert(companion.includes('labelKo:"집중 모드"'),'Focus mode keeps the intended Korean label');
assert(companion.includes('labelKo:"댄싱 모드"'),'Dancing mode keeps the intended Korean label');
assert(companion.includes('window.MeowCoachMode=Object.freeze'),'coach mode API is exposed');
assert(companion.includes('localStorage.setItem(MODE_STORAGE_KEY,mode.id)'),'coach mode selection persists');
assert(!companion.includes('localStorage.removeItem(MODE_STORAGE_KEY)'),'coach mode restoration never deletes its persisted selection');
assert(companion.includes('aria-pressed'),'mode picker exposes selected state accessibly');

assert(!visual.includes('renderRoom'),'visual cohesion does not wrap Room');
assert(!visual.includes('renderProfile"].forEach'),'visual cohesion no longer wraps Profile');
assert(!cutouts.includes('decorateRoom()'),'character cutouts do not replace Room contents');
assert(cutouts.includes('["home","map","review","profile","achievements","room","my"]'),'character postprocessing explicitly skips canonical Room/My surfaces');
assert(cutouts.includes('dataset.roomCharacterImages="canonical-v443"'),'character layer marks Room image ownership as canonical v443');
assert(cutouts.includes('decorateFeedback();decorateProfile()'),'character cutouts retain non-Room lesson/profile helpers');
assert(!cutouts.includes('__v450Wrapped'),'character enhancement installs no renderer wrappers');
assert(cutouts.includes('dataset.characterEnhancement="observer-only"'),'character enhancement is observer-only');
assert(cutouts.includes('function selectedCoachMode()'),'lesson enhancement can read the selected coach mode');
assert(cutouts.includes('updateCoachModeImage'),'selected coach mode is applied before answer feedback');
assert(cutouts.includes('!runtimeError()&&!currentState.checked'),'answer feedback can still override the selected mode');
assert(!cutouts.includes('window.S'),'character enhancement uses the real lexical runtime state');

assert(journey.includes('meowde-v416-journey'),'journey persistence key is preserved');
assert(achievements.includes('meowde-v419-achievements'),'achievement persistence key is preserved');
assert(!achievements.includes('baseRenderRoom'),'achievements no longer wraps canonical Room');
assert(growth.includes('meowde-v427-growth'),'growth persistence key is preserved');
assert(events.includes('meowde-v428-events'),'event persistence key is preserved');

if(process.exitCode)process.exit(process.exitCode);
console.log('Phase 5 Room renderer consolidation validation passed.');
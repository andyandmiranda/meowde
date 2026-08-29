const fs=require('fs');

function read(path){return fs.readFileSync(path,'utf8')}
function assert(condition,message){if(!condition){console.error(`FAIL: ${message}`);process.exitCode=1}else console.log(`PASS: ${message}`)}

const home=read('v414-screens.js');
const character=read('v430-character.js');
const companion=read('v443-single-companion.js');
const cohesion=read('v444-visual-cohesion.js');
const cutouts=read('v449-character-cutouts.js');
const contact=read('v451-contact.js');
const files=[home,character,companion,cohesion,cutouts,contact];

assert(home.includes("dataset.homeRenderer='canonical-v414'"),'v414 declares canonical Home ownership');
assert(home.includes('window.__MEOWDE_CANONICAL_HOME_RENDERER__=renderHome'),'canonical Home renderer reference is retained');
assert(home.includes('v449-coding-scene'),'Home renders final character hero directly');
assert(home.includes('v448-brand-cat'),'Home renders final brand mark directly');
assert(home.includes('data-phase1-navigation="four-tabs"'),'Home renders the four-tab navigation directly');
assert(home.includes('https://amis-os.vercel.app/feedback'),'Home renders Feedback & Contact directly');

assert(!character.includes('oldHome=window.renderHome'),'v430 no longer wraps Home');
assert(character.includes('dataset.homeCharacterSurface="canonical-v414"'),'v430 defers Home character surface to v414');
assert(!companion.includes('wrapRenderer'),'v443 no longer wraps canonical screen renderers');
assert(companion.includes('["home","map","review","profile","achievements"].includes(current.screen)'),'v443 navigation decorator skips canonical screen DOM');
assert(cohesion.includes('["home","map","review","profile","achievements"].includes(S.screen)'),'v444 recognizes all canonical static surfaces');
assert(cutouts.includes('["home","map","review","profile","achievements"].includes(state().screen)'),'v449 exits before mutating canonical static surfaces');
assert(cutouts.includes('window.renderHome=window.__MEOWDE_CANONICAL_HOME_RENDERER__'),'character layer restores canonical Home');

assert(!contact.includes('MutationObserver'),'v451 no longer injects Contact through a DOM observer');
assert(contact.includes('dataset.homeContactSurface="canonical-v414"'),'v451 defers Contact surface to v414');
assert(files.every(source=>!source.includes('localStorage.removeItem(')),'Home consolidation does not delete persisted data');

if(process.exitCode)process.exit(process.exitCode);
console.log('Phase 5 canonical Home renderer validation passed.');
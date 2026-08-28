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

assert(!companion.includes('"renderHome"'),'v443 no longer includes Home in renderer wrappers');
assert(companion.includes('["home","map"].includes(S.screen)'),'v443 navigation decorator skips canonical Home and Learn DOM');

assert(!cohesion.includes('["renderHome","renderProfile"]'),'v444 no longer wraps Home');
assert(cohesion.includes('isCanonicalStaticSurface'),'v444 recognizes canonical Home and Learn surfaces');

assert(!cutouts.includes('["renderHome","renderMap"'),'v449 no longer wraps Home or Learn');
assert(cutouts.includes('if(state().screen!=="home"){decorateHero();decorateBrand();decorateCards()}'),'v449 skips Home visual post-processing');
assert(cutouts.includes('window.renderHome=window.__MEOWDE_CANONICAL_HOME_RENDERER__'),'late character layer restores canonical Home regardless of async order');

assert(!contact.includes('MutationObserver'),'v451 no longer injects Contact through a DOM observer');
assert(contact.includes('dataset.homeContactSurface="canonical-v414"'),'v451 defers Contact surface to v414');
assert(files.every(source=>!source.includes('localStorage.removeItem(')),'Home consolidation does not delete persisted data');

if(process.exitCode)process.exit(process.exitCode);
console.log('Phase 5 canonical Home renderer validation passed.');
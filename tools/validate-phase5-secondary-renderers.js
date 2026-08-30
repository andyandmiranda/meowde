const fs=require('fs');

function read(path){return fs.readFileSync(path,'utf8')}
function assert(condition,message){if(!condition){console.error(`FAIL: ${message}`);process.exitCode=1}else console.log(`PASS: ${message}`)}

const profile=read('v420-profile.js');
const achievements=read('v419-achievements.js');
const companion=read('v443-single-companion.js');
const visual=read('v444-visual-cohesion.js');
const cutouts=read('v449-character-cutouts.js');
const files=[profile,achievements,companion,visual,cutouts];

assert(profile.includes("const KEY='meowde-v420-profile'"),'Profile persistence key is preserved');
assert(profile.includes("dataset.profileRenderer='canonical-v420'"),'v420 declares canonical Profile ownership');
assert(profile.includes('window.__MEOWDE_CANONICAL_PROFILE_RENDERER__=window.renderProfile'),'canonical Profile reference is retained');
assert(profile.includes('data-phase1-navigation="four-tabs"'),'Profile renders the four-tab navigation directly');
assert(profile.includes('v449-pose-music'),'Profile renders its final Meowde avatar directly');
assert(profile.includes('🐱 Meowde'),'Profile owns the final Meowde action label');
assert(!profile.includes('tabs=function'),'Profile no longer replaces the global navigation renderer');
assert(!profile.includes('renderLeague()'),'Profile no longer reintroduces League into persistent navigation');

assert(achievements.includes('const KEY="meowde-v419-achievements"'),'Achievement persistence key is preserved');
assert(achievements.includes('dataset.achievementsRenderer="canonical-v419"'),'v419 declares canonical Achievements ownership');
assert(achievements.includes('window.__MEOWDE_CANONICAL_ACHIEVEMENTS_RENDERER__=window.renderAchievements'),'canonical Achievements reference is retained');
assert(achievements.includes('data-phase1-navigation="four-tabs"'),'Achievements renders the four-tab navigation directly');
assert(achievements.includes('v448-brand-cat'),'Achievements renders the final brand mark directly');
assert(!achievements.includes('baseRenderRoom'),'Achievements no longer wraps Room');
assert(achievements.includes('const baseCheckQ=checkQ'),'achievement answer tracking is preserved');
assert(achievements.includes('const baseFinish=finish'),'achievement completion/reward tracking is preserved');

assert(!companion.includes('wrapRenderer'),'v443 has no secondary screen renderer wrappers');
assert(companion.includes('window.renderProfile=window.__MEOWDE_CANONICAL_PROFILE_RENDERER__'),'v443 restores canonical Profile');
assert(companion.includes('window.renderAchievements=window.__MEOWDE_CANONICAL_ACHIEVEMENTS_RENDERER__'),'v443 restores canonical Achievements');
assert(companion.includes('["home","map","review","profile","achievements","room","my"].includes(current.screen)'),'v443 observer skips all canonical screens including Room/My');

assert(!visual.includes('renderProfile"].forEach'),'v444 no longer wraps Profile');
assert(visual.includes('dataset.profileVisualSurface="canonical-v420"'),'v444 defers Profile visuals to v420');
assert(visual.includes('dataset.achievementsVisualSurface="canonical-v419"'),'v444 defers Achievements visuals to v419');

assert(cutouts.includes('["home","map","review","profile","achievements","room","my"].includes(state().screen)'),'v449 observer skips Profile, Achievements, and canonical Room');
assert(!cutouts.includes('__v450Wrapped'),'v449 no longer installs renderer wrappers');
assert(cutouts.includes('dataset.characterEnhancement="observer-only"'),'v449 character enhancement is observer-only');
assert(cutouts.includes('dataset.profileCharacterImages="canonical-v420"'),'v449 records canonical Profile character ownership');
assert(cutouts.includes('dataset.achievementsCharacterImages="canonical-v419"'),'v449 records canonical Achievements character ownership');
assert(cutouts.includes('dataset.roomCharacterImages="canonical-v443"'),'v449 records canonical Room character ownership');

assert(files.every(source=>!source.includes('localStorage.removeItem(')),'secondary consolidation does not delete persisted data');

if(process.exitCode)process.exit(process.exitCode);
console.log('Phase 5 canonical Profile/Achievements validation passed.');
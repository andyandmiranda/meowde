const fs=require('fs');

function read(path){return fs.readFileSync(path,'utf8')}
function assert(condition,message){if(!condition){console.error(`FAIL: ${message}`);process.exitCode=1}else console.log(`PASS: ${message}`)}

const review=read('v414-screens.js');
const smart=read('v417-review.js');
const learning=read('v433-learning.js');
const companion=read('v443-single-companion.js');
const cutouts=read('v449-character-cutouts.js');
const files=[review,smart,learning,companion,cutouts];

assert(review.includes("dataset.reviewRenderer='canonical-v414'"),'v414 declares canonical Review ownership');
assert(review.includes('window.__MEOWDE_CANONICAL_REVIEW_RENDERER__=renderReview'),'canonical Review renderer reference is retained');
assert(review.includes("MeowSmartReview&&typeof MeowSmartReview.card==='function'"),'Review reads Smart Review through the helper API');
assert(review.includes("MeowLearning&&typeof MeowLearning.reviewQualityCard==='function'"),'Review reads Learning Quality through the helper API');
assert(review.includes('v449-review-pose'),'Review renders its final Meowde pose directly');
assert(review.includes("canonicalTabs('review')"),'Review renders the four-tab navigation directly');
assert(review.includes('startMistakeReview('),'Review preserves mistake replay actions');
assert(review.includes("{mode:'review'}"),'Review preserves completed lesson replay mode');

assert(smart.includes("const KEY='meowde-v417-review'"),'Smart Review persistence key is preserved');
assert(!smart.includes('baseRenderReview'),'v417 no longer wraps Review');
assert(smart.includes('window.MeowSmartReview=Object.freeze'),'v417 exposes Smart Review state and card helpers');
assert(smart.includes("dataset.smartReviewSurface='canonical-v414'"),'v417 defers Smart Review UI ownership to v414');
assert(smart.includes("mode:'smart-review'"),'Smart Review queue mode remains active');
assert(smart.includes('BONUS_XP=10')&&smart.includes('BONUS_CHURU=5'),'Smart Review reward values are preserved');

assert(learning.includes('const KEY="meowde-v433-learning"'),'Learning Quality persistence key is preserved');
assert(!learning.includes('baseRenderReview'),'v433 no longer wraps Review');
assert(learning.includes('reviewQualityCard}'),'v433 exposes Learning Quality card through MeowLearning');
assert(learning.includes('dataset.reviewQualitySurface="canonical-v414"'),'v433 defers Learning Quality UI ownership to v414');
assert(learning.includes('dedupeQueue'),'Smart Review dedupe behavior remains active');

assert(!companion.includes('wrapRenderer'),'v443 no longer wraps Review or secondary canonical screens');
assert(companion.includes('["home","map","review","profile","achievements"].includes(current.screen)'),'v443 observer skips canonical Review navigation');
assert(companion.includes('window.renderReview=window.__MEOWDE_CANONICAL_REVIEW_RENDERER__'),'v443 restores canonical Review regardless of load order');
assert(cutouts.includes('["home","map","review","profile","achievements","room","my"].includes(state().screen)'),'v449 observer exits before mutating canonical surfaces including Review and Room');
assert(!cutouts.includes('__v450Wrapped'),'v449 installs no renderer wrappers');
assert(cutouts.includes('dataset.characterEnhancement="observer-only"'),'v449 uses observer-only visual enhancement');
assert(cutouts.includes('dataset.reviewCharacterImages="canonical-v414"'),'v449 records canonical Review character ownership');
assert(cutouts.includes('window.renderReview=window.__MEOWDE_CANONICAL_REVIEW_RENDERER__'),'character layer restores canonical Review');

assert(files.every(source=>!source.includes('localStorage.removeItem(')),'Review consolidation does not delete persisted data');

if(process.exitCode)process.exit(process.exitCode);
console.log('Phase 5 canonical Review renderer validation passed.');
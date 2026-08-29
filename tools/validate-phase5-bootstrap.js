const fs=require('fs');

function read(path){return fs.readFileSync(path,'utf8')}
function assert(condition,message){if(!condition){console.error(`FAIL: ${message}`);process.exitCode=1}else console.log(`PASS: ${message}`)}

const bootstrap=read('v412.html');
const release=read('v434-release.js');
const mapTouch=read('v442-map-touch.js');
const learn=read('v413-core.js');
const state=read('v425-state.js');

assert(bootstrap.indexOf('v443-single-companion.js')<bootstrap.indexOf('v434-release.js'),'sync companion runtime loads before the release guard');
assert((bootstrap.match(/v443-single-companion\.js/g)||[]).length===1,'v443 bootstrap script is declared exactly once');
assert(bootstrap.includes("setTimeout(()=>langSheet(),300)"),'bootstrap identifies the legacy first-open language gate in fetched index source');
assert(bootstrap.includes("if(!localStorage.getItem('meowde-v410-seen'))localStorage.setItem('meowde-v410-seen','1')"),'bootstrap removes the forced first-open language sheet while preserving the seen marker');

const orderedIds=['meowde-v442-map-touch','meowde-v444-visual-cohesion','meowde-v446-update-recovery','meowde-v450-character-images','meowde-v451-contact'];
let previous=-1;
orderedIds.forEach(id=>{
  const index=release.indexOf(`id:"${id}"`);
  assert(index>previous,`${id} appears in deterministic enhancement order`);
  previous=index;
});
assert(!release.includes('id:"meowde-v443-single-companion"'),'release guard does not dynamically reload the sync v443 runtime');
assert(release.includes('for(const item of ENHANCEMENTS)results.push(await loadEnhancement(item))'),'enhancements load sequentially, one completion at a time');
assert(release.includes('element.async=false'),'dynamic enhancement scripts explicitly opt out of parallel async execution');
assert(!release.includes('element.async=true'),'parallel async enhancement loading is removed');
assert(release.includes('dataset.enhancementLoader="ordered"'),'ordered bootstrap runtime marker is present');
assert(release.includes('"renderProfile","renderAchievements"'),'release health checks canonical secondary renderers');
assert(release.includes('ENHANCEMENT_APIS'),'release health verifies late enhancement APIs after ordered load');

assert(!mapTouch.includes('const baseRenderMap'),'map touch no longer captures the Learn renderer');
assert(!mapTouch.includes('window.renderMap=function'),'map touch no longer wraps the Learn renderer');
assert(!mapTouch.includes('const baseTabs'),'map touch no longer wraps navigation');
assert(mapTouch.includes('dataset.mapTouchSurface="enhancement-only"'),'map touch declares enhancement-only ownership');
assert(mapTouch.includes('MutationObserver'),'map touch accessibility helper survives future canonical map renders without renderer wrapping');
assert(learn.includes('window.__MEOWDE_CANONICAL_LEARN_RENDERER__=renderMap'),'v413 remains canonical Learn renderer');

assert(state.includes('const CORRUPT_KEY="meowde-v425-corrupt-state"'),'corrupt state quarantine key remains available');
const quarantineIndex=state.indexOf('localStorage.setItem(CORRUPT_KEY,raw)');
const removalIndex=state.indexOf('localStorage.removeItem(STORAGE_KEY)');
assert(quarantineIndex>=0&&removalIndex>quarantineIndex,'unreadable active state is copied to quarantine before active-key cleanup');

if(process.exitCode)process.exit(process.exitCode);
console.log('Phase 5 ordered bootstrap validation passed.');
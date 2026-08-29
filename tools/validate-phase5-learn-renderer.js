const fs=require('fs');

function read(path){return fs.readFileSync(path,'utf8')}
function assert(condition,message){if(!condition){console.error(`FAIL: ${message}`);process.exitCode=1}else console.log(`PASS: ${message}`)}

const learn=read('v413-core.js');
const mapTouch=read('v442-map-touch.js');
const companion=read('v443-single-companion.js');
const cohesion=read('v444-visual-cohesion.js');
const cutouts=read('v449-character-cutouts.js');
const journey=read('v416-journey.js');
const css=read('v416-ux.css');
const files=[learn,mapTouch,companion,cohesion,cutouts,journey];

assert(!learn.includes('originalRenderMap'),'v413 no longer delegates Learn to the legacy index renderer');
assert(learn.includes("dataset.learnRenderer='canonical-v413'"),'v413 declares canonical Learn ownership');
assert(learn.includes('window.__MEOWDE_CANONICAL_LEARN_RENDERER__=renderMap'),'canonical Learn renderer reference is retained');
assert(learn.includes('data-learn-path="canonical"'),'canonical Learn path marker is rendered directly');
assert(learn.includes('v448-brand-cat'),'Learn renders the final brand mark directly');
assert(learn.includes('data-phase1-navigation="four-tabs"'),'Learn renders the four-tab navigation directly');
assert(learn.includes("['01 Python 기초','02 조건과 반복','03 함수와 프로젝트']"),'Learn owns Korean unit labels directly');
assert(learn.includes("['01 Python Basics','02 Control & Loops','03 Functions & Projects']"),'Learn owns English unit labels directly');

const mapStart=learn.indexOf('renderMap=function(){');
const mapEnd=learn.indexOf('window.__MEOWDE_CANONICAL_LEARN_RENDERER__=renderMap');
const mapSource=mapStart>=0&&mapEnd>mapStart?learn.slice(mapStart,mapEnd):'';
assert(Boolean(mapSource),'canonical renderMap block is discoverable');
assert(mapSource.includes("done?'done':''")&&mapSource.includes("current?'current':''")&&mapSource.includes("locked?'locked':''"),'Learn renders only completed/current/locked node states');
assert(!mapSource.includes('stone')&&!mapSource.includes('bush')&&!mapSource.includes('unit-flag')&&!mapSource.includes('trail-cat'),'Learn no longer generates decorative trail DOM');
assert(!mapSource.includes('v416-now-tag')&&!mapSource.includes('v416-node-reward'),'Learn does not generate reward or NOW overlays');

assert(!mapTouch.includes('const baseRenderMap'),'v442 does not capture canonical Learn');
assert(!mapTouch.includes('window.renderMap=function'),'v442 does not wrap canonical Learn');
assert(!mapTouch.includes('const baseTabs'),'v442 does not wrap canonical navigation');
assert(mapTouch.includes('dataset.mapTouchSurface="enhancement-only"'),'v442 is explicitly enhancement-only');

assert(!companion.includes('wrapRenderer'),'v443 no longer wraps Learn or secondary canonical screens');
assert(companion.includes('["home","map","review","profile","achievements"].includes(current.screen)'),'v443 observer skips canonical Learn navigation');
assert(companion.includes('window.renderMap=window.__MEOWDE_CANONICAL_LEARN_RENDERER__'),'v443 restores canonical Learn regardless of load order');
assert(cohesion.includes('["home","map","review","profile","achievements"].includes(S.screen)'),'v444 skips Learn visual post-processing');
assert(cohesion.includes('dataset.learnVisualSurface="canonical-v413"'),'v444 records canonical Learn visual ownership');
assert(cutouts.includes('["home","map","review","profile","achievements"].includes(state().screen)'),'v449 observer exits before mutating canonical Learn');
assert(!cutouts.includes('__v450Wrapped'),'v449 no longer wraps any renderer');
assert(cutouts.includes('dataset.characterEnhancement="observer-only"'),'v449 character enhancement is observer-only');
assert(cutouts.includes('window.renderMap=window.__MEOWDE_CANONICAL_LEARN_RENDERER__'),'character layer restores canonical Learn');
assert(cutouts.includes('dataset.learnCharacterImages="canonical-v413"'),'v449 records canonical Learn character ownership');

assert(!journey.includes('renderMap=function'),'journey runtime does not wrap canonical Learn');
assert(css.includes('.node.current')&&css.includes('animation:none!important'),'current Learn node remains non-pulsing');
assert(files.every(source=>!source.includes('localStorage.removeItem(')),'Learn consolidation does not delete persisted data');

if(process.exitCode)process.exit(process.exitCode);
console.log('Phase 5 canonical Learn renderer validation passed.');
const fs=require('fs');
const vm=require('vm');
function load(path,key){const code=fs.readFileSync(path,'utf8');const sandbox={window:{}};vm.runInNewContext(code,sandbox,{filename:path});return sandbox.window[key]||[]}
const ko=load('assets/lessons-ko.js','MEOWDE_LESSONS_KO');
const en=load('assets/lessons-en.js','MEOWDE_LESSONS_EN');
function types(xs){const out={};xs.forEach(x=>x.exercises.forEach(e=>out[e.type]=(out[e.type]||0)+1));return out}
function row(l,i){return {n:i+1,slug:l.slug,title:l.title,focus:l.focus,types:l.exercises.map(e=>e.type),count:l.exercises.length,write:l.exercises.some(e=>e.type==='write'),bughunt:l.exercises.some(e=>e.type==='bughunt')}}
const rows=ko.map(row);
const focusFreq={};for(const l of ko)for(const f of (l.focus||[])){const k=String(f).toLowerCase();focusFreq[k]=(focusFreq[k]||0)+1}
const repeated=Object.entries(focusFreq).filter(([,n])=>n>1).sort((a,b)=>b[1]-a[1]);
const typeCounts=types(ko);
const blob=JSON.stringify(ko).toLowerCase();
const coverage=['input(','int(','float(','str(','bool','true','false','len(','dict','{',' in ','not in','and','or','not ','list','append(','for ','range(','while ','def ','return ','parameter','index','slice',':','%','//','**'];
const keywordCoverage=Object.fromEntries(coverage.map(k=>[k,blob.includes(k)]));
const selectedSlugs=['input-window','debug-missing-quote','debug-typo','compare-gate','if-gate','logic-lantern','list-garden','index-tower','append-dock','loop-hill','range-rail','while-cave','function-house','parameter-mail','return-spring','mini-project','boss-bug'];
const selected=ko.filter(l=>selectedSlugs.includes(l.slug)).map(l=>({slug:l.slug,title:l.title,description:l.description,focus:l.focus,concept:l.exercises.find(e=>e.type==='concept'),write:l.exercises.find(e=>e.type==='write')}));
console.log('AUDIT_SUMMARY '+JSON.stringify({koLessons:ko.length,enLessons:en.length,koExercises:ko.reduce((a,l)=>a+l.exercises.length,0),enExercises:en.reduce((a,l)=>a+l.exercises.length,0),typeCounts,repeatedFocus:repeated,keywordCoverage}));
console.log('LESSON_ROWS '+JSON.stringify(rows));
console.log('SELECTED_DETAILS '+JSON.stringify(selected));
console.log('KO_EN_SLUG_MATCH '+JSON.stringify({match:ko.length===en.length&&ko.every((l,i)=>en[i]&&en[i].slug===l.slug),ko:ko.map(x=>x.slug),en:en.map(x=>x.slug)}));
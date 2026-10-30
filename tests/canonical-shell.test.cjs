const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const read=p=>fs.readFileSync(p,'utf8');
test('all standalone tabs consume one canonical shell and identical icon paths',()=>{
 for(const p of ['python-lab.html','together.html','ml-foundations.html','subjects.html']){
  const s=read(p);assert.match(s,/app-shell-canonical\.css/);assert.match(s,/app-shell-icons\.js/);
  assert.match(s,/class="meowde-shell-header"/);assert.match(s,/class="meowde-lab-tabbar"/);
  for(const t of ['홈','학습','심화','함께','마이'])assert.match(s,new RegExp('aria-label="'+t+'"'));
 }
});
test('Python root retains language switch and gets a compact right-top subject selector',()=>{
 const s=read('index.html');assert.match(s,/app-shell-canonical\.css/);assert.match(s,/meowde-canonical-top/);assert.match(s,/meowde-root-subject/);assert.match(s,/langSheet\(\)/);assert.match(s,/data-phase1-navigation="five-tabs"/);
});
test('Linux pages retain per-course routes and My screen header while using same icon outlines',()=>{
 const s=read('assets/linux-shared-navigation.js');assert.match(s,/app-shell-canonical\.css/);assert.match(s,/app-shell-icons\.js/);assert.match(s,/main\.replaceChildren\(header,section/);assert.match(s,/className='meowde-compact-subject'/);assert.match(s,/meowde-linux-title/);assert.match(s,/linux-tabbar/);
 const icons=read('assets/app-shell-icons.js');for(const x of ['홈','학습','심화','함께','마이'])assert.ok(icons.includes("'"+x+"'"));
 const css=read('assets/app-shell-canonical.css');assert.match(css,/grid-template-columns:repeat\(5,minmax\(0,1fr\)\)/);assert.match(css,/\.meowde-tab-icon/);
 assert.doesNotMatch(css,/localStorage|sessionStorage/);
});

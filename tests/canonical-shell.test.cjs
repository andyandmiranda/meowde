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

test('shared subject controller preserves tab meaning and normalizes top controls',()=>{
 const js=read('assets/meowde-subject-selector.js');
 for(const subject of ['python','linux','ml'])assert.ok(js.includes(subject));
 for(const tab of ['home','learn','deepen','together','my'])assert.ok(js.includes(tab));
 assert.match(js,/meowde-top-actions/);
 assert.match(js,/meowde-shell-language/);
 assert.match(js,/routeFor\(choice\[0\]\)/);
 const shell=read('assets/shared-five-tab-shell.css');
 assert.doesNotMatch(shell,/#247b61|#e7f8f0|#bdebd8/i);
});

test('learning surfaces default to short first-read progressive disclosure',()=>{
 const lesson=read('v413-lesson.js');
 assert.match(lesson,/1회독 · 핵심만/);
 assert.match(lesson,/더 알고 싶을 때/);
 assert.doesNotMatch(lesson,/문제를 풀기 전 확인/);
 const lab=read('assets/python-lab.js');
 assert.match(lab,/1회독 · 핵심/);
 assert.match(lab,/2회독 · 반복/);
 assert.match(lab,/3회독 · 따라 코딩/);
 assert.match(lab,/4회독 · 혼자 해결/);
 assert.match(lab,/5회독 · 응용/);
 assert.match(lab,/support\.open=false/);
});

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

test('blueprint v3 keeps learning help collapsed and button geometry canonical',()=>{
 const lab=read('assets/python-lab.js');
 assert.match(lab,/conceptDetails\.open=false/);
 assert.doesNotMatch(lab,/conceptDetails\.open=true/);
 const surface=read('assets/learning-surface-ui.css');
 assert.match(surface,/min-height:48px/);
 assert.match(surface,/line-height:1\.62/);
 assert.doesNotMatch(surface,/#6d4d89|#f0eaff|#e9f7f3/i);
 const shell=read('assets/app-shell-canonical.css');
 assert.match(shell,/button\.primary,a\.primary/);
});

test('active subjects and future subject catalog share one canonical surface contract',()=>{
 const subjectCss=read('assets/subject-surface-canonical.css');
 assert.match(subjectCss,/--subject-width:430px/);
 assert.match(subjectCss,/min-height:48px/);
 assert.match(subjectCss,/line-height:1\.62/);
 assert.doesNotMatch(subjectCss,/#247b61|#e7f8f0|#bdebd8/i);

 const linux=read('assets/linux-shared-navigation.js');
 assert.match(linux,/subject-surface-canonical\.css/);

 const mlHtml=read('ml-foundations.html');
 const mlView=read('assets/ml-shell-view.js');
 assert.match(mlHtml,/subject-surface-canonical\.css/);
 assert.match(mlView,/meowde-subject-page/);
 assert.match(mlView,/meowde-subject-card/);
 assert.match(mlView,/meowde-subject-primary/);

 const subjects=read('subjects.html');
 assert.match(subjects,/meowde-subject-page/);
 assert.match(subjects,/meowde-subject-grid/);
 assert.equal((subjects.match(/meowde-subject-card/g)||[]).length,6);

 const selector=read('assets/meowde-subject-selector.js');
 for(const id of ['python','linux','ml','data','deep','robotics'])assert.match(selector,new RegExp('"' + id + '"'));
});

test('three active subjects share one five-tab information hierarchy',()=>{
 const root=read('index.html');
 assert.match(root,/phase1-home-primary/);
 assert.match(root,/phase1-home-progress/);
 assert.match(root,/phase1-home-deepen/);
 assert.doesNotMatch(root,/Linux 집중 복습|Linux 학습<\/a>/);

 const linux=read('assets/linux-home-view.js');
 assert.match(linux,/linux-home-dashboard/);
 assert.match(linux,/오늘 학습/);
 assert.match(linux,/지도 보기/);
 assert.match(linux,/심화 학습/);

 const ml=read('assets/ml-shell-view.js');
 assert.match(ml,/오늘 학습/);
 assert.match(ml,/학습 지도/);
 assert.match(ml,/마이/);

 const together=read('together.html');
 assert.match(together,/meowde-subject-page/);
 assert.match(together,/subject-surface-canonical\.css/);
 assert.match(together,/class="card invite meowde-subject-card"/);
 assert.match(together,/class="card invite-actions meowde-subject-card"/);
});

test('active learning surfaces contain no legacy green active-state tokens',()=>{
 for(const p of ['together.html','ml-foundations.html']){
  const s=read(p);
  assert.doesNotMatch(s,/#247b61|#e7f8f0|#bdebd8|#53c7a0/i,p+' still contains legacy green UI');
 }
 const surface=read('assets/learning-surface-ui.css');
 const lock=surface.slice(surface.lastIndexOf('Blueprint v3 final learning lock'));
 assert.match(lock,/font-size:23px/);
 assert.match(lock,/line-height:1\.62/);
 assert.match(lock,/min-height:48px/);
 assert.match(lock,/min-height:44px/);
});

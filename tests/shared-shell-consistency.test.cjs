const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
test('Python Lab and Together share common header, small course selector and five tabs',()=>{
 for(const filename of ['python-lab.html','together.html']){
  const src=fs.readFileSync(filename,'utf8');
  assert.match(src,/\/assets\/shared-five-tab-shell\.css/);
  assert.match(src,/class="meowde-shell-header"/);
  assert.match(src,/class="meowde-shell-subject"/);
  assert.match(src,/aria-label="과목 선택"/);
  assert.match(src,/class="meowde-lab-tabbar"/);
  for(const label of ['홈','학습','심화','함께','마이'])assert.match(src,new RegExp('aria-label="'+label+'"'));
 }
});
test('Python and Linux use the same canonical header and five-tab hierarchy',()=>{
 const py=fs.readFileSync('index.html','utf8');
 const linux=fs.readFileSync('assets/linux-shared-navigation.js','utf8');
 assert.match(py,/top meowde-canonical-top/);
 assert.match(linux,/top meowde-canonical-top/);
 assert.match(py,/meowde-top-actions/);
 assert.match(linux,/meowde-top-actions/);
 assert.match(py,/meowde-root-subject/);
 assert.match(linux,/meowde-root-subject/);
 for(const label of ['홈','학습','심화','함께','마이']){
  assert.match(py,new RegExp("aria-label=\\\""+label+"\\\""));
  assert.match(linux,new RegExp("'"+label+"'"));
 }
 assert.match(linux,/\?tab=my&subject=linux/);
 assert.doesNotMatch(linux,/meowde-compact-subject|subjectBar|meowde-subject-switch/);
});
test('shared shell design preserves full-width desktop practice and mobile tab layout',()=>{
 const src=fs.readFileSync('assets/shared-five-tab-shell.css','utf8');
 assert.match(src,/\.meowde-shell-header/);
 assert.match(src,/max-width:430px/);
 assert.match(src,/@media\(min-width:900px\)/);
 assert.match(src,/max-width:1080px/);
 const py=fs.readFileSync('assets/learning-surface-ui.css','utf8');
 assert.match(py,/grid-template-columns:250px minmax\(0,1fr\)/);
});

test('shared shell exposes six subjects and uses distinct Together/My icons',()=>{
 const selector=fs.readFileSync('assets/meowde-subject-selector.js','utf8');
 for(const label of ['Python','Linux','머신러닝','데이터 분석 · 준비 중','딥러닝 · 준비 중','AI 로보틱스 · 준비 중'])assert.match(selector,new RegExp(label));
 const together=fs.readFileSync('together.html','utf8');assert.match(together,/meowde-subject-selector\.js/);
 const icons=fs.readFileSync('assets/app-shell-icons.js','utf8');
 const togetherPath=icons.match(/'함께':'([^']+)'/)[1],myPath=icons.match(/'마이':'([^']+)'/)[1];assert.notEqual(togetherPath,myPath);
 const linuxMap=fs.readFileSync('assets/linux-learning-map.js','utf8');assert.match(linuxMap,/classList\.add\('linux-python-trail'\)/);assert.doesNotMatch(linuxMap,/linux-region-picker|selectedGroup/);
});
test('Python runtime loader is lazy so first paint does not wait on Pyodide',()=>{
 const html=fs.readFileSync('index.html','utf8');
 assert.doesNotMatch(html,/<script src="https:\/\/cdn\.jsdelivr\.net\/pyodide\/v0\.28\.0\/full\/pyodide\.js"><\/script>/);
 assert.match(html,/function ensurePyodideLoader\(\)/);
});

test('Linux home, learn and deepen mirror the Python structural hierarchy',()=>{
 const home=fs.readFileSync('assets/linux-home-view.js','utf8');
 assert.match(home,/오늘의 학습/);
 assert.match(home,/현재 과정/);
 assert.match(home,/심화 학습/);
 const map=fs.readFileSync('assets/linux-learning-map.js','utf8');
 assert.match(map,/units\.map\(\(title,idx\)/);
 assert.doesNotMatch(map,/대단원 선택|linux-region-picker/);
 const deepen=fs.readFileSync('assets/linux-library-view.js','utf8');
 assert.match(deepen,/linux-deepen-tabs/);
 for(const label of ['원본 실습','가상 터미널','조건문','Bash 작성'])assert.match(deepen,new RegExp(label));
});
test('common My keeps Linux subject context instead of falling back to Python',()=>{
 const selector=fs.readFileSync('assets/meowde-subject-selector.js','utf8');
 assert.match(selector,/const explicit=q\.get\("subject"\)/);
 assert.match(selector,/\?tab=my&subject=linux/);
});

test('Linux default entry is Home and Learn uses Python map-head plus trail hierarchy',()=>{
 const home=fs.readFileSync('assets/linux-home-view.js','utf8');
 assert.match(home,/params\.get\("tab"\)&&params\.get\("tab"\)!=="home"/);
 const nav=fs.readFileSync('assets/linux-shared-navigation.js','utf8');
 assert.match(nav,/params\.get\('tab'\)==='learn'/);
 const map=fs.readFileSync('assets/linux-learning-map.js','utf8');
 assert.match(map,/mapHead\.className='map-head'/);
 assert.match(map,/classList\.add\('trail'\)/);
});

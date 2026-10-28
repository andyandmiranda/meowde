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
test('Linux uses compact top-right subject selector, without an extra full-width switch',()=>{
 const src=fs.readFileSync('assets/linux-shared-navigation.js','utf8');
 assert.match(src,/meowde-compact-subject/);
 assert.match(src,/header\.querySelector\('\.brand'\)/);
 assert.doesNotMatch(src,/subjectBar|meowde-subject-switch/);
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

const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
test('Linux shared navigation mounts subject selector without writing learner storage',()=>{
 const src=fs.readFileSync('assets/linux-shared-navigation.js','utf8');
 assert.match(src,/aria-label','과목 선택'/);
 assert.match(src,/python\.href='\/\?tab=map'/);
 assert.match(src,/linux\.href='\/linux-home\.html\?tab=learn'/);
 assert.match(src,/subjectBar\.append\(label,python,linux\)/);
 assert.match(src,/if\(main&&!main\.querySelector\('\.meowde-subject-switch'\)\)/);
 const block=src.slice(src.indexOf("const main=document.querySelector"),src.indexOf("const library="));
 assert.doesNotMatch(block,/localStorage|sessionStorage|setItem|removeItem/);
});
test('desktop practice and Linux use widened frames but preserve mobile breakpoints',()=>{
 const python=fs.readFileSync('assets/learning-surface-ui.css','utf8');
 const linux=fs.readFileSync('assets/linux-learning-ui.css','utf8');
 assert.match(python,/@media \(min-width:900px\)/);
 assert.match(python,/grid-template-columns:250px minmax\(0,1fr\)/);
 assert.match(linux,/@media\(min-width:900px\)/);
 assert.match(linux,/max-width:760px/);
 assert.match(python,/main#lab\{max-width:430px/);
 assert.match(linux,/\.shell,body\.linux-five-tabs \.app\{width:min\(100%,430px\)/);
});
test('Linux course pages load the shared navigation without changing course storage keys',()=>{
 for(const page of ['linux-home.html','linux-start.html','linux-review.html','linux-crash-course.html']){
  const html=fs.readFileSync(page,'utf8');
  assert.match(html,/assets\/linux-shared-navigation\.js/);
 }
 const course=fs.readFileSync('linux-crash-course.html','utf8');
 assert.match(course,/meowde-linux-cram-v1/);
});

const test=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');
const shared=fs.readFileSync('assets/shared-five-tab-shell.css','utf8');
const dl=fs.readFileSync('deep-learning.html','utf8');
const ml=fs.readFileSync('assets/ml-shell-view.js','utf8');
test('DL and ML use the same compact node grid and visible 46px circular marker',()=>{
 assert.match(shared,/grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
 assert.match(shared,/width:46px/);
 assert.match(dl,/classList.add\('meowde-node-grid'\)/);
 assert.match(dl,/classList.add\('meowde-node-card'\)/);
 assert.match(ml,/classList.add\('meowde-node-grid'\)/);
 assert.match(ml,/button.replaceChildren\(ball,title\)/);
});
test('ML map cannot show a lesson, but unit URL permits existing grading engine',()=>{
 assert.match(ml,/classList.add\('ml-map-only'\)/);
 assert.match(ml,/classList.add\('ml-lesson-only'\)/);
 assert.match(shared,/body.ml-map-only #lesson/);
 assert.match(shared,/body.ml-lesson-only #units/);
 assert.match(ml,/tab=learn&unit=/);
});

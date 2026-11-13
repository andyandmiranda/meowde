const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const dl=fs.readFileSync('deep-learning.html','utf8');
const ml=fs.readFileSync('assets/ml-shell-view.js','utf8');
const css=fs.readFileSync('assets/shared-five-tab-shell.css','utf8');
test('DL map node classes have matching local stylesheet and 17-unit map',()=>{
 assert.match(dl,/id="dl-map-node-style"/);
 for(const name of ['dl-learning-trail','dl-learning-node','dl-learning-ball'])assert.match(dl,new RegExp(name));
 assert.match(dl,/tab==='learn'/);
 assert.match(dl,/units\.forEach/);
});
test('ML 4-unit map has visible nodes and direct-link navigation',()=>{
 assert.match(ml,/meowde-node-grid/);
 assert.match(ml,/meowde-node-card/);
 assert.match(ml,/tab=learn&unit=/);
 assert.match(css,/\.meowde-node-ball/);
 assert.match(css,/min-height:110px/);
});

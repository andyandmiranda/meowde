const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
test('map label is a pointer click target but not a duplicate keyboard button',()=>{
 const js=fs.readFileSync('v442-map-touch.js','utf8');
 assert.match(js,/label\.removeAttribute\("role"\)/);
 assert.match(js,/label\.removeAttribute\("tabindex"\)/);
 assert.match(js,/node\.setAttribute\("aria-describedby",id\)/);
 assert.match(js,/document\.addEventListener\("click"/);
 assert.doesNotMatch(js,/label\.setAttribute\("role","button"\)/);
});
test('My tab in canonical path points to same screen as the root',()=>{
 const js=fs.readFileSync('v413-core.js','utf8');
 const html=fs.readFileSync('index.html','utf8');
 assert.match(js,/'renderRoom\(\)','cat',ko\?'마이':'My'/);
 assert.match(html,/function tabs\(active\)/);
 assert.match(html,/renderRoom\(\)/);
});
test('Python choice and bughunt options remain semantic pressed buttons',()=>{
 const js=fs.readFileSync('v413-lesson.js','utf8');
 assert.match(js,/class=\\"choice /);
 assert.match(js,/class=\\"linebtn /);
 assert.match(js,/aria-pressed/);
 assert.doesNotMatch(js,/role=\\"checkbox\\"/);
});

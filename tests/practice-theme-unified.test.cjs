const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
test('Python lab loads shared practice theme last',()=>{
 const html=fs.readFileSync('python-lab.html','utf8');
 const base=html.indexOf('/assets/learning-surface-ui.css');
 const shell=html.indexOf('/assets/shared-five-tab-shell.css');
 const theme=html.indexOf('/assets/practice-theme-unified.css');
 assert.ok(base>=0&&shell>base&&theme>shell);
});
test('intro unit list is a bounded, accessible card instead of sprawling green links',()=>{
 const css=fs.readFileSync('assets/practice-theme-unified.css','utf8');
 for(const rule of ['.values-units>summary','.values-units nav','.values-units nav a','.values-path.card'])assert.ok(css.includes(rule));
 assert.match(css,/max-height:min\(230px,35dvh\)/);
 assert.match(css,/overflow-y:auto/);
 assert.match(css,/text-decoration:none/);
 assert.match(css,/min-height:44px/);
 assert.match(css,/:focus-visible/);
 assert.match(css,/background:linear-gradient\(180deg,#fff4da,#e8f8f0\)/);
});
test('practice theme is style-only, preserves mobile and desktop containers',()=>{
 const css=fs.readFileSync('assets/practice-theme-unified.css','utf8');
 assert.match(css,/max-width:430px/);
 assert.match(css,/@media\(min-width:900px\)/);
 assert.match(css,/max-width:1080px/);
 assert.doesNotMatch(css,/localStorage|sessionStorage|setItem|removeItem/);
 const js=fs.readFileSync('assets/python-values-path.js','utf8');
 assert.match(js,/class="values-units"/);
 assert.match(js,/class="values-path card"/);
});

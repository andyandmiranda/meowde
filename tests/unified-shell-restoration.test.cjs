'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const read=p=>fs.readFileSync(p,'utf8');
const source=read('assets/meowde-unified-app-shell.js');
const routes={
 python:['/?tab=home','/?tab=map','/python-lab.html','/together.html?subject=python','/?tab=my'],
 linux:['/linux-home.html?tab=home','/linux-home.html?tab=learn','/linux-crash-course.html?view=concept','/together.html?subject=linux','/linux-home.html?tab=my'],
 ml:['/ml-foundations.html?tab=home','/ml-foundations.html?tab=learn','/ml-foundations.html?tab=deepen','/together.html?subject=ml','/ml-foundations.html?tab=my'],
 deep:['/deep-learning.html?tab=home','/deep-learning.html?tab=learn','/deep-learning.html?tab=deepen','/together.html?subject=deep','/deep-learning.html?tab=my']
};
function harness(path){
 const u=new URL(path,'https://meowde.test');
 const window={location:{pathname:u.pathname,search:u.search},document:{readyState:'loading',addEventListener(){},getElementById(){return null}},localStorage:{getItem(){throw new Error('shell should not write/read storage in routing tests')}}};
 vm.runInNewContext(source,{window,URLSearchParams});
 return window.MeowdeUnifiedShell;
}
test('reused Work shell recognizes 4 courses and routes all 20 tab destinations',()=>{
 const keys=['home','learn','deepen','together','my'];
 const shell=harness('/');
 for(const [s,urls] of Object.entries(routes))for(const [i,tab] of keys.entries()){
  assert.equal(shell.routes[s][tab],urls[i],s+'/'+tab);
  const target=harness(urls[i]);assert.equal(target.subject(),s,s+'/'+tab+' subject');
  assert.equal(target.tab(),tab,s+'/'+tab+' tab');
 }
});
test('10 existing entry surfaces load the same Work shell CSS and JS exactly once',()=>{
 const pages=['index.html','linux-home.html','linux-course.html','linux-start.html','linux-crash-course.html','linux-review.html','ml-foundations.html','deep-learning.html','python-lab.html','together.html'];
 for(const path of pages){
  const html=read(path);
  assert.equal((html.match(/meowde-unified-app-shell\.css\?v=2/g)||[]).length,1,path+' CSS');
  assert.equal((html.match(/meowde-unified-app-shell\.js\?v=2/g)||[]).length,1,path+' JS');
 }
 const selector=read('assets/meowde-subject-selector.js');
 assert.match(selector,/if\(root\.MeowdeUnifiedShell\)return/);
 const js=read('assets/meowde-unified-app-shell.js');
 assert.doesNotMatch(js,/localStorage\.setItem/);
});

'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('assets/meowde-subject-selector.js','utf8');
function harness(url,screen){
 const location=new URL(url,'https://meowde.test');
 const root={location,document:{querySelectorAll:()=>[]},localStorage:{getItem(){return null},setItem(){throw new Error('navigation must not write storage')}}};
 const context={window:root,URLSearchParams,...(screen?{S:{screen}}:{})};
 vm.runInNewContext(source,context);
 return {api:root.MeowdeSubjects,state:context.S};
}
test('all 15 subject-tab destinations retain their subject and tab meaning',()=>{
 const {api}=harness('/');
 for(const subject of ['python','linux','ml'])for(const tab of ['home','learn','deepen','together','my']){
  const next=harness(api.routeFor(subject,tab)).api;
  assert.equal(next.current(),subject,`${subject}/${tab}: subject`);
  assert.equal(next.currentTab(),tab,`${subject}/${tab}: tab`);
 }
});
test('Python in-place tabs override stale entry URLs when changing subjects',()=>{
 for(const entry of ['/?tab=home','/?tab=map','/?tab=my','/index.html']){
  const {api,state}=harness(entry,'home');
  for(const [screen,tab] of [['home','home'],['map','learn'],['review','learn'],['lesson','learn'],['profile','my'],['room','my'],['achievements','my']]){
   state.screen=screen;
   assert.equal(api.currentTab(),tab,`${entry}/${screen}`);
   for(const subject of ['linux','ml'])assert.equal(harness(api.routeFor(subject)).api.currentTab(),tab);
  }
 }
});

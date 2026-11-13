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
test('all 20 subject-tab destinations retain their subject and tab meaning',()=>{
 const {api}=harness('/');
 for(const subject of ['python','linux','ml','deep'])for(const tab of ['home','learn','deepen','together','my']){
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
   for(const subject of ['linux','ml','deep'])assert.equal(harness(api.routeFor(subject)).api.currentTab(),tab);
  }
 }
});

test('Deep Learning default route opens its own lesson map, not Python home',()=>{
 const {api}=harness('/deep-learning.html');
 assert.equal(api.current(),'deep');
 assert.equal(api.currentTab(),'learn');
 for(const tab of ['home','learn','deepen','my']){
  const link=api.routeFor('deep',tab);
  assert.ok(link.startsWith('/deep-learning.html?tab='),`${tab}: ${link}`);
 }
 assert.equal(api.routeFor('deep','together'),'/together.html?subject=deep');
});
test('fallback course pickers and invitations expose Deep Learning without changing saved progress',()=>{
 const home=fs.readFileSync('index.html','utf8');
 const linux=fs.readFileSync('assets/linux-shared-navigation.js','utf8');
 const together=fs.readFileSync('together.html','utf8');
 const invite=fs.readFileSync('assets/together.js','utf8');
 assert.match(home,/<option value="deep">딥러닝<\/option>/);
 assert.match(linux,/deep\.value='deep'/);
 assert.match(linux,/selector\.append\(python,linux,ml,pending\[0\],deep,pending\[1\]\)/);
 assert.match(together,/<option value="deep">딥러닝<\/option>/);
 assert.match(invite,/\['linux','ml','deep'\]/);
 assert.match(invite,/\/deep-learning\.html\?tab=learn/);
});

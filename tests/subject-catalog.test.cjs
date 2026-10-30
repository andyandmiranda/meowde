const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
test('course catalog only links to existing lessons, planned tracks are disabled',()=>{
 const html=fs.readFileSync('subjects.html','utf8');
 for(const destination of ['/\\?tab=map','/linux-home.html\\?tab=learn','/ml-foundations.html'])assert.match(html,new RegExp(destination));
 for(const title of ['Python','Linux','데이터 분석','머신러닝','딥러닝','AI 로보틱스'])assert.match(html,new RegExp('<h2>'+title+'</h2>'));
 assert.equal((html.match(/class="course pending"/g)||[]).length,3);
 assert.match(html,/준비 중 · 학습 비활성/);
});
test('ML intro is reachable with shared five-tab and small subject picker',()=>{
 const ml=fs.readFileSync('ml-foundations.html','utf8');
 assert.match(ml,/shared-five-tab-shell\.css/);
 assert.match(ml,/class="meowde-shell-subject"/);
 assert.match(ml,/class="meowde-lab-tabbar"/);
 for(const name of ['홈','학습','심화','함께','마이'])assert.match(ml,new RegExp('aria-label="'+name+'"'));
 for(const filename of ['python-lab.html','together.html']){
  assert.match(fs.readFileSync(filename,'utf8'),/value="ml">머신러닝/);
 }
});
test('subject overview reads existing Python/Linux/ML progress without writing storage',()=>{
 const src=fs.readFileSync('assets/meowde-subject-hub.js','utf8');
 let writes=0;
 const values=new Map([
  ['meowde-v410-state',JSON.stringify({done:[0,1],inProgress:{idx:0,queue:[{}]}})],
  ['meowde-linux-guided-v1',JSON.stringify({version:1,step:4})],
  ['meowde-ml-foundations-v1',JSON.stringify({done:['linear','knn']})]
 ]);
 const root={localStorage:{getItem:k=>values.get(k)||null,setItem:()=>writes++}};
 const context={window:root,globalThis:root};
 vm.runInNewContext(src,context);
 const hub=root.MeowdeSubjectHub,html=hub.render(root.localStorage,'ml');
 assert.match(html,/2개 레슨 완료/);
 assert.match(html,/첫 레슨 완료/);
 assert.match(html,/2 \/ 4 주제 완료/);
 assert.match(html,/href="\/subjects.html"/);
 assert.equal(writes,0);
});

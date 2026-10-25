const {test}=require('node:test');
const assert=require('node:assert/strict');
const {spawnSync}=require('node:child_process');
const path=require('../assets/python-values-path.js');
test('practice volume adapts within its bounds; helped retries never become independent',()=>{
 const s=path.initial();assert.equal(path.count(s),3);
 path.mark(s,false);path.mark(s,false);assert.equal(path.count(s),4);
 path.mark(s,true);assert.deepEqual(s.items['0:1:0'],{firstAttemptPassed:false,attempts:3,lastPassed:true,lastPassedWithHelp:true,helpUsed:true,feedbackUsed:true,extraAdded:true,completedAt:s.items['0:1:0'].completedAt,independentPassed:false});
 path.advance(s);const easier=path.question(s);assert.equal(easier.n,11);
 assert.equal(path.advance(s),false);
 while(!s.complete){path.mark(s,true,100);path.advance(s,100);}
 assert.equal(Object.keys(s.items).length,18);
 assert.equal(s.items['0:3:0'].independentPassed,false);
 assert.equal(s.items['0:4:0'].independentPassed,true);
 assert.equal(path.review(s,100+86399999),false);
 const history=JSON.stringify(s.items);assert.equal(path.review(s,100+86400000),true);
 assert.equal(s.cycle,1);assert.equal(s.level,4);assert.equal(JSON.stringify(s.items),history);
 assert.notEqual(path.question(s).n,path.question({...s,cycle:0}).n);
});
test('Python accepts alternative valid code and rejects fixed answers across generated variants',()=>{
 const cases=[];
 for(let level=3;level<=5;level++)for(let index=0;index<8;index++){
  const q=path.question({...path.initial(),level,index});
  cases.push({expect:true,payload:path.payload(q,q.solution)});
  const alt='count = int(text)\nboxes, left = divmod(count, capacity)';
  cases.push({expect:true,payload:path.payload(q,alt)});
  cases.push({expect:false,payload:path.payload(q,`count = ${q.n}\nboxes = ${Math.floor(q.n/q.cap)}\nleft = ${q.n%q.cap}`)});
 }
 const result=spawnSync('python',['-c',`import json,sys
for case in json.load(sys.stdin):
 p=case['payload'];ok=True
 for t in p['tests']:
  ns={}
  try:
   exec(p['code'],ns);exec(t['code'],ns)
  except Exception:ok=False
 assert ok==case['expect'], p
print('72 generated Python cases passed')`],{input:JSON.stringify(cases),encoding:'utf8'});
 assert.equal(result.status,0,result.stderr);assert.match(result.stdout,/72/);
});
test('future and malformed path state is rejected for preservation',()=>{
 assert.ok(path.valid(path.initial()));
 for(const state of [null,{}, {...path.initial(),version:2},{...path.initial(),items:[]},{...path.initial(),items:{a:null}},{...path.initial(),index:-1}])assert.ok(!path.valid(state));
});

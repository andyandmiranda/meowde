const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
// Execute the actual storage initialization/save functions, stopping before UI rendering.
const source=fs.readFileSync('assets/python-lab.js','utf8');
const storageSource=source.slice(0,source.indexOf('  function stateLabel'))+'globalThis.storageTest={save,record,showStorageProblem};})();';
function boot(raw,{readError=false,writeError=false}={}){
  let value=raw,writes=0;const notice={textContent:''};
  const context={document:{getElementById:()=>notice},localStorage:{
    getItem(){if(readError)throw Error('unavailable');return value;},
    setItem(key,next){writes++;if(writeError)throw Error('quota');value=next;}
  }};
  vm.runInNewContext(storageSource,context);
  return {api:context.storageTest,notice,value:()=>value,writes:()=>writes};
}
for(const raw of ['{bad','', 'null', '{}', '{"version":2,"units":{}}','{"version":1,"units":[]}','{"version":1,"units":{"values":null}}']){
  test('preserve unreadable or unsupported original: '+raw,()=>{
    const s=boot(raw);s.api.record('values').draft='new work';
    assert.equal(s.api.save(),false);assert.equal(s.writes(),0);assert.equal(s.value(),raw);
    assert.match(s.notice.textContent,/기존 기록/);
  });
}
test('read failure never enables blind writes',()=>{
  const s=boot('original',{readError:true});s.api.record('values').draft='new';
  assert.equal(s.api.save(),false);assert.equal(s.writes(),0);
});
test('new storage saves and valid records survive subsequent edits',()=>{
  const s=boot(null);s.api.record('values').draft='first';assert.equal(s.api.save(),true);
  const next=boot(s.value());next.api.record('another').draft='second';assert.equal(next.api.save(),true);
  assert.deepEqual(JSON.parse(next.value()),{version:1,units:{values:{draft:'first'},another:{draft:'second'}}});
});
test('write failure preserves original and reports unsaved work',()=>{
  const raw='{"version":1,"units":{}}',s=boot(raw,{writeError:true});
  s.api.record('values').draft='new';assert.equal(s.api.save(),false);assert.equal(s.value(),raw);
  assert.match(s.notice.textContent,/저장하지 못했습니다/);
});

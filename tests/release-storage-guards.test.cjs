'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const linux=fs.readFileSync('linux-course.html','utf8');
const ml=fs.readFileSync('assets/ml-foundations.js','utf8');
const mlShell=fs.readFileSync('assets/ml-shell-view.js','utf8');
const navigation=fs.readFileSync('assets/linux-shared-navigation.js','utf8');
const stateSource=linux.match(/^let state=\{version:1,unit:0,step:0,done:\{\}\}.*$/m)?.[0];
const saveSource=linux.match(/function save\(\)\{.*?(?=\nfunction commitProgress)/s)?.[0];
function probe(record,{readFail=false,writeFail=false}={}){
 let writes=0,contents=record;
 const store={getItem(){if(readFail)throw Error('read denied');return contents;},setItem(_,v){writes++;if(writeFail)throw Error('quota');contents=v;}};
 const ctx=vm.createContext({localStorage:store,document:{getElementById(){return {textContent:''}}},KEY:'meowde-linux-course-v1'});
 vm.runInContext(stateSource+'\n'+saveSource,ctx);
 const ok=vm.runInContext('save()',ctx);
 return {ok,writes,contents,state:JSON.parse(JSON.stringify(vm.runInContext('state',ctx)))};
}
test('Linux blocks overwrite on invalid or future progress',()=>{
 assert.ok(stateSource&&saveSource,'expected exact source sections');
 for(const value of ['bad json',JSON.stringify({version:2,unit:2}),JSON.stringify({version:1,done:[]})]){
  const result=probe(value);
  assert.equal(result.ok,false);assert.equal(result.writes,0);assert.equal(result.contents,value);
 }
});
test('Linux blocks writes on read denial and quota exhaustion',()=>{
 const denied=probe(null,{readFail:true});
 assert.equal(denied.writes,0);assert.equal(denied.ok,false);
 const valid=JSON.stringify({version:1,unit:2,step:1,done:{}});
 const quota=probe(valid,{writeFail:true});
 assert.equal(quota.ok,false);assert.equal(quota.contents,valid);
});
test('Linux preserves valid progress and its storage key',()=>{
 const valid=JSON.stringify({version:1,unit:2,step:1,done:{1:true},futureFlag:7});
 const r=probe(valid);
 assert.equal(r.ok,true);assert.equal(r.writes,1);
 assert.equal(JSON.parse(r.contents).futureFlag,7);
 assert.equal(JSON.parse(r.contents).unit,2);
 assert.match(linux,/meowde-linux-course-v1/);
});
test('ML future progress is not deleted and completion count is bounded',()=>{
 const sandbox=vm.createContext({parsed:{done:['linear','future-v2','linear'],other:{x:1}},saved:{},units:[{id:'linear'},{id:'logistic'},{id:'knn'},{id:'bayes'}]});
 assert.match(ml,/saved=\{\.\.\.parsed,done:\[\.\.\.parsed\.done\]\};/);
 vm.runInContext('saved={...parsed,done:[...parsed.done]};',sandbox);
 assert.deepEqual(Array.from(sandbox.saved.done),['linear','future-v2','linear']);
 assert.equal(sandbox.saved.other.x,1);
 assert.match(ml,/new Set\(saved\.done\.filter\(id=>units\.some/);
 assert.match(mlShell,/new Set\(saved\.done\.filter\(id=>\['linear','logistic','knn','bayes'\]/);
});
test('shared subject selector avoids duplicate navigation and ML lesson remains visible',()=>{
 assert.match(navigation,/if\(selector\.dataset\.sharedSubjects==='1'\)return;/);
 assert.match(mlShell,/if\(lesson\)lesson\.hidden=false;/);
});

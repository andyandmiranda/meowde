const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const path=require("node:path");
const root=path.join(__dirname,"..");
function load(){const sandbox={};sandbox.globalThis=sandbox;vm.runInNewContext(fs.readFileSync(path.join(root,"assets/ml-foundations.js"),"utf8"),sandbox);return sandbox.MeowdeMLFoundations;}
test("four ML introductory lessons teach trace, pitfalls, and feedback",()=>{
 const {units,grade}=load();
 assert.deepEqual(Array.from(units,x=>x.id),["linear","logistic","knn","bayes"]);
 for(const u of units){assert.ok(u.prereq&&u.concept&&u.trace&&u.mistake&&u.transfer);assert.ok(u.choices.length>=3);
  const correct=grade(u.id,u.answer);assert.equal(correct.correct,true);assert.equal(correct.answer,u.choices[u.answer]);
  const wrong=grade(u.id,(u.answer+1)%u.choices.length);assert.equal(wrong.correct,false);assert.ok(wrong.selected&&wrong.reason&&wrong.next);
 }
});
test("unexpected answer indexes cannot be treated as correct",()=>{
 const api=load();for(const input of [-1,3,999,NaN,1.2])assert.equal(api.grade("linear",input).ok,false);
 assert.equal(api.grade("missing",0).ok,false);
});
test("ML learning storage is isolated and linked from Python lab",()=>{
 const api=load();
 assert.equal(api.KEY,"meowde-ml-foundations-v1");
 const html=fs.readFileSync(path.join(root,"python-lab.html"),"utf8");
 assert.match(html,/value="ml">ML 입문<\/option>/);
 assert.match(html,/location\.assign\(\x27\/ml-foundations\.html\x27\)/);
 const entry=fs.readFileSync(path.join(root,"ml-foundations.html"),"utf8");
 assert.match(entry,/assets\/ml-foundations\.js/);
 assert.match(fs.readFileSync(path.join(root,"assets/ml-foundations.js"),"utf8"),/if\(!writable\)\{[^}]*return false;/);
});

function renderWithStorage({readError=false,writeError=false,record=null}={}){
 const elements=new Map();
 function element(tag){
  return {tag,children:[],attributes:{},textContent:"",className:"",append(...nodes){this.children.push(...nodes)},replaceChildren(...nodes){this.children=[...nodes]},setAttribute(k,v){this.attributes[k]=v}};
 }
 const units=element("nav"),lesson=element("article"),status=element("p");
 elements.set("units",units);elements.set("lesson",lesson);elements.set("storage-status",status);
 let stored=record;
 const storage={getItem(){if(readError)throw Error("Denied");return stored},setItem(key,value){if(writeError)throw Error("Quota");stored=value}};
 const sandbox={document:{getElementById(id){return elements.get(id)},createElement:element,createTextNode:txt=>({textContent:txt})},localStorage:storage,location:{search:""},URLSearchParams,window:null};
 sandbox.window=sandbox;sandbox.globalThis=sandbox;
 vm.runInNewContext(fs.readFileSync(path.join(root,"assets/ml-foundations.js"),"utf8"),sandbox);
 const buttons=()=>lesson.children.find(node=>node.className==="choices").children;
 return {sandbox,units,lesson,status,buttons,get stored(){return stored},set writeError(v){writeError=v}};
}
test("ML quota failure does not grant completion, retry stores it once",()=>{
 const app=renderWithStorage({writeError:true});
 app.buttons()[1].onclick();
 assert.doesNotMatch(app.units.children[0].textContent,/✓/);
 assert.match(app.status.textContent,/저장/);
 assert.equal(app.stored,null);
 app.writeError=false;app.buttons()[1].onclick();
 assert.match(app.units.children[0].textContent,/✓/);
 assert.deepEqual(JSON.parse(app.stored).done,["linear"]);
});
test("ML unreadable record cannot be overwritten by answering correctly",()=>{
 const app=renderWithStorage({readError:true,record:"corrupted"});
 app.buttons()[1].onclick();
 assert.equal(app.stored,"corrupted");
 assert.doesNotMatch(app.units.children[0].textContent,/✓/);
 assert.match(app.status.textContent,/원본/);
});
test("ML completion preserves unknown fields and logistic snippet imports math",()=>{
 const app=renderWithStorage({record:JSON.stringify({done:[],futureField:{version:42}})});
 app.buttons()[1].onclick();
 assert.deepEqual(JSON.parse(app.stored).futureField,{version:42});
 const logistic=load().units.find(x=>x.id==="logistic");
 assert.match(logistic.code,/^import math\n/);
});

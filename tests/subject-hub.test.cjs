const assert=require("node:assert/strict");
const fs=require("node:fs"),vm=require("node:vm"),test=require("node:test");
const text=fs.readFileSync("assets/meowde-subject-hub.js","utf8");
const context={};vm.runInNewContext(text,context);
const hub=context.MeowdeSubjectHub;
function storage(items){return {getItem:key=>Object.prototype.hasOwnProperty.call(items,key)?items[key]:null};}
test("empty status does not write to storage",()=>{const s=storage({});assert.match(hub.render(s,"python"),/처음 시작하기/);assert.match(hub.render(s,"linux"),/첫 레슨 시작하기/);});
test("preserves independent Python and Linux progress formats",()=>{const s=storage({"meowde-v410-state":JSON.stringify({done:[0,1],queue:[{id:"a"}],idx:0}),"meowde-linux-guided-v1":JSON.stringify({version:1,step:3,input:"mkdir travel"})});const result=hub.render(s,"linux");assert.match(result,/2개 레슨 완료/);assert.match(result,/첫 레슨 4\/4 이어하기/);assert.match(result,/aria-current="page"/);});
test("corrupt values do not destroy or overwrite records",()=>{let writes=0;const s={getItem:()=>"{bad",setItem:()=>{writes++;},removeItem:()=>{writes++;}};assert.match(hub.render(s,"python"),/처음 시작하기/);assert.equal(writes,0);});
test("rendered links and descriptions remain grounded",()=>{const html=hub.render(storage({}),"python");assert.match(html,/href="\/"/);assert.match(html,/href="\/linux-home.html"/);assert.match(html,/두 과목의 점수는 합산하지 않아요/);});

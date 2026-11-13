'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('assets/ml-shell-view.js','utf8');
const engine=fs.readFileSync('assets/ml-foundations.js','utf8');
function run(url,done=[]){
 const api={};vm.runInNewContext(engine,{window:api,document:undefined});
 const elements=[];const links=Array.from({length:5},()=>({removeAttribute(){},setAttribute(){}}));
 const classList=()=>({add(){}});
 const title={textContent:''},description={textContent:'',replaceChildren(){this.children=[]},append(el){(this.children||=[]).push(el)}};
 const nav={children:Array.from({length:4},()=>({className:'',textContent:'',setAttribute(){},onclick:null})),classList:classList(),hidden:false,before(el){this.progress=el}};
 const main={classList:classList(),querySelector(s){return s==='h1'?title:s==='h1+p'?description:null},innerHTML:''};
 const lesson={hidden:false},status={textContent:''};
 const dict={'main':main,'#lesson':lesson,'#storage-status':status,'#units':nav,'.meowde-shell-brand small':{textContent:''}};
 let writes=0,assigned='';
 const doc={head:{append(){}},body:{classList:classList()},createElement(t){return {tag:t,className:'',textContent:'',href:''}},querySelector(s){return dict[s]||null},getElementById(id){return dict['#'+id]||null},querySelectorAll(s){return s==='.meowde-lab-tabbar a'?links:[]}};
 const location=new URL(url,'https://meowde.test');location.assign=(s)=>{assigned=s};
 const root={MeowdeMLFoundations:api.MeowdeMLFoundations};
 vm.runInNewContext(source,{window:root,document:doc,location,URLSearchParams,localStorage:{getItem(k){assert.equal(k,'meowde-ml-foundations-v1');return JSON.stringify({done})},setItem(){writes++}}});
 return {nav,lesson,status,title,description,getWrites:()=>writes,getAssigned:()=>assigned,units:api.MeowdeMLFoundations.units};
}
test('ML map renders exactly four independently selectable lesson IDs without writing records',()=>{
 const x=run('/ml-foundations.html?tab=learn',['linear']);
 assert.equal(x.lesson.hidden,true);assert.equal(x.nav.children.length,4);assert.equal(x.nav.progress.textContent,'완료 1 / 4');
 for(let i=0;i<4;i++){
  const node=x.nav.children[i];assert.match(node.className,/ml-learning-node/);node.onclick();
  assert.equal(x.getAssigned(),'/ml-foundations.html?tab=learn&unit='+x.units[i].id);
 }
 assert.equal(x.getWrites(),0);
});
test('direct ML unit URL presents matching engine lesson with back navigation and no storage writes',()=>{
 for(const unit of ['linear','logistic','knn','bayes']){
  const x=run('/ml-foundations.html?tab=learn&unit='+unit);
  assert.equal(x.title.textContent,x.units.find(u=>u.id===unit).title);
  assert.equal(x.nav.hidden,true);assert.equal(x.lesson.hidden,false);
  assert.equal(x.description.children[0].href,'/ml-foundations.html?tab=learn');
  assert.equal(x.getWrites(),0);
 }
});

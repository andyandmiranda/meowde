const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('assets/together.js','utf8');
function boot(search='',denied=false){
 const elements=new Map();let copied='',encoded='';
 function el(id){if(!elements.has(id))elements.set(id,{hidden:true,value:'',textContent:'',innerHTML:'',attrs:{},addEventListener(type,fn){this[type]=fn},setAttribute(k,v){this.attrs[k]=v},focus(){this.focused=true},select(){this.selected=true},querySelector(){return el('received-start')}});return elements.get(id)}
 const tabs=Array.from({length:5},()=>({href:''})),c={URL,URLSearchParams,location:{search,origin:'https://meowde.example'},document:{getElementById:el,querySelector:s=>s==='#received a'?el('received-start'):el(s),querySelectorAll:()=>tabs},navigator:{clipboard:{async writeText(value){if(denied)throw Error('denied');copied=value}}}};
 c.window=c;vm.createContext(c);vm.runInContext(fs.readFileSync('assets/vendor/qrcode-generator-2.0.4.js','utf8'),c);
 const encoder=c.qrcode;c.qrcode=(...args)=>{const qr=encoder(...args),add=qr.addData;qr.addData=value=>{encoded=value;add.call(qr,value)};return qr};
 vm.runInContext(source,c);return {el,tabs,copied:()=>copied,encoded:()=>encoded};
}
test('one click copies a minimal invite without sender or topic fields',async()=>{
 const b=boot('?from=private-name&topic=private-topic');await b.el('share').click();
 assert.equal(b.copied(),'https://meowde.example/together.html?invite=1');assert.match(b.el('status').textContent,/복사했어요/);
});
test('clipboard denial exposes a selectable link without requiring form entry',async()=>{
 const b=boot('',true);await b.el('share').click();assert.equal(b.el('copy-fallback').hidden,false);assert.equal(b.el('link').selected,true);assert.equal(b.el('link').value,'https://meowde.example/together.html?invite=1');
});
test('local QR contains the same minimal Linux invite and can be closed',()=>{
 const b=boot('?subject=linux&from=someone');b.el('show-qr').click();
 assert.equal(b.encoded(),'https://meowde.example/together.html?invite=1&subject=linux');assert.match(b.el('qr-image').innerHTML,/<svg/);assert.match(b.el('qr-image').innerHTML,/<path/);assert.equal(b.el('invite-qr').hidden,false);assert.equal(b.el('show-qr').attrs['aria-expanded'],'true');
 b.el('show-qr').click();assert.equal(b.el('invite-qr').hidden,true);
});

test('ML sharing stays on the selected course and recipient opens the ML entry',async()=>{
 const b=boot('?subject=ml&invite=1&from=private');await b.el('share').click();
 assert.equal(b.copied(),'https://meowde.example/together.html?invite=1&subject=ml');assert.equal(b.el('course-label').textContent,'ML 첫걸음');assert.equal(b.el('received-start').href,'/ml-foundations.html');
});

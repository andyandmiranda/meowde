'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync('index.html','utf8');
const hotfix=fs.readFileSync('v412-hotfix.js','utf8');
function harness(){
 const scripts=[];
 const context={Promise,Error,console:{error(){}},pyReady:false,pyLoading:false,pyodide:null,S:{screen:'lesson'}};
 context.document={getElementById:id=>scripts.find(s=>s.id===id&&!s.removed),createElement:()=>({events:{},addEventListener(type,fn){this.events[type]=fn},remove(){this.removed=true}}),head:{append:s=>scripts.push(s)}};
 vm.createContext(context);
 vm.runInContext(html.slice(html.indexOf('let pyodideScriptPromise=null;'),html.indexOf('\nasync function warmPy()')),context);
 vm.runInContext(hotfix.slice(hotfix.indexOf('  let runtimePromise=null;'),hotfix.indexOf('\n  runPython=')),context);
 return {context,scripts};
}
test('shipped hotfix starts lazy loader and concurrent callers wait for one runtime',async()=>{
 const {context:c,scripts}=harness();let loads=0,release;
 const first=c.warmPy(),second=c.warmPy();
 assert.equal(scripts.length,1);assert.equal(c.pyLoading,true);
 c.loadPyodide=()=>{loads++;return new Promise(resolve=>{release=resolve})};
 scripts[0].events.load();await new Promise(resolve=>setImmediate(resolve));
 assert.equal(loads,1);assert.equal(c.pyReady,false);
 const runtime={};release(runtime);await Promise.all([first,second]);
 assert.equal(c.pyodide,runtime);assert.equal(c.pyReady,true);assert.equal(c.pyLoading,false);
 await c.warmPy();assert.equal(loads,1);
});
test('failed CDN script is removed and retry actually issues a new request',async()=>{
 const {context:c,scripts}=harness();
 const first=c.warmPy();scripts[0].events.error();await first;
 assert.equal(c.pyReady,false);assert.equal(c.pyLoading,false);assert.equal(c.pyodide,null);
 const retry=c.warmPy();assert.equal(scripts.length,2);assert.equal(scripts[0].removed,true);
 const runtime={};c.loadPyodide=async()=>runtime;scripts[1].events.load();await retry;
 assert.equal(c.pyodide,runtime);assert.equal(c.pyReady,true);
});
test('runtime initialization failure releases pending state for a safe retry',async()=>{
 const {context:c}=harness();let calls=0;
 c.loadPyodide=async()=>{if(++calls===1)throw new Error('network');return {}};
 await c.warmPy();assert.equal(c.pyReady,false);assert.equal(c.pyLoading,false);
 await c.warmPy();assert.equal(c.pyReady,true);assert.equal(calls,2);
});

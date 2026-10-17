(function(root){"use strict";
const PYTHON_KEY="meowde-v410-state",LINUX_KEY="meowde-linux-guided-v1",PREFERENCE_KEY="meowde-entry-preference-v1";
function read(storage,key){try{const raw=storage.getItem(key);return raw===null?{status:"missing"}:{status:"ok",value:JSON.parse(raw)};}catch(error){return {status:"invalid"};}}
function inspect(storage){
 const py=read(storage,PYTHON_KEY),li=read(storage,LINUX_KEY),pref=read(storage,PREFERENCE_KEY);
 const p=py.status==="ok"&&py.value&&typeof py.value==="object"&&!Array.isArray(py.value)?py.value:null;
 const l=li.status==="ok"&&li.value&&typeof li.value==="object"&&!Array.isArray(li.value)?li.value:null;
 const python=!!(p&&((p.inProgress&&Array.isArray(p.inProgress.queue)&&p.inProgress.queue.length>0)||Array.isArray(p.queue)&&p.queue.length>0&&Number.isInteger(p.idx)&&p.idx>=0&&p.idx<p.queue.length));
 const linux=!!(l&&l.version===1&&Number.isInteger(l.step)&&l.step>=0&&l.step<=4&&(l.step>0||typeof l.input==="string"&&l.input.length>0));
 const preferred=pref.status==="ok"&&pref.value&&pref.value.version===1&&["python","linux"].includes(pref.value.subject)?pref.value.subject:null;
 let subject=null;
 if(python&&!linux)subject="python";
 else if(linux&&!python)subject="linux";
 else if(preferred&&((preferred==="python"&&python)||(preferred==="linux"&&linux)))subject=preferred;
 return {subject,python,linux,ambiguous:python&&linux&&!subject,invalid:py.status==="invalid"||li.status==="invalid",storageUnavailable:py.status==="invalid"&&li.status==="invalid",preferred};
}
function recordPreference(storage,subject){if(!["python","linux"].includes(subject))return false;try{storage.setItem(PREFERENCE_KEY,JSON.stringify({version:1,subject}));return true;}catch(error){return false;}}
root.MeowdeEntryProgress={PYTHON_KEY,LINUX_KEY,PREFERENCE_KEY,inspect,recordPreference};
})(typeof window!=="undefined"?window:globalThis);

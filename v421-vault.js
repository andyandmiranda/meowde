(function applyMeowdeV421Vault(){
  const PREFIX='meowde-',META_KEY='meowde-v421-vault',SNAPSHOT_KEY='meowde-v421-restore-snapshot';
  function read(key){try{const value=JSON.parse(localStorage.getItem(key)||'{}');return value&&typeof value==='object'?value:{}}catch(error){return {}}}
  const V=read(META_KEY);
  function persist(){try{localStorage.setItem(META_KEY,JSON.stringify(V))}catch(error){console.warn('Meowde v4.21 could not save vault metadata:',error)}}
  function dataKeys(){const list=[];for(let i=0;i<localStorage.length;i++){const key=localStorage.key(i);if(key&&key.startsWith(PREFIX)&&key!==SNAPSHOT_KEY)list.push(key)}return list.sort()}
  function collect(){const data={};dataKeys().forEach(key=>{const value=localStorage.getItem
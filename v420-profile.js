(function applyMeowdeV420Profile(){
  const KEY='meowde-v420-profile';
  function read(){
    try{const value=JSON.parse(localStorage.getItem(KEY)||'{}');return value&&typeof value==='object'?value:{}}
    catch(error){console.warn('Meowde v4.20 profile state was reset:',error);return {}}
  }
  const P=read();
  P.name=typeof P.name==='string'&&P.name.trim()?P.name.trim():'Amy';
  function persist(){
    try{localStorage.setItem(KEY,JSON.stringify(P))}
    catch(error){console.warn('Meowde v4.20 could not save
(function applyMeowdeV421Vault(){
  const PREFIX='meowde-',META_KEY='meowde-v421-vault',SNAPSHOT_KEY='meowde-v421-restore-snapshot';
  function read(key){try{const value=JSON.parse(localStorage.getItem(key)||'{}');return value&&typeof value==='object'?value:{}}catch(error){return {}}}
  const V=read(META_KEY);
  function persist(){try{localStorage.setItem(META_KEY,JSON.stringify(V))}catch(error){console.warn('Meowde v4.21 could not save vault metadata:',error)}}
  function keys(){const list=[];for(let i=0;i<localStorage.length;i++){const key=localStorage.key(i);if(key&&key.startsWith(PREFIX)&&key!==SNAPSHOT_KEY)list.push(key)}return list.sort()}
  function collect(){const data={};keys().forEach(key=>{const value=localStorage.getItem(key);if(value!==null)data[key]=value});return data}
  function snapshot(){try{localStorage.setItem(SNAPSHOT_KEY,JSON.stringify({createdAt:new Date().toISOString(),data:collect()}));return true}catch(error){console.warn('Meowde v4.21 snapshot failed:',error);return false}}
  function clearCurrent(){keys().forEach(key=>localStorage.removeItem(key))}
  function applyData(data){if(!data||typeof data!=='object'||Array.isArray(data))throw new Error('invalid data');clearCurrent();Object.entries(data).forEach(([key,value])=>{if(key.startsWith(PREFIX)&&key!==SNAPSHOT_KEY&&typeof value==='string')localStorage.setItem(key,value)})}
  function payload(){return {app:'Meowde',schema:1,version:'4.21',exportedAt:new Date().toISOString(),data:collect()}}
  function bytes(){try{return new Blob([JSON.stringify(payload())]).size}catch(error){return 0}}
  function sizeLabel(value){if(value<1024)return value+' B';if(value<1048576)return (value/1024).toFixed(1)+' KB';return (value/1048576).toFixed(1)+' MB'}
  function timeLabel(value){if(!value)return S.lang==='ko'?'아직 없음':'Not yet';try{return new Date(value).toLocaleString(S.lang==='ko'?'ko-KR':'en-US',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'})}catch(error){return value}}
  function hasSnapshot(){return Boolean(localStorage.getItem(SNAPSHOT_KEY))}
  function card(){
    const ko=S.lang==='ko',count=keys().length,last=V.lastExport||V.lastImport||'',undo=hasSnapshot();
    return `<section class="v421-vault"><div class="v421-vault-head"><div class="v421-vault-title"><span class="v421-vault-icon">🔐</span><div class="v421-vault-copy"><h3>${ko?'Data Vault':'Data Vault'}</h3><p>${ko?'진도와 업적을 JSON 파일로 보관하고 다른 기기에서 복원하세요.':'Back up progress and achievements as JSON, then restore them on another device.'}</p></div></div><span class="pill">v4.21</span></div><div class="v421-vault-meta"><div class="v421-vault-stat"><b>${count}</b><span>${ko?'저장된 데이터 묶음':'Stored data groups'}</span></div><div class="v421-vault-stat"><b>${sizeLabel(bytes())}</b><span>${ko?'예상 백업 크기':'Estimated backup size'}</span></div></div><div class="v421-vault-actions"><button class="btn" onclick="MeowVault.export()">↓ ${ko?'백업 저장':'Save backup'}</button><button class="btn ghost" onclick="MeowVault.import()">↑ ${ko?'백업 복원':'Restore backup'}</button>${undo?`<button class="btn ghost wide" onclick="MeowVault.undo()">↶ ${ko?'직전 상태로 되돌리기':'Undo last restore/reset'}</button>`:''}</div><div class="v421-vault-note">${ko?'백업에는 Meowde 데이터만 포함되며 서버로 전송되지 않습니다. 복원과 초기화 전에는 현재 상태가 자동 보관됩니다.':'Only Meowde data is included and nothing is sent to a server. A local snapshot is created before restore or reset.'}</div><button class="v421-vault-danger" onclick="MeowVault.reset()">${ko?'모든 학습 데이터 초기화':'Reset all learning data'}</button><div class="v421-vault-time">${ko?'최근 작업':'Last activity'} · ${timeLabel(last)}</div></section>`;
  }
  function decorate(){const scroll=document.querySelector('.screen>.scroll');if(scroll&&!scroll.querySelector('.v421-vault'))scroll.insertAdjacentHTML('beforeend',card())}
  window.MeowVault={
    export:function(){const pack=payload(),text=JSON.stringify(pack,null,2),blob=new Blob([text],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a'),day=new Date().toISOString().slice(0,10);a.href=url;a.download='meowde-backup-'+day+'.json';document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);V.lastExport=pack.exportedAt;persist();toast(S.lang==='ko'?'백업 파일을 저장했습니다.':'Backup file saved.');if(S.screen==='profile')renderProfile()},
    import:function(){const input=document.createElement('input');input.type='file';input.accept='application/json,.json';input.onchange=async()=>{const file=input.files&&input.files[0];if(!file)return;try{const pack=JSON.parse(await file.text());if(pack.app!=='Meowde'||!pack.data)throw new Error('invalid backup');if(!confirm(S.lang==='ko'?'현재 데이터를 보관한 뒤 이 백업으로 교체할까요?':'Save a snapshot and replace current data with this backup?'))return;snapshot();applyData(pack.data);const meta=read(META_KEY);meta.lastImport=new Date().toISOString();localStorage.setItem(META_KEY,JSON.stringify(meta));location.reload()}catch(error){console.error(error);alert(S.lang==='ko'?'올바른 Meowde 백업 파일이 아닙니다.':'This is not a valid Meowde backup file.')}};input.click()},
    reset:function(){if(!confirm(S.lang==='ko'?'모든 진도·보상·업적을 초기화할까요? 직전 상태는 한 번 되돌릴 수 있습니다.':'Reset all progress, rewards, and achievements? You can undo this once.'))return;snapshot();clearCurrent();location.reload()},
    undo:function(){const raw=localStorage.getItem(SNAPSHOT_KEY);if(!raw)return;try{const pack=JSON.parse(raw);if(!pack.data)throw new Error('invalid snapshot');const current=collect();applyData(pack.data);localStorage.setItem(SNAPSHOT_KEY,JSON.stringify({createdAt:new Date().toISOString(),data:current}));location.reload()}catch(error){console.error(error);alert(S.lang==='ko'?'되돌릴 상태를 읽지 못했습니다.':'The previous state could not be restored.')}}
  };
  const baseRenderProfile=renderProfile;
  renderProfile=function(){baseRenderProfile();decorate()};
  document.title='Meowde v4.21 — Data Vault';
  window.__MEOWDE_VERSION__='4.21';
  if(S.screen==='profile')renderProfile();
})();
// Stamp public build identity only; never copy environment values other than commit SHA.
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
const sha=process.env.VERCEL_GIT_COMMIT_SHA||process.env.GITHUB_SHA||'LOCAL';
if(sha!=='LOCAL'&&!/^[a-f0-9]{40}$/.test(sha))throw Error('Invalid commit SHA');
if(process.env.VERCEL==='1'&&sha==='LOCAL')throw Error('Deployment commit SHA unavailable');
const file=path.join(root,'assets/tester-report.js');
const source=fs.readFileSync(file,'utf8');
const pattern=/\/\* MEOWDE_BUILD_START \*\/[\s\S]*?\/\* MEOWDE_BUILD_END \*\//g;
if((source.match(pattern)||[]).length!==1)throw Error('Expected one build identity marker');
const identity=JSON.stringify({appVersion:pkg.version,buildSHA:sha});
fs.writeFileSync(file,source.replace(pattern,'/* MEOWDE_BUILD_START */'+identity+'/* MEOWDE_BUILD_END */'));

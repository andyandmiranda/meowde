"use strict";

const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const read=name=>fs.readFileSync(path.join(root,name),"utf8");
const expect=(condition,message)=>{if(!condition)throw new Error(`v4.53 bootstrap validation failed: ${message}`)};

const pkg=JSON.parse(read("package.json"));
expect(pkg.version==="4.53.0","package version is not 4.53.0");
expect(pkg.scripts.validate.includes("validate-v453-bootstrap-alignment.js"),"main validation suite does not include v4.53 bootstrap validation");
expect(pkg.scripts["validate:version"]==="node tools/validate-v453-bootstrap-alignment.js","validate:version is not aligned");

const bootstrap=read("v412.html");
expect(bootstrap.includes("Meowde v4.53 — Loading"),"loading title is stale");
expect(bootstrap.includes('const VERSION="453"'),"bootstrap cache version is not 453");
expect(bootstrap.includes('const DISPLAY_VERSION="4.53"'),"bootstrap display version is not 4.53");
expect(bootstrap.includes('fetch(`/index.html?v=${VERSION}`'),"index request does not use the bootstrap version");
expect(bootstrap.includes('cache:"no-store"'),"index request does not bypass stale HTML caching");
expect(!bootstrap.includes("Meowde v4.43"),"stale v4.43 title remains");
expect(!bootstrap.includes("/index.html?v=443"),"stale index cache key remains");
for(const file of ["v422-pwa.js","v430-character.js","v434-release.js","v443-single-companion.js"]){
  expect(bootstrap.includes(file),`${file} is missing from bootstrap scripts`);
}

const release=read("v434-release.js");
new vm.Script(release,{filename:"v434-release.js"});
expect(release.includes("applyMeowdeV453ReleaseGuard"),"release guard wrapper is not v4.53");
expect(release.includes('const VERSION="4.53"'),"runtime release version is not 4.53");
expect(release.includes('version:"4514"'),"approved character asset key changed unexpectedly");

const sw=read("sw.js");
new vm.Script(sw,{filename:"sw.js"});
expect(sw.includes('meowde-v453-bootstrap-alignment-v1'),"service-worker cache is not v4.53");
expect(sw.includes('"/v412.html"'),"bootstrap is not precached");
expect(sw.includes('"/v434-release.js"'),"release guard is not precached");
expect(sw.includes('"/v451-individual-character-poses.js"'),"approved character mapper is not precached");

console.log("Validated Meowde v4.53 package, bootstrap, runtime title, cache keys, and service-worker alignment.");
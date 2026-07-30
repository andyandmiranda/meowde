"use strict";

const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const read=name=>fs.readFileSync(path.join(root,name),"utf8");
const expect=(condition,message)=>{if(!condition)throw new Error(`v4.52 version alignment failed: ${message}`)};

const pkg=JSON.parse(read("package.json"));
expect(pkg.version==="4.52.0","package version is not 4.52.0");
expect(pkg.scripts&&pkg.scripts.validate&&pkg.scripts.validate.includes("validate-v452-version-alignment.js"),"main validation suite does not include v4.52 alignment validation");
expect(pkg.scripts&&pkg.scripts["validate:version"]==="node tools/validate-v452-version-alignment.js","validate:version script is missing or incorrect");

const release=read("v434-release.js");
new vm.Script(release,{filename:"v434-release.js"});
expect(release.includes("applyMeowdeV452ReleaseGuard"),"release guard wrapper is not v4.52");
expect(release.includes('const VERSION="4.52"'),"release guard version is not 4.52");
expect(release.includes("document.title=`Meowde v${VERSION}`"),"runtime title does not derive from the release version");
expect(release.includes("document.documentElement.dataset.meowdeVersion=VERSION"),"document version dataset is not aligned");
expect(release.includes("window.__MEOWDE_VERSION__=VERSION"),"global runtime version is not aligned");
expect(release.includes('version:"4514"'),"final character asset cache key is not retained");

const mapper=read("v451-individual-character-poses.js");
new vm.Script(mapper,{filename:"v451-individual-character-poses.js"});
expect(mapper.includes('const VERSION="4.51"'),"character asset module version changed unexpectedly");
for(const asset of ["meowde-coding.webp","meowde-music.webp","meowde-reading.webp","meowde-happy.webp","meowde-challenge.webp","meowde-debug.webp"]){
  expect(mapper.includes(asset),`${asset} is missing from the final character mapper`);
}

const bootstrap=read("v412.html");
expect(bootstrap.includes("/v434-release.js"),"bootstrap does not load the release guard");
expect(bootstrap.includes('cache: "no-store"'),"bootstrap does not bypass stale HTML caching");

const sw=read("sw.js");
expect(sw.includes("/v434-release.js"),"service worker does not precache the release guard");
expect(sw.includes("/v451-individual-character-poses.js"),"service worker does not precache the character mapper");

console.log("Validated Meowde v4.52 runtime, package, bootstrap, and character asset version alignment.");

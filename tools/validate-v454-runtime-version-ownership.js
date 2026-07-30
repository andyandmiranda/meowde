"use strict";

const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const read=name=>fs.readFileSync(path.join(root,name),"utf8");
const expect=(condition,message)=>{if(!condition)throw new Error(`v4.54 runtime version ownership failed: ${message}`)};

const pkg=JSON.parse(read("package.json"));
expect(pkg.version==="4.54.0","package version is not 4.54.0");
expect(pkg.scripts&&pkg.scripts.validate&&pkg.scripts.validate.includes("validate-v454-runtime-version-ownership.js"),"main validation suite does not include v4.54 validation");
expect(pkg.scripts&&pkg.scripts["validate:version"]==="node tools/validate-v454-runtime-version-ownership.js","validate:version does not target v4.54 validation");

const bootstrap=read("v412.html");
expect(bootstrap.includes("Meowde v4.54 — Loading"),"bootstrap loading title is not v4.54");
expect(bootstrap.includes('const VERSION="454"'),"bootstrap cache version is not 454");
expect(bootstrap.includes('const DISPLAY_VERSION="4.54"'),"bootstrap display version is not 4.54");
expect(bootstrap.includes('cache:"no-store"'),"bootstrap no-store loading is missing");
expect(!bootstrap.includes("Meowde v4.53"),"stale v4.53 bootstrap title remains");

const release=read("v434-release.js");
new vm.Script(release,{filename:"v434-release.js"});
expect(release.includes("applyMeowdeV454ReleaseGuard"),"release wrapper is not v4.54");
expect(release.includes('const VERSION="4.54"'),"release version is not 4.54");
expect(release.includes("function publishVersion()"),"release guard has no explicit version publisher");
expect(release.includes("window.__MEOWDE_VERSION__=VERSION"),"release guard does not own the global release version");
expect(release.includes("document.documentElement.dataset.meowdeVersion=VERSION"),"document release version is not published");
expect(release.includes('version:"4515"'),"character mapper cache key is not refreshed");

const mapper=read("v451-individual-character-poses.js");
new vm.Script(mapper,{filename:"v451-individual-character-poses.js"});
expect(mapper.includes('const VERSION="4.51"'),"character module identity changed unexpectedly");
expect(mapper.includes("window.__MEOWDE_CHARACTER_ASSET_VERSION__=VERSION"),"character asset version is not namespaced");
expect(!mapper.includes("window.__MEOWDE_VERSION__"),"character mapper still overwrites the application release version");
expect(mapper.includes("dataset.individualCharacterPoses=VERSION"),"character dataset version is missing");

const sw=read("sw.js");
expect(sw.includes('meowde-v454-runtime-version-ownership-v1'),"service-worker cache is not v4.54");
expect(sw.includes("/v434-release.js"),"release guard is not precached");
expect(sw.includes("/v451-individual-character-poses.js"),"character mapper is not precached");

console.log("Validated Meowde v4.54 release-version ownership, character asset version isolation, bootstrap, and service-worker cache.");
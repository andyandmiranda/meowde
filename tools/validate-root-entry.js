"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs");
const config=JSON.parse(fs.readFileSync("vercel.json","utf8"));
assert.ok(config.rewrites?.some(x=>x.source==="/"&&x.destination==="/v412.html"));
assert.ok(!config.redirects?.some(x=>x.source==="/"));
assert.match(fs.readFileSync("v412.html","utf8"),/fetch\("\/index.html\?v=443"/);
console.log("PASS: clean root preserves the existing bootstrap and old entry URL");

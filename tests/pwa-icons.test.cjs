"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const test=require("node:test");
const base=path.join(__dirname,"..");
const manifest=JSON.parse(fs.readFileSync(path.join(base,"manifest.webmanifest"),"utf8"));
const sw=fs.readFileSync(path.join(base,"sw.js"),"utf8");
const retired=["meowde-180.png","meowde-192.png","meowde-512.png","meowde-maskable-192.png","meowde-maskable-512.png"];
test("retired cat icons remain absent",()=>{
 for(const name of retired){assert.equal(fs.existsSync(path.join(base,"icons",name)),false,name);assert.ok(!JSON.stringify(manifest).includes('"/icons/'+name+'"'));assert.ok(!sw.includes('"/icons/'+name+'"'));}
});
test("approved PNG install icons are valid raster files and cached",()=>{
 assert.equal(manifest.id,"/v412.html");assert.equal(manifest.start_url,"/v412.html");
 const expected=[["meowde-approved-192.png",192,"any"],["meowde-approved-512.png",512,"any"],["meowde-approved-maskable-192.png",192,"maskable"],["meowde-approved-maskable-512.png",512,"maskable"]];
 assert.deepEqual(manifest.icons.map(i=>[path.basename(i.src),Number(i.sizes.split("x")[0]),i.purpose]),expected);
 for(const [name,size,purpose] of expected.concat([["meowde-approved-touch-180.png",180,"touch"]])){
  const data=fs.readFileSync(path.join(base,"icons",name));
  assert.equal(data.subarray(0,8).toString("hex"),"89504e470d0a1a0a",name);
  assert.equal(data.readUInt32BE(16),size,name);assert.equal(data.readUInt32BE(20),size,name);
  assert.ok(data.length>1024,name);assert.ok(sw.includes('"/icons/'+name+'"'),name);
  if(purpose!=="touch"){const item=manifest.icons.find(x=>x.src==="/icons/"+name);assert.equal(item.type,"image/png");assert.equal(item.sizes,size+"x"+size);}
 }
 assert.match(sw,/const CACHE_NAME = "meowde-v\d+[^"]*";/);
 const html=fs.readFileSync(path.join(base,"index.html"),"utf8");
 assert.ok(html.includes('rel="apple-touch-icon" href="/icons/meowde-approved-touch-180.png"'));
});

"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const test=require("node:test");
const base=path.join(__dirname,"..");
const read=(file)=>fs.readFileSync(path.join(base,file),"utf8");
const manifest=JSON.parse(read("manifest.webmanifest"));
const sw=read("sw.js");
const regular="/icons/meowde-approved.svg",maskable="/icons/meowde-approved-maskable.svg";
const retired=["meowde-180.png","meowde-192.png","meowde-512.png","meowde-maskable-192.png","meowde-maskable-512.png"];
test("outdated illustrated cat PNGs have no active references",()=>{
  for(const name of retired){assert.equal(fs.existsSync(path.join(base,"icons",name)),false,name);assert.ok(!JSON.stringify(manifest).includes(name),name);assert.ok(!sw.includes(name),name)}
  for(const name of ["meowde-icon-192.svg","meowde-icon-512.svg"]){assert.equal(fs.existsSync(path.join(base,name)),false,name);assert.ok(!sw.includes(name),name)}
});
test("manifest has install icons with retained app identity and safe maskable variants",()=>{
  assert.equal(manifest.id,"/v412.html");assert.equal(manifest.start_url,"/v412.html");
  assert.deepEqual(manifest.icons.map(x=>[x.src,x.sizes,x.type,x.purpose]),[
    [regular,"192x192","image/svg+xml","any"],[regular,"512x512","image/svg+xml","any"],
    [maskable,"192x192","image/svg+xml","maskable"],[maskable,"512x512","image/svg+xml","maskable"]
  ]);
  for(const icon of [regular,maskable]){
    const data=read(icon.slice(1));
    assert.match(data,/viewBox="0 0 512 512"/);assert.match(data,/data:image\\/webp;base64,/);
    assert.ok(data.length>7000);
    assert.ok(sw.includes('"' + icon + '"'),icon);
  }
  assert.match(sw,/meowde-v478-approved-pwa-icons/);
});

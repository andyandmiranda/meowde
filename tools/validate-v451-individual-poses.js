"use strict";

const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const read=name=>fs.readFileSync(path.join(root,name),"utf8");
const expect=(condition,message)=>{if(!condition)throw new Error(`v4.51 pose validation failed: ${message}`)};

const poses=["happy","smug","focus","surprised","meh","coding-cutout","music","reading","error"];
for(const pose of poses){
  const file=`assets/meowde-${pose}.svg`;
  expect(fs.existsSync(path.join(root,file)),`${file} is missing`);
  const source=read(file);
  expect(source.startsWith("<svg"),`${file} is not SVG`);
  expect(source.includes("data:image/webp;base64,"),`${file} does not contain an embedded WebP`);
  expect(!source.includes("ELLIPSIZATION"),`${file} is truncated`);
}

const mapper=read("v451-individual-character-poses.js");
new vm.Script(mapper,{filename:"v451-individual-character-poses.js"});
for(const pose of ["happy","smug","focus","surprised","meh","coding","music","reading","error"]){
  expect(mapper.includes(`${pose}:`),`${pose} asset mapping is missing`);
}
expect(mapper.includes("HTMLImageElement"),"mapper does not target img elements");
expect(mapper.includes("data-v449-pose"),"pose data attribute mapping is missing");
expect(!mapper.includes("background-position"),"sprite positioning returned");

const release=read("v434-release.js");
expect(release.includes('const VERSION="4.51"'),"release version is not 4.51");
expect(release.includes("v451-individual-character-poses.js"),"v4.51 mapper is not loaded");

const sw=read("sw.js");
expect(sw.includes("meowde-v451-individual-poses-v1"),"service-worker cache was not bumped");
expect(sw.includes("/v451-individual-character-poses.js"),"mapper is missing from precache");
for(const pose of poses)expect(sw.includes(`/assets/meowde-${pose}.svg`),`${pose} is missing from precache`);

console.log(`Validated ${poses.length} individual transparent Meowde pose assets and v4.51 mappings.`);
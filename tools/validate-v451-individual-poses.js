"use strict";

const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const read=name=>fs.readFileSync(path.join(root,name),"utf8");
const expect=(condition,message)=>{if(!condition)throw new Error(`v4.51 pose validation failed: ${message}`)};

const assets={
  base:"assets/characters/v451/meowde-base.svg",
  happy:"assets/characters/v451/meowde-happy.svg",
  confident:"assets/characters/v451/meowde-confident.svg",
  coding:"assets/characters/v451/meowde-coding.svg",
  music:"assets/characters/v451/meowde-music.svg",
  reading:"assets/characters/v451/meowde-reading.svg",
  debug:"assets/characters/v451/meowde-debug.svg"
};

for(const [name,file] of Object.entries(assets)){
  const absolute=path.join(root,file);
  expect(fs.existsSync(absolute),`${file} is missing`);
  const source=read(file).trim();
  expect(source.startsWith("<svg"),`${file} is not SVG`);
  expect(source.endsWith("</svg>"),`${file} is not a complete SVG document`);
  expect(source.includes("viewBox="),`${file} has no viewBox`);
  expect(source.includes("role=\"img\""),`${file} has no image role`);
  expect(source.includes("aria-label="),`${file} has no accessible label`);
  expect(!source.includes("data:image/"),`${file} embeds a raster data URI`);
  expect(!source.includes("<image"),`${file} embeds an external or raster image`);
  expect(!source.includes("background"),`${file} contains a baked background`);
  expect(source.length>500,`${file} is unexpectedly small`);
  expect(name!=="coding"||source.includes("laptop"),"coding asset label does not describe a laptop scene");
}

const mapper=read("v451-individual-character-poses.js");
new vm.Script(mapper,{filename:"v451-individual-character-poses.js"});
for(const pose of ["base","happy","smug","focus","surprised","meh","coding","music","reading","error"]){
  expect(mapper.includes(`${pose}:`),`${pose} asset mapping is missing`);
}
for(const file of Object.values(assets))expect(mapper.includes(`/${file}`),`${file} is missing from mapper`);
expect(mapper.includes("HTMLImageElement"),"mapper does not target img elements");
expect(mapper.includes("data-v449-pose"),"pose data attribute mapping is missing");
expect(mapper.includes("node.onerror"),"image error fallback is missing");
expect(!mapper.includes("background-position"),"sprite positioning returned");
expect(!mapper.includes("meowde-coding-cutout.svg"),"broken coding cutout is still referenced");

const release=read("v434-release.js");
expect(release.includes('const VERSION="4.51"'),"release version is not 4.51");
expect(release.includes("v451-individual-character-poses.js"),"v4.51 mapper is not loaded");

const sw=read("sw.js");
expect(sw.includes("meowde-v451-vector-poses-v2"),"service-worker cache was not bumped");
expect(sw.includes("/v451-individual-character-poses.js"),"mapper is missing from precache");
for(const file of Object.values(assets))expect(sw.includes(`/${file}`),`${file} is missing from precache`);
expect(!sw.includes("/assets/meowde-coding-cutout.svg"),"broken coding cutout remains in precache");

console.log(`Validated ${Object.keys(assets).length} Safari-safe vector Meowde character assets and v4.51 mappings.`);

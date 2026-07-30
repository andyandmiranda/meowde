"use strict";

const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const read=name=>fs.readFileSync(path.join(root,name));
const readText=name=>fs.readFileSync(path.join(root,name),"utf8");
const expect=(condition,message)=>{if(!condition)throw new Error(`v4.51 pose validation failed: ${message}`)};

const assets={
  coding:"assets/characters/v451/meowde-coding.webp",
  music:"assets/characters/v451/meowde-music.webp",
  reading:"assets/characters/v451/meowde-reading.webp",
  happy:"assets/characters/v451/meowde-happy.webp",
  challenge:"assets/characters/v451/meowde-challenge.webp",
  debug:"assets/characters/v451/meowde-debug.webp"
};

for(const file of Object.values(assets)){
  const absolute=path.join(root,file);
  expect(fs.existsSync(absolute),`${file} is missing`);
  const data=read(file);
  expect(data.length>1000,`${file} is unexpectedly small`);
  expect(data.subarray(0,4).toString("ascii")==="RIFF",`${file} is not a RIFF WebP file`);
  expect(data.subarray(8,12).toString("ascii")==="WEBP",`${file} has no WEBP signature`);
}

const base="assets/characters/v451/meowde-base.svg";
expect(fs.existsSync(path.join(root,base)),`${base} is missing`);
const baseSource=readText(base).trim();
expect(baseSource.startsWith("<svg"),`${base} is not SVG`);
expect(baseSource.endsWith("</svg>"),`${base} is incomplete`);

const mapper=readText("v451-individual-character-poses.js");
new vm.Script(mapper,{filename:"v451-individual-character-poses.js"});
for(const pose of ["base","happy","smug","challenge","focus","surprised","meh","coding","music","reading","error"]){
  expect(mapper.includes(`${pose}:`),`${pose} asset mapping is missing`);
}
for(const file of Object.values(assets))expect(mapper.includes(`/${file}`),`${file} is missing from mapper`);
expect(mapper.includes(`/${base}`),`${base} is missing from mapper`);
expect(mapper.includes("HTMLImageElement"),"mapper does not target img elements");
expect(mapper.includes("data-v449-pose"),"pose data attribute mapping is missing");
expect(mapper.includes("node.onerror"),"image error fallback is missing");
expect(!mapper.includes("background-position"),"sprite positioning returned");
expect(!mapper.includes("meowde-coding-cutout.svg"),"broken coding cutout is still referenced");
expect(!mapper.includes("meowde-confident.svg"),"obsolete confident asset is still referenced");

const release=readText("v434-release.js");
expect(release.includes('const VERSION="4.51"'),"release version is not 4.51");
expect(release.includes("v451-individual-character-poses.js"),"v4.51 mapper is not loaded");

const sw=readText("sw.js");
expect(sw.includes("meowde-v451-webp-poses-v4"),"service-worker cache was not bumped");
expect(sw.includes("/v451-individual-character-poses.js"),"mapper is missing from precache");
for(const file of Object.values(assets))expect(sw.includes(`/${file}`),`${file} is missing from precache`);
expect(sw.includes(`/${base}`),`${base} is missing from precache`);
expect(!sw.includes("meowde-confident.svg"),"obsolete confident asset remains in precache");
expect(!sw.includes("/assets/meowde-coding-cutout.svg"),"broken coding cutout remains in precache");

console.log(`Validated ${Object.keys(assets).length} final WebP Meowde coach assets, fallback base, mappings, and cache.`);
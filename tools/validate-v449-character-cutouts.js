"use strict";

const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const read=name=>fs.readFileSync(path.join(root,name),"utf8");
const expect=(condition,message)=>{if(!condition)throw new Error(`v4.50 character validation failed: ${message}`)};

const files=["v449-character-cutouts.js","v449-character-cutouts.css","v434-release.js","sw.js"];
for(const file of files){
  expect(fs.existsSync(path.join(root,file)),`${file} is missing`);
  const source=read(file);
  expect(!source.includes("ELLIPSIZATION"),`${file} contains a truncated transfer marker`);
  if(file.endsWith(".js"))new vm.Script(source,{filename:file});
}

const renderer=read("v449-character-cutouts.js");
const poses=["base","happy","smug","focus","surprised","meh","coding","music","reading","error"];
for(const pose of poses)expect(renderer.includes(`\"${pose}\"`),`pose ${pose} is not registered`);
expect(renderer.includes("<img class=\"v449-character"),"character renderer does not use img elements");
expect(renderer.includes("/assets/meowde-approved-base.svg?v=450"),"base image asset is missing");
expect(renderer.includes("/assets/meowde-approved-glasses.svg?v=450"),"glasses image asset is missing");
expect(renderer.includes("/assets/meowde-approved-headphones.svg?v=450"),"headphones image asset is missing");
expect(!renderer.includes("__MEOWDE_V449_SPRITE__"),"legacy sprite dependency remains");
expect(renderer.includes("decorateHero"),"hero helper is missing");
expect(renderer.includes("decorateCoach"),"lesson decorator is missing");
expect(!renderer.includes("function decorateRoom"),"character layer must not replace the canonical Room renderer");
expect(renderer.includes('window.__MEOWDE_CANONICAL_HOME_RENDERER__'),"character layer does not defer to canonical Home");

const css=read("v449-character-cutouts.css");
expect(css.includes("object-fit:contain"),"character images are not constrained with object-fit");
expect(css.includes("background:none!important"),"legacy background sprite is not disabled");
expect(css.includes("background:transparent!important"),"hero background is not transparent");
expect(css.includes("border:0!important"),"hero border is not removed");
expect(css.includes("box-shadow:none!important"),"hero shadow is not removed");

const release=read("v434-release.js");
expect(release.includes('const VERSION="4.50"'),"release version is not 4.50");
expect(release.includes('version:"450"'),"v4.50 renderer cache bust is missing");
expect(!release.includes("character-sprite"),"legacy sprite loader remains active");

const serviceWorker=read("sw.js");
expect(serviceWorker.includes("meowde-v450-approved-v2"),"approved service-worker cache generation is missing");
for(const asset of [
  "/v449-character-cutouts.js",
  "/v449-character-cutouts.css",
  "/assets/meowde-approved-base.svg",
  "/assets/meowde-approved-glasses.svg",
  "/assets/meowde-approved-headphones.svg",
  "/assets/characters/v451/meowde-coding.webp",
  "/assets/characters/v451/meowde-music.webp",
  "/assets/characters/v451/meowde-reading.webp",
  "/assets/characters/v451/meowde-happy.webp",
  "/assets/characters/v451/meowde-challenge.webp",
  "/assets/characters/v451/meowde-debug.webp"
]){
  expect(serviceWorker.includes(asset),`${asset} is missing from offline precache`);
}

console.log(`Validated Meowde v4.50 direct image rendering for ${poses.length} character states with canonical Home/Room ownership.`);
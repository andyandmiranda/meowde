"use strict";

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const read = (name) => fs.readFileSync(path.join(root, name), "utf8");
const fail = (message) => {
  throw new Error(`v4.49 character validation failed: ${message}`);
};
const expect = (condition, message) => {
  if (!condition) fail(message);
};

const files = [
  "v449-character-sprite-1.js",
  "v449-character-sprite-2.js",
  "v449-character-sprite-3.js",
  "v449-character-sprite.js",
  "v449-character-cutouts.js",
  "v449-character-cutouts.css",
  "v434-release.js",
  "sw.js",
];

for (const file of files) {
  expect(fs.existsSync(path.join(root, file)), `${file} is missing`);
  const source = read(file);
  expect(!source.includes("ELLIPSIZATION"), `${file} contains a truncated transfer marker`);
  if (file.endsWith(".js")) new vm.Script(source, { filename: file });
}

const context = { console };
context.window = context;
vm.createContext(context);
for (const file of [
  "v449-character-sprite-1.js",
  "v449-character-sprite-2.js",
  "v449-character-sprite-3.js",
  "v449-character-sprite.js",
]) {
  vm.runInContext(read(file), context, { filename: file });
}

const sprite = context.__MEOWDE_V449_SPRITE__;
expect(typeof sprite === "string", "assembled sprite is not a string");
expect(sprite.startsWith("data:image/webp;base64,"), "assembled sprite is not a WebP data URL");
const encoded = sprite.slice("data:image/webp;base64,".length);
const bytes = Buffer.from(encoded, "base64");
expect(bytes.length > 8000, "assembled sprite is unexpectedly small");
expect(bytes.subarray(0, 4).toString("ascii") === "RIFF", "sprite is missing the RIFF header");
expect(bytes.subarray(8, 12).toString("ascii") === "WEBP", "sprite is missing the WEBP signature");
expect(!context.__MEOWDE_V449_SPRITE_PARTS__, "sprite parts were not released after assembly");

const cutouts = read("v449-character-cutouts.js");
const poses = ["base", "happy", "smug", "focus", "surprised", "meh", "coding", "music", "reading", "error"];
for (const pose of poses) {
  expect(cutouts.includes(`\"${pose}\"`), `pose ${pose} is not registered`);
}
expect(cutouts.includes("decorateHero"), "hero decorator is missing");
expect(cutouts.includes("decorateCoach"), "lesson-state decorator is missing");
expect(cutouts.includes("decorateRoom"), "pose gallery decorator is missing");

const css = read("v449-character-cutouts.css");
for (const pose of poses) {
  expect(css.includes(`.v449-pose-${pose}`), `CSS mapping for ${pose} is missing`);
}
expect(css.includes("background:transparent!important"), "hero background is not forced transparent");
expect(css.includes("border:0!important"), "hero frame border is not removed");
expect(css.includes("box-shadow:none!important"), "hero frame shadow is not removed");

const release = read("v434-release.js");
const loadChain = [
  'loadOrderedScript("meowde-v449-character-sprite-1"',
  '.then(()=>loadOrderedScript("meowde-v449-character-sprite-2"',
  '.then(()=>loadOrderedScript("meowde-v449-character-sprite-3"',
  '.then(()=>loadOrderedScript("meowde-v449-character-sprite"',
  'if(!window.__MEOWDE_V449_SPRITE__)throw new Error("Sprite assembly failed")',
  'startCutouts();',
];
let previousIndex = -1;
for (const marker of loadChain) {
  const index = release.indexOf(marker, previousIndex + 1);
  expect(index > previousIndex, `${marker} is not in the required load sequence`);
  previousIndex = index;
}
expect(release.includes('/v449-character-cutouts.js?v=449'), "cutout renderer is not loaded");
expect(release.includes('const VERSION="4.49"'), "release version is not 4.49");

const orderedAssets = [
  "v449-character-sprite-1.js",
  "v449-character-sprite-2.js",
  "v449-character-sprite-3.js",
  "v449-character-sprite.js",
  "v449-character-cutouts.js",
];
const serviceWorker = read("sw.js");
for (const asset of [...orderedAssets, "v449-character-cutouts.css"]) {
  expect(serviceWorker.includes(`/${asset}`), `${asset} is missing from offline precache`);
}
expect(serviceWorker.includes("meowde-v449-character-cutouts-v1"), "service-worker cache was not bumped");

console.log(`Validated Meowde v4.49 character sprite (${bytes.length} bytes), ${poses.length} poses, ordered loading, and offline cache.`);

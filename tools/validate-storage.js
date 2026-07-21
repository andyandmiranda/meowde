#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { ROOT } = require("./lib-meowde");

const files = fs.readdirSync(ROOT).filter((name) => name === "index.html" || /^v4\d+.*\.js$/.test(name)).sort();
const keys = new Map();
const patterns = [
  /localStorage\.(?:getItem|setItem|removeItem)\(\s*['"]([^'"]+)['"]/g,
  /(?:const|let|var|,)\s*(?:STORAGE|STORAGE_KEY|KEY|META_KEY|SNAPSHOT_KEY|DISMISS_KEY)\s*=\s*['"]([^'"]+)['"]/g,
];

for (const file of files) {
  const text = fs.readFileSync(path.join(ROOT, file), "utf8");
  for (const pattern of patterns) {
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      if (!keys.has(match[1])) keys.set(match[1], new Set());
      keys.get(match[1]).add(file);
    }
  }
}

const expected = [
  "meowde-v410-state",
  "meowde-v410-seen",
  "meowde-v415-retention",
  "meowde-v416-journey",
  "meowde-v417-review",
  "meowde-v418-mentor",
  "meowde-v419-achievements",
  "meowde-v420-profile",
  "meowde-v421-vault",
  "meowde-v421-restore-snapshot",
  "meowde-pwa-install-dismissed-at",
];

let failed = false;
for (const key of [...keys.keys()].sort()) {
  console.log(`${key}: ${[...keys.get(key)].sort().join(", ")}`);
}
for (const key of expected) {
  if (!keys.has(key)) {
    console.error(`FAIL expected storage key not found: ${key}`);
    failed = true;
  }
}
for (const key of keys.keys()) {
  if (key.startsWith("meowde-") && !expected.includes(key)) {
    console.warn(`WARN unregistered Meowde storage key: ${key}`);
  }
}
if (failed) process.exit(1);
console.log(`Storage validation passed: ${keys.size} literal keys discovered.`);

#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { ROOT, read } = require("./lib-meowde");

const expectedScripts = [
  "v412-hotfix.js", "v413-core.js", "v413-lesson.js", "v414-state.js",
  "v414-reward.js", "v414-screens.js", "v415-retention.js", "v416-journey.js",
  "v417-review.js", "v418-coach.js", "v419-achievements.js", "v420-profile.js",
  "v421-vault.js", "v422-pwa.js", "v423-character.js",
];
const expectedStyles = [
  "v413-ux.css", "v414-ux.css", "v415-ux.css", "v416-ux.css", "v417-ux.css",
  "v418-coach.css", "v419-achievements.css", "v420-profile.css", "v421-vault.css", "v422-pwa.css",
  "v423-brand.css",
];
const html = read("v412.html");
const scripts = [...html.matchAll(/src="\/(v4\d+[^"?]+\.js)/g)].map((m) => m[1]);
const styles = [...html.matchAll(/href="\/(v4\d+[^"?]+\.css)/g)].map((m) => m[1]);
let failed = false;

function compare(label, actual, expected) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    console.error(`FAIL ${label} order differs`);
    console.error(`actual:   ${actual.join(" -> ")}`);
    console.error(`expected: ${expected.join(" -> ")}`);
    failed = true;
  } else console.log(`PASS ${label}: ${actual.length} files in expected order`);
}

compare("script load", scripts, expectedScripts);
compare("stylesheet load", styles, expectedStyles);

const jsFiles = expectedScripts.filter((file) => fs.existsSync(path.join(ROOT, file)));
const targets = ["renderHome", "renderMap", "renderLesson", "renderReview", "renderRoom", "renderProfile", "finish", "tabs", "save"];
for (const target of targets) {
  const owners = [];
  for (const file of ["index.html", ...jsFiles]) {
    const text = read(file);
    const re = new RegExp(`(?:function\\s+${target}\\s*\\(|(?:window\\.)?${target}\\s*=)`, "g");
    if (re.test(text)) owners.push(file);
  }
  console.log(`${target}: ${owners.join(" -> ") || "not found"}`);
}

for (const file of [...expectedScripts, ...expectedStyles]) {
  if (!fs.existsSync(path.join(ROOT, file))) {
    console.error(`FAIL missing loaded asset: ${file}`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log("Structure audit passed.");

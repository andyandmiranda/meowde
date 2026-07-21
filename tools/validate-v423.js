#!/usr/bin/env node
"use strict";
const { spawnSync } = require("child_process");
const path = require("path");
const scripts = ["validate-lessons.js", "validate-storage.js", "audit-structure.js"];
for (const script of scripts) {
  console.log(`\n=== ${script} ===`);
  const result = spawnSync(process.execPath, [path.join(__dirname, script)], { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status || 1);
}
console.log("\nMeowde v4.23 Phase 1 validation passed.");

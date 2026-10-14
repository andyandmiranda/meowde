"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const config = JSON.parse(fs.readFileSync(path.join(root, "vercel.json"), "utf8"));
const bootstrap = fs.readFileSync(path.join(root, "v412.html"), "utf8");

assert.ok(Array.isArray(config.rewrites), "rewrites must be configured");
assert.ok(config.rewrites.some(rule => rule.source === "/" && rule.destination === "/v412.html"),
  "root must internally serve the existing bootstrap");
assert.ok(!Array.isArray(config.redirects) || !config.redirects.some(rule => rule.source === "/"),
  "root must not navigate visitors to a versioned HTML URL");
assert.ok(bootstrap.includes('fetch("/index.html?v=443"'),
  "existing bootstrap must still fetch the main application using an absolute path");
assert.ok(bootstrap.includes("meowde-v410-state"),
  "existing language and legacy state recovery path must remain available");
console.log("Root URL rewrite and legacy bootstrap configuration checks passed.");

#!/usr/bin/env node
"use strict";
const fs=require("node:fs"),assert=require("node:assert/strict"),vm=require("node:vm");
const page=fs.readFileSync("linux-start.html","utf8");
assert.match(page,/assets\/linux-mobile-simulator.js/);
assert.match(page,/assets\/linux-guided-lesson.js/);
for(const file of ["assets/linux-guided-lesson.js","assets/linux-library-view.js"]){new vm.Script(fs.readFileSync(file,"utf8"),{filename:file})}
for(const file of ["index.html","robotics.html","linux-home.html","linux-start.html","linux-crash-course.html"]){const html=fs.readFileSync(file,"utf8");assert.doesNotMatch(html,/NVIDIA|AI Campus|ZIP README|원본 README|원본 ZIP|EXACT_EXERCISES|check\.sh|linux-lab-v2\.js/i,file+": external course branding or source-derived exercise hook");}
const archive=fs.readFileSync("robotics.html","utf8");
assert.match(archive,/meowde-linux-robotics-v1/);
assert.doesNotMatch(archive,/localStorage\.(?:setItem|clear|removeItem)/);
assert.doesNotMatch(fs.readFileSync("assets/linux-lab-v2.js","utf8"),/const (?:prompts|titles|samples)/);
for(const file of ["linux-home.html","linux-start.html","linux-crash-course.html","robotics.html"]){assert.match(fs.readFileSync(file,"utf8"),/content-notice.html/)}
console.log("PASS: guided lesson syntax, legacy record preservation and external-course content exclusion");

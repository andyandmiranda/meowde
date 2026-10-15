#!/usr/bin/env node
"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const read=p=>fs.readFileSync(p,"utf8");
const publicFiles=["linux-home.html","linux-start.html","linux-crash-course.html","robotics.html","content-notice.html","assets/linux-guided-lesson.js","assets/linux-condition-practice.js","assets/linux-bash-practice.js"];
for(const path of publicFiles){
 const contents=read(path);
 assert.doesNotMatch(contents,/NVIDIA\s*AI\s*Campus|NVDIA|미성년자입니다|성인입니다/i,path+" contains unreviewed course-derived reference");
}
const home=read("linux-home.html"),lesson=read("linux-start.html"),legacy=read("robotics.html");
assert.match(home,/href="\/linux-start\.html"/);
assert.match(lesson,/href="\/linux-home\.html"/);
assert.match(legacy,/meowde-linux-robotics-v1/);
assert.doesNotMatch(legacy,/localStorage\.(?:clear|removeItem)\s*\(/);
assert.match(read("content-notice.html"),/공식 강의·인증 과정이 아닌 독립적인 학습 경험/);
assert.doesNotMatch(read("vercel.json"),/"source"\s*:\s*"\/"\s*,\s*"destination"\s*:\s*"\/v412\.html"/);
console.log("PASS: Linux public-route provenance safeguards (not a copyright clearance)");

#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "..", "robotics.html"), "utf8");
const match = html.match(/<script>\s*(const DATA=[\s\S]*?)<\/script><script src="\/assets\/linux-lab-v2\.js/);
assert.ok(match, "Robotics inline learning logic must be present");

const dom = {
  stat: { textContent: "" },
  bar: { style: { width: "" } },
  units: { innerHTML: "" },
  viewer: {
    children: [],
    _html: "",
    set innerHTML(value) { this._html = value; this.children = []; },
    get innerHTML() { return this._html; },
    appendChild(child) { this.children.push(child); },
    scrollIntoView() {}
  },
  resume: {}
};
const inputs = {};
const saved = new Map();
const document = {
  getElementById(id) {
    return dom[id] || inputs[id] || (id.startsWith("drill-") ? { scrollIntoView() {} } : null);
  },
  createElement() { return { id: "", className: "", innerHTML: "" }; }
};
const localStorage = {
  getItem(key) { return saved.get(key) ?? null; },
  setItem(key, value) { saved.set(key, value); }
};
const context = vm.createContext({ document, localStorage, console });
vm.runInContext(match[1], context, { filename: "robotics-inline.js", timeout: 3000 });

function run(code) { return vm.runInContext(code, context, { timeout: 3000 }); }
function setCommand(index, value) {
  inputs["cmd-input-" + index] = { value, focus() {} };
}
run("state.unit=4;state.task=1;render()");
const markup = dom.viewer.children.map(node => node.innerHTML).join("\n");
assert.match(markup, /id="cmd-input-0"/, "First command must have its own input");
assert.match(markup, /id="cmd-input-1"/, "Second command must have its own input");
assert.match(markup, /run\.sh/, "First prompt must be rendered");
assert.match(markup, /db_password\.txt/, "Second prompt must be rendered");

setCommand(0, "");
run("verifyDrill(0)");
assert.equal(run("drillFeedback['4-1'][0].ok"), false, "Blank command must never pass");

setCommand(0, "chmod 777 deploy/run.sh");
run("verifyDrill(0)");
assert.equal(run("drillFeedback['4-1'][0].ok"), false, "Incorrect permissions must fail");

setCommand(0, "chmod 755 deploy/run.sh");
run("verifyDrill(0)");
assert.equal(run("drillFeedback['4-1'][0].ok"), true, "First valid drill must pass");
assert.equal(run("drillFeedback['4-1'][1]"), undefined, "The other drill remains independent");

setCommand(1, "chmod 600 deploy/db_password.txt");
run("verifyDrill(1)");
assert.equal(run("drillFeedback['4-1'][1].ok"), true, "Second valid drill must pass");
assert.equal(run("drillFeedback['4-1'][0].ok"), true, "First drill feedback must persist");

run("state.unit=5;state.task=0;render()");
setCommand(0, "ps aux | grep backup_job.sh");
run("verifyDrill(0)");
assert.equal(run("drillFeedback['5-0'][0].ok"), true, "Single-command drills must still pass");
assert.equal(run("state.done['4-1']"), undefined, "Command practice must not mark coursework complete");
console.log("PASS: Linux drill renders, rejects blank/wrong, accepts exact multi-step/single inputs, and leaves progress intact");

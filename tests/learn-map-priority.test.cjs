'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const s=fs.readFileSync('v413-core.js','utf8');
test('learning map lists every Python unit and places review after lesson trail',()=>{
 const map=s.slice(s.indexOf('  renderMap=function(){'),s.indexOf('  window.__MEOWDE_CANONICAL_LEARN_RENDERER__'));
 for(const unit of ['01 Python 기초','02 입력과 조건','03 컬렉션·반복·함수','04 문자열·딕셔너리·데이터','05 예외·파일·모듈','06 클래스·객체'])assert.ok(map.includes(unit),unit);
 const tabs=map.indexOf('<div class="unit-tabs">');
 const trail=map.indexOf('data-learn-path="canonical"');
 const review=map.indexOf('data-map-secondary-action');
 assert.ok(tabs>=0&&tabs<trail&&trail<review,'unit tabs and trail must precede secondary review');
 assert.match(map,/단원 \$\{S\.unit\+1\} \/ \$\{unitCount\}/);
 assert.match(map,/레슨 \$\{start\+1\}/);
});

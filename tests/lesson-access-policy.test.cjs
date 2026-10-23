const { test } = require('node:test');
const assert = require('node:assert/strict');
const { select } = require('../assets/lesson-access-policy.js');
const lessons = [{exercises:[{type:'concept'}]}, {exercises:[{type:'predict'}]}, {exercises:[]}];
test('any available unit is selectable, regardless of next/done', () => {
  const state = Object.freeze({ next:0, done:[] });
  assert.equal(select(lessons, 2, state).lessonIndex, 2);
  assert.equal(select(lessons, 1, state).action, 'launch');
  assert.deepEqual(state, {next:0,done:[]});
});
test('unfinished progress explicitly requires a snapshot, never silent overwrite', () => {
  const resume={lessonIndex:0,idx:1,queue:[{},{}],write:'draft'};
  const state={next:0,done:[],xp:19,churu:8,inProgress:resume};
  const result=select(lessons,2,state);
  assert.equal(result.needsResumePreservation,true);
  assert.equal(result.action,'save-snapshot-before-launch');
  assert.equal(result.previousResume,resume);
  assert.deepEqual(state,{next:0,done:[],xp:19,churu:8,inProgress:resume});
});
test('out-of-range and nonlesson selections are rejected',()=>{
  for(const n of [-1,3,1.4,NaN,'2']) assert.equal(select(lessons,n,{}).ok,false);
  assert.equal(select([{title:'not implemented'}],0,{}).reason,'unavailable');
});

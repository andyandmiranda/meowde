const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const context={};vm.runInNewContext(fs.readFileSync('assets/linux-bash-practice.js','utf8'),context);
const grade=source=>context.MeowdeBashPractice.grade('pass',source);
const correct='if [ "$score" -ge 80 ]; then\n echo "PASS"\nelse\n echo "RETRY"\nfi';
test('valid quoted/unquoted variables and equivalent boundary conditions pass',()=>{
 for(const source of [correct,correct.replace('"$score"','$score'),correct.replace('-ge 80','-gt 79')])assert.equal(grade(source).ok,true,source);
});
test('missing bracket spaces, separators and unmatched quotes cannot pass',()=>{
 for(const source of [correct.replace('[ "','["'),correct.replace('80 ]','80]'),correct.replace(']; then','] then'),correct.replace('"$score"','"$score'),correct.replace('echo "PASS"',"echo 'PASS\"")])assert.equal(grade(source).ok,false,source);
});
test('wrong branch and boundary results are rejected',()=>{
 for(const source of [correct.replace('-ge 80','-gt 80'),correct.replace('-ge','-lt'),correct.replace('RETRY','PASS')])assert.equal(grade(source).ok,false,source);
});

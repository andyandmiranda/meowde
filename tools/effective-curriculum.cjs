'use strict';
// Data-only audit helper. Shipped browser bootstrap is verified separately.
const fs=require('node:fs'),vm=require('node:vm');
const sources=['assets/lessons-ko.js','assets/lessons-en.js','v452-curriculum.js','v453-curriculum-practice.js','v454-input-practice.js','v455-write-grading.js','v456-unit4-data.js','v458-unit5-data.js','v461-unit6-oop.js','v461-unit6-en.js'];
function load(){
 const context={document:{documentElement:{dataset:{}}},console,S:{lang:'ko',screen:'lesson',done:[],next:0},save(){},runPython:async()=>'',cur:()=>null};
 context.window=context;vm.createContext(context);
 for(const file of sources)vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file,timeout:2000});
 return {ko:JSON.parse(JSON.stringify(context.MEOWDE_LESSONS_KO)),en:JSON.parse(JSON.stringify(context.MEOWDE_LESSONS_EN))};
}
module.exports={load,sources};
if(require.main===module)console.log(JSON.stringify(load(),null,2));

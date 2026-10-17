const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';

test('a previous successful function cannot make a hardcoded answer pass',async({page})=>{
 test.setTimeout(120000);
 await page.goto(base+'/');
 await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
 const result=await page.evaluate(async()=>{
  const lesson=lessons().find(l=>l.slug==='function-house');
  const ex=lesson.exercises.find(e=>e.type==='write');
  S.queue=[{...ex}];S.idx=0;S.stdinValue='';
  const model=await runPython(ex.model);
  const hardcoded=await runPython('print('+JSON.stringify(ex.expected)+')');
  return {model,hardcoded,expected:ex.expected,grading:MeowWriteGrading.lastResult()};
 });
 expect(result.model).toBe(result.expected);
 expect(result.hardcoded).not.toBe(result.expected);
 expect(result.grading.passed).toBe(false);
});

test('effective KO and EN curriculum models and answer keys execute in Pyodide',async({page},testInfo)=>{
 test.setTimeout(240000);
 await page.goto(base+'/');
 await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
 const report=await page.evaluate(async()=>{
  const report={engine:'browser Pyodide',lessons:[],failures:[]};
  for(const lang of ['ko','en']){
   S.lang=lang;
   const seen=new Set();
   for(const [index,lesson] of lessons().entries()){
    const record={lang,index:index+1,slug:lesson.slug,title:lesson.title,exercises:[]};
    report.lessons.push(record);
    for(const ex of lesson.exercises){
     const result={id:ex.id,type:ex.type,checks:[]};record.exercises.push(result);
     const check=(name,ok,detail='')=>{result.checks.push({name,ok,detail});if(!ok)report.failures.push({lang,slug:lesson.slug,id:ex.id,name,detail});};
     check('unique ID',!!ex.id&&!seen.has(ex.id));seen.add(ex.id);
     if(ex.type==='concept'){check('explanation and example',!!ex.body&&!!ex.code);continue;}
     check('prompt, hint, explanation',!!ex.prompt&&!!ex.hint&&!!ex.explain);
     S.queue=[{...ex}];S.idx=0;S.stdinValue=ex.stdin?.default||'';
     if(ex.type==='write'){
      const model=await runPython(ex.model);
      check('model and all additional cases',model.trim()===String(ex.expected).trim(),model.trim()===String(ex.expected).trim()?'':model);
      const wrong=await runPython('print("__MEOWDE_WRONG_ANSWER__")');
      check('wrong output rejected',wrong.trim()!==String(ex.expected).trim());
      if(ex.grading?.tests?.length){
       const hardcoded=await runPython('print('+JSON.stringify(ex.expected)+')');
       check('fixed visible output rejected',hardcoded.trim()!==String(ex.expected).trim(),hardcoded.trim()===String(ex.expected).trim()?hardcoded:'');
      }
     }else if(ex.type==='predict'){
      const actual=await runPython(ex.code);
      const expected=ex.output===undefined?String(ex.choices[ex.answer]):String(ex.output);
      const errorType=/^(?:Syntax|Name|Indentation|Type|Value|Key|Index|ZeroDivision)Error$/.test(expected);
      check('prediction output matches execution',errorType?actual.includes(expected+':'):actual.trim()===expected.trim(),actual.trim()===expected.trim()?'':JSON.stringify({actual,expected}));
     }else if(ex.type==='fill'){
      const code=ex.code.replace(/_{2,}/g,ex.answer);
      const wrapped='def _fragment():\n'+code.split('\n').map(l=>'    '+l).join('\n');
      const compiled=await runPython('compile('+JSON.stringify(wrapped)+', "<fill>", "exec")');
      check('filled fragment compiles',!compiled.includes('Traceback (most recent call last)'),compiled);
      result.checks.push({name:'fragment semantic behavior',status:'NOT RUN',detail:'Requires explicit context and a separate rationale review; compilation is not educational correctness.'});
     }else if(ex.type==='bughunt'){
      const lines=ex.lines.slice();lines[ex.buggy]=ex.fixed;
      const wrapped='def _fragment():\n'+lines.map(l=>'    '+l).join('\n');
      const compiled=await runPython('compile('+JSON.stringify(wrapped)+', "<bughunt>", "exec")');
      check('corrected fragment compiles',!compiled.includes('Traceback (most recent call last)'),compiled);
      result.checks.push({name:'corrected fragment semantic behavior',status:'NOT RUN',detail:'Requires explicit context and a separate rationale review.'});
     }
    }
   }
  }
  return report;
 });
 const file=testInfo.outputPath('effective-curriculum.json');
 require('node:fs').writeFileSync(file,JSON.stringify(report,null,2));
 await testInfo.attach('effective curriculum execution audit',{path:file,contentType:'application/json'});
 expect(report.lessons).toHaveLength(120);
 expect(report.failures).toEqual([]);
});

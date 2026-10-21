const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';
async function ready(page){await page.goto(base+'/');await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');}
const cases=[
 {kind:'predict',exercise:{id:'qa-p',type:'predict',prompt:'What prints?',code:'print(2)',choices:['1','2'],answer:1,explain:'The print call outputs 2.',output:'2'},wrong:()=>0,answer:'2'},
 {kind:'fill',exercise:{id:'qa-f',type:'fill',prompt:'Fill the blank',code:'print(____)',tokens:['1','2'],answer:'2',explain:'Insert 2.'},wrong:()=>0,answer:'print(2)'},
 {kind:'bughunt',exercise:{id:'qa-b',type:'bughunt',prompt:'Find the bug',lines:['print(2)','print(1'],buggy:1,fixed:'print(1)',explain:'The second line is missing a parenthesis.'},wrong:()=>0,answer:'print(1)'},
 {kind:'write',exercise:{id:'qa-w',type:'write',prompt:'Write Python',starter:'print(0)',model:'print(2)',expected:'2',testcase:'Expect 2',explain:'Use print(2).'},wrong:()=>null,answer:'print(2)'}
];
for(const row of cases)test('wrong '+row.kind+' reveals correct example and reason without reward',async({page})=>{
 await ready(page);
 await page.evaluate(ex=>{const lesson=lessons()[0];S.lessonIndex=0;S.queue=[Object.assign({},ex)];S.idx=0;S.firstTotal=1;S.firstCorrect=0;S.xpEarned=0;S.combo=0;S.daily=false;S.sel=null;S.fill=null;S.checked=false;S.correct=false;S.hint=false;S.output='';S.write='';renderLesson();},row.exercise);
 const before=await page.evaluate(()=>({xp:S.xp,churu:S.churu,done:[...S.done]}));
 if(row.kind==='predict'||row.kind==='bughunt')await page.locator('.choice, .linebtn').first().click();
 if(row.kind==='fill')await page.locator('.token').first().click();
 if(row.kind==='write')await page.locator('#code-editor').fill('print(0)');
 await page.locator('.lesson-foot .btn').click();
 await expect(page.locator('.feedback.no')).toBeVisible();
 const disclosure=page.locator('[data-answer-review]');
 await expect(disclosure).toBeVisible();
 await disclosure.locator('summary').click();
 await expect(disclosure).toContainText(row.answer);
 await expect(disclosure).toContainText(row.exercise.explain);
 expect(await page.evaluate(()=>({xp:S.xp,churu:S.churu,done:[...S.done]}))).toEqual(before);
});

test('lesson close returns to learning map without clearing progress',async({page})=>{
 await ready(page);
 await page.evaluate(()=>{S.lessonIndex=0;S.queue=[{id:'qa-nav',type:'concept',title:'Preview concept',body:'Read me',code:'print(1)'}];S.idx=0;S.firstTotal=1;S.firstCorrect=0;S.xpEarned=0;S.daily=false;renderLesson();});
 const beforeClose=await page.evaluate(()=>({screen:S.screen,button:document.querySelector('.lesson-top .close')?.outerHTML||null,hasMap:!!document.querySelector('.map-head')})); console.log('QA_BEFORE_LESSON_CLOSE',JSON.stringify(beforeClose));
 await page.waitForTimeout(180);
 console.log('QA_BEFORE_LESSON_CLOSE_STABLE',JSON.stringify(await page.evaluate(()=>({screen:S.screen,button:document.querySelector('.lesson-top .close')?.outerHTML||null}))));
 await page.evaluate(()=>{window.__navCalls=[];for(const name of ['renderMap','renderHome']){const original=window[name];window[name]=function(...args){window.__navCalls.push(name);return original.apply(this,args)}}});
 await page.locator('.lesson-top .close').click();
 const navigation=await page.evaluate(()=>({screen:S.screen,idx:S.idx,queue:S.queue.length,pathname:location.pathname,navCalls:window.__navCalls,onclick:document.querySelector('.lesson-top .close')?.getAttribute('onclick')||null,mapVisible:!!document.querySelector('.map-head'),homeVisible:!!document.querySelector('.home-head')}));
 console.log('QA_LESSON_CLOSE_NAVIGATION',JSON.stringify(navigation));
 expect(navigation.screen).toBe('map');
 expect(navigation.idx).toBe(0);
 expect(navigation.queue).toBe(1);
});

test('measure review tab navigation without changing learner state',async({page})=>{
 await ready(page);
 const result=await page.evaluate(()=>{
  const before=JSON.stringify({done:S.done,xp:S.xp,churu:S.churu,queue:S.queue,idx:S.idx});
  const started=performance.now();
  renderReview();
  const elapsedMs=Math.round((performance.now()-started)*10)/10;
  const after=JSON.stringify({done:S.done,xp:S.xp,churu:S.churu,queue:S.queue,idx:S.idx});
  return {elapsedMs,screen:S.screen,unchanged:before===after,hasTabs:!!document.querySelector('.tabbar')};
 });
 console.log('QA_REVIEW_RENDER_TIMING',JSON.stringify(result));
 expect(result.unchanged).toBe(true);
 expect(result.hasTabs).toBe(true);
});

test('measure first review entry phases in real browser',async({page})=>{
 const navigationStart=Date.now();
 await page.goto(base+'/');
 const domReadyMs=Date.now()-navigationStart;
 await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
 const scriptsReadyMs=Date.now()-navigationStart;
 const result=await page.evaluate(()=>{
  const start=performance.now();
  const before=JSON.stringify({done:S.done,xp:S.xp,churu:S.churu,queue:S.queue,idx:S.idx});
  const dataMs=performance.now()-start;
  renderReview();
  const renderMs=performance.now()-start-dataMs;
  const after=JSON.stringify({done:S.done,xp:S.xp,churu:S.churu,queue:S.queue,idx:S.idx});
  return {dataMs,renderMs,unchanged:before===after,screen:S.screen};
 });
 await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
 const firstPaintMs=Date.now()-navigationStart;
 console.log('QA_REVIEW_FIRST_ENTRY_PHASES',JSON.stringify({domReadyMs,scriptsReadyMs,firstPaintMs,...result}));
 expect(result.unchanged).toBe(true);
 expect(result.screen).toBe('review');
});

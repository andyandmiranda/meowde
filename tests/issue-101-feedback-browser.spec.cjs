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
 await page.locator('.lesson-top .close').click();
 expect(await page.evaluate(()=>({screen:S.screen,idx:S.idx,queue:S.queue.length}))).toEqual({screen:'map',idx:0,queue:1});
});

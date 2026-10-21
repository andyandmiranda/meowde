const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';
async function ready(page){await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');}
async function select(page,index){
 await page.locator('.tabbar button').filter({hasText:/^(학습|Learn)$/}).click();
 await page.locator('.unit-tabs button').nth(Math.floor(index/10)).click();
 await page.locator(`button.node[data-lesson-index="${index}"]`).click();
 const guard=page.locator('.start-guard');if(await guard.count())await guard.locator('button').last().click();
}
for(const lang of ['ko','en'])test(`free choice and per-lesson resume survive reload (${lang})`,async({page})=>{
 await page.setViewportSize({width:375,height:812});
 await page.addInitScript(lang=>{if(!sessionStorage.getItem('free-choice-seed')){localStorage.setItem('meowde-v410-state',JSON.stringify({lang,done:[],next:0,xp:17,churu:8}));sessionStorage.setItem('free-choice-seed','1');}},lang);
 await page.goto(base+'/');await ready(page);
 await select(page,59);
 await expect(page.locator('.lesson-top')).toBeVisible();
 expect(await page.evaluate(()=>({index:S.lessonIndex,done:S.done,xp:S.xp,churu:S.churu}))).toEqual({index:59,done:[],xp:17,churu:8});
 await page.locator('.close').click();await select(page,0);
 await page.locator('.lesson-foot .btn').click();
 await expect(page.locator('.choices')).toBeVisible();
 const wrong=await page.evaluate(()=>(cur().answer+1)%cur().choices.length);
 await page.locator('.choice').nth(wrong).click();await page.locator('.lesson-foot .btn').click();
 await expect(page.locator('.feedback.no')).toBeVisible();
 const saved=await page.evaluate(()=>({idx:S.idx,queue:S.queue,sel:S.sel,checked:S.checked,correct:S.correct,firstCorrect:S.firstCorrect}));
 await page.locator('.close').click();await select(page,59);
 await page.reload();await ready(page);expect(await page.evaluate(()=>S.lessonIndex)).toBe(59);
 await page.locator('.close').click();await select(page,0);
 expect(await page.evaluate(()=>({idx:S.idx,queue:S.queue,sel:S.sel,checked:S.checked,correct:S.correct,firstCorrect:S.firstCorrect}))).toEqual(saved);
 expect(await page.evaluate(()=>({done:S.done,xp:S.xp,churu:S.churu}))).toEqual({done:[],xp:17,churu:8});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('failed snapshot write keeps the active lesson and stored bytes',async({page})=>{
 await page.goto(base+'/');await ready(page);await select(page,0);
 const before=await page.evaluate(()=>localStorage.getItem('meowde-v410-state'));
 await page.evaluate(()=>{Storage.prototype.setItem=function(){throw new DOMException('Test quota','QuotaExceededError')};startLesson(59,false,null,{force:true});});
 expect(await page.evaluate(()=>S.lessonIndex)).toBe(0);
 expect(await page.evaluate(()=>localStorage.getItem('meowde-v410-state'))).toBe(before);
 await expect(page.locator('.toast')).toContainText('저장');
});

const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';
test('hidden character and coach preferences survive reload without changing learning records',async({page})=>{
 await page.setViewportSize({width:375,height:740});
 await page.addInitScript(()=>{
   localStorage.setItem('meowde-character-pose','debug');
   localStorage.setItem('meowde-v443-coach-mode','focus');
   localStorage.setItem('meowde-layrn-guest-pose-v1','pose_reading_book');
 });
 await page.goto(base+'/');
 await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
 const before=await page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('meowde-v410-state'));return {done:s.done,xp:s.xp,mistakes:s.mistakes,next:s.next}});
 await page.getByRole('button',{name:'마이',exact:true}).last().click();
 await expect(page.getByRole('heading',{name:'마이',exact:true})).toBeVisible();
 await expect(page.getByRole('group',{name:'캐릭터 모습 선택',exact:true})).toHaveCount(0);
 await expect(page.getByText('LAYRN 게스트 고양이',{exact:true})).toHaveCount(0);
 expect(await page.evaluate(()=>({
   character:localStorage.getItem('meowde-character-pose'),
   coach:localStorage.getItem('meowde-v443-coach-mode'),
   guest:localStorage.getItem('meowde-layrn-guest-pose-v1')
 }))).toEqual({character:'debug',coach:'focus',guest:'pose_reading_book'});
 await page.reload();
 await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
 expect(await page.evaluate(()=>({
   character:localStorage.getItem('meowde-character-pose'),
   coach:localStorage.getItem('meowde-v443-coach-mode'),
   guest:localStorage.getItem('meowde-layrn-guest-pose-v1')
 }))).toEqual({character:'debug',coach:'focus',guest:'pose_reading_book'});
 expect(await page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('meowde-v410-state'));return {done:s.done,xp:s.xp,mistakes:s.mistakes,next:s.next}})).toEqual(before);
});

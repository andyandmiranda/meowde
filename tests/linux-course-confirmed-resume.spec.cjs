const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';
const KEY='meowde-linux-course-v1';

// This test is intentionally scoped to the new 12-unit Linux lesson,
// not the retired E1-E9 crash-course flow.
test('Linux confirmed answer survives reload, and failed save never advances',async({page})=>{
 await page.goto(base+'/linux-course.html?unit=1');
 await page.evaluate(key=>localStorage.removeItem(key),KEY);
 await page.reload();
 await page.getByRole('button',{name:'난이도별 문제 시작 →'}).click();

 // Determine the correct option from the shipped first unit's grading feedback
 // without assuming every question uses the same answer position.
 const choices=page.locator('#lesson-card [data-answer]');
 const count=await choices.count();
 expect(count).toBeGreaterThan(1);
 let correct=-1;
 for(let i=0;i<count;i++){
   await choices.nth(i).click();
   if(await page.locator('#feedback.good').count()){correct=i;break;}
   await page.getByRole('button',{name:'이 문제 다시 풀기'}).click();
 }
 expect(correct).toBeGreaterThanOrEqual(0);
 await expect(page.getByRole('button',{name:'다음 난이도 →'})).toBeVisible();
 await page.reload();
 await expect(page.locator('#feedback.good')).toContainText('정답');
 await expect(page.getByRole('button',{name:'다음 난이도 →'})).toBeVisible();

 // Deny only the course progress write, leaving all existing stored bytes unchanged.
 const before=await page.evaluate(key=>localStorage.getItem(key),KEY);
 await page.evaluate(key=>{
   window.__restoreLinuxSetItem=Storage.prototype.setItem;
   Storage.prototype.setItem=function(k,v){
     if(k===key)throw new DOMException('Quota exceeded','QuotaExceededError');
     return window.__restoreLinuxSetItem.call(this,k,v);
   };
 },KEY);
 await page.getByRole('button',{name:'다음 난이도 →'}).click();
 await expect(page.locator('#save-warning')).toContainText('저장하지 못했어요');
 expect(await page.evaluate(key=>localStorage.getItem(key),KEY)).toBe(before);
 await page.evaluate(()=>{Storage.prototype.setItem=window.__restoreLinuxSetItem;});
 await page.getByRole('button',{name:'다음 난이도 →'}).click();
 await expect(page.locator('#save-warning')).toBeEmpty();
 await expect(page.locator('.stage .on')).toContainText('Lv2');
 await page.reload();
 await expect(page.locator('.stage .on')).toContainText('Lv2');
});

const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';
const key='meowde-ml-foundations-v1';
test('release scope: 30 canonical Python entries available by direct lesson link',async({page})=>{
 await page.goto(base+'/');
 await page.waitForFunction(()=>typeof DATA!=='undefined'&&window.MeowRelease&&MeowRelease.isReady());
 await page.evaluate(async()=>{await MeowRelease.loadPromise});
 const slugs=await page.evaluate(()=>DATA.ko.map(x=>x.slug));
 expect(slugs).toHaveLength(30);
 for(const i of [0,14,29]){
  // Each deep-link smoke starts as an isolated learner; an active prior lesson would request confirmation.
  await page.evaluate(()=>localStorage.removeItem('meowde-v410-state'));
  await page.goto(base+'/?lesson='+encodeURIComponent(slugs[i]));
  await expect(page.locator('.lesson-top')).toBeVisible();
  expect(await page.evaluate(()=>S.lessonIndex)).toBe(i);
 }
});
test('release scope: Python lab exposes 20 independently navigable units',async({page})=>{
 await page.goto(base+'/python-lab.html#values/challenge');
 await expect(page.locator('#unit-nav a')).toHaveCount(20);
 await page.goto(base+'/python-lab.html#eda-project/challenge');
 await expect(page.locator('#learner-code')).toBeVisible();
 expect(await page.locator('#unit-nav a').count()).toBe(20);
});
test('release scope: Linux E1-E9 each opens the concept path without claiming shell execution',async({page})=>{
 for(let n=1;n<=9;n++){
  await page.goto(base+'/linux-crash-course.html?view=concept&lesson='+n);
  await expect(page.locator('#lesson h2')).toContainText('E'+n);
  expect(await page.evaluate(()=>index)).toBe(n-1);
 }
});
test('release scope: ML 4 lessons grade wrong then right and persist after reload',async({page})=>{
 await page.goto(base+'/ml-foundations.html');
 await expect(page.locator('#units button')).toHaveCount(4);
 for(let i=0;i<4;i++){
  await page.locator('#units button').nth(i).click();
  const correct=await page.evaluate(i=>window.MeowdeMLFoundations.units[i].answer,i);
  await page.locator('#lesson .choices button').nth((correct+1)%3).click();
  await expect(page.locator('#feedback')).toContainText('정답:');
  await page.locator('#lesson .choices button').nth(correct).click();
  await expect(page.locator('#units button').nth(i)).toContainText('✓');
 }
 expect(await page.evaluate(k=>JSON.parse(localStorage.getItem(k)).done.length,key)).toBe(4);
 await page.reload();
 await expect(page.locator('#units button')).toHaveCount(4);
 expect(await page.locator('#units button').allTextContents()).toEqual(expect.arrayContaining([expect.stringContaining('✓')]));
 expect((await page.locator('#units button').allTextContents()).filter(x=>x.includes('✓'))).toHaveLength(4);
});
test('release scope: ML storage quota denial cannot mark completed until successful retry',async({page})=>{
 await page.goto(base+'/ml-foundations.html');
 await page.evaluate(k=>{
  const original=Storage.prototype.setItem;
  window.__restoreML=()=>{Storage.prototype.setItem=original};
  Storage.prototype.setItem=function(name,value){if(name===k)throw new DOMException('quota','QuotaExceededError');return original.call(this,name,value)};
 },key);
 await page.locator('#lesson .choices button').nth(1).click();
 await expect(page.locator('#storage-status')).toContainText('저장 공간');
 await expect(page.locator('#units button').first()).not.toContainText('✓');
 expect(await page.evaluate(k=>localStorage.getItem(k),key)).toBeNull();
 await page.evaluate(()=>window.__restoreML());
 await page.locator('#lesson .choices button').nth(1).click();
 await expect(page.locator('#units button').first()).toContainText('✓');
 expect(await page.evaluate(k=>JSON.parse(localStorage.getItem(k)).done,key)).toEqual(['linear']);
});
test('release scope: ML corrupt saved JSON is not overwritten by a correct answer',async({page})=>{
 const broken='{invalid record';
 await page.addInitScript(({key,broken})=>localStorage.setItem(key,broken),{key,broken});
 await page.goto(base+'/ml-foundations.html');
 await expect(page.locator('#storage-status')).toContainText('원본을 덮어쓰지 않습니다');
 await page.locator('#lesson .choices button').nth(1).click();
 expect(await page.evaluate(k=>localStorage.getItem(k),key)).toBe(broken);
 await expect(page.locator('#units button').first()).not.toContainText('✓');
});

test('release scope: E9 Bash correct, edited, and incorrect work must be regraded',async({page})=>{
 await page.goto(base+'/linux-crash-course.html?view=concept&lesson=9');
 await expect(page.locator('#lesson h2')).toContainText('E9');
 await page.locator('#lesson .linux-next').click();
 await page.locator('#lesson .linux-next').click();
 const exercise=page.locator('#lesson textarea');
 await expect(exercise).toBeVisible();
 const correct='if [ "$battery" -lt 30 ]; then\necho "충전이 필요해요"\nelse\necho "계속 사용할 수 있어요"\nfi';
 await exercise.fill(correct);
 await page.locator('#lesson button').filter({hasText:'명령어 확인'}).click();
 await expect(page.locator('#lesson .linux-next')).toHaveCount(1);
 await exercise.fill(correct.replace('-lt','-eq'));
 await expect(page.locator('#lesson .linux-next')).toHaveCount(0);
 await page.locator('#lesson button').filter({hasText:'명령어 확인'}).click();
 await expect(page.locator('#lesson .linux-next')).toHaveCount(0);
 await exercise.fill(correct);
 await page.locator('#lesson button').filter({hasText:'명령어 확인'}).click();
 await expect(page.locator('#lesson .linux-next')).toHaveCount(1);
});

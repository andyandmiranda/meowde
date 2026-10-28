const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';

test('roadmap deep link opens lesson 30 and survives refresh without resetting progress',async({page})=>{
 await page.goto(base+'/');
 const slug=await page.evaluate(()=>DATA.ko[29].slug);
 expect(slug).toBeTruthy();
 await page.goto(base+'/?lesson='+encodeURIComponent(slug));
 await expect(page.locator('.lesson-top')).toBeVisible();
 expect(await page.evaluate(()=>S.lessonIndex)).toBe(29);
 expect(new URL(page.url()).searchParams.has('lesson')).toBe(false);
 await page.evaluate(()=>{S.idx=1;save()});
 await page.reload();
 await expect(page.locator('.lesson-top')).toBeVisible();
 expect(await page.evaluate(()=>({index:S.lessonIndex,step:S.idx}))).toEqual({index:29,step:1});
});

test('different deep link asks before replacing saved in-progress answers',async({page})=>{
 await page.goto(base+'/');
 await page.evaluate(()=>{startLesson(0);S.idx=1;save()});
 const target=await page.evaluate(()=>DATA.ko[20].slug);
 page.once('dialog',dialog=>dialog.dismiss());
 await page.goto(base+'/?lesson='+encodeURIComponent(target));
 await expect(page.locator('.lesson-top')).toBeVisible();
 expect(await page.evaluate(()=>({index:S.lessonIndex,step:S.idx}))).toEqual({index:0,step:1});
 const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem('meowde-v410-state')).inProgress);
 expect(stored.lessonIndex).toBe(0);
 expect(stored.idx).toBe(1);
});

test('unknown deep link never silently starts or overwrites an existing lesson',async({page})=>{
 await page.goto(base+'/');
 await page.evaluate(()=>{startLesson(0);S.idx=1;save()});
 await page.goto(base+'/?lesson=not-a-real-lesson');
 await expect(page.locator('.lesson-top')).toBeVisible();
 expect(await page.evaluate(()=>({index:S.lessonIndex,step:S.idx}))).toEqual({index:0,step:1});
});

test('roadmap links only to lessons present in canonical app data',async({page})=>{
 await page.goto(base+'/learning-path.html');
 await expect(page.locator('#path-list .journey-stop')).toHaveCount(60);
 await expect(page.locator('#path-list a[href^="/?lesson="]')).toHaveCount(30);
 await expect(page.locator('#path-list .path-pending-notice')).toHaveCount(30);
});

test('accepting a different lesson preserves completed history and opens selected lesson',async({page})=>{
 await page.goto(base+'/');
 await page.evaluate(()=>{S.done=[0];S.xp=40;S.churu=120;startLesson(0);S.idx=1;save()});
 const target=await page.evaluate(()=>DATA.ko[20].slug);
 page.once('dialog',dialog=>dialog.accept());
 await page.goto(base+'/?lesson='+encodeURIComponent(target));
 await expect(page.locator('.lesson-top')).toBeVisible();
 expect(await page.evaluate(()=>({index:S.lessonIndex,done:S.done,xp:S.xp,churu:S.churu}))).toEqual({index:20,done:[0],xp:40,churu:120});
 const persisted=await page.evaluate(()=>JSON.parse(localStorage.getItem('meowde-v410-state')));
 expect(persisted.done).toEqual([0]);
 expect(persisted.xp).toBe(40);
 expect(persisted.inProgress.lessonIndex).toBe(20);
});

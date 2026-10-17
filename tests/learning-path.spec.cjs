const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';
test('the course guide separates implementation from verification and preserves records',async({page})=>{
 await page.setViewportSize({width:320,height:844});
 await page.goto(base+'/linux-home.html');
 const records={'meowde-v410-state':'{"done":[0],"xp":17}','meowde-linux-guided-v1':'{"version":1,"step":0,"input":"","solutions":{},"hints":{}}'};
 await page.evaluate(records=>Object.entries(records).forEach(([k,v])=>localStorage.setItem(k,v)),records);
 await page.getByRole('link',{name:'전체 과정·준비 현황 →'}).click();
 await expect(page.locator('#path-list li')).toHaveCount(10);await expect(page.locator('#path-status')).toContainText('전체 Linux 실습 과정은 아직 준비 중');
 await page.getByRole('button',{name:'Python',exact:true}).click();await expect(page.locator('#path-list li')).toHaveCount(60);
 await expect(page.locator('#path-status')).toContainText('전체 학습 흐름은 검증을 더');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 expect(await page.evaluate(records=>Object.fromEntries(Object.keys(records).map(k=>[k,localStorage.getItem(k)])),records)).toEqual(records);
 await page.goto(base+'/');await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==='ordered');
 await expect(page.getByRole('link',{name:'전체 과정·준비 현황',exact:true})).toBeVisible();
});

test('Bash boundary failure explains the input, expected result and actual result',async({page})=>{
 await page.goto(base+'/linux-crash-course.html');await page.locator('#library-mode').selectOption('bash');await page.locator('#bash-task').selectOption('pass');
 await page.locator('#bash-source').fill('if [ "$score" -gt 80 ]; then\n echo "PASS"\nelse\n echo "RETRY"\nfi');
 await page.locator('#bash-grade').click();await expect(page.locator('#bash-feedback')).toContainText('score=80');await expect(page.locator('#bash-feedback')).toContainText('기대 출력은 “PASS”');
 await page.locator('#bash-source').fill('if ["$score" -ge 80 ]; then\n echo "PASS"\nelse\n echo "RETRY"\nfi');
 await page.locator('#bash-grade').click();await expect(page.locator('#bash-feedback')).toContainText('공백');
 await page.locator('#bash-source').fill('if [ "$score" -ge 80 ]; then\n echo "PASS"\nelse\n echo "RETRY"\nfi');
 await page.locator('#bash-grade').click();await expect(page.locator('#bash-feedback')).toContainText('정답!');
});

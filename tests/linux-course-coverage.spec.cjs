const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';

test('all nine Linux concept quizzes reject a distractor and retain completion after reload',async({page})=>{
 await page.goto(base+'/linux-crash-course.html');
 for(let i=0;i<9;i++){
  await page.locator('#nav button').nth(i).click();
  await page.getByRole('button',{name:'4. 도전'}).click();
  await page.locator('#lesson .answers button').nth(1).click();await expect(page.locator('#lesson [role="status"]')).toContainText('아직 아니');
  await page.locator('#lesson .answers button').first().click();await expect(page.locator('#lesson [role="status"]')).toContainText('정답이에요');
 }
 await page.reload();await expect(page.locator('#progress')).toContainText('9 / 9');
});

test('all five terminal missions grade the resulting state or command output',async({page})=>{
 await page.goto(base+'/linux-crash-course.html');await page.locator('#library-mode').selectOption('terminal');
 const commands=[['mkdir training','touch training/hello.txt'],['cp notes.txt projects/'],['mv notes.txt memo.txt'],['grep -n ERROR app.log'],['tail -n 2 app.log']];
 for(let i=0;i<commands.length;i++){
  await page.locator('#sim-missions button').nth(i).click();
  await page.locator('#sim-input').fill('pwd');await page.locator('#sim-run').click();await page.locator('#sim-check').click();await expect(page.locator('#sim-next')).toBeHidden();
  for(const command of commands[i]){await page.locator('#sim-input').fill(command);await page.locator('#sim-run').click();}
  await page.locator('#sim-check').click();await expect(page.locator('#sim-next')).toBeVisible();
 }
});

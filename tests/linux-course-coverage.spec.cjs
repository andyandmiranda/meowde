const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';
async function openChallenge(page){await page.getByRole('button',{name:'예제 보기 →'}).click();await page.getByRole('button',{name:'직접 연습하기 →'}).click();const input=page.getByRole('textbox',{name:'연습 명령어'});await input.fill(await input.getAttribute('placeholder'));await page.getByRole('button',{name:'명령어 확인'}).click();await page.getByRole('button',{name:'도전 문제 풀기 →'}).click();}

test('all nine Linux concept quizzes reject a distractor and retain completion after reload',async({page})=>{
 await page.goto(base+'/linux-crash-course.html');
 for(let i=0;i<9;i++){
  await openChallenge(page);
  await page.locator('#lesson .answers button').nth(1).click();await expect(page.locator('#lesson [role="status"]')).toContainText('아직 아니');
  await page.locator('#lesson .answers button').first().click();await expect(page.locator('#lesson [role="status"]')).toContainText('정답이에요');
  if(i<8)await page.getByRole('button',{name:'다음 단원 →'}).click();
 }
 await page.reload();await expect(page.locator('#progress')).toContainText('9 / 9');
});

test('all five terminal missions grade the resulting state or command output',async({page})=>{
 await page.goto(base+'/linux-crash-course.html?view=terminal');
 const commands=[['mkdir training','touch training/hello.txt'],['cp notes.txt projects/'],['mv notes.txt memo.txt'],['grep -n ERROR app.log'],['tail -n 2 app.log']];
 for(let i=0;i<commands.length;i++){
  await page.locator('#sim-missions button').nth(i).click();
  await page.locator('#sim-input').fill('pwd');await page.locator('#sim-run').click();await page.locator('#sim-check').click();await expect(page.locator('#sim-next')).toBeHidden();
  for(const command of commands[i]){await page.locator('#sim-input').fill(command);await page.locator('#sim-run').click();}
  await page.locator('#sim-check').click();await expect(page.locator('#sim-next')).toBeVisible();
 }
});

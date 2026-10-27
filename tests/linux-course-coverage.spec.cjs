const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';
async function openChallenge(page){await page.getByRole('button',{name:'예제 보기 →'}).click();await page.getByRole('button',{name:'직접 연습하기 →'}).click();const input=page.getByRole('textbox',{name:/^(연습 명령어|Bash 조건문 연습 코드)$/});const label=await input.getAttribute('aria-label');const sample=label==='Bash 조건문 연습 코드'?['if [ "$battery" -lt 30 ]; then','echo "충전이 필요해요"','else','echo "계속 사용할 수 있어요"','fi'].join('\n'):await input.getAttribute('placeholder');await input.fill(sample);await page.getByRole('button',{name:'명령어 확인'}).click();await page.getByRole('button',{name:'도전 문제 풀기 →'}).click();}

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


test('Linux E1-E9 drafts survive tab navigation and reload without touching Python state',async({page})=>{
 await page.goto(base+'/linux-crash-course.html?view=concept');
 const pythonRecord='{"untouched":"python-learner"}';
 await page.evaluate(raw=>localStorage.setItem('meowde-v410-state',raw),pythonRecord);
 const drafts=[['E1','pwd # unfinished'],['E5','chmod 600 secret.txt # unfinished'],['E9','if [ "$battery" -lt 30 ]; then\n  echo "draft"']];
 for(const [lesson,draft] of drafts){
  const i=Number(lesson.slice(1))-1;
  await page.locator('#nav button').nth(i).click();
  await page.getByRole('button',{name:'예제 보기 →'}).click();
  await page.getByRole('button',{name:'직접 연습하기 →'}).click();
  const editor=page.getByRole('textbox',{name:/^(연습 명령어|Bash 조건문 연습 코드)$/});
  await editor.fill(draft);
  await page.getByRole('navigation',{name:'메인 메뉴'}).getByRole('link',{name:'함께'}).click();
  await expect(page).toHaveURL(/together\.html\?subject=linux/);
  await page.getByRole('navigation',{name:'메인 메뉴'}).getByRole('link',{name:'심화'}).click();
  await expect(page).toHaveURL(/linux-crash-course\.html/);
  await page.locator('#nav button').nth(i).click();
  await expect(page.getByRole('textbox',{name:/^(연습 명령어|Bash 조건문 연습 코드)$/})).toHaveValue(draft);
  await page.reload();
  await expect(page.getByRole('textbox',{name:/^(연습 명령어|Bash 조건문 연습 코드)$/})).toHaveValue(draft);
 }
 expect(await page.evaluate(()=>localStorage.getItem('meowde-v410-state'))).toBe(pythonRecord);
});
test('Linux home header and five tabs do not navigate to Python without subject choice',async({page})=>{
 await page.goto(base+'/linux-home.html?tab=home');
 await expect(page.getByRole('link',{name:/Linux 학습 지도/})).toHaveAttribute('href','/learning-path.html?subject=linux');
 const nav=page.getByRole('navigation',{name:'메인 메뉴'});
 await expect(nav.getByRole('link')).toHaveCount(5);
 for(const [label,route] of [['홈','/linux-home.html?tab=home'],['학습','/linux-home.html?tab=learn'],['마이','/linux-home.html?tab=my'],['함께','/together.html?subject=linux']]){
  await expect(nav.getByRole('link',{name:label})).toHaveAttribute('href',route);
 }
});

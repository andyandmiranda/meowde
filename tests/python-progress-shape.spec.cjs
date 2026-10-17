const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';

test('non-object Python progress remains untouched with a recovery warning',async({page})=>{
 for(const raw of ['null','[]']){
  await page.goto(base+'/linux-home.html');
  await page.evaluate(value=>{
   localStorage.setItem('meowde-v410-state',value);
   localStorage.setItem('meowde-v425-state-backup','existing backup');
  },raw);
  await page.goto(base+'/');
  await expect(page.locator('#status')).toContainText('원본 기록은 그대로 보존');
  expect(await page.evaluate(()=>[
   localStorage.getItem('meowde-v410-state'),
   localStorage.getItem('meowde-v425-state-backup')
  ])).toEqual([raw,'existing backup']);
 }
});

const {test,expect}=require('playwright/test');
const base=process.env.MEOWDE_BASE_URL||'http://127.0.0.1:4173';

test('Python, Linux and course guide share text typography while code remains monospaced',async({page})=>{
  for(const path of ['/','/python-lab.html','/linux-home.html','/learning-path.html']){
    await page.goto(base+path);
    const result=await page.evaluate(()=>({
      font:getComputedStyle(document.body).fontFamily,
      width:document.documentElement.scrollWidth,
      viewport:innerWidth
    }));
    expect(result.font,path+' must use Pretendard').toMatch(/Pretendard/);
    expect(result.width,path+' must not overflow horizontally').toBeLessThanOrEqual(result.viewport);
  }
  await page.goto(base+'/python-lab.html');
  const codeFont=await page.evaluate(()=>{
    const node=document.createElement('pre');node.textContent='print(1)';document.body.append(node);
    const font=getComputedStyle(node).fontFamily;node.remove();return font;
  });
  expect(codeFont).toMatch(/Consolas|monospace/);
});

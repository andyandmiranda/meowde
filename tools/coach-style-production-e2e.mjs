import { chromium } from 'playwright';

const BASE='https://meowde.vercel.app';
const expected=[
  {id:'focus',label:'집중 모드',hint:'힌트 보기'},
  {id:'dance',label:'댄싱 모드',hint:'힌트 살짝 보기'},
  {id:'study',label:'공부 모드',hint:'개념 힌트 보기'},
  {id:'cheer',label:'응원 모드',hint:'도움 받기'},
  {id:'challenge',label:'도전 모드',hint:'그래도 힌트 보기'},
  {id:'debug',label:'디버그 모드',hint:'디버그 힌트 보기'}
];

const failures=[];
const pass=(ok,message)=>{console.log(`${ok?'PASS':'FAIL'}: ${message}`);if(!ok)failures.push(message)};
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,locale:'ko-KR'});
const page=await context.newPage();
const errors=[];
const badResponses=[];
page.on('pageerror',error=>errors.push(String(error)));
page.on('response',response=>{if(response.status()>=400)badResponses.push(`${response.status()} ${response.url()}`)});

try{
  const response=await page.goto(BASE,{waitUntil:'domcontentloaded',timeout:30000});
  pass(Boolean(response&&response.ok()),'Production returns HTTP 2xx');
  await page.evaluate(()=>localStorage.clear());
  await page.reload({waitUntil:'domcontentloaded'});
  await page.waitForSelector('.phase1-home .tabbar',{timeout:30000});

  for(const item of expected){
    if(!(await page.locator('.phase1-home').count())){
      const close=page.locator('.lesson-top .close');
      if(await close.count())await close.click();
      await page.waitForSelector('.phase1-home');
    }

    await page.locator('.tabbar button[aria-label="Meowde"]').click();
    await page.waitForSelector('.v443-mode-grid');
    const card=page.locator('.v443-mode-card',{hasText:item.label});
    pass(await card.count()===1,`${item.label} selector resolves exactly once`);
    await card.click();
    await page.waitForFunction(id=>localStorage.getItem('meowde-v443-coach-mode')===id,item.id);

    await page.locator('.tabbar button[aria-label="홈"]').click();
    await page.waitForSelector('.phase1-home');
    await page.locator('.phase1-hero .btn').click();
    await page.waitForSelector('.lesson-main');

    for(let guard=0;guard<6;guard++){
      if(await page.locator('.coach button.hint').count())break;
      const next=page.locator('.lesson-foot .btn');
      if(!(await next.count()))break;
      await next.click();
      await page.waitForTimeout(120);
    }

    await page.waitForSelector('.coach button.hint',{timeout:10000});
    await page.waitForFunction(id=>document.documentElement.dataset.lessonCoachStyle===id,item.id);
    const snapshot=await page.evaluate(()=>({
      style:document.documentElement.dataset.lessonCoachStyle||'',
      coachStyle:document.querySelector('.coach')?.getAttribute('data-coach-style')||'',
      hint:document.querySelector('.coach button.hint')?.textContent?.trim()||'',
      helper:document.querySelector('.v433-meta .v433-chip')?.textContent?.trim()||'',
      stored:localStorage.getItem('meowde-v443-coach-mode')||'',
      width:document.documentElement.scrollWidth,
      viewport:window.innerWidth
    }));
    console.log(`${item.id}: ${JSON.stringify(snapshot)}`);
    pass(snapshot.style===item.id,`${item.label} controls the Lesson style dataset`);
    pass(snapshot.coachStyle===item.id,`${item.label} is attached to the coach bubble`);
    pass(snapshot.hint===item.hint,`${item.label} uses its expected hint wording`);
    pass(snapshot.stored===item.id,`${item.label} remains persisted while learning`);
    pass(snapshot.width<=snapshot.viewport,`${item.label} Lesson has no horizontal overflow`);

    await page.locator('.lesson-top .close').click();
    await page.waitForSelector('.phase1-home');
  }

  pass(errors.length===0,'No console/page errors');
  pass(badResponses.length===0,'No HTTP 4xx/5xx responses');
  console.log(`errors: ${JSON.stringify(errors)}`);
  console.log(`badResponses: ${JSON.stringify(badResponses)}`);
} catch(error){
  failures.push(`Uncaught E2E error: ${error.message}`);
  console.error(error);
} finally {
  await page.screenshot({path:'coach-style-production-e2e.png',fullPage:true}).catch(()=>{});
  await browser.close();
}

if(failures.length){
  console.error(`\nCoach Style Production E2E FAILED (${failures.length})`);
  failures.forEach((failure,index)=>console.error(`${index+1}. ${failure}`));
  process.exit(1);
}
console.log('\nCoach Style Production E2E PASSED');

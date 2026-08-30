import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE='https://meowde.vercel.app';
const OUT='coach-mode-e2e-artifacts';
const STORAGE_KEY='meowde-v443-coach-mode';
fs.mkdirSync(OUT,{recursive:true});

const failures=[];
const results=[];
const record=(name,value)=>{results.push({name,value});console.log(`${name}:`,typeof value==='string'?value:JSON.stringify(value))};
const expect=(condition,message)=>{if(!condition){failures.push(message);console.error(`FAIL: ${message}`)}else console.log(`PASS: ${message}`)};

const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:390,height:844},screen:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true,locale:'ko-KR'});
const page=await context.newPage();
const errors=[];
const badResponses=[];
page.on('pageerror',error=>errors.push(`pageerror: ${error.message}`));
page.on('console',msg=>{if(msg.type()==='error')errors.push(`console-error: ${msg.text()}`)});
page.on('response',response=>{if(response.status()>=400)badResponses.push(`${response.status()} ${response.url()}`)});

try{
  const response=await page.goto(BASE,{waitUntil:'domcontentloaded',timeout:45000});
  expect(Boolean(response&&response.ok()),'Production returns HTTP 2xx');
  await page.waitForFunction(()=>typeof S!=='undefined'&&document.querySelector('.screen'),null,{timeout:15000});
  await page.evaluate(async()=>{if(window.MeowRelease&&MeowRelease.loadPromise)await MeowRelease.loadPromise});
  await page.waitForTimeout(300);

  await page.locator('.tabbar button[aria-label="Meowde"]').click();
  await page.waitForFunction(()=>typeof S!=='undefined'&&S.screen==='room');
  await page.waitForTimeout(300);

  const viewport=await page.evaluate(()=>({width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,mode:document.documentElement.dataset.coachMode||''}));
  record('room.viewport',viewport);
  expect(viewport.width===390&&viewport.height===844,'Viewport is exactly 390×844');
  expect(viewport.scrollWidth<=390&&viewport.bodyWidth<=390,'Coach mode screen has no horizontal overflow');

  const cards=page.locator('.v443-mode-card');
  const count=await cards.count();
  record('room.modeCount',count);
  expect(count===6,'Exactly six coach modes are visible');

  const modeData=await cards.evaluateAll(nodes=>nodes.map(node=>({label:(node.querySelector('b')?.textContent||'').trim(),pressed:node.getAttribute('aria-pressed'),mode:node.querySelector('img')?.dataset.coachMode||'',asset:node.querySelector('img')?.dataset.coachAsset||'',src:node.querySelector('img')?.getAttribute('src')||''})));
  record('room.modes',modeData);
  const expected=[
    ['집중 모드','focus','coding'],
    ['댄싱 모드','dance','music'],
    ['공부 모드','study','reading'],
    ['응원 모드','cheer','happy'],
    ['도전 모드','challenge','challenge'],
    ['디버그 모드','debug','debug']
  ];
  for(const [label,id,asset] of expected){
    const item=modeData.find(entry=>entry.label===label);
    expect(Boolean(item),`${label} is rendered`);
    if(item){
      expect(item.mode===id,`${label} exposes coach mode id ${id}`);
      expect(item.asset===asset,`${label} maps to approved ${asset} asset`);
      expect(item.src.includes(`/assets/characters/v451/meowde-${asset}.webp`),`${label} uses the approved WebP image`);
    }
  }
  expect(modeData.filter(item=>item.pressed==='true').length===1,'Exactly one coach mode is selected');
  await page.screenshot({path:`${OUT}/01-six-modes-390x844.png`,fullPage:true});

  const dance=page.getByRole('button',{name:/댄싱 모드/});
  await dance.click();
  await page.waitForFunction(()=>localStorage.getItem('meowde-v443-coach-mode')==='dance');
  await page.waitForTimeout(150);
  const selectedAfterClick=await page.locator('.v443-mode-card[aria-pressed="true"] b').textContent();
  const selectedHero=await page.locator('.v443-selected-mode img').evaluate(node=>({mode:node.dataset.coachMode,src:node.getAttribute('src')}));
  record('selection.afterClick',{selectedAfterClick,selectedHero,stored:await page.evaluate(key=>localStorage.getItem(key),STORAGE_KEY)});
  expect((selectedAfterClick||'').trim()==='댄싱 모드','Dancing mode becomes the selected card');
  expect(selectedHero.mode==='dance'&&selectedHero.src.includes('meowde-music.webp'),'Current coach card changes to Dancing mode');
  await page.screenshot({path:`${OUT}/02-dancing-selected-390x844.png`,fullPage:true});

  await page.reload({waitUntil:'domcontentloaded',timeout:45000});
  await page.waitForFunction(()=>typeof S!=='undefined'&&document.querySelector('.screen'));
  await page.evaluate(async()=>{if(window.MeowRelease&&MeowRelease.loadPromise)await MeowRelease.loadPromise});
  await page.waitForTimeout(250);
  expect(await page.evaluate(key=>localStorage.getItem(key),STORAGE_KEY)==='dance','Dancing mode persists after reload');
  await page.locator('.tabbar button[aria-label="Meowde"]').click();
  await page.waitForFunction(()=>typeof S!=='undefined'&&S.screen==='room');
  const selectedAfterReload=(await page.locator('.v443-mode-card[aria-pressed="true"] b').textContent()||'').trim();
  record('selection.afterReload',selectedAfterReload);
  expect(selectedAfterReload==='댄싱 모드','Dancing mode remains selected after reload');

  await page.locator('.tabbar button[aria-label="홈"]').click();
  await page.waitForFunction(()=>typeof S!=='undefined'&&S.screen==='home');
  const homeCta=page.locator('.phase1-hero > .btn').first();
  await homeCta.click();
  await page.waitForFunction(()=>typeof S!=='undefined'&&S.screen==='lesson');
  await page.waitForTimeout(300);

  const coach=page.locator('.coach').first();
  await coach.waitFor({state:'visible'});
  const lessonCoach=await coach.locator('img').first().evaluate(node=>({mode:node.dataset.coachMode||'',src:node.getAttribute('src')||'',pose:node.dataset.v449Pose||''}));
  record('lesson.preAnswerCoach',lessonCoach);
  expect(lessonCoach.mode==='dance','Selected Dancing mode is applied to the pre-answer lesson coach');
  expect(lessonCoach.src.includes('meowde-music.webp'),'Pre-answer lesson coach uses Dancing mode image');
  await page.screenshot({path:`${OUT}/03-lesson-dancing-coach-390x844.png`,fullPage:false});

  await page.evaluate(()=>{S.checked=true;S.correct=true;renderLesson()});
  await page.waitForTimeout(300);
  const correctCoach=await page.locator('.coach img').first().evaluate(node=>({mode:node.dataset.coachMode||'',pose:node.dataset.v449Pose||'',src:node.getAttribute('src')||''}));
  record('lesson.correctReaction',correctCoach);
  expect(correctCoach.mode==='','Correct-answer reaction temporarily overrides selected coach mode');
  expect(correctCoach.pose==='happy','Correct-answer reaction uses happy pose');

  await page.evaluate(()=>{S.checked=false;S.correct=false;renderLesson()});
  await page.waitForTimeout(300);
  const restoredCoach=await page.locator('.coach img').first().evaluate(node=>({mode:node.dataset.coachMode||'',src:node.getAttribute('src')||''}));
  record('lesson.restoredCoach',restoredCoach);
  expect(restoredCoach.mode==='dance','Selected coach mode returns after feedback state clears');
  expect(restoredCoach.src.includes('meowde-music.webp'),'Restored coach uses Dancing mode image');

  expect(errors.length===0,`No console/page errors${errors.length?`: ${errors.join(' | ')}`:''}`);
  expect(badResponses.length===0,`No HTTP 4xx/5xx responses${badResponses.length?`: ${badResponses.join(' | ')}`:''}`);
}catch(error){
  failures.push(`Uncaught E2E error: ${error.message}`);
  console.error(error);
  await page.screenshot({path:`${OUT}/99-failure-390x844.png`,fullPage:true}).catch(()=>{});
}

record('errors',errors);
record('badResponses',badResponses);
await context.close();
await browser.close();
fs.writeFileSync(`${OUT}/report.json`,JSON.stringify({url:BASE,viewport:'390x844',results,failures},null,2));

if(failures.length){
  console.error(`\nCoach Mode Production E2E FAILED (${failures.length})`);
  failures.forEach((item,index)=>console.error(`${index+1}. ${item}`));
  process.exit(1);
}
console.log('\nCoach Mode Production E2E PASSED');

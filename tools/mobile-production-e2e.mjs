import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE='https://meowde.vercel.app';
const OUT='mobile-e2e-artifacts';
fs.mkdirSync(OUT,{recursive:true});

const results=[];
const failures=[];
function record(name,value){results.push({name,value});console.log(`${name}:`,typeof value==='string'?value:JSON.stringify(value))}
function expect(condition,message){if(!condition){failures.push(message);console.error(`FAIL: ${message}`)}else console.log(`PASS: ${message}`)}

const browser=await chromium.launch({headless:true});

async function fresh(name){
  const context=await browser.newContext({viewport:{width:390,height:844},screen:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true,locale:'ko-KR'});
  const page=await context.newPage();
  const errors=[];
  const warnings=[];
  const failedRequests=[];
  const badResponses=[];
  page.on('pageerror',error=>errors.push(`pageerror: ${error.message}`));
  page.on('console',msg=>{if(msg.type()==='error')errors.push(`console-error: ${msg.text()}`);else if(msg.type()==='warning')warnings.push(`console-warning: ${msg.text()}`)});
  page.on('requestfailed',request=>failedRequests.push(`${request.method()} ${request.url()} :: ${request.failure()?.errorText||'failed'}`));
  page.on('response',response=>{if(response.status()>=400)badResponses.push(`${response.status()} ${response.url()}`)});
  const response=await page.goto(BASE,{waitUntil:'domcontentloaded',timeout:45000});
  expect(Boolean(response&&response.ok()),`${name}: production returns HTTP 2xx`);
  try{
    await page.waitForFunction(()=>typeof S!=='undefined'&&document.querySelector('.screen'),null,{timeout:15000});
  }catch(error){
    const diagnostic=await page.evaluate(()=>({url:location.href,title:document.title,readyState:document.readyState,bodyText:document.body?.innerText?.slice(0,1500)||'',bodyHtml:document.body?.innerHTML?.slice(0,3000)||'',hasS:typeof S!=='undefined',hasApp:Boolean(document.getElementById('app')),scriptSrcs:Array.from(document.scripts).map(x=>x.src||'[inline]'),release:window.MeowRelease?{version:MeowRelease.version,report:MeowRelease.report}:null}));
    record(`${name}.bootstrapDiagnostic`,diagnostic);record(`${name}.errors`,errors);record(`${name}.warnings`,warnings);record(`${name}.failedRequests`,failedRequests);record(`${name}.badResponses`,badResponses);
    await page.screenshot({path:`${OUT}/00-${name}-bootstrap-failure.png`,fullPage:false});
    fs.writeFileSync(`${OUT}/bootstrap-diagnostic.json`,JSON.stringify({diagnostic,errors,warnings,failedRequests,badResponses},null,2));
    await context.close();throw error;
  }
  await page.evaluate(async()=>{if(window.MeowRelease&&MeowRelease.loadPromise)await MeowRelease.loadPromise});
  await page.waitForTimeout(300);
  const overlay=page.locator('#overlay');
  const overlayVisible=await overlay.isVisible().catch(()=>false);
  record(`${name}.initialLanguageOverlayVisible`,overlayVisible);
  if(overlayVisible){
    await page.screenshot({path:`${OUT}/00-${name}-initial-language-overlay-390x844.png`,fullPage:false});
    const korean=overlay.getByRole('button',{name:'한국어'});
    if(await korean.count()){
      await korean.click();
      await overlay.waitFor({state:'detached',timeout:5000}).catch(()=>overlay.waitFor({state:'hidden',timeout:5000}));
    }else{
      failures.push(`${name}: initial language overlay is visible but Korean action is unavailable`);
    }
  }
  record(`${name}.warnings`,warnings);
  return {context,page,errors,warnings,failedRequests,badResponses,overlayVisible};
}

async function metrics(page){return page.evaluate(()=>({screen:typeof S!=='undefined'?S.screen:null,width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,releaseHealth:document.documentElement.dataset.releaseHealth||'',version:document.documentElement.dataset.meowdeVersion||window.__MEOWDE_VERSION__||'',nav:document.documentElement.dataset.navigation||''}))}
async function tabs(page){return page.locator('.tabbar button').evaluateAll(nodes=>nodes.map(node=>({text:(node.textContent||'').trim(),label:node.getAttribute('aria-label')||'',active:node.classList.contains('on')})))}

try{
  {
    const {context,page,errors,overlayVisible}=await fresh('home');
    record('home.firstOpenExtraTap',overlayVisible?1:0);
    const m=await metrics(page);record('home.metrics',m);
    expect(m.screen==='home','Home is the initial screen');expect(m.width===390&&m.height===844,'Viewport is exactly 390×844');expect(m.scrollWidth<=390&&m.bodyWidth<=390,'Home has no horizontal overflow');expect(m.releaseHealth!=='error','Release health is not error');
    const nav=await tabs(page);record('home.tabs',nav);expect(nav.length===4,'Home has exactly four persistent tabs');expect(nav.map(x=>x.label).join('|')==='홈|학습|복습|Meowde','Home tab labels are Home/Learn/Review/Meowde');
    const major=await page.locator('.phase1-home .scroll > section.card').count();record('home.majorCardCount',major);expect(major<=3,'Home has no more than three major cards');
    const cta=page.locator('.phase1-hero > .btn').first();await cta.waitFor({state:'visible'});const ctaBox=await cta.boundingBox();record('home.ctaBox',ctaBox);expect(Boolean(ctaBox&&ctaBox.y>=0&&ctaBox.y+ctaBox.height<=844),'Home primary CTA is visible without scrolling');
    await page.screenshot({path:`${OUT}/01-home-390x844.png`,fullPage:false});
    await cta.click();await page.waitForFunction(()=>typeof S!=='undefined'&&S.screen==='lesson');await page.waitForTimeout(200);
    const lm=await metrics(page);record('lesson.metrics',lm);expect(lm.scrollWidth<=390&&lm.bodyWidth<=390,'Lesson has no horizontal overflow');const coaches=await page.locator('.coach').count();record('lesson.coachCount',coaches);expect(coaches===1,'Lesson shows one Meowde coach surface');
    const lessonAction=page.locator('.lesson-foot .btn,.feedback .btn').first();await lessonAction.waitFor({state:'visible'});const lessonActionBox=await lessonAction.boundingBox();record('lesson.actionBox',lessonActionBox);expect(Boolean(lessonActionBox&&lessonActionBox.y>=0&&lessonActionBox.y+lessonActionBox.height<=844),'Lesson primary action is visible without scrolling');
    await page.screenshot({path:`${OUT}/02-lesson-390x844.png`,fullPage:false});
    await page.locator('button.close').click();await page.waitForFunction(()=>typeof S!=='undefined'&&S.screen==='home');expect((await metrics(page)).screen==='home','Lesson Exit returns to Home by user click');expect(errors.length===0,`Home/Lesson has no console or page errors${errors.length?`: ${errors.join(' | ')}`:''}`);await context.close();
  }

  {
    const {context,page,errors}=await fresh('learn');
    await page.locator('.tabbar button[aria-label="학습"]').click();await page.waitForFunction(()=>typeof S!=='undefined'&&S.screen==='map');await page.waitForTimeout(350);
    const m=await metrics(page);record('learn.metrics',m);expect(m.scrollWidth<=390&&m.bodyWidth<=390,'Learn has no horizontal overflow');const nav=await tabs(page);record('learn.tabs',nav);expect(nav.length===4,'Learn keeps four persistent tabs');expect(await page.locator('.trail').count()===1,'Learn renders one canonical trail');expect(await page.locator('.stone,.bush,.trail-cat,.v416-now-tag,.v416-node-reward').count()===0,'Learn has no decorative/reward clutter nodes');
    const currentAnimation=await page.locator('.node.current').first().evaluate(node=>getComputedStyle(node).animationName).catch(()=> 'none');record('learn.currentAnimation',currentAnimation);expect(currentAnimation==='none','Current lesson node does not continuously animate');const touch=await page.locator('.trail button.node').first().evaluate(node=>({touch:getComputedStyle(node).touchAction,describedBy:node.getAttribute('aria-describedby')}));record('learn.touch',touch);expect(touch.touch==='manipulation','Learn node uses touch-action: manipulation');const label=await page.locator('.trail .node-label').first().evaluate(node=>({role:node.getAttribute('role'),tabindex:node.getAttribute('tabindex')}));record('learn.labelAccessibility',label);expect(label.role==='button'&&label.tabindex==='0','Learn label is keyboard/touch accessible');
    await page.screenshot({path:`${OUT}/03-learn-390x844.png`,fullPage:false});expect(errors.length===0,`Learn has no console or page errors${errors.length?`: ${errors.join(' | ')}`:''}`);await context.close();
  }

  {
    const {context,page,errors}=await fresh('review');
    await page.locator('.tabbar button[aria-label="복습"]').click();await page.waitForFunction(()=>typeof S!=='undefined'&&S.screen==='review');await page.waitForTimeout(200);
    const m=await metrics(page);record('review.metrics',m);expect(m.scrollWidth<=390&&m.bodyWidth<=390,'Review has no horizontal overflow');const nav=await tabs(page);record('review.tabs',nav);expect(nav.length===4,'Review keeps four persistent tabs');expect(await page.locator('.phase5-review').count()===1,'Review canonical surface renders');expect(await page.locator('.empty-state,.review-list').count()>=1,'Review has a meaningful empty/list state');
    await page.screenshot({path:`${OUT}/04-review-390x844.png`,fullPage:false});expect(errors.length===0,`Review has no console or page errors${errors.length?`: ${errors.join(' | ')}`:''}`);await context.close();
  }

  {
    const {context,page,errors}=await fresh('meowde');
    await page.locator('.tabbar button[aria-label="Meowde"]').click();await page.waitForFunction(()=>typeof S!=='undefined'&&S.screen==='room');await page.waitForTimeout(350);
    const m=await metrics(page);record('meowde.metrics',m);expect(m.scrollWidth<=390&&m.bodyWidth<=390,'Meowde has no horizontal overflow');const nav=await tabs(page);record('meowde.tabs',nav);expect(nav.length===4,'Meowde keeps four persistent tabs');
    const order=await page.locator('.screen>.scroll').evaluate(root=>Array.from(root.children).map(node=>node.className));record('meowde.order',order);const idx=needle=>order.findIndex(value=>String(value).includes(needle));expect(idx('simple-head')>=0&&idx('profile-card')>idx('simple-head'),'Meowde intro precedes profile card');expect(idx('room-grid')>idx('profile-card'),'Companion card follows profile card');expect(idx('v427-growth-card')>idx('room-grid'),'Growth follows companion card');expect(idx('v419-summary')>idx('v427-growth-card'),'Achievements follow growth');if(idx('v428-season-card')>=0)expect(idx('v428-season-card')>idx('v419-summary'),'Seasonal event follows achievements/milestone');
    await page.screenshot({path:`${OUT}/05-meowde-390x844.png`,fullPage:false});
    const achievementsLink=page.getByRole('button',{name:/업적과 액세서리 보기/});
    if(await achievementsLink.count()){
      await achievementsLink.click();await page.waitForFunction(()=>typeof S!=='undefined'&&S.screen==='achievements');await page.waitForTimeout(200);const anav=await tabs(page);record('achievements.tabs',anav);expect(anav.length===4,'Achievements keeps four persistent tabs');expect(anav.map(x=>x.label).join('|')==='홈|학습|복습|Meowde','Achievements does not reintroduce League/Profile tabs');expect((await metrics(page)).scrollWidth<=390,'Achievements has no horizontal overflow');await page.screenshot({path:`${OUT}/06-achievements-390x844.png`,fullPage:false});
      await page.evaluate(()=>renderProfile());await page.waitForFunction(()=>typeof S!=='undefined'&&S.screen==='profile');const pnav=await tabs(page);record('profile.tabs',pnav);expect(pnav.length===4,'Profile keeps four persistent tabs');expect(pnav.map(x=>x.label).join('|')==='홈|학습|복습|Meowde','Profile does not reintroduce League/Profile tabs');expect((await metrics(page)).scrollWidth<=390,'Profile has no horizontal overflow');await page.screenshot({path:`${OUT}/07-profile-390x844.png`,fullPage:false});
    }else failures.push('Achievements entry button is missing from Meowde');
    expect(errors.length===0,`Meowde/Achievements/Profile has no console or page errors${errors.length?`: ${errors.join(' | ')}`:''}`);await context.close();
  }
}catch(error){failures.push(`Uncaught E2E error: ${error.message}`)}

await browser.close();
fs.writeFileSync(`${OUT}/report.json`,JSON.stringify({url:BASE,viewport:'390x844',results,failures},null,2));
if(failures.length){console.error(`\nMobile Production E2E FAILED (${failures.length})`);failures.forEach((item,index)=>console.error(`${index+1}. ${item}`));process.exit(1)}
console.log('\nMobile Production E2E PASSED');

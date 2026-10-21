const {test,expect}=require("playwright/test");
const base=process.env.MEOWDE_BASE_URL||"http://127.0.0.1:4173";
test("Python practice keeps all five tabs visible on narrow phones",async({page})=>{
  for(const width of [320,375,390]){
    await page.setViewportSize({width,height:740});
    await page.goto(base+"/python-lab.html");
    const nav=page.getByRole("navigation",{name:"메인 메뉴"});
    await expect(nav).toBeVisible();
    await expect(nav.locator("a")).toHaveCount(5);
    await expect(nav.locator("a[aria-current=page]")).toHaveAttribute("aria-label","실습");
    const dims=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth,bottom:document.querySelector(".meowde-lab-tabbar").getBoundingClientRect().bottom,height:innerHeight}));
    expect(dims.scroll).toBeLessThanOrEqual(dims.width);
    expect(Math.abs(dims.bottom-dims.height)).toBeLessThan(2);
  }
});
test("Practice links open the requested screen and preserve progress through reload",async({page})=>{
  await page.goto(base+"/");
  await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==="ordered");
  // Normalize an existing learner record before comparing navigation-only changes.
  await page.evaluate(()=>{S.done=[0];S.xp=120;S.churu=7;save()});
  await page.reload();
  await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==="ordered");
  const progress=()=>page.evaluate(()=>({done:S.done,xp:S.xp,churu:S.churu,mistakes:S.mistakes}));
  const before=await progress();
  // Restoring a completed first lesson earns the existing First Step reward once
  // (v419-achievements: +20 XP, +5 churu). Navigation must not award it again.
  expect(before).toMatchObject({done:[0],xp:140,churu:12});
  expect(await page.evaluate(()=>MeowAchievements.state.unlocked["first-step"]))
    .toMatchObject({xp:20,churu:5});
  const achievements=await page.evaluate(()=>localStorage.getItem("meowde-v419-achievements"));
  await page.goto(base+"/python-lab.html");
  await page.locator("#learner-code").fill("print('draft preserved')");
  const draft=await page.evaluate(()=>localStorage.getItem("meowde-python-lab-v1"));
  for(const [label,tab,surface] of [
    ["복습","review",".phase5-review"],
    ["학습","map","[data-learn-path=canonical]"],
    ["마이","my",".v420-profile-hero"],
    ["홈","home",".phase1-home"]
  ]){
    await page.getByRole("navigation",{name:"메인 메뉴"}).getByRole("link",{name:label,exact:true}).click();
    await expect(page).toHaveURL(new RegExp("tab="+tab));
    await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==="ordered");
    await expect(page.locator(surface)).toBeVisible();
    await expect(page.locator(".tabbar button.on")).toHaveAttribute("aria-label",label);
    expect(await progress()).toEqual(before);
    expect(await page.evaluate(()=>localStorage.getItem("meowde-v419-achievements"))).toBe(achievements);
    await page.reload();
    await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==="ordered");
    await expect(page.locator(surface)).toBeVisible();
    expect(await progress()).toEqual(before);
    expect(await page.evaluate(()=>localStorage.getItem("meowde-v419-achievements"))).toBe(achievements);
    await page.getByRole("button",{name:"실습",exact:true}).click();
    await expect(page.locator("#learner-code")).toHaveValue("print('draft preserved')");
    expect(await page.evaluate(()=>localStorage.getItem("meowde-python-lab-v1"))).toBe(draft);
  }
});
test("Unknown entry tabs leave the default home screen usable",async({page})=>{
  await page.goto(base+"/?tab=constructor");
  await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==="ordered");
  await expect(page.locator(".phase1-home")).toBeVisible();
  await page.getByRole("button",{name:"복습",exact:true}).click();
  await expect(page.locator(".phase5-review")).toBeVisible();
});
test("Canonical Home, Learn and Review do not inject duplicate Python lab CTA",async({page})=>{
  await page.goto(base+"/");
  await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==="ordered");
  for(const tab of ["홈","학습","복습"]){
    await page.getByRole("button",{name:tab,exact:true}).last().click();
    await expect(page.locator("#python-lab-entry")).toHaveCount(0);
    await expect(page.locator(".tabbar button[aria-label='실습']")).toHaveCount(1);
  }
});

test("Five global tabs keep the same physical order on every screen",async({page})=>{
  const expected=["홈","학습","실습","복습","마이"];
  await page.goto(base+"/");
  await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==="ordered");
  for(const tab of ["홈","학습","복습"]){
    await page.getByRole("button",{name:tab,exact:true}).last().click();
    const labels=await page.locator(".tabbar[data-phase1-navigation='five-tabs'] button").evaluateAll(nodes=>nodes.map(el=>el.getAttribute("aria-label")));
    expect(labels).toEqual(expected);
  }
  await page.goto(base+"/python-lab.html");
  const labels=await page.locator(".meowde-lab-tabbar a").evaluateAll(nodes=>nodes.map(el=>el.getAttribute("aria-label")));
  expect(labels).toEqual(expected);
});

test("Practice uses the same cream and mint palette as the main app",async({page})=>{
  await page.goto(base+"/python-lab.html");
  await expect(page.locator("#learner-code")).toBeVisible();
  const info=await page.evaluate(()=>{
    const body=getComputedStyle(document.body),button=getComputedStyle(document.querySelector("#practice button.primary"));
    return {background:body.backgroundColor,button:button.backgroundColor,
      font:body.fontFamily,practiceFirst:document.querySelector(".lesson > section.card")?.id==="practice",
      support:!!document.querySelector(".practice-support")};
  });
  expect(info.background).toBe("rgb(255, 249, 239)");
  expect(info.button).toBe("rgb(83, 199, 160)");
  expect(info.practiceFirst).toBe(true);
  expect(info.support).toBe(true);
});
test("Review exposes recent lessons first and preserves older completed items",async({page})=>{
  await page.goto(base+"/");
  await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==="ordered");
  await page.evaluate(()=>{S.done=[0,1,2,3,4];save();renderReview()});
  await expect(page.locator(".phase5-review")).toBeVisible();
  const recent=page.locator(".phase5-review > .scroll > .review-list .review-item");
  await expect(recent).toHaveCount(3);
  const older=page.locator(".phase5-review .review-disclosure").filter({hasText:"이전 완료 레슨 보기"});
  await expect(older).toBeVisible();
  await older.locator("summary").click();
  await expect(older.locator(".review-item")).toHaveCount(2);
  await expect(page.locator(".phase5-review .review-disclosure").filter({hasText:"학습 분석 보기"})).toBeVisible();
});

test("Practice keeps the task, editor and main action visible without expanding help",async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto(base+"/python-lab.html");
  await expect(page.locator("#learner-code")).toBeVisible();
  await expect(page.locator("#practice [data-run=grade]")).toBeVisible();
  await expect(page.locator(".practice-criteria")).not.toBeVisible();
  await expect(page.locator("#practice-tools-open")).toBeVisible();
  const positions=await page.evaluate(()=>({
    editor:document.querySelector("#learner-code").getBoundingClientRect().top,
    action:document.querySelector("#practice [data-run=grade]").getBoundingClientRect().top,
    nav:document.querySelector(".meowde-lab-tabbar").getBoundingClientRect().top
  }));
  expect(positions.editor).toBeLessThan(positions.nav);
  expect(positions.action).toBeLessThan(positions.nav);
  await page.locator("#practice-tools-open").click();
  await page.locator(".practice-tools-group").filter({hasText:"채점 기준"}).locator("summary").first().click();
  await expect(page.locator(".practice-criteria")).toBeVisible();
});

test("Compact practice remains usable at large text and reduced visible height",async({page})=>{
  await page.setViewportSize({width:375,height:560});
  await page.goto(base+"/python-lab.html");
  await page.addStyleTag({content:"html{font-size:20px!important} body:has(#lab){font-size:19px!important}"});
  const editor=page.locator("#learner-code"),action=page.locator("#practice [data-run=grade]");
  await expect(editor).toBeVisible();
  await editor.focus();
  await expect(editor).toBeFocused();
  await editor.fill("print('accessible')");
  await action.scrollIntoViewIfNeeded();
  await expect(action).toBeVisible();
  const geometry=await page.evaluate(()=>({
    width:innerWidth,scrollWidth:document.documentElement.scrollWidth,
    navBottom:document.querySelector(".meowde-lab-tabbar").getBoundingClientRect().bottom,
    height:innerHeight,
    button:document.querySelector("#practice [data-run=grade]").getBoundingClientRect()
  }));
  expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.width);
  expect(Math.abs(geometry.navBottom-geometry.height)).toBeLessThan(2);
  expect(geometry.button.top).toBeLessThan(geometry.height);
  expect(geometry.button.bottom).toBeGreaterThan(0);
  await expect(editor).toHaveValue("print('accessible')");
});

// Preserve practice records through input and reload.
const key='meowde-python-lab-v1';

for(const [label,raw] of [
  ['broken JSON','{"version":1,"units":'],
  ['unknown version',JSON.stringify({version:2,units:{values:{draft:'old work'}}})],
  ['invalid units',JSON.stringify({version:1,units:[]})],
  ['invalid unit record',JSON.stringify({version:1,units:{values:null}})],
]){
  test(`Practice preserves ${label} after input, hint and reload`,async({page})=>{
    await page.goto(base+'/python-lab.html');
    await page.evaluate(({key,raw})=>localStorage.setItem(key,raw),{key,raw});
    await page.reload();
    await expect(page.locator('#learner-code')).toBeVisible();
    await page.locator('#learner-code').fill('print("session only")');
    await page.locator('#hint-button').click();
    expect(await page.evaluate(key=>localStorage.getItem(key),key)).toBe(raw);
    await expect(page.locator('#storage-status')).toContainText('기존 기록');
    await page.reload();
    await expect(page.locator('#learner-code')).toBeVisible();
    expect(await page.evaluate(key=>localStorage.getItem(key),key)).toBe(raw);
  });
}

test('Valid practice records retain other units while drafts persist',async({page})=>{
  await page.goto(base+'/python-lab.html');
  const other={draft:'preserve other unit',passed:true,attempts:3};
  await page.evaluate(({key,other})=>localStorage.setItem(key,JSON.stringify({version:1,units:{other}})),{key,other});
  await page.reload();
  await page.locator('#learner-code').fill('print("saved")');
  await page.reload();
  await expect(page.locator('#learner-code')).toHaveValue('print("saved")');
  expect(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).units.other,key)).toEqual(other);
});

test("Practice starts with one task; learning details are in an optional tool sheet",async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto(base+"/python-lab.html");
  await expect(page.locator("#learner-code")).toBeVisible();
  await expect(page.locator(".practice-tools-sheet")).not.toBeVisible();
  await expect(page.locator("#practice-tools-open")).toBeVisible();
  await expect(page.locator("#practice [data-run=grade]")).toBeVisible();
  const other=page.locator("#quiz");
  await expect(other).not.toBeVisible();
  await page.locator("#practice-tools-open").click();
  await expect(page.locator(".practice-tools-sheet")).toBeVisible();
  await page.locator(".practice-tools-group").filter({hasText:"이해 확인 문제"}).locator("summary").first().click();
  await expect(other).toBeVisible();
  await page.locator(".practice-tools-close").click();
  await expect(page.locator("#learner-code")).toBeVisible();
});

const linuxNav=page=>page.getByRole('navigation',{name:'메인 메뉴',exact:true});
test('Linux destinations keep five ordered reachable tabs on narrow screens',async({page})=>{
 for(const [url,active] of [['/linux-home.html','홈'],['/linux-start.html','학습'],['/linux-crash-course.html?view=concept','학습'],['/linux-crash-course.html?view=practice','실습'],['/linux-review.html','복습'],['/linux-home.html?tab=my','마이']]){
  await page.setViewportSize({width:320,height:640});await page.goto(base+url);
  const nav=linuxNav(page);await expect(nav.locator('a')).toHaveCount(5);
  expect(await nav.locator('a').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('aria-label')))).toEqual(['홈','학습','실습','복습','마이']);
  await expect(nav.locator('[aria-current=page]')).toHaveAttribute('aria-label',active);
  const geometry=await nav.evaluate(n=>({bottom:n.getBoundingClientRect().bottom,width:document.documentElement.scrollWidth,viewport:innerWidth,height:innerHeight}));
  expect(geometry.width).toBeLessThanOrEqual(geometry.viewport);expect(Math.abs(geometry.bottom-geometry.height)).toBeLessThan(2);
 }
});

test('Linux practice survives every tab, reload, retries and explicit mission changes',async({page})=>{
 await page.goto(base+'/linux-crash-course.html?view=practice');
 const input=page.locator('#sim-input');
 await input.fill('bad-command');await page.locator('#sim-run').click();await expect(page.locator('#sim-feedback')).toContainText('처리되지');
 await page.locator('#sim-check').click();await expect(page.locator('#sim-next')).toBeHidden();
 await page.locator('#sim-help').click();await expect(page.locator('#sim-hint')).toBeVisible();
 await input.fill('mkdir training');await input.press('Enter');
 await input.fill('touch training/hello.txt');
 const legacy=await page.evaluate(()=>({...localStorage}));
 for(const tab of ['학습','홈','복습','마이']){
  await linuxNav(page).getByRole('link',{name:tab,exact:true}).click();
  await expect(linuxNav(page).locator('[aria-current=page]')).toHaveAttribute('aria-label',tab);
  await linuxNav(page).getByRole('link',{name:'실습',exact:true}).click();
  await expect(input).toHaveValue('touch training/hello.txt');
 }
 await page.reload();await expect(input).toHaveValue('touch training/hello.txt');
 await page.locator('#sim-run').click();await page.locator('#sim-check').click();await expect(page.locator('#sim-feedback')).toContainText('미션 성공');
 expect(await page.evaluate(()=>({...localStorage}))).toEqual(legacy);
 await page.locator('#sim-next').click();await expect(page.locator('#sim-goal')).toContainText('복사');
 await input.fill('ls');await page.locator('#sim-run').click();await expect(page.locator('#sim-out')).not.toContainText('training');
 await page.locator('#sim-reset').click();await page.reload();await page.locator('#sim-check').click();await expect(page.locator('#sim-next')).toBeHidden();
});

test('Linux concept selection and Bash draft remain independent',async({page})=>{
 await page.goto(base+'/linux-crash-course.html?view=concept');await page.locator('#nav button').nth(4).click();
 await linuxNav(page).getByRole('link',{name:'실습',exact:true}).click();await page.locator('#library-mode').selectOption('bash');
 await page.locator('#bash-source').fill('unfinished bash draft');
 await linuxNav(page).getByRole('link',{name:'학습',exact:true}).click();await expect(page.locator('#lesson h2')).toContainText('E5');
 await linuxNav(page).getByRole('link',{name:'복습',exact:true}).click();await linuxNav(page).getByRole('link',{name:'실습',exact:true}).click();
 await expect(page.locator('#library-mode')).toHaveValue('bash');await expect(page.locator('#bash-source')).toHaveValue('unfinished bash draft');
 await page.reload();await expect(page.locator('#bash-source')).toHaveValue('unfinished bash draft');
});

test('Linux corrupt practice session is preserved instead of overwritten',async({page})=>{
 await page.goto(base+'/linux-home.html');await page.evaluate(()=>sessionStorage.setItem('meowde-linux-practice-session-v1','{broken'));
 await linuxNav(page).getByRole('link',{name:'실습',exact:true}).click();await page.locator('#sim-input').fill('pwd');await page.locator('#sim-run').click();
 expect(await page.evaluate(()=>sessionStorage.getItem('meowde-linux-practice-session-v1'))).toBe('{broken');
 await expect(page.locator('#practice-session-status')).toContainText('저장하지 못했습니다');
});

test('Linux quiz feedback uses the bottom practice tab without another entry button',async({page})=>{
 await page.goto(base+'/linux-crash-course.html');await page.locator('#lesson .answers button').first().click();
 await expect(page.locator('[data-practice-note]')).toContainText('하단 실습 탭');await expect(page.locator('[data-quiz-guide]')).toHaveCount(0);
});


test("Learn tab opens roadmap with unfinished lesson and preserves explicit resume",async({page})=>{
  await page.goto(base+"/");
  await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==="ordered");
  await page.evaluate(()=>startLesson(0));
  const snapshot=()=>page.evaluate(()=>({
    index:S.lessonIndex,step:S.idx,completed:[...S.done],xp:S.xp,churu:S.churu,
    progress:hasLessonProgress()
  }));
  const previous=await snapshot();
  expect(previous.progress).toBe(true);
  await page.goto(base+"/python-lab.html");
  await page.getByRole("navigation",{name:"메인 메뉴"}).getByRole("link",{name:"학습",exact:true}).click();
  await expect(page).toHaveURL(/tab=map/);
  await expect(page.locator("[data-learn-path=canonical]")).toBeVisible();
  await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==="ordered");
  await expect(page.locator(".tabbar button.on")).toHaveAttribute("aria-label","학습");
  expect(await snapshot()).toEqual(previous);
  await page.reload();
  await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==="ordered");
  await expect(page.locator("[data-learn-path=canonical]")).toBeVisible();
  expect(await snapshot()).toEqual(previous);
  await page.evaluate(()=>resumeLesson());
  expect(await snapshot()).toEqual(previous);
});

test("Home current-course card matches daily card inset on mobile widths",async({page})=>{
  for(const width of [320,390,430]){
    await page.setViewportSize({width,height:840});
    await page.goto(base+"/?tab=home");
    await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==="ordered");
    const bounds=await page.evaluate(()=>{
      const daily=document.querySelector(".daily-card").getBoundingClientRect();
      const unit=document.querySelector(".phase1-unit-card").getBoundingClientRect();
      return {dailyLeft:daily.left,dailyRight:daily.right,unitLeft:unit.left,unitRight:unit.right,viewport:document.documentElement.clientWidth};
    });
    expect(Math.abs(bounds.dailyLeft-bounds.unitLeft)).toBeLessThan(2);
    expect(Math.abs(bounds.dailyRight-bounds.unitRight)).toBeLessThan(2);
    expect(bounds.unitRight).toBeLessThanOrEqual(bounds.viewport);
  }
});
test("Practice question is distinguishable as its own card in focus mode",async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto(base+"/python-lab.html");
  await expect(page.locator("#learner-code")).toBeVisible();
  const card=await page.locator("#practice.practice-primary").evaluate(node=>{
    const style=getComputedStyle(node);
    return {border:parseFloat(style.borderTopWidth),background:style.backgroundColor,padding:parseFloat(style.paddingLeft)};
  });
  expect(card.border).toBeGreaterThan(0);
  expect(card.background).toBe("rgb(255, 255, 255)");
  expect(card.padding).toBeGreaterThanOrEqual(12);
});

test("Practice mobile four-step flow and Review header remain aligned",async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto(base+"/python-lab.html");
 const task=page.locator("#practice");
 await expect(page.getByRole("banner",{name:"실습 화면 상단"}).getByRole("heading",{name:"실습"})).toBeVisible();
 await expect(task.locator(".practice-kicker")).toBeVisible();
 await expect(task.locator("#learner-code")).toBeVisible();
 await expect(task.locator('[data-run="grade"]')).toBeVisible();
 const steps=await page.evaluate(()=>({task:getComputedStyle(document.querySelector(".practice-kicker"),"::before").content,code:getComputedStyle(document.querySelector('label[for="learner-code"]'),"::before").content,run:getComputedStyle(document.querySelector('[data-run="grade"]'),"::before").content}));
 expect(steps.task).toContain("01");expect(steps.code).toContain("02");expect(steps.run).toContain("03");
 await page.goto(base+"/?tab=review");
 await page.waitForFunction(()=>document.documentElement.dataset.enhancementLoader==="ordered");
 await expect(page.locator(".phase5-review .simple-head h2")).toBeVisible();
 const h=await page.locator(".phase5-review .simple-head h2").evaluate(el=>({size:getComputedStyle(el).fontSize,margin:getComputedStyle(el.closest(".simple-head")).paddingLeft}));
 expect(h.size).toBe("25px");expect(h.margin).toBe("18px");
});

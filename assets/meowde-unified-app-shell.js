/* MEOWDE single presentation shell. This module never reads or writes learner storage.
 * Course engines retain exclusive ownership of progress, grading, XP and rewards.
 * Tab links are canonical deep links: no duplicate learning state or grading flows. */
(function (root) {
  'use strict';
  const subjectLabels={python:'Python',linux:'Linux',ml:'머신러닝',deep:'딥러닝'};
  const subjects=[['python','Python',true],['linux','Linux',true],['ml','머신러닝',true],['deep','딥러닝',true],['data','데이터 분석 · 준비 중',false],['robotics','AI 로보틱스 · 준비 중',false]];
  const tabs=[['home','홈','⌂'],['learn','학습','▤'],['deepen','심화','⌘'],['together','함께','✧'],['my','마이','♧']];
  const routeTable={
    python:{home:'/?tab=home',learn:'/?tab=map',deepen:'/python-lab.html',together:'/together.html?subject=python',my:'/?tab=my'},
    linux:{home:'/linux-home.html?tab=home',learn:'/linux-home.html?tab=learn',deepen:'/linux-crash-course.html?view=concept',together:'/together.html?subject=linux',my:'/linux-home.html?tab=my'},
    ml:{home:'/ml-foundations.html?tab=home',learn:'/ml-foundations.html?tab=learn',deepen:'/ml-foundations.html?tab=deepen',together:'/together.html?subject=ml',my:'/ml-foundations.html?tab=my'},
    deep:{home:'/deep-learning.html?tab=home',learn:'/deep-learning.html?tab=learn',deepen:'/deep-learning.html?tab=deepen',together:'/together.html?subject=deep',my:'/deep-learning.html?tab=my'}
  };
  function subject(){
    const p=root.location.pathname,q=new URLSearchParams(root.location.search),s=q.get('subject');
    if(p.endsWith('/together.html')&&subjectLabels[s])return s;
    if(p.endsWith('/learning-path.html')&&['python','linux'].includes(s))return s;
    if(p.includes('/linux-')||p.endsWith('/robotics.html'))return 'linux';
    if(p.includes('/ml-foundations.html'))return 'ml';
    if(p.includes('/deep-learning.html'))return 'deep';
    return 'python';
  }
  function tab(){
    const p=root.location.pathname,q=new URLSearchParams(root.location.search),t=q.get('tab');
    if(p.endsWith('/together.html'))return 'together';
    if(p.endsWith('/linux-crash-course.html')||p.endsWith('/linux-review.html')||p.endsWith('/python-lab.html'))return 'deepen';
    if(p.endsWith('/learning-path.html')||p.endsWith('/linux-start.html')||p.endsWith('/linux-course.html'))return 'learn';
    if(p==='/'||p.endsWith('/index.html')||p.endsWith('/v412.html')){
      if(typeof root.MeowdeSubjects?.currentTab==='function')return root.MeowdeSubjects.currentTab();
      if(q.get('tab')==='map')return 'learn';
    }
    return ['home','learn','deepen','my'].includes(t)?t:(subject()==='python'?'home':'learn');
  }
  function headerMarkup(s,t){
    let currentLang='KO';try{const v=JSON.parse(root.localStorage.getItem('meowde-v410-state')||'{}');if(v.lang==='en')currentLang='EN';}catch{}
    const label=subjectLabels[s]||'Python';
    const options=subjects.map(([id,name,enabled])=>`<option value="${id}"${enabled?'':' disabled'}${id===s?' selected':''}>${name}</option>`).join('');
    const languageIsActionable=s==='python'&&['home','my'].includes(t)&&typeof root.langSheet==='function';
    return `<a class="meowde-unified-brand" href="${routeTable[s].home}" aria-label="MEOWDE ${label} 홈"><img src="/assets/meowde-approved-base.svg?v=450" width="42" height="42" alt=""><span><strong>Meowde</strong><small>${label} · ${tabs.find(x=>x[0]===t)?.[1]||'학습'}</small></span></a><div class="meowde-unified-actions"><label class="meowde-unified-select-label"><span class="sr-only">과목 선택</span><select class="meowde-unified-subject" aria-label="과목 선택">${options}</select></label><button class="meowde-unified-ko" type="button"${languageIsActionable?'':' disabled title="이 과목은 한국어 학습 콘텐츠만 제공해요"'} aria-label="표시 언어">${currentLang}</button></div>`;
  }
  function tabMarkup(s,t){
    return tabs.map(([id,label,glyph])=>{
      // Unsupported advanced content must not be presented as a working lesson.
      const unsupported=false; // all five destinations are visible; ML deepen is explicitly marked as pending by its view
      return unsupported?`<span class="meowde-unified-tab meowde-unified-disabled" aria-label="심화 준비 중" aria-disabled="true" title="머신러닝 심화 준비 중"><span aria-hidden="true" class="meowde-unified-icon">${glyph}</span><span>${label}</span></span>`:
        `<a class="meowde-unified-tab" href="${routeTable[s][id]}" data-tab="${id}" aria-label="${label}"${id===t?' aria-current="page"':''}><span aria-hidden="true" class="meowde-unified-icon">${glyph}</span><span>${label}</span></a>`;
    }).join('');
  }
  function enhance(){
    if(!root.document.body)return;
    const s=subject(),t=tab();
    const host=root.document.getElementById('app')||root.document.querySelector('main')||root.document.body;
    const oldHeader=root.document.querySelector('body > .meowde-shell-header')||host.querySelector('.top, .meowde-shell-header, .meowde-canonical-top');
    let header=oldHeader;
    if(!header){
      header=root.document.createElement('header');
      host.prepend(header);
    }
    if(header.dataset.meowdeUnifiedHeader!==s+':'+t){
      header.classList.add('meowde-unified-top');
      header.setAttribute('aria-label','공통 상단 메뉴');
      header.innerHTML=headerMarkup(s,t);
      header.dataset.meowdeUnifiedHeader=s+':'+t;
      header.querySelector('.meowde-unified-subject')?.addEventListener('change',e=>{
        const next=e.target.value;
        if(!subjectLabels[next]||next===s)return;
        root.location.assign(routeTable[next].home);
      });
      header.querySelector('.meowde-unified-ko:not(:disabled)')?.addEventListener('click',()=>root.langSheet());
    }
    let nav=root.document.querySelector('.meowde-unified-tabs');
    if(!nav){
      nav=root.document.querySelector('.meowde-lab-tabbar,.linux-tabbar,.tabbar,.meowde-tabbar');
      if(!nav){nav=root.document.createElement('nav');root.document.body.append(nav);}
    }
    if(nav.dataset.meowdeUnifiedTabs!==s+':'+t){
      nav.classList.add('meowde-unified-tabs');
      nav.setAttribute('aria-label','메인 메뉴');
      nav.innerHTML=tabMarkup(s,t);
      nav.dataset.meowdeUnifiedTabs=s+':'+t;
    }
    // Legacy extra tabbars, if any, are duplicates; don't touch unrelated navigations.
    root.document.querySelectorAll('.meowde-lab-tabbar,.linux-tabbar,.tabbar,.meowde-tabbar').forEach(other=>{
      if(other!==nav)other.hidden=true;
    });
    root.document.body.classList.add('meowde-unified-shell');
  }
  let scheduled=false;
  function schedule(){if(scheduled)return;scheduled=true;Promise.resolve().then(()=>{scheduled=false;enhance()});}
  if(root.document.readyState==='loading')root.document.addEventListener('DOMContentLoaded',enhance,{once:true});
  else enhance();
  // Python root recreates its entire screen when the user switches modes.
  const app=root.document.getElementById('app');
  if(app&&root.MutationObserver)new root.MutationObserver(schedule).observe(app,{childList:true});
  root.MeowdeUnifiedShell=Object.freeze({enhance,subject,tab,routes:routeTable});
})(window);

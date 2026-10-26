/* First-concept practice scheduling; completion is not a mastery score. */
(function(scope){
  'use strict';
  const labels=['이해','반복','따라 코딩','독립 해결','응용'];
  const limits=[[3,5],[5,8],[4,6],[3,5],[2,4]];
  const initial=()=>({version:1,level:1,index:0,cycle:0,items:{},extra:{},complete:false});
  const valid=s=>s&&s.version===1&&Number.isInteger(s.level)&&s.level>=1&&s.level<=5&&Number.isInteger(s.index)&&s.index>=0&&s.index<8&&Number.isInteger(s.cycle)&&s.cycle>=0&&s.items&&typeof s.items==='object'&&!Array.isArray(s.items)&&Object.values(s.items).every(r=>r&&typeof r==='object'&&!Array.isArray(r))&&s.extra&&typeof s.extra==='object'&&!Array.isArray(s.extra);
  const itemId=s=>`${s.cycle}:${s.level}:${s.index}`;
  const count=s=>Math.min(limits[s.level-1][1],limits[s.level-1][0]+(Number(s.extra[s.level])||0));
  function question(s){
    const previous=s.items[`${s.cycle}:${s.level}:${s.index-1}`];
    const easy=!!previous?.helpUsed;
    const n=(easy?8:17)+s.index*3+s.cycle*7,cap=easy?3:5+s.index%3;
    const mode=s.index%3,boxes=Math.floor(n/cap),left=n%cap;
    const common={id:itemId(s),level:s.level,title:labels[s.level-1],n,cap};
    if(s.level===1){
      const questions=[
        {prompt:'따옴표 안의 숫자는 글자예요. int()로 수로 바꾸면 덧셈할 수 있어요.',code:`text = "${n}"\nprint(int(text) + 2)`,answer:String(n+2),choices:[String(n)+'2',String(n+2),String(n)],reason:`int("${n}")는 수 ${n}입니다. 여기에 2를 더하면 ${n+2}예요. 글자끼리 더하면 이어 붙입니다.`},
        {prompt:'//는 가득 채운 묶음의 수, 즉 몫을 구해요.',code:`print(${n} // ${cap})`,answer:String(boxes),choices:[String(left),String(n),String(boxes)],reason:`${cap}개씩 ${boxes}묶음을 만들고 ${left}개가 남아요. //의 결과는 묶음 수 ${boxes}예요.`},
        {prompt:'%는 묶고 남은 수를 구해요.',code:`print(${n} % ${cap})`,answer:String(left),choices:[String(boxes),String(left),String(cap)],reason:`${n}에서 ${cap} × ${boxes}을 빼면 ${left}가 남아요. %의 결과는 ${left}예요.`}
      ];
      const q=questions[mode];return {...common,...q,type:'choice',choices:[...new Set(q.choices)]};
    }
    if(s.level===2){
      const questions=[
        {prompt:'계산하기 전에 글자를 수로 바꿔 주세요. 빈칸에 들어갈 것은?',code:`count = ___("${n}")`,answer:'int',choices:['str','int','print'],reason:'int()는 숫자로 된 글자를 정수로 바꿔요. str()은 글자로 바꾸고 print()는 화면에 보여줘요.'},
        {prompt:`${n}개를 ${cap}개씩 담아요. 가득 찬 상자 수를 구하려면?`,code:`boxes = ${n} ___ ${cap}`,answer:'//',choices:['%','/','//'],reason:`가득 찬 상자는 몫 ${boxes}개예요. //를 쓰세요. %는 남은 개수, /는 소수까지 포함한 나눗셈이에요.`},
        {prompt:'아래 코드는 남은 개수를 구하려다 몫을 구했어요. //를 무엇으로 바꿀까요?',code:`left = ${n} // ${cap}`,answer:'%',choices:['+','%','//'],reason:`남은 개수는 ${left}예요. 몫 // 대신 나머지 %를 사용하세요.`}
      ];
      return {...common,...questions[mode],type:'choice'};
    }
    let prompt,starter,solution,expected,reason;
    if(s.level===3){
      let code,answer,choices,solution;
      if(mode===0){prompt='예제의 int("8")에서 배운 변환이에요. 빈칸의 밑줄을 모두 지우고 int를 골라 count에 수를 저장하세요.';code='count = ___(text)';solution='count = int(text)';answer='int';choices=['str','int','print'];expected=['count'];reason='밑줄 전체를 int로 바꾸세요. count = int(text)로 쓰면 숫자 글자가 수로 바뀌어요.';}
      else if(mode===1){prompt='가득 찬 상자 수를 구해요. 빈칸에 몫 연산자를 고르세요.';code='count = int(text)\nboxes = count ___ capacity';solution='count = int(text)\nboxes = count // capacity';answer='//';choices=['%','/','//'];expected=['boxes'];reason='boxes는 가득 찬 상자 수이므로 몫 연산자 //를 사용해요.';}
      else{prompt='묶고 남은 개수를 구해요. 빈칸에 나머지 연산자를 고르세요.';code='count = int(text)\nleft = count ___ capacity';solution='count = int(text)\nleft = count % capacity';answer='%';choices=['+','%','//'];expected=['left'];reason='left는 묶고 남은 수이므로 나머지 연산자 %를 사용해요.';}
      return {...common,type:'choice',prompt,code,solution,answer,choices,expected,reason,scaffold:true};
    }else if(s.level===4){
      const target=mode===0?'count':mode===1?'boxes':'left';
      prompt=mode===0?'text를 정수로 바꿔 count에 저장하세요.':mode===1?'text개의 물건을 capacity개씩 담아요. 가득 찬 상자 수를 boxes에 저장하세요.':'text개의 물건을 capacity개씩 담고 남은 수를 left에 저장하세요.';
      starter='';expected=[target];solution=target==='count'?'count = int(text)':`count = int(text)\n${target} = count ${target==='boxes'?'//':'%'} capacity`;
      reason=target==='count'?'count = int(text)처럼 변환한 결과를 저장하세요.':`${target}에는 ${target==='boxes'?'몫 //':'나머지 %'}이 필요해요. 먼저 int(text)로 수량을 바꾸세요.`;
    }else{
      prompt=s.index%2===0?'단체 손님 text명을 한 줄에 capacity명씩 앉혀요. 꽉 찬 줄 수를 boxes, 남은 사람 수를 left에 저장하세요.':'물건을 나눠 담는 아래 코드에서 몫과 나머지가 뒤바뀌었어요. boxes는 가득 찬 상자 수, left는 남은 개수가 되게 고치세요.';
      starter=s.index%2===0?'':'count = int(text)\nboxes = count % capacity\nleft = count // capacity';
      solution='count = int(text)\nboxes = count // capacity\nleft = count % capacity';expected=['boxes','left'];
      reason='boxes는 몫 //, left는 나머지 %예요. text를 int로 바꾼 뒤 각각 저장하세요. 예시 숫자를 고정하면 다른 인원이나 용량에서 틀립니다.';
    }
    return {...common,type:'code',prompt,starter,solution,expected,reason,scaffold:false};
  }
  function payload(q,code){
    const inputs=[[q.n,q.cap],[0,q.cap],[q.cap*3,q.cap],[q.cap-1,q.cap+1]];
    return {code:`text = "${q.n}"\ncapacity = ${q.cap}\n`+code,tests:inputs.map(([n,c],i)=>({label:i===0?'이번 입력':i===1?'0개인 경우':i===2?'정확히 나누어지는 경우':'다른 수량과 용량',code:`_case = {"text": "${n}", "capacity": ${c}}\nexec(${JSON.stringify(code)}, _case)\n`+q.expected.map(name=>`assert type(_case.get("${name}")) is int and _case["${name}"] == ${name==='count'?n:name==='boxes'?Math.floor(n/c):n%c}, "${name} 값을 확인하세요"`).join('\n')}))};
  }
  function mark(s,pass,now=Date.now()){
    const id=itemId(s),r=s.items[id]||(s.items[id]={});
    // An already accepted answer cannot be submitted repeatedly for credit.
    if(r.lastPassed)return;
    if(!r.attempts)r.firstAttemptPassed=pass;
    r.attempts=(r.attempts||0)+1;r.lastPassed=pass;
    r.lastPassedWithHelp=!!r.helpUsed||s.level===3;
    if(pass){r.completedAt=now;r.independentPassed=!r.lastPassedWithHelp&&r.attempts===1;}
    else{
      r.helpUsed=true;r.feedbackUsed=true;
      if(!r.extraAdded){s.extra[s.level]=Math.min(limits[s.level-1][1]-limits[s.level-1][0],(Number(s.extra[s.level])||0)+1);r.extraAdded=true;}
    }
  }
  function advance(s,now=Date.now()){
    if(!s.items[itemId(s)]?.lastPassed)return false;
    if(s.index+1<count(s))s.index++;
    else if(s.level<5){s.level++;s.index=0;}
    else{s.complete=true;s.completedAt=now;s.reviewDueAt=now+86400000;}
    return true;
  }
  function review(s,now=Date.now()){
    if(!s.complete||now<s.reviewDueAt)return false;
    s.cycle++;s.level=4;s.index=0;s.complete=false;s.extra={};return true;
  }
  function mount({root,record,save,escape,units,blocked=false}){
    let state=record.valuesPath;
    const unsupported=state!==undefined&&!valid(state);
    if(!state||unsupported)state=initial();
    let worker=null,timer=null,busy=false,unsaved=false;
    const persist=()=>{
      if(blocked||unsupported){unsaved=true;return false;}
      record.valuesPath=state;unsaved=!save();return !unsaved;
    };
    const status=message=>{const node=root.querySelector('#values-feedback');if(node)node.textContent=message;};
    const warn=()=>{const node=root.querySelector('#storage-status');if(node)node.textContent=unsaved||blocked||unsupported?'새 작업이 저장되지 않았어요. 이 탭을 유지하고 코드를 복사해 두세요. 기존 기록은 덮어쓰지 않습니다.':'';};
    const stop=()=>{if(worker)worker.terminate();worker=null;clearTimeout(timer);busy=false;};
    const safeToReload=()=>{
      if(busy||unsaved)return false;
      // No input or submission: there is nothing new to lose.
      if(!Object.keys(state.items).length)return true;
      try{return JSON.stringify(JSON.parse(localStorage.getItem('meowde-python-lab-v1'))?.units?.values?.valuesPath)===JSON.stringify(state);}catch{return false;}
    };
    const draw=()=>{
      const q=question(state),id=q.id,r=state.items[id]||{};
      root.innerHTML=`<p id="storage-status" class="storage-warning" role="status"></p><details class="values-units"><summary>단원 목록</summary><nav aria-label="학습 단원">${units.map(u=>`<a href="#${u.id}">${escape(u.title)}</a>`).join('')}</nav></details><article class="values-path card" aria-labelledby="unit-title"><h2 id="unit-title">문자에서 계산으로</h2><p class="values-level">${labels[state.level-1]} · Lv.${state.level}</p><div id="values-content"></div><p id="values-feedback" role="status" aria-live="polite"></p><div id="values-action"></div></article>`;
      document.body.classList.add('meowde-practice-focus');
      const content=root.querySelector('#values-content'),actions=root.querySelector('#values-action');
      const button=(text,handler)=>{const b=document.createElement('button');b.className='primary';b.type='button';b.textContent=text;b.onclick=handler;actions.replaceChildren(b);return b;};
      const next=()=>button(state.index+1<count(state)?'다음 연습':state.level<5?'다음 단계 · '+labels[state.level]:'연습 마치기',()=>{
        const before=JSON.parse(JSON.stringify(state));advance(state);
        if(!persist()&&!blocked&&!unsupported){state=before;record.valuesPath=state;draw();return;}
        draw();root.querySelector('#unit-title').scrollIntoView({block:'start'});
      });
      if(state.complete){
        const records=Object.values(state.items),independent=records.filter(x=>x.independentPassed).length,helped=records.filter(x=>x.lastPassed&&x.lastPassedWithHelp).length;
        content.innerHTML=`<h3>이번 연습을 마쳤어요</h3><p>첫 시도에 도움 없이 해결 ${independent}개 · 도움받아 해결 ${helped}개</p><p>완료가 곧 숙달은 아니에요. 하루 뒤 새 입력으로 다시 풀며 기억을 확인해요.</p>`;
        if(Date.now()>=state.reviewDueAt)button('새 문제로 기억 확인',()=>{const before=JSON.parse(JSON.stringify(state));review(state);if(!persist()&&!blocked&&!unsupported){state=before;record.valuesPath=state;draw();return;}draw();});
        else{
          const nextUnit=units[units.findIndex(u=>u.id==='values')+1];
          const a=document.createElement('a');a.href=nextUnit?'#'+nextUnit.id:'/?tab=map';a.className='primary';a.textContent=nextUnit?'다음 개념 · '+nextUnit.title:'학습으로 돌아가기';actions.append(a);
        }
        warn();return;
      }
      content.innerHTML=`<p>${escape(q.prompt)}</p>`;
      if(q.type==='choice'){
        content.insertAdjacentHTML('beforeend',`<pre>${escape(q.code)}</pre><div class="values-options" role="group" aria-label="답 선택">${q.choices.map(choice=>`<button type="button" data-answer="${escape(choice)}" aria-pressed="${r.choice===choice}">${escape(choice)}</button>`).join('')}</div>`);
        content.querySelectorAll('[data-answer]').forEach(b=>{b.disabled=!!r.lastPassed;b.onclick=()=>{const item=state.items[id]||(state.items[id]={});item.choice=b.dataset.answer;content.querySelectorAll('[data-answer]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));done(item.choice===q.answer);};});
      }else{
        content.insertAdjacentHTML('beforeend',`<p class="meta">준비된 값 · text = "${q.n}", capacity = ${q.cap}</p><label for="values-code">내 코드</label><textarea id="values-code" class="code" spellcheck="false" autocapitalize="off" autocomplete="off">${escape(typeof r.draft==='string'?r.draft:q.starter)}</textarea>`);
        const editor=content.querySelector('#values-code');editor.readOnly=!!r.lastPassed;
        editor.oninput=()=>{const item=state.items[id]||(state.items[id]={});item.draft=editor.value;persist();warn();};
        editor.onkeydown=e=>{if(e.key==='Tab'&&!e.shiftKey){e.preventDefault();editor.setRangeText('    ',editor.selectionStart,editor.selectionEnd,'end');editor.dispatchEvent(new Event('input'));}};
        if(!r.lastPassed){
          const hint=document.createElement('details');hint.className='values-hint';hint.innerHTML='<summary>힌트 보기</summary>';
          hint.ontoggle=()=>{if(hint.open){const item=state.items[id]||(state.items[id]={});item.helpUsed=true;persist();if(!hint.querySelector('p')){const p=document.createElement('p');p.textContent=q.reason;hint.append(p);}warn();}};
          content.append(hint);
        }
      }
      const done=(pass,detail='')=>{
        stop();mark(state,pass);
        const feedback=(pass?(state.items[id].lastPassedWithHelp?'도움받아 해결했어요. ':'도움 없이 해결했어요. '):'다시 해봐요. ')+(q.type==='choice'&&!pass?' 정답: '+q.answer+'. ':'')+(detail||q.reason);
        state.items[id].feedbackText=feedback;persist();draw();status(feedback);warn();
      };
      if(r.lastPassed){status((r.lastPassedWithHelp?'도움받아 해결했어요. ':'도움 없이 해결했어요. ')+q.reason);next();}
      else{
        if(r.feedbackUsed)status(r.feedbackText||'다시 해봐요. '+q.reason);
        const check=q.type==='choice'?null:button('코드 확인',()=>{
          if(busy)return;
          const item=state.items[id]||(state.items[id]={});
          const code=content.querySelector('#values-code').value;item.draft=code;persist();warn();
          busy=true;check.disabled=true;content.querySelector('#values-code').readOnly=true;status('코드를 실행하고 있어요. 첫 실행은 시간이 걸릴 수 있어요.');
          const fail=message=>{stop();draw();status(message+' 답안과 시도 횟수는 그대로예요.');};
          try{worker=new Worker('/assets/python-lab-worker.js?v=1');}catch{fail('실행기를 열지 못했어요.');return;}
          timer=setTimeout(()=>fail('실행기를 불러오지 못했어요. 연결을 확인하고 다시 시도해 주세요.'),120000);
          worker.onerror=()=>fail('실행기를 불러오지 못했어요.');
          worker.onmessage=({data:m})=>{
            if(m.stage==='running'){clearTimeout(timer);timer=setTimeout(()=>fail('실행 시간이 너무 길어요. 반복문의 종료 조건을 확인해 주세요.'),15000);}
            else if(m.stage==='error')fail('실행기를 불러오지 못했어요.');
            else if(m.stage==='complete'){
              const results=m.result?.results;
              if(!Array.isArray(results)||results.length!==4){fail('실행 결과를 확인하지 못했어요.');return;}
              const failed=results.find(x=>!x.pass);
              const detail=failed?(failed.errorType==='SyntaxError'?'문법 오류예요. 괄호와 빈칸을 확인해 주세요.':failed.errorType==='NameError'?`정의되지 않은 이름을 사용했어요 (${(failed.error||'').match(/name '([^']+)'/)?.[1]||'이름 확인'}). 함수 이름 int와 변수 이름을 확인해 주세요.`:failed.label+'에서 기대한 결과와 달라요. 먼저 text를 int(text)로 바꾸고, 몫은 //, 나머지는 %를 쓰세요.') :'';
              done(!failed,detail);
            }
          };
          const cancel=document.createElement('button');cancel.type='button';cancel.textContent='실행 중지';cancel.onclick=()=>{stop();draw();status('실행을 중지했어요. 답안은 그대로예요.');};actions.append(cancel);
          worker.postMessage(payload(q,code));
        });
      }
      warn();
    };
    const leave=e=>{if(e.target.closest('a')&&(busy||unsaved)){e.preventDefault();status('작업이 저장되지 않았거나 실행 중이에요. 이 탭에서 마친 뒤 이동해 주세요.');warn();}};
    const unload=e=>{if(unsaved){e.preventDefault();e.returnValue='';}};
    document.addEventListener('click',leave,true);window.addEventListener('beforeunload',unload);
    draw();
    return {stop(){stop();document.removeEventListener('click',leave,true);window.removeEventListener('beforeunload',unload);},safeToReload};
  }
  const api={initial,valid,question,payload,mark,advance,review,count,itemId,mount};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else scope.MeowValuesPath=api;
})(typeof window==='undefined'?globalThis:window);

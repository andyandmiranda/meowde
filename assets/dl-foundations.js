/* MEOWDE DL fundamentals MVP — additive module, isolated progress key. */
(function(root){
'use strict';
const KEY='meowde-dl-foundations-v1';
const units=[
{id:'perceptron',title:'1. 퍼셉트론',prereq:'Python if, 곱셈, 리스트',concept:'퍼셉트론은 입력마다 가중치를 곱해 더한 뒤 편향을 더해요. 점수가 기준 이상이면 1, 아니면 0을 출력해요. 아래 예시는 AND 규칙을 계산해요.',code:`def predict(a, b):
    score = a + b - 1.5
    return int(score >= 0)
print(predict(1, 1))
print(predict(1, 0))`,expected:'1\n0',question:'AND를 구현한 이 퍼셉트론에 (1, 0)을 넣으면?',choices:['1','0','0.5'],answer:1,why:'점수는 1+0−1.5 = −0.5이므로 기준 0보다 작아 0을 반환해요.',transfer:'퍼셉트론 하나는 직선으로 나눌 수 있는 패턴을 표현해요.'},
{id:'network',title:'2. 여러 뉴런과 층',prereq:'함수, 리스트, ReLU',concept:'신경망은 여러 뉴런을 층으로 연결해요. 각 뉴런은 이전 층에서 받은 값을 변환하고, 다음 층으로 넘겨요. ReLU는 음수를 0으로 바꿔요.',code:`def relu(x):
    return max(0, x)
x1, x2 = 2, 1
hidden = [relu(x1 - x2), relu(-x1 + 2*x2)]
output = hidden[0] + hidden[1]
print(hidden)
print(output)`,expected:'[1, 0]\n1',question:'ReLU(-3)의 결과는?',choices:['-3','0','3'],answer:1,why:'ReLU는 0과 입력 중 큰 값을 택하므로 음수는 0이 돼요.',transfer:'은닉층은 입력을 다시 표현하는 중간 계산층이에요.'},
{id:'activation',title:'3. 가중치와 활성화 함수',prereq:'지수 함수와 확률',concept:'가중치는 각 입력의 영향력을 조절하고, 편향은 결정 경계를 옮겨요. 시그모이드는 점수를 0~1 사이 값으로 바꿔요. 출력은 분류 기준과 별개예요.',code:`import math
weight, bias, x = 2.0, -1.0, 0.5
z = weight*x + bias
p = 1/(1+math.exp(-z))
print(round(p, 2))
print(int(p >= 0.5))`,expected:'0.5\n1',question:'시그모이드 출력이 0.4이고 분류 기준이 0.5면?',choices:['클래스 0','클래스 1','정확도 40%'],answer:0,why:'출력 0.4는 기준 0.5보다 작으므로 클래스 0이에요. 한 예측의 출력값은 전체 정확도가 아니에요.',transfer:'모델 출력과 정답 레이블을 구별해요.'},
{id:'training',title:'4. 손실과 학습',prereq:'실제값과 예측값, 반복문',concept:'손실은 예측이 정답과 얼마나 다른지 측정해요. 모델을 학습시킬 때는 손실이 작아지도록 가중치를 반복 조정해요. 여기서는 아주 작은 선형 뉴런을 연습해요.',code:`x, target, w, rate = 2.0, 4.0, 0.0, 0.1
def loss(w):
    return (w*x-target)**2
before = loss(w)
gradient = 2*(w*x-target)*x
w = w-rate*gradient
print(round(before, 2))
print(round(loss(w), 2))`,expected:'16.0\n0.64',question:'첫 가중치 갱신 후 손실이 16에서 0.64로 변했다면?',choices:['손실이 증가했어요','손실이 감소했어요','정확도가 100%예요'],answer:1,why:'0.64는 16보다 작아요. 다만 손실 감소가 곧 시험 데이터 정확도 100%를 뜻하지는 않아요.',transfer:'학습 데이터 손실과 새로운 데이터의 성능은 별도로 평가해요.'},
{id:'prediction',title:'5. 직접 학습하고 예측',prereq:'퍼셉트론, 반복문, 훈련·평가 구분',concept:'이제 작은 퍼셉트론을 학습시켜 AND를 예측해요. 학습용 네 가지 예시를 사용하며 결과는 학습 데이터에서만 확인해요. 실제 일반화 성능을 알려면 별도의 평가 데이터가 필요해요.',code:`training = [(0,0,0),(0,1,0),(1,0,0),(1,1,1)]
w1, w2, bias = 0, 0, 0
for epoch in range(10):
    for a,b,label in training:
        pred = int(w1*a + w2*b + bias > 0)
        error = label - pred
        w1 += error*a
        w2 += error*b
        bias += error
correct = sum(int(int(w1*a+w2*b+bias > 0)==y) for a,b,y in training)
print(f'{correct}/4')
print(int(w1*1+w2*1+bias > 0))`,expected:'4/4\n1',question:'학습에 사용한 4개 데이터에서 4/4가 나왔을 때 올바른 설명은?',choices:['처음 보는 모든 데이터에서도 100%예요','훈련 데이터 정답률이 100%예요','손실이 항상 0이라는 뜻이에요'],answer:1,why:'4/4는 이번 훈련 예시에서 모두 맞혔다는 뜻이에요. 일반화 성능은 별도 평가 데이터로 확인해야 해요.',transfer:'작은 예제의 훈련 성능을 실제 서비스 성능으로 일반화하지 않아요.'}
];
function grade(id,choice){const u=units.find(u=>u.id===id);if(!u||!Number.isInteger(choice)||choice<0||choice>=u.choices.length)return {ok:false,error:'지원하지 않는 답안'};return {ok:true,correct:choice===u.answer,answer:u.choices[u.answer],reason:u.why,next:u.transfer};}
root.MeowdeDLFoundations={KEY,units,grade};
if(typeof document==='undefined'||!document.getElementById('dl-units'))return;
const nav=document.getElementById('dl-units'),lesson=document.getElementById('dl-lesson'),status=document.getElementById('dl-status');
let progress={done:[]},readable=true,writable=true,current=0,pyodide=null,loading=null,runCount=0;
try{const raw=localStorage.getItem(KEY);if(raw!==null){let x=JSON.parse(raw);if(!x||!Array.isArray(x.done)||x.done.some(id=>typeof id!=='string'))throw Error('invalid progress');progress=x;}}catch{readable=false;writable=false;status.textContent='기존 기록을 읽지 못했어요. 원본을 덮어쓰지 않고 이번 화면에서만 연습해요.';}
function persist(next){if(!readable)return false;try{const data=JSON.stringify(next);localStorage.setItem(KEY,data);if(localStorage.getItem(KEY)!==data)throw Error('not saved');progress=next;writable=true;return true;}catch{writable=false;status.textContent='저장에 실패했어요. 진행 기록은 변경하지 않았으며 새로고침 시 사라질 수 있어요.';return false;}}
function text(tag,content){const el=document.createElement(tag);el.textContent=content;return el;}
function activate(index){current=index;render();}
function render(){
nav.replaceChildren();units.forEach((u,i)=>{let b=text('button',u.title+(progress.done.includes(u.id)?' ✓':''));b.type='button';b.setAttribute('aria-current',String(i===current));b.onclick=()=>activate(i);nav.append(b);});
const u=units[current];lesson.replaceChildren();lesson.append(text('h2',u.title),text('p','선수 개념: '+u.prereq),text('p',u.concept));
let code=text('pre',u.code);lesson.append(code);let run=text('button','▶ Python 코드 직접 실행');run.type='button';let out=text('pre','실행 버튼을 누르면 아래에 결과가 나와요.');out.id='dl-code-output';run.onclick=async()=>{let token=++runCount;run.disabled=true;out.textContent='Python 실행 엔진 준비 중…';try{if(!root.loadPyodide){await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/pyodide/v0.28.0/full/pyodide.js';s.onload=resolve;s.onerror=reject;document.head.append(s);});}if(!loading)loading=root.loadPyodide({indexURL:'https://cdn.jsdelivr.net/pyodide/v0.28.0/full/'});pyodide=await loading;const output=await pyodide.runPythonAsync('import contextlib,io\nbuffer=io.StringIO()\nwith contextlib.redirect_stdout(buffer):\n'+u.code.split('\n').map(l=>'    '+l).join('\n')+'\nresult=buffer.getvalue().strip()\nresult');if(token===runCount)out.textContent=String(output);}catch(e){loading=null;if(token===runCount)out.textContent='실행 실패: 엔진 연결을 확인해 주세요. 학습 기록은 그대로예요.';}finally{if(token===runCount)run.disabled=false;}};lesson.append(run,out);
lesson.append(text('h3',u.question));let choices=document.createElement('div');choices.className='dl-choices';const feedback=text('p','');feedback.setAttribute('role','status');u.choices.forEach((choice,i)=>{let b=text('button',choice);b.type='button';b.onclick=()=>{const result=grade(u.id,i);feedback.textContent=(result.correct?'정답! ':'다시 생각해 봐요. ')+result.reason+' 응용: '+result.next;if(result.correct&&!progress.done.includes(u.id)){persist({...progress,done:[...progress.done,u.id]});}renderNavOnly();};choices.append(b);});lesson.append(choices,feedback);let next=text('button',current<units.length-1?'다음 단원 →':'5단계 학습 완료');next.onclick=()=>{if(current<units.length-1)activate(current+1);};lesson.append(next);if(readable&&writable)status.textContent=`완료 ${progress.done.filter(id=>units.some(u=>u.id===id)).length} / 5 · 기존 ML·Python 기록과 분리 저장`;}
function renderNavOnly(){nav.querySelectorAll('button').forEach((b,i)=>{b.textContent=units[i].title+(progress.done.includes(units[i].id)?' ✓':'');});if(readable&&writable)status.textContent=`완료 ${progress.done.filter(id=>units.some(u=>u.id===id)).length} / 5 · 기존 ML·Python 기록과 분리 저장`;}
render();
})(typeof window!=='undefined'?window:globalThis);
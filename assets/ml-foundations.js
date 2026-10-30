/* Original introductory ML explanations and small, deterministic practice problems. */
(function(root){
"use strict";
const KEY="meowde-ml-foundations-v1";
const units=[
{id:"linear",title:"1. Linear Regression",prereq:"변수·함수, NumPy 배열, 좌표와 평균",concept:"회귀는 숫자 값을 예측해요. 직선 y = wx + b에서 w는 기울기, b는 절편이에요. 먼저 입력 x를 넣고 곱셈과 덧셈으로 예측값을 계산해요.",code:"w = 2\nb = 1\nx = 3\ny_hat = w * x + b\nprint(y_hat)  # 7",trace:"x=3에 기울기 2를 곱해 6, 절편 1을 더해 예측값 7을 얻어요.",mistake:"실제값 y와 예측값 y_hat를 혼동하지 마세요. 오차는 둘의 차이입니다.",question:"y = 3x + 2인 모델에 x=4를 넣으면 예측값은?",choices:["12","14","18"],answer:1,why:"3×4+2=14예요. 절편 2를 마지막에 더해야 해요.",transfer:"실제값이 11, 예측값이 14라면 오차(실제−예측)는 −3이에요."},
{id:"logistic",title:"2. Logistic Regression",prereq:"회귀, 확률(0~1), if 조건문",concept:"이름과 달리 분류에 쓰는 모델이에요. 선형 점수 z를 시그모이드 함수에 넣어 0~1 사이 값을 만들고, 정한 기준값과 비교해 클래스를 선택해요.",code:"import math\nz = 0\np = 1 / (1 + math.exp(-z))\nprint(p)  # 0.5",trace:"z=0이면 exp(0)=1이므로 1/(1+1)=0.5예요. p가 0.5 이상이면 양성이라고 정할 수 있어요.",mistake:"0.5라는 확률값 자체가 정답 레이블은 아니에요. 분류 기준값은 별도로 설정해요.",question:"양성 기준이 p≥0.7이고 모델 출력이 p=0.6일 때 결과는?",choices:["양성","음성","모델 오류"],answer:1,why:"0.6은 기준 0.7보다 작으므로 음성으로 분류해요.",transfer:"같은 확률이어도 기준을 0.5로 바꾸면 양성으로 바뀌어요."},
{id:"knn",title:"3. KNN",prereq:"좌표, 거리, 정렬, 다수결",concept:"새 데이터와 가까운 기존 데이터 k개를 찾고, 그 이웃들의 레이블로 예측해요. 거리가 작을수록 가깝고, k의 크기와 거리 척도가 결과에 영향을 줘요.",code:"neighbors = [('A', 1), ('B', 2), ('B', 3)]\n# 가장 가까운 세 이웃의 다수결 → B",trace:"거리 1,2,3인 이웃 세 개를 선택하고 레이블 A 1표, B 2표이므로 B를 예측해요.",mistake:"가장 가까운 단 한 개만 볼 경우는 k=1이에요. k=3이면 세 이웃을 함께 세야 해요.",question:"가까운 3개가 [고양이, 강아지, 강아지]라면 k=3 예측은?",choices:["고양이","강아지","알 수 없음"],answer:1,why:"강아지 2표가 고양이 1표보다 많아요.",transfer:"서로 단위가 다른 특성은 거리 계산에 앞서 스케일 조정을 검토해요."},
{id:"bayes",title:"4. Naive Bayes",prereq:"조건부확률, 곱셈, 분류",concept:"특징이 주어졌을 때 각 클래스가 얼마나 그럴듯한지 비교해요. '나이브'는 클래스가 정해지면 특징들이 조건부 독립이라고 가정한다는 뜻이에요.",code:"score_spam = 0.4 * 0.8  # 0.32\nscore_normal = 0.6 * 0.2  # 0.12\n# 더 큰 점수의 클래스 → 스팸",trace:"스팸의 사전확률 0.4×특징 우도 0.8=0.32, 일반의 0.6×0.2=0.12예요. 여기서는 공통 분모 없이 두 점수를 비교할 수 있어요.",mistake:"0.32를 곧바로 정규화된 사후확률 32%라고 해석하면 안 돼요. 이 문제는 비교 점수예요.",question:"두 클래스 점수가 A=0.18, B=0.27이면 어떤 클래스를 선택하나요?",choices:["A","B","둘 다"],answer:1,why:"비교 점수 0.27이 0.18보다 커서 B를 선택해요.",transfer:"우도가 0인 특징이 여러 개면 점수 전체가 0이 될 수 있어 스무딩을 사용해요."}
];
function grade(id,choice){const unit=units.find(x=>x.id===id);if(!unit||!Number.isInteger(choice)||choice<0||choice>=unit.choices.length)return {ok:false,error:"지원하지 않는 답안"};
return {ok:true,correct:choice===unit.answer,selected:unit.choices[choice],answer:unit.choices[unit.answer],reason:unit.why,next:unit.transfer};}
root.MeowdeMLFoundations={units,grade,KEY};
if(typeof document==="undefined"||!document.getElementById("units"))return;
let saved={done:[]},writable=true,storageIssue="";
try{const raw=localStorage.getItem(KEY);if(raw!==null){const parsed=JSON.parse(raw);if(!parsed||!Array.isArray(parsed.done))throw Error("Invalid ML progress");saved={...parsed,done:parsed.done.filter(id=>units.some(u=>u.id===id))};}}
catch{writable=false;storageIssue="기존 ML 학습 기록을 읽지 못했어요. 원본을 덮어쓰지 않습니다.";}
const status=document.getElementById("storage-status");
function persist(next){if(!writable){status.textContent=storageIssue;return false;}try{localStorage.setItem(KEY,JSON.stringify(next));saved=next;storageIssue="";status.textContent="이 브라우저에 ML 학습 기록을 저장했어요.";return true}
catch{storageIssue="저장 공간 문제로 완료 기록을 저장하지 못했어요. 저장소 확인 후 다시 제출하세요.";status.textContent=storageIssue;return false;}}
let current=units.findIndex(x=>x.id===new URLSearchParams(location.search).get("unit"));if(current<0)current=0;
const nav=document.getElementById("units"),area=document.getElementById("lesson");
function render(){
nav.replaceChildren();
units.forEach((u,i)=>{
 const b=document.createElement("button");
 b.textContent=u.title+(saved.done.includes(u.id)?" ✓":"");
 b.type="button";b.setAttribute("aria-current",String(i===current));
 b.onclick=()=>{current=i;render()};nav.append(b);
});
const u=units[current];area.replaceChildren();
area.className="meowde-subject-card ml-lesson-card";

const pass=document.createElement("p");pass.className="ml-pass-label";pass.textContent="핵심만 보기";
const h=document.createElement("h2");h.textContent=u.title;
const concept=document.createElement("p");concept.className="ml-key-idea";concept.textContent=u.concept;
const pre=document.createElement("pre");pre.textContent=u.code;
area.append(pass,h,concept,pre);

const more=document.createElement("details");more.className="ml-more";
const summary=document.createElement("summary");summary.textContent="더 알고 싶을 때";
more.append(summary);
for(const [name,value] of [["먼저 알면 좋아요",u.prereq],["한 번 더 따라가기",u.trace],["자주 하는 실수",u.mistake]]){
 const p=document.createElement("p"),strong=document.createElement("strong");strong.textContent=name+" · ";
 p.append(strong,document.createTextNode(value));more.append(p);
}
area.append(more);

const prompt=document.createElement("h3");prompt.className="ml-question";prompt.textContent=u.question;area.append(prompt);
const choices=document.createElement("div");choices.className="choices";
const feedback=document.createElement("p");feedback.id="feedback";feedback.setAttribute("role","status");
const action=document.createElement("div");action.className="ml-next-action";
u.choices.forEach((choice,i)=>{
 const b=document.createElement("button");b.textContent=choice;
 b.onclick=()=>{
  const answer=grade(u.id,i);
  feedback.className=answer.correct?"good":"bad";
  feedback.textContent=answer.correct?"정답이에요. "+answer.reason:"다시 해봐요. "+answer.reason;
  action.replaceChildren();
  if(answer.correct){
   if(!saved.done.includes(u.id)){persist({...saved,done:[...saved.done,u.id]});}
   if(saved.done.includes(u.id))nav.children[current].textContent=u.title+" ✓";
   const transfer=document.createElement("p");transfer.className="ml-transfer";transfer.textContent="응용 · "+answer.next;action.append(transfer);
   const next=document.createElement("button");next.type="button";next.className="ml-next";
   next.textContent=current<units.length-1?"다음 단원 →":"학습 마치기";
   next.onclick=()=>{if(current<units.length-1){current++;render();}else location.assign("/ml-foundations.html?tab=my");};
   action.append(next);
  }else status.textContent=storageIssue;
 };
 choices.append(b);
});
area.append(choices,feedback,action);
status.textContent=storageIssue||"완료 "+saved.done.length+" / 4 · 각 단원을 자유롭게 선택할 수 있어요.";
}
render();
})(typeof window!=="undefined"?window:globalThis);

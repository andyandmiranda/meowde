/* MEOWDE ML Practice v1. Isolated from Python/Linux/ML-foundations saved progress. */
(function(root){
"use strict";
const KEY="meowde-ml-practice-v1";
const lessons=[
{id:"data",title:"1. 데이터와 특징",concept:"머신러닝은 예시 데이터에서 규칙을 찾습니다. 특징(feature)은 모델에 주는 숫자이고 정답(label)은 맞히려는 값이에요. 여기에서는 온도만 보고 따뜻한 음료인지 분류해요.",goal:"특징과 정답을 구분하기",code:`records=[(5,0),(10,0),(30,1),(35,1)]\nprint("특징:",[t for t,y in records])\nprint("정답:",[y for t,y in records])`,expected:"특징: [5, 10, 30, 35]\n정답: [0, 0, 1, 1]",question:"(온도, 정답)=(30,1)에서 특징은?",answers:["1","30","(30,1)이 전부 정답"],correct:1,why:"온도 30이 특징, 1이 분류 정답이에요."},
{id:"split",title:"2. 훈련·평가 분리",concept:"모델이 처음 보는 데이터도 잘 맞히는지 확인하려면 학습용(train)과 평가용(test)을 분리해야 해요. 같은 데이터를 외워서 맞힌 점수는 일반화 성능을 보여주지 못해요.",goal:"데이터 누수 없이 평가하기",code:`train=[(5,0),(10,0),(30,1),(35,1)]\ntest=[(8,0),(32,1)]\nprint("학습:",len(train),"평가:",len(test))\nprint("겹침:",len(set(train)&set(test)))`,expected:"학습: 4 평가: 2\n겹침: 0",question:"모델 성능을 판단할 때 더 적절한 데이터는?",answers:["훈련에 쓴 데이터","훈련에 쓰지 않은 평가 데이터","정답을 숨긴 훈련 데이터"],correct:1,why:"훈련에 쓰지 않은 데이터로 평가해야 새 데이터에 대한 성능을 가늠할 수 있어요."},
{id:"train",title:"3. 모델 실제 학습",concept:"두 클래스의 훈련 데이터 평균(중심)을 계산하는 최근접 중심 분류기를 학습해요. 평균을 구하는 것이 학습이고, 두 평균 중 더 가까운 쪽을 고르는 것이 예측이에요. 간단하지만 실제로 데이터에서 모델 값을 만드는 방법이에요.",goal:"데이터에서 모델 파라미터 만들기",code:`train=[(5,0),(10,0),(30,1),(35,1)]\ncenters={}\nfor label in [0,1]:\n    values=[t for t,y in train if y==label]\n    centers[label]=sum(values)/len(values)\nprint(centers)`,expected:"{0: 7.5, 1: 32.5}",question:"학습 후 클래스 1의 중심값은?",answers:["1","17.5","32.5"],correct:2,why:"30과 35의 평균은 32.5예요."},
{id:"predict",title:"4. 처음 보는 값 예측",concept:"훈련 때 계산한 중심값을 이용해 처음 보는 온도 8과 32를 분류해요. 예측 코드를 직접 바꿔도 돼요. 정답을 미리 보고 분류 기준을 바꾸면 공정한 평가는 어려워져요.",goal:"학습한 모델로 예측하기",code:`centers={0:7.5,1:32.5}\ndef predict(t):\n    return min(centers,key=lambda label:abs(t-centers[label]))\nprint(predict(8))\nprint(predict(32))`,expected:"0\n1",question:"온도가 32일 때 모델 예측은?",answers:["0","1","평가 불가"],correct:1,why:"32는 32.5에 가장 가까워 클래스 1로 분류돼요."},
{id:"evaluate",title:"5. 정확도와 한계",concept:"정확도(accuracy)는 맞춘 평가 데이터의 비율이에요. 아래에서는 평가용 2개를 모두 맞혀 100%지만, 데이터가 너무 작아 실제 음료 세계에서 100% 성능을 보장하지 않아요. 자료가 늘면 오류 유형도 확인해야 해요.",goal:"성능을 계산하고 과장을 피하기",code:`centers={0:7.5,1:32.5}\ntest=[(8,0),(32,1)]\ndef predict(t):\n    return min(centers,key=lambda y:abs(t-centers[y]))\ncorrect=sum(predict(t)==y for t,y in test)\naccuracy=correct/len(test)\nprint(f"정확도: {accuracy:.0%}")\nprint(f"맞힌 개수: {correct}/{len(test)}")`,expected:"정확도: 100%\n맞힌 개수: 2/2",question:"평가 데이터 2개를 2개 다 맞혔다면?",answers:["현실에서도 정확도 100%가 보장돼요","해당 2개 평가에서는 100%, 일반화는 아직 몰라요","훈련 정확도가 50%예요"],correct:1,why:"작은 합성 데이터의 2/2는 실제 서비스 성능을 증명하지 못해요."}
];
const grade=(id,answer)=>{const u=lessons.find(u=>u.id===id);return u&&Number.isInteger(answer)&&answer>=0&&answer<u.answers.length?{valid:true,correct:answer===u.correct,why:u.why}:{valid:false,correct:false,why:"답을 선택해 주세요."};};
root.MeowdeMLPractice=Object.freeze({KEY,lessons,grade});
if(!root.document||!root.document.getElementById("mlp-lessons"))return;
const d=root.document,nav=d.getElementById("mlp-lessons"),view=d.getElementById("mlp-view"),status=d.getElementById("mlp-status");
let index=0,progress={completed:[]},storageOK=true,pyodide=null,loader=null,busy=false,ran=false,choice=null;
try{const raw=root.localStorage.getItem(KEY);if(raw){const obj=JSON.parse(raw);if(!obj||!Array.isArray(obj.completed)||obj.completed.some(id=>typeof id!=="string"))throw Error("bad record");progress={completed:obj.completed.filter(id=>lessons.some(u=>u.id===id))};}}catch(e){storageOK=false;}
function save(next){if(!storageOK)return false;try{const raw=JSON.stringify(next);root.localStorage.setItem(KEY,raw);if(root.localStorage.getItem(KEY)!==raw)throw Error("not saved");progress=next;return true;}catch(e){storageOK=false;return false;}}
function el(tag,value){const x=d.createElement(tag);if(value!==undefined)x.textContent=value;return x;}
function showStatus(extra){status.textContent=(storageOK?"저장된 완료: "+progress.completed.length+"/5":"저장소에 접근할 수 없어 진도를 기록하지 않습니다.")+(extra?" · "+extra:"");}
async function getPython(){
if(pyodide)return pyodide;if(loader)return loader;
loader=(async()=>{if(!root.loadPyodide){await new Promise((resolve,reject)=>{const s=d.createElement("script");s.src="https://cdn.jsdelivr.net/pyodide/v0.28.0/full/pyodide.js";s.onload=resolve;s.onerror=()=>reject(Error("Python 엔진을 불러오지 못했어요. 인터넷 연결 확인 후 다시 실행해 주세요."));d.head.append(s);});}
return root.loadPyodide({indexURL:"https://cdn.jsdelivr.net/pyodide/v0.28.0/full/"});})();
try{pyodide=await loader;return pyodide;}catch(e){loader=null;throw e;}
}
function render(){
const u=lessons[index];ran=false;choice=null;nav.replaceChildren();view.replaceChildren();
lessons.forEach((lesson,i)=>{const b=el("button",lesson.title+(progress.completed.includes(lesson.id)?" ✓":""));b.type="button";b.setAttribute("aria-current",i===index?"true":"false");b.onclick=()=>{if(busy)return;index=i;render();};nav.append(b);});
view.append(el("h2",u.title),el("p",u.concept),el("p","학습 목표: "+u.goal));
const editor=el("textarea");editor.value=u.code;editor.rows=10;editor.setAttribute("aria-label","Python 코드 편집기");editor.spellcheck=false;editor.oninput=()=>{ran=false;feedback.textContent="코드를 수정했어요. 다시 실행해야 완료할 수 있어요.";};
const run=el("button","▶ Python 코드 실행");run.type="button";
const output=el("pre","실행 결과가 여기에 나와요.");output.setAttribute("aria-live","polite");
const feedback=el("p","코드를 실행하고 문제를 풀어봐요.");feedback.setAttribute("role","status");
view.append(editor,run,output,el("h3",u.question));
const answers=el("div");answers.className="mlp-answers";
const buttons=[];
u.answers.forEach((answer,i)=>{const b=el("button",answer);b.type="button";b.onclick=()=>{choice=i;buttons.forEach((x,j)=>x.setAttribute("aria-pressed",String(j===i)));tryComplete();};b.setAttribute("aria-pressed","false");buttons.push(b);answers.append(b);});
view.append(answers,feedback);
run.onclick=async()=>{
if(busy)return;busy=true;run.disabled=true;ran=false;output.textContent="Python 실행 환경을 준비하고 있어요…";
try{const py=await getPython();py.runPython("import io,sys");const code=editor.value;
const captured=py.runPython(`_meowde_capture = io.StringIO()\n_meowde_old_stdout = sys.stdout\nsys.stdout = _meowde_capture`);
let error=null;
try{await py.runPythonAsync(code);}catch(e){error=e;}
finally{py.runPython("sys.stdout = _meowde_old_stdout");}
if(error){output.textContent="실행 오류: "+String(error.message||error).slice(0,500);feedback.textContent="코드를 확인하고 다시 실행해 주세요.";return;}
const out=py.runPython("_meowde_capture.getvalue()").trimEnd();output.textContent=out||"(출력 없음)";ran=out===u.expected;
feedback.textContent=ran?"실행 결과 확인! 이제 정답을 선택해요.":"실행은 됐지만 예상 출력과 달라요. 코드를 점검해 보세요.";
if(choice!==null)tryComplete();
}catch(e){output.textContent=String(e.message||e).slice(0,500);feedback.textContent="실행에 실패했어요. 입력한 코드는 그대로 남아 있어요.";ran=false;}
finally{busy=false;run.disabled=false;}
};
function tryComplete(){
if(choice===null)return;
const result=grade(u.id,choice);feedback.textContent=(result.correct?"정답! ":"다시 생각해 봐요. ")+result.why+(result.correct&&!ran?" 먼저 예제를 실행해 주세요.":"");
if(!result.correct||!ran)return;
const completed=progress.completed.includes(u.id)?progress.completed:[...progress.completed,u.id];
if(!save({completed})){feedback.textContent="정답이지만 학습 기록 저장에 실패했어요. 다시 시도하려면 다른 화면으로 이동하지 마세요.";showStatus();return;}
showStatus("코드 실행 + 정답 완료");nav.querySelectorAll("button")[index].textContent=u.title+" ✓";
}
showStatus();
}
render();
})(typeof window!=="undefined"?window:globalThis);

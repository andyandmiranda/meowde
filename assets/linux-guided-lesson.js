(function(){
"use strict";
const el=id=>document.getElementById(id);
let storage;try{storage=window.localStorage;}catch(error){storage={getItem(){throw error;}};}
const progress=window.MeowdeLinuxProgress.open(storage),state=progress.state;
let passed=false;
const titles=["폴더는 파일의 집이야","이렇게 폴더를 만들어요","이제 네가 만들어 봐","다른 이름도 만들 수 있을까?","첫 폴더 만들기, 성공!"];
function node(tag,text){const n=document.createElement(tag);n.textContent=text;return n;}
function notice(){el("storage-status").textContent=progress.issue;}
function save(){progress.save();notice();}
function render(moveFocus=false){
 const step=state.step,target=step===2?"training":"travel";
 passed=(step===2||step===3)&&!!state.solutions[target];
 const body=el("lesson-body"),feedback=el("lesson-feedback"),action=el("lesson-action");
 body.replaceChildren();feedback.textContent="";feedback.className="feedback";
 el("lesson-title").textContent=titles[step];
 el("step-label").textContent=step===4?"레슨 완료":(step+1)+" / 4 · "+["알아보기","예시 보기","직접 해보기","새 문제 풀기"][step];
 el("step-bar").style.width=(step/4*100)+"%";
 el("lesson-progress").setAttribute("aria-valuenow",String(step));
 el("lesson-back").hidden=step===0||step===4;
 el("coach-message").textContent=step===4?"직접 만들고, 다른 이름에도 적용했어. 잘했어!":"사진을 정리할 폴더가 필요해. 하나씩 같이 만들어 볼까?";
 if(step===0){body.append(node("p","Linux에서는 폴더를 ‘디렉터리’라고 불러요. 파일을 담아 두는 공간이에요."),node("p","새 폴더를 만들 때는 mkdir 명령어를 써요."));body.querySelectorAll("p").forEach(p=>p.className="explain");action.textContent="어떻게 쓰는지 보기 →";}
 if(step===1){const p=node("p","mkdir 뒤에 한 칸 띄우고 폴더 이름을 적어요.");p.className="explain";const example=node("div","mkdir photos");example.className="example";const note=node("p","→ photos라는 폴더가 생겨요.");note.className="muted";body.append(p,example,note);action.textContent="직접 만들어 볼래 →";}
 if(step===2||step===3){
  const p=node("p",step===2?"연습 파일을 담을 training 폴더를 만들어 주세요.":"이번에는 여행 사진을 담을 travel 폴더를 만들어 주세요.");p.className="explain";
  const terminal=node("div","");terminal.className="terminal";const label=node("label","명령어 입력");label.htmlFor="lesson-input";
  const input=node("input","");input.id="lesson-input";input.autocomplete="off";input.autocapitalize="off";input.spellcheck=false;input.maxLength=180;input.placeholder="여기에 명령어를 입력해요";input.value=state.input;
  input.addEventListener("input",()=>{passed=false;delete state.solutions[target];state.input=input.value;action.textContent="폴더 만들기";feedback.textContent="";feedback.className="feedback";save();});
  input.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();action.click();}});
  terminal.append(label,input);const hint=node("button","조금 도와줘");hint.className="hint";hint.type="button";hint.onclick=()=>{state.hints[target]=Math.min(2,state.hints[target]+1);feedback.textContent=state.hints[target]===1?"폴더를 만드는 명령어는 mkdir예요.":"mkdir 뒤에 한 칸 띄우고 "+target+"을 적어 보세요.";save();};
  const note=node("p","제한된 브라우저 시뮬레이션이에요. 제출할 때마다 빈 연습 공간에서 확인하며, 기기의 파일은 바뀌지 않아요.");note.className="meta";
  body.append(p,terminal,hint,note);action.textContent=passed?(step===2?"새 문제 풀기 →":"레슨 마치기 →"):"폴더 만들기";
  if(passed){feedback.textContent="폴더를 만든 답안을 다시 확인했어요. 다음으로 이어가세요.";feedback.className="feedback success";}
 }
 if(step===4){const reward=node("div","✦");reward.className="reward";reward.setAttribute("aria-hidden","true");const p=node("p","mkdir + 폴더 이름. 두 문제에서 폴더가 만들어진 결과를 확인했어요.");p.className="explain";const help=node("p",state.hints.travel?"새 문제에서 힌트를 사용했어요. 다음에는 힌트 없이 다른 이름으로 도전해 보세요.":"새 문제는 힌트 버튼을 사용하지 않고 해결했어요.");help.className="muted";body.append(reward,p,help);action.textContent="다른 연습 고르기 →";}
 notice();if(moveFocus)el("lesson-title").focus();
}
el("lesson-action").onclick=()=>{
 const step=state.step;
 if(step===4){location.href="/linux-crash-course.html#more-learning";return;}
 if(step<2||passed){state.step++;state.input="";save();render(true);return;}
 const target=step===2?"training":"travel",input=el("lesson-input");
 // Each submission starts fresh so a prior success cannot make a later wrong answer pass.
 const sim=window.MeowdeLinuxSim.create(),out=sim.run(input.value);
 passed=out.ok&&sim.snapshot().files["/home/student/"+target]?.type==="dir";
 const feedback=el("lesson-feedback");feedback.className="feedback"+(passed?" success":"");
 feedback.textContent=passed?target+" 폴더가 생겼어요! "+(step===2?"이번에는 다른 이름으로 해볼까요?":"다른 이름에도 적용했어요."):(out.ok?"폴더 이름을 "+target+"로 다시 확인해 보세요.":"아직 폴더가 생기지 않았어요. "+out.output);
 state.input=input.value;if(passed){state.solutions[target]=input.value;el("lesson-action").textContent=step===2?"새 문제 풀기 →":"레슨 마치기 →";}save();
};
el("lesson-back").onclick=()=>{if(state.step>0){state.step--;state.input=state.solutions[state.step===2?"training":"travel"]||"";save();render(true);}};
render();
})();

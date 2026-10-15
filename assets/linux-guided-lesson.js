(function(){
"use strict";
const el=id=>document.getElementById(id),sim=window.MeowdeLinuxSim.create();
let step=0,passed=false,hintCount=0;
const titles=["폴더는 파일의 집이야","이렇게 폴더를 만들어요","이제 네가 만들어 봐","다른 이름도 만들 수 있을까?","첫 폴더 만들기, 성공!"];
function node(tag,text){const n=document.createElement(tag);n.textContent=text;return n}
function render(moveFocus=false){
 passed=false;hintCount=0;sim.reset();
 const body=el("lesson-body"),feedback=el("lesson-feedback"),action=el("lesson-action");
 body.replaceChildren();feedback.textContent="";feedback.className="feedback";
 el("lesson-title").textContent=titles[step];
 el("step-label").textContent=step===4?"레슨 완료":(step+1)+" / 4 · "+["알아보기","예시 보기","직접 해보기","새 문제 풀기"][step];
 el("step-bar").style.width=(step/4*100)+"%";
 el("lesson-progress").setAttribute("aria-valuenow",String(step));
 el("lesson-back").hidden=step===0||step===4;
 el("coach-message").textContent=step===4?"직접 만들고, 다른 이름에도 적용했어. 잘했어!":"사진을 정리할 폴더가 필요해. 하나씩 같이 만들어 볼까?";
 if(step===0){body.append(node("p","Linux에서는 폴더를 ‘디렉터리’라고 불러요. 파일을 담아 두는 공간이에요."),node("p","새 폴더를 만들 때는 mkdir 명령어를 써요."));body.querySelectorAll("p").forEach(p=>p.className="explain");action.textContent="어떻게 쓰는지 보기 →"}
 if(step===1){const p=node("p","mkdir 뒤에 한 칸 띄우고 폴더 이름을 적어요.");p.className="explain";const example=node("div","mkdir photos");example.className="example";const note=node("p","→ photos라는 폴더가 생겨요.");note.className="muted";body.append(p,example,note);action.textContent="직접 만들어 볼래 →"}
 if(step===2||step===3){
  const expected=step===2?"training":"travel";
  const p=node("p",step===2?"연습 파일을 담을 training 폴더를 만들어 주세요.":"이번에는 여행 사진을 담을 travel 폴더를 만들어 주세요.");p.className="explain";
  const terminal=node("div","");terminal.className="terminal";const label=node("label","명령어 입력");label.htmlFor="lesson-input";
  const input=node("input","");input.id="lesson-input";input.autocomplete="off";input.autocapitalize="off";input.spellcheck=false;input.placeholder="여기에 명령어를 입력해요";
  input.addEventListener("input",()=>{passed=false;action.textContent="폴더 만들기";feedback.textContent="";feedback.className="feedback"});input.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();action.click()}});
  terminal.append(label,input);const hint=node("button","조금 도와줘");hint.className="hint";hint.type="button";hint.onclick=()=>{hintCount++;feedback.textContent=hintCount===1?"폴더를 만드는 명령어는 mkdir예요.":"mkdir 뒤에 한 칸 띄우고 "+expected+"을 적어 보세요."};
  const note=node("p","여기서는 연습용 폴더만 만들어요. 기기의 파일은 바뀌지 않아요.");note.className="meta";
  body.append(p,terminal,hint,note);action.textContent="폴더 만들기";
 }
 if(step===4){const reward=node("div","✦");reward.className="reward";reward.setAttribute("aria-hidden","true");const p=node("p","mkdir + 폴더 이름. 이제 원하는 이름의 폴더를 만들 수 있어요.");p.className="explain";body.append(reward,p);action.textContent="다른 연습 고르기 →"}
 if(moveFocus)el("lesson-title").focus();
}
el("lesson-action").onclick=()=>{
 if(step===4){location.href="/linux-crash-course.html#more-learning";return}
 if(step<2||passed){step++;render(true);return}
 const expected=step===2?"training":"travel",input=el("lesson-input"),out=sim.run(input.value);
 passed=out.ok&&sim.snapshot().files["/home/student/"+expected]?.type==="dir";
 const feedback=el("lesson-feedback");feedback.className="feedback"+(passed?" success":"");
 feedback.textContent=passed?expected+" 폴더가 생겼어요! "+(step===2?"이번에는 다른 이름으로 해볼까요?":"예시 없이도 해냈어요."):(out.ok?"명령어는 실행됐어요. 폴더 이름을 "+expected+"로 다시 확인해 보세요.":"아직 폴더가 생기지 않았어요. "+out.output);
 if(passed)el("lesson-action").textContent=step===2?"새 문제 풀기 →":"레슨 마치기 →";
};
el("lesson-back").onclick=()=>{if(step>0){step--;render(true)}};
render();
})();

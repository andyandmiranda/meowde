/* One-goal Linux concept path layered over the preserved E1-E9 records. */
(function(){
"use strict";
if(typeof LESSONS==="undefined")return;
const META=[
 {level:"L0 왕초보",goal:"현재 위치와 현재 폴더의 항목을 구별한다.",wrong:["ps는 실행 중인 프로세스를 확인해요.","cat은 파일 내용을 읽어요."]},
 {level:"L1 기초",goal:"파일의 앞부분과 끝부분을 필요한 줄 수만큼 읽는다.",wrong:["head는 파일 앞부분을 읽어요.","cd는 디렉터리를 이동해요."]},
 {level:"L1 기초",goal:"파일 찾기와 파일 내용 검색을 구별한다.",wrong:["mkdir은 디렉터리를 만들어요.","pwd는 현재 위치만 보여줘요."]},
 {level:"L3 중급",goal:"파이프와 덮어쓰기·이어쓰기를 구별한다.",wrong:[">는 기존 내용을 덮어쓸 수 있어요.","|는 출력을 다음 명령의 입력으로 넘겨요."]},
 {level:"L2 초중급",goal:"읽기·쓰기·실행 권한 숫자를 해석한다.",wrong:["777은 모든 사용자에게 모든 권한을 줘요.","755는 소유자만 쓰고 모두 읽고 실행할 수 있어요."]},
 {level:"L2 초중급",goal:"실행 중인 프로세스를 확인하는 명령을 고른다.",wrong:["pwd는 현재 디렉터리를 보여줘요.","touch는 파일을 만들거나 시간을 갱신해요."]},
 {level:"L2 초중급",goal:"Ubuntu 패키지 검색과 설치를 구별한다.",wrong:["apt erase는 이 학습에서 다루는 검색 명령이 아니에요.","pwd는 패키지를 검색하지 않아요."]},
 {level:"L3 중급",goal:"셸 변수 저장과 값 참조 문법을 구별한다.",wrong:["echo name=은 변수 값이 아니라 글자를 출력해요.","print(name)은 Python 문법이에요."]},
 {level:"L3 중급",goal:"경계값을 비교해 if의 실행 분기를 예측한다.",wrong:["25는 30보다 작아서 else로 가지 않아요.","조건문의 출력은 입력값 자체가 아니에요."]}
];
const stageNames=["개념","예제","연습","도전"];
let stage=0,wrongAttempts=0;
const byId=id=>document.getElementById(id);
const make=(tag,text,className)=>{const n=document.createElement(tag);n.textContent=text;if(className)n.className=className;return n;};
persist=function(){
 if(!canPersist)return;
 try{
  const stages=saved.stageByLesson&&typeof saved.stageByLesson==="object"&&!Array.isArray(saved.stageByLesson)?saved.stageByLesson:{};
  saved={...saved,index,done,stageByLesson:stages};
  localStorage.setItem(KEY,JSON.stringify(saved));storageIssue="";
 }catch(error){storageIssue="퀴즈 기록을 저장하지 못했어요. 화면을 닫으면 이번 진행이 사라질 수 있어요.";}
 const status=byId("library-storage-status");if(status)status.textContent=storageIssue;
};
function saveStage(){
 if(!canPersist)return;
 saved.stageByLesson={...(saved.stageByLesson&&typeof saved.stageByLesson==="object"&&!Array.isArray(saved.stageByLesson)?saved.stageByLesson:{}),[index]:stage};
 persist();
}
function renderPath(focus=false){
 const lesson=LESSONS[index],meta=META[index],area=byId("lesson");area.replaceChildren();
 area.append(make("span",meta.level,"linux-level"),make("h2",lesson.title),make("p","학습 목표 · "+meta.goal,"linux-objective"));
 const path=make("ol","","linux-stage-path");path.setAttribute("aria-label","학습 진행");
 stageNames.forEach((name,i)=>{const item=make("li",(i+1)+". "+name);if(stage===i)item.setAttribute("aria-current","step");path.append(item);});area.append(path);
 const panel=make("section","","linux-stage-panel");panel.dataset.stage=String(stage);
 if(stage===0){
  panel.append(make("h3","개념 이해"),make("p",lesson.idea));
  const next=make("button","예제 보기 →","linux-next");next.onclick=()=>{stage=1;saveStage();renderPath(true);};panel.append(next);
 }
 if(stage===1){
  panel.append(make("h3","명령어 예제"),make("pre",lesson.example));
  const next=make("button","직접 연습하기 →","linux-next");next.onclick=()=>{stage=2;saveStage();renderPath(true);};panel.append(next);
 }
 if(stage===2){
  panel.append(make("h3",index<3?"결과로 확인하는 연습":"예제 구조 따라 쓰기"));
  const note=make("p",index<3?"명령을 입력하면 제한된 시뮬레이터가 결과를 확인해요.":"이 명령은 현재 시뮬레이터에서 실행하지 않아요. 예제와 같은 구조인지 확인하는 연습이에요.","sub");
  const input=make("input","");input.setAttribute("aria-label","연습 명령어");input.autocomplete="off";input.autocapitalize="off";input.spellcheck=false;input.placeholder=lesson.cmd;
  const check=make("button","명령어 확인");const feedback=make("p","","linux-feedback");feedback.setAttribute("role","status");
  check.onclick=()=>{
   const raw=input.value;
   if(index<3){
    const result=MeowdeLinuxCommandPractice.grade(index,raw),ok=result.ok;
    feedback.className="linux-feedback "+(ok?"good":"bad");
    feedback.textContent=result.message;
    if(ok){const next=make("button","도전 문제 풀기 →","linux-next");next.onclick=()=>{stage=3;saveStage();renderPath(true);};feedback.after(next);}
   }else{
    const same=raw.trim().replace(/\s+/g," ")===lesson.cmd.replace(/\s+/g," ");
    feedback.className="linux-feedback "+(same?"good":"bad");
    feedback.textContent=same?"예제 구조를 정확히 따라 썼어요. 실제 실행 검증은 지원하지 않아요.":"예제와 다른 부분이 있어요. 공백·옵션·기호를 다시 비교해 보세요.";
    if(same){const next=make("button","도전 문제 풀기 →","linux-next");next.onclick=()=>{stage=3;saveStage();renderPath(true);};feedback.after(next);}
   }
  };
  panel.append(note,input,check,feedback);
 }
 if(stage===3){
  panel.append(make("h3","새 상황에 적용하기"),make("p",lesson.challenge));
  const answers=make("div","","answers"),feedback=make("p","","linux-feedback");feedback.setAttribute("role","status");
  lesson.choices.forEach((choice,i)=>{const b=make("button",choice);b.onclick=()=>{
   if(i===lesson.answer){
    done[index]=true;wrongAttempts=0;persist();feedback.className="linux-feedback good";feedback.textContent="정답이에요. "+lesson.why;
    answers.querySelectorAll("button").forEach(x=>x.disabled=true);
    const next=make("button",index<8?"다음 단원 →":"처음부터 복습 →","linux-next");next.onclick=()=>{index=(index+1)%9;stage=0;saved.stageByLesson={...(saved.stageByLesson||{}),[index]:0};persist();show();window.scrollTo(0,0);};feedback.after(next);
   }else{
    wrongAttempts++;feedback.className="linux-feedback bad";feedback.textContent="아직 아니에요. "+meta.wrong[Math.max(0,i-(i>lesson.answer?1:0))]+(wrongAttempts>1?" 위 개념과 예제를 다시 확인해 보세요.":" 다시 선택할 수 있어요.");
   }
  };answers.append(b);});
  panel.append(answers,feedback);
 }
 area.append(panel);byId("progress").textContent=Object.keys(done).filter(k=>done[k]===true&&/^[0-8]$/.test(k)).length+" / 9단원 개념 확인 완료";
 if(focus)panel.querySelector("h3")?.setAttribute("tabindex","-1"),panel.querySelector("h3")?.focus();
}
const originalShow=show;
show=function(){originalShow();stage=Number(saved.stageByLesson?.[index]);if(!Number.isInteger(stage)||stage<0||stage>3)stage=0;wrongAttempts=0;renderPath();};
show();
})();

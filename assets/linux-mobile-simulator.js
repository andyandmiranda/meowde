/* Restricted, in-memory educational filesystem: never executes shell commands. */
(function(root){
"use strict";
const initial={"/":{type:"dir"},"/home":{type:"dir"},"/home/student":{type:"dir"},"/home/student/notes.txt":{type:"file",text:"Welcome to MEOWDE Linux!\n"},"/home/student/projects":{type:"dir"},"/home/student/app.log":{type:"file",text:"INFO boot\nERROR network\nINFO retry\nERROR timeout\n"}};
function create(){
 let fs=JSON.parse(JSON.stringify(initial)),cwd="/home/student";
 const tokenize=s=>{const parts=s.match(/"[^"]*"|'[^']*'|[^\s]+/g)||[];return parts.map(p=>p.replace(/^(["'])(.*)\1$/,"$2"))};
 const pathOf=s=>{let parts=(s.startsWith("/")?[]:cwd.split("/").filter(Boolean));for(const piece of s.split("/")){if(!piece||piece===".")continue;if(piece==="..")parts.pop();else parts.push(piece)}return "/"+parts.join("/")};
 const parent=p=>p.slice(0,p.lastIndexOf("/"))||"/";
 const name=p=>p.split("/").pop()||"/";
 function run(raw){
  const input=String(raw||"").trim();
  if(!input)return {ok:false,output:"명령어를 입력해 봐."};
  if(input.length>180||/[;&|><`$\\\n\r]/.test(input))return {ok:false,output:"이 학습 터미널에서는 연결·리디렉션·치환 명령을 지원하지 않아."};
  const a=tokenize(input),cmd=a.shift(),args=a.filter(x=>x!=="");
 const within=p=>p==="/home/student"||p.startsWith("/home/student/");
  const invalid=()=>({ok:false,output:"지원하지 않는 형식이야. 이 터미널은 제한된 학습용 시뮬레이터야."});
  if(["ls","cd","mkdir","touch","cat","cp","mv","head","tail","grep","find"].includes(cmd)&&args.some(x=>!within(pathOf(x))))return {ok:false,output:"학습 공간 밖에는 접근할 수 없어."};
  const ok=output=>({ok:true,output:output||"(완료)",cwd});
  const err=output=>({ok:false,output});
  const read=p=>fs[p];

  if(cmd==="pwd")return args.length?invalid():ok(cwd);
  if(cmd==="ls"){if(args.length>1)return invalid();const p=pathOf(args[0]||".");if(!read(p))return err("해당 경로가 없어.");if(read(p).type==="file")return ok(name(p));return ok(Object.keys(fs).filter(k=>parent(k)===p&&k!==p).map(name).sort().join("  ")||"(비어 있음)")}
  if(cmd==="cd"){if(args.length>1)return invalid();const p=pathOf(args[0]||"/home/student");if(!read(p)||read(p).type!=="dir")return err("이동할 폴더가 없어.");cwd=p;return ok(cwd)}
  if(["mkdir","touch"].includes(cmd)){if(args.length!==1)return invalid();const p=pathOf(args[0]);if(read(p))return err("이미 존재해.");if(!read(parent(p))||read(parent(p)).type!=="dir")return err("상위 폴더가 없어.");fs[p]=cmd==="mkdir"?{type:"dir"}:{type:"file",text:""};return ok(name(p)+" 생성됨")}
  if(cmd==="cat"){if(args.length!==1)return invalid();const p=pathOf(args[0]);return read(p)?.type==="file"?ok(read(p).text||"(빈 파일)"):err("읽을 파일이 없어.")}
  if(cmd==="head"||cmd==="tail"){
   if(args.length!==3||args[0]!=="-n"||!/^[1-9][0-9]?$/.test(args[1]))return invalid();
   const node=read(pathOf(args[2]));if(!node||node.type!=="file")return err("읽을 파일이 없어.");
   const lines=node.text.replace(/\n$/,"").split("\n"),count=Number(args[1]);
   return ok((cmd==="head"?lines.slice(0,count):lines.slice(-count)).join("\n"));
  }
  if(cmd==="grep"){
   if(args.length!==2&&!(args.length===3&&args[0]==="-n"))return invalid();
   const withNum=args[0]==="-n",pattern=args[withNum?1:0],p=pathOf(args[withNum?2:1]),node=read(p);
   if(!node||node.type!=="file")return err("검색할 파일이 없어.");
   const found=node.text.replace(/\n$/,"").split("\n").map((line,i)=>({line,i})).filter(x=>x.line.includes(pattern));
   return found.length?ok(found.map(x=>(withNum?(x.i+1)+":":"")+x.line).join("\n")):err("일치하는 내용이 없어.");
  }
  if(cmd==="find"){
   if(args.length!==3||args[1]!=="-name"||!args[2]||args[2].includes("/"))return invalid();
   const base=pathOf(args[0]);if(read(base)?.type!=="dir")return err("검색 시작 폴더가 없어.");
   const pat=args[2],matches=n=>pat.startsWith("*.")?n.endsWith(pat.slice(1)):n===pat;
   const paths=Object.keys(fs).filter(k=>k.startsWith(base==="/"?"/":base+"/")&&matches(name(k))).sort();
   return ok(paths.length?paths.join("\n"):"(검색 결과 없음)");
  }
  if(cmd==="cp"||cmd==="mv"){if(args.length!==2)return invalid();const from=pathOf(args[0]),toArg=pathOf(args[1]);const node=read(from);if(!node||node.type!=="file")return err("복사·이동할 파일이 없어. 현재는 파일만 지원해.");const to=read(toArg)?.type==="dir"?toArg+"/"+name(from):toArg;if(from===to)return err("출발지와 목적지가 같아.");if(!read(parent(to))||read(parent(to)).type!=="dir")return err("목적지 폴더가 없어.");if(read(to))return err("기존 파일을 덮어쓸 수 없어.");fs[to]={...node};if(cmd==="mv")delete fs[from];return ok(cmd==="cp"?"파일 복사 완료":"파일 이동 완료")}
  return invalid();
 }
 return {run,snapshot:()=>({cwd,files:JSON.parse(JSON.stringify(fs))}),reset:()=>{fs=JSON.parse(JSON.stringify(initial));cwd="/home/student"}};
}
root.MeowdeLinuxSim={create};
})(typeof window!=="undefined"?window:globalThis);
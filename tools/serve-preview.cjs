"use strict";
// Local static server honoring Vercel routes before filesystem matching. Never executes learner input.
const http=require("node:http"),fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,".."),port=Number(process.env.PORT||4173);
const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".svg":"image/svg+xml",".png":"image/png",".webp":"image/webp",".webmanifest":"application/manifest+json"};
http.createServer((req,res)=>{
 try{
  const url=new URL(req.url,"http://localhost"),config=JSON.parse(fs.readFileSync(path.join(root,"vercel.json"),"utf8"));
  let requested=decodeURIComponent(url.pathname);
  for(const route of config.routes||[]){if(route.handle==="filesystem")break;if(route.src&&new RegExp(route.src).test(requested)){requested=route.dest;break;}}
  if(requested==="/")requested="/index.html";
  const file=path.resolve(root,"."+requested);
  if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
  fs.readFile(file,(error,data)=>{res.writeHead(error?404:200,{"Content-Type":mime[path.extname(file)]||"application/octet-stream","Cache-Control":"no-store"});res.end(error?"Not found":data);});
 }catch{res.writeHead(400);res.end();}
}).listen(port,"127.0.0.1",()=>console.log("Meowde local preview: http://127.0.0.1:"+port));

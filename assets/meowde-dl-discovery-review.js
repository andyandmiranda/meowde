/* Additive DL discovery for legacy Python hub. No progress writes or original file edits. */
(function(){
  "use strict";
  const root=document.getElementById("app");
  if(!root)return;
  function patch(){
    const hub=root.querySelector(".meowde-subject-overview");
    if(!hub)return;
    const options=hub.querySelector(".subject-options");
    if(!options)return;
    const old=[...options.querySelectorAll('span[aria-disabled="true"]')].find(
      el=>el.querySelector("b")?.textContent.trim()==="딥러닝"
    );
    if(old){
      const link=document.createElement("a");
      const title=document.createElement("b");
      const detail=document.createElement("small");
      link.href="/deep-learning.html";
      link.className="meowde-dl-available";
      title.textContent="딥러닝";
      detail.textContent="입문 4단원 · 학습 가능";
      link.append(title,detail);
      old.replaceWith(link);
    }
    const note=hub.querySelector(".overview-note");
    if(note){
      const text=[...note.childNodes].find(n=>n.nodeType===Node.TEXT_NODE);
      if(text && text.textContent.includes("나머지 3과목은 준비 중")){
        text.textContent=text.textContent.replace(
          "Python·Linux·머신러닝은 학습 가능하고, 나머지 3과목은 준비 중이에요.",
          "Python·Linux·머신러닝·딥러닝 입문은 학습 가능하고, 데이터 분석·AI 로보틱스는 준비 중이에요."
        );
      }
    }
  }
  patch();
  if(window.MutationObserver){
    new MutationObserver(patch).observe(root,{childList:true,subtree:true});
  }
})();

(function applyMeowdeV451Contact(){
  "use strict";

  const FEEDBACK_URL="https://amis-os.vercel.app/feedback";

  function label(){
    return typeof S!=="undefined"&&S&&S.lang==="ko"
      ? "피드백 & 문의 ↗"
      : "Feedback & Contact ↗";
  }
  function markup(){
    const text=label();
    return `<div class="v451-contact"><a href="${FEEDBACK_URL}" target="_blank" rel="noopener noreferrer" aria-label="${text.replace(" ↗","")}">${text}</a></div>`;
  }

  // Phase 5-3: Home owns this markup directly. Keep API compatibility only.
  function inject(){return false}

  window.MeowContact={inject,markup,label,url:FEEDBACK_URL,destroy:function(){}};
  document.documentElement.dataset.homeContactSurface="canonical-v414";
})();
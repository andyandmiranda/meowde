(function assembleMeowdeV449Sprite(){
  "use strict";

  const parts=window.__MEOWDE_V449_SPRITE_PARTS__||[];
  if(parts.length!==3){
    console.error("Meowde v4.49 sprite parts are incomplete.",parts.length);
    return;
  }

  window.__MEOWDE_V449_SPRITE__=`data:image/webp;base64,${parts.join("")}`;
  delete window.__MEOWDE_V449_SPRITE_PARTS__;
})();

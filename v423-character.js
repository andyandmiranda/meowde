(function loadMeowdeV437CharacterMaster(){
  "use strict";

  window.MeowLegacyCharacter = Object.freeze({
    version: "4.23-retired",
    renderer: "MeowCharacterMaster",
    active: false
  });

  window.setTimeout(function(){
    if(window.MeowCharacterMaster || document.getElementById("meowde-v437-character")) return;
    const script = document.createElement("script");
    script.id = "meowde-v437-character";
    script.src = "/v437-character-recovery.js?v=437";
    script.async = false;
    script.onerror = function(){
      console.error("Meowde v4.37 character master failed to load.");
    };
    document.body.appendChild(script);
  }, 0);
})();

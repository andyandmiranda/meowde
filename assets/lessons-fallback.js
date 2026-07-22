/*
 * Meowde v4.23 runtime fallback bootstrap.
 * Canonical lesson assets load before this file. The normal path exits without
 * downloading or parsing a second copy of the lesson dataset.
 */
(function bootstrapMeowdeFallback() {
  const hasKo = Array.isArray(window.MEOWDE_LESSONS_KO);
  const hasEn = Array.isArray(window.MEOWDE_LESSONS_EN);

  if (hasKo && hasEn) {
    window.__MEOWDE_FALLBACK_STATUS__ = "not-needed";
    return;
  }

  const scripts = [];

  if (!hasKo) {
    scripts.push(
      '<script src="/assets/lessons-ko.js?v=423-fallback"></script>'
    );
  }

  if (!hasEn) {
    scripts.push(
      '<script src="/assets/lessons-en.js?v=423-fallback"></script>'
    );
  }

  scripts.push(
    "<script>(function(){" +
      "var ready=Array.isArray(window.MEOWDE_LESSONS_KO)&&" +
      "Array.isArray(window.MEOWDE_LESSONS_EN);" +
      "if(ready){" +
        "window.MEOWDE_FALLBACK_DATA={" +
          "ko:window.MEOWDE_LESSONS_KO," +
          "en:window.MEOWDE_LESSONS_EN" +
        "};" +
        'window.__MEOWDE_FALLBACK_STATUS__="retry-succeeded";' +
      "}else{" +
        'window.__MEOWDE_FALLBACK_STATUS__="retry-failed";' +
      "}" +
    "})();</script>"
  );

  window.__MEOWDE_FALLBACK_STATUS__ = "retry-requested";
  document.write(scripts.join(""));
})();

const CACHE_PREFIX = "meowde-";
const CACHE_NAME = "meowde-v491-learning-overview";

const REQUIRED_ASSETS = [
  "/assets/meowde-pink-unified.css",
  "/assets/together.js",
  "/assets/vendor/qrcode-generator-2.0.4.js",
  "/assets/lesson-access-policy.js",
  "/assets/lesson-learning-polish.js",
  "/assets/lesson-qa-report.js",
  "/assets/linux-shared-navigation.js",
  "/assets/linux-shared-navigation.css",
  "/assets/linux-learning-ui.css",
  "/assets/linux-focus-flow.css",
  "/assets/linux-command-practice.js",
  "/assets/linux-course-path.js",
  "/python-lab.html",
  "/assets/python-lab-content.json",
  "/assets/python-lab.css",
  "/assets/python-lab.js",
  "/assets/python-values-path.js",
  "/assets/python-lab-update.js",
  "/assets/python-lab-worker.js",
  "/assets/python-lab-entry.js",
  "/",
  "/v412.html",
  "/index.html",
  "/learning-path.html",
  "/linux-review.html",
  "/assets/focused-review-store.js",
  "/assets/python-focused-review.js",
  "/assets/linux-focused-review.js",
  "/assets/learning-path.js",
  "/assets/learning-readiness.json",
  "/assets/tester-report.js",
  "/assets/lessons-ko.js",
  "/assets/lessons-en.js",
  "/assets/meowde-approved-base.svg",
  "/assets/meowde-approved-glasses.svg",
  "/assets/meowde-approved-headphones.svg",
  "/assets/meowde-approved-hero.svg",
  "/assets/characters/v451/meowde-coding.webp",
  "/assets/characters/v451/meowde-music.webp",
  "/assets/characters/v451/meowde-reading.webp",
  "/assets/characters/v451/meowde-happy.webp",
  "/assets/characters/v451/meowde-challenge.webp",
  "/assets/characters/v451/meowde-debug.webp",
  "/assets/characters/v452-cutouts/meowde-coding.webp",
  "/assets/characters/v452-cutouts/meowde-music.webp",
  "/assets/characters/v452-cutouts/meowde-reading.webp",
  "/assets/characters/v452-cutouts/meowde-happy.webp",
  "/assets/characters/v452-cutouts/meowde-challenge.webp",
  "/assets/characters/v452-cutouts/meowde-debug.webp",
  "/assets/characters/layrn/pose_01.png",
  "/assets/characters/layrn/pose_05.png",
  "/assets/characters/layrn/pose_06.png",
  "/assets/characters/layrn/pose_reading_alert.png",
  "/assets/characters/layrn/pose_reading_book.png",
  "/assets/characters/layrn/pose_reading_cozy.png",
  "/assets/characters/layrn/tab_home.png",
  "/assets/characters/layrn/tab_resource.png",
  "/manifest.webmanifest",
  "/icons/meowde-approved.svg",
  "/icons/meowde-approved-maskable.svg",
  "/icons/meowde-approved-192.png",
  "/icons/meowde-approved-512.png",
  "/icons/meowde-approved-maskable-192.png",
  "/icons/meowde-approved-maskable-512.png",
  "/icons/meowde-approved-touch-180.png",
  "/v412-hotfix.js",
  "/v413-core.js",
  "/v413-lesson.js",
  "/v413-ux.css",
  "/v414-state.js",
  "/v414-reward.js",
  "/v414-screens.js",
  "/v414-ux.css",
  "/v415-retention.js",
  "/v415-ux.css",
  "/v416-journey.js",
  "/v416-ux.css",
  "/v417-review.js",
  "/v417-ux.css",
  "/v418-coach.js",
  "/v418-coach.css",
  "/v419-achievements.js",
  "/v419-achievements.css",
  "/v420-profile.js",
  "/v420-profile.css",
  "/v421-vault.js",
  "/v421-vault.css",
  "/v422-pwa.css",
  "/v422-pwa.js",
  "/v423-brand.css",
  "/v423-character.js",
  "/v425-state.js",
  "/v425-playful.js",
  "/v425-playful.css",
  "/v427-growth.js",
  "/v428-events.js",
  "/v429-quests.js",
  "/v429-quests.css",
  "/v430-character.js",
  "/v430-character.css",
  "/v431-stability.js",
  "/v431-stability.css",
  "/v432-humor.js",
  "/v432-humor.css",
  "/v433-learning.js",
  "/v433-learning.css",
  "/v434-release.js",
  "/v434-release.css",
  "/v442-map-touch.js",
  "/v442-map-touch.css",
  "/v443-single-companion.js",
  "/v443-single-companion.css",
  "/v444-visual-cohesion.js",
  "/v444-visual-cohesion.css",
  "/v446-update-recovery.js",
  "/v446-update-recovery.css",
  "/v449-character-cutouts.js",
  "/v449-character-cutouts.css",
  "/v452-curriculum.js",
  "/v453-curriculum-practice.js",
  "/v454-input-practice.js",
  "/v455-write-grading.js",
  "/v456-unit4-data.js",
  "/v457-diagnostic-feedback.js",
  "/v457-diagnostic-feedback.css",
  "/v458-unit5-data.js",
  "/v459-unit5-integration.js",
  "/v459-unit5-integration.css",
  "/v461-unit6-oop.js",
  "/v461-unit6-en.js",
  "/v462-unit6-integration.js",
  "/linux-home.html",
  "/linux-loops-intro.html",
  "/linux-start.html",
  "/linux-crash-course.html",
  "/robotics.html",
  "/content-notice.html",
  "/assets/linux-guided.css",
  "/assets/linux-mobile-simulator.js",
  "/assets/linux-guided-progress.js",
  "/assets/linux-guided-lesson.js",
  "/assets/linux-home-progress.js",
  "/assets/linux-library-view.js",
  "/assets/linux-condition-practice.js",
  "/assets/linux-bash-practice.js",
  "/assets/subject-navigation.js"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(REQUIRED_ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(names.filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME).map(name => caches.delete(name))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const requestUrl = new URL(request.url);
  if (requestUrl.origin !== self.location.origin) return;
  const isHtmlRequest = request.mode === "navigate" || requestUrl.pathname.endsWith(".html");

  if (isHtmlRequest) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put(request, copy)));
          }
          return response;
        })
        .catch(async () =>
          (await caches.match(request, { ignoreSearch: true })) ||
          (await caches.match("/v412.html")) ||
          (await caches.match("/index.html")) ||
          Response.error()
        )
    );
    return;
  }

  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (!response || !response.ok) return response;
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.put(request,copy)));
        return response;
      });
    })
  );
});

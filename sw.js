const CACHE_PREFIX = "meowde-";
const CACHE_NAME = "meowde-v447-header-flow-v1";

const REQUIRED_ASSETS = [
  "/",
  "/v412.html",
  "/index.html",
  "/assets/lessons-ko.js",
  "/assets/lessons-en.js",
  "/assets/meowde-approved-base.svg",
  "/manifest.webmanifest",
  "/meowde-icon-192.svg",
  "/meowde-icon-512.svg",
  "/icons/meowde-180.png",
  "/icons/meowde-192.png",
  "/icons/meowde-512.png",
  "/icons/meowde-maskable-192.png",
  "/icons/meowde-maskable-512.png",
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
  "/v447-header-flow.js",
  "/v447-header-flow.css"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(REQUIRED_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter(
              (cacheName) =>
                cacheName.startsWith(CACHE_PREFIX) && cacheName !== CACHE_NAME
            )
            .map((cacheName) => caches.delete(cacheName))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const requestUrl = new URL(request.url);
  if (requestUrl.origin !== self.location.origin) return;

  const isHtmlRequest =
    request.mode === "navigate" || requestUrl.pathname.endsWith(".html");

  if (isHtmlRequest) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const responseCopy = response.clone();
            event.waitUntil(
              caches.open(CACHE_NAME).then((cache) => cache.put(request, responseCopy))
            );
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
    caches.match(request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(request).then((response) => {
        if (!response || !response.ok) return response;
        const responseCopy = response.clone();
        event.waitUntil(
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseCopy))
        );
        return response;
      });
    })
  );
});

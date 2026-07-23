const CACHE_NAME = "meowde-v423-shell-v8";

const REQUIRED_ASSETS = [
  "/",
  "/v412.html",
  "/index.html",
  "/assets/lessons-ko.js",
  "/assets/lessons-en.js",
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
  "/v423-brand.css",
  "/v422-pwa.js",
  "/v423-character.js"
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
            .filter((cacheName) => cacheName !== CACHE_NAME)
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

  if (request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(request.url);

  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  const isHtmlRequest =
    request.mode === "navigate" || requestUrl.pathname.endsWith(".html");

  if (isHtmlRequest) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const responseCopy = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseCopy);
            });
          }

          return response;
        })
        .catch(async () => {
          return (
            (await caches.match(request, { ignoreSearch: true })) ||
            (await caches.match("/v412.html")) ||
            (await caches.match("/index.html")) ||
            Response.error()
          );
        })
    );

    return;
  }

  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((response) => {
        if (!response || !response.ok) {
          return response;
        }

        const responseCopy = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseCopy);
        });

        return response;
      });
    })
  );
});

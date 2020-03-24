var CACHE_NAME = "Cryptocurrency-1920";
var urlsToCache = [
  "/css/index.css",
  "/img/background.jpg",
  "/img/icons/favicon.png",
  "/js/chart.min.js",
  "/offline"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
      .catch(function() {
        return caches.match("/offline");
      })
  );
});

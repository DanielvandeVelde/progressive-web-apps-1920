var CACHE_NAME = "Cryptocurrency-1920";
var urlsToCache = ["/img/", "/css/index.css", "/css/reset.css"];

self.addEventListener("install", function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

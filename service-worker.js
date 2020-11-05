const CACHE_NAME = "fwa-v2";
const urlsToCache = [
  "/",
  "/manifest.json",
  "/detail-team.html",
  "/index.html",
  "/index.js",
  "/push-notification.js",
  "/pages/function-pages/home-nav.html",
  "/pages/function-pages/detail-team-nav.html",
  "/pages/favorite.html",
  "/pages/home.html",
  "/pages/standings.html",
  "/pages/detail-team-page.html",
  "/pages/teams.html",
  "/pages/contact.html",
  "/script/api/api-listener.js",
  "/script/api/api-handler.js",
  "/script/api/api-render.js",
  "/script/module/detail-module.js",
  "/script/db/db-listener.js",
  "/script/db/db-handler.js",
  "/script/db/idb.js",
  "/script/push/register-notification.js",
  "/script/initialization.js",
  "/script/register-service-worker.js",
  "/script/main.js",
  "/script/detail-team-main.js",
  "/script/materialize/materialize.min.js",
  "/styles/css/materialize.min.css",
  "/styles/css/style.css",
  "/styles/images/gallery/1.jpg",
  "/styles/images/gallery/2.jpg",
  "/styles/images/gallery/3.jpg",
  "/styles/images/gallery/4.jpg",
  "/styles/images/gallery/5.jpg",
  "/styles/images/gallery/6.jpg",
  "/styles/images/gallery/7.jpg",
  "/styles/images/gallery/8.jpg",
  "/styles/images/bg-bola.jpg",
  "/styles/images/player.png",
  "/styles/images/icons/apple-touch-icon-57x57.png",
  "/styles/images/icons/apple-touch-icon-114x114.png",
  "/styles/images/icons/apple-touch-icon-72x72.png",
  "/styles/images/icons/apple-touch-icon-144x144.png",
  "/styles/images/icons/apple-touch-icon-60x60.png",
  "/styles/images/icons/apple-touch-icon-120x120.png",
  "/styles/images/icons/apple-touch-icon-76x76.png",
  "/styles/images/icons/apple-touch-icon-152x152.png",
  "/styles/images/icons/favicon-196x196.png",
  "/styles/images/icons/favicon-96x96.png",
  "/styles/images/icons/favicon-32x32.png",
  "/styles/images/icons/favicon-16x16.png",
  "/styles/images/icons/favicon-128.png",
  "/styles/images/icons/mstile-144x144.png",
  "/styles/images/icons/mstile-70x70.png",
  "/styles/images/icons/mstile-150x150.png",
  "/styles/images/icons/mstile-310x150.png",
  "/styles/images/icons/mstile-310x310.png",
  "/styles/images/icons/Icon-512.png",
  "/styles/images/icons/Icon-192.png",
  "/styles/images/icons/maskable_icon.png",
  "/styles/images/icons/favicon.ico",
  "https://unpkg.com/aos@2.3.1/dist/aos.css",
  "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/parallax/3.1.0/parallax.min.js",
  "https://unpkg.com/aos@2.3.1/dist/aos.js",
];

//Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

//Delete Old Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName != CACHE_NAME) {
            caches.delete(cacheName);

            console.log("Delete Older Cache : ", cacheName);
          }
        })
      )
    )
  );
});

//Fetch Service Worker

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      return caches.open(CACHE_NAME).then((cache) => {
        var fetchResponse = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return cacheResponse || fetchResponse;
      });
    })
  );
});
// self.addEventListener("fetch", function (event) {
//   var base_url = "https://api.football-data.org";
//   if (event.request.url.indexOf(base_url) > -1) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(function (cache) {
//         return fetch(event.request).then(function (response) {
//           cache.put(event.request.url, response.clone());
//           return response;
//         });
//       })
//     );
//   } else {
//     event.respondWith(
//       caches
//         .match(event.request, { ignoreSearch: true })
//         .then(function (response) {
//           return response || fetch(event.request);
//         })
//     );
//   }
// });

//Response to Push Notification
self.addEventListener("push", (event) => {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "img/notification.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});

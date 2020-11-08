importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) console.log(`Workbox berhasil dimuat`);
else console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute(
  [
    { url: "/index.html", revision: "1" },
    { url: "/manifest.json", revision: "1" },
    { url: "/detail-team.html", revision: "1" },
    { url: "/pages/detail-team-page.html", revision: "1" },
    { url: "/pages/function-pages/detail-team-nav.html", revision: "1" },
    { url: "/pages/function-pages/home-nav.html", revision: "1" },
    { url: "/pages/standings.html", revision: "1" },
    { url: "/pages/favorite.html", revision: "1" },
    { url: "/pages/home.html", revision: "1" },
    { url: "/pages/teams.html", revision: "1" },
    { url: "/styles/css/materialize.min.css", revision: "1" },
    { url: "/script/materialize/materialize.min.js", revision: "1" },
    { url: "/styles/css/style.css", revision: "1" },
    { url: "/index.js", revision: "1" },
    { url: "/script/main.js", revision: "1" },
    { url: "/script/initialization.js", revision: "1" },
    { url: "/script/detail-team-main.js", revision: "1" },
    { url: "/script/push/register-notification.js", revision: "1" },
    { url: "/script/register-service-worker.js", revision: "1" },
    { url: "/script/module/detail-module.js", revision: "1" },
    { url: "/script/db/db-handler.js", revision: "1" },
    { url: "/script/db/db-listener.js", revision: "1" },
    { url: "/script/db/idb.js", revision: "1" },
    { url: "/script/api/api-listener.js", revision: "1" },
    { url: "/script/api/api-handler.js", revision: "1" },
    { url: "/script/api/api-render.js", revision: "1" },
  ],
  {
    ignoreUrlParametersMatching: [/.*/],
  }
);

workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/v2"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "cache-api",
    cacheExpiration: {
      maxAgeSeconds: 60 * 30,
    },
  })
);

workbox.routing.registerRoute(
  new RegExp("/pages/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "cache-pages",
  })
);

workbox.routing.registerRoute(
  new RegExp(".(png|svg|jpg|jpeg)$"),
  workbox.strategies.cacheFirst({
    cacheName: "cache-image",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 7,
        maxEntries: 50,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

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

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
    { url: "https://unpkg.com/aos@2.3.1/dist/aos.css", revision: "1" },
    {
      url:
        "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
      revision: "1",
    },
    {
      url:
        "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css",
      revision: "1",
    },
    {
      url: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js",
      revision: "1",
    },
    {
      url:
        "https://cdnjs.cloudflare.com/ajax/libs/parallax/3.1.0/parallax.min.js",
      revision: "1",
    },
    {
      url: "https://unpkg.com/aos@2.3.1/dist/aos.js",
      revision: "1",
    },
  ],
  {
    ignoreUrlParametersMatching: [/.*/],
  }
);

// Fonts Cache
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: "google-fonts-webfonts",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);
// Fonts Cache

// Team-Icona Cache
workbox.routing.registerRoute(
  new RegExp("https://crests\\.football-data\\.org.*\\.svg"),
  workbox.strategies.cacheFirst({
    cacheName: "team-icon",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);
// Team-Icona Cache

// API Cache
workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "cache-api",
  })
);
// API Cache

// Images Cache
workbox.routing.registerRoute(
  /.*.(?:png|jpg|jpeg|svg|gif|crests.football-data.org)/,
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
// Images Cache

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


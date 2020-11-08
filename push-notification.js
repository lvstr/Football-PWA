let webPush = require("web-push");

const publicKey =
  "BFhgJvhAbIT1vtxAG0URxePfx-wydXmLL1USc_wpGRJUQgk7KHVTtun7DoemqBlJLkHYR7s-zehdBKW_9-if4io";
const privateKey = "9nTwrjoFUpM7W4QPk4INft6T1lDQ8vEJjRDPmGwj6ww";

const vapidKeys = {
  publicKey: publicKey,
  privateKey: privateKey,
};

webPush.setVapidDetails(
  "mailto:kaibro55621@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
let pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/cNrp37sIGBc:APA91bGmJdI1pZJ3IWHvfnBvU2dgtmQ-0JeaP8v1KbOTqYvL81ONMo8TWDEoC0wk92ZpySVlg6rVB0oCqrysHas_WWQCqlT9veNNn1Pq4TAJ0XUvlfpTUJdMmXs-T3QYDtSoAXNnGlpd",
  keys: {
    p256dh:
      "BH9s+JQjhdsmyHBcz0guK3JdFW2CZE17si7nDWwBHH2pvKEpvg/sq1KhOfAFbZhHiXUH/ZbHjmY0oGyjCIbtN2Y=",
    auth: "COUaRUnrcvIHqc2xwrT1pA==",
  },
};
let payload = `Terdapat Update baru`;

let options = {
  gcmAPIKey: "638199636745",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);

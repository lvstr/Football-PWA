import { requestPermission } from "./push/register-notification.js";

// Register service worker
const registerServiceWorker = () => {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((registration) => {
      console.log("Registrasi service worker berhasil.");
      registration;
    })
    .catch((error) => {
      console.error("Registrasi service worker gagal.", error);
    });
};

if (!("serviceWorker" in navigator)) {
  console.log("Service worker tidak didukung browser ini.");
} else {
  registerServiceWorker();
  requestPermission();
}

const publicKey =
  "BFhgJvhAbIT1vtxAG0URxePfx-wydXmLL1USc_wpGRJUQgk7KHVTtun7DoemqBlJLkHYR7s-zehdBKW_9-if4io";
const privateKey = "9nTwrjoFUpM7W4QPk4INft6T1lDQ8vEJjRDPmGwj6ww";

let requestPermission = () => {
  if ("Notification" in window) {
    Notification.requestPermission().then((result) => {
      if (result === "denied") {
        console.log("Fitur notifikasi tidak diijinkan.");
      } else if (result === "default") {
        console.log("Pengguna menutup kotak dialog permintaan ijin.");
      }
      console.log("Notifikasi diijinkan");

      navigator.serviceWorker.ready.then(() => {
        if ("PushManager" in window) {
          navigator.serviceWorker.getRegistration().then((registration) => {
            registration.pushManager
              .subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicKey),
              })
              .then((subscribe) => {
                console.log(
                  "Berhasil melakukan subscribe dengan endpoint: ",
                  subscribe.endpoint
                );
                console.log(
                  "Berhasil melakukan subscribe dengan p256dh key: ",
                  btoa(
                    String.fromCharCode.apply(
                      null,
                      new Uint8Array(subscribe.getKey("p256dh"))
                    )
                  )
                );
                console.log(
                  "Berhasil melakukan subscribe dengan auth key: ",
                  btoa(
                    String.fromCharCode.apply(
                      null,
                      new Uint8Array(subscribe.getKey("auth"))
                    )
                  )
                );
              })
              .catch((error) => {
                console.error(
                  "Tidak dapat melakukan subscribe ",
                  error.message
                );
              });
          });
        }
      });
    });
  }
};

let urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export { requestPermission };

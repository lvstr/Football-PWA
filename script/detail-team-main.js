import init from "./initialization.js";
import { getDetailTeam, getSavedDetailTeam } from "./api/api-listener.js";

document.addEventListener("DOMContentLoaded", () => {
  //LoadNav Function
  const loadNav = () => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status != 200) return;

        // Muat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach((elm) => {
          elm.innerHTML = xhttp.responseText;
        });

        // Daftarkan event listener untuk setiap tautan menu
        document.querySelectorAll(".sidenav a, .topnav a").forEach((elm) => {
          elm.addEventListener("click", (event) => {
            // Tutup sidenav
            let sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();

            // Muat konten halaman yang dipanggil
            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhttp.open("GET", "../../pages/function-pages/detail-team-nav.html", true);
    xhttp.send();
  };
  loadNav();

  //LoadNav Function

  let page = window.location.hash.substr(1);
  if (page === "") page = "detail-team-page";

  //LoadPage
  let loadPage = (page) => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        let content = document.querySelector("#body-content");
        if (this.status === 200) {
          content.innerHTML = xhttp.responseText;
          //Initialization
          init.initLib();
          init.initNav();
          //Initialization

          let urlParams = new URLSearchParams(window.location.search);
          let isFromSaved = urlParams.get("saved");
          if (isFromSaved) {
            // ambil artikel lalu tampilkan
            getSavedDetailTeam();
          } else {
            getDetailTeam();
          }
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };
    xhttp.open("GET", "../../pages/" + page + ".html", true);
    xhttp.send();
  };
  loadPage(page);

  //LoadPage
});

import init from "./initialization.js";
import { getDetailTeam, getStandings, getTeams } from "./api/api-listener.js";
import { getTeamList } from "./db/db-handler.js";

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
    xhttp.open("GET", "../../pages/function-pages/home-nav.html", true);
    xhttp.send();
  };
  loadNav();

  //LoadNav Function

  let page = window.location.hash.substr(1);
  if (page === "") page = "home";

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

          // Daftarkan event listener untuk setiap tautan menu

          //GetData
          if (page === "standings") getStandings();
          if (page === "teams") getTeams();
          if (page === "detail-team") getDetailTeam();
          if (page === "favorite") getTeamList();
          //GetData
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

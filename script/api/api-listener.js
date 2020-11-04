//Import
import { apiHandler, json, status } from "./api-handler.js";
import { getTeamById } from "../db/db-listener.js";
import {
  renderStandings,
  renderTeams,
  renderDetailTeam,
  renderSavedDetailTeam,
  loaderAnimation,
} from "./api-render.js";
//Import

//Config
const base_url = "https://api.football-data.org/";
const api_token = "d327b3f79ad54560ac84595be3610b21";
//Config

//Get Standings Data
let getStandings = () => {
  apiHandler("select#klasemen", "change", (event) => {
    let loader = document.getElementById("loader");
    loader.innerHTML = loaderAnimation;
    let competitionId = event.target.value;
    if ("caches" in window) {
      caches
        .match(`${base_url}/v2/competitions/${competitionId}/standings`)
        .then((res) => {
          if (res) {
            res
              .json()
              .then((result) => {
                renderStandings(result, loader);
              })
              .catch((err) => console.log(err));
          }
        });
    }
    fetch(`${base_url}v2/competitions/${competitionId}/standings`, {
      headers: {
        "X-Auth-Token": api_token,
      },
    })
      .then(status)
      .then(json)
      .then((result) => {
        renderStandings(result, loader);
      })
      .catch((err) => {
        M.toast({
          html: `Gagal mengambil data <br> (${err})`,
        });
        loader.innerHTML = "";
      });
  });
};
//Get Standings Data

//Get Teams Data
let getTeams = () => {
  apiHandler("select#team", "change", (event) => {
    let loader = document.getElementById("loader");
    loader.innerHTML = loaderAnimation;
    let teamId = event.target.value;
    if ("caches" in window) {
      caches
        .match(`${base_url}/v2/competitions/${teamId}/teams`)
        .then((res) => {
          if (res) {
            res
              .json()
              .then((result) => {
                renderTeams(result, loader);
              })
              .catch((err) => console.log(err));
          }
        });
    }
    fetch(`${base_url}v2/competitions/${teamId}/teams`, {
      headers: {
        "X-Auth-Token": api_token,
      },
    })
      .then(status)
      .then(json)
      .then((result) => {
        renderTeams(result, loader);
      })
      .catch((err) => {
        M.toast({
          html: `Gagal mengambil data <br> (${err})`,
        });
        console.log(err);
        loader.innerHTML = "";
      });
  });
};
//Get Teams Data

//Get Saved Detail Team Data
let getSavedDetailTeam = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = Number(urlParams.get("id"));
  let loader = document.getElementById("loader");
  loader.innerHTML = loaderAnimation;
  getTeamById(idParam)
    .then((result) => {
      renderSavedDetailTeam(result, loader);
    })
    .catch((err) => {
      console.log(err);
    });
};
//Get Saved Detail Team Data

//Get Detail Team Data
let getDetailTeam = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");
  let loader = document.getElementById("loader");
  loader.innerHTML = loaderAnimation;

  if ("caches" in window) {
    caches.match(`${base_url}/v2/teams/${idParam}`).then((res) => {
      if (res) {
        res
          .json()
          .then((result) => {
            renderDetailTeam(result, loader);
          })
          .catch((err) => console.log(err));
      }
    });
  }
  fetch(`${base_url}/v2/teams/${idParam}`, {
    headers: {
      "X-Auth-Token": api_token,
    },
  })
    .then(status)
    .then(json)
    .then((result) => {
      renderDetailTeam(result, loader);
    })
    .catch((err) => {
      console.log(err);
    });
};
//Get Detail Team Data

export { getStandings, getTeams, getDetailTeam, getSavedDetailTeam };

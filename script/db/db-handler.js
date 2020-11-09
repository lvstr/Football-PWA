import { getAllTeam, addTeam, deleteTeam } from "./db-listener.js";
import { loaderAnimation } from "../api/api-render.js";

const getTeamList = () => {
  //Get All Favorite Team From Database
  getAllTeam().then((result, elm) => {
    let loader = document.getElementById("loader");
    loader.innerHTML = loaderAnimation;
    let teamsHTML = "";
    let rowHTML = "";

    rowHTML += `   
      </div>
      <div class="row">
      <div class="col s12 m12" id="bookmarkTeams"> </div>
      </div>
    </div>
    `;

    result.forEach((team) => {
      let crestUrl = team.crestUrl.replace(/^http:\/\//i, "https://");

      teamsHTML += `
        <div class="col s12 m6 team-card"> 
        <div class="card">
        <div class="card-image team-img">
        <img src="${crestUrl}" class="responsive-img" width="30" alt="team-logo"/>
          <div class="divider"></div>
          <a id="del-favorite-${team.id}" class="btn-floating halfway-fab waves-effect waves-light red"
            ><i class="material-icons">cancel</i></a
          >
        </div>
        <div class="card-content center-align">
        <h6 class="black-text">${team.name} - ${team.shortName}</h6>
    
          <p>${team.address}</p>
          <a href="${team.website}">${team.website}</a>
          <p>${team.venue}</p>
          <p>${team.founded}</p>
          <div class='card-action'><a href="./detail-team.html?id=${team.id}&saved=true">Detail Tim</a></div>
        </div>
      </div>
        </div>
        `;
    });
    if (result.length) {
      loader.innerHTML = rowHTML;
      document.getElementById("bookmarkTeams").innerHTML = teamsHTML;
      result.forEach((team) => {
        document
          .getElementById(`del-favorite-${team.id}`)
          .addEventListener("click", () => {
            deleteFavTeam(team);
          });
      });
    } else {
      loader.innerHTML = `<h5 class="center-align">
        Tim Favorite kosong, silahkan masukan Tim Kesukaan Anda ke Favorite
        </h5>`;
    }
  });
};

let addFavTeam = (result) => {
  //Add To Database
  addTeam(result);
  //Display Toast
};

const deleteFavTeam = (result) => {
  let yes = confirm(
    `Apakah Anda Yakin ingin menghapus ${result.name} dari Favorite?`
  );
  if (yes) {
    //Delete Team From db
    deleteTeam(result.id);
    //Fetch All Team
    getTeamList();
    //Display Toast
    M.toast({
      html: `Berhasil Menghapus ${result.name}`,
      classes: "rounded",
    });
  }
};

export { getTeamList, deleteFavTeam, addFavTeam };

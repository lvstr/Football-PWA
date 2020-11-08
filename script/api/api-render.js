import { addFavTeam, deleteFavTeam } from "../db/db-handler.js";
<<<<<<< HEAD
=======
import { getTeamById } from "../db/db-listener.js";
>>>>>>> update all

let loaderAnimation = `
 <div class="row">
      <div class="col s12 center">
        <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-blue-only">
            <div class="circle-clipper left"><div class="circle"></div></div>
            <div class="gap-patch"><div class="circle"></div></div>
            <div class="circle-clipper right"><div class="circle"></div></div>
          </div>
        </div>
      </div>
    </div>`;

//Render Standings data dari API
let renderStandings = (result, elm) => {
  let titleHTML = "";
  let standingsHTML = "";

  titleHTML += `
        <div class="row mt-50">
  <div class="col s12">
    <h5 class="center-align">
      ${result.competition.name} - ${result.competition.area.name}
    </h5>
  </div>
  <div class="col s12">
    <table class="highlight responsive-table centered">
      <thead>
        <tr>
          <th>Position</th>
          <th>Logo</th>
          <th>Team</th>
          <th>P</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th>GF</th>
          <th>GA</th>
          <th>GD</th>
          <th>Point</th>
        </tr>
      </thead>
      <tbody id="standings"></tbody>
    </table>
  </div>
</div>
`;

  result.standings[0].table.forEach((standings) => {
    let crestUrl = standings.team.crestUrl.replace(/^http:\/\//i, "https://");
    standingsHTML += `
<tr>
<td>${standings.position}</td>
<td>
<img
src="${crestUrl}"
alt="${standings.team.name}"
class="responsive-img"
width="30"
alt="team-logo"
/>
</td>
<td>${standings.team.name}</td>
<td>${standings.playedGames}</td>
<td>${standings.won}</td>
<td>${standings.draw}</td>
<td>${standings.lost}</td>
<td>${standings.goalsFor}</td>
<td>${standings.goalsAgainst}</td>
<td>${standings.goalDifference}</td>
<td>${standings.points}</td>
</tr>
            `;
  });
  elm.innerHTML = titleHTML;
  document.getElementById("standings").innerHTML = standingsHTML;
};
//Render Standings data dari API

//Render Teams data dari API
let renderTeams = (result, elm) => {
  let titleHTML = "";
  let teamsHTML = "";
  teamsHTML += "";

  titleHTML += `
              <div class="row mt-50">
                <div class="col s12">
                  <h5 class="center-align">
                    ${result.competition.name} -
                    ${result.competition.area.name}
                  </h5>
                </div>
              
              </div>
              <div class="row">
              <div class="col s12 m12" id="teams"> </div>
              </div>
              </div>
`;

  result.teams.forEach((team) => {
    let crestUrl = team.crestUrl.replace(/^http:\/\//i, "https://");

    teamsHTML += `
            <div class="col s12 m6 team-card"> 
            <div class="card">
            <div class="card-image team-img">
              <img src="${crestUrl}" class="responsive-img" width="30" alt="team-logo"/>
              <div class="divider"></div>
            </div>
            <div class="card-content center-align">
            <h6 class="black-text">${team.name} - ${team.shortName}</h6>
              <p>${team.address}</p>
              <a href="${team.website}">${team.website}</a>
              <p>${team.venue}</p>
              <p>${team.founded}</p>
              <div class="card-action">
              <a href="./detail-team.html?id=${team.id}">Detail Tim</a>
              </div>
            </div>
            </div>
            </div>
    `;
  });

  elm.innerHTML = titleHTML;
  document.getElementById("teams").innerHTML = teamsHTML;
};
//Render Teams data dari API

let renderDetailTeam = (result, elm) => {
  let teamHTML = "";
  let contentHTML = "";
  let squadHTML = "";

  let crestUrl = result.crestUrl.replace(/^http:\/\//i, "https://");

  teamHTML += `
  <div class="row">
  <div class="col s12 m3">
    <div class="row">
      <div class="col s12 team-card">
        <div class="card">
          <div class="card-image team-img">
            <img src="${crestUrl}" class="responsive-img" width="64" alt="team-logo"/>
            <div class="divider"></div>
            <a id="favorite-${result.id}"  class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">favorite</i></a>
          </div>
          <div class="card-content center-align">
            <h6 class="black-text">${result.name} - ${result.shortName}</h6>
            <p>${result.address}</p>
            <a href="${result.website}">${result.website}</a>
            <p>${result.venue}</p>
            <p>${result.founded}</p>
            <p>${result.phone}</p>
            <p>${result.email}</p>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div class="col s12 m9">

    <h3 class="center-align black-text">Kompetisi Aktif</h3>
    <table>
      <thead>
        <th>Area</th>
        <th>Kompetisi</th>
      </thead>
      <tbody id="comp"></tbody>  
    </table>

    <div class="divider"></div>
    <h3 class="center black-text">Squad Tim</h3>
    <table>
        <thead>
          <th>Nama</th>
          <th>Posisi</th>
          <th>Tanggal Lahir</th>
          <th>Negara Asal</th>
          <th>Role</th>
        </thead>
        <tbody id="squad"></tbody>    
      </table>

 
  </div>
  
</div> 
`;

  result.activeCompetitions.forEach((comp) => {
    contentHTML += `
      <tr>
        <td>${comp.area.name}</td>
        <td>${comp.name}</td>
      </tr>
 `;
  });

  result.squad.forEach((squad) => {
    squadHTML += `
      <tr>
        <td>${squad.name}</td>
        <td>${squad.position}</td>
        <td>${squad.dateOfBirth}</td>
        <td>${squad.nationality}</td>
        <td>${squad.role}</td>
      </tr>
`;
  });

  elm.innerHTML = teamHTML;
  document.getElementById("comp").innerHTML = contentHTML;
  document.getElementById("squad").innerHTML = squadHTML;
  document
    .getElementById(`favorite-${result.id}`)
    .addEventListener("click", () => {
      let yes = confirm(
        `Apakah Anda Yakin ingin menambahkan ${result.name} ke Favorite?`
      );
      if (yes) {
        addFavTeam(result);
        M.toast({
          html: `Berhasil Menambahkan${result.name} ke Favorite`,
          classes: "rounded",
        });
      }
    });
};

let renderSavedDetailTeam = (result, elm) => {
  let teamHTML = "";
  let contentHTML = "";
  let squadHTML = "";

  let crestUrl = result.crestUrl.replace(/^http:\/\//i, "https://");

  teamHTML += `
  <div class="row">
  <div class="col s12 m3">
    <div class="row">
      <div class="col s12 team-card">
        <div class="card">
          <div class="card-image team-img">
            <img src="${crestUrl}" class="responsive-img" width="64" alt="team-logo"/>
            <div class="divider"></div>
            <a id="del-favorite-${result.id}"  class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">cancel</i></a>
          </div>
          <div class="card-content center-align">
            <h6 class="black-text">${result.name} - ${result.shortName}</h6>
            <p>${result.address}</p>
            <a href="${result.website}">${result.website}</a>
            <p>${result.venue}</p>
            <p>${result.founded}</p>
            <p>${result.phone}</p>
            <p>${result.email}</p>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div class="col s12 m9">

    <h3 class="center-align black-text">Kompetisi Aktif</h3>
    <table>
      <thead>
        <th>Area</th>
        <th>Kompetisi</th>
      </thead>
      <tbody id="comp"></tbody>  
    </table>

    <div class="divider"></div>
    <h3 class="center black-text">Squad Tim</h3>
    <table>
        <thead>
          <th>Nama</th>
          <th>Posisi</th>
          <th>Tanggal Lahir</th>
          <th>Negara Asal</th>
          <th>Role</th>
        </thead>
        <tbody id="squad"></tbody>    
      </table>

 
  </div>
  
</div> 
`;

  result.activeCompetitions.forEach((comp) => {
    contentHTML += `
      <tr>
        <td>${comp.area.name}</td>
        <td>${comp.name}</td>
      </tr>
 `;
  });

  result.squad.forEach((squad) => {
    squadHTML += `
      <tr>
        <td>${squad.name}</td>
        <td>${squad.position}</td>
        <td>${squad.dateOfBirth}</td>
        <td>${squad.nationality}</td>
        <td>${squad.role}</td>
      </tr>
`;
  });

  elm.innerHTML = teamHTML;
  document.getElementById("comp").innerHTML = contentHTML;
  document.getElementById("squad").innerHTML = squadHTML;
  let delfav = document.getElementById(`del-favorite-${result.id}`);
  delfav.onclick = () => {
    deleteFavTeam(result);
  };
};

export {
  renderStandings,
  renderTeams,
  renderDetailTeam,
  renderSavedDetailTeam,
  loaderAnimation,
};

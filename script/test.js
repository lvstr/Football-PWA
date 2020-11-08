// Untuk merender jadwal pertandingan tim
let renderJadwalTim = (data, contentElm, teamId = null, teamName = null) => {
  let seletedTeamElm = document.querySelector("#matchesId select");
  if (seletedTeamElm !== null) {
    teamId = seletedTeamElm.value;
    teamName = seletedTeamElm[seletedTeamElm.selectedIndex].innerHTML;
  }
  let tableData = "";

  data.matches.forEach((match) => {
    //Get Venue
    let home = "HOME";
    let away = "AWAY";
    let venue;
    if (match.homeTeam.id == teamId) {
      venue = home;
    } else {
      venue = away;
    }
    //Get Venue

    //Get Versus
    let matchAwayTeamName = match.awayTeam.name;
    let homeAwayTeamName = match.homeTeam.name;
    let vs;
    if (venue == "HOME") {
      vs = matchAwayTeamName;
    } else {
      vs = homeAwayTeamName;
    }
    //Get Versus

    if (venue == "HOME" && match.score.winner !== null) {
      var isWinner =
        match.score.winner == "HOME_TEAM"
          ? "WIN"
          : match.score.winner == "AWAY_TEAM"
          ? "LOSE"
          : "DRAW";
      var score = match.score.fullTime.homeTeam;
      var rivalScore = match.score.fullTime.awayTeam;
    } else if (venue == "AWAY" && match.score.winner !== null) {
      var isWinner =
        match.score.winner == "AWAY_TEAM"
          ? "WIN"
          : match.score.winner == "HOME_TEAM"
          ? "LOSE"
          : "DRAW";
      var score = match.score.fullTime.awayTeam;
      var rivalScore = match.score.fullTime.homeTeam;
    } else {
      var isWinner = "";
      var score = "";
      var rivalScore = "";
    }

    tableData += `
			<tr>
				<td>${match.competition.name}</td>
				<td>${new Date(match.utcDate).toLocaleString()}</td>
				<td>${vs}</td>
				<td>${match.status}</td>
				<td>${isWinner}&nbsp${score}&nbsp-&nbsp${rivalScore}</td>
				<td>${venue}</td>
			</tr>
		`;
  });

  let htmlElement = `
		<div class="card">
			<div class="card-content">
				<span class="card-title">Jadwal Pertandingan <strong>${teamName.replace(
          /\s/g,
          "&nbsp"
        )}</strong></span>
				<br>
				<table class="striped highlight centered responsive-table">
					<thead>
						<tr>
							<th>Kompetisi</th>
							<th>Jadwal</th>
							<th>VS</th>
							<th>Status</th>
							<th>Score</th>
							<th>Venue</th>
						</tr>
					</thead>
					<tbody>${tableData}</tbody>
				</table>
			</div>
		</div>
	`;

  contentElm.innerHTML = htmlElement;
};

function renderPilihanJadwal(result, contentElm) {
  let htmlElement = `<select><option value="" disabled selected>Pilih Tim</option>`;
  result.teams.forEach((team) => {
    htmlElement += `<option value="${team.id}">${team.name}</option>`;
  });
  htmlElement +=
    '</select><label>Pilih Tim</label><br><a class="waves-effect waves-light btn-small" id="save-jadwal"><i class="material-icons right">save</i>Simpan Offline</a><div id="jadwal-tim-container"></div>';

  contentElm.innerHTML = htmlElement;
  M.AutoInit();
}

let tempDataPertandingan;

let getMatches = () => {
  // Event listener untuk menampilkan jadwal pertandingan tim
  apiHandler("#matchesId select", "change", (event) => {
    let contentElm = document.getElementById("jadwal-tim-container");
    contentElm.innerHTML = loaderAnimation;
    let teamId = event.target.value;
    document.getElementById("save-jadwal").classList.add("hide");
    fetch(`${base_url}/v2/teams/${teamId}/matches/`, {
      headers: {
        "X-Auth-Token": api_token,
      },
    })
      .then(status)
      .then(json)
      .then((result) => {
        renderJadwalTim(result, contentElm);
        console.log(result);
        document.getElementById("save-jadwal").classList.remove("hide");
      })
      .catch((err) => {
        console.log(err);
        M.toast({
          html: `Gagal mengambil data <br> (${err})`,
        });
        contentElm.innerHTML = "";
      });
  });

  // Event listener untuk melist daftar tim dari suatu kompetisi di halaman jadwal pertandingan
  apiHandler("select#jadwal", "change", (event) => {
    let contentElm = document.getElementById("matchesId");
    contentElm.innerHTML = loaderAnimation;
    let teamId = event.target.value;
    fetch(`https://api.football-data.org/v2/competitions/${teamId}/teams`, {
      headers: {
        "X-Auth-Token": api_token,
      },
    })
      .then(status)
      .then(json)
      .then((result) => {
        renderPilihanJadwal(result, contentElm);
        console.log(result);
        document.getElementById("save-jadwal").classList.add("hide");
      })
      .catch((err) => {
        console.log(err);
        M.toast({
          html: `Gagal mengambil data <br> (${err})`,
        });
        contentElm.innerHTML = "";
      });
  });

  // letiabel Sementara Untuk Menyimpan data pertandingan tim
};

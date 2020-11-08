import "./idb.js";

//Open and Create Database
let dbPromise = idb.open("fwa", 1, (upgradeDb) => {
  switch (upgradeDb.oldVersion) {
    case 0:
      upgradeDb.createObjectStore("teams", { keyPath: "id" });
  }
});
//Open and Create Database

//Add Team Database Listener
const addTeam = (teamId) => {
  dbPromise
    .then((db) => {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      store.put(teamId);
      return tx.complete;
    })
    .catch((err) => {
      console.error("Tim gagal disimpan", err);
    });
};
//Add Team Database Listener

//Delete Team Database Listener
const deleteTeam = (teamId) => {
  dbPromise
    .then((db) => {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      store.delete(teamId);
      return tx.complete;
    })
    .catch((err) => {
      console.error("Error: ", err);
    });
};
//Delete Team Database Listener

//Get All Team Database Listener
const getAllTeam = () => {
  return new Promise((resolve, reject) => {
    dbPromise
      .then((db) => {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.getAll();
      })
      .then((teamId) => {
        resolve(teamId);
      });
  });
};
//Get All Team Database Listener

//Get Team Database by Id Listener
const getTeamById = (id) => {
  return new Promise((resolve, reject) => {
    dbPromise
      .then((db) => {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.get(id);
      })
      .then((result) => {
        resolve(result);
      });
  });
};
//Get Team Database by Id Listener

export { addTeam, deleteTeam, getAllTeam, getTeamById };

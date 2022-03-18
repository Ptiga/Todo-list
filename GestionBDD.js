const req = require('express/lib/request');
var mysql = require('mysql');

//Connexion à la BDD
function connexionToMysql() {
  var connexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'P0stGre_SQL',
    database: 'todolist'
  });
  connexion.connect();
  return connexion
}



//Fonction pour obtenir des éléments
function getItems(fonctionDeTraitementResultatBDD, updateType) {
  let connexionBdd = connexionToMysql()
  let requete = requestToApply(updateType)
  connexionBdd.query(requete, fonctionDeTraitementResultatBDD)
  connexionBdd.end();
}


//Fonction pour mettre à jour des éléments
function updateDataBase(requeteBody, updateType) {
  let connexionBdd = connexionToMysql()
  updateType  = adjustUpdateType(requeteBody, updateType)
  let requete = requestToApply(updateType)
  let dataToInsert = dataToApplyForRequest(requeteBody, updateType)
  // console.log("step 1 - before query")
  connexionBdd.query(requete, dataToInsert, function (error, results, fields) {
    if (error) {
      console.log(error)
    }// throw error;
    else {
      // console.log("step 2 - query application")
      console.log("Données insérées");
    }
    connexionBdd.commit() // Permet d'enregistrer les modifications sur la BDD
    connexionBdd.end();
    console.log("step 3 - close query mode")
  });

}


//Fonction qui permet d'appliquer la bonne requête en fonction de l'appel
function requestToApply(selection) {
  switch (selection) {
    case 'Retrieve-All' :
      return `SELECT * from task`
    case 'Retrieve-Todo' :
        return `SELECT * from task WHERE task_status = 1`
    case 'Add' :
      return `INSERT INTO task (task_name, task_description) VALUES (?, ?)`
    case 'Update' :
        return `UPDATE task SET task_name = ?, task_description = ?, task_status = ? WHERE id_task = ?`
    case 'Delete' :
      return `DELETE FROM task WHERE id_task = ?`
    default:
      return `Selection not found`
  }
}


//Fonction pour renvoyer les bons ééments qui replaceronts les '?' lors du traitement de la requête
function dataToApplyForRequest(requeteBody, selection){
  switch (selection) {
    case 'Add' :
      return [requeteBody['taskName'], requeteBody['taskDescription']]
      case 'Update' :
        return [requeteBody['taskName'], requeteBody['taskDescription'], convertTaskStatusForDatabase(requeteBody['taskStatus']), requeteBody['taskId']]
    case 'Delete' :
      return [requeteBody['taskId']]
    default:
      return ``
  }
}


//Détail sur l'appel via 'Update' (détermination si suppression de données ou mise à jour)
function adjustUpdateType(requeteBody, updateType){
  if(updateType == 'Add'){
    return updateType
  }else if(requeteBody['taskStatus'] != 'Delete task'){
    return 'Update'
  }else{
    return 'Delete'
  }
}


//Conversion des status de l'outil avec la BDD
function convertTaskStatusForDatabase(taskStatus){
  switch(taskStatus){
    case 'Achieved':
      return 0
    case 'In Progress':
      return 1
    case 'Cancelled':
      return 2
    default:
      return taskStatus
  }
}


//Conversion des status de la BDD pour l'affichage
function convertTaskStatusForStatement(taskStatus){
  switch(taskStatus){
    case 0:
      return 'Achieved'
    case 1:
      return 'In Progress'
    case 2:
      return 'Cancelled'
    default:
      return 'Not defined'
  }
}


module.exports = {
  updateDataBase: updateDataBase,
  getItems: getItems,
  requestToApply: requestToApply,
  convertTaskStatusForDatabase: convertTaskStatusForDatabase,
  convertTaskStatusForStatement: convertTaskStatusForStatement
}

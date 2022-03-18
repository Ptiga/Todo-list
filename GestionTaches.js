const { response } = require('express')
const express = require('express')
const app = express()
const port = 3000

//Import des fonctions du fichier GestionBDD.js
const GestionBDD = require('./GestionBDD')
//Import des fonctions du fichier GestionPageHtml.js
const GestionPageHtml = require('./GestionPageHtml')


// app.use(express.static('public'));
app.use(express.static('public'));

//pour permettre de pouvoir lire le contenu du formulaire envoyé
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`Todolist app listening on port ${port}`)
})


//traitement du formulaire lors de l'envoi
app.get('/', (requete, reponse) => {
    //TODO: A voir si je conserve la page de base.
    // reponse.redirect('/todolist.html')
    reponse.redirect('/get-remaining-tasks')
})


//traitement du formulaire lors de l'envoi
app.get('/react', (requete, reponse) => {
    //TODO: A voir si je conserve la page de base.
    // reponse.redirect('/todolist.html')
    reponse.redirect('/todolist.html')
})


//Obtenir toutes les tâches
app.get('/get-all-tasks', (requete, reponse) => {
    GestionBDD.getItems(
        //TODO:  function (error, results, fields) => Ajouté par défaut. Voir pour externaliser
        function (error, results, fields) {
            reponse.send(GestionPageHtml.baseCorpsHtml(loopOnElements(results, "tasks"), GestionPageHtml.buttonSeeUndoneTasks(), loopOnElements(results, "script")))
        }, 'Retrieve-All'
    )
})


//Obtenir uniquement les tâches à faire
app.get('/get-remaining-tasks', (requete, reponse) => {
    GestionBDD.getItems(
        function (error, results, fields) {
            reponse.send(GestionPageHtml.baseCorpsHtml(loopOnElements(results, "tasks"), GestionPageHtml.buttonSeeAllTasks(), loopOnElements(results, "script")))
        }, 'Retrieve-Todo'
    )
})


//Base de données à mettre à jour
app.post('/update-task', (requete, reponse) => {
    GestionBDD.updateDataBase(requete.body, 'Update'),
        function (error, results, fields) {
            
        }
        //Timeout d'une seconde placé pour laisser le temps au serveur d'envoyer sa réponse
        //TODO: voir pour trouver une autre solution plus péreine.
        setTimeout(function () {
            // console.log("step 4 - redirect")
            reponse.redirect('/get-remaining-tasks');
        },  1000);
})


//Ajouter un élément à la base de données
app.post('/add-task', (requete, reponse) => {
    GestionBDD.updateDataBase(requete.body, 'Add'),
        function (error, results, fields) {
        }
    //Timeout d'une seconde placé pour laisser le temps au serveur d'envoyer sa réponse
    //TODO: voir pour trouver une autre solution plus péreine.
    setTimeout(function () {
        // console.log("step 4 - redirect")
        reponse.redirect('/get-remaining-tasks');
    }, 1000);
})


//Boucle sur les éléments à traiter
function loopOnElements(resultatRequete, type) {
    let returnFunction = ``
    for (let i = 0; i < resultatRequete.length; i++) {
        if (type == "tasks") {
            returnFunction += GestionPageHtml.listTasks(resultatRequete[i]['id_task'], resultatRequete[i]['task_name'], resultatRequete[i]['task_description'], resultatRequete[i]['task_status'])
        } else {
            returnFunction += GestionPageHtml.scriptBlock(resultatRequete[i]['id_task'])
        }
    }
    return returnFunction
}

//Obtenir toutes les tâches
app.get('/get-all-tasks-json', (requete, reponse) => {
    GestionBDD.getItems(
        //TODO:  function (error, results, fields) => Ajouté par défaut. Voir pour externaliser
        function (error, results, fields) {
            console.log("envoi des resultats: ", results)
            // reponse.send(GestionPageHtml.baseCorpsHtml(loopOnElements(results, "tasks"), GestionPageHtml.buttonSeeUndoneTasks(), loopOnElements(results, "script")))
            reponse.json(results)
        }, 'Retrieve-All'
    )
})

//Obtenir toutes les tâches
app.get('/get-remaining-tasks-json', (requete, reponse) => {
    GestionBDD.getItems(
        //TODO:  function (error, results, fields) => Ajouté par défaut. Voir pour externaliser
        function (error, results, fields) {
            console.log("envoi des resultats: ", results)
            // reponse.send(GestionPageHtml.baseCorpsHtml(loopOnElements(results, "tasks"), GestionPageHtml.buttonSeeUndoneTasks(), loopOnElements(results, "script")))
            reponse.json(results)
        }, 'Retrieve-Todo'
    )
})
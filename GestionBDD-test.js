const GestionBDD = require('./GestionBDD')


let selectionType = 'Retrieve-All'
console.log("Test 1 - Retour attendu: Succès")
testRequestToApplySelectAll(selectionType)

console.log("Test 2 - Retour attendu: Echec")
testRequestToApplyUndoneTasks(selectionType)

console.log("Test 3 - Retour attendu: Echec")
selectionType = 'Retrieve-Todo'
testRequestToApplySelectAll(selectionType)

console.log("Test 4 - Retour attendu: Succès")
testRequestToApplyUndoneTasks(selectionType)



function testRequestToApplySelectAll(selection) {

    let resultatTest = GestionBDD.requestToApply(selection)

    if (resultatTest == "SELECT * from task") {
        console.log("Le retour contient bien la réquête de rappatriement complète. TEST REUSSI.")
    } else {
        console.log("Le retour contient bien la réquête de rappatriement complète. TEST EN ECHEC.")
    }

}


function testRequestToApplyUndoneTasks(selection){

    let resultatTest = GestionBDD.requestToApply(selection)

    if (resultatTest.includes("WHERE task_status = 1")) {
        console.log("Le retour contient la donnée 'WHERE task_status = 1'. TEST REUSSI.")
    } else {
        console.log("Le retour ne contient pas la donnée 'WHERE task_status = 1'. TEST EN ECHEC.")
    }

}

    


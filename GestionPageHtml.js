const GestionBDD = require('./GestionBDD')


//Corps de l'écran principal
function baseCorpsHtml(blocRequete, displayButton, blocScript){

    return `
    <html>

        <head>

            <!-- Latest compiled and minified CSS -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

            <!-- Optional theme -->
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap-theme.min.css"
                integrity="sha384-6pzBo3FDv/PJ8r2KRkGHifhEocL+1X2rVCTTkUfGk7/0pbek5mMa1upzvWbrUbOZ" crossorigin="anonymous">

            <!-- Latest compiled and minified JavaScript -->
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"
                integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB"
                crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"
                integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13"
                crossorigin="anonymous"></script>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
                crossorigin="anonymous"></script>

            <link href="style_todolist.css" rel="stylesheet" />

        </head>

        <body>

            <div class="container">
                <div class="row enTeteResult">
                    <div id="display-date" class="col-12 display-date"></div>
                </div>
                <br />

                

                <div class="row">
                <div class="col-3 post-it-part">
                    <div class="row">
                    </div>
                    <div class="row">
                        ${postIt()}
                    </div>
                    <div class="row img-post-it">
                        <img src="images/Post-it.png" />
                    </div>
                </div>

                <div class="col-9 todo-board-border">
                    <div class="col-12 todo-board">
                        <div class="row">
                            <div class="col-3 display-mode">
                                ${displayButton}
                            </div>
                            <div class="col-6 my-todo-list">
                                <span class="Todo-title">My todo list</span>
                            </div>
                            <div class="col-3 display-mode" id="display-time">
                            </div>
                        </div>

                        <div class="tasks">
                            ${blocRequete}
                        </div>
                    </div>
                </div>
            </div>          
        </body>

        <script>

            ${getTimeDisplayed()}

        let taskProcessed = document.getElementById("taskName")

            ${blocScript}

        </script>

    </html>
`
}


//Bloc d'ajout des tâches (post-it)
function postIt(){
    return `
    <div class="col-12 post-it">
        <div class="col-12">
            <p class="post-it-title">Nouvelle tâche</p>
            <p class="post-it-corps">A faire:</p>
        </div>
        <form method="POST" action="/add-task" enctype="application/x-www-form-urlencoded">
            <div class="row">
                <div class="col-12">
                    <div class="form-floating post-it-input">
                        <input type="text" required class="form-control post-it-input" name="taskName" id="taskName"
                            placeholder="task name">
                        <label for="taskName">Task name</label>
                    </div>
                </div>
            </div>
            <br />
            <div class="row">
                <div class="col-12">
                    <div class="form-floating">
                        <input type="text" class="form-control post-it-input" name="taskDescription"
                            id="taskDescription" placeholder="task description">
                        <label for="taskDescription">Task description</label>
                    </div>
                </div>
            </div>
            <br />
            <div class="row">
                <div class="Col-12 col-add-post-it">
                    <button type="submit" class="btn btn-primary add-post-it">Add task</button>
                </div>
            </div>
        </form>
    </div>`
}


//Bloc des tâches listées
function listTasks(id, taskName, taskDescription, taskStatus){
    return  `
        <form method="post" id="task${id}" action="/update-task" enctype="application/x-www-form-urlencoded">
            <div class="row liste-elements">             
                <div class="Col-2 list-button button-update">
                    <button type="submit" class="btn btn-primary">Update task ${id}</button>
                </div>
                <div class="col-2">
                    <div class="form-floating liste-elements-form-elem">
                        <select class="form-select task-detailled-element" required id="taskStatus${id}" name="taskStatus" aria-label="Floating label select example">
                            <option selected>${GestionBDD.convertTaskStatusForStatement(taskStatus)}</option>
                            <option>In Progress</option>
                            <option>Achieved</option>
                            <option>Cancelled</option>
                            <option>Delete task</option>
                        </select>
                        <label for="taskStatus${id}">Task status</label>
                    </div>
                </div>
                <div class="col-2 d-none">
                    <div class="form-floating liste-elements-form-elem">
                        <input type="text" class="form-control task-detailled-element" name="taskId" id="taskId${id}" value="${id}" readonly>
                        <label for="taskId${id}">Task ID</label>
                    </div>
                </div>
                <div class="col-2">
                    <div class="form-floating">
                        <input type="text" class="form-control task-detailled-element taskName" required name="taskName" id="taskName${id}" placeholder="task name" value="${taskName}">
                        <label for="taskName${id}">Task name</label>
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-floating taskDescription taskDescription${id}">
                        <input type="text" class="form-control task-detailled-element" name="taskDescription" id="taskDescription${id}" placeholder="task description" value="${taskDescription}">
                        <label for="taskDescription${id}">Task description</label>
                    </div>
                </div>
            </div>
        </form>`   
}


//Bouton pour afficher toutes les tâches
function buttonSeeAllTasks(){
    return  `
    <form method="get" action="/get-all-tasks" enctype="application/x-www-form-urlencoded">
        <div class="row">             
            <div class="Col-12 display-button">
                <button type="submit" class="btn btn-primary">See all tasks</button>
            </div>
        </div>
    </form>`
}


//Bouton pour afficher les tâches à faire
function buttonSeeUndoneTasks(){
    return  `
    <form method="get" action="/get-remaining-tasks" enctype="application/x-www-form-urlencoded">
        <div class="row">             
            <div class="Col-12 display-button">
                <button type="submit" class="btn btn-primary">Tasks to do</button>
            </div>
        </div>
    </form>`
}


//Création du bloc de script
function scriptBlock(id){
    return `
    taskProcessed = document.getElementById("task${id}")
    taskProcessed.addEventListener("mouseover", (event) => {
        console.log('event print:', event)
        let select = document.querySelector("div.taskDescription${id}")
        console.log('event print:', select)
        select.style.display = "block"

    })

    taskProcessed = document.getElementById("task${id}")
    taskProcessed.addEventListener("mouseout", (event) => {
        console.log('event print:', event)
        let select = document.querySelector("div.taskDescription${id}")
        console.log('event print:', select)
        select.style.display = "none"

    })`
}


function getTimeDisplayed(){
    return `
    DisplayTime();
    function DisplayTime() {
        let today = new Date();
        console.log(today)
        console.log("jour: ", today.getDay())
        console.log("jour du mois: ", today.getDate())
        console.log("mois: ", today.getMonth().toString())
        console.log("mois: ", today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds())

        document.getElementById('display-date').innerText = foundDay(today.getDay()) + ", " + foundMonth(today.getMonth()) + " " + today.getDate() + symbolAfterDayNum(today.getDate()) + " "+ today.getFullYear()
        document.getElementById('display-time').innerText = today.getHours() + ":" + singleNumCheck(today.getMinutes()) + ":" + singleNumCheck(today.getSeconds())

        t=setTimeout('DisplayTime()',500);
    }

    function foundDay(dayNum) {
        switch (dayNum) {
            case 0:
                return "Sunday"
            case 1:
                return "Sunday"
            case 2:
                return "Tuesday"
            case 3:
                return "Wednesday"
            case 4:
                return "Thursday"
            case 5:
                return "Friday"
            case 6:
                return "Saturday"
            default:
                return "Day not found"
        }
    }

    function foundMonth(monthNum) {
        switch (monthNum) {
            case 0:
                return "January"
            case 1:
                return "February"
            case 2:
                return "March"
            case 3:
                return "April"
            case 4:
                return "May"
            case 5:
                return "June"
            case 6:
                return "July"
            case 7:
                return "August"
            case 8:
                return "September"
            case 9:
                return "October"
            case 10:
                return "November"
            case 11:
                return "December"
            default:
                return "Month not found"
        }
    }

    function singleNumCheck(num){
        if(num<10){
            return "0"+num
        }
        return num
    }

    function symbolAfterDayNum(dayNum) {
        switch (dayNum) {
            case 1:
            case 21:
            case 31:
                return "st"
            case 2:
            case 22:
                return "nd"
            case 3:
            case 23:
                return "rd"
            default:
                return "th"
        }
    }
    `

}

module.exports = {
    baseCorpsHtml: baseCorpsHtml,
    listTasks: listTasks,
    buttonSeeAllTasks: buttonSeeAllTasks,
    buttonSeeUndoneTasks: buttonSeeUndoneTasks,
    scriptBlock: scriptBlock,
  }
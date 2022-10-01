let taskData = JSON.parse(tasks);
console.log(taskData);

function showTasks() {
    for (let i = 0; i < taskData.length; i++) {
        document.getElementById("tasks").innerHTML += `
    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 task">
        <div class="row task-row">
            <div class="col-9">
                <span class="bg-primary text-white task-text">Task</span>
            </div>
            <div class="col-3 task-action">
                <i class="fa-regular fa-bookmark"></i>
                <i class="fa fa-ellipsis-v"></i>
            </div>
            <div class="col-12">
                <img src="${taskData[i].image}" alt="" class="task-img">
            </div>
            <div class="col-12">
                <p class="task-name">${taskData[i].name}</p>
            </div>
            <div class="col-12">
                <p class="task-description">${taskData[i].description}</p>
                <hr>
            </div>
            <div class="col-1">
                <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            </div>
            <div class="col-11">
                <div class="row">
                    <div class="col-6">
                        <p>Priority level: </p>
                    </div>
                    <div class="col-6">
                        <button type="button" class="btn btn-success importance">${taskData[i].priorityLevel}</button>
                    </div>
                </div>
            </div>
            <div class="col-1">
                <i class="fa fa-calendar" aria-hidden="true"></i>
            </div>
            <div class="col-11">
                <p>Deadline: ${taskData[i].deadline}</p>
            </div>
            <div class="col-12">
                <hr>
            </div>
            <div id="task-buttons">
                <button class="btn btn-danger">Delete</button>
                <button class="btn btn-success">Done</button>
            </div>
        </div>
    </div>
    `;
    }
}

showTasks();

let importanceButtons = document.getElementsByClassName("importance");

for (let i = 0; i < importanceButtons.length; i++) {
    importanceButtons[i].addEventListener("click", function () {
        if (taskData[i].priorityLevel < 5) {
            taskData[i].priorityLevel++;
            changePriorityColor(i)
        }
    });
}

function changePriorityColor(i) {
    let newButtonClass = 'btn-success'
    if (taskData[i].priorityLevel >= 2 && taskData[i].priorityLevel <= 3) {
        newButtonClass = 'btn-warning';
    } else if (taskData[i].priorityLevel >= 4) {
        newButtonClass = 'btn-danger';
    }
    importanceButtons[i].innerHTML = taskData[i].priorityLevel;
    importanceButtons[i].className = 'btn importance ' + newButtonClass;
};

document.getElementById("sort").onclick = function () {
    taskData.sort((a, b) => a.priorityLevel - b.priorityLevel);

    document.getElementById("tasks").innerHTML = '';
    showTasks();
    for (let i = 0; i < taskData.length; i++) {
        changePriorityColor(i);
    }
};
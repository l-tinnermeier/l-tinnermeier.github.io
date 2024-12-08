// VARIABLES

'use strict';

const classTitle = document.getElementById('title');
const timeUntilLastFinalDisp = document.getElementById('timeUntilFinal');
const scoreNeededDisp = document.getElementById('neededScoreContainer');
const scoreNeededFinal = document.getElementById('scoreNeededFinal');

let sections = document.getElementsByTagName('main');
const createNewClassModal = document.getElementById('createNewClassModal');
const createNewTaskModal = document.getElementById('createNewTaskModal');
const taskInfoModal = document.getElementById('taskInfoModal');

// Create class modal
const createClassNameInput = document.getElementById('createClassNameInput');
const createClassDateInput = document.getElementById('createClassDateInput');
const createClassScoreInput = document.getElementById('createClassScoreInput');

// Create task modal
const createTaskNameInput = document.getElementById('createTaskNameInput');
const createTaskDescriptionInput = document.getElementById('createTaskDescriptionInput');

const classOverviewContainer = document.getElementById('classOverviewContainer');
const taskOverviewContainer = document.getElementsByClassName('taskContainer')[0];
const classDispTasksCompleted = document.getElementsByClassName('classDispTasksCompleted')[0];

// Show task modal
const taskInfoTitle = document.getElementById('taskInfoTitle');
const taskInfoDescription = document.getElementById('taskInfoDescription');

let classList = [];

class classTemplate {
    constructor(title, date, score, tasksCompleted) {
        this.title = title;
        this.finalDate = date;
        this.score = score;
        this.tasks = [];
        this.tasksCompleted = tasksCompleted;
    }
}

class taskTemplate {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.completed = false;
    }
}

window.onload = () => {
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }
    sections[0].style.display = 'flex';

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        console.log("This is a mobile device.");
        document.getElementsByClassName("workInProgress")[0].style.display = 'none';
        document.getElementsByTagName("section")[0].style.width = '80%';
        document.getElementsByClassName("screenModify")[0].style.left = '80%';
        document.getElementsByClassName("screenModify")[1].style.left = '80%';
    } else {
        console.log("This is not a mobile device.");
        //document.getElementsByClassName("workInProgress")[0].style.display = 'none';
        //document.getElementsByTagName("section")[0].style.width = '80%';
        //document.getElementsByClassName("screenModify")[0].style.left = '80%';
    }
}

function sectionSwitcher(section) {
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }
    sections[section].style.display = 'flex';

}

function openModal(modal) {
    switch(modal) {
        case 0:
            createNewClassModal.showModal();
            break;
        case 1:
            createNewTaskModal.showModal();
            break;
    }
}

function returnToHome() {
    sections[1].style.display = 'none';
    sections[0].style.display = 'flex';
    scoreNeededDisp.style.display = 'none';
    classTitle.innerHTML = 'Deadweek Blitz';
    timeUntilLastFinalDisp.innerHTML = '10 days';
    resetTasks();
}

function createClass() {
    let classTitle = createClassNameInput.value;
    let classDateInput = createClassDateInput.value;
    let classScore = createClassScoreInput.value;

    if (classTitle === '' || classDateInput === '') {
        window.alert("Please enter a class name or date!");
    } else {
        let classDate = new Date(classDateInput);

        let classPushback = new classTemplate(classTitle, classDate, classScore);
        classList.push(classPushback);
        createNewClassModal.close();
        createClassElement();
    }
}

function createClassElement() {
    let newClassDisp = document.createElement('div');
    newClassDisp.classList.add('classContainer');
    newClassDisp.innerHTML = `
            <h2 class="classTitle" style="margin-bottom: -5px;">${classList[classList.length - 1].title}</h2>
            <h1 class="classTasksCompleted">0%</h1>
            <button class="viewClass styledButton" onclick="viewClass(${classList.length - 1})">View</button>`;
    classOverviewContainer.appendChild(newClassDisp);
}

function viewClass(classToBeViewed) {
    console.log(classList);
    sections[0].style.display = 'none';
    sections[1].style.display = 'flex';

    if (classList[classToBeViewed].score != '') {
        scoreNeededDisp.style.display = 'block';
        scoreNeededFinal.innerHTML = classList[classToBeViewed].score + "%";
    }

    classTitle.innerHTML = classList[classToBeViewed].title;

    let currentDay = new Date();
    let finalDay = classList[classToBeViewed].finalDate;
    let difference = finalDay.getTime() - currentDay.getTime();
    let dayDifference = difference / (1000 * 60 * 60 * 24);
    timeUntilLastFinalDisp.innerHTML = Math.round(dayDifference) + " day(s)";
    resetTasks();
    generateTasks(classToBeViewed);

}

function resetTasks() {
    for (let i = 0; i < document.getElementsByClassName("task").length; i++) {
        let taskToBeRemoved = document.getElementsByClassName("task")[0];
        taskOverviewContainer.removeChild(taskToBeRemoved);
    }
}

function generateTasks(classToBeViewed) {
    for (let i = 0; i < classList[classToBeViewed].tasks.length; i++) {
        createTaskElement(classToBeViewed, i);
    }
}

function createTask() {
    let taskTitle = createTaskNameInput.value;
    let taskDescription = createTaskDescriptionInput.value;
    if (taskTitle === '') {
        window.alert("Please enter a task name!");
    } else {
        let taskPushback = new taskTemplate(taskTitle, taskDescription);

        let classIdentifier;
        for (let i = 0; i < classList.length; i++) {
            if (classList[i].title == classTitle.innerHTML) {
                classIdentifier = i;
            }
        }

        classList[classIdentifier].tasks.push(taskPushback);
        createNewTaskModal.close();
        createTaskElement(classIdentifier, classList[classIdentifier].tasks.length - 1);
    }
}

function createTaskElement(classToBeViewed, taskToBeViewed) {
    let visibleDescription = '';
    for (let i = 0; i < 10; i++) {
        if (classList[classToBeViewed].tasks[taskToBeViewed].description.length > i) {
            visibleDescription += classList[classToBeViewed].tasks[taskToBeViewed].description[i];
        }
    }
    let newTaskDisp = document.createElement('div');
    newTaskDisp.classList.add('task');
    newTaskDisp.innerHTML = `
                    <h4 class="taskTitle" style="margin-bottom: 0; margin-top: auto;" onclick="showTaskFull(${classToBeViewed}, ${taskToBeViewed});">${classList[classToBeViewed].tasks[taskToBeViewed].title}</h4>
                    <p class="taskDescription" style="margin-top: 0;" onclick="showTaskFull(${classToBeViewed}, ${taskToBeViewed})">${visibleDescription}...</p>
                    <button class="viewTask styledButton screenModify taskDone" onclick="deleteTask(${classToBeViewed}, ${taskToBeViewed})">Done</button>
                   <!-- <button class="viewTask styledButton screenModify taskAdd">+</button> -->`;
    taskOverviewContainer.appendChild(newTaskDisp);
    classDispTasksCompleted.innerHTML = determineTaskCompletedAmount(classToBeViewed) + "%";
}

function showTaskFull(classToBeViewed, taskToBeViewed) {
    taskInfoModal.showModal();
    taskInfoTitle.innerHTML = classList[classToBeViewed].tasks[taskToBeViewed].title;
    taskInfoDescription.innerHTML = classList[classToBeViewed].tasks[taskToBeViewed].description;
}

function deleteTask(classToBeViewed, taskToBeViewed) {
    let tasksClassList = document.getElementsByClassName('task').length - 1;
    let taskToBeRemoved = document.getElementsByClassName('task')[taskToBeViewed];
    document.getElementsByClassName('task')[taskToBeViewed].style.display = 'none';
    console.log(document.getElementsByClassName('task')[document.getElementsByClassName('task').length - 1]);

    classList[classToBeViewed].tasks[taskToBeViewed].completed = true;
    classDispTasksCompleted.innerHTML = determineTaskCompletedAmount(classToBeViewed) + "%";
}

function determineTaskCompletedAmount(classToBeViewed) {
    let tasksTotal = classList[classToBeViewed].tasks.length;
    let tasksCompleted = 0;
    for (let i = 0; i < tasksTotal; i++) {
        if (classList[classToBeViewed].tasks[i].completed) {
            tasksCompleted++;
        }
    }

    return ((tasksCompleted / tasksTotal) * 100).toFixed(2);
}
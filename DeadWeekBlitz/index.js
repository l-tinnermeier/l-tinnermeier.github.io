// VARIABLES

'use strict';

const title = document.getElementById('title');
const timeUntilLastFinalDisp = document.getElementById('timeUntilLastFinal');

let sections = document.getElementsByTagName('main');
const createNewClassModal = document.getElementById('createNewClassModal');
const createNewTaskModal = document.getElementById('createNewTaskModal');

let testBtn = document.getElementById('testButton');
let testBtn2 = document.getElementById('testButton2');
let testBtn3 = document.getElementById('testButton3');

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
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
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('tasklist');

document.addEventListener('DOMContentLoaded', loadTasks);

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskTxt = taskInput.value.trim();
    if (taskTxt) {
        addTask(taskTxt);
        saveTask(taskTxt);
        taskInput.value = '';
    }
});

function addTasks(taskTxt, isCompleted=false) {
}

function saveTask(taskTxt) {

}

function removeTask(taskTxt) {

}

function toggleTask(taskTxt) {

}

function loadTasks() {

}
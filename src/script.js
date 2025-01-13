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
    const li = document.createElement('li');
    li.textContent = taskTxt;

    if (isCompleted) li.classList.add('completed');

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.className = 'complete-btn';
    completeBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
        toggleTask(taskTxt);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
        li.remove();
        removeTask();
    });
    
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}


function saveTask(taskTxt) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ taskTxt, completed:false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(taskTxt) {
    let tasks = JSON.parse(localStorage.getItm("tasks")) || [];
    tasks.filter((task) => task.text !== taskTxt);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleTask(taskTxt) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find((task) => task.text === taskTxt);
    if (task) task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.array.forEach((task) => {
        addTask(task.txt, task.completed);
    });
}
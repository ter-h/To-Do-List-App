const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

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

function addTask(taskTxt, isCompleted=false) {

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
        removeTask(taskTxt);
    });
    
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTask(taskTxt) {
    if (!taskTxt) return;
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskTxt, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(taskTxt) {
    if (!taskTxt) return;
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task.text !== taskTxt);
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
    tasks.forEach((task) => {
            addTask(task.text, task.completed);
            console.log(task);
    });
}

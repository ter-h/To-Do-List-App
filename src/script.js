const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const clrBtn = document.getElementById('clear-all-btn');

document.addEventListener('DOMContentLoaded', loadTasks);
clrBtn.addEventListener('click', clearAllTasks);

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

    const completeCheckbox = document.createElement('input');
    const checkboxId = `checkbox-${Date.now()}`;
    completeCheckbox.type = 'checkbox';
    completeCheckbox.className = 'complete-checkbox';
    completeCheckbox.id = checkboxId;
    completeCheckbox.checked = isCompleted;
  
    completeCheckbox.addEventListener('change', () => {
      li.classList.toggle('completed');
      toggleTask(taskTxt);
    });
  
    const completeLabel = document.createElement('label');
    completeLabel.className = 'complete-label';
    completeLabel.setAttribute('for', checkboxId);

    const taskName = document.createElement('span');
    taskName.textContent = taskTxt;


    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
        li.remove();
        removeTask(taskTxt);
    });
    
    li.appendChild(completeCheckbox);
    li.appendChild(completeLabel);
    li.appendChild(taskName);
    li.appendChild(deleteBtn);

    if (isCompleted) {
        li.classList.add('completed');
    }

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

function clearAllTasks() {
    taskList.innerHTML = '';
    localStorage.removeItem('tasks');
}



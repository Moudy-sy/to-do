let button = document.getElementById('taskButton');
let clearButton = document.getElementById('clearButton');
let taskList = document.getElementById('task');
let input = document.getElementById('taskInput');

// Load the saved to-do list from local storage on page load
window.onload = () => {
    let savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        for (let i = 0; i < savedTasks.length; i++) {
            let task = savedTasks[i];
            addTaskToList(task);
        }
    }
};

button.onclick = (event) => {
    event.preventDefault();
    let newTask = input.value.trim();
    if (newTask !== '') {
        addTaskToList(newTask);

        // Save the updated to-do list to local storage
        saveTasksToLocalStorage();

        // Clear the input field
        input.value = '';
    }
};

clearButton.onclick = () => {
    // Remove all tasks from the task list
    taskList.innerHTML = '';

    // Clear the saved to-do list from local storage
    localStorage.removeItem('tasks');
};

function addTaskToList(task) {
    // Add the new task to the list
    let li = document.createElement('li');
    li.innerHTML = `${task} <button class="delete-button">x</button>`;
    taskList.appendChild(li);

    // Add event listener to the delete button
    let deleteButton = li.querySelector('.delete-button');
    deleteButton.addEventListener('click', (event) => {
        event.preventDefault();
        let taskItem = deleteButton.parentElement;
        taskItem.remove();

        // Save the updated to-do list to local storage
        saveTasksToLocalStorage();
    });
}

function saveTasksToLocalStorage() {
    let tasks = [];
    let taskItems = taskList.getElementsByTagName('li');
    for (let i = 0; i < taskItems.length; i++) {
        let taskItem = taskItems[i];
        let taskText = taskItem.textContent.trim();
        tasks.push(taskText);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage when the page loads
    loadTasks();

    // Function to load and display tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // false = don't save again
        });
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // If function is triggered from user input, get the value from the input field
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create new list item
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");

        // Remove the task from DOM and localStorage
        removeBtn.onclick = function () {
            taskList.removeChild(listItem);
            removeTaskFromStorage(taskText);
        };

        listItem.appendChild(removeBtn);
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = "";

        // Save to localStorage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Function to remove task from localStorage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Event listeners
    addButton.addEventListener('click', () => addTask());

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

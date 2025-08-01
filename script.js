// Wait for the DOM to fully load before running any code
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get and trim input value

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
        removeBtn.classList.add("remove-btn"); // ✅ Use classList.add as required

        // Remove the task when remove button is clicked
        removeBtn.onclick = function () {
            taskList.removeChild(listItem);
        };

        // Append button to list item, and item to the task list
        listItem.appendChild(removeBtn);
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = "";
    }

    // Add task when "Add Task" button is clicked
    addButton.addEventListener('click', addTask);

    // Add task when user presses Enter in the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

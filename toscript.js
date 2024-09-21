document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${index})">
                <span>${task.text}</span>
                <div>
                    <button class="edit" onclick="editTask(${index})">Edit</button>
                    <button class="delete" onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    window.editTask = function(index) {
        const newText = prompt('Edit task:', tasks[index].text);
        if (newText !== null && newText.trim() !== '') {
            tasks[index].text = newText.trim();
            saveTasks();
            renderTasks();
        }
    }

    window.deleteTask = function(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    window.toggleTask = function(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTask = {
            text: taskInput.value.trim(),
            completed: false
        };
        if (newTask.text !== '') {
            tasks.push(newTask);
            saveTasks();
            renderTasks();
            taskInput.value = '';
        } else {
            alert('Task cannot be empty');
        }
    });

    renderTasks();
});

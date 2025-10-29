document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const darkModeToggle = document.getElementById('darkModeToggle');
    let tasks = [];
    let currentFilter = 'all';
    let currentCategoryFilter = 'all';
    init();
    
    function init() {
        addTaskBtn.addEventListener('click', addTask);
        taskInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTask();
                loadTasks();
            }
        });
        
        darkModeToggle.addEventListener('click', toggleDarkMode);
        
        console.log('Todo app initialized with basic event listeners');
    }
    
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
});
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
    
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        category: 'general',
        date: new Date().toLocaleDateString()
    };
    
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = '';
    taskInput.focus();
}

function toggleTaskCompletion(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    
    saveTasks();
    renderTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';
    if (tasks.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                <span class="task-date">${task.date}</span>
                <button class="delete-btn">×</button>
            `;
            const checkbox = taskItem.querySelector('.task-checkbox');
            checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));
            
            const deleteBtn = taskItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => deleteTask(task.id));
            
            taskList.appendChild(taskItem);
        });
    }
}
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}



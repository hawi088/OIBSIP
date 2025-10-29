document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const categoryList = document.getElementById('categoryList');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const taskCategory = document.getElementById('taskCategory');
    const emptyState = document.getElementById('emptyState');
    const currentCategory = document.getElementById('currentCategory');
    const totalTasks = document.getElementById('totalTasks');
    const completedTasks = document.getElementById('completedTasks');
    const pendingTasks = document.getElementById('pendingTasks');
    const taskCount = document.getElementById('taskCount');
    const completedCount = document.getElementById('completedCount');

    let tasks = [];
    let currentFilter = 'all';
    let currentCategoryFilter = 'all';
    init();
    
    
    function init() {
        // Load tasks from localStorage
        loadTasks();
        
        // Set up event listeners
        addTaskBtn.addEventListener('click', addTask);
        taskInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTask();
            }
        });
        
        darkModeToggle.addEventListener('click', toggleDarkMode);
        
        categoryList.addEventListener('click', function(e) {
            if (e.target.classList.contains('category-item') || 
                e.target.parentElement.classList.contains('category-item')) {
                const categoryItem = e.target.classList.contains('category-item') 
                    ? e.target 
                    : e.target.parentElement;
                
                // Update active category
                document.querySelectorAll('.category-item').forEach(item => {
                    item.classList.remove('active');
                });
                categoryItem.classList.add('active');
                
                // Filter tasks by category
                currentCategoryFilter = categoryItem.dataset.category;
                currentCategory.textContent = categoryItem.textContent.trim();
                filterTasks();
            }
        });
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentFilter = this.dataset.filter;
                filterTasks();
            });
        });
        
        // Update summary
        updateSummary();
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
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            category: taskCategory.value,
            date: new Date().toLocaleDateString()
        };
        
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        
        // Clear input
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
        updateSummary();
    }
    
    
    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        renderTasks();
        updateSummary();
    }
    
    
    function renderTasks() {
        // Filter tasks based on current category and status filter
        let filteredTasks = tasks;
        
        // Apply category filter
        if (currentCategoryFilter !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.category === currentCategoryFilter);
        }
        
        // Apply status filter
        if (currentFilter === 'pending') {
            filteredTasks = filteredTasks.filter(task => !task.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = filteredTasks.filter(task => task.completed);
        }
        
        // Clear task list
        taskList.innerHTML = '';
        
        // Show empty state if no tasks
        if (filteredTasks.length === 0) {
            emptyState.style.display = 'block';
            taskCount.textContent = '0 tasks';
            completedCount.textContent = '0 completed';
        } else {
            emptyState.style.display = 'none';
            
            // Update task count
            const completed = filteredTasks.filter(task => task.completed).length;
            taskCount.textContent = `${filteredTasks.length} task${filteredTasks.length !== 1 ? 's' : ''}`;
            completedCount.textContent = `${completed} completed`;
            
            // Render tasks
            filteredTasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.className = 'task-item';
                taskItem.innerHTML = `
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                    <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                    <span class="task-category">${task.category}</span>
                    <span class="task-date">${task.date}</span>
                    <button class="delete-btn">×</button>
                `;
                
                // Add event listeners
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
    
     
    function filterTasks() {
        renderTasks();
    }
    function updateSummary() {
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        const pending = total - completed;
        
        totalTasks.textContent = total;
        completedTasks.textContent = completed;
        pendingTasks.textContent = pending;
    }
    
});

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // State variables
    let tasks = [];
    let currentFilter = 'all';
    let currentCategoryFilter = 'all';
    
    // Initialize the app
    init();
    
    function init() {
        // Set up event listeners
        addTaskBtn.addEventListener('click', addTask);
        taskInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTask();
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
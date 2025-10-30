class CanvaAuth {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('canvaUsers')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentCanvaUser')) || null;
        this.init();
    }

    init() {
        this.initPasswordToggle();
        this.initPasswordStrength();
        if (document.getElementById('loginForm')) {
            this.initLogin();
        }
        
        if (document.getElementById('registerForm')) {
            this.initRegister();
        }
        
        this.checkAuth();
    }
    authenticate(email, password) {
        return this.users.find(user => 
            user.email === email && user.password === password
        );
    }

    userExists(email) {
        return this.users.some(user => user.email === email);
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    checkAuth() {
        console.log('Auth check complete - user can manually login');
    }
}
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
    initPasswordToggle() {
        document.querySelectorAll('.password-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const input = e.target.parentElement.querySelector('.form-input');
                if (input.type === 'password') {
                    input.type = 'text';
                    e.target.textContent = 'Hide';
                } else {
                    input.type = 'password';
                    e.target.textContent = 'Show';
                }
            });
        });
    }

    initPasswordStrength() {
        const passwordInput = document.getElementById('regPassword');
        if (passwordInput) {
            passwordInput.addEventListener('input', (e) => {
                this.updatePasswordStrength(e.target.value);
            });
        }
    }
     updatePasswordStrength(password) {
        const strengthBar = document.querySelector('.strength-bar');
        if (!strengthBar) return;

        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        const width = (strength / 5) * 100;
        strengthBar.style.width = `${width}%`;
        
        strengthBar.className = 'strength-bar';
        if (width >= 60) strengthBar.classList.add('medium');
        if (width >= 80) strengthBar.classList.add('strong');
    }
    initLogin() {
        const form = document.getElementById('loginForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const button = form.querySelector('.submit-btn');
            button.classList.add('loading');
    
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const user = this.authenticate(email, password);
            
            if (user) {
                this.currentUser = user;
                localStorage.setItem('currentCanvaUser', JSON.stringify(user));
                this.showMessage('Login successful! Redirecting to Canva...', 'success');
                
                setTimeout(() => {
                    window.location.href = 'https://www.canva.com';
                }, 1000);
            } else {
                this.showMessage('Invalid email or password', 'error');
                button.classList.remove('loading');
            }
        });
      
    }
    initRegister() {
        const form = document.getElementById('registerForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;
            const button = form.querySelector('.submit-btn');
            if (password !== confirmPassword) {
                this.showMessage('Passwords do not match', 'error');
                return;
            }
            
            if (password.length < 8) {
                this.showMessage('Password must be at least 8 characters', 'error');
                return;
            }
            
            if (!terms) {
                this.showMessage('Please accept the terms and conditions', 'error');
                return;
            }
        
        if (this.userExists(email)) {
            this.showMessage('Email already registered', 'error');
            return;
        }
        
        button.classList.add('loading');
        await new Promise(resolve => setTimeout(resolve, 2000));
        const newUser = {
            id: this.generateId(),
            firstName,
            lastName,
            email,
            password,
            createdAt: new Date().toISOString(),
            plan: 'free'
        };
        
        this.users.push(newUser);
        localStorage.setItem('canvaUsers', JSON.stringify(this.users));
        this.showMessage('Account created successfully! You can now login to access Canva.', 'success');
        
        setTimeout(() => {
            window.location.href = 'https://www.canva.com';
        }, 1000);
    });
}
showMessage(message, type) {
    const existingMsg = document.querySelector('.form-message');
    if (existingMsg) existingMsg.remove();
    
    const messageEl = document.createElement('div');
    messageEl.className = `form-message ${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        padding: 0.75rem;
        margin: 1rem 0;
        border-radius: 8px;
        font-size: 0.875rem;
        text-align: center;
        background: ${type === 'success' ? '#c6f6d5' : '#fed7d7'};
        color: ${type === 'success' ? '#22543d' : '#742a2a'};
        border: 1px solid ${type === 'success' ? '#9ae6b4' : '#feb2b2'};
    `;
    
    const form = document.querySelector('.auth-form');
    form.insertBefore(messageEl, form.firstChild);
    
    setTimeout(() => {
        messageEl.remove();
    }, 5000);
}
    
}
document.addEventListener('DOMContentLoaded', () => {
    new CanvaAuth();
});
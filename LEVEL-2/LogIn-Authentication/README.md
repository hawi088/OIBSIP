# Canva-Style Authentication System
A modern, responsive authentication interface inspired by Canva's design language, featuring both login and registration forms with smooth animations and interactive elements.
(This is a personal project inspired by Canva's design language. Canva® is a registered trademark of Canva Pty Ltd. This project is not affiliated with, endorsed by, or connected to Canva Pty Ltd.)
##Features

**Authentication Forms**
-**Sign In Form**: Email/password login with "Remember me" option
-**Sign Up Form**: Complete registration with name, email, password confirmation
-**Social Authentication**: Google, Facebook, and Apple login options
-**Password Management**: Show/hide password toggle and strength indicator

##User Experience

-**Responsive Design**: Works seamlessly across all device sizes
-**Form Validation**: Real-time validation with user-friendly error messages
-**Password Strength Meter**: Visual indicator for password security
-**Loading States**: Animated loading buttons during form submission
-**Smooth Animations**: CSS transitions and hover effects

##Security & Storage

-**Local Storage**: User data persistence using browser localStorage
-**Secure Authentication**: Password matching and duplicate email checks
-**Terms Acceptance**: Mandatory terms and conditions agreement

##Quick Start

**Prerequisites**
-Modern web browser with JavaScript enabled
-Local server (for local storage to work properly)

##Installation

-Clone or download the project files
-Ensure all files are in the same directory:
◽index.html (Sign In page)
◽register.html (Sign Up page)
◽style.css (Stylesheet)
◽script.js (JavaScript functionality)
-Open index.html in a web browser

 ##File Structure
 LogIn-Authentication/
├── index.html          # Sign In page
├── register.html       # Sign Up page  
├── style.css           # All styling components
└── script.js           # Authentication logic & interactions

##Design Features

##Visual Elements
-**Clean Interface**: Minimalist design with ample white space
-**Color Scheme**: Professional blues and grays with accent colors
-**Typography**: System font stack for optimal readability
-**Icons**: Font Awesome icons for social buttons and UI elements

##Interactive Components
-**Form Inputs**: Animated labels and focus states
-**Checkboxes**: Custom-styled checkboxes with smooth transitions
-**Buttons**: Hover effects with subtle animations
-**Password Toggle**: Show/hide password functionality

##Technical Implementation
**CSS Architecture**
-**Modern CSS**: Flexbox layout system
-**Responsive Grid**: Adaptive form layouts
-**Smooth Transitions**: CSS animations for all interactive elements
-**Shadow Effects**: Subtle shadows for depth and dimension

##JavaScript Functionality
-**Class-based Architecture**: CanvaAuth class managing all authentication logic
-**Event Handling**: Form submissions, input validation, and user interactions
-**Local Storage Management**: Persistent user data storage
-**Password Strength Algorithm**: Multi-factor password validation

##Form Specifications
-Sign In Form Fields
-Email address (required)
-Password (required)
-Remember me checkbox
-Forgot password link

##Sign Up Form Fields
-First name (required)
-Last name (required)
-Email address (required)
-Password (required, minimum 8 characters)
-Confirm password (required)
-Terms acceptance (required)-
-Newsletter subscription (optional)

##Security Features
-**Password Validation:** Minimum 8 characters with strength assessment
-**Email Uniqueness**: Prevents duplicate account registration
-**Data Encryption**: Passwords stored securely (in localStorage)
-**Input Sanitization**: Client-side form validation

##Browser Compatibility
-Chrome 60+
-Firefox 55+
-Safari 12+
-Edge 79+

##License
This project is for educational purposes. Canva is a trademark of Canva Pty Ltd.

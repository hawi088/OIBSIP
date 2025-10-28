let displayBoard = document.getElementById("displayBoard");

function appendValue(value) {
    // Prevent multiple decimal points in the same number
    if (value === '.' && displayBoard.value.includes('.') && !isOperatorLast()) {
        return;
    }
    
    // Prevent operators from being added consecutively
    if (isOperator(value) && isOperatorLast()) {
        return;
    }
    
    displayBoard.value += value;
}

function clearDisplay() {
    displayBoard.value = "";
}

function deleteLast() {
    displayBoard.value = displayBoard.value.slice(0, -1);
}

function calculate() {
    try {
        if (displayBoard.value === "") {
            return;
        }
        
        // Replace % with /100 for percentage calculation
        let expression = displayBoard.value.replace(/%/g, '/100');
        
        // Validate the expression before evaluating
        if (!isValidExpression(expression)) {
            displayBoard.value = "Error";
            return;
        }
        
        let result = eval(expression);
        
        // Handle division by zero and other math errors
        if (!isFinite(result)) {
            displayBoard.value = "Error";
        } else {
            // Round to avoid floating point precision issues
            displayBoard.value = Math.round(result * 100000000) / 100000000;
        }
    } catch (error) {
        displayBoard.value = "Error";
    }
}

// Helper function to check if a character is an operator
function isOperator(char) {
    return ['+', '-', '*', '/', '%'].includes(char);
}

// Helper function to check if the last character is an operator
function isOperatorLast() {
    if (displayBoard.value === "") return false;
    return isOperator(displayBoard.value[displayBoard.value.length - 1]);
}

// Helper function to validate the expression
function isValidExpression(expr) {
    // Check for invalid characters
    if (!/^[0-9+\-*/.%() ]+$/.test(expr)) {
        return false;
    }
    
    // Check for balanced parentheses (basic check)
    let openParen = (expr.match(/\(/g) || []).length;
    let closeParen = (expr.match(/\)/g) || []).length;
    if (openParen !== closeParen) {
        return false;
    }
    
    return true;
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Numbers and operators
    if (/[0-9+\-*/.%]/.test(key)) {
        appendValue(key);
    }
    // Enter key for equals
    else if (key === 'Enter') {
        calculate();
    }
    // Escape key for clear
    else if (key === 'Escape') {
        clearDisplay();
    }
    // Backspace for delete
    else if (key === 'Backspace') {
        deleteLast();
    }
});
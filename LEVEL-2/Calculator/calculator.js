let displayBoard = document.getElementById("displayBoard");

function appendValue(value) {
    if (value === '.' && displayBoard.value.includes('.') && !isOperatorLast()) {
        return;
    }
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
    let expression = displayBoard.value.replace(/%/g, '/100');
        if (!isValidExpression(expression)) {
        displayBoard.value = "Error";
            return;
        }
        
  let result = eval(expression);

        if (!isFinite(result)) {
            displayBoard.value = "Error";
        } else {
            displayBoard.value = Math.round(result * 100000000) / 100000000;
        }
    } catch (error) {
        displayBoard.value = "Error";
    }
}

function isOperator(char) {
    return ['+', '-', '*', '/', '%'].includes(char);
}
function isOperatorLast() {
    if (displayBoard.value === "") return false;
    return isOperator(displayBoard.value[displayBoard.value.length - 1]);
}
function isValidExpression(expr) {
    if (!/^[0-9+\-*/.%() ]+$/.test(expr)) {
        return false;
    }

 let openParen = (expr.match(/\(/g) || []).length;
let closeParen = (expr.match(/\)/g) || []).length;
if (openParen !== closeParen) {
     return false;
    }
    
    return true;
}
document.addEventListener('keydown', function(event) {
    const key = event.key;
  
    if (/[0-9+\-*/.%]/.test(key)) {
        appendValue(key);
    }
    else if (key === 'Enter') {
        calculate();
    }
    else if (key === 'Escape') {
        clearDisplay();
    }
    else if (key === 'Backspace') {
        deleteLast();
    }
});

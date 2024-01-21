const display = document.querySelector('#display');
const SYNTAX_ERROR_MSG = 'ERROR';
let syntaxErrorOcurred = false;
let num1 = null;
let operator = null;
let num2 = null;
let operatorWasClicked = false;
let equalsWasClicked = false;
let resultIsSet = false;

const operatorMethods = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
};

function handleNumButtons() {
    const numButtons = document.querySelectorAll('.num');
    numButtons.forEach(btn => btn.addEventListener(
        'click',
        () => {
            if (syntaxErrorOcurred) clearAll();
            if (display.textContent.length >= 5) {
                alert('Number must be below 10^5');
                return;
            }
            if (equalsWasClicked) {
                clearAll();
                equalsWasClicked = false;
            }
            let displayText = Number(display.textContent) * 10 + Number(btn.textContent);
            if (!operatorWasClicked) {
                num1 = displayText;
            } else {
                if (num2 === null) {
                    clearDisplay();
                    displayText = Number(btn.textContent);
                }
                num2 = displayText;
            }
            display.textContent = displayText;
        }
    ));
}

function clearDisplay() {
    syntaxErrorOcurred = false;
    display.textContent = 0;
}

function clearAll() {
    clearDisplay();
    num1 = null;
    num2 = null;
    operatorWasClicked = false;
}

function handleAllClearButton() {
    const clearButton = document.getElementById('clear-btn');
    clearButton.addEventListener(
        'click',
        clearAll
    );
}

function setResult() {
    display.textContent = operatorMethods[operator](num1, num2);
    num1 = Number(display.textContent);
}

function handleDivideByZero() {
    alert('OI!, you can\'t divide by zero');
}

function handleOperatorButton() {
    const operators = document.querySelectorAll('.operator');
    operators.forEach(op => op.addEventListener(
        'click',
        () => {
            if (!operatorWasClicked) {
                operatorWasClicked = true;
                equalsWasClicked = false;
            } else {
                if (num2 === null) return;
                if (num2 === 0 && operator === '/') {
                    handleDivideByZero();
                    clearAll();
                    return;
                }
                num1 = operatorMethods[operator](num1, num2);
                display.textContent = num1;
                num2 = null;
            }
            operator = op.textContent;
        }
    ));
}

function handleEqualsButton() {
    const equalsButton = document.getElementById('equals-btn');
    equalsButton.addEventListener(
        'click',
        () => {
            if (num2 === null && operatorWasClicked) {
                clearDisplay();
                syntaxErrorOcurred = true;
                display.textContent = SYNTAX_ERROR_MSG;
            }
            if (num2 === null) return;
            if (num2 === 0 && operator === '/') {
                handleDivideByZero();
                clearAll();
                return;
            }
            num1 = operatorMethods[operator](num1, num2);
            num2 = null;
            display.textContent = num1;
            operatorWasClicked = false;
            equalsWasClicked = true;
        }
    );
}

handleNumButtons();
handleAllClearButton();
handleOperatorButton();
handleEqualsButton();
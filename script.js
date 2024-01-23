const display = document.querySelector('#display');
const pointBtn = document.getElementById('point');
const SYNTAX_ERROR_MSG = 'ERROR';
let syntaxErrorOcurred = false;
let num1 = null;
let operator = null;
let num2 = null;
let operatorWasClicked = false;
let equalsWasClicked = false;
let resultIsSet = false;

function isFloatingPointNumber(num) {
    return Math.floor(num) !== Number(num);
}

function isLongNumber(num) {
    return num.toString().length > 9;
}

function operate(a, op, b) {
    a = Number(a);
    b = Number(b);
    let result = null;
    switch (op) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': result = a / b; break;
        default: return null;
    }
    if (isLongNumber(result)) {
        return result.toExponential(4);
    }
    return result;
};

function handleNumWrapper(event) {
    handleNum(event.target.textContent);
}

function handleNum(num) {
    if (syntaxErrorOcurred) clearAll();
    if (display.textContent.length >= 9) {
        if (!operatorWasClicked || (operatorWasClicked && num2 !== null)) {
            alert('Length of number must be less than 6 characters');
            return;
        }
    }
    if (equalsWasClicked) {
        clearAll();
        equalsWasClicked = false;
    }
    let displayText = display.textContent === '0' ?
        num : display.textContent.concat(num);
    if (!operatorWasClicked) {
        num1 = displayText;
    } else {
        if (num2 === null) {
            clearDisplay();
            displayText = num;
        }
        num2 = displayText;
    }
    display.textContent = displayText;
}

function handleNumButtons() {
    const numButtons = document.querySelectorAll('.num');
    numButtons.forEach(btn => btn.addEventListener(
        'click',
        handleNumWrapper
    ));
}

function disablePointButton() {
    pointBtn.style.boxShadow = 'none';
    pointBtn.style.opacity = '0.3';
    pointBtn.style.cursor = 'not-allowed';
    pointBtn.disabled = true;
}
function enablePointButton() {
    pointBtn.style.boxShadow = '2px 2px 5px black';
    pointBtn.style.opacity = '1';
    pointBtn.style.cursor = 'pointer';
    pointBtn.disabled = false;
}

function handlePoint() {
    if (pointBtn.disabled) return;
    display.textContent += '.';
    disablePointButton();
}

function handlePointButton() {
    const pointBtn = document.getElementById('point');
    pointBtn.addEventListener(
        'click',
        handlePoint
    )
}

function clearDisplay() {
    syntaxErrorOcurred = false;
    display.textContent = 0;
    enablePointButton();
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
    num1 = operate(num1, operator, num2);
    display.textContent = num1;
    num2 = null;
}

function handleDelete() {
    if (display.textContent == '0' || equalsWasClicked || (operatorWasClicked && num2 === null)) return;
    else if (!operatorWasClicked || (operatorWasClicked && num2 !== null)) {
        if (display.textContent.length === 1) {
            display.textContent = 0;
        } else {
            display.textContent = display.textContent.slice(0, -1);
        }
    }
    if (!operatorWasClicked) {
        num1 = display.textContent;
    } else {
        num2 = display.textContent;
    }
}

function handleDeleteButton() {
    const deleteButton = document.getElementById('delete');
    deleteButton.addEventListener(
        'click',
        handleDelete
    );
}

function handleDivideByZero() {
    alert('OI!, you can\'t divide by zero');
}

function handleOperator(op) {
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
        setResult();
    }
    operator = op;
}

function handleOperatorWrapper(event) {
    handleOperator(event.target.textContent);
}

function handleOperatorButton() {
    const operators = document.querySelectorAll('.operator');
    operators.forEach(op => op.addEventListener(
        'click',
        handleOperatorWrapper
    ));
}

function handleEquals() {
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
    setResult();
    operatorWasClicked = false;
    equalsWasClicked = true;
}

function handleEqualsButton() {
    const equalsButton = document.getElementById('equals-btn');
    equalsButton.addEventListener(
        'click',
        handleEquals
    );
}

function isNumber(x) {
    return !isNaN(Number.parseInt(x));
}

function isOperator(x) {
    const operators = ['+', '-', '*', '/'];
    return operators.includes(x);
}

function isEnterOrEquals(x) {
    return ['Enter', '='].includes(x);
}

function isBackspace(x) {
    return x === 'Backspace';
}

function isPoint(x) {
    return x === '.';
}

function isValidInput(x) {
    return isNumber(x) || isOperator(x) || isEnterOrEquals(x) || isBackspace(x) || isPoint(x);
}

function handleKeys() {
    document.addEventListener(
        'keydown',
        (e) => {
            if (!isValidInput(e.key)) return;
            if (isNumber(e.key)) handleNum(e.key);
            else if (isOperator(e.key)) handleOperator(e.key);
            else if (isPoint(e.key)) handlePoint(e.key);
            else if (isBackspace(e.key)) handleDelete();
            else if (isEnterOrEquals(e.key)) handleEquals();
        }
    )
}

handleNumButtons();
handleDeleteButton();
handleAllClearButton();
handleOperatorButton();
handleEqualsButton();
handlePointButton();
handleKeys();
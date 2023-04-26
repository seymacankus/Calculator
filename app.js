const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");

let displayValue = "0";
let operator = null;
let firstValue = null;
let waitSecondValue = false;

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}

keys.addEventListener("click", function (event) {
    const element = event.target;
    const value = element.value;
    if (!element.matches("button")) return;
    switch (value) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "=":
            handleOperator(value);
            break;
        case ".":
            inputDecimal();
            break;
        case "clear":
            clear();
            break;
        default:
            inputNumber(value);
            break;
    }
    updateDisplay();
});

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);
    if (operator && waitSecondValue) {
        operator = nextOperator;
        return;
    }
    if (firstValue == null) {
        firstValue = value;
    } else {
        const result = calculate(firstValue, operator, value);
        displayValue = parseFloat(result.toFixed(6));
        firstValue = result;
    }
    operator = nextOperator;
    waitSecondValue = true;

}
function inputDecimal() {
    displayValue = String(displayValue);
    console.log(displayValue, typeof displayValue);
    if (!displayValue.includes(".")) {
        displayValue += ".";
    }
}
function clear() {
    displayValue = "0";
}
function inputNumber(num) {
    if (waitSecondValue) {
        displayValue = num;
        waitSecondValue = false;
    } else {
        displayValue = displayValue === "0" ? num : displayValue + num;
    }
}

function calculate(firstNumber, op, secondNumber) {
    switch (op) {
        case "+":
            return firstNumber + secondNumber;
        case "-":
            return firstNumber - secondNumber;
        case "*":
            return firstNumber * secondNumber;
        case "/":
            return firstNumber / secondNumber;
        default:
            return secondNumber;
    }
}
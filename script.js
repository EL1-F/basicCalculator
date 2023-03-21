const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

function updateDisplay() {
    display.value =displayValue;
}


keys.addEventListener('click',function(e){
    const element = e.target;

    if (!element.matches('button')) return;

    if (element.classList.contains('operator')) {
        handleOperator(element.value);
        updateDisplay();
        return;
    }

    if (element.classList.contains('clear')) {
        clear();
        updateDisplay();
        return;
    }

    if (element.classList.contains('decimal')) {
        inputDecimal();
        updateDisplay();
        return;
    }

    inputNumber(element.value);
    //console.log(element.value);
    updateDisplay();
})

function inputNumber(num) {

    if (waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    }else{
        displayValue = displayValue ==='0'? num: displayValue + num;
    }

    console.log(displayValue,firstValue,operator,waitingForSecondValue);
}

function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue+='.';
    }
}

function clear() {
    displayValue='0';
}

function handleOperator(nextOperator) {
    const value= parseFloat(displayValue);

    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue == null) {
        firstValue = value;
    }else if (operator) {
        const result = calculate(firstValue,value,operator);

        displayValue= String(result);
        firstValue =result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;

    console.log(displayValue,firstValue,operator,waitingForSecondValue);
}

function calculate(first,second,operator) {

    switch(operator) {
        case '+':
          return first+second;
          
        case '-':
            return first-second;
          
        case '*':
            return first*second;
          
        case '/':
            return  first/second;
            
        default:
            return second;
      }     
    
}
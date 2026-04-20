let calculationDisplay = document.querySelector(".calculationDisplay");
let inputElement = document.getElementById("inputElement");
let calculatorNumberButtons = document.querySelectorAll(".numberButton");
let calculatorOperatorButtons = document.querySelectorAll(".operatorButton");
let calculatorSpecialButtons = document.querySelectorAll(".specialButton");

let firstHalf = "";
let secondHalf = "";
let operator = "";
let shouldResetInput = false;

//calculator calculation logic
const calculateResult = function(first, second, operator) {
  const num1 = parseFloat(first);
  const num2 = parseFloat(second);

  if (isNaN(num1) || isNaN(num2))  return;

  switch (operator) {
    case '+': return num1 + num2;
    case '-': return num1 - num2;
    case '*': return num1 * num2;
    case '/': return num2 === 0 ?  'Error' : num1 / num2;
    default: return;
    }
}

// numbers innput logic
calculatorNumberButtons.forEach(function(button) {
  button.addEventListener("click", function(e) {
    const value = e.target.dataset.value;
    // after = resets input 
    if (shouldResetInput) {
      inputElement.value = "";
      shouldResetInput = false;
    }

    //decimal
    if (value === '.') {
      if (inputElement.value.includes('.')) return;

      if (inputElement.value === '') {
        inputElement.value = '0.';
      } else {
        inputElement.value += '.';
      }
      return;
    }
    // normal numbers
    inputElement.value += value;
  });
});

// operators logic 
calculatorOperatorButtons.forEach(function(button) {
  button.addEventListener("click", function(e) {
    const operatorSymbol = e.target.dataset.value;

    // empty input issue
    if (inputElement.value === '' && operatorSymbol !== "=") return;

    if (operatorSymbol === "=") {

      if (!firstHalf || !operator) return;

      secondHalf = inputElement.value;
      let result = calculateResult(firstHalf, secondHalf, operator);
      if (result === null) return;

      if (result !== 'Error') {
        result = Number.isInteger(result) ? result : result.toFixed(2);
      }

      calculationDisplay.textContent = `${firstHalf} ${operator} ${secondHalf} = ${result}`;
      inputElement.value = result;
      
      //next operation preparation
      firstHalf = result;
      secondHalf = "";
      operator = "";
      shouldResetInput = true;
      return;
    }

    //chaining
    if (operator && inputElement.value !== "") { 
      const result = calculateResult(firstHalf, inputElement.value, operator);
      if (result !== "Error") {
        result = Number.isInteger(result) ? result : result.toFixed(2);
      }
      firstHalf = result;
    } else {
      firstHalf = inputElement.value;
    }
    
    operator = operatorSymbol;
    inputElement.value = "";
    calculationDisplay.textContent = `${firstHalf} ${operator}`;
  });
});

// All clear 
calculatorSpecialButtons.forEach(function(button) {
  button.addEventListener("click", function(e) {
    const specialSymbol = e.target.dataset.value;
    if (specialSymbol) {
      console.log(specialSymbol);
      if (specialSymbol === "ac") {
        inputElement.value = '';
        calculationDisplay.textContent = "";
        firstHalf = "";
        secondHalf = "";
        operator = "";
        shouldResetInput = false;
      }
    }
  });
});
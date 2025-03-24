console.log("Calculator.js connected successfully!");

document.addEventListener("DOMContentLoaded", () => {
  const screen = document.getElementById("screen");
  let currentInput = "";
  let firstNumber = null;
  let operator = null;
  let isNewInput = false;

  function updateScreen() {
    screen.value = currentInput || "0";
  }

  function appendNumber(num) {
    if (isNewInput || currentInput === "Error") {
      currentInput = "";
      isNewInput = false;
    }
    currentInput += num;
    updateScreen();
  }

  function setOperator(op) {
    if (currentInput === "Error" || currentInput === "") return;
    if (firstNumber === null) {
      firstNumber = parseFloat(currentInput);
    } else if (operator) {
      calculate();
      firstNumber = parseFloat(currentInput);
    }
    operator = op;
    isNewInput = true;
  }

  function calculate() {
    if (firstNumber === null || currentInput === "" || operator === null)
      return;
    let secondNumber = parseFloat(currentInput);
    let result;

    switch (operator) {
      case "+":
        result = firstNumber + secondNumber;
        break;
      case "-":
        result = firstNumber - secondNumber;
        break;
      case "*":
        result = firstNumber * secondNumber;
        break;
      case "/":
        result = secondNumber !== 0 ? firstNumber / secondNumber : "Error";
        break;
      default:
        return;
    }

    currentInput = result.toString();
    firstNumber = result;
    operator = null;
    isNewInput = true;
    updateScreen();
  }

  function clearScreen() {
    currentInput = "";
    firstNumber = null;
    operator = null;
    isNewInput = false;
    updateScreen();
  }

  const numberButtons = document.querySelectorAll(".btn.number");
  const operatorButtons = document.querySelectorAll(".btn.operator");
  const equalButton = document.querySelector(".btn.equal");
  const clearButton = document.querySelector(".btn.clear");

  numberButtons.forEach((button) => {
    button.addEventListener("click", () => appendNumber(button.dataset.number));
  });

  operatorButtons.forEach((button) => {
    button.addEventListener("click", () =>
      setOperator(button.dataset.operator)
    );
  });

  if (equalButton) {
    equalButton.addEventListener("click", calculate);
  }

  if (clearButton) {
    clearButton.addEventListener("click", clearScreen);
  }

  updateScreen();
});

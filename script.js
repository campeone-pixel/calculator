// output visor of the calculator
const input = document.querySelector(".input>span");
const currentOperation = document.querySelector(".operation>span");

// global variables
let lastValue = undefined;
let operationActive = undefined;
let finishedOperation = false;

// all the mathematical functions
function operate(operation) {
  let result = 0;
  if (operation === "+") {
    result = add(lastValue, +input.innerHTML);
  } else if (operation === "-") {
    result = subtract(lastValue, +input.innerHTML);
  } else if (operation === "/") {
    result = divide(lastValue, +input.innerHTML);
  } else if (operation === "x") {
    result = multiply(lastValue, +input.innerHTML);
  }
  const numberToText = result.toString();
  const arrayNumber = numberToText.split(".");
  if (result === Infinity) {
    return "Error";
    updateFinishedOperation(1);
  } else {
    if (numberToText.length < 16) {
      return result;
    } else {
      if (arrayNumber[0].length > 10) {
        return result.toExponential(4);
      } else if (arrayNumber[1].length > 8) {
        return result.toFixed(4);
      } else {
        return result;
      }
    }
  }
}

const add = function (a, b) {
  const total = a + b;
  return total;
};

const subtract = function (a, b) {
  const total = a - b;

  return total;
};

const divide = function (a, b) {
  const total = a / b;
  return total;
};

const multiply = function (a, b) {
  const total = a * b;
  return total;
};

// functions to manage the output and the global variables
function cleanInput() {
  input.innerHTML = "";
}

function cleanCurrentOperation() {
  currentOperation.innerHTML = "";
}

function updateInput(e) {
  input.innerHTML = e;
}

function updateCurrentOperation(e) {
  currentOperation.innerHTML = e;
}

function updateLastValue(e) {
  lastValue = e;
}

function resetLastValue() {
  lastValue = undefined;
}

function saveCurrentOperation(operation) {
  operationActive = operation;
}

function updateFinishedOperation(e) {
  if (e === 1) {
    finishedOperation = true;
  } else {
    finishedOperation = false;
  }
}

function addNumbersVisor(e) {
  if (input.innerHTML.length < 16) {
    if (input.innerHTML === "0") {
      updateInput(e);
    } else {
      updateInput(input.innerHTML + e);
    }
  }
}

function isNumberTooBig(number) {
  const numberToText = number.toString();
  const arrayNumber = numberToText.split(".");
  if (numberToText.length < 16) {
    return number;
  } else {
    if (arrayNumber[0].length > 10) {
      return number.toExponential(2);
    } else if (arrayNumber[1].length > 8) {
      return number.toFixed(4);
    } else {
      return number;
    }
  }
}

// functions to call in the event listeners
function inputNumbersButton(e) {
  if ((e.type === "keydown" && isFinite(e.key)) || e.key === ".") {
    if (e.key === "." && input.innerHTML.indexOf(".") === -1) {
      if (finishedOperation) {
        updateFinishedOperation();
        updateInput(0);
        addNumbersVisor(e.key);
      } else {
        addNumbersVisor(e.key);
      }
    } else if (e.key !== ".") {
      if (finishedOperation) {
        updateFinishedOperation();
        updateInput(0);
        addNumbersVisor(e.key);
      } else {
        addNumbersVisor(e.key);
      }
    }
  } else if (e.type === "click") {
    if (this.value === "." && input.innerHTML.indexOf(".") === -1) {
      if (finishedOperation) {
        updateFinishedOperation();
        updateInput(0);
        addNumbersVisor(this.value);
      } else {
        addNumbersVisor(this.value);
      }
    } else if (this.value !== ".") {
      if (finishedOperation) {
        updateFinishedOperation();
        updateInput(0);
        addNumbersVisor(this.value);
      } else {
        addNumbersVisor(this.value);
      }
    }
  }
}

function addOperation(e) {
  if (e.type === "click") {
    if (input.innerHTML === "Error") {
      updateFinishedOperation();
      cleanInput();
    }
    if (input.innerHTML === "") {
      // do nothing, wait to enter input
    } else if (lastValue === undefined) {
      updateLastValue(Number(input.innerHTML));
      cleanInput();
      saveCurrentOperation(this.value);
      updateCurrentOperation(`${isNumberTooBig(lastValue)}${this.value}`);
    } else if (operationActive === undefined) {
      updateCurrentOperation(`${isNumberTooBig(lastValue)}${this.value}`);
      saveCurrentOperation(this.value);
      cleanInput();
    } else {
      updateLastValue(operate(operationActive));
      updateInput(`${lastValue}`);
      cleanCurrentOperation();
      updateCurrentOperation(`${isNumberTooBig(lastValue)}${this.value}`);
      saveCurrentOperation(this.value);
      cleanInput();
    }
  } else if (e.type === "keydown") {
    if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
      updateFinishedOperation();
      if (input.innerHTML === "") {
        // do nothing, wait to enter input
      } else if (lastValue === undefined) {
        updateLastValue(Number(input.innerHTML));
        cleanInput();
        saveCurrentOperation(e.key);
        updateCurrentOperation(`${isNumberTooBig(lastValue)}${e.key}`);
      } else if (operationActive === undefined) {
        updateCurrentOperation(`${isNumberTooBig(lastValue)}${e.key}`);
        saveCurrentOperation(e.key);
        cleanInput();
      } else {
        updateLastValue(operate(operationActive));
        updateInput(`${lastValue}`);
        cleanCurrentOperation();
        updateCurrentOperation(`${isNumberTooBig(lastValue)}${e.key}`);
        saveCurrentOperation(e.key);
        cleanInput();
      }
    }
  }
}

function getEqual(e) {
  if (e.type === "click") {
    if (input.innerHTML !== "" && lastValue === undefined) {
      updateLastValue(Number(input.innerHTML));
      updateFinishedOperation(1);
    } else if (input.innerHTML !== "") {
      if (operationActive === undefined) {
        updateFinishedOperation(1);
      } else {
        updateLastValue(operate(operationActive));

        updateInput(`${lastValue}`);
        cleanCurrentOperation();
        saveCurrentOperation(undefined);
        updateLastValue(undefined);
        updateFinishedOperation(1);
      }
    }
  } else if (e.type === "keydown") {
    if (e.key === "=") {
      if (input.innerHTML !== "" && lastValue === undefined) {
        updateLastValue(Number(input.innerHTML));
        updateFinishedOperation(1);
      } else if (input.innerHTML !== "") {
        if (operationActive === undefined) {
          updateFinishedOperation(1);
        } else {
          updateLastValue(operate(operationActive));

          updateInput(`${lastValue}`);
          cleanCurrentOperation();
          saveCurrentOperation(undefined);
          updateLastValue(undefined);
          updateFinishedOperation(1);
        }
      }
    }
  }
}

// the event listeners of the clear and delete buttons with their function

const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
function deleteInput() {
  if (input.innerHTML !== "") {
    updateInput(input.innerHTML.slice(0, -1));
  }
}
deleteButton.addEventListener("click", deleteInput);
clearButton.addEventListener("click", () => {
  cleanCurrentOperation();
  cleanInput();
  updateInput(0);
  updateLastValue(undefined);
});

// the event listeners of the numbers and operators

const allNumberButton = Array.from(document.querySelectorAll(".button.number"));
allNumberButton.forEach((button) => {
  button.addEventListener("click", inputNumbersButton);
});

document.addEventListener("keydown", inputNumbersButton, false);

const operators = Array.from(document.querySelectorAll(".button.operator"));
operators.forEach((button) => {
  button.addEventListener("click", addOperation);
});

document.addEventListener("keydown", addOperation, false);

const equalOperator = document.querySelector(".equal");
equalOperator.addEventListener("click", getEqual);

document.addEventListener("keydown", getEqual, false);

const number = 1234e7;
console.log(Number(number));
console.log(number.toExponential(2)); // logs 7.71234e+1

const input = document.querySelector(".input>span");
const currentOperation = document.querySelector(".operation>span");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
let lastValue = undefined;
let operationActive = undefined;
let finishedOperation = false;

const allNumberButton = Array.from(document.querySelectorAll(".button.number"));
allNumberButton.forEach((button) => {
  button.addEventListener("click", inputNumbersButton);
});

function addNumbersVisor(e) {
  if (input.innerHTML === "0") {
    updateInput(e);
  } else {
    updateInput(input.innerHTML + e);
  }
}

function inputNumbersButton() {
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

const operators = Array.from(document.querySelectorAll(".button.operator"));
operators.forEach((button) => {
  button.addEventListener("click", addOperation);
});

function addOperation() {
  updateFinishedOperation();
  if (input.innerHTML === "") {
    // do nothing, wait to enter input
  } else if (lastValue === undefined) {
    updateLastValue(+input.innerHTML);
    cleanInput();
    saveCurrentOperation(this.value);
    updateCurrentOperation(`${lastValue}${this.value}`);
  } else if (operationActive === undefined) {
    updateCurrentOperation(`${+input.innerHTML}${this.value}`);
    saveCurrentOperation(this.value);
    cleanInput();
  } else {
    updateLastValue(operate(operationActive));
    updateInput(`${lastValue}`);
    cleanCurrentOperation();
    updateCurrentOperation(`${lastValue}${this.value}`);
    saveCurrentOperation(this.value);
    cleanInput();
  }
}

const equalOperator = document.querySelector(".equal");
equalOperator.addEventListener("click", getEqual);

function getEqual() {
  if (input.innerHTML !== "" && lastValue === undefined) {
    updateLastValue(+input.innerHTML);
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
  return result;
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

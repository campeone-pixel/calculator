const inputVisor = document.querySelector(".input>span");
const operation = document.querySelector(".operation>span");
const valuesForOperation = [null, null];
let operactionActive = "";
let getResult = false;

const allNumberButton = Array.from(document.querySelectorAll(".button.number"));
console.log(allNumberButton);
allNumberButton.forEach((button) => {
  button.addEventListener("click", inputNumbers);
});

function inputNumbers() {
  if (inputVisor.innerHTML === "0") {
    inputVisor.innerHTML = this.value;
  } else {
    inputVisor.innerHTML = inputVisor.innerHTML + this.value;
  }
}

const operators = Array.from(document.querySelectorAll(".button.operator"));
operators.forEach((button) => {
  button.addEventListener("click", addOperation);
});

function addOperation() {
  operactionActive = this.value;
  if (valuesForOperation.indexOf(null) === 0) {
    saveNumber(+inputVisor.innerHTML);
    operation.innerHTML = inputVisor.innerHTML + this.value;
    inputVisor.innerHTML = "0";
  } else if (valuesForOperation.indexOf(null) === 1) {
    saveNumber(+inputVisor.innerHTML);
    operation.innerHTML = operation.innerHTML + inputVisor.innerHTML;
    inputVisor.innerHTML = `${operate()}`;
    if (getResult === true) {
      operation.innerHTML = inputVisor.innerHTML;
      inputVisor.innerHTML = "0";
    } else if (valuesForOperation.indexOf(null) === -1) {
    }
  }
}

function saveNumber(number) {
  if (valuesForOperation.indexOf(null) === 0) {
    valuesForOperation[0] = number;
  } else if (valuesForOperation.indexOf(null) === 1) {
    valuesForOperation[1] = number;
  }
}

function operate(operation) {
  let result = 0;
  if (operation === "+") {
    result = add(valuesForOperation);
  } else if (operation === "-") {
    result = subtract(valuesForOperation);
  } else if (operation === "/") {
    result = divide(valuesForOperation);
  } else if (operation === "x") {
    result = multiply(valuesForOperation);
  }
  return result;
}

const add = function (list) {
  const total = list.reduce((sum, value) => sum + value, 0);
  return total;
};

const subtract = function (list) {
  const total = list.reduce(
    (sum, value) => (value === listToSum[0] ? listToSum[0] : sum - value),
    0,
  );
  return total;
};

const divide = function (list) {
  const total = list.reduce((sum, value) => sum / value, 0);
  return total;
};

const multiply = function (list) {
  const total = list.reduce((sum, value) => sum * value, 1);
  return total;
};

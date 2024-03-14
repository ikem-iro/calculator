const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const onOffButton = document.querySelector("[data-off-on]");
const squareRootButton = document.querySelector("[data-square-root]");
const prevOperationTextElement = document.querySelector(
  "[data-prev-operation]"
);
const currOperationTextElement = document.querySelector(
  "[data-curr-operation]"
);

let state = {
  prevOperand: "",
  currOperand: "",
  operation: null,
  computationCompleted: false,
};

function onOff() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    if (button !== onOffButton) {
      button.classList.toggle("disabled-buttons");
    }
  });

  onOffButton.textContent === "OFF"
    ? (onOffButton.textContent = "ON")
    : (onOffButton.textContent = "OFF");

  const display = document.querySelector("[data-display]");

  display.classList.toggle("disabled-display");
}

function clear() {
  state.currOperand = "";
  state.prevOperand = "";
  state.operation = null;
}

function deleteDigit() {
  state.currOperand = state.currOperand.slice(0, -1);
  if (state.currOperand === "") {
    state.currOperand = state.prevOperand;
    state.prevOperand = "";
    state.operation = null;
  }
}

function appendNumber(number) {
  if (number === "." && state.currOperand.includes(".")) return;
  if (state.computationCompleted) {
    state.currOperand = number.toString();
    state.computationCompleted = false;
  } else {
    state.currOperand = state.currOperand.toString() + number.toString();
    if (state.prevOperand === "") {
      compute();
    }
  }
}

function chooseOperation(selectedOperation) {
  if (state.currOperand === "" && selectedOperation !== "-") return;
  if (state.currOperand === "" && selectedOperation === "-") {
    appendNumber(selectedOperation);
    return;
  }

  if (state.prevOperand !== "") {
    compute();
  }
  state.operation = selectedOperation;
  state.prevOperand = state.currOperand;
  state.currOperand = "";
}

function compute() {
  let computation;
  const prev = parseFloat(state.prevOperand) || 0;
  const curr = parseFloat(state.currOperand);

  if (isNaN(prev) || isNaN(curr)) return;
  switch (state.operation) {
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "x":
      computation = prev * curr;
      break;
    case "÷":
      computation = prev / curr;
      break;
    default:
      return;
  }
  state.currOperand = computation;
  state.operation = null;
  state.prevOperand = "";
  state.computationCompleted = true;
}

function getSquareRoot() {
  let answer;
  if (state.currOperand != null) {
    answer = Math.sqrt(parseFloat(state.currOperand));
  }
  state.currOperand = answer;
  state.operation = null;
  state.prevOperand = "";
  state.computationCompleted = true;
}

function getDisplayNumber(number) {
  const stringNumber = number.toString();
  const intDigits = parseFloat(stringNumber.split(".")[0]);
  const decimalDigits = stringNumber.split(".")[1];
  let intDisplay;
  if (isNaN(intDigits)) {
    intDisplay = "";
  } else {
    intDisplay = intDigits.toLocaleString("en", { maximumFractionDigits: 0 });
  }
  if (decimalDigits != null) {
    return `${intDisplay}.${decimalDigits}`;
  } else {
    return intDisplay;
  }
}

function updateDisplay() {
  currOperationTextElement.innerText = getDisplayNumber(state.currOperand);
  if (state.operation != null) {
    prevOperationTextElement.innerText = `${getDisplayNumber(
      state.prevOperand
    )}  ${state.operation}`;
  } else {
    prevOperationTextElement.innerText = "";
  }
}

// Event listeners
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.innerText);
    updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperation(button.innerText);
    updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  compute();
  updateDisplay();
});

allClearButton.addEventListener("click", () => {
  clear();
  updateDisplay();
});

deleteButton.addEventListener("click", () => {
  deleteDigit();
  updateDisplay();
});

squareRootButton.addEventListener("click", () => {
  getSquareRoot();
  updateDisplay();
});

onOffButton.addEventListener("click", () => {
  onOff();
  clear();
  updateDisplay();
});

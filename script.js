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

class Calculator {
  constructor(prevOperationTextElement, currOperationTextElement) {
    this.prevOperationTextElement = prevOperationTextElement;
    this.currOperationTextElement = currOperationTextElement;
    this.computationCompleted = false;
    this.clear();
  }

  onOff() {
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

  clear() {
    this.currOperand = "";
    this.prevOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currOperand = this.currOperand.toString().slice(0, -1);
    if (this.currOperand === "") {
      this.currOperand = this.prevOperand;
      this.prevOperand = "";
      this.operation = undefined;
    }
  }

  appendNumber(number) {
    if (number === "." && this.currOperand.includes(".")) return;
    if (this.computationCompleted) {
      this.currOperand = number.toString();
      this.computationCompleted = false;
    } else {
      this.currOperand = this.currOperand.toString() + number.toString();
      if (this.prevOperand == "") {
        this.compute();
      }
    }
  }

  chooseOperation(operation) {
    if (this.currOperand === "" && !operation === "-") return;
    if (this.currOperand === "" && operation === "-"){
      this.appendNumber(operation);
        return;
    }
    if (this.prevOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.prevOperand = this.currOperand;
    this.currOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.prevOperand) || 0;
    const curr = parseFloat(this.currOperand);

    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
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
        computation = curr === 0 ? "undefined" : prev / curr;
        break;
      default:
        return;
    }
    this.currOperand = computation;
    this.operation = undefined;
    this.prevOperand = "";
    this.computationCompleted = true;
  }

  getSquareRoot() {
    let answer;
    if (this.currOperand != null) {
      answer = Math.sqrt(parseFloat(this.currOperand));
    }
    this.currOperand = answer;
    this.operation = undefined;
    this.prevOperand = "";
    this.computationCompleted = true;
  }

  getDisplayNumber(number) {
    if(number === "undefined") return "Math Error";
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

  updateDisplay() {
    this.currOperationTextElement.innerText = this.getDisplayNumber(
      this.currOperand
    );
    if (this.operation != null) {
      this.prevOperationTextElement.innerText = `${this.getDisplayNumber(
        this.prevOperand
      )}  ${this.operation}`;
    } else {
      this.prevOperationTextElement.innerText = "";
    }
  }
}

const calculator = new Calculator(
  prevOperationTextElement,
  currOperationTextElement
);

// For clicking
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

squareRootButton.addEventListener("click", () => {
  calculator.getSquareRoot();
  calculator.updateDisplay();
});

onOffButton.addEventListener("click", () => {
  calculator.onOff();
  calculator.clear();
  calculator.updateDisplay();
});

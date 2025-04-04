const calculator = {
    previousOperand: "",
    currentOperand: "",
    operator: undefined,

    clear() {
        this.previousOperand = "";
        this.currentOperand = "";
        this.operator = undefined;
    },

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    },

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    },

    chooseOperation(operator) {
        if (this.currentOperand === "") return;

        if (this.previousOperand !== "") {
            this.compute();
        }

        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    },

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operator) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "x":
                computation = prev * current;
                break;
            case "÷":
                computation = prev / current;
                break;
            case "%":
                computation = prev % current;
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.operator = undefined;
        this.previousOperand = "";
    },

    updateDisplay() {
        previousOperandTextElement.innerText = this.previousOperand
            ? `${this.previousOperand} ${this.operator || ""}`
            : "";
        currentOperandTextElement.innerText = this.currentOperand || "0";
    },
};

// Select elements
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelector("[data-equals]");

const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

// Add event listeners
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

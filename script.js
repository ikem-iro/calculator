const displayScreen = document.querySelector(`#calculator-display`);
const allClearButton = document.querySelector(`#all-clear`);
const powerButton = document.querySelector(`#power`);
const powerButtonText = document.querySelector(`#power span`);
const backSpaceButton = document.querySelector(`#backspace`);

let isCalculatorPowerOff = false;

const buttonsWithValues = document.querySelectorAll(
	`button[type=button][value]`,
);
const allButtonsExceptPower = document.querySelectorAll(
	`button[type=button]:not(#power)`,
);

function toggleCalculatorPower() {
	let setPowerButtonText, setDisplayPlaceholder;

	isCalculatorPowerOff = !isCalculatorPowerOff;

	allButtonsExceptPower.forEach((button) => {
		button.disabled = isCalculatorPowerOff;
	});

	setPowerButtonText = isCalculatorPowerOff ? `on` : `off`;
	setDisplayPlaceholder = !isCalculatorPowerOff ? 0 : ``;

	powerButtonText.textContent = setPowerButtonText;

	allClear();

	displayScreen.placeholder = setDisplayPlaceholder;
	displayScreen.disabled = isCalculatorPowerOff;
}

powerButton.addEventListener(`click`, toggleCalculatorPower);

function allClear() {
	displayScreen.value = ``;
}

allClearButton.addEventListener(`click`, allClear);

function handleBackspacePress() {
	displayScreen.value = displayScreen.value.slice(0, -1);
	handleCommas();
}

backSpaceButton.addEventListener(`click`, handleBackspacePress);

function handleCommas() {
	let raw, cleaned, formatted, newValue;

	raw = displayScreen.value;
	cleaned = raw.replace(/,/g, "");
	formatted = parseInt(cleaned, 10);

	if (!isNaN(formatted)) {
		newValue = formatted.toLocaleString();
	} else {
		displayScreen.value = "";
	}

	if (!isNaN(formatted) && formatted.toString().length <= 9) {
		displayScreen.value = newValue;
	} else {
		displayScreen.value = raw.slice(0, -1);
	}
}

buttonsWithValues.forEach((button) => {
	button.addEventListener(`click`, () => {
		displayScreen.value += button.value;
		handleCommas();
	});
});

function operate(operator, a, b) {
	switch (operator) {
		case `+`:
			return a + b;
		case `-`:
			return a - b;
		case `x`:
			return a * b;
		case `/`:
			return a / b;
		default:
			return;
	}
}

(function () {
	toggleCalculatorPower();
})();

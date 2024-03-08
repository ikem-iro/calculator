// DOM Elements
const powerButton = document.querySelector(`#power`);
const allClearButton = document.querySelector(`#all-clear`);
const backSpaceButton = document.querySelector(`#backspace`);
const powerButtonText = document.querySelector(`#power span`);
const displayScreen = document.querySelector(`#calculator-display`);

const buttonsWithValues = document.querySelectorAll(
	`button[type=button][value]`,
);
const allButtonsExceptPower = document.querySelectorAll(
	`button[type=button]:not(#power)`,
);

// initial app state
let isCalculatorPowerOn = false;

// event listeners
allClearButton.addEventListener(`click`, allClear);
powerButton.addEventListener(`click`, toggleCalculatorPower);
backSpaceButton.addEventListener(`click`, handleBackspacePress);

buttonsWithValues.forEach((button) => {
	button.addEventListener(`click`, () => {
		displayScreen.value += button.value;
		handleCommas();
		setFocusOnDisplay();
	});
});

// handle calculator power toggle
function toggleCalculatorPower() {
	isCalculatorPowerOn = !isCalculatorPowerOn;
	updateCalculatorPower(isCalculatorPowerOn);
}

// update calculator power based on state change
function updateCalculatorPower(state) {
	let setPowerButtonText, setDisplayPlaceholder;

	allButtonsExceptPower.forEach((button) => {
		button.disabled = state;
	});

	setPowerButtonText = state ? `on` : `off`;
	setDisplayPlaceholder = !state ? 0 : ``;

	powerButtonText.textContent = setPowerButtonText;

	displayScreen.disabled = state;
	displayScreen.placeholder = setDisplayPlaceholder;

	allClear();
	setFocusOnDisplay();
}

// handle all clear button
function allClear() {
	displayScreen.value = ``;
}

// handle backspace
function handleBackspacePress() {
	displayScreen.value = displayScreen.value.slice(0, -1);
	handleCommas();
	setFocusOnDisplay();
}

// handle comma formatting
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
		displayScreen.value = displayScreen.value.slice(0, -1);
	}
}

// set focus to display screen
function setFocusOnDisplay() {
	displayScreen.focus();
}

document.addEventListener(`keydown`, function (event) {
	let format, previousValue, currentValue;

	const allowedKeys = [
		`0`,
		`1`,
		`2`,
		`3`,
		`4`,
		`5`,
		`6`,
		`7`,
		`8`,
		`9`,
		`+`,
		`-`,
		`x`,
		`/`,
		`.`,
		`Enter`,
		`Backspace`,
	];

	if (!isCalculatorPowerOn && allowedKeys.includes(event.key)) {
		displayScreen.value += event.key;
		currentValue = displayScreen.value;

		handleCommas();
		setFocusOnDisplay();
	}

	if (!isCalculatorPowerOn && event.key === `Backspace`) {
		event.preventDefault();
		handleBackspacePress();
	}
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

// init program
(function () {
	toggleCalculatorPower();
})();

const displayScreen = document.querySelector(`#calculator-display`);
const allClearButton = document.querySelector(`#all-clear`);
const powerButton = document.querySelector(`#power`);
const powerButtonText = document.querySelector(`#power span`);

const allButtonsExceptPower = document.querySelectorAll(
	`button[type=button]:not(#power)`,
);

function toggleCalculatorPower() {
	allButtonsExceptPower.forEach((button) => {
		button.disabled = !button.disabled;
	});

	powerButtonText.textContent =
		powerButtonText.textContent === `on` ? `off` : `on`;

	displayScreen.value = "";
	displayScreen.placeholder = powerButtonText.textContent === `on` ? 0 : ``;
}

powerButton.addEventListener(`click`, toggleCalculatorPower);

let billInput = document.getElementById('billInput');
let tipButtons = document.querySelectorAll('.tipBtn');
let customTip = document.getElementById('customTip');
let numberOfPeople = document.getElementById('peopleInput');
let calculateBtn = document.querySelector('.calculateBtn');
let resetBtn = document.querySelector('.resetBtn');

let billAmount = 0;
let tipPercentage = 0;
let customTipValue = 0;
let totalPeople = 0;

disableTipButtons();
disableCalculateButton();
function enableTipButtons() {
  tipButtons.forEach(button => button.removeAttribute('disabled'));
}
function disableTipButtons() {
  tipButtons.forEach(button => {
    button.setAttribute('disabled', true);
    button.classList.remove('active');
  });
}
function enableCalculateButton() {
  calculateBtn.removeAttribute('disabled');
  calculateBtn.classList.add('active');
}
function disableCalculateButton() {
  calculateBtn.setAttribute('disabled', true);
  calculateBtn.classList.remove('active');
} 

function updateCalculateButtonState () {
  let hasValidBill = billAmount > 0;
  let hasValidPeople = totalPeople > 0;
  let hasValidTip = tipPercentage > 0 || customTipValue > 0;
  if (hasValidBill && hasValidPeople && hasValidTip) {
    enableCalculateButton();
  } else {
    disableCalculateButton();
  }
} 

billInput.addEventListener('input', function() {
  billAmount = parseFloat(billInput.value);
  if (billAmount > 0) {
    enableTipButtons();
    enableCalculateButton();
  } else {
    disableTipButtons();
    disableCalculateButton();
  }
  updateCalculateButtonState();
})

tipButtons.forEach(button => {
  button.addEventListener('click', function () {
    customTipValue = 0;
    customTip.value = '';
    tipPercentage = parseFloat(button.textContent.replace('%', ''));
    tipButtons.forEach(button => button.classList.remove('active'));
    button.classList.add('active');

    updateCalculateButtonState();
  })
})

customTip.addEventListener('input', function () {
  tipButtons.forEach(button => button.classList.remove('active'));
  tipPercentage = 0;
  customTipValue = parseFloat(customTip.value) || 0;

  updateCalculateButtonState();
})

numberOfPeople.addEventListener('input', function() {
  totalPeople = parseInt(numberOfPeople.value) || 0;
  updateCalculateButtonState();
})

function resetEverything() {
  billAmount = 0;
  totalPeople = 0;
  tipPercentage = 0;
  customTipValue = 0;
  billInput.value = '';
  customTip.value = '';
  numberOfPeople.value = '';
  tipButtons.forEach(button => button.classList.remove('active'));
  document.getElementById('tipAmount').textContent = '0.00';
  document.getElementById('totalAmount').textContent = '0.00';
  document.getElementById('billPerPerson').textContent = '0.00';
  disableTipButtons();

  updateCalculateButtonState();
}

resetBtn.addEventListener('click', function () {
  resetEverything();
})

calculateBtn.addEventListener('click', function () {
  if (isNaN(billAmount) ||
    isNaN(totalPeople) ||
    billAmount <= 0 ||
    totalPeople <= 0 ||
    tipPercentage < 0 ||
    customTipValue < 0
  ) {
    alert('Please enter valid values for Bill Amount, Tip Percentage, and Total People.');
    return;
  }

  let finalTip = customTipValue > 0 ? customTipValue : tipPercentage;
  let TotalAmount = (billAmount * (finalTip / 100)) + billAmount;
  let tipAmount = (billAmount * (finalTip / 100));
  let billPerPerson = TotalAmount / totalPeople;

  document.getElementById('tipAmount').textContent = tipAmount.toFixed(2);
  document.getElementById('totalAmount').textContent = TotalAmount.toFixed(2);
  document.getElementById('billPerPerson').textContent = billPerPerson.toFixed(2);
})
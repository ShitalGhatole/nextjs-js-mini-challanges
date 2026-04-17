let input = document.getElementById('guess');
let submitBtn = document.querySelector('.primaryBtn');
let resetBtn = document.querySelector('.resetBtn');
let feedbackEl = document.querySelector('.feedback');
let chipsContainer = document.querySelector('.chips');
input.focus();

// const randomNum = Math.floor(Math.random() * 100) + 1;
const randomNum = Math.floor(Math.random() * 100) + 1;
let totalAttempts = 10;

submitBtn.addEventListener('click', () => {
  let userGuess = parseInt(input.value);

  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    feedbackEl.textContent = 'Please enter a valid number between 1 and 100.';
    feedbackEl.style.color = 'red';
    input.value = '';
    input.focus();
    return;
  }

  totalAttempts--;
  
  if (totalAttempts === 0) {
    feedbackEl.textContent = `Game Over! The correct number was ${randomNum}.`;
    feedbackEl.style.color = 'red';
    submitBtn.disabled = true;
    input.disabled = true;
    return;
  }

  if (userGuess === randomNum) {
    feedbackEl.textContent = `Congratulations! You've guessed the number ${randomNum} correctly!`;
    feedbackEl.style.color = 'green';
    submitBtn.disabled = true;
    input.disabled = true;
  } else if (userGuess < randomNum) {
    feedbackEl.textContent = 'Too low! Go Higher.';
    feedbackEl.style.color = 'orange';
  } else if (userGuess > randomNum) {
    feedbackEl.textContent = 'Too high! Go Lower.';
    feedbackEl.style.color = 'orange';
  }

  input.value = '';
  input.focus();

  chipsContainer.innerHTML += `<span class="chip">${userGuess}</span>`;
})

resetBtn.addEventListener('click', () => {
  input.value = '';
  input.focus();
  chipsContainer.innerHTML = '';
  totalAttempts = 10;
  input.disabled = false;
  submitBtn.disabled = false;
  feedbackEl.textContent = 'Game reset! Try again.';
  feedbackEl.style.color = 'black';
  console.log('Reset Button: ', 'totalAttempts: ' + totalAttempts)
})


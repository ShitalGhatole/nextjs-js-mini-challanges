const inputEl = document.getElementById("passwordInput");
const noOfCharacters = document.querySelector(".noOfCharacters");
const qualityOfPassword = document.querySelector(".qualityOfPassword");
const strengthMeterFillEl = document.getElementById("strengthMeterFill");

const requirements = document.querySelectorAll("li");

function updateCharacterCount(length) {
  noOfCharacters.textContent = length;
}

inputEl.addEventListener("input", function () {
  const password = inputEl.value;

  updateCharacterCount(password.length);

  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  requirements[0].style.color = hasLowercase ? "green" : "";
  requirements[1].style.color = hasUppercase ? "green" : "";
  requirements[2].style.color = hasNumber ? "green" : "";
  requirements[3].style.color = hasSymbol ? "green" : "";

  let score = 0;

  if (hasLowercase) score++;
  if (hasUppercase) score++;
  if (hasNumber) score++;
  if (hasSymbol) score++;

  if (password.length >= 8) score++;

  if (score <= 2) {
    qualityOfPassword.textContent = "Weak";
    strengthMeterFillEl.style.width = "33%";
    strengthMeterFillEl.style.backgroundColor = "#dc2626";
  } 
  else if (score <= 4) {
    qualityOfPassword.textContent = "Medium";
    strengthMeterFillEl.style.width = "66%";
    strengthMeterFillEl.style.backgroundColor = "#f59e0b";
  } 
  else {
    qualityOfPassword.textContent = "Strong";
    strengthMeterFillEl.style.width = "100%";
    strengthMeterFillEl.style.backgroundColor = "#16a34a";
  }
});
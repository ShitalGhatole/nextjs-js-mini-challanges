let originalString = document.querySelector('#original');
let lowercaseString = document.querySelector('.lowercase');
let uppercaseString = document.querySelector('.uppercase');
let camelcaseString = document.querySelector('.camelcase');
let snakecaseString = document.querySelector('.snakecase');
let pascalcaseString = document.querySelector('.pascalcase');
let kebabcaseString = document.querySelector('.kebabcase');
let trimmedString = document.querySelector('.trimcase');
originalString.focus();


// Function to convert a string to camelCase
function transformToCamelcase(str) {
  if (!str.trim()) return '';
  const words = str.trim().split(/\s+/);
  const firstWord = words[0].toLowerCase();
  const restWords = words.slice(1).map(word => (
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ))
  return firstWord + restWords.join('');
}

// Function to convert a string to PascalCase
function transformToPascalcase(str) {
  if (!str.trim()) return '';
  const words = str.trim().split(/\s+/);
  const pascalcaseWords = words.map(word => (
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ))
  return pascalcaseWords.join('');
}

originalString.addEventListener('input', function() {
  const value = originalString.value;
  const words = value.trim().split(/\s+/);
  lowercaseString.textContent = value.toLowerCase();
  uppercaseString.textContent = value.toUpperCase();
  snakecaseString.textContent = words.join('_').toLowerCase();
  kebabcaseString.textContent = words.join('-').toLowerCase();
  trimmedString.textContent = words.join('').toLowerCase();
  camelcaseString.textContent = transformToCamelcase(value);
  pascalcaseString.textContent = transformToPascalcase(value)
})
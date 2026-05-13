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
  const words = str.split(' ');
  const firstWord = words[0].toLowerCase();
  const restOfTheWords = words.slice(1).map(word => (
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ))
  return firstWord + restOfTheWords.join('');
}

// Function to convert a string to PascalCase
function transformToPascalcase(str) {
  const words = str.split(' ');
  const pascalcaseWords = words.map(word => (
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ))
  return pascalcaseWords.join('');
}

originalString.addEventListener('input', function() {
  lowercaseString.textContent = originalString.value.toLowerCase();
  uppercaseString.textContent = originalString.value.toUpperCase();
  camelcaseString.textContent = transformToCamelcase(originalString.value);
  snakecaseString.textContent = originalString.value.toLowerCase().split(' ').join('_');
  pascalcaseString.textContent = transformToPascalcase(originalString.value)
  kebabcaseString.textContent = originalString.value.toLowerCase().split(' ').join('-');
  trimmedString.textContent = originalString.value.split(' ').join('');
})
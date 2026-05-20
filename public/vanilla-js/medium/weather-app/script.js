let cityInput = document.getElementById("cityInput");
let searchBtn = document.getElementById("searchBtn");
let cityNameOptionsWrapper = document.getElementById("cityNameOptions");
let headingCityName = document.querySelector(".headingCityName");
let headingDegree = document.querySelector(".headingDegree");
let description = document.querySelector(".description");

const apiKey = "apikey";
// example API
// https://api.openweathermap.org/data/2.5/weather?lat=37.1283343&lon=-84.0835576&appid=apikey

const capitalizeWord = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

async function getCityName(city) {
  let cityName = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`);
  let json = await cityName?.json();

  // always return an array
  if (!Array.isArray(json)) {
    return [];
  }

  const availableCities = json?.map((city) => {
    return {
      name: city.name,
      state: city.state,
      country: city.country,
      lat: city.lat,
      lon: city.lon
    }
  })

  return availableCities;
}

async function getCityWeather(city, state, country) {
  const weather = await fetch(`
    https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&units=metric&appid=${apiKey}
  `);
  const weatherData = await weather.json();
  return weatherData;
}

cityInput.addEventListener("input", async function () {
  const city = cityInput.value;
  if (city === '') return

  const cityName = await getCityName(city);
  cityNameOptionsWrapper.innerHTML = "";
  cityName.forEach(city => {
    cityNameOptionsWrapper.innerHTML += `
      <option value="${city.name}, ${city.state}, ${city.country}" />
    `
  })
})

cityInput.addEventListener("change", async function () {
  const city = cityInput.value;
  const cityArr = city.split(",");
  const [cityName, stateName, countryName] = cityArr;
  const cityWeather = await getCityWeather(cityName, stateName, countryName);
  const finalWeather = {
    temp: cityWeather.main.temp,
    description: capitalizeWord(cityWeather.weather[0].description),
  }
  console.log(cityWeather)
  headingCityName.textContent = `${cityName}, ${countryName}`
  headingDegree.textContent = `${finalWeather.temp} deg`
  description.textContent = `${finalWeather.description}`
})
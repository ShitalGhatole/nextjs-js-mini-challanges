let cityInput = document.getElementById("cityInput");
let searchBtn = document.getElementById("searchBtn");
let cityNameOptionsWrapper = document.getElementById("cityNameOptions");

const apiKey = "9b3f0a8184e519119045c8c631f8769e";
// example API
// https://api.openweathermap.org/data/2.5/weather?lat=37.1283343&lon=-84.0835576&appid=9b3f0a8184e519119045c8c631f8769e

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
  const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=9b3f0a8184e519119045c8c631f8769e`);
  const weatherData = await weather.json();
  return weatherData;
}

cityInput.addEventListener("input", async function () {
  let city = cityInput.value;
  // stop API call if user already selected a full city
  if (city.includes(",")) {
    return;
  }
  let cityName = await getCityName(city);

  cityNameOptionsWrapper.innerHTML = "";
  
  cityName.forEach(city => {
    cityNameOptionsWrapper.innerHTML += `
      <option value="${city.name}, ${city.state}, ${city.country}," />
    `
  })
})

cityInput.addEventListener("change", async function () {
  let selectedCity = cityInput.value;
  
  let city = selectedCity.split(",")[0].trim();
  let state = selectedCity.split(",")[1].trim();
  let country = selectedCity.split(",")[2].trim();

  const cityWeather = await getCityWeather(city, state, country)

  console.log("Weather: ", cityWeather)
})
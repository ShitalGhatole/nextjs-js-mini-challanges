let cityInput = document.getElementById("cityInput");
let cityNameOptionsWrapper = document.getElementById("cityOptions");
let headingCityName = document.querySelector(".headingCityName");
let headingDegree = document.querySelector(".headingDegree");
let description = document.querySelector(".description");
let weatherIcon = document.querySelector(".weatherImage");
let feelsLike = document.querySelector(".feelsLike p");
let minTemp = document.querySelector(".minTemp p");
let maxTemp = document.querySelector(".maxTemp p");
let humidity = document.querySelector(".humidity p");

// example API
// https://api.openweathermap.org/data/2.5/weather?lat=37.1283343&lon=-84.0835576&appid=apikey
let availableCities = [];

const capitalizeWord = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

async function getCityNames(city) {
  try {
    let cityName = await fetch(`/api/cities?cityName=${city}`);
    let json = await cityName?.json();
  
    // always return an array
    if (!Array.isArray(json)) {
      return [];
    }
  
    availableCities = json?.map((city) => {

      const displayName = city.state
        ? `${city.name}, ${city.state}, ${city.country}`
        : `${city.name}, ${city.country}`;

      return {
        lat: city.lat,
        lon: city.lon,
        name: city.name,
        state: city.state,
        country: city.country,
        displayName
      }
    })
    console.log("Available CIties: ", availableCities)
    return availableCities;
  } catch (error) {
    console.log(error)
    return [];
  }

}

async function getCityWeather(lon, lat) {
  try {
    const res = await fetch(`/api/weather?lon=${lon}&lat=${lat}`)
    const json = await res.json()
    return json
  } catch (error) {
    console.log(error)
  }
}

cityInput.addEventListener("input", async function () {
  const city = cityInput.value;
  
  if (!city.trim()) {
    cityOptionsWrapper.innerHTML = "";    
    return
  }

  const cityNames = await getCityNames(city);
  console.log("CITY NAMES: ",cityNames)
  cityNameOptionsWrapper.innerHTML = cityNames.map(city => `
    <div class="cityOption">
      ${city.displayName}
    </div>  
  `).join("");
})

cityNameOptionsWrapper.addEventListener("click", async function (e) {
  const option = e.target.closest(".cityOption");

  if (!option) return;

  const selectedValue = option.textContent.trim();

  cityInput.value = selectedValue;

  const selectedCity = availableCities.find(city => {
    return selectedValue === city.displayName
  })

  if (!selectedCity) {
    console.log("City not found")
    return
  }

  const cityWeather = await getCityWeather(selectedCity.lon, selectedCity.lat);

  if (!cityWeather || !cityWeather.main || !cityWeather.weather) {
    console.log("City weather not found")
    return
  }

  const finalWeather = {
    temp: cityWeather.main.temp,
    currentTemp: cityWeather.main.temp,
    description: capitalizeWord(cityWeather.weather[0].description),
    feelsLike: cityWeather.main.feels_like,
    minTemp: cityWeather.main.temp_min,
    maxTemp: cityWeather.main.temp_max,
    humidity: cityWeather.main.humidity,
  };

  const cityNameDisplay = `${
    selectedCity.state 
      ? `${selectedCity.name}, ${selectedCity.state}, ${selectedCity.country}` 
      : `${selectedCity.name}, ${selectedCity.country}`
    }`

  headingCityName.textContent = `${cityNameDisplay}`
  headingDegree.textContent = `${Math.round(finalWeather.temp)}°C`
  description.textContent = `${finalWeather.description}`
  weatherIcon.src = `https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`
  feelsLike.textContent = `${Math.round(finalWeather.feelsLike)}°C`
  minTemp.textContent = `${Math.round(finalWeather.minTemp)}°C`
  maxTemp.textContent = `${Math.round(finalWeather.maxTemp)}°C`
  humidity.textContent = `${finalWeather.humidity}%`
  cityNameOptionsWrapper.innerHTML = "";
})
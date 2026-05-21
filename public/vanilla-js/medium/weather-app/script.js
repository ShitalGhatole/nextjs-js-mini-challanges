let cityInput = document.getElementById("cityInput");
let cityNameOptionsWrapper = document.getElementById("cityNameOptions");
let headingCityName = document.querySelector(".headingCityName");
let headingDegree = document.querySelector(".headingDegree");
let description = document.querySelector(".description");
let weatherIcon = document.querySelector(".weatherImage");

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
  
  if (!city.trim()) return

  const cityNames = await getCityNames(city);
  console.log("CITY NAMES: ",cityNames)
  cityNameOptionsWrapper.innerHTML = "";
  cityNames.forEach(city => {
    cityNameOptionsWrapper.innerHTML += `
      <option value="${city.displayName}" />
    `
  })
})

cityInput.addEventListener("change", async function () {
  const selectedValue = cityInput.value;

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
  };

  headingCityName.textContent = `${selectedCity.name}, ${selectedCity.country}`
  headingDegree.textContent = `${Math.round(finalWeather.temp)}°C`
  description.textContent = `${finalWeather.description}`
  weatherIcon.src = `http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`
})
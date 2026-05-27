'use client'
import { useEffect, useState } from 'react';
import styles from './WeatherApp.module.scss'

type WeatherData = {
  main?: {
    temp?: number;
    feels_like?: number;
    temp_min?: number;
    temp_max?: number;
    humidity?: number;
  };
};

const WeatherApp = () => {
  
  const [cityName, setCityName] = useState('');
  const [cityNameOptions, setCityNameOptions] = useState([]);
  const [cityWeather, setCityWeather] = useState<WeatherData>({});
  const [debouncedCityName, setDebouncedCityName] = useState('');
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);
  const [selectedCityName, setSelectedCityName] = useState('');

  const getCityNames = async (city: string) => {
    try {
      const res = await fetch(`/api/cities?cityName=${city}`);
      const json = await res.json();
      console.log(json)
      return json
    } catch (error) {
      console.log(error)
      return []
    }
  }

  const getCityWeather = async (lon: number, lat: number) => {
    setIsWeatherLoading(true)
    try {
      const res = await fetch(`/api/weather?lon=${lon}&lat=${lat}`)
      const data = await res.json()
      console.log(data);

      if (res.ok) {
        setCityWeather(data)
      } else {
        console.error(data.error)
      }

    } catch (error) {
      console.log("Failed fetching city weather: ", error)
    } finally {
      setIsWeatherLoading(false)
    }
  }

  //effect to debounce city name
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCityName(cityName)
    }, 400)

    return () => clearTimeout(timer);
  }, [cityName])

  //Effect to fetch and set city names
  useEffect(() => {
    if (!debouncedCityName || debouncedCityName.length <= 3) {
      return;
    }

    if (debouncedCityName.includes(',')) {
      return;
    }
  
    let isCurrentRequest = true; 

    getCityNames(debouncedCityName).then((cities) => {
      if (isCurrentRequest) { 
        setCityNameOptions(cities);
      }
      })
      .catch((error) => {
        if (isCurrentRequest) {
          console.error("Error fetching city names:", error);
        }
      });


    return () => {
    isCurrentRequest = false;
  };

  }, [debouncedCityName])

  const isInputTooShort = !debouncedCityName || debouncedCityName.length <= 3;
  const visibleOptions = isInputTooShort ? [] : cityNameOptions;

  const handleCitySelect = (city: any) => {

    const selectedCity = city.displayName || `${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}`;

    setCityName(selectedCity);
    setSelectedCityName(selectedCity);
    setCityNameOptions([]);

    if (city.lat && city.lon) {
      getCityWeather(city.lon, city.lat);
    } else {
      console.error("City weather for the selected coordinates not found");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>
            Weather App 
            <img src="/react-logo.svg" alt="JS Icon" height="24" width="24" title="Made in React"/>
          </h1>
          <p>Check the weather in your city!</p>
        </div>

        <div className={styles.wrapper}>
          <div>
            <div className={styles.searchWrapper}>
              <label htmlFor="cityInput">City</label>
              <input 
                list="cityNameOptions" 
                id="cityInput" 
                name="cityName" 
                type="text" 
                placeholder="Enter City Name" 
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
              />

              {visibleOptions.length > 0 && (
                <div className={styles.cityOptions} id="cityOptions">
                  {visibleOptions.map((city: any, index) => (
                    <div key={city.id} className={styles.cityOption} onClick={() => handleCitySelect(city)}>
                      <p>{city.name}{city.state ? `, ${city.state}` : ''},{city.country}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* first container */}
          <div>
            <div>
              <div>
                <h2 className={styles.headingCityName}>{selectedCityName || '-'}</h2>
                <p className={styles.description}>-</p>
              </div>

              <div>
                <h2 className={styles.heading}>Current Temperature</h2>
                <p className={styles.headingDegree}>{cityWeather?.main?.temp || '-' }</p>
              </div>
            </div>
            
            <div className={styles.weatherMainImg}>
              <img className={styles.weatherImage} width="100" height="100" src="/no-weather.png" />
            </div>
          </div>
          
          {/* Second container */}
          <div className={styles.secondContainer}>
            <div className={styles.feelsLike}>
              <h3>Feels Like</h3>
              <p>{cityWeather?.main?.feels_like || '-' }</p>
            </div>

            <div className={styles.minTemp}>
              <h3>Min Temperature</h3>
              <p>{cityWeather?.main?.temp_min || '-' }</p>
            </div>

            <div className={styles.maxTemp}>
              <h3>Max Temperature</h3>
              <p>{cityWeather?.main?.temp_max || '-' }</p>
            </div>

            <div className={styles.humidity}>
              <h3>Humidity</h3>
              <p>{cityWeather?.main?.humidity || '-' }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp
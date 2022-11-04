import Utils from './utils.js';

const DOM = (() => {
  const weatherDescriptionEl = document.querySelector('.weather-data__weather');
  const localTimeEl = document.querySelector('.weather-data__time');
  const weatherTemperatureEl = document.querySelector('.weather-data__temperature-value');
  const weatherImageEl = document.querySelector('.weather-data__image');
  const temperatureFeelsLikeEl = document.querySelector('.weather-details__feels-like-value');
  const humidityEl = document.querySelector('.weather-details__humidity-value');
  const windSpeedEl = document.querySelector('.weather-details__wind-speed-value');
  const cityEl = document.querySelector('.info-search__city');
  const countryEl = document.querySelector('.info-search__country');
  const sunriseEl = document.querySelector('.info-search__sunrise-time-value');
  const sunsetEl = document.querySelector('.info-search__sunset-time-value');
  const searchErrorEl = document.querySelector('.info-search__error');

  function renderRelevantWeatherData(data) {
    const weatherDescription = Utils.capitalizeFirstLetter(data.weather[0].description);
    const weatherImage = data.weather[0].icon;
    const unixTime = data.dt * 1000; // unix time in ms
    const time = new Date(unixTime).toDateString();
    const temp = Math.trunc(data.main.temp);
    const tempFeelsLike = data.main.feels_like.toFixed(1);
    const humidity = data.main.humidity;
    const sunriseTime = Utils.getTimeFromDate(data.sys.sunrise * 1000); // convert to ms and then to human readable time
    const sunsetTime = Utils.getTimeFromDate(data.sys.sunset * 1000);
    const windSpeed = (data.wind.speed * 3.6).toFixed(1); // convert from meter/sec to km/h
    const city = data.name;
    const country = data.sys.country;

    updateWeatherDescription(weatherDescription);
    updateTime(time);
    updateTemperature(temp);
    updateFeelsLike(tempFeelsLike);
    updateHumidity(humidity);
    updateWindSpeed(windSpeed);
    updateWeatherImage(weatherImage);
    updateCity(city);
    updateCountry(country);
    updateSunrise(sunriseTime);
    updateSunset(sunsetTime);
  }

  function showErrorMessage(message) {
    searchErrorEl.textContent = message;
  }

  function hideErrorMessage() {
    searchErrorEl.textContent = '';
  }

  function updateSunrise(sunriseTime) {
    sunriseEl.textContent = sunriseTime;
  }

  function updateSunset(sunsetTime) {
    sunsetEl.textContent = sunsetTime;
  }

  function updateCity(city) {
    cityEl.textContent = city;
  }

  function updateCountry(country) {
    countryEl.textContent = country;
  }

  function updateWeatherDescription(description) {
    weatherDescriptionEl.textContent = description;
  }

  function updateTemperature(temp) {
    weatherTemperatureEl.textContent = temp;
  }

  function updateFeelsLike(tempFeelsLike) {
    temperatureFeelsLikeEl.textContent = tempFeelsLike;
  }

  function updateHumidity(humidity) {
    humidityEl.textContent = humidity;
  }

  function updateWindSpeed(windSpeed) {
    windSpeedEl.textContent = windSpeed;
  }

  function updateWeatherImage(img) {
    weatherImageEl.src = `http://openweathermap.org/img/wn/${img}@2x.png`;
  }

  function updateTime(time) {
    localTimeEl.textContent = time;
  }

  return {
    renderRelevantWeatherData,
    showErrorMessage,
    hideErrorMessage,
  };
})();

export default DOM;

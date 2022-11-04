import DOM from './dom.js';

const searchIconEl = document.querySelector('.info-search__search-icon');
const searchInputEl = document.querySelector('.info-search__search-input');

navigator.geolocation.getCurrentPosition(success, error);

async function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  try {
    const userLocation = await getUserLocation(latitude, longitude);

    if (!userLocation) {
      throw new Error('Could not get location');
    }

    const userCity = userLocation.city;
    const weatherData = await getWeatherData(userCity);

    if (!weatherData) {
      throw new Error('Could not get weather data');
    }

    DOM.renderRelevantWeatherData(weatherData);
    DOM.hideErrorMessage();
  } catch (err) {
    DOM.showErrorMessage(`${err.message}`);
  }
}

async function error() {
  const defaultCity = 'London';
  const weatherData = await getWeatherData(defaultCity);
  DOM.renderRelevantWeatherData(weatherData);
  DOM.showErrorMessage('Could not get your location. Search manually for your location');
}

searchIconEl.addEventListener('click', () => {
  const city = searchInputEl.value;
  handleSearch(city);
});

searchInputEl.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleSearch(searchInputEl.value);
  }
});

async function handleSearch(city) {
  try {
    const cityData = await getWeatherData(city);
    DOM.renderRelevantWeatherData(cityData);
    DOM.hideErrorMessage();
  } catch (err) {
    if (!city) {
      DOM.showErrorMessage('Enter a city first');
    } else {
      DOM.showErrorMessage('Something went wrong. Could not get data');
    }
  }
}

function getWeatherData(city) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e9d0988d6bbff4eaed4600b00f635bf0`
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw new Error(err.message);
    });
}

function getUserLocation(lat, lng) {
  return fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  ).then((res) => {
    return res.json();
  });
}

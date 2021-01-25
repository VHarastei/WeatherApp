async function locationResponse(location) {
  try {
  let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=e42478b31305f050479347374ff01402`, {mode: 'cors'});
  let responseObj = await response.json();
  let weatherObj = processData(responseObj);
  renderData(weatherObj);
  switchTemp(weatherObj);
  } catch(err) {
    console.log(err);
    errMsg();
  }
}

function processData(obj) {
  let weatherData = {
    cityCountry: `${obj.name}, ${obj.sys.country}`,
    description: obj.weather[0].description,
    temp: {
      f: Math.round((obj.main.temp - 273.15) * 9/5 + 32) + '°',
      c: Math.round(obj.main.temp - 273.15) + '°',
    },
    feelsTemp: {
      f: Math.round((obj.main.feels_like - 273.15) * 9/5 + 32) + '°',
      c: Math.round(obj.main.feels_like - 273.15) + '°',
    },
    humidity: `Humidity: ${obj.main.humidity}%`,
    wind: `Wind: ${obj.wind.speed} ms`,
    time: `As of ${new Date(obj.dt * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`,
  };
  return weatherData;
}

function renderData(obj) {
  let toggle = document.querySelectorAll('.toggle-temp')[0].className == 'toggle-temp';
  let switcher = toggle? 'c': 'f';

  const cityCountry = document.querySelector('.left-city-country');
  cityCountry.innerText = obj.cityCountry;

  const time = document.querySelector('.left-time');
  time.innerText = obj.time;

  const temp = document.querySelector('.left-temp');
  temp.innerText = obj.temp[switcher];

  const description = document.querySelector('.left-description');
  description.innerText = obj.description[0].toUpperCase() + obj.description.slice(1);

  const feelsLikeTemp = document.querySelector('.feels-temp');
  feelsLikeTemp.innerText = `Feels like ${obj.feelsTemp[switcher]}`;

  const wind = document.querySelector('.wind');
  wind.innerText = obj.wind;

  const humidity = document.querySelector('.humidity');
  humidity.innerText = obj.humidity;
}

function switchTemp(obj) {
  let toggleTempCollection = document.querySelectorAll('.toggle-temp');
  toggleTempCollection.forEach(child => {
    child.addEventListener('click', () => {
      toggleTempCollection.forEach(toggle => toggle.className = 'toggle-temp');
      child.classList.add('active');
      renderData(obj);
    })
  });
}

function errMsg() {
  const errorMessage = document.querySelector('.error-msg');
  errorMessage.style.visibility = 'visible';

  const searchInput = document.querySelector('.search-input')
  searchInput.value = '';
}

function getWeather() {
  const searchInput = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-btn');
  let cityName = 'London';
  locationResponse(cityName);
  searchButton.addEventListener('click', () => {
    const errorMessage = document.querySelector('.error-msg');
    errorMessage.style.visibility = 'hidden';
  
    if(searchInput.value) {
      cityName = searchInput.value;
      searchInput.value = '';
      locationResponse(cityName);
    }
  });
}

getWeather();


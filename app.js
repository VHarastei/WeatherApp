
async function locationResponse(location) {
  let response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=KHUST&APPID=e42478b31305f050479347374ff01402', {mode: 'cors'});
  let responseObj = await response.json();
  let weatherObj = processData(responseObj);
  console.log(weatherObj);
}

function processData(obj) {
  console.log(obj);
  let weatherData = {
    city: obj.name,
    country: obj.sys.country, 
    weatherMain: obj.weather[0].main,
    temp: {
      f: Math.round((obj.main.temp - 273.15) * 9/5 + 32),
      c: Math.round(obj.main.temp - 273.15),
    },
    feelsTemp: {
      f: Math.round((obj.main.feels_like - 273.15) * 9/5 + 32),
      c: Math.round(obj.main.feels_like - 273.15),
    },
    humidity: obj.main.humidity,
    wind: obj.wind.speed,
    time: new Date(obj.dt * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
  };
  return weatherData;
}

locationResponse();
//obj.timezone
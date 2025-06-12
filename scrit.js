
const apiKey = '1e3e8f230b6064d27976e41163a82b77';  
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const regionNames = new Intl.DisplayNames(['en'], {type: 'region'});

searchBtn.addEventListener('click', () => {
  const city = document.getElementById('city-input').value;
  if (city) getWeatherByCity(city);
});

locationBtn.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition((pos) => {
    const { latitude, longitude } = pos.coords;
    getWeatherByCoords(latitude, longitude);
  });
});



async function getWeatherByCity(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();
    if (data.cod === 200) displayWeather(data);
    else showError(data.message);
  } catch (error) {
    showError('Network error');
  }
}

async function getWeatherByCoords(lat, lon) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();
    displayWeather(data);
  } catch (error) {
    showError('Location fetch failed');
  }
}

function displayWeather(data) {
  document.querySelector('.weather-card').classList.remove('hidden');
  const countryName = regionNames.of(data.sys.country);
  document.getElementById('location-name').textContent = `${data.name}, ${countryName}`;
  document.getElementById('country-flag').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
  document.getElementById('temperature').textContent = `${data.main.temp}°C`;
  document.getElementById('condition').textContent = data.weather[0].description;
  document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  document.getElementById('humidity').textContent = data.main.humidity;
  document.getElementById('clouds').textContent = data.clouds.all;
  document.getElementById('pressure').textContent = data.main.pressure;
  document.getElementById('wind').textContent = data.wind.speed;
}

function showError(message) {
  const errorDiv = document.getElementById('error-message');
  errorDiv.textContent = message;
  errorDiv.classList.remove('hidden');
  setTimeout(() => errorDiv.classList.add('hidden'), 3000);
}















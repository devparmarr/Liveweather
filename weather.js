const apiKey = 'e4752d621c2a670263cfa4895af82783';
const weatherCards = [];

function addCity() {
  const cityInput = document.getElementById('addCity');
  const cityName = cityInput.value.trim();

  if (cityName === '') {
    alert('Please enter a valid city name.');
    return;
  }

  if (weatherCards.some(card => card.cityName.toLowerCase() === cityName.toLowerCase())) {
    alert('City already added.');
    return;
  }

  getWeatherData(cityName);
  cityInput.value = '';
}

function getWeatherData(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      createWeatherCard(data, cityName);
      weatherCards.push({ cityName: cityName.toLowerCase(), temperature: data.main.temp });
      weatherCards.sort((a, b) => a.temperature - b.temperature);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('City not found or an error occurred.');
    });
}

function createWeatherCard(data, cityName) {
  const weatherCardsContainer = document.getElementById('weatherCards');
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('cardContainer'); // Use the appropriate class
  cardContainer.innerHTML = `
    <div class="cards">
      <div class="cardLeft">
        <h1>${data.main.temp} &#176;</h1>
        <div class="temp">
            <h3>H: ${data.main.temp_max}&#176;</h3>
            <h3>L: ${data.main.temp_min}&#176;</h3>
        </div>
        <h2>${cityName},&ensp;${data.sys.country}</h2>
      </div>
      <div class="cardRight">
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].main}">
        <h3>${data.weather[0].description}</h3>
      </div>
    </div>
  `;

  weatherCardsContainer.appendChild(cardContainer);
}

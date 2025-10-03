// Weather Forecast App - Real World Data
// 1. Get your OpenWeatherMap API key at https://openweathermap.org/api
// 2. Replace 'YOUR_OPENWEATHERMAP_API_KEY' below with your key

const API_KEY = 'b1b15e88fa797225412429c1c50c122a1'; // <-- Replace with your OpenWeatherMap API key
const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const errorDisplay = document.getElementById('errorDisplay');
const forecastCard = document.getElementById('forecastCard');
const locationDisplay = document.getElementById('locationDisplay');
const forecastDisplay = document.getElementById('forecastDisplay');
const unitToggle = document.getElementById('unitToggle');
let useCelsius = false;

function getWeatherEmoji(desc) {
   desc = desc.toLowerCase();
   if (desc.includes('cloud')) return '☁️';
   if (desc.includes('rain')) return '🌧️';
   if (desc.includes('clear')) return '🌞';
   if (desc.includes('snow')) return '❄️';
   if (desc.includes('storm') || desc.includes('thunder')) return '⛈️';
   if (desc.includes('mist') || desc.includes('fog')) return '🌫️';
   if (desc.includes('drizzle')) return '🌦️';
   return '🌡️';
}

function showError(msg) {
   errorDisplay.textContent = msg;
   forecastCard.style.display = 'none';
}

function showForecast(location, dailyForecasts) {
   locationDisplay.textContent = location;
   forecastDisplay.innerHTML = '';
   dailyForecasts.forEach(day => {
      const dayDiv = document.createElement('div');
      dayDiv.className = 'day-forecast';
      let temp = useCelsius ? `${day.tempC}°C` : `${day.tempF}°F`;
      dayDiv.innerHTML = `
         <h3>${day.date}</h3>
         <div class="temp">${temp}</div>
         <div class="desc">${getWeatherEmoji(day.desc)} ${day.desc}</div>
         <div class="humidity">💧 Humidity: ${day.humidity}%</div>
      `;
      forecastDisplay.appendChild(dayDiv);
   });
   errorDisplay.textContent = '';
   forecastCard.style.display = 'block';
}

async function fetchForecast(query) {
   // OpenWeatherMap 5-day/3-hour forecast API (returns temp in Kelvin by default)
   const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(query)}&appid=${API_KEY}`;
   const res = await fetch(url);
   if (!res.ok) {
      if (res.status === 404) throw new Error('Location not found. Try "City" or "City,Country".');
      throw new Error('Unable to fetch forecast.');
   }
   const data = await res.json();
   // Group by day, pick midday (12:00) for each day
   const days = {};
   data.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      const hour = item.dt_txt.split(' ')[1];
      if (!days[date] || hour === '12:00:00') {
         days[date] = item;
      }
   });
   // Only next 5 days
   const dailyForecasts = Object.keys(days).slice(0, 5).map(date => {
      const item = days[date];
      const tempK = item.main.temp;
      return {
         date: new Date(date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }),
         tempF: Math.round((tempK - 273.15) * 9 / 5 + 32),
         tempC: Math.round(tempK - 273.15),
         humidity: item.main.humidity,
         desc: item.weather[0].description,
      };
   });
   return {
      location: `${data.city.name}${data.city.country ? ', ' + data.city.country : ''}`,
      dailyForecasts
   };
}

weatherForm.addEventListener('submit', async (e) => {
   e.preventDefault();
   const query = cityInput.value.trim();
   if (!query) {
      showError('Please enter a city or location.');
      return;
   }
   forecastCard.style.display = 'none';
   errorDisplay.textContent = '';
   try {
      const { location, dailyForecasts } = await fetchForecast(query);
      showForecast(location, dailyForecasts);
   } catch (err) {
      showError(err.message);
   }
});

unitToggle.addEventListener('change', () => {
   useCelsius = unitToggle.checked;
   // Re-render forecast if already loaded
   if (forecastCard.style.display === 'block' && forecastDisplay.children.length > 0) {
      // Get last location from display
      const location = locationDisplay.textContent;
      // Re-fetch and re-render to update units
      weatherForm.dispatchEvent(new Event('submit'));
   }
});

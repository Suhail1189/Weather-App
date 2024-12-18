const apiKey = "cd41d0e8f06582815b222379a0710237";
const apiBase = "https://api.openweathermap.org/data/2.5/forecast";
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const weatherCards = document.getElementById("weather-display");
searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeatherData(city);
  } else {
    alert("Please enter a city name.");
  }
});
async function getWeatherData(city) {
  try {
    const response = await fetch(
      `${apiBase}?q=${city}&units=metric&cnt=24&appid=${apiKey}`
    );
    if (!response.ok) throw new Error("City not found.");
    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    alert(error.message);
  }
}
function displayWeatherData(data) {
  weatherCards.innerHTML = "";
  const forecasts = data.list.filter((_, index) => index % 8 === 0);
  forecasts.forEach((forecast) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${new Date(forecast.dt * 1000).toLocaleDateString()}</h3>
      <p>Temp: ${forecast.main.temp}°C</p>
      <p>Weather: ${forecast.weather[0].description}</p>
      <p>Humidity: ${forecast.main.humidity}%</p>
    `;
    weatherCards.appendChild(card);
  });
}
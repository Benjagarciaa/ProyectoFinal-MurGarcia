// Esta librería proporciona funciones para realizar operaciones comunes con el clima.

// Estructura de la librería
const WeatherLib = {
    // Función para buscar el clima de una ciudad
    searchWeather: function(apiKey, city, onSuccess, onError) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => onSuccess(data))
        .catch(error => onError(error));
    },

    // Función para almacenar datos del clima en el Local Storage
    storeWeatherData: function(data) {
        localStorage.setItem('weatherData', JSON.stringify(data));
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '1f18b77ba5a4f1812bfb5f920f5599b1';
    const searchBtn = document.getElementById('search-btn');
    const cityNameInput = document.getElementById('city');
    const cityNameDisplay = document.getElementById('city-name');
    const temperatureDisplay = document.getElementById('temperature');
    const weatherDescriptionDisplay = document.getElementById('weather-description');

    // Función para buscar el clima
    function searchWeather() {
        const city = cityNameInput.value;
        if (city) {
            WeatherLib.searchWeather(apiKey, city,
                // Función de éxito
                function(data) {
                    cityNameDisplay.textContent = data.name;
                    temperatureDisplay.textContent = `Temperatura: ${data.main.temp}°C`;
                    weatherDescriptionDisplay.textContent = `Descripción: ${data.weather[0].description}`;
                    // Almacenar datos del clima en el Local Storage
                    WeatherLib.storeWeatherData(data);
                },
                // Función de error
                function(error) {
                    console.error('Error al obtener datos:', error);
                    cityNameDisplay.textContent = '';
                    temperatureDisplay.textContent = '';
                    weatherDescriptionDisplay.textContent = 'Error al obtener datos del clima.';
                }
            );
        }
    }

    // Evento click para buscar al hacer clic en el botón
    searchBtn.addEventListener('click', searchWeather);

    // Evento keypress para buscar al presionar Enter
    cityNameInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchWeather();
        }
    });
});

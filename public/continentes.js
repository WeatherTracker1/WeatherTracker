// contintentes.js

const app = {
    displayWeather: function() {
        const continent = $('#continent-select').val();
        const continentCities = {
            america: ['New York', 'Los Angeles', 'Buenos Aires', 'Rio de Janeiro'],
            europa: ['London', 'Paris', 'Berlin', 'Madrid'],
            asia: ['Tokyo', 'Beijing', 'Seoul', 'Mumbai'],
            africa: ['Cairo', 'Johannesburg', 'Lagos', 'Nairobi'],
            oceania: ['Sydney', 'Melbourne', 'Auckland', 'Suva']
        };

        const apiKey = '8f59c10b452672d8b4f5221aa37383da';
        const weatherContainer = $('#weather-container');
        weatherContainer.empty();

        if (continentCities[continent]) {
            continentCities[continent].forEach(city => {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        const weatherCard = `<div class="weather-card">
                                                <h3>${city}</h3>
                                                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
                                                <p><strong>Temp:</strong> ${data.main.temp} °C</p>
                                                <p><strong>Cond:</strong> ${data.weather[0].description}</p>
                                            </div>`;
                        weatherContainer.append(weatherCard);
                    })
                    .catch(error => {
                        console.error('Error fetching weather data:', error);
                    });
            });
        }
    }
};

$('#continent-select').on('change', app.displayWeather);


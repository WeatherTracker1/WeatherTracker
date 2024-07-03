// script.js

$(document).ready(function() {
    const apiKey = '8f59c10b452672d8b4f5221aa37383da';

    $('#locationInput').autocomplete({
        source: function(request, response) {
            $.ajax({
                url: `https://api.openweathermap.org/data/2.5/find?q=${request.term}&appid=${apiKey}&lang=es`,
                dataType: 'json',
                success: function(data) {
                    response($.map(data.list, function(item) {
                        return {
                            label: `${item.name}, ${item.sys.country}`,
                            value: item.name,
                            country: item.sys.country
                        };
                    }));
                }
            });
        },
        minLength: 2,
        select: function(event, ui) {
            $('#locationInput').val(ui.item.value);
            searchWeather(ui.item.value, ui.item.country);
            return false;
        }
    });

    $('#search').click(function() {
        const location = $('#locationInput').val();
        searchWeather(location);
    });

    function searchWeather(location, country = '') {
        const query = country ? `${location},${country}` : location;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric&lang=es`;

        $('#loader').removeClass('hidden');
        $('.weather-info').addClass('hidden');
        $('#weatherIcon').addClass('hidden');

        fetch(url)
            .then(response => response.json())
            .then(data => {
                $('#loader').addClass('hidden');
                $('#temperature').text(data.main.temp + ' °C');
                $('#weather-condition').text(data.weather[0].description);
                $('#max-temperature').text(data.main.temp_max + ' °C');
                $('#min-temperature').text(data.main.temp_min + ' °C');
                $('#precipitation-probability').text(data.clouds.all + '%');
                $('#weatherIcon').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`).removeClass('hidden');
                $('.weather-info').removeClass('hidden');
                $('#location-display').text(location); // Mostrar ubicación
                $('#locationInput').val(''); // Limpiar campo de búsqueda
            })
            .catch(error => {
                $('#loader').addClass('hidden');
                alert('No se pudo obtener la información del clima. Por favor, intente nuevamente.');
            });
    }
});



// script.js

$(document).ready(function() {
    const apiKey = '8f59c10b452672d8b4f5221aa37383da';

    $('#locationInput').autocomplete({
        source: function(request, response) {
            $.ajax({
                url: `https://api.openweathermap.org/data/2.5/find?q=${request.term}&appid=${apiKey}&lang=es`,
                dataType: 'json',
                success: function(data) {
                    response($.map(data.list, function(item) {
                        return {
                            label: `${item.name}, ${item.sys.country}`,
                            value: item.name,
                            country: item.sys.country
                        };
                    }));
                }
            });
        },
        minLength: 2,
        select: function(event, ui) {
            $('#locationInput').val(ui.item.value);
            searchWeather(ui.item.value, ui.item.country);
            return false;
        }
    });

    $('#search').click(function() {
        const location = $('#locationInput').val();
        searchWeather(location);
    });

    function searchWeather(location, country = '') {
        const query = country ? `${location},${country}` : location;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric&lang=es`;

        $('#loader').removeClass('hidden');
        $('.weather-info').addClass('hidden');
        $('#weatherIcon').addClass('hidden');

        fetch(url)
            .then(response => response.json())
            .then(data => {
                $('#loader').addClass('hidden');
                $('#temperature').text(data.main.temp + ' °C');
                $('#weather-condition').text(data.weather[0].description);
                $('#max-temperature').text(data.main.temp_max + ' °C');
                $('#min-temperature').text(data.main.temp_min + ' °C');
                $('#precipitation-probability').text(data.clouds.all + '%');
                $('#weatherIcon').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`).removeClass('hidden');
                $('.weather-info').removeClass('hidden');
                $('#location-display').text(location); // Mostrar ubicación
                $('#locationInput').val(''); // Limpiar campo de búsqueda
            })
            .catch(error => {
                $('#loader').addClass('hidden');
                alert('No se pudo obtener la información del clima. Por favor, intente nuevamente.');
            });
    }
});
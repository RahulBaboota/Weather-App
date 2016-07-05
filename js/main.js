// Declaring some global variables 

var ip;
var city;
var region;
var temperature;
var weather_condition;
var wind_speed;

// Function which gets the location of the browser 

var getLocation = function()
{
    $.get('http://ipinfo.io', function(response)
    {
        ip = response.ip;
        city = response.city;
        region = response.region;
    },
        'jsonp');
};


// Function which gets weather data from openweatherapi 

var getWeather = function()
{
    $.ajax(
    {
        url:'http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=a907b62ef4d40465fbfbe6ca63b1423c',
        dataType: 'json',
        type: 'GET',
        xhrFields:
        {
            withCredentials: false,
        },

        // If the request is successful

        success: function(data)
        {
            temperature = Math.round((data['main']['temp'] - 273)),
            weather_condition = data['weather'][0]['main'],
            wind_speed = data['wind']['speed'],

            $('#location-text').fadeOut(750, function()
            {
                $('#location-text').html(city).fadeIn(750);
            })

            $('#temperature-text').fadeOut(750, function()
            {
                $('#temperature-text').html(temperature).fadeIn(750);
            })

            $('#condition-text').fadeOut(750, function()
            {
                $('#condition-text').html(weather_condition).fadeIn(750);
            })

            $('#wind-speed-text').fadeOut(750, function()
            {
                $('#wind-speed-text').html(wind_speed).fadeIn(750);
            })

        },

        
        //If the request is unsuccessful

        error: function(data)
        {
            console.log('There was a problem with the API request');
        }
    });
};

getLocation();
getWeather();

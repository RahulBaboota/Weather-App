// Declaring some global variables 

var ip;
var city;
var region;
var temperature;
var weather_condition;
var wind_speed;
var time;
var hours;

// Function which gets the location of the browser 

var getLocation = function()
{
    $.getJSON('http://ipinfo.io', function(response)
    {
        ip = response.ip;
        city = response.city;
        region = response.region;
    }),
        'jsonp';
}

// Function which gets the time from the browser 

var getTime = function()
{

    var now = new Date();
    hours = now.getHours();
    time = [ now.getHours(), ':', now.getMinutes() ,':', now.getSeconds() ].join('');
    // console.log(hours);
}


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
            console.log(city);

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

        },

        
        //If the request is unsuccessful

        error: function(data)
        {   

            console.log('There was a problem with the API request');

        }
    });
};

// Function for night mode transition

var nightMode = function()
{
    $('#button').on('click' , function()
    {
        if (hours>=20)
        {
            $('body').fadeOut(750 , function()
            {
                $('body').css('background-image' , 'radial-gradient(1600px at 70% 120%, rgba(33, 39, 80, 1) 10%, #020409 100%)');
                $('body').fadeIn(750);
                $('#moon').css('opacity','100');
                $('#location-icon').fadeIn(750 , function()
                {
                    $('#location-icon').css('opacity','100');
                })

                $('#temperature-icon').fadeIn(750 , function()
                {
                    $('#temperature-icon').css('opacity','100');
                })

                $('#condition-icon').fadeIn(750 , function()
                {
                    $('#condition-icon').css('opacity','100');
                })

                $('#wind-speed-icon').fadeIn(750 , function()
                {
                    $('#wind-speed-icon').css('opacity','100');
                })

                getWeather();
            })
        }
    })
}

// Function for day mode transition

var dayMode = function()
{
    $('#button').on('click' , function()
    {
        if(hours>5 && hours<20)
        {
            $('body').fadeOut(750 , function()
            {
                $('body').css('background-image' , 'radial-gradient(1600px at 70% 120%, rgb(0, 191, 255) 10%, #00ffff 100%)');
                $('body').fadeIn(750);
                $('#sun').css('opacity','100');
                $('#Heading-box').css('color','#666666');
                $('#button').css('color','#666666');

                $('#location-icon').fadeIn(750 , function()
                {
                    $('.fa-map-marker').css('color','#FFFFFF');
                    $('#location-icon').css('opacity','100');
                })

                $('#temperature-icon').fadeIn(750 , function()
                {
                    $('#temperature-icon').css('color','#FFFFFF');
                    $('#temperature-icon').css('opacity','100');
                })

                $('#condition-icon').fadeIn(750 , function()
                {
                    $('.fa-cloud').css('color','#FFFFFF');
                    $('#condition-icon').css('opacity','100');
                })

                getWeather();
            })
        }

    })
}


// Document ready function

$(document).ready(function()
{   
    getLocation();
    getTime();
    dayMode();
    nightMode();

});



// Declaring some global variables 

var ip;
var city;
var region;

// Function which gets the location of the browser 

var getLocation = function()
{
	$.get('http://ipinfo.io', function(response)
	{
		var ip = response.ip;
		var city = response.city;
		var region = response.region;
	},
		'jsonp');
};


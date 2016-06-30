// Declaring some global variables 

var ip;
var city;
var region;

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


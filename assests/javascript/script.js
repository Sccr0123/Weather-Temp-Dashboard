const APIKey = "0ff69f3d13585fb83dee9d3379f0e553";

function generatePage() {
	var cityName = "Detroit";
    var curIconE1 = "";
    var curTempE1 = "";
    var curHumE1 = "";
    var curWindSpeed = "";
    var curUvIndE1 = "";
    var searchHisE1 = "";
    var curDayE1 = "";
    var fiveDayE1 = "";
	var history = "";

    console.log("Page Loaded");
	getLatLong(cityName);
}

function getLatLong(city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			var long = data[0].lon;
			var lat = data[0].lat;
			console.log(lat);
			console.log(long);
			
			getWeather(lat, long);
		});
};

function getWeather(lat, long) {
	fetch(`api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${APIKey}`)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);
		});
};

$(document).ready(function () {
    generatePage();
});


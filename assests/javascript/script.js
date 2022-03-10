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

    getLatLong(cityName);
    console.log("Page Loaded");
}

function getLatLong(city) {
    fetch(
		$(
			`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`
		)
	)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);
		});
};

function getWeather(lat, long) {
	fetch($(`api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${APIKey}`))
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


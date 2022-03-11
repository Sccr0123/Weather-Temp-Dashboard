const APIKey = "0ff69f3d13585fb83dee9d3379f0e553";
var cityName = "Detroit";

function generatePage() {
	var curIconE1 = "";
	var curTempE1 = $("#curTemp");
	var curHumE1 = "";
	var curWindSpeedE1 = "";
	var curUvIndE1 = "";
	var searchHisE1 = "";
	var curDayE1 = "";
	var fiveDayE1 = "";
	var history = "";

	getLatLong(cityName);
}

function getLatLong(city) {
	fetch(
		`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`
	)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			var long = data[0].lon;
			var lat = data[0].lat;

			getWeather(lat, long);
		});
}

function getWeather(lat, long) {
	fetch(
		`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${APIKey}&units=imperial`
	)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);
			
			printCurrent(data.current, cityName);
			printFiveDay(data.daily);
		});
}

function printCurrent(current, city) {
	var date = new Date(current.dt*1000).toUTCString();

	$("#curDay").html(`${city} ${date}`);
	$("#curTemp").append(`${parseInt(current.temp)}°`);
	$("#curHum").append(current.humidity);
	$("#curWS").append(`${current.wind_speed} mph`);
	$("#curUV").append(current.uvi);
};

function printFiveDay(daily) {
	var days = [daily[1], daily[2], daily[3], daily[4], daily[5]];
	for (var i = 0; days.length; i++){
		dayEl = $(`#day${i + 1}`);
		console.log(dayEl);
		dayDate = document.createElement("h2");
		dayIcon = document.createElement("img");
		dayTemp = document.createElement("p");
		dayWind = document.createElement("p");
		dayHum = document.createElement("p");

		dayDate.textContent = "Date";
		dayTemp.textContent = daily[i].temp;
		dayWind.textContent = daily[i].wind_speed;
		dayHum.textContent = daily[i].wind_speed;

		dayE1.appendChild(dayDate);
		dayE1.appendChild(dayIcon);
		dayE1.appendChild(dayTemp);
		dayE1.appendChild(dayWind);
		dayE1.appendChild(dayHum);
	};
};

$(document).ready(function () {
	generatePage();
});

// import { APIKey } from "./key";

var APIKey = "0ff69f3d13585fb83dee9d3379f0e553";

// dayjs.extend(window.dayjs_plugin_utc);
// dayjs.extend(window.dayjs_plugin_timezone);

function clearPage() {
	$("#curDay").empty();
	$("#curTemp").empty();
	$("#curHum").empty();
	$("#curWS").empty();
	$("#curUV").empty();
	$("#FiveDayInner").empty();
}

function generatePage(city) {
	var curIconE1 = "";
	var curTempE1 = $("#curTemp");
	var curHumE1 = "";
	var curWindSpeedE1 = "";
	var curUvIndE1 = "";
	var searchHisE1 = "";
	var curDayE1 = "";
	var history = "";

	getLatLong(city);
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

			getWeather(lat, long, city);
		});
}

function getWeather(lat, long, city) {
	fetch(
		`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${APIKey}&units=imperial`
	)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			printCurrent(data.current, city, data.timezone);
			printFiveDay(data.daily);
		});
}

function printCurrent(current, city, timezone) {
	var date = new Date(current.dt * 1000).toUTCString();
	console.log(timezone);
	// var date = dayjs().tz(timezone).format("M/D/YYYY");

	$("#curDay").html(`${city} (${date})`);
	$("#curTemp").append(`Tempature: ${parseInt(current.temp)}°`);
	$("#curWS").append(`Wind Speed: ${current.wind_speed} mph`);
	$("#curHum").append(`Humidity: ${current.humidity}%`);
	$("#curUV").append(`UV Index: ${current.uvi}`);
}

function printFiveDay(daily) {
	var days = [daily[1], daily[2], daily[3], daily[4], daily[5]];
	var fiveDayE1 = $("#FiveDayInner");
	$("#FiveDayInner");

	for (var i = 0; i < days.length; i++) {
		var dayE1 = $("<div>");
		dayE1.addClass("col-2 border border-dark");

		dayDate = document.createElement("h2");
		dayIcon = document.createElement("img");
		dayTemp = document.createElement("p");
		dayWind = document.createElement("p");
		dayHum = document.createElement("p");

		dayDate.textContent = "Placeholder";
		dayTemp.textContent = `Tempature: ${daily[i].temp.max}°`;
		dayWind.textContent = `Wind Speed: ${daily[i].wind_speed} mph`;
		dayHum.textContent = `Humidity: ${daily[i].humidity}`;

		dayE1.append(dayDate);
		dayE1.append(dayIcon);
		dayE1.append(dayTemp);
		dayE1.append(dayWind);
		dayE1.append(dayHum);

		fiveDayE1.append(dayE1);
	}
}

$(document).ready(function () {
	$("#searchBtn").on("click", function () {
		clearPage();
		var cityName = $("#searchText").val();
		generatePage(cityName);
	});
});

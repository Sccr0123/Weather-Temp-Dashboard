// import { APIKey } from "./key";

var APIKey = "0ff69f3d13585fb83dee9d3379f0e553";

// dayjs.extend(window.dayjs_plugin_utc);
// dayjs.extend(window.dayjs_plugin_timezone);

var fiveDayEl = $("#FiveDay");
var fiveDayInnerEl = $("#FiveDayInner");
var currentDayEl = $("#CurrentDay");

function clearPage() {
	$("#curDay").empty();
	$("#curTemp").empty();
	$("#curHum").empty();
	$("#curWS").empty();
	$("#curUV").empty();
	fiveDayInnerEl.empty();
}

function generatePage(city) {
	$("#curDay").html(`<h3>Searching...</h3>`);

	var history = "";

	getLatLong(city);
}

function getLatLong(city) {
	fetch(
		`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`
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
		`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${APIKey}&units=imperial`
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
	currentDayEl.addClass("border border-dark");

	// var curDay = $("<h2></h2>");
	// curDay.attr("id", "curDay");

	$("#curDay").html(`${city} (${date})`);
	$("#curTemp").append(`Tempature: ${parseInt(current.temp)}°`);
	$("#curWS").append(`Wind Speed: ${current.wind_speed} mph`);
	$("#curHum").append(`Humidity: ${current.humidity}%`);
	$("#curUV").append(`UV Index: ${current.uvi}`);
}

function printFiveDay(daily) {
	var days = [daily[1], daily[2], daily[3], daily[4], daily[5]];

	fiveDayEl.addClass("border border-dark");

	for (var i = 0; i < days.length; i++) {
		var dayEl = $("<div>");
		dayEl.addClass("col-2 border border-dark");

		dayDate = document.createElement("h2");
		dayIcon = document.createElement("img");
		dayTemp = document.createElement("p");
		dayWind = document.createElement("p");
		dayHum = document.createElement("p");

		dayDate.textContent = "Placeholder";
		dayTemp.textContent = `Tempature: ${daily[i].temp.max}°`;
		dayWind.textContent = `Wind Speed: ${daily[i].wind_speed} mph`;
		dayHum.textContent = `Humidity: ${daily[i].humidity}`;

		dayEl.append(dayDate);
		dayEl.append(dayIcon);
		dayEl.append(dayTemp);
		dayEl.append(dayWind);
		dayEl.append(dayHum);

		fiveDayInnerEl.append(dayEl);
	}
}

$(document).ready(function () {
	$("#searchBtn").on("click", function () {
		clearPage();
		var cityName = $("#searchText").val();
		generatePage(cityName);
	});
});

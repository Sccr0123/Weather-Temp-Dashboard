var APIKey = "0ff69f3d13585fb83dee9d3379f0e553";

var curHistory = [];

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
			printCurrent(data.current, city);
			printFiveDay(data.daily);
		});
}

function loadHistory() {
	var searchHistory = $("#SearchHistory");
	searchHistory.empty();

	curHistory = JSON.parse(localStorage.getItem("history"));

	for (var i = 0; i < curHistory.length; i++) {
		var tempHistEl = $("<p>");
		var tempHistBtn = $("<button>");

		tempHistBtn.attr("class", "pt-3 border-0 bg-white SearchHistoryBtn");
		tempHistBtn.text(curHistory[i]);

		tempHistEl.append(tempHistBtn);
		searchHistory.append(tempHistEl);
	}
}

function saveHistory(city) {
	curHistory.unshift(city);
	if (curHistory.length > 8) {
		curHistory = curHistory.slice(0, 8);
	}
	localStorage.setItem("history", JSON.stringify(curHistory));

	loadHistory();
}

function printCurrent(current, city) {
	var curDayEl = $("#CurrentDay");

	curDayEl.empty();

	var tempIcon = current.weather[0].icon;
	var curDayIcon = `http://openweathermap.org/img/wn/${tempIcon}@2x.png`;

	var date = new Date(current.dt * 1000);

	date = dayjs(date).format("dddd, MMMM DD");

	curDayEl.addClass("border border-dark");

	var curDayH2 = $("<h2>");
	curDayH2.attr("id", "curDay");

	var curDayIc = $("<img>");
	curDayIc.attr("src", curDayIcon);
	curDayIc.attr("alt", "Current Weather Icon");

	var curDayDiv = $("<div>");
	curDayDiv.attr("class", "p-0 justify-content-center");
	curDayDiv.attr("id", "CurrentDayInner");

	var curTemp = $("<p>");
	curTemp.attr("id", "curTemp");
	var curWS = $("<p>");
	curWS.attr("id", "curWS");
	var curHum = $("<p>");
	curHum.attr("id", "curHum");
	var curUV = $("<p>");
	curUV.attr("id", "curUV");

	curDayDiv.append(curTemp);
	curDayDiv.append(curWS);
	curDayDiv.append(curHum);
	curDayDiv.append(curUV);

	curDayEl.append(curDayH2);
	curDayEl.append(curDayDiv);

	$("#curDay").html(`${city} (${date})`);
	$("#curDay").append(curDayIc);
	$("#curTemp").append(`Tempature: ${parseInt(current.temp)}°`);
	$("#curWS").append(`Wind Speed: ${current.wind_speed} mph`);
	$("#curHum").append(`Humidity: ${current.humidity}%`);
	$("#curUV").append(`UV Index: ${current.uvi}`);
}

function printFiveDay(daily) {
	ran = true;
	var fiveDayEl = $("#FiveDay");
	fiveDayEl.empty();

	var days = [daily[1], daily[2], daily[3], daily[4], daily[5]];

	//fiveDayEl.addClass("border border-dark");

	var fiveDayH3 = $("<h3>");
	var fiveDayDiv = $("<div>");

	fiveDayH3.text("5-Day Forcast:");

	fiveDayDiv.attr("id", "FiveDayInner");
	fiveDayDiv.attr("class", "row justify-content-around");

	for (var i = 0; i < days.length; i++) {
		var date = new Date(days[i].dt * 1000);
		date = dayjs(date).format("dddd, MMMM DD");

		var dayEl = $("<div>");
		var tempIcon = daily[i].weather[0].icon;
		var fiveDayIcon = `http://openweathermap.org/img/wn/${tempIcon}@2x.png`;

		dayEl.addClass("col-2 border border-dark bg-secondary text-light");

		dayDate = $("<h2>");
		dayIcon = $("<img>");
		dayTemp = $("<p>");
		dayWind = $("<p>");
		dayHum = $("<p>");

		dayDate.text(date);
		dayIcon.attr("src", fiveDayIcon);
		dayIcon.attr("alt", "Weather Icon Placeholder");
		dayIcon.attr("class", "pt-1");
		dayTemp.text(`Tempature: ${daily[i].temp.max}°`);
		dayWind.text(`Wind Speed: ${daily[i].wind_speed} mph`);
		dayHum.text(`Humidity: ${daily[i].humidity}`);

		dayEl.append(dayDate);
		dayEl.append(dayIcon);
		dayEl.append(dayTemp);
		dayEl.append(dayWind);
		dayEl.append(dayHum);

		fiveDayDiv.append(dayEl);
	}

	fiveDayEl.append(fiveDayH3);
	fiveDayEl.append(fiveDayDiv);
}

$(document).ready(function () {
	loadHistory();

	$("#searchBtn").on("click", function () {
		var cityName = $("#searchText").val();

		saveHistory(cityName);
		generatePage(cityName);
	});

	$(".SearchHistoryBtn").on("click", function () {
		var cityName = $(this).text();
		console.log("Clicked");

		saveHistory(cityName);
		generatePage(cityName);
	});
});

const APIKey = "0ff69f3d13585fb83dee9d3379f0e553";

var getLatLong = function (city) {
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

var getWeather = function (lat, long) {
	fetch($(`api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${APIKey}`))
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);
		});
};

getLatLong("Detroit");


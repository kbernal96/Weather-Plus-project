function currentDateDisplay(currentTime){
    
    let day = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    day = day[currentTime.getDay()];
    month = month[currentTime.getMonth()];
    let date = currentTime.getDate();
    let hour = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let abr = ``;

    if (minutes < 10 || hour < 10) {
        minutes = `0${minutes}`;
        hour = `0${hour}`;
    }
    
    
    if (hour < 12) {
        abr = `am`;
    }
    else {
        abr = `pm`;
    }
    

    return `${day}, ${month} ${date} ${hour}:${minutes}${abr}`; 
}

    

let now = new Date();

let dateDisplay = document.querySelector("#current-date-display");
dateDisplay.innerHTML = currentDateDisplay(now);


/*
On your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.

🕵️‍♀️Feature #2
Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
*/

function displayCityName(event){
    event.preventDefault();
    let cityInput = document.querySelector("#search-city");
    let units = `imperial`;
    let apiKey = `8d06b83f009e333b86de3e222284487f`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(currentDatadisplay);
}
let cityForm = document.querySelector("#weather-form");
cityForm.addEventListener("submit", displayCityName);

function currentDatadisplay(response){
    console.log(response);
    let enteredCity = document.querySelector("#city-name");
    let cityTemp = document.querySelector("#current-temperature-display");
    //let precipitationPercentage = document.querySelector("#precipitation-condition");
    let humidityPercentage = document.querySelector("#humidity-condition");
    let windSpeed = document.querySelector("#wind-condition");
    let currentWeather = document.querySelector("#current-weather-condition");

    enteredCity.innerHTML = `📍 ${response.data.name}`;
    cityTemp.innerHTML = Math.round(response.data.main.temp);  
    //precipitationPercentage.innerHTML = response.data.main
    humidityPercentage.innerHTML = response.data.main.humidity;
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
    currentWeather.innerHTML = response.data.weather[0].main;    
}

/*🙀 Bonus point:
Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.
*/

function navigate(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position){
    let geoApiKey =`8d06b83f009e333b86de3e222284487f`;
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${geoApiKey}&units=imperial`;

    axios.get(geoUrl).then(positionData);
}

function positionData(response){
    console.log(response);
    let position = document.querySelector("#city-name");
    let positionWeatherCondition = document.querySelector("#current-weather-condition");
    let positionTemp = document.querySelector("#current-temperature-display");
    let positionHumidity = document.querySelector("#humidity-condition");
    let positionWindSpeed = document.querySelector("#wind-condition");
    
    position.innerHTML = `📍${response.data.name}`;
    positionWeatherCondition.innerHTML = response.data.weather[0].main;
    positionTemp.innerHTML = Math.round(response.data.main.temp);
    positionHumidity.innerHTML = response.data.main.humidity;
    positionWindSpeed.innerHTML = Math.round(response.data.wind.speed);
}
let currentPosition = document.querySelector("#current-location-button");
currentPosition.addEventListener("click", navigate); 


/*🙀Bonus Feature
Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.
*/

function celsiusToFahrenheit(event){
    event.preventDefault();
    let tempDisplay = document.querySelector("#current-temperature-display");
    let temp = tempDisplay.innerHTML;
    tempDisplay.innerHTML = Math.round(temp * (9/5) + 32 );
}

let toFahrenheit = document.querySelector("#fahrenheit");
toFahrenheit.addEventListener("click", celsiusToFahrenheit);

function fahrenheitToCelsius(event){
    event.preventDefault();
    let tempDisplay = document.querySelector("#current-temperature-display");
    let temp = tempDisplay.innerHTML;
    tempDisplay.innerHTML = Math.round((temp - 32 ) * (5/9));
}

let toCelsius = document.querySelector("#celsius");
toCelsius.addEventListener("click",fahrenheitToCelsius); 
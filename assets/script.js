$(document).ready(function() {

var formEl = $("#city-search-form");

var city = "";
var fetchLocationUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
var weatherurl = "api.openweathermap.org/data/2.5/forecast?lat=";


formEl.submit(function(event){
    event.preventDefault();

    city = $("#city-input").val();
    console.log(city);

    fetchGeoLocation(fetchLocationUrl, city);
});

function fetchWeatherData(lon,lat){
    console.log(typeof lon);

    var longtitude = lon.toFixed(2);
    var latitude = lat.toFixed(2);
    console.log(latitude);

    url = "http://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=3d6eceb6d20dd4f1064ba032496f9d24";
    console.log(url);

    fetch(url)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.log(err));
}

function fetchGeoLocation(url, city){

    url = fetchLocationUrl + city +"&limit=1&appid=3d6eceb6d20dd4f1064ba032496f9d24";

    fetch(url)
    .then(response => response.json())
    .then(response => 
        {console.log(response);
         fetchWeatherData(response[0].lon,response[0].lat);   
        })
    .catch(err => console.log(err));
}

//write a functin that takes in lontatude and latatude and prints out weather data



});
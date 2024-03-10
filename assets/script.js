$(document).ready(function() {

var formEl = $("#city-search-form");
var searchlistEL = $("#past-searches");

var city = "";
var fetchLocationUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
var weatherurl = "http://api.openweathermap.org/data/2.5/";
var date = dayjs().add(1, 'day').format("D MMM, YYYY");
var currentWeather = {};
var fiveDayForecast = {};

console.log(date);
formEl.submit(function(event){
    event.preventDefault();

    city = $("#city-input").val();
    console.log(city);

    fetchGeoLocation(fetchLocationUrl, city);
    savePastSearch(city);
});

function savePastSearch(pastSearch){
var searchItem = pastSearch;
var listEl = $("<li>");
listEl.text(searchItem);
listEl.on("click",function(){
    fetchGeoLocation(fetchLocationUrl, searchItem);

});
//append list
searchlistEL.append(listEl);

}

function fetchWeather(lon,lat,type){
    console.log(typeof lon);

    var longtitude = lon.toFixed(2);
    var latitude = lat.toFixed(2);
    console.log(latitude);

    url = weatherurl + type + "?lat=" +latitude+ "&lon=" + longtitude + "&appid=3d6eceb6d20dd4f1064ba032496f9d24&units=metric";
    console.log(url);

    fetch(url)
    .then(response => response.json())
    .then(response => {console.log(response);
     if(type == "forecast"){
        for(var i =0; i < 40; i+=8 ){
        console.log(response.list[i].main.temp);
        console.log(response.list[i].main.temp);
        console.log(response.list[i].wind.speed);
        console.log(response.list[i].main.humidity);
        console.log(response.list[i].weather[0].icon);
        
    }
        
     }else{
       console.log(response.main.temp);
       console.log(response.wind.speed);
       console.log(response.main.humidity);
       console.log(response.weather[0].icon);


     }
    })
    .catch(err => console.log(err));
}


function fetchGeoLocation(url, city){

    url = fetchLocationUrl + city +"&limit=1&appid=3d6eceb6d20dd4f1064ba032496f9d24";

    fetch(url)
    .then(response => response.json())
    .then(response => 
        {console.log(response);
         fetchWeather(response[0].lon,response[0].lat, "forecast"); 
         fetchWeather(response[0].lon,response[0].lat, "weather"); 

         
        })
    .catch(err => console.log(err));
}

//write a functin that takes in lontatude and latatude and prints out weather data



});
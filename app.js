var express = require("express");
var app = express();
var Forecast = require("forecast");
var NodeGeocoder = require("node-geocoder");

var geocoderOptions = {
    provider: "google",
    apiKey: "AIzaSyAVxocnoY93KKKQBzWuNpyFWTZRqKnZuTQ",
    formatter: null
}

var geocoder = NodeGeocoder(geocoderOptions);

// initialize forecast
var forecast = new Forecast({
    service: "darksky",
    key: "a91d1e5b26e7673401d229ac83c52983",
    units: "fahrenheit",
    cache: true,
    ttl: {
        minutes: 27,
        seconds: 45
    }
});

// forecast.get([41.881832, -87.623177], function(err, weather){
//     if(err){
//         console.log(err);
//     } 
//     console.log(weather.currently.temperature);
// });

app.set("view engine", "ejs");

 geocoder.geocode("1364 N Hoyne ave Chicago", function(err, data){
        if(err){
            console.log(err);
        }
        console.log(data[0].geometry);
    });

app.get("/", function(req, res){
    forecast.get([41.881832, -87.623177], function(err, weather){
    if(err){
        console.log(err);
    } 
    var currentTemp = weather.currently.temperature;
    res.render("home", {currentTemp: currentTemp});
    });
});

app.get("/about", function(req, res){
    res.render("about");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started!");
});
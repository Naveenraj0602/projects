const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
res.sendFile(__dirname + "/index.html");

});

app.post("/", function (req, res) {

  const query = req.body.cityName ;
  const apiKey = "bce240917f2669bb78af1def9952e819";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey
https.get(url, function (response) {

  response.on("data", function (data) {
  const weatherData = JSON.parse(data)
  const temp = weatherData.main.temp
  const icon = weatherData.weather[0].icon
  const name = weatherData.name
  const weatherDiscription = weatherData.weather[0].description
  const imageURl = "http://openweathermap.org/img/wn/"+ icon + "@2x.png"
  res.write("<h1>The Weather currently is "+weatherDiscription+".</h1>")
  res.write("<h1>The Temperature in "+name + " is "+temp +" degrees.</h1>")
  res.write("<img src="+imageURl+">")
  res.send();
  })
});
});


app.listen(3000, function () {
});

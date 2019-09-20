// Create our initial map object
// Set the longitude, latitude, and the starting zoom level
var myMap = L.map("ThirdChart", {
  center: [38.5767, -92.1735],
  zoom: 8
});


// Add a tile layer (the background map image) to our map
// Use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);


var mine1=L.circle([37.6325, -91.134722], {
  color: "red",
  fillColor: "red",
  fillOpacity: 0.75,
  radius: 7000
}).addTo(myMap);

var mine2=L.circle([37.4925, -91.110833], {
  color: "green",
  fillColor: "green",
  fillOpacity: 0.75,
  radius: 7000
}).addTo(myMap);

var mine3=L.circle([37.656389, -91.1225], {
  color: "blue",
  fillColor: "blue",
  fillOpacity: 0.75,
  radius: 7000
}).addTo(myMap);

var mine4=L.circle([37.466389, -91.109167], {
  color: "yellow",
  fillColor: "yellow",
  fillOpacity: 0.75,
  radius: 7000
}).addTo(myMap);

var mine5=L.circle([37.755, -91.076667], {
  color: "gray",
  fillColor: "gray",
  fillOpacity: 0.75,
  radius: 7000
}).addTo(myMap);

var mine6=L.circle([37.400833, -91.073611], {
  color: "pink",
  fillColor: "pink",
  fillOpacity: 0.65,
  radius: 7000,
}).addTo(myMap);

mine1.bindPopup("<h1>Magmont Mine and Mill</h1>");
mine2.bindPopup("<h1>Brushy Creek Mine and Mill</h1>");
mine3.bindPopup("<h1>Casteel Mine</h1>");
mine4.bindPopup("<h1>Fletcher Mine and MIll</h1>");
mine5.bindPopup("<h1>Sweetwater Mine and Mill</h1>");
mine6.bindPopup("<h1>Vilburnum #29 Mine</h1>");

init()
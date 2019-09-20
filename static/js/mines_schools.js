// Create our initial map object
// Set the longitude, latitude, and the starting zoom level
var myMap = L.map("map2", {
  center: [38.5767, -92.1735],
  zoom: 7.5
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
  radius: 7500
}).addTo(myMap);

var mine2=L.circle([37.4925, -91.110833], {
  color: "green",
  fillColor: "green",
  fillOpacity: 0.75,
  radius: 7500
}).addTo(myMap);

var mine3=L.circle([37.656389, -91.1225], {
  color: "blue",
  fillColor: "blue",
  fillOpacity: 0.75,
  radius: 7500
}).addTo(myMap);

var mine4=L.circle([37.466389, -91.109167], {
  color: "yellow",
  fillColor: "yellow",
  fillOpacity: 0.75,
  radius: 7500
}).addTo(myMap);

var mine5=L.circle([37.755, -91.076667], {
  color: "gray",
  fillColor: "gray",
  fillOpacity: 0.75,
  radius: 7500
}).addTo(myMap);

var mine6=L.circle([37.400833, -91.073611], {
  color: "pink",
  fillColor: "pink",
  fillOpacity: 0.65,
  radius: 7500,
}).addTo(myMap);

mine1.bindPopup("<h1>Magmont Mine and Mill</h1>");
mine2.bindPopup("<h1>Brushy Creek Mine and Mill</h1>");
mine3.bindPopup("<h1>Casteel Mine</h1>");
mine4.bindPopup("<h1>Fletcher Mine and MIll</h1>");
mine5.bindPopup("<h1>Sweetwater Mine and Mill</h1>");
mine6.bindPopup("<h1>Vilburnum #29 Mine</h1>");

// var link = "https://opendata.arcgis.com/datasets/aa3f9fa2b9764dcd95605d01065ae5cc_0.geojson";

// d3.json(link, function(data) {
//   // Creating a GeoJSON layer with the retrieved data
//   L.geoJson(data).addTo(myMap);
// });

// d3.json(link, function(data) {
//   //   // Creating a GeoJSON layer with the retrieved data
//   L.geoJson(data, {
//     style: function(feature) {
//       return {
//         "color": "#78c679",
//         "weight": 5,
//         "opacity": 0.9
//       }
//     },
//     // Put onEachFeature within the options object, not as 3rd argument.
//     var schools  = onEachFeature: function(feature, layer) {
//       layer.bindPopup("<h1>"+feature.properties.Facility + "</h> <hr> <h1>" + feature.properties.City + "</h1>");
//     }
//   }/*, { // Original position (as 3rd argument) of onEachFeature.
//     onEachFeature: function(feature, layer) {
//       layer.bindPopup(feature.properties.type);
//     }
//   }*/).addTo(myMap)});

  

  var link2 = "https://opendata.arcgis.com/datasets/c2e5681518cb4ec6bbfde185dcafdeb8_0.geojson";

//   d3.json(link2, function(data) {
//     //   // Creating a GeoJSON layer with the retrieved data
//       L.geoJson(data).addTo(myMap);
//     });

d3.json(link2, function(data) {
  //   // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data, {
    style: function(feature) {
      return {
        "color": "#78c679",
        "weight": 5,
        "opacity": 0.9
      }
    },
    // Put onEachFeature within the options object, not as 3rd argument.
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h1>"+feature.properties.COUNTYNAME + "</h> <hr> <h1>" + feature.properties.LEAD + "</h1>");
    }
  }/*, { // Original position (as 3rd argument) of onEachFeature.
    onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.type);
    }
  }*/).addTo(myMap)});


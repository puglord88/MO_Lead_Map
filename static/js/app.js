function buildBarGraph(year){
  console.log("BuildGraph function triggerred")

    var url=`/states/${year}`;
    console.log("url is"+url);
    
    d3.json(url).then(function(response){
      console.log(response)
      console.log('All States', response.map(stateData => stateData.state))
      console.log('All States: chldrn_confirbill_5ugdl', response.map(stateData => stateData.chldrn_confirbill_5ugdl))
      colors = ['lightslategray',] * 11
      colors[0] = 'crimson'
      color= ['red',]*11
      color[0]='blue'
    
      var trace1 = {
        x: response.map(stateData => stateData.state),
        y: response.map(stateData => stateData.chldrn_confirbill_5ugdl),
        name: '5 Microgram/dl',
        type: 'bar',
        marker:{
          color: colors
        }
      };   

      var trace2 = {
        x: response.map(stateData => stateData.state),
        y: response.map(stateData => stateData.chldrn_confirbill_10ugdl),
        name: '10 Microgram/dl',
        type: 'bar',
        marker:{
          color: color
        }
      };        
      var data = [trace1, trace2];
      
      var layout = {barmode: 'stack'};
      
      Plotly.newPlot('bar', data, layout);       
    })
}

function getColor(feature) {
  return  feature > 500 ? '#990000' :
          feature > 100 ? '#ed2f2f' :
          feature > 50  ? '#ed722f' :
          feature > 30  ? '#edc72f' :
          feature > 20  ? '#e7ed2f' :
          feature > 15  ? '#caed2f' :
          feature > 10  ? '#4ced2f' :
          feature > 5   ? '#2fede7' :
	                         '#2f6eed';
}
function getStyle(feature) {
return {
  fillColor: getColor(feature.properties["confirmed_BLLS_Grtrthan5Mg"]),
  weight: 1,
  opacity: 1,
  color: 'white',
  dashArray: '3',
  fillOpacity: 0.5
};
}
var geoJsonData = null;

const keyBy = (array, key) => (array || []).reduce((r, x) => ({ ...r, [key ? x[key] : x]: x }), {});

function addMinesLayer(map) {
  
  var mine1=L.circle([37.6325, -91.134722], {
    color: "red",
    fillColor: "red",
    fillOpacity: 0.75,
    radius: 7500
  }).addTo(map);

  var mine2=L.circle([37.4925, -91.110833], {
    color: "green",
    fillColor: "green",
    fillOpacity: 0.75,
    radius: 7500
  }).addTo(map);

  var mine3=L.circle([37.656389, -91.1225], {
    color: "blue",
    fillColor: "blue",
    fillOpacity: 0.75,
    radius: 7500
  }).addTo(map);

  var mine4=L.circle([37.466389, -91.109167], {
    color: "yellow",
    fillColor: "yellow",
    fillOpacity: 0.75,
    radius: 7500
  }).addTo(map);

  var mine5=L.circle([37.755, -91.076667], {
    color: "gray",
    fillColor: "gray",
    fillOpacity: 0.75,
    radius: 7500
  }).addTo(map);

  var mine6=L.circle([37.400833, -91.073611], {
    color: "pink",
    fillColor: "pink",
    fillOpacity: 0.65,
    radius: 7500,
  }).addTo(map);

  mine1.bindPopup("<h1>Magmont Mine and Mill</h1>");
  mine2.bindPopup("<h1>Brushy Creek Mine and Mill</h1>");
  mine3.bindPopup("<h1>Casteel Mine</h1>");
  mine4.bindPopup("<h1>Fletcher Mine and MIll</h1>");
  mine5.bindPopup("<h1>Sweetwater Mine and Mill</h1>");
  mine6.bindPopup("<h1>Vilburnum #29 Mine</h1>");
}

function buildGeoJsonMap(year){   
//fetch('http://localhost:8080/posts', { mode: 'no-cors' });
  // Creating map object
  console.log("BuildGeoJsonMap function triggered")
  var map = L.map("map", {
    center: [38.582138, -92.178877],
    zoom: 7
  });
  
  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(map);
   
  // Grabbing our GeoJSON data..  
  d3.json("/timelineMap").then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    geoJsonData = data;
    var lead_data_url = `/counties/${year}`;
    console.log('lead_data_url',lead_data_url)
     d3.json(lead_data_url).then(function(lead_data_response){

      const fipsToLeadDataMap = keyBy(lead_data_response.map(row => {
        row.FIPS = row.FIPS.padStart(3, '0') 
        return row
      }), 'FIPS')
      console.log("fipsToLeadDataMap",fipsToLeadDataMap)

      geoJsonData.features.forEach(feature => {
        const county_lead = fipsToLeadDataMap[feature.properties.COUNTYFIPS]  
        feature.properties = { ...feature.properties, ...county_lead}
      })
            
      L.geoJson(geoJsonData, 
        {style: getStyle,
        onEachFeature: function(feature, layer) {
        // Set mouse events to change map styling
        layer.on({
          // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
          mouseover: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 1
            });
          },
          // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
          mouseout: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.5
            });
          },
          
        });

       
        //Reynolds
        // Giving each feature a pop-up with information pertinent to it
        layer.bindPopup(`<h4> ${feature.properties.county_name} </h4> <hr> <h5> Kids tested for BLL
         ${feature.properties.total_chldn_tested} </h5> <hr> <h5> confrmd BLL > 5mg
         ${feature.properties.confirmed_BLLS_Grtrthan5Mg} </h5>`);

         addMinesLayer(map)
  
      }
      }).addTo(map);

    });

  });

}

function buildMinesMap(){   
  /// Create our initial map object
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


 // var link2 = "https://opendata.arcgis.com/datasets/c2e5681518cb4ec6bbfde185dcafdeb8_0.geojson";

  d3.json("/airquality").then(function(data) {
      // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
      style: function(feature) {
        return {
          "color": "#131485",
          "weight": 5,
          "opacity": 0.9
        }
      },
      // Put onEachFeature within the options object, not as 3rd argument.
      onEachFeature: function(feature, layer) {
        const airLead = feature.properties.LEAD_IN_AIR ? feature.properties.LEAD_IN_AIR.LEAD : 'Not Tested'
        layer.bindPopup("<h5>"+feature.properties.COUNTYNAME + "</h5> <hr> <h6>" + feature.properties.LEAD);
      }
    }).addTo(myMap)});
  
  }
  // +  " </h6> <hr> <h6> Lead In Air - "+feature.properties.LEAD_IN_AIR +"</h6>"

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/years").then((yearData) => {
      console.log("Inside init() d3.json", yearData)
      yearData.forEach((year)=>{
        selector
        .append("option")
        .text(year)
        .property("value", year);
      });

    // Use the first year from the list to build the initial graph
    const firstYear = yearData[0];
    console.log(firstYear);
    buildBarGraph(firstYear);
    LatestYear=2017;
    buildGeoJsonMap(LatestYear);
    buildMinesMap();
  });
}

function optionChanged(year) {
  // Fetch new data each time a new year is selected
  console.log("New year selected");
  buildBarGraph(year);
}

// Initialize the dashboard
init();

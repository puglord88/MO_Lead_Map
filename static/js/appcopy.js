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
  return feature.properties['lead_level'] > 5 ? 'lightred' : 'lightblue';
}

function getStyle(feature) {
	return {
		fillColor: getColor(feature),
		weight: 1,
		opacity: 1,
		color: 'white',
		//dashArray: '3',
		fillOpacity: 0.7
	};
}


var geoJsonData = null;

//function to get lead data
function getLeadData(year){
  var url= `/counties/${year}`;

  d3.json(url).then(function(data){
    console.log("data",data)
    console.log("All counties", data.map(countyData=>countyData.county_name))

  });
}


const keyBy = (array, key) => (array || []).reduce((r, x) => ({ ...r, [key ? x[key] : x]: x }), {});


//
  function buildGeoJsonMap(year){   
  //fetch('http://localhost:8080/posts', { mode: 'no-cors' });
    // Creating map object
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
        
        // console.log("All counties", data.map(countyData=>countyData.county_name))

        L.geoJson(geoJsonData, 
          {style: getStyle,
          onEachFeature: function(feature, layer) {
          // Set mouse events to change map styling
          layer.on({
            // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
            mouseover: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0.9
              });
            },
            // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
            mouseout: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0.7
              });
            },
            // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
            // click: function(event) {
            //   map.fitBounds(event.target.getBounds());
            // }
          });
          // Giving each feature a pop-up with information pertinent to it
          layer.bindPopup("<h1>" + feature.properties.NAME_UCASE + "</h1> <hr> <h2>" + feature.properties["confimd_BLLS_5-10mg"] + "</h2>");
    
        }
        }).addTo(map);
  
      });

 

    });

 }

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
      // getLeadData(firstYear);


    

     // var link = "https://opendata.arcgis.com/datasets/8b9e118f12fd41228aceec02b5e71888_0.geojson"
      //"https://opendata.arcgis.com/datasets/7bdfd2d7880c4a52b765cc1e7192cee8_1.geojsonhttp://data.beta.nyc//dataset/0ff93d2d-90ba-457c-9f7e-39e47bf2ac5f/resource/" +
    //"35dd04fb-81b3-479b-a074-a27a37888ce7/download/d085e2f8d0b54d4590b1e7d1f35594c1pediacitiesnycneighborhoods.geojson";
      buildGeoJsonMap(firstYear);
    });
  }
  
  function optionChanged(year) {
    // Fetch new data each time a new year is selected
    console.log("New year selected");
   buildBarGraph(year);
  }
  
  // Initialize the dashboard
  init();
  
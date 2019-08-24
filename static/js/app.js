
function buildBarGraph(year){
    console.log("BuildGraph function triggerred")

      var url=`/years/${year}`;
      console.log("url is"+url);
      
      d3.json(url).then(function(response){
        var trace = {
          type:"Bar",
          name:"Blood Lead level Comaparison of Missouri Vs other states",
          x:response.states,
          y:response.bloodleadlevel,

        };
         


      })


}




  //******************************************************
  
  //  d3.json('/barGraph'), function(error,data) {
  //         if(error) throw error;
  //         console.log("I am in bar graph d3");
  //         data.forEach(function(d){
  //            d.prct_chldrn_confirbill_5ugdl =+ d.prct_chldrn_confirbill_5ugdl;
  //         });

  //      }

  // var xBandScale = d3.scaleBand()
  //   .domain(data.map(d => d.state ))
  //   .range([0, chartWidth])
  //   .padding(0.1);

  // Create a linear scale for the vertical axis.
  // var yLinearScale = d3.scaleLinear()
  //   .domain([0, d3.max(data, d => d.prct_chldrn_confirbill_5ugdl)])
  //   .range([chartHeight, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  // var bottomAxis = d3.axisBottom(xBandScale);
  // var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  // chartGroup.append("g")
  //   .call(leftAxis);

  // chartGroup.append("g")
  //   .attr("transform", `translate(0, ${chartHeight})`)
  //   .call(bottomAxis);

  // Create one SVG rectangle per piece of tvData
  // Use the linear and band scales to position each rectangle within the chart
  // chartGroup.selectAll(".bar")
  //   .data(data)
  //   .enter()
  //   .append("rect")
  //   .attr("class", "bar")
  //   .attr("x", d => xBandScale(d.state))
  //   .attr("y", d => yLinearScale(d.prct_chldrn_confirbill_5ugdl))
  //   .attr("width", xBandScale.bandwidth())
  //   .attr("height", d => chartHeight - yLinearScale(d.prct_chldrn_confirbill_5ugdl));
  
  function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("/years").then((yearData) => {
        console.log("Inside init() d3.json")
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
    });
  }
  
  function optionChanged(year) {
    // Fetch new data each time a new year is selected
    console.log("New year selected");
   buildBarGraph(year);
  }
  
  // Initialize the dashboard
  init();
  
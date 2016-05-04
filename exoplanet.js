var cumulative = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "./cumulative.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})(); 

var exoplanet = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "./exoplanet.json",
        'dataType': "json",
        'success': function (data) {
          json = data;
        }
        
    });
    return json;
})(); 



for (i = 0; i<exoplanet.length;i++)
{
   var singleItem = exoplanet[i];
   singleItem.kepler_name = exoplanet[i].pl_hostname + " " + exoplanet[i].pl_letter; // example
}

var dataset = cumulative;// Copying Source2 to a new Object

for (j = 0; j<cumulative.length;j++)
{
   var cumulativeKeplerName = cumulative[j].kepler_name;
   var cumulativeRade = cumulative[j].koi_prad;
   var mergeItem = dataset[j];

    for (i = 0; i<exoplanet.length;i++)
    {
    	mergeItem.habFlag = 1;
        mergeItem.radeFlag = 1;

       if(exoplanet[i].pl_rade != null)
          {
            if(exoplanet[i].kepler_name == cumulativeKeplerName)
            {
              mergeItem.rade = exoplanet[i].pl_rade;
              break
            }
          }
          else
          {
            mergeItem.rade = cumulativeRade;
          }
    }
}


//Width and height
			var w = 1200;
			var h = 700;
			var clicked = 0;


			var svg = d3.select("div#container")
						.append("svg")
						.attr("preserveAspectRatio", "xMinYMin meet")
						.attr("viewBox", "0 0 " + w + " " + h)
						.classed("svg-content", true);

			var div = d3.select("body").append("div")	
					    .attr("class", "tooltip")				
					    .style("opacity", 0);






			var xScale = d3.scale.linear()
							.domain([d3.min(dataset, function(d) { return +d.koi_fwm_sdec; }), d3.max(dataset, function(d) { return +d.koi_fwm_sdec; })])
							.range([50, w-200]);


			var yScale = d3.scale.linear()
							.domain([d3.min(dataset, function(d) { return +d.koi_fwm_sra; }), d3.max(dataset, function(d) { return +d.koi_fwm_sra; })])
							.range([50, h-100]);


			var colorScale = d3.scale.quantize()
							.domain([d3.min(dataset, function(d) { return +d.koi_teq; }), d3.max(dataset, function(d) { return +d.koi_teq; })])
							.range(["#3399CC", "#669999","#CCCCCC","#CC9999","#CC6666"])
							;

			var rScale = d3.scale.linear()
								 .domain([0, d3.max(dataset, function(d) { return +d.rade; })])
								 .range([3, 15]);


			var formatAsNumber = d3.format(",");


			console.log(d3.max(dataset, function(d) { return +d.koi_fwm_sdec; }));


			svg.selectAll("circle")
			   .data(dataset)
			   .enter()
			   .append("circle")
			   .attr("cx", function(d) {
			   		return xScale(+d.koi_fwm_sdec);
			   })
			   .attr("cy", function(d) {
			   		return yScale(+d.koi_fwm_sra);
			   })
			   .attr("r", function(d) {
			   		return rScale(+d.rade);
			   })
		   		.attr("fill", function(d) {
				return colorScale(d.koi_teq);
		   		})
		   		.on("mouseover", function(d) {

					div.style("opacity", 1);	

					div.text("Kepler Object Details")
						.style("left", (d3.event.pageX) + "px")		
						.style("top", (d3.event.pageY - 28) + "px");

					div.append("p")
						.text("ID: " + d.kepler_name);

					div.append("p")
						.text("Temperature: " + formatAsNumber(d.koi_teq));

			   })
			   .on("mouseout", function() {
			   
					div.style("opacity", 0);
					
			   })

		   		;




			function updateSlider(slideAmount) 
				{
					
					var circles =svg.selectAll("circle")
    								.data(dataset);
    	

					circles.transition()
							.duration(500)
							.style("opacity", function(d) {
								if(rScale(+d.rade) <= +slideAmount && d.habFlag == 1)
			    					{
			    						d.radeFlag = 1
			    						return 1;
			    						
			    					}
			    					else
			    					{
			    						d.radeFlag = 0
			    						return 0;
			    						
			    					}
    							})
							.style("pointer-events", function(d) {
								if(rScale(+d.rade) <= +slideAmount && d.habFlag == 1)
			    					{
			    						return "all"
			    					}
			    					else
			    					{
			    						return "none"
			    					}
    							})


					
				};

			 function updateData() {
			 	

					var circles = svg.selectAll("circle")
    				.data(dataset);
    				

	    				if (clicked == 0)
	    				{
	    					circles.transition()
								.duration(500)
								.style("opacity", function(d) {
									if(d.koi_teq>=180 && d.koi_teq <=310  && d.radeFlag == 1)
				    					{
				    						d.habFlag = 1
				    						return 1
				    					}
				    					else
				    					{
				    						d.habFlag = 0
				    						return 0
				    					}
	    							})
								.style("pointer-events", function(d) {
									if(d.koi_teq>=180 && d.koi_teq <=310 && d.radeFlag == 1)
				    					{
				    						return "all"
				    					}
				    					else
				    					{
				    						return "none"
				    					}
	    							})
								clicked = 1;

							  d3.selectAll(".button2")
								.style("background-color","#3399CC")
								.style("color","white");
	    				}
	    				else
	    				{

	    					circles.transition()
								.duration(500)
								.attr("circle",
									function(d) { 
									d.habFlag = 1;
									d.radeFlag = 1;
								})
								.style("opacity", 1)
								.style("pointer-events", "all");

								clicked = 0;

								d3.selectAll(".button2")
								.style("background-color","white")
								.style("color","black");
	    				}
				 	
  					};
				

			function showAllData() {

				
				var circles = svg.selectAll("circle")
    				.data(dataset);


			   		//Update…
					circles.transition()
							.duration(500)
							.attr("circle",
								function(d) { 
								d.habFlag = 1;
								d.radeFlag = 1;
							})
							.style("opacity", 1)
							.style("pointer-events", "all");

					
  					};
			 
				
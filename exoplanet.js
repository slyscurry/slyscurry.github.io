//Width and height
			var w = 1000;
			var h = 500;

			// var low_temp = -1000000000;
			// var high_temp = 1000000000;


			var planets_json = "http://www.asterank.com/api/kepler?query={}&limit=0";

			//Create SVG element
			var svg = d3.select("body")
						.append("svg")
						.attr("width", w)
						.attr("height", h);




			d3.json(planets_json, function(error, dataset) {
			if (error) return console.warn(error);

			var xScale = d3.scale.linear()
							.domain([d3.min(dataset, function(d) { return +d.DEC; }), d3.max(dataset, function(d) { return +d.DEC; })])
							.range([50, w-200]);

			var yScale = d3.scale.linear()
							.domain([d3.min(dataset, function(d) { return +d.RA; }), d3.max(dataset, function(d) { return +d.RA; })])
							.range([50, h-100]);


			var colorScale = d3.scale.quantize()
							.domain([d3.min(dataset, function(d) { return +d.TPLANET; }), d3.max(dataset, function(d) { return +d.TPLANET; })])
							.range(["#3399CC", "#669999", "#CCCCCC","#CC9999","#CC6666"])
							;

			var rScale = d3.scale.linear()
								 .domain([0, d3.max(dataset, function(d) { return +d.RPLANET; })])
								 .range([2, 20]);


			var formatAsNumber = d3.format(",");

		

			console.log(d3.max(dataset, function(d) { return +d.DEC; }));


			svg.selectAll("circle")
			   .data(dataset)
			   .enter()
			   .append("circle")
			   .attr("cx", function(d) {
			   		return xScale(+d.DEC);
			   })
			   .attr("cy", function(d) {
			   		return yScale(+d.RA);
			   })
			   .attr("r", function(d) {
			   		return rScale(+d.RPLANET);
			   })
		   		.attr("fill", function(d) {
				return colorScale(d.TPLANET);
		   		})
		   		.on("mouseover", function(d) {

					//Update the tooltip position and value
					d3.select("#tooltip")
						.style("left", xScale(+d.DEC)+10 + "px")
						.style("top", yScale(+d.RA)+10 + "px")						
						.select("#value")
						.text("ID: " + d.KOI);

					d3.select("#tooltip")
						.select("#temperature")
						.text("Temperature: " + formatAsNumber(d.TPLANET));
			   
					//Show the tooltip
					d3.select("#tooltip").classed("hidden", false);

			   })
			   .on("mouseout", function() {
			   
					//Hide the tooltip
					d3.select("#tooltip").classed("hidden", true);
					
			   })

		   		;



			   
		});


			 function updateData() {
			 	d3.select("#tooltip").classed("hidden", true);

				d3.json("http://www.asterank.com/api/kepler?query={%22TPLANET%22:{%22$lt%22:374,%22$gt%22:182}}&limit=0", function(error, dataset) {
					if (error) return console.warn(error);


					var circles = svg.selectAll("circle")
    				.data(dataset, function(d) { return d.KOI; });

					//Exit…
					circles.exit()
						.transition()
						.duration(1000)
						.style("opacity", 0)
						.style("pointer-events", "none");
						// .remove();

				       console.log(dataset.length);



  					});
  					};
				

			function showAllData() {

				d3.json("http://www.asterank.com/api/kepler?query={}&limit=0", function(error, dataset) {
				if (error) return console.warn(error);
		

				console.log(d3.max(dataset, function(d) { return +d.DEC; }));


				//Select…
				var circles = svg.selectAll("circle")
	    				.data(dataset, function(d) { return d.KOI; });


			   		//Update…
					circles.transition()
							.duration(1000)
							.style("opacity", 1)
							.style("pointer-events", "all");



  					});
  					};
			 
				
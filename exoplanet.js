//Width and height
			var w = 1200;
			var h = 700;

			// var low_temp = -1000000000;
			// var high_temp = 1000000000;


			// var planets_json = "http://www.asterank.com/api/kepler?query={}&limit=0";

			var planets_json = "http://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&select=koi_fwm_sdec,koi_fwm_sra,koi_teq,koi_prad&where=koi_disposition%20like%20%27CONFIRMED%27%20&format=json";
			var habitable_planets = "habitable.csv";
			//Create SVG element
			// var svg = d3.select("body")
			// 			.append("svg")
			// 			.attr("width", w)
			// 			.attr("height", h)
			// 			.attr("class","content");

			var svg = d3.select("div#container")
						.append("svg")
						.attr("preserveAspectRatio", "xMinYMin meet")
						.attr("viewBox", "0 0 " + w + " " + h)
						.classed("svg-content", true);

			var div = d3.select("body").append("div")	
					    .attr("class", "tooltip")				
					    .style("opacity", 0);




			d3.json(planets_json, function(error, dataset) {
			if (error) return console.warn(error);
			console.log(dataset);

			var xScale = d3.scale.linear()
							.domain([d3.min(dataset, function(d) { return +d.koi_fwm_sdec; }), d3.max(dataset, function(d) { return +d.koi_fwm_sdec; })])
							.range([50, w-200]);


			var yScale = d3.scale.linear()
							.domain([d3.min(dataset, function(d) { return +d.koi_fwm_sra; }), d3.max(dataset, function(d) { return +d.koi_fwm_sra; })])
							.range([50, h-100]);


			var colorScale = d3.scale.quantize()
							.domain([d3.min(dataset, function(d) { return +d.koi_teq; }), d3.max(dataset, function(d) { return +d.koi_teq; })])
							.range(["#3399CC", "#669999", "#CCCCCC","#CC9999","#CC6666"])
							;

			var rScale = d3.scale.linear()
								 .domain([0, d3.max(dataset, function(d) { return +d.koi_prad; })])
								 .range([2, 20]);


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
			   		return rScale(+d.koi_prad);
			   })
		   		.attr("fill", function(d) {
				return colorScale(d.koi_teq);
		   		})
		   		.on("mouseover", function(d) {

					//Update the tooltip position and value
					// d3.select("#tooltip")
					// 	.style("left", xScale(+d.koi_fwm_sdec)+10 + "px")
					// 	.style("top", yScale(+d.RA)+10 + "px")						
					// 	.select("#value")
					// 	.text("ID: " + d.KOI);

					// d3.select("#tooltip")
					// 	.select("#temperature")
					// 	.text("Temperature: " + formatAsNumber(d.TPLANET));

					div
						// .transition()		
						// .duration(200)		
						.style("opacity", 1);	

					div.text("Kepler Object Details")
						// .style("font-weight", "bold")
						.style("left", (d3.event.pageX) + "px")		
						.style("top", (d3.event.pageY - 28) + "px");

					div.append("p")
						.text("ID: " + d.KOI);

					div.append("p")
						.text("Temperature: " + formatAsNumber(d.koi_teq));	


			   
					// //Show the tooltip
					// d3.select("#tooltip").classed("hidden", false);

			   })
			   .on("mouseout", function() {
			   
					//Hide the tooltip
					// d3.select("#tooltip").classed("hidden", true);

					div
						// .transition()		
		    //             .duration(500)		
		                .style("opacity", 0);
					
			   })

		   		;



			   
		});


			 function updateData() {
			 	d3.select("#tooltip").classed("hidden", true);

				d3.csv(habitable_planets, function(error, dataset) {
					if (error) return console.warn(error);


					var circles = svg.selectAll("circle")
    				.data(dataset, function(d) { return d.KOI; });

					//Exit…
					circles.exit()
						.transition()
						.duration(100)
						.style("opacity", 0)
						.style("pointer-events", "none");
						// .remove();

				       console.log(dataset.length);



  					});
  					};
				

			function showAllData() {

				d3.csv(planets_csv, function(error, dataset) {
				if (error) return console.warn(error);
		

				console.log(d3.max(dataset, function(d) { return +d.koi_fwm_sdec; }));


				//Select…
				var circles = svg.selectAll("circle")
	    				.data(dataset, function(d) { return d.KOI; });


			   		//Update…
					circles.transition()
							.duration(100)
							.style("opacity", 1)
							.style("pointer-events", "all");



  					});
  					};
			 
				
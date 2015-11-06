//code for each plugin
loadModule("scatterplot", function () {
	var plot = undefined;
	var info = 0;
	var size = 8;
	var diff = 2;
	// mandatory
	this.show = function (args) {
		deleteAllChildren(args.canvas);

		if (plot != undefined) {
			this.hide();
		}

		info = args;
		data = args.data;

		var xAxisMarker = args.selection[0];
		var yAxisMarker = args.selection[1];
		var councilName = args.selection[2];

		var margin = {top: 20, right: 60, bottom: 60, left: 60},
			width = args.canvas.clientWidth - margin.top - margin.bottom,
			height = args.canvas.clientHeight - margin.right - margin.left;

		var x = d3.scale.linear()
			.range([0, width]);

		var y = d3.scale.linear()
			.range([height, 0]);

		var color = d3.scale.category10();

		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left");



		data.forEach(function(d) {
			d[xAxisMarker] = parseFloat(d[xAxisMarker]);
			d[yAxisMarker] = parseFloat(d[yAxisMarker]);

		});

		var tip = d3.tip()
			.attr('class', 'd3-tip')
			.offset([-10, 0])
			.html(function(d) {
				return d.Council + "<br /><strong>" + 
				yAxisMarker + ":</strong> <span style='color:red'>" + d[yAxisMarker] + "<br />" + 
				"<span style='color:white'>" +
				xAxisMarker + ":</strong> </span> <span style='color:red'>" + d[xAxisMarker] + "</span>"
			});

		var svg = d3.select(args.canvas).append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		svg.call(tip);

		x.domain(d3.extent(data, function (d) {
			return d[xAxisMarker];
		})).nice();
		y.domain(d3.extent(data, function (d) {
			return d[yAxisMarker];
		})).nice();

		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.append("text")
			.attr("class", "label")
			.attr("x", width)
			.attr("y", -6)
			.style("text-anchor", "end")
			.text(xAxisMarker);

		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("class", "label")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text(yAxisMarker);

		svg.selectAll(".dot")
			.data(data)
			.enter().append("circle")
			.attr("class", "dot")
			.attr("r", size)
			.attr("cx", function (d) {
				return x(d[xAxisMarker]);
			})
			.attr("cy", function (d) {
				return y(d[yAxisMarker]);
			})
			.style("fill", function () {
				return color("council");
			})
			.on("mouseover", function(d) {
				tip.show(d);
				console.log(d);
				d3.select(this).attr("r", size+diff).style("fill", "orangered");
			})
			.on("mouseout", function(d) {
				tip.hide();
				d3.select(this).attr("r", size).style("fill", "blue");
			});


		var legend = svg.selectAll(".legend")
			.data(color.domain())
			.enter().append("g")
			.attr("class", "legend")
			.attr("transform", function (d, i) {
				return "translate(0," + i * 20 + ")";
			});

		legend.append("rect")
			.attr("x", width - 18)
			.attr("width", 18)
			.attr("height", 18)
			.style("fill", color);

		legend.append("text")
			.attr("x", width - 24)
			.attr("y", 9)
			.attr("dy", ".35em")
			.style("text-anchor", "end")
			.text(function (d) {
				return d;
			});
	};


	this.hide = function () {
		if (plot) {
			info.canvas.removeChild(plot);
		}
	};


	// mandatory - 2 fields
	this.getFields = function () {
		return [
			{"name": "X axis", "type": "float"},
			{"name": "Y axis", "type": "float"},
			{"name": "Council", "isImplicit": true}
		];
	}
});

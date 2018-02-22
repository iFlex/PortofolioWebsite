//code for each plugin
loadModule("barchart", function () {
	var plot = undefined;
	var info = 0;

	// mandatory
	this.show = function (args) {
		deleteAllChildren(args.canvas);

		if (plot != undefined) {
			this.hide();
		}

		info = args;
		data = args.data;

		var margin = {top: 60, right: 60, bottom: 120, left: 60},
			width = args.canvas.clientWidth - margin.top - margin.bottom,
			height = args.canvas.clientHeight - margin.right - margin.left;

		var xAxisMarker = args.selection[1];
		var yAxisMarker = args.selection[0];

		// var formatPercent = d3.format(".0%");

		var x = d3.scale.ordinal()
			.domain(d3.range(data.length)) //number of columns is a spreadsheet-like system
			.rangeRoundBands([0, width], .1, 1);

		var y = d3.scale.linear()
			.range([height, 0]);

		var labels = [];

		data.forEach(function (d) {
			labels.push(d[xAxisMarker]);
			d[yAxisMarker] = parseFloat(d[yAxisMarker]);
		});

		var xAxis = d3.svg.axis()
			.scale(x).tickValues(labels);

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left");
			//.tickFormat(formatPercent);

		var tip = d3.tip()
			.attr('class', 'd3-tip')
			.offset([-10, 0])
			.html(function(d) {
				return "<strong>" + yAxisMarker + ":</strong> <span style='color:red'>" + d[yAxisMarker] + "</span>";
			});

		var svg = d3.select(args.canvas).append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		svg.call(tip);

		x.domain(data.map(function (d) {
			return d[xAxisMarker];
		}));
		y.domain([0, d3.max(data, function (d) {
			return d[yAxisMarker];
		})]);

		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.selectAll("text")
				.style("text-anchor", "end")
				.attr("transform", function(d) {
					return "rotate(-45)"
				});

		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text(yAxisMarker);

		svg.selectAll(".bar")
			.data(data)
			.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function (d) {
				//console.log(d[xAxisMarker]+" am:"+xAxisMarker);
				return x(d[xAxisMarker]);
			})
			.attr("width", x.rangeBand())
			.attr("y", function (d) {
				return y(d[yAxisMarker]);
			})
			.attr("height", function (d) {
				return height - y(d[yAxisMarker]);
			})
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide);

	    d3.select("input").on("change", change);

		var sortTimeout = setTimeout(function () {
			d3.select("input").property("checked", true).each(change);
		}, 2000);

		function change() {
			clearTimeout(sortTimeout);

			// Copy-on-write since tweens are evaluated after a delay.
			var x0 = x.domain(data.sort(this.checked
						? function (a, b) {
						return b.frequency - a.frequency;
					}
						: function (a, b) {
						return d3.descending(parseFloat(a[yAxisMarker]), parseFloat(b[yAxisMarker]));
					})
					.map(function (d) {
						return d[xAxisMarker];
					}))
				.copy();

			var transition = svg.transition().duration(750),
				delay = function (d, i) {
					return i * 50;
				};

			transition.selectAll(".bar")
				.delay(delay)
				.attr("x", function (d) {
					return x0(d[xAxisMarker]);
				});

			transition.select(".x.axis")
				.call(xAxis)
				.selectAll("g")
				.selectAll("text")
				.style("text-anchor", "end")
				.delay(delay);
		}

		//uncomment to sort
		args.canvas.onclick = change;
	};


	this.hide = function () {
		if (plot) {
			info.canvas.removeChild(plot);
		}
	};


	// mandatory - 2 fields
	this.getFields = function () {
		return [
			{"name": "Select field of interest", "type": "float"},
			{"name": "Council", "isImplicit": true}
		];
	}
});
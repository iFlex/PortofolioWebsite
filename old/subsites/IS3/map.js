this.map = function(options){
	this.selection = {};
	var selectAll = true;
	var base = 0;
	var container = 0;
	var svg = 0;
	var geojson = 0;
	var selectedColor = "rgb(204, 255, 153)";
	var highlightColor = "rgb(204, 200, 153)"
	var unselectedColor = "rgb(255, 255, 255)";
	function loadCurrentSelection(){
		//TODO: delete this function, not needed anymore
	}
	function toggleSelect(e){
		if(selectAll)
		{
			svg.selectAll(".zone-area").style("fill", selectedColor);
			G_MapController.mapSelection = {};
			for (var i = 0; i < geojson.features.length; i++) {    
			for (j in geojson.features[i].properties.NAME) {
					G_MapController.mapSelection[geojson.features[i].properties.NAME] = true;
				}
			}
			console.log(debug(G_MapController.mapSelection));			
			e.target.innerHTML = "Deselect All";
		}
		else
		{
			svg.selectAll(".zone-area").style("fill", unselectedColor); 
			G_MapController.mapSelection = {};
			e.target.innerHTML = "Select All";
		}
		selectAll = !selectAll;
	}
	this.build = function(root){
		var hide = function(){
			options.deactivate();
			if( G_Chaining ){
				if( options.chaining != undefined && options.chaining.index != undefined && options.chaining.hooks != undefined)
					options.chaining.hooks[options.chaining.index]();
				else
					console.log("Error: Invalid chaining structure passed to map module:"+options.chaining);
			}
			else {
				if(G_Replot)
					G_Replot();
			}
				
		};
		var nav = makeHTML([{
			nav:{
				class:"navbar navbar-inverse",
				style:"margin-bottom:0px",
				role:"navigation",
				children:[{
					div:{
						class:"container-fluid",
						children:[{
							div:{
								class:"navbar-header",
								children:[{
									a:{
										class:"navbar-brand",
										href:"#",
										innerHTML:"Select where you want your data from"
									}
								}]
							}
						},{
							ul:{
								class:"nav navbar-nav navbar-right",
								children:[{
									li:{
										children:[{
											button:{
												onclick:toggleSelect,
												type:"submit",class:"btn btn-danger vertical_align buttonDist",innerHTML:"Select All"
											}
										},{
											button:{
												onclick:hide,
												type:"submit",class:"btn btn-danger vertical_align buttonDist",innerHTML:"Done"
											}
										}]
									}
								}]
							}
						}]
					}
				}]
			}
		}])

		container = makeHTML([{
			div:{
				class:"mapContainer",				
			}				
		}])
		
		nav['isObject'] = true;
		container['isObject'] = true;

		base = makeHTML([{
				div:{
					class:"selector",
					children:[
						nav,
						container
					]			
				}		
			}],0,'isObject');	
		root.appendChild(base);
		container.style.height = (base.clientHeight-70)+"px"
		renderMap();		
		this.hide();
	}
	this.show = function(){
		base.style.display = "block";
		loadCurrentSelection();
	}
	this.hide = function(){
		base.style.display = "none";
	}
	var renderMap = function(){

	var width = container.clientWidth,
	    height = container.clientHeight;
	
	var tip = d3.tip()
			.attr('class', 'd3-tip')
			.offset([-10, 0]);

	svg = d3.select(container).append("svg")
	    .attr("width", width)
	    .attr("height", height);
	svg.call(tip);
	var color = d3.scale.quantize()
        .range("#ffffff");

    // set projection = albers
    var projection = d3.geo.albers()
        .center([0, 57.0])
        .rotate([4, 0])
        .parallels([50, 60])
        .scale(6000)
        .translate([width / 2, height / 2]);

    // extract definition of path generator
    var path = d3.geo.path()
        .projection(projection);

    
    // use queue library to load data in parallel
    queue()
        .defer(d3.json, "support/data/bbc-scoel.json") // binds to 'spatial'
        //.defer(d3.json, "support/data/scogov-sds.json") // binds to 'dataset'    
        .await(ready);

    // define callback to prepare the visualisation when the data has finished loading
    function ready(error, spatial) {
    	// merge aggregate dataset into spatial dataset
        geojson = topojson.feature(spatial, spatial.objects.hzones);

	    // draw filled (choroplethed) polygons for the features (i.e. healthboards)
	    svg.selectAll(".zone-area")
	        .data(geojson.features)
	        .enter().append("path")
	        .attr("d", path)
	        .attr("class", "zone-area") 
	        .on("click", function(e){

				var selected;
		
		    	if(d3.select(this).style("fill") != selectedColor) //need to deselect
				{
					selected = true;
		    		d3.select(this).style("fill", selectedColor);
				}
		    	else //need to select
				{
		    		selected = false;
					d3.select(this).style("fill", unselectedColor);
				}

				if (!G_MapController.mapSelection)
					G_MapController.mapSelection = {};
				G_MapController.mapSelection[e.properties.NAME] = selected;

				//console.log((G_MapController.mapSelection));
		    })
		    .on('mouseover',function(e){
		    	var select = ['Yes votes (%)','No votes (%)'];
				var name = e.properties.NAME;
				var dictionary = {};
				dictionary[name] = true;
				var data = G_Data.getData(select, dictionary);
				var total = 0;
				var yes = 0;
				var no = 0;

				for (k in data) {
					yes += parseFloat(data[k][ select[0] ]);
					no += parseFloat(data[k][ select[1] ]);
					total++;
				}

				yes /= total;
				no /= total;

				tip.html(function (d) {
					return "<strong>" + name + "</strong><br><strong>Yes votes: </strong><span style='color:green'>" + yes.toPrecision(2) + "%</span><br>"
						+ "<strong>No votes: </strong><span style='color:red'>" + no.toPrecision(2) + "%</span>";
				});

				if (d3.select(this).style("fill") == unselectedColor)
					d3.select(this).style("fill", highlightColor);
				tip.show();
			})
		    .on('mouseout',function(e){
		    	tip.hide();
		    	if(d3.select(this).style("fill") !=  selectedColor)
		    		d3.select(this).style("fill", unselectedColor);
		    });
	}
}
}


//code for each plugin
loadModule("table",function(){
	var table  = 0;
	var info = 0;
	var ready = false;
	function init(){
		if(!ready){
			loadStyle("./plugins/table/style.css",function(){ready = true;});
		}
	}

	this.show = function(args){
		deleteAllChildren(args.canvas);
		info = args;
//		style = makeHTML([{style:{border: 10px solid black }}])
		table = makeHTML([{
			table:{
				class:"CSSTableGenerator "//, border:"10px solid black",font: "Arial"
			}
		}]);
		//Row 1 ( column titles)
		var row = makeHTML([{tr:{}}]);
		var k=0;
		while(k<args.selection.length){
		//for (i in args.selection)
			console.log(args.selection[k]);
			row.appendChild(makeHTML([{ td:{ innerHTML:args.selection[k] }}]));
		k++;
		}
		table.appendChild(row);
		//Data Rows

		var i=0;
		while( i < args.data.length ){
			var row = makeHTML([{tr:{}}]);
			for( k in args.data[i] )
			{
				row.appendChild(makeHTML([{ td:{innerHTML:args.data[i][k]}}]));
			}
			table.appendChild(row);
			i++;
		}
		//
		args.canvas.appendChild(table);
	};


	this.hide = function(){
		if(table)
			info.canvas.removeChild(table);
	};


	this.getFields = function(){
		return 0;
	};
	init();
});
this.dataHandler = function(){
	var data = {};
	var selection = [];
	this.isready = false;
	this.init = function(){
		$.getJSON( "support/data.json", function( d ) {
			data = d;
			this.isready = true;
		});
	}
	this.getKeys = function(type){
		
		keys = [];
		if( data.length > 0 )
			for( k in data[0] )
				if( (k == 'Council' && type != 'float') || k != 'Council' )
					keys.push(k);
		return keys;
	}
	this.getData = function(select,geo){
		var selected = [];
		var _s = select || selection;
		var _g = geo || G_MapController.mapSelection;
		var index = 0;
		for( i in data )
		{
			for( j in _s )
				if( _g && _g[data[i]['Council']] )
				{
					if( !selected[index] )
						selected[index] = {};
	
					selected[index][_s[j]] = data[i][_s[j]];
				}
			if(selected[index])
				index++;
		}
		return selected;
	}
	this.setSelection = function( index , value ){
		selection[index] = value;
	}
	this.resetSelection = function(){
		selection = [];
	}
	this.makeSelection = function( s ){
		selection = s;
	}
	this.getSelection = function(){
		return selection;
	}
}
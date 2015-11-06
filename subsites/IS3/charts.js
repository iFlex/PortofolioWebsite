//Requires data object to be passed when instantiated
//data: deactivate function and modules object 
this.charts = function(data){
	var base = 0;
	var helpText = 0;
	var buildRecord = function(info)
        {
		makeHTML(
		[{
			div:{

				class:"visInnerDiv",
				onclick:function(){
					if(info && info.module && modules[info.module] && modules[info.module].getFields)
					{
						var fields = modules[info.module].getFields();
						
						if(data.deactivate)
								data.deactivate();

						if(data.forward)
							data.forward({module:modules[info.module],deactivate:data.deactivate,labels:fields});
					}
					else
					{
						console.log("Modules:"+debug(modules));
						if(confirm(info.name+" was not loaded properly. Would you like to try and reload it?"))
							loadPlotter(info.module);
					}
				},
				children:[{
					img:{
						class:"visIcon",
						src:info.image
					}				
				},{
					p:{
						innerHTML:info.name,
						class:"visText"
					}				
				}]			
			}		
		}],info.root);
		console.log("root:"+info.root);
	}
	this.build = function(root)
        {
		base = makeHTML([{
			div:{
				class:"visDiv",

			}		
		}]);	
		root.appendChild(base);
		
		if(data.modules)
			for(k in data.modules)
			{
				data.modules[k].root = base;
				buildRecord(data.modules[k]);
				//also load the modules
				loadPlotter(data.modules[k].module);
			}		
		base.style.display = "none";
	}
	
	this.show = function () {
		base.style.display = "block";
	}

	this.hide = function () {
		base.style.display = "none";
	}
}


this.modules = {}

function loadModule(name,code){
	if(modules[name].clean)
	{
		document.body.removeChild(modules[name].clean);
		delete modules[name].clean;
		console.log("Loaded module:"+name);
	}
	modules[name] = new code();
}

function loadPlotter(name){
	try
	{
		var s = document.createElement("script");
		s.src = "plugins/"+name+"/main.js";
		if(!modules[name])
			modules[name] = {}
		modules[name].clean = s;
		document.body.appendChild(s);
		console.log("Asynch load module:"+name);
	}
	catch(e){
		console.log("Failed to load moudle:"+name+" error:"+e);
	}
}
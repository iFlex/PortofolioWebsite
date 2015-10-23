this.factory = this.factory || {}
factory.setup = function(){
	var c = factory.newContainer({},"header",factory.root);
	c.loadApp("header");
	c.interactive(false);
	//c.addEventListener("")
	//load projects
	var projects = [{
		title:"NGPS",
		year:"2014"
	},{
		title:"IS3 Visualisation Tool",
		year:"2014"
	},{
		title:"Team Project Impulse Counter",
		year:"2014"
	},{
		title:"WoL",
		year:"2013"
	},{
		title:"Astero Jump Lua Game",
		year:"2013"
	},{
		title:"CoClip - File Sharing C++ application",
		year:"2012"
	},{
		title:"Angry Hen - iOS game",
		year:"2011"
	},]
	var padding = 5;
	var y = c.getHeight()+padding;
	//show projects
	for( i in projects )
	{
		var p = factory.newContainer({x:0,y:y},"project",factory.root);
		p.loadApp("preview_project",projects[i]);
		y += p.getHeight()+padding;
	}
	factory.root.setCameraRange(undefined,y);
}
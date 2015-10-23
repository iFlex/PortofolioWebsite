/*
*	NGPS Edit Interface
*	Author: Milorad Liviu Felix
*	28 Jun 2014  18:45 GMT
*	Requires:
*		factory.base - attach potin for interface which is overlayed on the main camera
*		factory.root - main camera
*/
//TODO: Fix weird trigger ( with the start interface listener ) evend firing on factory.base even though it's not listened for.
loadAppCode("header",function(data)
{
	var parent = data['parent'];
	this.config = {interface:"none"};
	this.init = function(){
		//css
		console.log("Path:"+utils.debug(data));

   		utils.makeHTML(
   		[{
   			img:{
   				//src:"scripts/plugins/header/uni.jpeg",
   				style:"top:0;left:0;position:absolute;width:100%;height:auto"
   			}
   		},{
			h2:{
				innerHTML:"Milorad Liviu Felix",
			}
		},{
			h5:{
				innerHTML:"Computer Science Student @ University of Glasgow"
			}
		}],parent.DOMreference);
	}
});
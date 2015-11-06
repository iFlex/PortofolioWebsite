this.modalMessage = function(root,hide){
	var board = 0;
	function hide(){
		root.removeChild(board);
		board  = 0;
		if(hide)
			hide.style.display = "block";
	}
	this.show = function(message){
		var _hide = hide;
		
		if(board)
			hide();

		board = makeHTML([{
			div:{
				onclick:_hide,
				style:"position:fixed;top:0px;left:0px;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:150",
				children:[{
					p:{
						style:"color:white;vertical-align:middle;margin-top:200px;text-align:center;font-size:25px",
						innerHTML:message
					}
				}]
			}
		}]);
		root.appendChild(board);
		
		if(hide)
			hide.style.display = "none";
	}
}
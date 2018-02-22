makeHTML = function(markup,parent,flagSayingIsObject)
{
	var child = 0;
	for( i in markup )
	{
		if(flagSayingIsObject && markup[i][flagSayingIsObject] == true) //this is an object and needs to be added directly to the tree
			child = markup[i];
		else
		{
			var type = Object.keys(markup[i])[0];
			child = document.createElement(type);
			keys = markup[i][type];
		
			for( j in keys)
			{
				if(j != "children")
				{
					if(j.indexOf("data-") > -1)
					{
						var attrib = j.slice(5, j.length);
						child.dataset[attrib] = markup[i][type][j]
						continue;
					}
					if(j == "class")
					{
						child.className = markup[i][type][j];
						continue;
					}
					//style
					if(j == "style" || j == "cssText")
					{
						child.style.cssText = markup[i][type][j];
						continue;
					}
					//normal properties
					child[ j ] = markup[i][type][j];
				}
				else
					makeHTML(markup[i][type][j],child,flagSayingIsObject); 
			}
		}
		if(!parent)
			return child;
		
		parent.appendChild(child);
	}
}
function deleteAllChildren(parent){
	while (parent.firstChild) {
    	parent.removeChild(parent.firstChild);
	}
}
loadStyle = function(path,onload)
{
	var s = document.createElement('link');
	s.rel = "stylesheet";
	s.href = path;
	document.body.appendChild(s);
	if(onload)
		s.onload = onload;
}
debug = function(elem,newline,verbose)
{
	if(!newline)
		newline = "\n";

	if(typeof(elem) == "string")
		return "";
	
	var str = "{"+newline;
	if(typeof(elem) == "object" && elem.hasOwnProperty('UID'))
		str+= " NGPS Container #"+elem.UID+newline+"}";
	else
	{
		for( k in elem )
		{	
			str += k + ":";
			if(typeof(elem[k]) != "function" )
			{
				str += elem[k]
				if(verbose)
					str += utils.debug(elem[k],verbose)+" ";
				else
				{	
					if(elem[k] && elem[k].hasOwnProperty("UID"))
						str += "("+elem[k].UID+")";
				}
				str += newline;
			}
			//else
			//	str += utils.debug(elem[k])+" ";
		}
	}
	str += newline+"}"
	return str;
}
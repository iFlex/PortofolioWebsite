//MLF: Standard for passing field requirements [ { name:"Column name",*type:"int/float/string",*inImplicit:"true/false"} ]
//      * fields are optional
//Raymond's code
this.fields = function(){
    var _labels = null;
    var _data = {}
    var plot_mode = 'DD';
    this.init = function(){
        this.hide();
    }
    
    function onPlotterEngaged(){
        G_Chaining = 0;
        //show a loader or something
    }

    function selectionDone() {
        var index = 0;
        G_Data.resetSelection();
        if (plot_mode == 'DD' && _labels != null) {
            _labels.forEach(function(label) {
                var domElem = document.getElementById(label.name);
                if(domElem)
                {
                    var value = domElem.value;//$('#' + label.name).val();//$('#' + label.name + ' option:selected').text();
                    G_Data.setSelection(index,value);
                }
                else if(label.isImplicit)
                    G_Data.setSelection(index,label.name);
                index++;
            });
            console.log(G_Data.getSelection());
        }
        else if( plot_mode == 'FR' ){
            var keys = G_Data.getKeys();

            keys.forEach(function(key){
                var value = document.getElementById(key).checked;//$('#' + label.name).val();//$('#' + label.name + ' option:selected').text();
                if(value)
                {
                    G_Data.setSelection(index,key);
                    index++;
                }
            })
        }
        if(index > 0 && _data.module && _data.module.show){
            G_Replot = function(){
                _data.module.show({canvas:G_CurrentVis,selection:G_Data.getSelection(),data:G_Data.getData()});
            }
            G_Replot();
            //store in global scope
            if(G_CurrentVis)
                G_CurrentVis.selection = G_Data.getSelection();
            //
            if(_data.deactivate)
                _data.deactivate();

            onPlotterEngaged();
        }
    }

    var showDropdown = function(){
        var html = "<div><h2 class='title'>Select what fields you are interested in plotting</h2><table class='fieldTable'>";
        var index = 0;
        var name = 0;
        console.log("Preloaded selections:"+G_CurrentVis.selection)
        _labels.forEach(function(label) {
            name = 0;
            if(G_CurrentVis.selection)
                name = G_CurrentVis.selection[index];
            console.log("Preloading:"+name);
            if(!label.isImplicit)
            {
                html += "<tr><td><p class='field'>"
                    + label.name
                + "</p></td><td>"
                    + generateAxisOptions(label.name,label.type,name)
                + "</td></tr>";
            }
            index++;
        });
        return html;
    }

    var showFieldRange = function(){
        var html = "<div><h2 class='title'>Select what fields you are interested in plotting</h2>" +
			"<button onClick='selectAll();' id='select_all' class='btn'>Select all</button><br />" +
			"<table class='fieldTable'>";
        G_Data.getKeys().forEach(function(label) {
            var ticked = false;
            var disabled = false;

			if (G_CurrentVis.selection) {
				for (i in G_CurrentVis.selection) {
					if (label == G_CurrentVis.selection[i] || label == "Council") {
                        ticked = true;

                        break;
                    }
                }
			}
            if (label=="Council") {
				ticked = true;
				disabled = true;
			}
            html += "<tr><td><input type='checkbox' class='field " + (!disabled ? "selection-checkbox" : "") + "' id='" + label + "'" +
			" " + ((ticked) ? " checked" : "") + ((disabled) ? " disabled" : "") + ">" + label + "</td></tr>";

        });
        return html;
    }

    this.show = function(data) {
        _data = data;
        _labels = data.labels;
        var html = "";
        if(_labels == 0)
        {
            html += showFieldRange();
            plot_mode = 'FR';
        }
        else
        {
            html += showDropdown();
            plot_mode = 'DD';
        }

        html += "<tr><td colspan='2'><button id='plotButton' class='btn btn-danger plotButton'>Plot!</button></td></tr>";
        html += "</table></div>";
        $('#selectionContainer').html(html);
        $('#selectionContainer').show();
        $('#selectionContainer').css('overflow','scroll');
        document.getElementById('plotButton').onclick = selectionDone;
    }

    function generateAxisOptions(labelName,type,preset,hidden) {
        optionValues = G_Data.getKeys(type);
        var xAxisOptions = "<select class='fieldDropDn' id='" + labelName + "'>";
        optionValues.forEach(function(option) {

            xAxisOptions += "<option value='" + option +"'"+((preset==option)?"selected='selected'":"")+"> " + option + " </option>";
        });
        xAxisOptions += "</select>";
        return xAxisOptions;
    }

    this.hide = function(){
         $('#selectionContainer').hide();
    }
}

function selectAll() {
	var button = $('#select_all');
	if (button.text() == "Select all") {
		button.text("Deselect all");
		$('.selection-checkbox').each(function() { //loop through each checkbox
			this.checked = true;  //select all checkboxes with class "checkbox1"
		});
	} else {
		button.text("Select all");
		$('.selection-checkbox').each(function() { //loop through each checkbox
			this.checked = false; //deselect all checkboxes with class "checkbox1"
		});
	}

}
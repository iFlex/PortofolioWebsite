var objects = {
"_1":{year:2015},
"_2":{year:2015,skills:"JavaScript, HTML, CSS",cover:"res/ngps.png"},
"_3":{year:2015,skills:"Swift, NodeJS, JavaScript"},
"_4":{year:2014,skills:"Java, Android SDK"},
"_5":{year:2013,skills:"Lua Script, Corona SDK",cover:"res/asterojmp.png"},
"_6":{year:2013,skills:"C/C++"},
"lctb":{year:2012,skills:"Action Script 3, Adobe Flash",cover:"res/lcbss.png"},
"_8":{year:2012,skills:"Action Script 3, Adobe Flash",cover:"res/angryHen.png",color:"#CCCCCC"},
"_9":{year:2012,skills:"Action Script 3, Adobe Flash",cover:"res/galactic.jpg",color:"#000000"},
"_10":{year:2011,skills:"C, VisualBasic, Arduino"},
"_11":{year:2011,skills:"C, Arduino",cover:"res/sumo.gif"},
"_12":{year:2011,skills:"C, Arduino"},
"_13":{year:2009,cover:"res/jet2.jpg"}
};

function init(){
  var header = document.getElementById("y0");
  var height = ($(window).height() - header.clientHeight)*0.9;
  for( key in objects){
    try {
      var year = document.createElement("div");
      year.innerHTML = "<p>"+objects[key].year+"<p>";
      year.className = "text-center";
      year.style.width = "100%";
      year.style.height = "auto";
      year.style.position = "absolute";
      year.style.top = "0px";
      year.style.left = "0px";
      year.style.paddingTop = "7px"
      year.style.background = "rgba(0,0,0,0.25)";

      obj = document.getElementById(key);
      obj.style.overflowX = "hiddne";
      obj.style.overflowY = "scroll";
      obj.style.position = "relative";
      obj.insertBefore(year,obj.childNodes[0]);

      if(objects[key].cover) {
        obj.style.background = "url('"+objects[key].cover+"')";
        obj.style.backgroundSize = "cover";
      }

      if(objects[key].skills){
        var skill = document.createElement("div");
        skill.innerHTML = '<img src="res/code.png" style="width:25px;height:25px"></img>  '+objects[key].skills;
        skill.className = "text-center";
        skill.style.width = "100%";
        skill.style.height = "auto";
        skill.style.position = "absolute";
        skill.style.bottom = "0px";
        skill.style.left = "0px";
        skill.style.paddingBottom = "4px";

        obj.appendChild(skill);
      }
    } catch(e){
      console.log("Could not customize:");
      console.log(objects[i]);
    }
  }
}

function setHeight(){
  var header = document.getElementById("y0");
  var height = ($(window).height() - header.clientHeight)*0.8;
  for( key in objects){
    try {
      obj = document.getElementById(key);
      obj.style.height = height+"px";
    } catch(e){
      console.log("Could not customize:");
      console.log(objects[i]);
    }
  }
}

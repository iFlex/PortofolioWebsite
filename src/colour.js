colourMap = {
  "0":"#4D94FF",
  "2015":"#0066CC",
  "2014":"#005CB8",
  "2013":"#0B85FF",
  "2012":"#0076EB",
  "2011":"#0066CC",
  "2009":"#0047B3"
}

function applyColour(){
  for( item in colourMap){
    var e = document.getElementById(item)
    if(e)
      e.style.backgroundColor = colourMap[item];
  }
}

var achievements = {
  "_2015":[{title:"Summer intern at JP Morgan Chase",description:"",skills:"",lesson:"Solidified my knowledge of software enginnering principles and agile development"},
  {title:"NGPS",description:"A pure javascript presentation platform that relies on spatial mapping",skills:"# JavaScript, HTML, CSS",lesson:" This taught me that documentation and modularity are key to building large scale systems"},
  {title:"Best AWS Hack award at JacobsHack Hackathon"}],
  "_2014":[],
  "_2013":[],
  "_2012":[],
  "_2011":[],
  "_2010":[],
  "_2009":[],
}

var fieldToElement = {
  "title":"h1",
  "skills":"p",
  "lesson":"p",
  "description":"p"
}

var fieldToStyle = {
  "title":"title",
  "skills":"skills",
  "lesson":"lesson",
  "description":"description"
}

function addItem(item,element){
  for( key in item ){
    var newEl = document.createElement(fieldToElement[key] || "div" );
    newEl.className = fieldToStyle[key];
    newEl.innerHTML = item[key];

    element.appendChild(newEl);
  }
  element.appendChild(document.createElement("hr"));
}

function populate(data){
  for( year in data ){
    var element = document.getElementById(year);
    if( element )
      for( item in data[year])
        addItem(data[year][item],element);
    else
      console.error("Could not find element "+year);
  }
}

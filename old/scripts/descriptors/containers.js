/** 
*	Container Models File
*	States container descriptor & resources needed
*	Mod de operare: descrie direct proprietatile sau indica fisierul CSS necesar + clasa necesara
*	Author:
* 	31 May 2014 14:20
*/
//initialise
this.Descriptors = this.Descriptors || {}
Descriptors.containers = Descriptors.containers || {};
Descriptors.containers['base'] = {width:"100%",height:"100%",background:"white"};//not a camera
Descriptors.containers['root'] = {width:"100%",height:"100%",background:"white",CAMERA_type:"scroller"};
Descriptors.containers['overlay'] = {width:"100%",height:"100%",background:"transparent",cssText:"position:fixed;top:0px;left:0px;z-index:100"};
//
Descriptors.containers['header'] = {x:0,y:0,width:"100%",height:"100px",style:"background:rgba(0,0,255,0.5);padding:5px"};
Descriptors.containers['project'] = {width:"100%",height:"200px",style:"background:rgba(0,255,0,0.3);"};

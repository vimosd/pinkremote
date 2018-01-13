function buttonPressed(){

}
function ValidateIPaddress(ipaddress)   
{  
	if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))  
	{  
	return (true)  
	}  
	return (false)  
} 
function connecttocb(ipAddr){
	if(ValidateIPaddress(botdetails.ipaddress)){
		botdetails.message = 'Connecting....';
	}else{
		botdetails.message = 'Invalid IP address';
	}
	console.log('connecting to compute block:'+ipAddr);
}
function initJq(){
	console.log('jquery init is called');
	document.getElementById("rcbackbtn").addEventListener("mousedown", mouseDown);
	document.getElementById("rcbackbtn").addEventListener("mouseup", mouseUp);
	//$("#rcbackbtn")
}
function mouseDown(){
	console.log('mouse is down');
}
function mouseUp(){
	console.log('mouse is up');
}
function sendAction(mobj){
	var nm1 = mobj.m1;
	var nm2 = mobj.m2;
	var diffm1 = Math.abs(Math.abs(nm1) - Math.abs(mm1)); 
	var diffm2 = Math.abs(Math.abs(nm2) - Math.abs(mm2)); 
	if(diffm1 > 50){
		mm1 = mobj.m1;
		mm2 = mobj.m2;
		botdetails.m1 = mobj.m1;
        botdetails.m2 = mobj.m2;
    	var mObj = {move:move,m1:mobj.m1,m2:mobj.m2};
    	// ws.send(JSON.stringify(mObj));
    	// console.log(mObj);
    }	
}
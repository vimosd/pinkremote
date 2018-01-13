// window.addEventListener("orientationchange", function() {
// 	console.log('Orientation change is detected');
// document.write('Orientation is changed now.....');
// });
var gspin = 0;
var rspin = 0;
var move = 'stop';

setInterval(gerOrientation,100);
function getMotorVoltage(angleValue){
	var m1 = 350;
	var m2 = 350;
	var m1v = parseInt(m1 + (angleValue*6));
	var m2v = parseInt(m2 - (angleValue*6));
	return {m1:m1v,m2:m2v};
}
function moveForward(){
	mm1 = 0;
	mm2=0;
	rspin = gspin;
	move = 'forward';
	document.getElementById('actionevent').innerHTML = 'Moving forward  ::'+(gspin - rspin);
}
function moveBackward(){
	mm1 = 0;
	mm2=0;
	rspin = gspin;
	move = 'backward';
	document.getElementById('actionevent').innerHTML = 'Moving backward  ::'+(gspin - rspin);
}
function stopMotion(){
	move = 'stop';
	document.getElementById('actionevent').innerHTML = 'Stop';
	ws.send(JSON.stringify({move:'stop',m1:0,m2:0}));

}
var mm1 = 0, mm2=0;
function sendAction(mobj){
	var nm1 = mobj.m1;
	var nm2 = mobj.m2;
	var diffm1 = Math.abs(Math.abs(nm1) - Math.abs(mm1)); 
	var diffm2 = Math.abs(Math.abs(nm2) - Math.abs(mm2)); 
	if(move != 'stop' && diffm1 > 50){
		mm1 = mobj.m1;
		mm2 = mobj.m2;
    	var mObj = {move:move,m1:mobj.m1,m2:mobj.m2};
    	ws.send(JSON.stringify(mObj));
    	console.log(mObj);
    }	
}
function gerOrientation(){
	window.addEventListener("deviceorientation", handleOrientation, true);
	function handleOrientation(event) {
	    // those angles are in degrees
	    var alpha = event.alpha;  
	    var beta = event.beta;
	    var gamma = event.gamma;

	    // JS math works in radians
	    var betaR = beta / 180 * Math.PI;
	    var gammaR = gamma / 180 * Math.PI;
	    var spinR = Math.atan2(Math.cos(betaR) * Math.sin(gammaR), Math.sin(betaR));

	    // convert back to degrees
	    var spin = spinR * 180 / Math.PI;
	    gspin = spin;
	    var mobj = getMotorVoltage((gspin - rspin));
	    document.getElementById('myvalue').innerHTML = 'Orientation is changed now.....:'+mobj.m1+'  :  '+mobj.m2;
	    sendAction(mobj);
	}	
}
function getMotion(){
	console.log('function is called-------------');
window.addEventListener("devicemotion", handleMotion, true);
function handleMotion(event) {
  var absolute = event.absolute;
  var alpha    = event.alpha;
  var beta     = event.beta;
  var gamma    = event.gamma;
  //document.write('Orientation is changed now.....:'+event.acceleration.x);
  document.getElementById('myvalue').innerHTML = 'Orientation is changed now.....:'+event.acceleration.x;
  console.log(event);
  // Do stuff with the new orientation data
}
}
var ws = new WebSocket("ws://10.1.1.67:8080");
console.log(ws);
setTimeout(function(){
	//ws.send('something');
},2000);
// ws.onopen(function() {
// 	ws.send('something');
// });
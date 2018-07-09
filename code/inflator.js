var ball = document.querySelector("#mainObj");
var canvas = document.querySelector("#canvas");
var volume = 1000000;
var accumulatedAir = 0;
var radius = calcRadius();
var airPump = 1000000;
var pumpHandle = document.querySelector("#pumpHeadWindow");
var pumpBody = document.querySelector("#pumpBody");
var distanceTraveled = 0;
var totalDistance = getTotalDistance();
var maxVolume = getMaxVolumeBetween(13, 508);
var a = 2;
var spaceIsPressed = false;
var minAlpha = 0.5;
var newAlpha = 1;
var button = document.querySelector("#callButton")
var speedMultiplier = 1;
ball.style.backgroundColor="rgba(242, 95, 92, "+newAlpha+")";
canvas.style.width="900px";
canvas.style.height="500px";
button.style.height=100+"px";
button.style.top=parseInt(canvas.style.height)-parseInt(button.style.height)+"px";
ball.style.height= radius+"px";
ball.style.width= radius+"px";
document.querySelector(".pump").style.height=160+"px"
document.querySelector("#pumpHandle").style.height=20+"px"
pumpHandle.style.transform= "translateY("+distanceTraveled+"px)"

function getTotalDistance() {
	return parseInt(document.querySelector(".pump").style.height);
}

function getMaxVolumeBetween(x, y) {
	var num = 99999999999;
	while (num>y||num<x) {
		num=(Math.floor(Math.random()*1000)+x);
	}
	return num*1000000;
}

function calcRadius() {
	return Math.cbrt((3*volume)/(4*Math.PI))
}

function calcBallAlpha() {
	var percentOfMaxVolume = volume/maxVolume;
	var differenceOfDefaultAndMinAlpha = 1-minAlpha;
	newAlpha = 1-(percentOfMaxVolume*differenceOfDefaultAndMinAlpha);
	ball.style.backgroundColor="rgba(242, 95, 92, "+newAlpha+")";
}

function updateBall(){
	if (volume<=maxVolume) {
		radius = calcRadius();
		ball.style.width=Math.floor(radius)+"px";
		ball.style.height=Math.floor(radius)+"px";
		calcBallAlpha();
		pumpHandle.style.transform= "translateY("+distanceTraveled+"px)";
	} else {
		ball.style.display="none";
	}
}

function buttonPressLogic() {
	if (spaceIsPressed&&(distanceTraveled-a)>-(parseInt(document.querySelector(".pump").style.height))+(parseInt(document.querySelector("#pumpHandle").style.height))) {
		distanceTraveled= distanceTraveled-a;
		accumulatedAir=Math.abs(distanceTraveled)+accumulatedAir;
		volume = volume + (Math.abs(distanceTraveled)/parseInt(document.querySelector(".pump").style.height))*airPump;
		a = ((a*0.2)+a)*speedMultiplier;
	} else if(spaceIsPressed) {
		distanceTraveled=-((parseInt(document.querySelector(".pump").style.height))-(parseInt(document.querySelector("#pumpHandle").style.height)));
	} else if (distanceTraveled+8<0)
		{
			distanceTraveled++;
			distanceTraveled++;
			distanceTraveled++;
			distanceTraveled++;
			distanceTraveled++;
			distanceTraveled++;
			distanceTraveled++;
			distanceTraveled++;
		} else {
			distanceTraveled=0;
		}
}

function calcPumpToAir(){
	return (distanceTraveled/totalDistance)*airPump
}

setInterval(function(){

	buttonPressLogic();
	updateBall();
},29)

document.body.onkeydown = function(e) {
	if(e.keyCode==32){
		spaceIsPressed=true;
	}
	if(e.keyCode==16){
		speedMultiplier=1.5;
	}
}

document.body.onkeyup = function(e) {
	if(e.keyCode==32){
		a = 2;
		spaceIsPressed=false;
	}
	if(e.keyCode==16){
		speedMultiplier=1;
	}
}



// canvas.addEventListener("click", function(){
// 	volume = volume + airPump;
// 	radius = calcRadius();
	
// })
//Things we want page tracking to do
//Report page visited
function getFileVisited() {
  	return window.location.pathname;
}

//Report coordinates of mouse
function getMouseCoords(e) {
  	return [e.clientX,e.clientY];
}

//Report scrolling
function getScrollPosition() {
	return [window.scrollX,window.scrollY];
}

//Report browser type, window size
function getBrowserInfo() {
	return {
		"userAgent": navigator.userAgent,
		"appCodeName": navigator.appCodeName,
		"appName": navigator.appName,
		"vendor": navigator.vendor,
		
	}
}

//Report keypresses
function getKeyPress(e) {
	return e.keyCode;
}

function getWindowSize() {
	return [window.innerWidth, window.innerHeight];
}

//TRANSMIT TO SERVER
function transmitToServer(key,value) {
	//Publishes (new Date().getTime(),key,value) to server
	console.log("Published "+key+": "+value+" at "+new Date().getTime());
}
var poslist = [];
//Events
//On Mouse Move
var startTime = new Date().getTime();
window.onmousemove = function(e) {
	transmitToServer("mousemove",getMouseCoords(e));
}
//On scroll
window.onscroll = function(e) {
	transmitToServer("scroll",getScrollPosition());
    poslist.push({
        "pos": getScrollPosition(),
        "ts": (new Date().getTime() - startTime)
    });
}
//On page resize
window.onresize = function(e) {
	transmitToServer("resize",getWindowSize());
}
//On page click
window.onclick = function(e) {
	transmitToServer("click",getMouseCoords(e));
}
//On key down
window.onkeydown = function(e) {
	transmitToServer("keydown",getKeyPress(e));
}
//On key up
window.onkeyup = function(e) {
	transmitToServer("keyup",getKeyPress(e));
}

//TODO!! Playback on home computer

function activateScrollPosition(pos) {
    window.scrollTo(pos[0],pos[1]);
}
function playBackEventList(listofpos) {//DELETE LATER
    startTime = new Date().getTime();
    
    globalposlist = listofpos;
    myvar = setInterval(function() {
        var currentTime = new Date().getTime() - startTime;
        var done = true;
        if (globalposlist[0]["ts"] <= currentTime) {
            var done = false;
        } else {
            var done = true;
        }
        while (!done) {
            var currentdata = globalposlist.shift();
            
            
            activateScrollPosition(currentdata["pos"]);
            
            if (globalposlist.length < 1 || globalposlist[0]["ts"] > currentTime) {
                done = true;
            }
        }
        if (globalposlist.length < 1) {
            clearInterval(myvar);
        }
    },10);
}
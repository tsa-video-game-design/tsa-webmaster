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
var eventlist = [];
//Events
//On Mouse Move
var startTime = new Date().getTime();
window.onmousemove = function(e) {
	transmitToServer("mousemove",getMouseCoords(e));
    eventlist.push({
        "type":"mousemove",
        "pos": getMouseCoords(e),
        "ts": (new Date().getTime() - startTime)
    });
}
//On scroll
window.onscroll = function(e) {
	transmitToServer("scroll",getScrollPosition());
    eventlist.push({
        "type":"scroll",
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
    eventlist.push({
        "type":"click",
        "pos": getMouseCoords(e),
        "ts": (new Date().getTime() - startTime)
    });
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

function playEvent(event) {
    if (event.type == "scroll") {
        window.scrollTo(event["pos"][0],event["pos"][1]);
    } else if (event.type == "click") {
        document.elementFromPoint(event["pos"][0], event["pos"][1]).click();
    } else if (event.type == "mousemove") {
        document.getElementsByClassName("f-cursor")[0].style.marginLeft = event["pos"][0]+"px";
        document.getElementsByClassName("f-cursor")[0].style.marginTop = event["pos"][1]+"px";
    }
}
function playBackEventList(listofpos) {//DELETE LATER
    startTime = new Date().getTime();
    globaleventlist = listofpos;
    
    myvar = setInterval(function() {
        var currentTime = new Date().getTime() - startTime;
        var done = true;
        if (globaleventlist[0]["ts"] <= currentTime) {
            var done = false;
        } else {
            var done = true;
        }
        while (!done) {
            var currentevent = globaleventlist.shift();
            playEvent(currentevent);
            if (globaleventlist.length < 1 || globaleventlist[0]["ts"] > currentTime) {
                done = true;
            }
        }
        if (globaleventlist.length < 1) {
            clearInterval(myvar);
        }
    },10);
}
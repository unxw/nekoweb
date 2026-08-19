const wlocation = window.location.pathname;

document.addEventListener('DOMContentLoaded', async function() {
    deviceCheck();
    await initSongs();
    confirmation();
    removeElement('#loading');
    window.addEventListener('mousemove',  function() {homeSong()},{once: true});
});


const wait = ms => new Promise(resolve => setTimeout(resolve, ms));  

/* reminder for ur fucking dumbass self... how does that thing work? ^^^^
1. setTimeout() very simple it just runs something after a delay specified in the 2nd box -> imlazy(() => {console.log("balls");}, 1000);
ignore the weird stuff at the start of it; if it works it works bruh

2. im lazy ill explain promise later hopefilly i dont forgot how it works by then

*/

function deviceCheck(){
var mobile = navigator.userAgent.toLowerCase().match(/mobile/i);
if(mobile){
    window.alert("youre on a mobile device, im lazy and have yet to fix support so the site might not work...!!");
}
console.log("you seen to be on... " + navigator.platform.toLowerCase());
}

function homeSong(){
    removeElement('#reminder');
    homeAudio = document.createElement("audio");
    homeAudio.src = "/assets/audio/bios.mp3";
    homeAudio.autoplay = true;
    homeAudio.volume = 0.5; // this is loud as shit 😿
    document.body.appendChild(homeAudio);
}

async function fadeOut(name){
    var i = name.volume;
    while(i >= 0){
        name.volume = i;
        await wait(80);
        i -= 0.05;
    }
}

async function fadeIn(name){
    var i = name.volume;
    name.volume = 0;
    while(i <= 1){
        name.volume = i;
        await wait(80);
        i += 0.05;
    }
}

function removeElement(selector) {
    const element = document.querySelector(selector);
    if(element){
        element.style.transition = '0.25s';
        element.style.opacity = '0';
    setTimeout(() => {
        element.remove();
    }, 250);
    }
}

async function ps2thingy() { //async so that i can acutaly use await  
    var vid = document.getElementById("intro");
    const shade = document.getElementById("shade");
    const logo = document.getElementById("logo");
    const start = document.getElementById("start");
    fadeOut(homeAudio);
    shade.classList.add("fade");
    logo.classList.add("logofade");
    await wait(1500); //wait 1.5s
    removeElement('.homeAudio');
    vid.style.visibility = "visible";
    vid.volume = 0.3; // intro was loud as shit holy fuck
    vid.play();
    await wait(8800); //wait 8.8s
    playAudio('assets/audio/entry.mp3');
    vid.style.visibility = "hidden";
    start.remove();
    iframeLoader('/assets/menu.html');
    await wait(500);
    shade.style.visibility = "hidden";
    shade.classList.remove("fade");
    logo.classList.remove("logofade");
    await wait(2700); // wait 2.7s for the menu entry sound to fade out a little
    playSong();       // commence the music :3
}

function iframeLoader(path){
    frame = document.createElement('iframe');
    frame.src = path;
    document.body.appendChild(frame);
}



console.image = function(url, size) {
  const image = new Image();
  image.src = url;
  image.onload = function() {
    var style = [
      'font-size: 1px;',
      'padding: ' + this.height/100*size + 'px ' + this.width/100*size + 'px;',
      'background: url('+ url +') no-repeat;',
      'background-size: contain;'
     ].join('');
     console.log('%c ', style);
  };
};

function confirmation(){
const url = "data:image/jpeg;base64,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";
console.log();
console.image(url, 100);                                                                                                     //img data, command to run the img script, and stuff
console.log('%call scripts loaded okay!🌸  ...probably?\n(im a shitty coder sorry)\n\nwindow location:'+wlocation,'color: #ffc4f3; font-size: 20px;'); //ts doesnt even check to see if it loaded just pray for the best ngl
};
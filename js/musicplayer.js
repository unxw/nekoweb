var defaultsong = "/assets/audio/newlook.mp3"; // i will impliment this later when ia add some sort of settings menu
var song = new Audio(defaultsong);

function playSong() {
     if (song.readyState > HTMLMediaElement.HAVE_CURRENT_DATA) {  // palys audio when it is value 3 or higher, meaning it can play from beginning to end uninterrupted
        song.play();
        return("song playing");
     }
     else{
        return ("song isnt loading correctly... please check the file or try again");
     }
}

function pauseSong() {
    song.pause();
    return ("song paused");
}

function setVolume(vol){
    song.volume = vol;
    return ("volume set to " + vol*100 + "% :P");
}
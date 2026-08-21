//hi this is a music/audio handler i made its kinda flawed but it works for what i need it to do :3

var song = null;
var songs = [];
var songNum = 0;
var playing = false;

async function initSongs(){
    const songList = "/assets/audio/songs.json"; // set songlist
    const response = await fetch(songList);      // fetch songlist json   btw A LOT OF FUNCTIONS AHVE TO BE AWAIT SINCE THIS IS ASYNC 
    const data = await response.json();
    songs = data.songs;
    song = new Audio(songs[songNum].url);

    console.log(songs);
    setVolume(0.5);
    console.log ("songs loaded ok!! ^^^");
}


function playSong(url) {                            //uhm ill fix the url system later i think it was somewhat broken iirc
    if(url){ //if url is inputted
        song.src = url;
        console.log("loaded from url:3 -> " + url);
    }
    else{ // if its feched from songlist
    if(!song) return ("no song loaded yet");
    song.src = songs[songNum].url;
    getSongInfo();
    }
    song.load();
    playing = true;
    song.play();
    song.addEventListener("ended", (event) => {
        next();
    });
}

function playAudio(url){
    const song = new Audio(url);
    song.volume = 0.5;
    song.load();
    song.play();
}

async function next(){
    song.currentTime = 0;
    songNum++;
    if(songNum > (songs.length-1)) {
            songNum = 0;
            console.log('looped around since u went over the array length :P (end to start)');
        }
    song.src = songs[songNum].url;
    await playSong();   
}

function back(){
    song.currentTime = 0;
    songNum--;
    if(songNum < 0) {
            songNum = (songs.length-1);
            console.log('looped around since u went over the array length :P (start to end)');
        }
        song.src = songs[songNum].url;
        playSong();   
}

function pauseSong() {
    if(!song) return ("no song loaded to pause");
    if(playing){
        playing = false;
        song.pause();
        return ("song paused");
    }
    else{
        playing = true;
        song.play();
        return ("song unpaused");
    }
}

function setVolume(vol){
    if(!song) return ("no song loaded to set volume");
    song.volume = vol;
    console.log("volume set to " + vol*100 + "% :P");
}

function getSongInfo() {
    if(!song) return ("no song loaded to get info");
    console.log("Song: " + songs[songNum].title +
                "\nArtist: " + songs[songNum].artist);
}

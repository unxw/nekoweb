var song = null;
var songs = [];
var songNum = 0;
var playing = false;
var customAudio = false;

async function initSongs(){
    const songList = "/assets/audio/songs.json"; // set songlist
    const response = await fetch(songList);      // fetch songlist json   btw A LOT OF FUNCTIONS AHVE TO BE AWAIT SINCE THIS IS ASYNC 
    const data = await response.json();
    songs = data.songs;
    song = new Audio(songs[songNum].url);

    song.addEventListener("ended", (event) => {
    if(!customAudio){
        next();
    }
    else{
        customAudio = false;
    }
    });
    console.log(songs);
    console.log ("songs loaded ok!! ^^^");
}


function playSong(url) {
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
}

function playAudio(url){
    const song = new Audio(url);
    song.volume = 0.5;
    customAudio = true;
    song.load();
    song.play();
}

function next(){
    pauseSong();
    song.currentTime = 0;
    songNum++;
    if(songNum > (songs.length-1)) {
            songNum = 0;
            console.log('looped around since u went over the array length :P (end to start)');
        }
    song.src = songs[songNum].url;
    playSong();   
}

function back(){
    pauseSong();
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
    playing = false;
    song.pause();
    return ("song paused");
}

function setVolume(vol){
    if(!song) return ("no song loaded to set volume");
    song.volume = vol;
    return ("volume set to " + vol*100 + "% :P");
}

function getSongInfo() {
    if(!song) return ("no song loaded to get info");
    console.log(songs);
    console.log("Song: " + songs[songNum].title +
                "\nArtist: " + songs[songNum].artist);
}

var song = null;
var songs = [];
var songNum = 0;

function initSongs(){
    const songList = "/assets/audio/songs.json";
    fetch(songList)
        .then(response => response.json())
        .then(data => {songs = data.songs;
            song = new Audio(songs[songNum].url || []);
            song.addEventListener("ended", (event) => {
                if(songNum > songs.length) {
                    songNum = 0;
                }
                songNum++;
                song.src = songs[songNum].url;
                playSong();
            });
    });
    console.log ("songs loaded ok!!");
}

function playSong() {
    if(!song) return ("no song loaded yet");
    if(song.readyState < 3) song.load();
    song.play();
    getSongInfo();

}

function pauseSong() {
    if(!song) return ("no song loaded to pause");
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

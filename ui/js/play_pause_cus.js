function playPause(videoID, videoBtnID) {
    var oneuiVideo = document.getElementById(videoID);
    var el = document.getElementById(videoBtnID);
    if (oneuiVideo.paused) {
        oneuiVideo.play();
        el.className = "video_pause_button";
    } else {
        oneuiVideo.pause();
        el.className = "video_playButton";
    }
}

const autoplayObjects = document.getElementsByClassName("autoPlay");
for (let i = 0; i < autoplayObjects.length; i++) {
    playPause(autoplayObjects[i].id, autoplayObjects[i].id + "_playButton");
}
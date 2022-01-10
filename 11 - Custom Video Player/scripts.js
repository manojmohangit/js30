var videoDOM = document.querySelector(".viewer");
var progressBar = document.querySelector(".progress");
var mouseDownFired = false;
var playButton = document.querySelector(".toggle");
var playButtonImage = "►";
var pauseButtonImage = "⏸︎";
var skipButtons = document.querySelectorAll("[data-skip]");


//defaultValues
videoDOM.currentTime = 0;
videoDOM.addEventListener('loadedmetadata', displayVideoProgress);


// progress bar functionality
progressBar.addEventListener("mousedown", () => mouseDownFired = true)
progressBar.addEventListener("mouseup", () => mouseDownFired = false)
progressBar.addEventListener("mousemove", (e) => mouseDownFired && handleProgressBarChange(e))

progressBar.addEventListener("click", handleProgressBarChange);

function handleProgressBarChange(e) {
    progressBarPercentage = (e.offsetX/progressBar.offsetWidth) * 100;
    videoDOM.currentTime = progressBarPercentage * videoDOM.duration / 100
}


// play button functionality
playButton.addEventListener("click", togglePlayPlause)
videoDOM.addEventListener("click", togglePlayPlause)

function togglePlayPlause() {
    if(videoDOM.paused) {
        videoDOM.play();
    } else {
        videoDOM.pause();
    }
}

//displaying progress in progress bar
function displayVideoProgress() {
    document.querySelector(".progress__filled").style.flexBasis = `${(videoDOM.currentTime / videoDOM.duration) * 100}%`;
}

videoDOM.addEventListener("play", () => {
    playButton.innerHTML = pauseButtonImage;
})

videoDOM.addEventListener("pause", () => {
    playButton.innerHTML = playButtonImage;
})

videoDOM.addEventListener("timeupdate", displayVideoProgress)

// skip functionality
skipButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        videoDOM.currentTime += parseInt(e.target.dataset.skip);
    })
});

// volume functionality
var volumeButton = document.querySelector("input[name='volume']");
volumeButton.addEventListener("change", handleVolumeButton);
volumeButton.addEventListener("mousemove", handleVolumeButton);

function handleVolumeButton() {
    videoDOM.volume = this.value;
}

//playBack Rate functionality
var playBackRateButton = document.querySelector("input[name='playbackRate']");
playBackRateButton.addEventListener("change", handlePlayBackRateButton);
playBackRateButton.addEventListener("mousemove", handlePlayBackRateButton);

function handlePlayBackRateButton() {
    videoDOM.playbackRate = this.value;
    
}

var timerButtons = document.querySelectorAll(".timer__button");
var displayTimeLeft = document.querySelector(".display__time-left");
var displayEndTime = document.querySelector(".display__end-time");
var form = document.querySelector("#custom");
var intervalTimer;


function setTimer(secs) {
    var currentTime = (new Date()).getTime();
    var countDownEndTime = currentTime + secs * 1000;

    displayTimer(secs);
    displayEnd(countDownEndTime);

    // reset the timer on setting timer
    clearInterval(intervalTimer);
    intervalTimer = setInterval(() => {
        var currentTime = (new Date()).getTime();
        var remainingTime = Math.round((countDownEndTime-currentTime) / 1000);

        // stop the timer once it reached 0 seconds
        if(remainingTime < 0) {
            clearInterval(intervalTimer);
            return;
        }
        displayTimer(remainingTime);   
    }, 1000);
    
    
}

timerButtons.forEach(button => button.addEventListener("click", function() {
    setTimer(this.dataset.time);
}));

form.addEventListener("submit", function(e) {
    e.preventDefault();
    setTimer(parseInt(this.minutes.value) * 60)
    this.reset();
});

function displayTimer(seconds) {
    var remainingMinute = Math.floor(seconds / 60); 
    var remainingSeconds = seconds % 60; 
    displayTimeLeft.textContent = `${remainingMinute}:${addZeroToTime(remainingSeconds)}`;
}

function displayEnd(endTimeStamp) {
    var endDate = new Date(endTimeStamp);
    displayEndTime.textContent = `Be Back at ${endDate.getHours()}:${addZeroToTime(endDate.getMinutes())}`;
    
}

function addZeroToTime(time) {
    return (time < 10 ? '0' : '') + time;
}



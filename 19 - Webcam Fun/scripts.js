const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    const canvasDataURL = canvas.toDataURL("image/jpeg", 1.0);
    const newImage = document.createElement("img");
    const link = document.createElement("a");
    link.href = canvasDataURL;
    newImage.src = canvasDataURL;
    link.appendChild(newImage);
    link.setAttribute("download", "handsome");
    strip.insertBefore(link, strip.firstChild)
}

function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localMediaStream => {
        video.srcObject = localMediaStream
        video.play();
    })
    .catch(err => {
        console.error(`Some Error Occured: `, err);
    })
}




function paintOnCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        imageData = ctx.getImageData(0, 0, width, height);

        //some random red filter
        // imageData.data = redFilter(imageData.data)

        imageData.data = pixelBasedOnInput(imageData.data)
        
        ctx.putImageData(imageData, 0, 0)
    }, 100)

}

function redFilter(pixels) {  
    for(var i=0; i<pixels.length; i+=4) {
        pixels[i+0] = pixels[i+0] + 100;
        pixels[i+1] = pixels[i+1];
        pixels[i+2] = pixels[i+2];   
    }
    return pixels;
}

function pixelBasedOnInput(pixels) {

    var levels = {};
    document.querySelectorAll(".rgb input").forEach((input) => {
        levels[input.name] = input.value;
    });
    
    for(var i=0; i<pixels.length; i+=4) {
        red = pixels[i+0]
        green = pixels[i+1]
        blue = pixels[i+2]

        if( red >= levels["rmin"] && red <= levels["rmax"] &&
            green >= levels["gmin"] && green <= levels["gmax"] &&
            blue >= levels["bmin"] && blue <= levels["bmax"]
        ) {
            //make it transparent if the pixels lies in between range by setting alpha to 0
            pixels[i+3] = 0;

        }
    }
    return pixels;
}

getVideo();
video.addEventListener("canplay", paintOnCanvas);

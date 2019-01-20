let v = document.getElementById("myVideo");

//create a canvas to grab an image for upload
let imageCanvas = document.createElement('canvas');
let imageCtx = imageCanvas.getContext("2d");

let emotions = [];


//Add file blob to a form and post
function postFile(file) {
    let formdata = new FormData();
    formdata.append("image", file);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5000/images', true);
    xhr.onload = function () {
        if (this.status === 200) {
            console.log(this.response);
            emotions.push(JSON.parse(this.responseText));
        } else
            console.error(xhr);
    };
    xhr.send(formdata);
}

//Get the image from the canvas
function sendImagefromCanvas() {

    //Make sure the canvas is set to the current video size
    imageCanvas.width = v.videoWidth;
    imageCanvas.height = v.videoHeight;

    imageCtx.drawImage(v, 0, 0, v.videoWidth, v.videoHeight);

    //Convert the canvas to blob and post the file
    imageCanvas.toBlob(postFile, 'image/jpeg');
}

//Take a picture on click
v.onclick = function () {
    console.log('click');
    sendImagefromCanvas();
};

window.onload = function () {

    //Get camera video
    navigator.mediaDevices.getUserMedia({video: {width: 1280, height: 720}, audio: false})
        .then(stream => {
            v.srcObject = stream;
        })
        .catch(err => {
            console.log('navigator.getUserMedia error: ', err)
        });

};


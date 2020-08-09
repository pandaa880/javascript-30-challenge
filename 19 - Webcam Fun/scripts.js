const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");
const takePhotoBtn = document.querySelector(".button--takephoto");
// const turnoffBtn = document.querySelector(".button--turnoff");

let mediastream = null;

//
function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      mediastream = new MediaStream(localMediaStream);
      // console.log(mediastream);
      video.srcObject = mediastream;
      video.play();
    })
    .catch((err) => {
      console.error("Webcam Access Denied", err);
      alert("Webcam Access Denied");
    });
}

//
function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;

  canvas.width = width;
  canvas.height = height;

  //
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // take the pixels
    let pixels = ctx.getImageData(0, 0, width, height);
    // modify pixels
    // pixels = redEffect(pixels);
    pixels = rgbSplit(pixels);
    ctx.globalAlpha = 0.1;
    // update with new pixels
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

//
function takePhoto() {
  // play the sound
  snap.currentTime = 0;
  snap.play();

  // pick a frame from canvas
  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "frame");
  link.textContent = "Download Image";
  link.innerHTML = `<img src=${data} alt="Smarty pants!" />`;
  strip.insertBefore(link, strip.firstChild);

  link.click();
}

//
function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    //r
    pixels.data[i + 0] = pixels.data[i + 0] + 100;
    //g
    pixels.data[i + 1] = pixels.data[i + 1] - 50;
    //b
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5;
  }
  return pixels;
}

//
function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    //r
    pixels.data[i - 150] = pixels.data[i + 0];
    //g
    pixels.data[i + 500] = pixels.data[i + 1];
    //b
    pixels.data[i - 500] = pixels.data[i + 2];
  }
  return pixels;
}

// stop video and turnoff webcamp
function stopVideo() {
  video.pause();

  if (mediastream) {
    mediastream.getTracks()[0].stop();
  }
}

getVideo();

video.addEventListener("canplay", paintToCanvas);
takePhotoBtn.addEventListener("click", takePhoto);
// turnoffBtn.addEventListener("click", stopVideo);

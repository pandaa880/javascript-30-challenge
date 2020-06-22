// get the controls and video element
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// toggle play
function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

// update toggle button
function updateToggleButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

// skip video by seconds
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// handle volume and playback sliders update
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// handle progress change
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// attach event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateToggleButton);
video.addEventListener("pause", updateToggleButton);
video.addEventListener("timeupdate", handleProgress);
toggle.addEventListener("click", togglePlay);

skipButtons.forEach((button) => {
  button.addEventListener("click", skip);
});

ranges.forEach((range) => {
  range.addEventListener("change", handleRangeUpdate);
  range.addEventListener("mousemove", handleRangeUpdate);
});

let mouseDown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mouseDown && scrub(e));
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));

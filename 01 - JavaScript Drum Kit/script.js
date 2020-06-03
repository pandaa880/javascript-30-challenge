function playSound(e) {
  // select an audio with associated keyCode
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

  // if there is no audio then stop the function
  if (!audio) {
    return;
  }

  // rewind it to start
  audio.currentTime = 0;
  audio.play();

  // add class for animation
  key.classList.add("playing");
}

// remove transition
function removeTransition(e) {
  if (e.propertyName !== "transform") {
    return;
  }

  // here `this` is the key
  this.classList.remove("playing");
}

// select all keys to detect when animation ends - when animation ends we remove the .playing class from the element
const keys = document.querySelectorAll(".key");
// add an event listener to each key
keys.forEach((key) => {
  key.addEventListener("transitionend", removeTransition);
});

window.addEventListener("keydown", playSound);

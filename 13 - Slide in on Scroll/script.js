// run the scroll function after given wait time is over
// it helps with unnecessary calls and page jank
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// select all the images on the page which we want to be slide in
const sliderImages = document.querySelectorAll(".slide-in");

//
function checkSlide(e) {
  // console.log(window.scrollY);
  sliderImages.forEach((sliderImage) => {
    // halfway through the image from top
    const slideInAt =
      window.scrollY + window.innerHeight - sliderImage.height / 2;

    // bottom of the image from bottom scroll
    const imageBottom = sliderImage.offsetTop + sliderImage.height;

    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add("active");
    } else {
      sliderImage.classList.remove("active");
    }
  });
}

// add scroll event listener to the window
window.addEventListener("scroll", debounce(checkSlide));

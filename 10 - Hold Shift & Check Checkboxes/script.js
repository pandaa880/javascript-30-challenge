// get checkbox input
const checkboxes = Array.from(
  document.querySelectorAll('.inbox input[type="checkbox"]')
);

let lastChecked;

let isShiftPressed = false;

function handleCheck(e) {
  let inBetween = false;
  // check if user had shift key down & user is checking it (not unchecking it)
  // click event will be fired for both check and uncheck events
  if (e.shiftKey && this.checked) {
    // loop over all checkboxes
    checkboxes.forEach((checkbox) => {
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }

      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }
  lastChecked = this;
}

// add event listeners
checkboxes.forEach((item, index) => {
  item.setAttribute("data-index", index);
  item.addEventListener("click", handleCheck);
});
const inbox = document.querySelector(".inbox");

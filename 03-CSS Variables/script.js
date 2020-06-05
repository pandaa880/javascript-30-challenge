// select all the controls
const inputs = document.querySelectorAll(".controls input");

// handle update
function handleUpdate() {
  const suffix = this.dataset.sizing || "";
  console.log(this.name);

  // update the variable
  document.documentElement.style.setProperty(
    `--${this.name}`,
    `${this.value}${suffix}`
  );
}

// loop through all the inputs and attach an event listener
inputs.forEach((input) => {
  input.addEventListener("change", handleUpdate);
  input.addEventListener("mousemove", handleUpdate);
});

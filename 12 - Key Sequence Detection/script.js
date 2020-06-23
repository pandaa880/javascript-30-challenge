const pressed = [];

const secret_code = "pk";
window.addEventListener("keyup", (e) => {
  console.log(e.key);
  pressed.push(e.key);
  pressed.splice(-secret_code.length - 1, pressed.length - secret_code.length);

  if (pressed.join("").includes(secret_code)) {
    console.log("gotcha !!");
  }
});

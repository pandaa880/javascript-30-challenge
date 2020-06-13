const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");

// resize canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// set drawing options
ctx.strokeStyle = "#BADA55";
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.lineWidth = 50;

// colors
let hue = 0;

let direction = true;

// take a flag to check if user is drawing or not
let isDrawing = false;

// take start point and end point to draw line
let lastX = 0;
let lastY = 0;

function draw(e) {
  if (!isDrawing) return; // stop the function when user is not drawing or user's mouse is not clicked or downed

  // add colored stroke
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);

  ctx.stroke();

  // update the last known points
  [lastX, lastY] = [e.offsetX, e.offsetY];

  // update hue
  hue++;

  // reset it when it cross 360
  if (hue >= 360) {
    hue = 0;
  }

  // stroke width fun
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }

  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

// add event listener
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

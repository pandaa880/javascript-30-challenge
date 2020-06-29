// select the hero container & text element
const hero = document.querySelector(".hero");
const h1 = document.querySelector("h1");
const walk = 100;

function shadow(e) {
  // get the container dimensions
  const { offsetWidth: width, offsetHeight: height } = hero;
  // get the cursor position
  let { offsetX: x, offsetY: y } = e;

  // if current item which is being hovered is not the container element then we need to change x & y to make it consistant, otherwise x & y will be zero for different elements
  if (this !== e.target) {
    x = e.target.offsetLeft;
    y = e.target.offsetTop;
  }

  // to get values from (walk / 2) to -(walk / 2)
  const xWalk = Math.round((x / width) * walk - walk / 2);
  const yWalk = Math.round((y / height) * walk - walk / 2);

  // update the text shadow
  h1.style.textShadow = `${xWalk}px ${yWalk}px 0 rgba(0, 0, 0, 0.2)`;
}

// attach event listenere
hero.addEventListener("mousemove", shadow);

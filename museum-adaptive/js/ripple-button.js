function createRipple(event) {
  let button = event.currentTarget;

  let circle = document.createElement("span");

  circle.style.width = circle.style.height = `40px`;
  circle.style.left = `90px`;
  circle.style.top = `5px`;
  circle.classList.add("ripple");

  let ripple = button.getElementsByClassName("ripple")[0];

  if (ripple) {
    ripple.remove();
  }
  button.appendChild(circle);
}

document.querySelector('.checkout').addEventListener('click', createRipple);

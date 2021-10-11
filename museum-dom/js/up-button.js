function goTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function showButton() {
  if (document.body.scrollTop > height || document.documentElement.scrollTop > height) {
      upButton.style.transform = 'translateY(0)';
      upButton.style.opacity = 1;
  } else {
    upButton.style.transform = 'translateY(200%)';
    upButton.style.opacity = 0;
  }
}

let height = document.getElementById('welcome-section').offsetHeight;
let upButton = document.getElementById('up-button');

window.onscroll = function () { showButton() };
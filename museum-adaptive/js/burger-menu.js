function burgerClick() {
  if (timerNav) {
    burgerIcon.classList.toggle("change");
    indicator ? showNav() : hideNav();
    timerNav = false;
    setTimeout(function () { timerNav = true; }, 500);
  }
}

function showNav() {
  indicator = false;
  navScaled.style.display = 'block';
  navScaled.classList.remove('hide-nav');
  navScaled.classList.add('show-nav');
  welcomeText.classList.remove('show-overlay');
  welcomeText.classList.add('hide-overlay');
  hideNavOuterClick();
}

function hideNav() {
  indicator = true;
  navScaled.classList.remove('show-nav');
  navScaled.classList.add('hide-nav');
  welcomeText.classList.remove('hide-overlay');
  welcomeText.classList.add('show-overlay');
  setTimeout(function () { navScaled.style.display = 'none'; }, 500);
}
function hideNavOuterClick() {
  document.onclick = function (e) {
    let clickCheck = true;
    switch (e.target) {
      case burgerIcon:
        clickCheck = false;
      case burgerIcon.childNodes.item(1):
        clickCheck = false;
      case burgerIcon.childNodes.item(3):
        clickCheck = false;
      case burgerIcon.childNodes.item(5):
        clickCheck = false;
      case navScaled:
        clickCheck = false;
    }
    if (clickCheck && !indicator) {
      burgerClick();
    }
  };
}

let indicator = true;
let timerNav = true;
let navScaled = document.querySelector('.navigation-scaled');
let welcomeText = document.querySelector('.welcome-text');
let burgerIcon = document.querySelector('.header-burger-menu');

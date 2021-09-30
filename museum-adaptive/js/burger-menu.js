function burgerClick(x) {
  x.classList.toggle("change");
  if (indicator) {
    showNav()
    indicator = false;
  } else {
    hideNav();
    indicator = true;
  }
}

function showNav() {
  navScaled.style.display = 'block';
  navScaled.classList.remove('.hide-nav');
  navScaled.classList.add('.show-nav');
  document.querySelector('.welcome-text').style.opacity = '0';
}

function hideNav() {
  navScaled.classList.add('hide-nav');
  navScaled.classList.remove('show-nav');
  document.querySelector('.welcome-text').style.opacity = '1';
  setTimeout(function () { navScaled.style.display = 'none'; }, 500);
}

// window.onload = function () {
//   document.onclick = function (e) {
//     if (e.target != navScaled) {
//       hideForm();
//     }
//   };
// };


let indicator = true;
let navScaled = document.querySelector('.navigation-scaled');
let welcomeText = document.querySelector('.welcome-text');
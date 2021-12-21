import MiscFunctions from './misc';

class View {
  static displayPreviews() {
    let index = 0;
    document.querySelectorAll('.category').forEach((item) => {
      item.querySelector('.category-number').innerHTML = (index >= 120) ? ((index - 120) / 10 + 1) : (index / 10 + 1);
      const img = new Image();
      img.src = MiscFunctions.getImageURL(index);
      img.onload = () => {
        item.querySelector('.category-img').style.backgroundImage = `url(${img.src})`;
      };
      index += 10;
    });
    document.querySelector('.category.blitz').querySelector('.category-number').innerHTML = 'Blitz';
  }

  static displayAttemptedCategory() {
    const attempted = JSON.parse(localStorage.getItem('attempted')) || [];
    const blitzMax = JSON.parse(localStorage.getItem('blitz-max')) || null;
    let temp;
    attempted.forEach((item, index) => {
      if (item !== null) {
        temp = document.querySelectorAll('.category')[index];
        temp.classList.add('attempted');
        temp.querySelector('.category-stats').innerHTML = `${item.answersCounter}/10`;
      }
    });
    if (blitzMax !== null) {
      const blitzCard = document.querySelector('.category.blitz');
      blitzCard.classList.add('attempted');
      blitzCard.querySelector('.category-number').style.opacity = 1;
      blitzCard.querySelector('.category-number').innerHTML = `best : ${blitzMax}`;
    }
  }

  static clearAnimations() {
    document.querySelectorAll('.category.artists').forEach((item) => {
      item.classList.remove('jump-up');
    });
    document.querySelectorAll('.category.pictures').forEach((item) => {
      item.classList.remove('jump-up');
    });
    document.querySelector('.pagination').classList.remove('slide-left');
  }

  static hidePictureInfo() {
    document.querySelectorAll('.score-image').forEach((item) => {
      item.classList.remove('clicked');
    });
  }

  static animateCategories(category) {
    document.querySelector('.pagination').classList.add('slide-left');
    document.querySelectorAll(`.category${category}`).forEach((item, index) => {
      setTimeout(() => { item.classList.add('jump-up'); }, index * 70);
    });
  }

  static showMainPage() {
    document.body.style.opacity = 1;
    document.querySelector('.icon').classList.add('slide');
    const buttons = document.querySelectorAll('.main-field');
    buttons[0].classList.add('slide-left');
    buttons[1].classList.add('slide-from-top');
    buttons[2].classList.add('slide-right');
    document.getElementById('settings-btn').classList.add('slide-bottom');
  }

  static showPictureInfo(elem) {
    elem.target.classList.toggle('clicked');
  }

  static initApp() {
    View.displayPreviews();
    View.displayAttemptedCategory();
    View.showMainPage();
  }
}

export default View;

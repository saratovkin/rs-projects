import './toys-picker.css';

import IToy from '../interfaces/IToy';

class ToysView {
  private favToys: IToy[];

  constructor(favToys: IToy[]) {
    this.favToys = favToys;
  }

  private static createToy(toy: IToy) {
    const toyElem = document.createElement('div');
    toyElem.className = 'toy-option';
    const toyCounter = document.createElement('div');
    toyCounter.className = 'toy-counter';
    toyElem.style.backgroundImage = `url(toys/${toy.num}.png)`;
    toyCounter.textContent = toy.count;
    toyElem.appendChild(toyCounter);
    document.querySelector('.toys-picker')?.appendChild(toyElem);
  }

  public showToys() {
    this.favToys.forEach((item) => {
      ToysView.createToy(item);
    });
  }
}

export default ToysView;

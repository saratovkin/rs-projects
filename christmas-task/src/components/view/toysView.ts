import './toys-picker.css';

import ToyMove from './toyMove';
import IToy from '../interfaces/IToy';

class ToysView {
  private static createToy(toy: IToy): void {
    const toyElem = document.createElement('div');
    toyElem.className = 'toy-option';
    const toyCounter = document.createElement('div');
    const toyImg = document.createElement('img');
    toyImg.src = `toys/${toy.num}.png`;
    toyImg.setAttribute('data-count', toy.count);
    toyImg.className = 'toy-image';
    toyCounter.className = 'toy-counter';
    toyCounter.textContent = toy.count;
    toyElem.appendChild(toyCounter);
    toyElem.appendChild(toyImg);
    const toyMove = new ToyMove(toyImg);
    toyMove.generateClones();
    document.querySelector('.toys-picker')?.appendChild(toyElem);
  }

  public static clearToys(): void {
    document.querySelectorAll('.toy-option').forEach((item) => {
      item.remove();
    });
  }

  public static showToys(favToys: IToy[]): void {
    favToys.forEach((item) => {
      ToysView.createToy(item);
    });
  }
}

export default ToysView;

import './toys-picker.css';

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
    ToysView.getToyAmount(toyImg);
    document.querySelector('.toys-picker')?.appendChild(toyElem);
  }

  public static getToyAmount(toyImg: HTMLPictureElement) {
    let counter: string = toyImg.getAttribute('data-count') as string;
    counter = (+counter - 1).toString();
    if (+counter > 1) {
      // toyImg = toyImg.cloneNode(false) as HTMLImageElement;

      toyImg.ondragstart = function () {
        return false;
      };
      toyImg.setAttribute('data-count', counter);
      // toyImg.parentElement!.querySelector('.toy-counter')!.textContent = counter;
      ToysView.moveToy(toyImg);
    }
  }

  public static moveToy(toyImg: HTMLPictureElement) {
    toyImg.onmousedown = function (event) {
      toyImg.style.position = 'absolute';
      document.body.append(toyImg);
      moveAt(event.pageX, event.pageY);
      function moveAt(pageX: number, pageY: number) {
        toyImg.style.left = pageX - toyImg.offsetWidth / 2 + 'px';
        toyImg.style.top = pageY - toyImg.offsetHeight / 2 + 'px';
      }
      function onMouseMove(event: MouseEvent) {
        moveAt(event.pageX, event.pageY);
      }
      document.addEventListener('mousemove', onMouseMove);
      toyImg.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        toyImg.onmouseup = null;
      };
    };
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

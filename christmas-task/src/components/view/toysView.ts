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
    ToysView.moveToy(toyImg);
    document.querySelector('.toys-picker')?.appendChild(toyElem);
  }

  // TODO fix count bug
  // if enough time refactor as separate class
  public static moveToy(img: HTMLImageElement) {
    const toyImg: HTMLImageElement = img;
    const toyCounter: HTMLDivElement = img.parentNode?.querySelector('.toy-counter') as HTMLDivElement;
    const droppableArea: HTMLElement = document.querySelector('.test-path') as HTMLElement;
    let droppableFlag = false;
    let toyCount: number;
    let toyClone: HTMLImageElement;
    toyImg.ondragstart = function () {
      return false;
    };
    toyImg.onmousedown = function (event) {
      function moveAt(pageX: number, pageY: number) {
        toyImg.style.left = `${pageX - toyImg.offsetWidth / 2}px`;
        toyImg.style.top = `${pageY - toyImg.offsetHeight / 2}px`;
      }
      function onMouseMove(e: MouseEvent) {
        moveAt(e.pageX, e.pageY);
      }
      toyCount = +(toyImg.getAttribute('data-count') as string);
      if (toyCount >= +(toyCounter.textContent as string)) {
        toyCounter.textContent = (toyCount - 1).toString();
      }
      if (toyCount > 1) {
        toyCount = +(toyCounter.textContent as string);
        toyImg.setAttribute('data-count', '1');
        toyClone = toyImg.cloneNode(true) as HTMLImageElement;
        toyClone.setAttribute('data-count', toyCount.toString());
        toyImg.parentNode?.appendChild(toyClone);
        ToysView.moveToy(toyClone);
      }
      toyImg.style.position = 'absolute';
      document.body.append(toyImg);
      moveAt(event.pageX, event.pageY);
      toyImg.style.position = 'absolute';
      document.body.append(toyImg);
      moveAt(event.pageX, event.pageY);
      document.addEventListener('mousemove', onMouseMove);
      toyImg.onmouseup = function () {
        if (droppableFlag) {
          document.removeEventListener('mousemove', onMouseMove);
          toyImg.onmouseup = null;
        } else {
          toyCounter.textContent = (+(toyCounter.textContent as string) + 1).toString();
          toyImg.remove();
        }
      };
    };
    toyImg.onmousemove = function (event) {
      toyImg.hidden = true;
      const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      toyImg.hidden = false;
      if (elemBelow === droppableArea) {
        droppableFlag = true;
      } else {
        droppableFlag = false;
      }
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

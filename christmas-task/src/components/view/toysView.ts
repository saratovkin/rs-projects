import './toys-picker.css';

import IToy from '../interfaces/IToy';

const droppableArea: HTMLElement = document.querySelector('.drop-zone') as HTMLElement;

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

class ToyMove {
  private toyImg: HTMLImageElement;

  private toyContainer: HTMLDivElement;

  private toyCounter: HTMLDivElement;

  constructor(img: HTMLImageElement) {
    this.toyImg = img;
    this.toyContainer = img.parentNode as HTMLDivElement;
    this.toyCounter = this.toyContainer.querySelector('.toy-counter') as HTMLDivElement;
  }

  public generateClones() {
    let toyCount = +(this.toyImg.getAttribute('data-count') as string);
    while (toyCount != 0) {
      this.moveToy();
      toyCount -= 1;
    }
  }

  public moveToy() {
    let droppableFlag = false;
    let counter: number;
    const toyImg: HTMLImageElement = this.toyImg;
    const maxCount: number = +(toyImg.getAttribute('data-count') as string);
    const toyClone: HTMLImageElement = this.toyImg.cloneNode(true) as HTMLImageElement;
    const toyCounter: HTMLDivElement = this.toyCounter;
    const toyContainer: HTMLDivElement = this.toyContainer;
    toyClone.setAttribute('data-count', '1');
    this.toyImg.parentNode?.appendChild(toyClone);
    toyClone.ondragstart = function () {
      return false;
    };
    toyClone.addEventListener('mousemove', (event) => {
      toyClone.hidden = true;
      const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      toyClone.hidden = false;
      if (elemBelow === droppableArea) {
        droppableFlag = true;
      } else {
        droppableFlag = false;
      }
    });
    toyClone.addEventListener('mousedown', (event) => {
      function moveAt(pageX: number, pageY: number) {
        toyClone.style.left = `${pageX - toyClone.offsetWidth / 2}px`;
        toyClone.style.top = `${pageY - toyClone.offsetHeight / 2}px`;
      }
      function onMouseMove(e: MouseEvent) {
        moveAt(e.pageX, e.pageY);
      }
      toyClone.style.position = 'absolute';
      document.querySelector('.toys-container')?.append(toyClone);
      moveAt(event.pageX, event.pageY);
      document.addEventListener('mousemove', onMouseMove);
      toyClone.onmouseup = function () {
        counter = (+(toyCounter.textContent as string))
        if (droppableFlag) {
          if (counter === 0) {
            toyCounter.textContent = '0';
          } else {
            toyCounter.textContent = (counter - 1).toString();
          }
          if ((toyCounter.textContent as string) === '0') {
            toyImg.classList.add('hide');
          }
          document.removeEventListener('mousemove', onMouseMove);
          toyClone.onmouseup = null;
        } else {
          toyImg.classList.remove('hide');
          if (counter < maxCount) {
            toyCounter.textContent = (+(toyCounter.textContent as string) + 1).toString();
          }
          document.removeEventListener('mousemove', onMouseMove);
          toyClone.onmouseup = null;
          toyClone.style.top = '6px';
          toyClone.style.left = '6px';
          toyContainer.append(toyClone);
        }
      };
    });
  }
}

export default ToysView;

// public static moveToy(img: HTMLImageElement) {
//   const toyImg: HTMLImageElement = img;
//   const toyContainer: HTMLDivElement = img.parentNode as HTMLDivElement;
//   const toyCounter: HTMLDivElement = toyContainer.querySelector('.toy-counter') as HTMLDivElement;
//   let droppableFlag = false;
//   let toyCount = +(toyImg.getAttribute('data-count') as string);
//   while (toyCount != 0) {
//     let toyClone: HTMLImageElement = toyImg.cloneNode(true) as HTMLImageElement;
//     toyClone.setAttribute('data-count', '1');
//     toyImg.parentNode?.appendChild(toyClone);
//     toyClone.ondragstart = function () {
//       return false;
//     };
//     toyClone.onmousemove = function (event) {
//       toyClone.hidden = true;
//       const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
//       toyClone.hidden = false;
//       if (elemBelow === droppableArea) {
//         droppableFlag = true;
//       } else {
//         droppableFlag = false;
//       }
//     };
//     toyClone.onmousedown = function (event) {
//       function moveAt(pageX: number, pageY: number) {
//         toyClone.style.left = `${pageX - toyClone.offsetWidth / 2}px`;
//         toyClone.style.top = `${pageY - toyClone.offsetHeight / 2}px`;
//       }
//       function onMouseMove(e: MouseEvent) {
//         moveAt(e.pageX, e.pageY);
//       }
//       toyClone.style.position = 'absolute';
//       document.body.append(toyClone);
//       moveAt(event.pageX, event.pageY);
//       document.addEventListener('mousemove', onMouseMove);
//       toyClone.onmouseup = function () {
//         if (droppableFlag) {
//           toyCounter.textContent = (+(toyCounter.textContent as string) - 1).toString();
//           if ((toyCounter.textContent as string) === '0') {
//             toyImg.classList.add('hide');
//           }
//           document.removeEventListener('mousemove', onMouseMove);
//           toyClone.onmouseup = null;
//         } else {
//           toyImg.classList.remove('hide');
//           toyCounter.textContent = (+(toyCounter.textContent as string) + 1).toString();
//           document.removeEventListener('mousemove', onMouseMove);
//           toyClone.onmouseup = null;
//           toyClone.style.top = '6px';
//           toyClone.style.left = '6px';
//           toyContainer.append(toyClone);
//         }
//       };
//     };
//     toyCount -= 1;
//   }
// }
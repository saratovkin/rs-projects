const droppableArea: HTMLElement = document.querySelector('.drop-zone') as HTMLElement;

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
    while (toyCount !== 0) {
      this.moveToy();
      toyCount -= 1;
    }
  }

  public moveToy() {
    let droppableFlag = false;
    const { toyImg, toyContainer, toyCounter } = this;
    const toyClone: HTMLImageElement = this.toyImg.cloneNode(true) as HTMLImageElement;
    this.toyImg.parentNode?.appendChild(toyClone);
    toyClone.ondragstart = function removeDefaultDrag() {
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
        toyClone.style.left = `${((pageX - toyClone.offsetWidth / 2) / window.innerWidth) * 100}%`;
        toyClone.style.top = `${((pageY - toyClone.offsetHeight / 2) / window.innerHeight) * 100}%`;
      }
      function onMouseMove(e: MouseEvent) {
        moveAt(e.pageX, e.pageY);
      }
      toyClone.style.position = 'absolute';
      document.querySelector('.toys-container')?.append(toyClone);
      moveAt(event.pageX, event.pageY);
      document.addEventListener('mousemove', onMouseMove);
      toyClone.onmouseup = function placeToy() {
        toyCounter.textContent = (toyContainer.children.length - 2).toString();
        if (droppableFlag) {
          if ((toyCounter.textContent as string) === '0') {
            toyImg.classList.add('hide');
          }
          document.removeEventListener('mousemove', onMouseMove);
          toyClone.onmouseup = null;
        } else {
          toyImg.classList.remove('hide');
          document.removeEventListener('mousemove', onMouseMove);
          toyClone.onmouseup = null;
          toyClone.style.top = '6px';
          toyClone.style.left = '6px';
          toyContainer.append(toyClone);
          toyCounter.textContent = (toyContainer.children.length - 2).toString();
        }
      };
    });
  }
}

export default ToyMove;

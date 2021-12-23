import ICondition from '../interfaces/ICondition';

class FilterView {
  public static drawFilters(): void {
    ['shape', 'color', 'size', 'fav'].forEach((item) => {
      FilterView.addFilterNode(item);
    });
  }

  public static showDefaultFilters(): void {
    ['shape', 'color', 'size', 'fav'].forEach((item) => {
      document.querySelectorAll(`.${item}-option`).forEach((node) => {
        node.classList.remove('clicked');
      });
    });
  }

  public static showDefaultSort(): void {
    (document.querySelector('.sort-select') as HTMLSelectElement).selectedIndex = 0;
  }

  public static showSelectedFilters(condition: ICondition): void {
    let index = 0;
    if (condition.sortType === 'name') index = 0;
    if (condition.sortType === 'name-desc') index = 1;
    if (condition.sortType === 'year') index = 2;
    if (condition.sortType === 'year-desc') index = 3;
    ['shape', 'color', 'size'].forEach((item) => {
      document.querySelectorAll(`.${item}-option`).forEach((node) => {
        if (condition.shape.includes(node.getAttribute('filter') as string)) {
          node.classList.add('clicked');
        }
        if (condition.color.includes(node.getAttribute('filter') as string)) {
          node.classList.add('clicked');
        }
        if (condition.size.includes(node.getAttribute('filter') as string)) {
          node.classList.add('clicked');
        }
      });
    });
    if (condition.favorite) {
      document.querySelector('.fav-option')?.classList.add('clicked');
    }
    (document.querySelector('.sort-select') as HTMLSelectElement).selectedIndex = index as number;
  }

  private static getAttributes(type: string): string[] {
    switch (type) {
      case 'shape':
        return ['шар', 'фигурка', 'колокольчик', 'шишка', 'снежинка'];
      case 'color':
        return ['желтый', 'зелёный', 'красный', 'белый', 'синий'];
      case 'size':
        return ['малый', 'средний', 'большой'];
      case 'fav':
        return ['false'];
      default:
        return [''];
    }
  }

  private static getBg(index: number): string {
    switch (index) {
      case 0:
        return 'ball.svg';
      case 1:
        return 'toy.svg';
      case 2:
        return 'bell.svg';
      case 3:
        return 'cone.svg';
      case 4:
        return 'snowflake.svg';
      default:
        return '';
    }
  }

  private static getColor(index: number): string {
    switch (index) {
      case 0:
        return '#fdd700';
      case 1:
        return '#08aa05';
      case 2:
        return '#fd0000';
      case 3:
        return '#fff';
      case 4:
        return '#2299eb';
      default:
        return '';
    }
  }

  private static getTitle(type: string): string {
    switch (type) {
      case 'shape':
        return 'Форма';
      case 'color':
        return 'Цвет';
      case 'size':
        return 'Размер';
      case 'fav':
        return 'Только любимые';
      default:
        return '';
    }
  }

  private static addFilterNode(type: string): void {
    const newNode = document.createElement('div');
    newNode.className = `${type}-filters`;
    const nodeTitle = document.createElement('span');
    nodeTitle.textContent = `${FilterView.getTitle(type)}:`;
    newNode.appendChild(nodeTitle);
    const attributes = FilterView.getAttributes(type);
    attributes.forEach((item, index) => {
      const newType = document.createElement('div');
      newType.className = `${type}-option`;
      newType.setAttribute('filter', item);
      if (type === 'shape') {
        newType.style.backgroundImage = `url("svg/${FilterView.getBg(index)}")`;
      }
      if (type === 'color') {
        newType.style.backgroundColor = FilterView.getColor(index) as string;
      }
      if (type === 'size') {
        newType.style.backgroundImage = 'url("svg/ball.svg")';
      }
      newNode.appendChild(newType);
    });
    document.querySelector('.filter-option')?.appendChild(newNode);
  }
}

export default FilterView;

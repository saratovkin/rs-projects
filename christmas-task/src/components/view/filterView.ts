class FilterView {

  public drawFilters() {
    ['shape', 'color', 'size', 'fav'].forEach(item => {
      this.addFilterNode(item);
    });
  }

  public defaultFilters() {
    ['shape', 'color', 'size', 'fav'].forEach(item => {
      document.querySelectorAll(`.${item}-option`).forEach(node => {
        node.classList.remove('clicked');
      })
    });
    (document.querySelector('.sort-select') as any).selectedIndex = 0;
  }

  private getAttributes(type: string): string[] {
    switch (type) {
      case 'shape':
        return ['шар', 'фигурка', 'колокольчик', 'шишка', 'снежинка'];
      case 'color':
        return ['желтый', 'зелёный', 'красный', 'белый', 'синий'];
      case 'size':
        return ['малый', 'средний', 'большой'];
      case 'fav':
        return ['false'];
    }
  }

  private getBg(index: number) {

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
    }
  }

  private getColor(index: number) {

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
    }
  }

  private getTitle(type: string): string {

    switch (type) {
      case 'shape':
        return 'Форма';
      case 'color':
        return 'Цвет';
      case 'size':
        return 'Размер';
      case 'fav':
        return 'Только любимые';
    }
  }

  private addFilterNode(type: string) {

    const newNode = document.createElement('div');
    newNode.className = `${type}-filters`;

    const nodeTitle = document.createElement('span');
    nodeTitle.textContent = this.getTitle(type) + ':';
    newNode.appendChild(nodeTitle);

    const attributes = this.getAttributes(type);
    attributes.forEach((item, index) => {

      const newType = document.createElement('div');
      newType.className = `${type}-option`;
      newType.setAttribute('filter', item);

      if (type == 'shape') {
        newType.style.backgroundImage = `url("svg/${this.getBg(index)}")`;
      }
      if (type == 'color') {
        newType.style.backgroundColor = this.getColor(index);
      }
      if (type == 'size') {
        newType.style.backgroundImage = `url("svg/ball.svg")`;
      }

      newNode.appendChild(newType);
    });

    document.querySelector('.filter-option').appendChild(newNode);
  }

}
export default FilterView;
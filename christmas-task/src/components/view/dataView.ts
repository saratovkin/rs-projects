import './decoration.css';
import './filter.css';
import FavToys from '../app/favToys'

class DataView {

  private favToys: FavToys;
  public constructor() {
    this.favToys = new FavToys();
  }
  private drawDecorations(data: any): void {
    const decorations: any = data;
    const fragment: DocumentFragment = document.createDocumentFragment();
    const decorationCard: HTMLTemplateElement = <HTMLTemplateElement>document.querySelector('#decorationTemplate');

    decorations.forEach((item: any) => {

      const decorationCardClone: HTMLTemplateElement = <HTMLTemplateElement>decorationCard.content.cloneNode(true);

      (decorationCardClone.querySelector('.decoration-image') as HTMLImageElement).src = `toys/${item.num}.png`;
      (decorationCardClone.querySelector('.decoration-image') as HTMLImageElement).alt = item.num;
      decorationCardClone.querySelector('.decoration-image').addEventListener('click', (e) => this.favToys.toggleFav(e));
      decorationCardClone.querySelector('.decoration-name').textContent = item.name;
      decorationCardClone.querySelector('.decoration-count').textContent = `Количество: ${item.count}`;
      decorationCardClone.querySelector('.decoration-year').textContent = `Год покупки: ${item.year}`;
      decorationCardClone.querySelector('.decoration-shape').textContent = `Форма игрушки: ${item.shape}`;
      decorationCardClone.querySelector('.decoration-color').textContent = `Цвет игрушки: ${item.color}`;
      decorationCardClone.querySelector('.decoration-size').textContent = `Размер игрушки: ${item.size}`;
      decorationCardClone.querySelector('.decoration-is-fav').textContent = item.favorite ? 'Любимая: да' : 'Любимая: нет';

      if (this.favToys.favList.includes(item.num)) {
        decorationCardClone.querySelector('.decoration').classList.add('fav-toy');
      }
      fragment.append(decorationCardClone);
    });

    document.querySelector('.decorations-container').appendChild(fragment);
  }

  private clearDecorations() {

    document.querySelectorAll('.decoration').forEach(item => {
      item.remove();
    });
  }

  public updateDecorations(data: any) {
    this.clearDecorations();
    this.drawDecorations(data);
  }
}

export default DataView;
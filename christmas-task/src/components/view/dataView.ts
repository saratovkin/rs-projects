import './decoration.css';
import './filter.css';

import IToy from '../interfaces/IToy';

import FavToys from '../app/favToys';
import TreePage from '../app/treePage';

class DataView {
  private treePage: TreePage;

  private favToys: FavToys;

  public constructor() {
    this.favToys = new FavToys();
    this.treePage = new TreePage();
  }

  public setToys(data: IToy[]) {
    this.treePage.setToys(data);
  }

  private drawDecorations(data: IToy[]): void {
    this.showFavToys();
    const decorations: IToy[] = data;
    const fragment: DocumentFragment = document.createDocumentFragment();
    const decorationCard: HTMLTemplateElement = <HTMLTemplateElement>document.querySelector('#decorationTemplate');
    decorations.forEach((item: IToy) => {
      const decorationCardClone: HTMLTemplateElement = <HTMLTemplateElement>decorationCard.content
        .cloneNode(true);
      (decorationCardClone.querySelector('.decoration-image') as HTMLImageElement).src = `toys/${item.num}.png`;
      (decorationCardClone.querySelector('.decoration-image') as HTMLImageElement).alt = item.num;
      decorationCardClone.querySelector('.decoration-image')?.addEventListener('click', (e) => {
        this.favToys.toggleFav(e);
        this.showFavToys();
      });
      decorationCardClone.querySelector('.decoration-name')!.textContent = item.name;
      decorationCardClone.querySelector('.decoration-count')!.textContent = `Количество: ${item.count}`;
      decorationCardClone.querySelector('.decoration-year')!.textContent = `Год покупки: ${item.year}`;
      decorationCardClone.querySelector('.decoration-shape')!.textContent = `Форма игрушки: ${item.shape}`;
      decorationCardClone.querySelector('.decoration-color')!.textContent = `Цвет игрушки: ${item.color}`;
      decorationCardClone.querySelector('.decoration-size')!.textContent = `Размер игрушки: ${item.size}`;
      decorationCardClone.querySelector('.decoration-is-fav')!.textContent = item.favorite ? 'Любимая: да' : 'Любимая: нет';
      if (this.favToys.favList.includes(item.num)) {
        decorationCardClone.querySelector('.decoration')?.classList.add('fav-toy');
      }
      fragment.append(decorationCardClone);
    });
    document.querySelector('.decorations-container')?.appendChild(fragment);
  }

  private static clearDecorations(): void {
    document.querySelectorAll('.decoration').forEach((item) => {
      item.remove();
    });
  }

  public clearFavToys() {
    this.favToys.clearFav();
  }

  public updateDecorations(data: IToy[]): void {
    DataView.clearDecorations();
    this.drawDecorations(data);
  }

  public showFavToys() {
    this.treePage.setFavList(this.favToys.favList);
    this.treePage.showFavToys();
  }
}

export default DataView;

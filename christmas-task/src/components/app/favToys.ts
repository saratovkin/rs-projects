import SavedFilters from './savedFilters';

const favLimit = 20;

class FavToys {
  public favList: string[];

  private savedFilters: SavedFilters;

  constructor() {
    this.savedFilters = new SavedFilters();
    this.favList = this.savedFilters.favList;
    this.updateCounter();
  }

  public toggleFav(e: Event): void {
    const index: string = (e.target as HTMLImageElement).alt;
    if (this.favList.includes(index)) {
      this.favList.splice(this.favList.indexOf(index), 1);
      ((e.target as HTMLElement).parentNode as HTMLElement).classList.remove('fav-toy');
    } else if (this.favList.length < favLimit) {
      this.favList.push(index);
      ((e.target as HTMLElement).parentNode as HTMLElement).classList.add('fav-toy');
    } else {
      FavToys.showAlertMessage(((e.target as HTMLElement).parentNode));
    }
    SavedFilters.setFavToys(this.favList);
    this.updateCounter();
  }

  private static showAlertMessage(node: Node | null): void {
    if (node !== null) {
      (node as HTMLElement).querySelector('.fav-limit')?.classList.remove('hide');
      setTimeout(() => (node as HTMLElement).querySelector('.fav-limit')?.classList.add('hide'), 1500);
    }
  }

  private updateCounter(): void {
    const node: Element | null = document.querySelector('.fav-count');
    if (node != null) {
      node.textContent = this.favList.length.toString();
    }
  }

  public clearFav(): void {
    this.favList = [];
    this.updateCounter();
    document.querySelectorAll('.fav-toy').forEach((item) => {
      item.classList.remove('fav-toy');
    });
  }
}

export default FavToys;

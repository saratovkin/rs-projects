import SavedSettings from './savedSettings';

const favLimit: number = 20;

class FavToys {

  public favList: string[];
  private timer: NodeJS.Timer;
  private savedSettings: SavedSettings;
  constructor() {
    this.savedSettings = new SavedSettings;
    this.favList = this.savedSettings.favList;
    this.updateCounter();
  }

  public toggleFav(e: Event) {

    let index: string = (e.target as HTMLImageElement).alt;
    if (this.favList.includes(index)) {
      this.favList.splice(this.favList.indexOf(index), 1);
      ((e.target as HTMLElement).parentNode as HTMLElement).classList.remove('fav-toy');
    } else if (this.favList.length < favLimit) {
      this.favList.push(index);
      ((e.target as HTMLElement).parentNode as HTMLElement).classList.add('fav-toy');
    } else {
      this.showAlertMessage(e);
    }
    this.savedSettings.setFavToys(this.favList);
    this.updateCounter();
  }

  private showAlertMessage(e: Event) {
    (e.target as HTMLElement).parentElement.querySelector('.fav-limit').classList.remove('hide');
    this.timer = setTimeout(() =>
      (e.target as HTMLElement).parentElement.querySelector('.fav-limit').classList.add('hide'), 1500);
  }

  private updateCounter() {
    document.querySelector('.fav-count').textContent = this.favList.length.toString();
  }
}

export default FavToys;
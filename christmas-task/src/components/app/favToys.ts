import toggle from '../misc/toggle'

const favLimit: number = 20;

class FavToys {

  public favList: string[];
  constructor() {
    this.favList = [];
  }

  public toggleFav(e: Event) {

    let index: string = (e.target as HTMLImageElement).alt; //index of current clicked toy
    if (this.favList.includes(index)) {
      this.favList.splice(this.favList.indexOf(index), 1);
      ((e.target as HTMLElement).parentNode as HTMLElement).classList.remove('fav-toy'); //add or remove class of clicked toy
    } else if (this.favList.length < favLimit) {
      this.favList.push(index);
      ((e.target as HTMLElement).parentNode as HTMLElement).classList.add('fav-toy'); //add or remove class of clicked toy
    } else {
      alert('limit!');
    }
    this.updateCounter();
  }

  private updateCounter() {
    document.querySelector('.fav-counter').textContent = this.favList.length.toString();
  }
}

export default FavToys;
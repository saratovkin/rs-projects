import IToy from '../interfaces/IToy';
import ToysView from '../view/toysView';
import TreeView from '../view/treeView';
import Effects from '../view/effects';

class TreePage {
  private toys: IToy[];

  private favList: string[];

  private favToys: IToy[];

  private effects: Effects;

  constructor() {
    this.toys = [];
    this.favList = [];
    this.favToys = [];
    TreeView.initBtns();
    this.effects = new Effects();
    this.effects.initEffectsButtons();
  }

  public setToys(toys: IToy[]): void {
    this.toys = toys;
  }

  public setFavList(favList: string[]): void {
    this.favList = favList;
  }

  private getFavToys(): void {
    this.toys.forEach((item) => {
      if (this.favList.includes(item.num)) {
        this.favToys.push(item);
      }
    });
    if (this.favToys.length === 0) {
      this.favToys = this.toys.slice(0, 20);
    }
  }

  public showFavToys() {
    ToysView.clearToys();
    this.favToys = [];
    this.getFavToys();
    ToysView.showToys(this.favToys);
  }
}

export default TreePage;

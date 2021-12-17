import ICondition from '../interfaces/ICondition';

class savedSettings {
  public savedCondition: ICondition;
  public favList: string[];
  constructor() {
    this.savedCondition = JSON.parse(localStorage.getItem('condition') as string) || {
      count: [],
      year: [],
      shape: [],
      color: [],
      size: [],
      favorite: false,
      sortType: 'name',
      searchKey: ''
    }
    this.favList = JSON.parse(localStorage.getItem('favList') as string) || [];
  }

  public setCondition(condition: ICondition): void {
    localStorage.setItem('condition', JSON.stringify(condition));
  }

  public setDefault(): void {
    this.savedCondition = {
      count: [],
      year: [],
      shape: [],
      color: [],
      size: [],
      favorite: false,
      sortType: 'name',
      searchKey: ''
    }
    this.setCondition(this.savedCondition);
    this.setFavToys([]);
  }

  public setFavToys(favList: string[]): void {
    localStorage.setItem('favList', JSON.stringify(favList));
  }

}

export default savedSettings;
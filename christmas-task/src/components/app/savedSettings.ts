import ICondition from '../interfaces/ICondition';

class savedSettings {
  public savedCondition: ICondition;

  public favList: string[];

  constructor() {
    this.savedCondition = JSON.parse(localStorage.getItem('condition') as string) || {
      count: ['1', '12'],
      year: ['1940', '2020'],
      shape: [],
      color: [],
      size: [],
      favorite: false,
      sortType: 'name',
      searchKey: '',
    };
    this.favList = JSON.parse(localStorage.getItem('favList') as string) || [];
  }

  static setCondition(condition: ICondition): void {
    localStorage.setItem('condition', JSON.stringify(condition));
  }

  public setDefault(): void {
    this.savedCondition = {
      count: ['1', '12'],
      year: ['1940', '2020'],
      shape: [],
      color: [],
      size: [],
      favorite: false,
      sortType: 'name',
      searchKey: '',
    };
    savedSettings.setCondition(this.savedCondition);
    savedSettings.setFavToys([]);
  }

  static setFavToys(favList: string[]): void {
    localStorage.setItem('favList', JSON.stringify(favList));
  }
}

export default savedSettings;

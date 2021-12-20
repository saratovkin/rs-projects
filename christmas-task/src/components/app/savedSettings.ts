import ICondition from '../interfaces/ICondition';
import constValues from '../misc/constValues';

class savedSettings {
  public savedCondition: ICondition;

  public favList: string[];

  constructor() {
    this.savedCondition = JSON.parse(localStorage.getItem('condition') as string) || {
      count: [constValues.minCount, constValues.maxCount],
      year: [constValues.minYear, constValues.maxYear],
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
      count: [constValues.minCount, constValues.maxCount],
      year: [constValues.minYear, constValues.maxYear],
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

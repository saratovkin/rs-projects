import ICondition from '../interfaces/ICondition';
import constValues from '../misc/constValues';

class savedFilters {
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

  public setDefaultFilter(): void {
    this.savedCondition = {
      count: [constValues.minCount, constValues.maxCount],
      year: [constValues.minYear, constValues.maxYear],
      shape: [],
      color: [],
      size: [],
      favorite: false,
      sortType: this.savedCondition.sortType,
      searchKey: this.savedCondition.searchKey,
    };
    savedFilters.setCondition(this.savedCondition);
  }

  public setDefaultFav(): void {
    this.savedCondition.sortType = 'name';
    this.savedCondition.searchKey = '';
    savedFilters.setCondition(this.savedCondition);
    savedFilters.setFavToys([]);
  }

  static setFavToys(favList: string[]): void {
    localStorage.setItem('favList', JSON.stringify(favList));
  }
}

export default savedFilters;

interface ICondition {
  count: string[];
  year: string[];
  shape: string[];
  color: string[];
  size: string[];
  favorite: boolean;
  sortType: string;
  searchKey: string;
}

class savedSettings {
  public savedCondition: ICondition;
  public favList: string[];
  constructor() {
    this.savedCondition = JSON.parse(localStorage.getItem('condition')) || {
      count: [],
      year: [],
      shape: [],
      color: [],
      size: [],
      favorite: false,
      sortType: 'name',
      searchKey: ''
    }
    this.favList = JSON.parse(localStorage.getItem('favList')) || [];
  }

  public setCondition(condition: ICondition) {
    localStorage.setItem('condition', JSON.stringify(condition));
  }

  public setDefault() {
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

  public setFavToys(favList: string[]) {
    localStorage.setItem('favList', JSON.stringify(favList));
  }

}

export default savedSettings;
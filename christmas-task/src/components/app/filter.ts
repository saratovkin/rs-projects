import toggle from '../misc/toggle';
import constValues from '../misc/constValues';

import Slider from '../nouislider/sliderInit';
import FilterView from '../view/filterView';
import DataView from '../view/dataView';
import SavedSettings from './savedFilters';

import IToy from '../interfaces/IToy';
import ICondition from '../interfaces/ICondition';

class Filter {
  private data: IToy[];

  private condition: ICondition;

  private slider: Slider;

  private filteredData: IToy[];

  private dataView: DataView;

  private savedSettings: SavedSettings;

  public constructor() {
    this.slider = new Slider();
    this.dataView = new DataView();
    this.savedSettings = new SavedSettings();
    this.condition = this.savedSettings.savedCondition;
    this.data = [];
    this.filteredData = [];
  }

  public setData(data: IToy[]): void {
    this.data = data;
    this.filteredData = this.data;
    this.dataView.setToys(this.data);
  }

  private compareFunc(toy: IToy): boolean {
    let res = true;
    if (this.condition.shape.length !== 0) {
      res = this.condition.shape.includes(toy.shape);
      if (!res) {
        return false;
      }
    }
    if (this.condition.color.length !== 0) {
      res = this.condition.color.includes(toy.color);
      if (!res) {
        return false;
      }
    }
    if (this.condition.size.length !== 0) {
      res = this.condition.size.includes(toy.size);
      if (!res) {
        return false;
      }
    }
    if (this.condition.count.length !== 0) {
      res = +this.condition.count[0] <= +toy.count && +this.condition.count[1] >= +toy.count;
      if (!res) {
        return false;
      }
    }
    if (this.condition.year.length !== 0) {
      res = +this.condition.year[0] <= +toy.year && +this.condition.year[1] >= +toy.year;
      if (!res) {
        return false;
      }
    }
    if (this.condition.favorite) {
      res = Boolean(toy.favorite);
    }
    return res;
  }

  private updateCondition(type: string, param: string | string[]): void {
    if (type === 'count') {
      this.condition.count = param as string[];
    }
    if (type === 'year') {
      this.condition.year = param as string[];
    }
    if (type === 'shape') {
      toggle(this.condition.shape, param as string);
    }
    if (type === 'color') {
      toggle(this.condition.color, param as string);
    }
    if (type === 'size') {
      toggle(this.condition.size, param as string);
    }
    if (type === 'fav') {
      this.condition.favorite = !this.condition.favorite;
    }
    if (type === 'sort') {
      this.condition.sortType = param as string;
    }
    if (type === 'search') {
      this.condition.searchKey = param as string;
    }
    SavedSettings.setCondition(this.condition);
  }

  private setSortType(e: Event): void {
    if (e) {
      this.updateCondition('sort', (e.currentTarget as HTMLInputElement).value);
    }
    this.showFiltered();
  }

  private setShape(type: string, e: Event): void {
    const param = (e.target as HTMLElement).getAttribute('filter');
    if (param) {
      this.updateCondition(type, param as string);
      (e.target as HTMLElement).classList.toggle('clicked');
      this.showFiltered();
    }
  }

  private static showSliderRanges(type: string, param: string[]): void {
    const leftRange: Node | null = document.querySelector(`.${type}-from`);
    const rightRange: Node | null = document.querySelector(`.${type}-to`);
    const [leftValue, rightValue] = param;
    if (leftRange !== null) {
      leftRange.textContent = leftValue?.split('.').shift() as string;
    }
    if (rightRange !== null) {
      rightRange.textContent = rightValue?.split('.').shift() as string;
    }
  }

  private setRange(type: string, param: string[]): void {
    Filter.showSliderRanges(type, param);
    this.updateCondition(type, param);
    this.showFiltered();
  }

  private setSearchKey(e: Event): void {
    const searchStr = (e.target as HTMLInputElement).value.toLowerCase();
    this.updateCondition('search', searchStr);
    this.showFiltered();
  }

  private getFilteredData(): void {
    this.filteredData = this.data.filter((elem) => this.compareFunc(elem));
    this.filteredData = this.filteredData
      .filter((elem) => elem.name.toLowerCase().indexOf(this.condition.searchKey) !== -1);
    const sortTemp: string[] = this.condition.sortType.split('-');
    if (sortTemp[0] === 'name') {
      this.filteredData.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortTemp[0] === 'year') {
      this.filteredData.sort((a, b) => (+a.year - +b.year));
    }
    if (sortTemp[1]) {
      this.filteredData = this.filteredData.reverse();
    }
  }

  private showFiltered(): void {
    Filter.toggleSearchAlert(false);
    this.getFilteredData();
    this.dataView.updateDecorations(this.filteredData);
    if (this.filteredData.length === 0) {
      Filter.toggleSearchAlert(true);
    }
  }

  private static toggleSearchAlert(flag: boolean): void {
    const node: Element | null = document.querySelector('.search-alert');
    if (node !== null) {
      if (flag) {
        node.classList.remove('hide');
      } else {
        node.classList.add('hide');
      }
    }
  }

  private clearFilters(): void {
    this.slider.countSlider!.noUiSlider!.reset();
    this.slider.yearSlider!.noUiSlider!.reset();
    this.condition = {
      count: [constValues.minCount, constValues.maxCount],
      year: [constValues.minYear, constValues.maxYear],
      shape: [],
      color: [],
      size: [],
      favorite: false,
      sortType: this.condition.sortType,
      searchKey: this.condition.searchKey,
    };
    FilterView.showDefaultFilters();
    this.savedSettings.setDefaultFilter();
    this.showFiltered();
  }

  private clearFavToys(): void {
    this.dataView.clearFavToys();
    this.condition.sortType = 'name';
    this.condition.searchKey = '';
    FilterView.showDefaultSort();
    this.savedSettings.setDefaultFav();
    this.showFiltered();
  }

  private showFilterValues(): void {
    FilterView.showSelectedFilters(this.condition);
    this.slider.countSlider!.noUiSlider!.set(this.condition.count);
    this.slider.yearSlider!.noUiSlider!.set(this.condition.year);
    (document.querySelector('.search') as HTMLInputElement).value = this.condition.searchKey;
    this.setRange('year', this.condition.year);
    this.setRange('count', this.condition.count);
  }

  private initFilters(): void {
    FilterView.drawFilters();
    ['shape', 'color', 'size', 'fav'].forEach((item) => {
      document.querySelector(`.${item}-filters`)
        ?.addEventListener('click', (e: Event) => this.setShape(item, e));
    });
    this.slider.countSlider!.noUiSlider!.on('slide', () => {
      this.setRange('count', (this.slider.countSlider!.noUiSlider!.get() as string[]));
    });
    this.slider.yearSlider!.noUiSlider!.on('slide', () => {
      this.setRange('year', (this.slider.yearSlider!.noUiSlider!.get() as string[]));
    });
    document.querySelector('.sort-select')?.addEventListener('change', (e: Event) => this.setSortType(e));
    document.querySelector('.reset-filter')?.addEventListener('click', () => this.clearFilters());
    document.querySelector('.reset-fav')?.addEventListener('click', () => this.clearFavToys());
    document.querySelector('.search')?.addEventListener('input', (e) => this.setSearchKey(e));
  }

  public start(): void {
    this.initFilters();
    this.showFilterValues();
    this.showFiltered();
  }
}

export default Filter;

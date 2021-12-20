import toggle from '../misc/toggle'

import Slider from "../nouislider/sliderInit";
import FilterView from '../view/filterView';
import DataView from '../view/dataView'
import SavedSettings from './savedSettings';

import IToy from '../interfaces/IToy';
import ICondition from '../interfaces/ICondition';

class Filter {

  private data: IToy[];
  private condition: ICondition;
  private slider: Slider;
  private filteredData: IToy[];
  private filterView: FilterView;
  private dataView: DataView;
  private SavedSettings: SavedSettings;

  public constructor() {
    this.slider = new Slider();
    this.filterView = new FilterView();
    this.dataView = new DataView();
    this.SavedSettings = new SavedSettings();
    this.condition = this.SavedSettings.savedCondition;
    this.data = [];
    this.filteredData = [];
  }

  public setData(data: IToy[]): void {
    this.data = data;
    this.filteredData = this.data;
  }

  private compareFunc(toy: IToy): boolean {
    let res = true;
    if (this.condition.shape.length != 0) {
      res = this.condition.shape.includes(toy.shape);
      if (!res) {
        return false;
      }
    }
    if (this.condition.color.length != 0) {
      res = this.condition.color.includes(toy.color);
      if (!res) {
        return false;
      }
    }
    if (this.condition.size.length != 0) {
      res = this.condition.size.includes(toy.size);
      if (!res) {
        return false;
      }
    }
    if (this.condition.count.length != 0) {
      res = +this.condition.count[0] <= +toy.count && +this.condition.count[1] >= +toy.count;
      if (!res) {
        return false;
      }
    }
    if (this.condition.year.length != 0) {
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
    this.SavedSettings.setCondition(this.condition);
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
      this.updateCondition(type, param);
      (e.target as HTMLElement).classList.toggle('clicked');
    }
    this.showFiltered();
  }

  private showSliderRanges(type: string, param: string[]): void {
    let leftRange: Node | null = document.querySelector(`.${type}-from`);
    let rightRange: Node | null = document.querySelector(`.${type}-to`);
    if (leftRange !== null) {
      leftRange.textContent = param[0].split('.')[0];
    }
    if (rightRange !== null) {
      rightRange.textContent = param[1].split('.')[0];
    }
  }

  private setRange(type: string, param: string[]): void {
    this.showSliderRanges(type, param);
    this.updateCondition(type, param);
    this.showFiltered();
  }

  private setSearchKey(e: Event): void {
    let searchStr = (e.target as HTMLInputElement).value.toLowerCase();
    this.updateCondition('search', searchStr);
    this.showFiltered();
  }

  private getFilteredData(): void {
    this.filteredData = this.data.filter(e => this.compareFunc(e));
    this.filteredData = this.filteredData.filter(elem => elem.name.toLowerCase().indexOf(this.condition.searchKey) != -1);
    let sortTemp: string[] = this.condition.sortType.split('-');
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
    this.toggleSearchAlert(false);
    this.getFilteredData();
    this.dataView.updateDecorations(this.filteredData);
    if (this.filteredData.length === 0) {
      this.toggleSearchAlert(true);
    }
  }

  private toggleSearchAlert(flag: boolean): void {
    let node: Element | null = document.querySelector('.search-alert');
    if (node !== null) {
      if (flag) {
        node.classList.remove('hide');
      }
      else {
        node.classList.add('hide');
      }
    }
  }

  private clearFilters(): void {
    this.filterView.showDefaultFilters();
    (this.slider.countSlider as any).noUiSlider.reset();
    (this.slider.yearSlider as any).noUiSlider.reset();
    this.condition = {
      count: [],
      year: [],
      shape: [],
      color: [],
      size: [],
      favorite: false,
      sortType: 'name',
      searchKey: ''
    }
    this.SavedSettings.setDefault();
    this.showFiltered();
    (document.querySelector('.search') as HTMLInputElement).value = '';
  }

  private showFilterValues(): void {
    this.filterView.showSelectedFilters(this.condition);
    (this.slider.countSlider as any).noUiSlider.set(this.condition.count);
    (this.slider.yearSlider as any).noUiSlider.set(this.condition.year);
    (document.querySelector('.search') as HTMLInputElement).value = this.condition.searchKey;
  }

  private initFilters(): void {
    this.filterView.drawFilters();
    ['shape', 'color', 'size', 'fav'].forEach(item => {
      document.querySelector(`.${item}-filters`)?.
        addEventListener('click', (e: Event) => this.setShape(item, e));
    });
    (this.slider.countSlider as any).noUiSlider.on('slide', () => {
      this.setRange('count', ((this.slider.countSlider as any).noUiSlider.get()))
    });
    (this.slider.yearSlider as any).noUiSlider.on('slide', () => {
      this.setRange('year', ((this.slider.yearSlider as any).noUiSlider.get()))
    });
    document.querySelector('.sort-select')?.addEventListener('change', (e: Event) => this.setSortType(e));
    document.querySelector('.reset-filter')?.addEventListener('click', () => { this.clearFilters() });
    document.querySelector('.search')?.addEventListener('input', (e) => this.setSearchKey(e));
  }

  public start(): void {
    this.initFilters();
    this.showFilterValues();
    this.showFiltered();
  }
}

export default Filter;
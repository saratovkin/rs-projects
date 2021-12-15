import toggle from '../misc/toggle'

import Slider from "../nouislider/sliderInit";
import FilterView from '../view/filterView';
import DataView from '../view/dataView'

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

class Filter {

  private data: any[];
  private condition: ICondition;
  private slider: Slider;
  private filteredData: any[];
  private filterView: FilterView;
  private dataView: DataView;

  public constructor(data: any[]) {
    this.data = data;
    this.filteredData = this.data;
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
    this.slider = new Slider();
    this.filterView = new FilterView();
    this.dataView = new DataView();

  }
  private compareFunc(e: any) {
    let res = true;
    if (this.condition.shape.length != 0) {
      res = this.condition.shape.includes(e.shape);
      if (!res) {
        return false;
      }
    }
    if (this.condition.color.length != 0) {
      res = this.condition.color.includes(e.color);
      if (!res) {
        return false;
      }
    }
    if (this.condition.size.length != 0) {
      res = this.condition.size.includes(e.size);
      if (!res) {
        return false;
      }
    }
    if (this.condition.count.length != 0) {
      res = +this.condition.count[0] <= +e.count && +this.condition.count[1] >= +e.count;
      if (!res) {
        return false;
      }
    }
    if (this.condition.year.length != 0) {
      res = +this.condition.year[0] <= +e.year && +this.condition.year[1] >= +e.year;
      if (!res) {
        return false;
      }
    }
    if (this.condition.favorite) {
      res = Boolean(e.favorite);
    }
    return res;
  }

  private updateCondition(type: string, param: string | string[]) {
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
      this.condition.favorite = !this.condition.favorite
    }
    if (type === 'sort') {
      this.condition.sortType = param as string;
    }
    if (type === 'search') {
      this.condition.searchKey = param as string;
    }
  }

  private setSortType(e: Event) {
    if (e) {
      this.updateCondition('sort', (e.currentTarget as HTMLInputElement).value);
    }
    this.showFiltered();
  }

  private setShape(type: string, e: any) {

    const param = e.target.getAttribute('filter');
    if (param) {
      this.updateCondition(type, param);
      e.target.classList.toggle('clicked');
    }
    this.showFiltered();
  }

  private setRange(type: string, param: string[]) {
    this.updateCondition(type, param);
    this.showFiltered();
  }

  private setSearchKey(e: Event) {
    let searchStr = (e.target as HTMLInputElement).value.toLowerCase();
    this.updateCondition('search', searchStr);
    this.showFiltered();
  }

  private showFiltered() {
    this.toggleSearchAlert(false);
    this.filteredData = this.data.filter(e => this.compareFunc(e));
    this.filteredData = this.filteredData.filter(elem => elem.name.toLowerCase().indexOf(this.condition.searchKey) != -1);
    let sortTemp: string[] = this.condition.sortType.split('-');
    if (sortTemp[0] === 'name') {
      this.filteredData.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortTemp[0] === 'year') {
      this.filteredData.sort((a, b) => (a.year - b.year));
    }
    if (sortTemp[1]) {
      this.filteredData = this.filteredData.reverse();
    }
    this.dataView.updateDecorations(this.filteredData);
    if (this.filteredData.length === 0) {
      this.toggleSearchAlert(true);
    }
  }

  private toggleSearchAlert(flag: boolean) {
    if (flag) {
      document.querySelector('.search-alert').classList.remove('hide');
    } else {
      document.querySelector('.search-alert').classList.add('hide');
    }
  }

  private clearFilters() {
    this.filterView.defaultFilters();
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
    this.dataView.updateDecorations(this.data);
    (document.querySelector('.search') as HTMLInputElement).value = '';
  }

  public initFilters() {
    this.filterView.drawFilters();
    ['shape', 'color', 'size', 'fav'].forEach(item => {
      document.querySelector(`.${item}-filters`).
        addEventListener('click', (e: Event) => this.setShape(item, e));
    });
    (this.slider.countSlider as any).noUiSlider.on('update', () => {
      this.setRange('count', ((this.slider.countSlider as any).noUiSlider.get()))
    });
    (this.slider.yearSlider as any).noUiSlider.on('update', () => {
      this.setRange('year', ((this.slider.yearSlider as any).noUiSlider.get()))
    });
    document.querySelector('.sort-select').addEventListener('change', (e: Event) => this.setSortType(e));
    document.querySelector('.reset-filter').addEventListener('click', () => { this.clearFilters() });
    document.querySelector('.search').addEventListener('input', (e) => this.setSearchKey(e));
  }

}

export default Filter;



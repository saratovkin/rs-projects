import Slider from "../nouislider/sliderInit";
import FilterView from '../view/filterView';
import DataView from '../view/dataView'

interface ICondition {
  count: string[];
  year: string[];
  shape: string[];
  color: string[];
  size: string[];
  favorite: string;

}

function toggle(arr: any[], item: any) {
  if (!arr.includes(item)) {
    arr.push(item);
  } else {
    arr.splice(arr.indexOf(item), 1);
  }
  return arr;
}

class Filter {

  private data: any[];
  private condition: ICondition;
  private sortType: string;
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
      favorite: 'false'
    }
    this.slider = new Slider();
    this.filterView = new FilterView();
    this.dataView = new DataView();
    this.sortType = 'name';
  }

  private updateCondition(type: string, param: string | string[]) {
    if (type === 'count') {
      this.condition.count = param as string[];
    }
    if (type === 'year') {
      this.condition.year = param as string[];
    }
    if (type === 'shape') {
      toggle(this.condition.shape, param);
    }
    if (type === 'color') {
      toggle(this.condition.color, param);
    }
    if (type === 'size') {
      toggle(this.condition.size, param);
    }
    if (type === 'favorite') {
      this.condition.favorite = param as string;
    }
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
    return res;
  }

  private getSorted(data: any[], e?: Event) {
    let args: string | string[];
    if (e) {
      args = (e.currentTarget as HTMLInputElement).value;
    } else {
      args = this.sortType;
    }
    args = args.split('-');
    if (args[0] === 'name') {
      this.sortType = 'name';
      data.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (args[0] === 'year') {
      this.sortType = 'year';
      data.sort((a, b) => (a.year - b.year));
    }
    if (args[1]) {
      this.sortType = this.sortType === 'name' ? 'name-desc' : 'year-desc';
      data = data.reverse();
    }
    this.filteredData = data;
    this.dataView.updateDecorations(this.filteredData);
  }

  // TODO merge into one function
  private getFilteredByView(type: string, e: any) {
    const param = e.target.getAttribute('filter');
    if (param) {
      this.updateCondition(type, param);
      e.target.classList.toggle('clicked');
      this.filteredData = this.data.filter(e => this.compareFunc(e));
      this.getSorted(this.filteredData);
    }
  }

  private getFilteredByRange(type: string, param: string[]) {
    this.updateCondition(type, param);
    this.dataView.updateDecorations(this.filteredData.filter(e => this.compareFunc(e)));
  }

  private search(e: Event) {
    let searchStr = (e.target as HTMLInputElement).value.toLowerCase();
    this.dataView.updateDecorations(this.filteredData.filter(elem => elem.name.toLowerCase().indexOf(searchStr) != -1));
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
      favorite: 'false',
    }
    this.dataView.updateDecorations(this.data);
    (document.querySelector('.search') as HTMLInputElement).value = '';
  }

  public initFilters() {
    this.filterView.drawFilters();
    ['shape', 'color', 'size', 'fav'].forEach(item => {
      document.querySelector(`.${item}-filters`).
        addEventListener('click', (e: Event) => this.getFilteredByView(item, e));
    });
    (this.slider.countSlider as any).noUiSlider.on('update', () => {
      this.getFilteredByRange('count', ((this.slider.countSlider as any).noUiSlider.get()))
    });
    (this.slider.yearSlider as any).noUiSlider.on('update', () => {
      this.getFilteredByRange('year', ((this.slider.yearSlider as any).noUiSlider.get()))
    });
    document.querySelector('.sort-select').addEventListener('change', (e: Event) => this.getSorted(this.filteredData, e));
    document.querySelector('.reset-filter').addEventListener('click', () => { this.clearFilters() });
    document.querySelector('.search').addEventListener('input', (e) => this.search(e));
  }

}

export default Filter;



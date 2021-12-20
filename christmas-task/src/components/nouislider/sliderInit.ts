import * as noUiType from 'nouislider';
import noUiSlider from './nouislider';
import constValues from '../misc/constValues';

class Slider {
  public countSlider: noUiType.target;

  public yearSlider: noUiType.target;

  constructor() {
    this.countSlider = document.getElementById('count-slider') as noUiType.target;
    this.yearSlider = document.getElementById('year-slider') as noUiType.target;
    noUiSlider.create(this.countSlider, {
      animate: false,
      start: [+constValues.minCount, +constValues.maxCount],
      step: 1,
      connect: true,
      range: {
        min: +constValues.minCount,
        max: +constValues.maxCount,
      },
    });
    noUiSlider.create(this.yearSlider, {
      animate: false,
      start: [+constValues.minYear, +constValues.maxYear],
      step: 10,
      connect: true,
      range: {
        min: +constValues.minYear,
        max: +constValues.maxYear,
      },
    });
  }
}

export default Slider;

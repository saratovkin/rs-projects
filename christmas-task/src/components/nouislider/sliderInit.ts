import * as noUiType from 'nouislider';
import noUiSlider from './nouislider';

class Slider {
  public countSlider: noUiType.target;

  public yearSlider: noUiType.target;

  constructor() {
    this.countSlider = document.getElementById('count-slider') as noUiType.target;
    this.yearSlider = document.getElementById('year-slider') as noUiType.target;
    noUiSlider.create(this.countSlider, {
      animate: false,
      start: [1, 12],
      step: 1,
      connect: true,
      range: {
        min: 1,
        max: 12,
      },
    });
    noUiSlider.create(this.yearSlider, {
      animate: false,
      start: [1940, 2020],
      step: 10,
      connect: true,
      range: {
        min: 1940,
        max: 2020,
      },
    });
  }
}

export default Slider;

import noUiSlider from './nouislider';


class Slider {

  public countSlider: HTMLElement;
  public yearSlider: HTMLElement;

  constructor() {

    this.countSlider = document.getElementById('count-slider');
    this.yearSlider = document.getElementById('year-slider');
    noUiSlider.create(this.countSlider, {
      start: [1, 12],
      step: 1,
      connect: true,
      range: {
        'min': 1,
        'max': 12
      },
      tooltips: true
    });
    noUiSlider.create(this.yearSlider, {
      start: [1940, 2020],
      step: 10,
      connect: true,
      range: {
        'min': 1940,
        'max': 2020
      },
      tooltips: true
    });
  }

}

export default Slider;
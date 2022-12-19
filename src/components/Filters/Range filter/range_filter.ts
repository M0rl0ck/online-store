import * as noUiSlider from '../../../../node_modules/nouislider/dist/nouislider';
import { createHtmlElement } from '../../../utils/createElement';
import 'nouislider/dist/nouislider.css';
import './range_filter.css';

export default class FilterRange {
  rangeInput: noUiSlider.target;
  min: number;
  max: number;
  constructor(values: number[], rangeValue: number[], className: string) {
    this.rangeInput = createHtmlElement('div', className);
    [this.min, this.max] = rangeValue;

    noUiSlider.create(this.rangeInput, {
      start: [this.min, this.max],
      // tooltips: true,
      step: 1,
      connect: true,
      format: {
        to: function (value) {
          return values[Math.round(value)];
        },
        from: function (value) {
          return values.indexOf(Number(value));
        },
      },
      range: {
        min: [0],
        max: [values.length - 1],
      },
    });
  }
}

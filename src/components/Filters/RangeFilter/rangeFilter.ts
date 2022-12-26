import * as noUiSlider from 'nouislider';
import { createHtmlElement } from '../../../utils/createElement';
import 'nouislider/dist/nouislider.css';
import './rangeFilter.css';

export default class FilterRange {
  rangeInput: noUiSlider.target;
  min: number;
  max: number;
  constructor(values: number[], rangeValue: number[], className: string) {
    this.rangeInput = createHtmlElement('div', className);
    [this.min, this.max] = rangeValue;

    noUiSlider.create(this.rangeInput, {
      start: [this.min, this.max],
      step: 1,
      connect: true,
      format: {
        to: value => values[Math.round(value)],
        from: value => values.indexOf(Number(value)),
      },
      range: {
        min: [0],
        max: [values.length - 1],
      },
    });
  }
}

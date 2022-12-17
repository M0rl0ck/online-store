import './left_filter.css';
import { createHtmlElement } from '../../../utils/createElement';
import FilterRange from '../Range filter/range_filter';

export default class LeftFilter {
  rangePrice: number[];
  rangeInputPrice: FilterRange;
  rangeStock: number[];
  rangeInputStock: FilterRange;
  priceDataFrom!: HTMLElement;
  priceDataTo!: HTMLElement;
  stockDataFrom!: HTMLElement;
  stockDataTo!: HTMLElement;
  constructor() {
    this.rangePrice = [10, 1750];
    this.rangeStock = [1, 150];
    this.rangeInputPrice = new FilterRange(this.rangePrice, 'input__range');
    this.rangeInputStock = new FilterRange(this.rangeStock, 'input__range');
  }
  createLeftFilter(): HTMLElement {
    const element = createHtmlElement('div', 'filters', '');
    const buttonsWrapper = createHtmlElement('div', 'reset__total', '', element);
    const buttonReset = createHtmlElement('button', 'reset__button', 'Reset Filters', buttonsWrapper);
    const buttonCopyLink = createHtmlElement('button', 'copy__button', 'Copy Link', buttonsWrapper);
    const categoryFilter = createHtmlElement('div', 'category__filter', '', element);
    const categoryFilterTitle = createHtmlElement('h3', 'category__filter-title', 'Category', categoryFilter);
    const categoryFilterList = createHtmlElement('div', 'filter__list', '', categoryFilter);
    const brandFilter = createHtmlElement('div', 'brand__filter', '', element);
    const brandFilterTitle = createHtmlElement('h3', 'brand__filter-title', 'Brand', brandFilter);
    const brandFilterList = createHtmlElement('div', 'filter__list', '', brandFilter);
    const priceDualSlider = createHtmlElement('div', 'price__slider', '', element);
    const priceDualSliderTitle = createHtmlElement('h3', 'price__slider-title', 'Price', priceDualSlider);
    const priceData = createHtmlElement('div', 'price__data', '', priceDualSlider);
    this.priceDataFrom = createHtmlElement('div', 'data__from', `€${this.rangePrice[0]}`, priceData);
    const dualArrow = createHtmlElement('span', 'data__arrow', ` ⟷ `, priceData);
    this.priceDataTo = createHtmlElement('div', 'data__to', `€${this.rangePrice[1]}.00`, priceData);
    const priceRangeWrapper = createHtmlElement('div', 'range__wrapper', '', priceDualSlider);
    priceRangeWrapper.append(this.rangeInputPrice.rangeInput);
    const stockDualSlider = createHtmlElement('div', 'price__slider', '', element);
    const stockDualSliderTitle = createHtmlElement('h3', 'price__slider-title', 'Stock', stockDualSlider);
    const stockData = createHtmlElement('div', 'price__data', '', stockDualSlider);
    this.stockDataFrom = createHtmlElement('div', 'data__from', `${this.rangeStock[0]}`, stockData);
    const stockDualArrow = createHtmlElement('span', 'data__arrow', ` ⟷ `, stockData);
    this.stockDataTo = createHtmlElement('div', 'data__to', `${this.rangeStock[1]}`, stockData);
    const stockRangeWrapper = createHtmlElement('div', 'range__wrapper', '', stockDualSlider);
    stockRangeWrapper.append(this.rangeInputStock.rangeInput);

    this.rangeInputPrice.rangeInput.noUiSlider?.on(
      "update",
      (values: (string | number)[], handle: number): void => {
        this.rangePrice[handle] = Number(values[handle]);
        this.priceDataFrom.textContent = values[0].toString();
        this.priceDataTo.textContent = values[1].toString();
      }
    );
    this.rangeInputStock.rangeInput.noUiSlider?.on(
      "update",
      (values: (string | number)[], handle: number): void => {
        this.rangeStock[handle] = Number(values[handle]);
        this.stockDataFrom.textContent = values[0].toString();
        this.stockDataTo.textContent = values[1].toString();
      }
    );
    return element;
  }
}

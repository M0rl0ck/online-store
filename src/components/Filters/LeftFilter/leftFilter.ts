import './leftFilter.css';
import { createHtmlElement } from '../../../utils/createElement';
import FilterRange from '../RangeFilter/rangeFilter';
import ICard from '../../constants/interfaces/ICard';

type FilterList = {
  [index: string]: number;
};

export default class LeftFilter {
  rangePrice: number[];
  currentRangePrice: number[];
  rangeInputPrice: FilterRange;
  rangeStock: number[];
  currentRangeStock: number[];
  rangeInputStock: FilterRange;
  priceDataFrom!: HTMLElement;
  priceDataTo!: HTMLElement;
  stockDataFrom!: HTMLElement;
  stockDataTo!: HTMLElement;
  data: ICard[];
  filtredData: ICard[];
  buttonReset!: HTMLElement;
  buttonCopyLink!: HTMLElement;
  element: HTMLElement;
  constructor(data: ICard[]) {
    this.data = data;
    this.filtredData = data;
    this.rangePrice = this.getRange('price');
    this.rangeStock = this.getRange('stock');
    this.currentRangePrice = [this.rangePrice[0], this.rangePrice[this.rangePrice.length - 1]];
    this.currentRangeStock = [this.rangeStock[0], this.rangeStock[this.rangeStock.length - 1]];
    this.rangeInputPrice = new FilterRange(this.rangePrice, this.currentRangePrice, 'input__range');
    this.rangeInputStock = new FilterRange(this.rangeStock, this.currentRangeStock, 'input__range');
    this.element = createHtmlElement('div', 'filters', '');
    const buttonsWrapper = createHtmlElement('div', 'reset__total', '', this.element);
    this.buttonReset = createHtmlElement('button', 'reset__button', 'Reset Filters', buttonsWrapper);
    this.buttonCopyLink = createHtmlElement('button', 'copy__button', 'Copy Link', buttonsWrapper);
  }
  createLeftFilter(): HTMLElement {
    this.element.innerHTML = '';
    const categoryFilter = createHtmlElement('div', 'category__filter', '', this.element);
    const categoryFilterTitle = createHtmlElement('h3', 'category__filter-title', 'Category', categoryFilter);
    const categoryFilterList = createHtmlElement('ul', 'filter__list', '', categoryFilter);

    const category = this.getFilterList('category');
    for (const key in category) {
      categoryFilterList.append(this.createFilterLine(key, category[key], category[key]));
    }

    const brandFilter = createHtmlElement('div', 'brand__filter', '', this.element);
    const brandFilterTitle = createHtmlElement('h3', 'brand__filter-title', 'Brand', brandFilter);
    const brandFilterList = createHtmlElement('ul', 'filter__list', '', brandFilter);

    const brand = this.getFilterList('brand');
    for (const key in brand) {
      brandFilterList.append(this.createFilterLine(key, brand[key], brand[key]));
    }

    const priceDualSlider = createHtmlElement('div', 'price__slider', '', this.element);
    const priceDualSliderTitle = createHtmlElement('h3', 'price__slider-title', 'Price', priceDualSlider);
    const priceData = createHtmlElement('div', 'price__data', '', priceDualSlider);
    this.priceDataFrom = createHtmlElement('div', 'data__from', `€${this.rangePrice[0]}`, priceData);
    const dualArrow = createHtmlElement('span', 'data__arrow', ` ⟷ `, priceData);
    this.priceDataTo = createHtmlElement('div', 'data__to', `€${this.rangePrice[1]}.00`, priceData);
    const priceRangeWrapper = createHtmlElement('div', 'range__wrapper', '', priceDualSlider);
    priceRangeWrapper.append(this.rangeInputPrice.rangeInput);
    const stockDualSlider = createHtmlElement('div', 'price__slider', '', this.element);
    const stockDualSliderTitle = createHtmlElement('h3', 'price__slider-title', 'Stock', stockDualSlider);
    const stockData = createHtmlElement('div', 'price__data', '', stockDualSlider);
    this.stockDataFrom = createHtmlElement('div', 'data__from', `${this.rangeStock[0]}`, stockData);
    const stockDualArrow = createHtmlElement('span', 'data__arrow', ` ⟷ `, stockData);
    this.stockDataTo = createHtmlElement('div', 'data__to', `${this.rangeStock[1]}`, stockData);
    const stockRangeWrapper = createHtmlElement('div', 'range__wrapper', '', stockDualSlider);
    stockRangeWrapper.append(this.rangeInputStock.rangeInput);

    this.rangeInputPrice.rangeInput.noUiSlider?.on('update', (values: (string | number)[], handle: number): void => {
      this.currentRangePrice[handle] = Number(values[handle]);
      this.priceDataFrom.textContent = values[0].toString();
      this.priceDataTo.textContent = values[1].toString();
    });
    this.rangeInputStock.rangeInput.noUiSlider?.on('update', (values: (string | number)[], handle: number): void => {
      this.currentRangeStock[handle] = Number(values[handle]);
      this.stockDataFrom.textContent = values[0].toString();
      this.stockDataTo.textContent = values[1].toString();
    });
    return this.element;
  }

  private createFilterLine(name: string, min: number, max: number): HTMLElement {
    const el = createHtmlElement('li', 'filter-line item-active');
    const check = createHtmlElement('input', '', '', el);
    check.setAttribute('type', 'checkbox');
    check.setAttribute('id', name);
    const label = createHtmlElement('label', '', name, el);
    label.setAttribute('for', name);
    createHtmlElement('span', '', `(${min}/${max})`, el);

    return el;
  }

  private getFilterList(key: 'category' | 'brand'): FilterList {
    const list: FilterList = {};
    this.data.forEach((el) => {
      const index = el[key];
      if (!list[index]) {
        list[index] = 1;
      } else list[index] += 1;
    });

    return list;
  }

  private getRange(key: 'price' | 'stock'): number[] {
    const res = this.data.map((el) => el[key]).sort((a, b) => a - b);
    const result = [...new Set(res)];
    return result;
  }
}

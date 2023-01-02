import './leftFilter.css';
import { createHtmlElement } from '../../../utils/createElement';
import FilterRange from '../RangeFilter/rangeFilter';
import ICard from '../../constants/interfaces/ICard';
import qs from 'query-string';
import EventEmitter from 'events';
import { EmitsName } from '../../constants/constants/connstants';

type FilterList = {
  [index: string]: number;
};

type FilterName = 'category' | 'brand';
type RangeFilterName = 'price' | 'stock';
enum RANG {
  FIRST = 0,
  SECOND = 1,
}

export default class LeftFilter extends EventEmitter {
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
  buttonsWrapper: HTMLElement;

  emit(event: EmitsName, data?: number | string) {
    return super.emit(event, data);
  }

  on(event: EmitsName, callback: ((data: string) => void) | ((data: number) => void)) {
    return super.on(event, callback);
  }
  constructor(data: ICard[]) {
    super();
    this.data = data;
    this.filtredData = [...data];
    this.rangePrice = this.getRange('price', this.data);
    this.rangeStock = this.getRange('stock', this.data);

    const currentRangePrice = this.getCurrentRang('price');
    this.currentRangePrice = currentRangePrice.length ? currentRangePrice : [this.rangePrice[RANG.FIRST], this.rangePrice[this.rangePrice.length - 1]];

    const currentRangeStock = this.getCurrentRang('stock');
    this.currentRangeStock = currentRangeStock.length ? currentRangeStock : [this.rangeStock[RANG.FIRST], this.rangeStock[this.rangeStock.length - 1]];
    this.rangeInputPrice = new FilterRange(this.rangePrice, this.currentRangePrice, 'input__range');
    this.rangeInputStock = new FilterRange(this.rangeStock, this.currentRangeStock, 'input__range');
    this.element = createHtmlElement('div', 'filters', '');
    this.buttonsWrapper = createHtmlElement('div', 'reset__total', '', this.element);
    this.buttonReset = createHtmlElement('button', 'reset__button', 'Reset Filters', this.buttonsWrapper);
    this.buttonCopyLink = createHtmlElement('button', 'copy__button', 'Copy Link', this.buttonsWrapper);
  }

  createLeftFilter(): HTMLElement {
    this.element.innerHTML = '';
    this.element.append(this.buttonsWrapper);
    const categoryFilter = createHtmlElement('div', 'category__filter', '', this.element);
    const categoryFilterTitle = createHtmlElement('h3', 'category__filter-title', 'Category', categoryFilter);
    const categoryFilterList = createHtmlElement('ul', 'filter__list', '', categoryFilter);

    const category = this.getFilterList('category');
    for (const key in category) {
      categoryFilterList.append(this.createFilterLine(key, category[key], category[key], 'category'));
    }

    const brandFilter = createHtmlElement('div', 'brand__filter', '', this.element);
    const brandFilterTitle = createHtmlElement('h3', 'brand__filter-title', 'Brand', brandFilter);
    const brandFilterList = createHtmlElement('ul', 'filter__list', '', brandFilter);

    const brand = this.getFilterList('brand');
    for (const key in brand) {
      brandFilterList.append(this.createFilterLine(key, brand[key], brand[key], 'brand'));
    }

    const priceDualSlider = createHtmlElement('div', 'price__slider', '', this.element);
    const priceDualSliderTitle = createHtmlElement('h3', 'price__slider-title', 'Price', priceDualSlider);
    const priceData = createHtmlElement('div', 'price__data', '', priceDualSlider);
    this.priceDataFrom = createHtmlElement('div', 'data__from', `€${this.currentRangePrice[RANG.FIRST]}`, priceData);
    const dualArrow = createHtmlElement('span', 'data__arrow', ` ⟷ `, priceData);
    this.priceDataTo = createHtmlElement('div', 'data__to', `€${this.currentRangePrice[RANG.SECOND]}.00`, priceData);
    const priceRangeWrapper = createHtmlElement('div', 'range__wrapper', '', priceDualSlider);
    priceRangeWrapper.append(this.rangeInputPrice.rangeInput);
    const stockDualSlider = createHtmlElement('div', 'price__slider', '', this.element);
    const stockDualSliderTitle = createHtmlElement('h3', 'price__slider-title', 'Stock', stockDualSlider);
    const stockData = createHtmlElement('div', 'price__data', '', stockDualSlider);
    this.stockDataFrom = createHtmlElement('div', 'data__from', `${this.currentRangeStock[RANG.FIRST]}`, stockData);
    const stockDualArrow = createHtmlElement('span', 'data__arrow', ` ⟷ `, stockData);
    this.stockDataTo = createHtmlElement('div', 'data__to', `${this.currentRangeStock[RANG.SECOND]}`, stockData);
    const stockRangeWrapper = createHtmlElement('div', 'range__wrapper', '', stockDualSlider);
    stockRangeWrapper.append(this.rangeInputStock.rangeInput);

    this.rangeInputPrice.rangeInput.noUiSlider?.on('change', (values: (string | number)[], handle: number): void => {
      this.currentRangePrice[handle] = Number(values[handle]);
      this.priceDataFrom.textContent = `€${this.currentRangePrice[RANG.FIRST]}`;
      this.priceDataTo.textContent = `€${this.currentRangePrice[RANG.SECOND]}.00`;
      this.setRangeFilter('price', this.currentRangePrice);
    });
    this.rangeInputStock.rangeInput.noUiSlider?.on('change', (values: (string | number)[], handle: number): void => {
      this.currentRangeStock[handle] = Number(values[handle]);
      this.stockDataFrom.textContent = values[RANG.FIRST].toString();
      this.stockDataTo.textContent = values[RANG.SECOND].toString();
      this.setRangeFilter('stock', this.currentRangeStock);
    });
    return this.element;
  }

  private createFilterLine(name: string, min: number, max: number, nameFilter: FilterName): HTMLElement {
    const filterProps = qs.parse(window.location.search);
    let filterProp: string[] = [];
    const nameFilterProp = filterProps[nameFilter];
    if (nameFilterProp && typeof nameFilterProp === 'string') {
      filterProp = nameFilterProp.split('↕');
    }
    const el = createHtmlElement('li', 'filter-line item-active');
    const check = createHtmlElement('input', '', '', el);
    if (!(check instanceof HTMLInputElement)) {
      throw Error('Not imput element');
    }
    check.setAttribute('type', 'checkbox');
    check.setAttribute('id', name);
    if (filterProp.includes(name)) {
      check.checked = true;
    }
    const label = createHtmlElement('label', '', name, el);
    label.setAttribute('for', name);
    createHtmlElement('span', '', `(${min}/${max})`, el);
    check.addEventListener('change', () => this.setFilter(nameFilter, check.id));
    return el;
  }

  private setRangeFilter = (name: RangeFilterName, value: number[]) => {
    const filterProps = qs.parse(window.location.search);
    filterProps[name] = value.join('↕');
    const search = qs.stringify(filterProps);
    window.history.pushState({}, 'path', window.location.origin + window.location.pathname + `${search ? '?' + search : ''}`);
  };

  private setFilter = (nameFilter: FilterName, id: string) => {
    const filterProps = qs.parse(window.location.search);
    let filterProp: string[] = [];
    const nameFilterProp = filterProps[nameFilter];
    if (nameFilterProp && typeof nameFilterProp === 'string') {
      filterProp = nameFilterProp.split('↕');
    }
    if (filterProp.includes(id)) {
      filterProp = filterProp.filter((el) => el !== id);
    } else {
      filterProp.push(id);
    }
    filterProps[nameFilter] = filterProp.join('↕');
    if (!filterProps[nameFilter]) {
      delete filterProps[nameFilter];
    }
    const search = qs.stringify(filterProps);
    window.history.pushState({}, 'path', window.location.origin + window.location.pathname + `${search ? '?' + search : ''}`);
    this.emit('filter');
  };

  private getFilterList(key: FilterName): FilterList {
    const list: FilterList = {};
    this.data.forEach((el) => {
      const index = el[key];
      if (!list[index]) {
        list[index] = 1;
      } else list[index] += 1;
    });

    return list;
  }

  private getRange(key: RangeFilterName, data: ICard[]): number[] {
    const res = data.map((el) => el[key]).sort((a, b) => a - b);
    const result = [...new Set(res)];
    return result;
  }

  private getCurrentRang = (name: RangeFilterName): number[] => {
    const filterProps = qs.parse(window.location.search);
    let filterProp: number[] = [];
    const nameFilterProp = filterProps[name];
    if (nameFilterProp && typeof nameFilterProp === 'string') {
      filterProp = nameFilterProp.split('↕').map(el => Number(el));
    }
    return filterProp;
  }
}

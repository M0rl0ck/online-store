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
  stockDataText: HTMLElement;
  priceDataText: HTMLElement;
  isSetRange: boolean;

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
    this.isSetRange = true;

    const currentRangePrice = this.getCurrentRang('price');
    this.currentRangePrice = currentRangePrice.length
      ? currentRangePrice
      : [this.rangePrice[RANG.FIRST], this.rangePrice[this.rangePrice.length - 1]];

    this.priceDataFrom = createHtmlElement('div', 'data__from', `€${this.currentRangePrice[RANG.FIRST]}`);
    this.priceDataText = createHtmlElement('span', 'data__arrow', ` ⟷ `);
    this.priceDataTo = createHtmlElement('div', 'data__to', `€${this.currentRangePrice[RANG.SECOND]}.00`);

    const currentRangeStock = this.getCurrentRang('stock');
    this.currentRangeStock = currentRangeStock.length
      ? currentRangeStock
      : [this.rangeStock[RANG.FIRST], this.rangeStock[this.rangeStock.length - 1]];

    this.stockDataFrom = createHtmlElement('div', 'data__from', `${this.currentRangeStock[RANG.FIRST]}`);
    this.stockDataText = createHtmlElement('span', 'data__arrow', ` ⟷ `);
    this.stockDataTo = createHtmlElement('div', 'data__to', `${this.currentRangeStock[RANG.SECOND]}`);
    this.rangeInputPrice = new FilterRange(this.rangePrice, this.currentRangePrice, 'input__range');
    this.rangeInputStock = new FilterRange(this.rangeStock, this.currentRangeStock, 'input__range');

    this.rangeInputPrice.rangeInput.noUiSlider?.on('slide', (values: (string | number)[], handle: number): void => {
      this.isSetRange = false;
      this.currentRangePrice[handle] = Number(values[handle]);
      this.priceDataFrom.textContent = `€${this.currentRangePrice[RANG.FIRST]}`;
      this.priceDataTo.textContent = `€${this.currentRangePrice[RANG.SECOND]}.00`;
      this.setRangeFilter('price', this.currentRangePrice);
    });
    this.rangeInputStock.rangeInput.noUiSlider?.on('slide', (values: (string | number)[], handle: number): void => {
      this.isSetRange = false;
      this.currentRangeStock[handle] = Number(values[handle]);
      this.stockDataFrom.textContent = values[RANG.FIRST].toString();
      this.stockDataTo.textContent = values[RANG.SECOND].toString();
      this.setRangeFilter('stock', this.currentRangeStock);
    });

    this.element = createHtmlElement('div', 'filters', '');
    this.buttonsWrapper = createHtmlElement('div', 'reset__total', '', this.element);
    this.buttonReset = createHtmlElement('button', 'reset__button', 'Reset Filters', this.buttonsWrapper);
    this.buttonReset.addEventListener('click', () => {
      window.history.pushState({}, 'path', window.location.origin);
      this.isSetRange = true;
      this.currentRangePrice = [this.rangePrice[RANG.FIRST], this.rangePrice[this.rangePrice.length - 1]];
      this.currentRangeStock = [this.rangeStock[RANG.FIRST], this.rangeStock[this.rangePrice.length - 1]];
      this.emit('reset');
      this.emit('filter');
    });
    this.buttonCopyLink = createHtmlElement('button', 'copy__button', 'Copy Link', this.buttonsWrapper);
    this.buttonCopyLink.addEventListener('click', () => {
      const url = window.location.origin + window.location.pathname + window.location.search;
      navigator.clipboard.writeText(url);
      this.buttonCopyLink.textContent = 'Copied!';
      setTimeout(() => {
        this.buttonCopyLink.textContent = 'Copy Link';
      }, 1300);
    });
  }

  createLeftFilter(): HTMLElement {
    this.element.innerHTML = '';
    this.filtredData = this.filter();
    this.element.append(this.buttonsWrapper);
    const categoryFilter = createHtmlElement('div', 'category__filter', '', this.element);
    createHtmlElement('h3', 'category__filter-title', 'Category', categoryFilter);
    const categoryFilterList = createHtmlElement('ul', 'filter__list', '', categoryFilter);

    const category = this.getFilterList('category', this.data);
    const filtredCategory = this.getFilterList('category', this.filtredData);
    for (const key in category) {
      categoryFilterList.append(this.createFilterLine(key, filtredCategory[key] ? filtredCategory[key] : 0, category[key], 'category'));
    }

    const brandFilter = createHtmlElement('div', 'brand__filter', '', this.element);
    createHtmlElement('h3', 'brand__filter-title', 'Brand', brandFilter);
    const brandFilterList = createHtmlElement('ul', 'filter__list', '', brandFilter);

    const brand = this.getFilterList('brand', this.data);
    const filtredBrand = this.getFilterList('brand', this.filtredData);
    for (const key in brand) {
      brandFilterList.append(this.createFilterLine(key, filtredBrand[key] ? filtredBrand[key] : 0, brand[key], 'brand'));
    }

    const priceDualSlider = createHtmlElement('div', 'price__slider', '', this.element);
    createHtmlElement('h3', 'price__slider-title', 'Price', priceDualSlider);
    const priceData = createHtmlElement('div', 'price__data', '', priceDualSlider);

    priceData.append(this.priceDataFrom, this.priceDataText, this.priceDataTo);

    const priceRangeWrapper = createHtmlElement('div', 'range__wrapper', '', priceDualSlider);
    const priceRange = this.getRange('price', this.filtredData);
    if (priceRange.length) {
      if (this.isSetRange) {
        this.rangeInputPrice.rangeInput.noUiSlider?.set([priceRange[RANG.FIRST], priceRange[priceRange.length - 1]]);
      }

      const priceText = this.rangeInputPrice.rangeInput.noUiSlider?.get();
      if (priceText instanceof Array<string>) {
        this.priceDataFrom.textContent = '€' + priceText[RANG.FIRST];
        this.priceDataText.textContent = '⟷';
        this.priceDataTo.textContent = '€' + priceText[RANG.SECOND];
      }
    } else {
      this.priceDataFrom.textContent = '';
      this.priceDataText.textContent = 'No products found';
      this.priceDataTo.textContent = '';
    }

    priceRangeWrapper.append(this.rangeInputPrice.rangeInput);

    const stockDualSlider = createHtmlElement('div', 'price__slider', '', this.element);
    createHtmlElement('h3', 'price__slider-title', 'Stock', stockDualSlider);
    const stockData = createHtmlElement('div', 'price__data', '', stockDualSlider);

    stockData.append(this.stockDataFrom, this.stockDataText, this.stockDataTo);

    const stockRangeWrapper = createHtmlElement('div', 'range__wrapper', '', stockDualSlider);
    const stockRange = this.getRange('stock', this.filtredData);
    if (stockRange.length) {
      if (this.isSetRange) {
        this.rangeInputStock.rangeInput.noUiSlider?.set([stockRange[RANG.FIRST], stockRange[stockRange.length - 1]]);
      }

      const stockText = this.rangeInputStock.rangeInput.noUiSlider?.get();
      if (stockText instanceof Array<string>) {
        this.stockDataFrom.textContent = `${stockText[RANG.FIRST]}`;
        this.stockDataText.textContent = '⟷';
        this.stockDataTo.textContent = `${stockText[RANG.SECOND]}`;
      }
    } else {
      this.stockDataFrom.textContent = '';
      this.stockDataText.textContent = 'No products found';
      this.stockDataTo.textContent = '';
    }

    stockRangeWrapper.append(this.rangeInputStock.rangeInput);

    return this.element;
  }

  private createFilterLine(name: string, min: number, max: number, nameFilter: FilterName): HTMLElement {
    const filterProps = qs.parse(window.location.search);
    let filterProp: string[] = [];
    const nameFilterProp = filterProps[nameFilter];
    if (nameFilterProp && typeof nameFilterProp === 'string') {
      filterProp = nameFilterProp.split('↕');
    }
    const el = createHtmlElement('li', min ? 'filter-line' : 'filter-line item-non-active');
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
    check.addEventListener('change', () => {
      this.isSetRange = true;
      this.setFilter(nameFilter, check.id);
    });
    return el;
  }

  private setRangeFilter = (name: RangeFilterName, value: number[]) => {
    const filterProps = qs.parse(window.location.search);
    filterProps[name] = value.join('↕');
    const search = qs.stringify(filterProps);
    window.history.pushState({}, 'path', window.location.origin + window.location.pathname + `${search ? '?' + search : ''}`);
    this.emit('filter');
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

  private getFilterList(key: FilterName, data: ICard[]): FilterList {
    const list: FilterList = {};
    data.forEach((el) => {
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
      filterProp = nameFilterProp.split('↕').map((el) => Number(el));
    }
    return filterProp;
  };

  filter = (): ICard[] => {
    let filtredData: ICard[] = [...this.data];
    filtredData = this.getFiltredData(filtredData, 'category');
    filtredData = this.getFiltredData(filtredData, 'brand');
    filtredData = this.getRangeFiltredData(filtredData, 'price');
    filtredData = this.getRangeFiltredData(filtredData, 'stock');
    filtredData = this.searchCards(filtredData);

    return filtredData;
  };

  getRangeFiltredData = (data: ICard[], name: RangeFilterName): ICard[] => {
    const filterProps = qs.parse(window.location.search);
    let filterProp: string[] = [];
    const nameFilterProp = filterProps[name];
    if (nameFilterProp && typeof nameFilterProp === 'string') {
      filterProp = nameFilterProp.split('↕');
    }
    return filterProp.length ? data.filter((el) => el[name] >= Number(filterProp[RANG.FIRST]) && el[name] <= Number(filterProp[RANG.SECOND])) : data;
  };

  getFiltredData = (data: ICard[], name: FilterName): ICard[] => {
    const filterProps = qs.parse(window.location.search);
    let filterProp: string[] = [];
    const nameFilterProp = filterProps[name];
    if (nameFilterProp && typeof nameFilterProp === 'string') {
      filterProp = nameFilterProp.split('↕');
    }
    return filterProp.length ? data.filter((el) => filterProp.includes(el[name])) : data;
  };

  searchCards(data: ICard[]) {
    const searchProps = qs.parse(window.location.search);
    const value = searchProps.search;
    if (typeof value === 'string') {
      const rgx = new RegExp(value, 'i');
      return data.filter((item) => {
        return rgx.test(JSON.stringify(item));
      });
    } else {
      return data;
    }
  }
}

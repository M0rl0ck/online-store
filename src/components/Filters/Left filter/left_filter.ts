import './left_filter.css';
import { createHtmlElement } from '../../../utils/createElement';

export default class LeftFilter {
  createLeftFilter(): HTMLElement {
    const element = createHtmlElement('div', 'filters', '', document.body);
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
    const priceDataFrom = createHtmlElement('div', 'data__from', '€10.00', priceData);
    const dualArrow = createHtmlElement('span', 'data__arrow', ` ⟷ `, priceData);
    const priceDataTo = createHtmlElement('div', 'data__to', '€1749.00', priceData);
    const priceRangeWrapper = createHtmlElement('div', 'range__wrapper', '', priceDualSlider);
    const inputRangeFrom = createHtmlElement('input', 'input__range', ``, priceRangeWrapper);
    inputRangeFrom.setAttribute('type', 'range');
    inputRangeFrom.setAttribute('min', '0');
    inputRangeFrom.setAttribute('max', '48');
    const inputRangeTo = createHtmlElement('input', 'input__range', ``, priceRangeWrapper);
    inputRangeTo.setAttribute('type', 'range');
    inputRangeTo.setAttribute('min', '0');
    inputRangeTo.setAttribute('max', '48');
    const stockDualSlider = createHtmlElement('div', 'price__slider', '', element);
    const stockDualSliderTitle = createHtmlElement('h3', 'price__slider-title', 'Stock', stockDualSlider);
    const stockData = createHtmlElement('div', 'price__data', '', stockDualSlider);
    const stockDataFrom = createHtmlElement('div', 'data__from', '1', stockData);
    const stockDualArrow = createHtmlElement('span', 'data__arrow', ` ⟷ `, stockData);
    const stockDataTo = createHtmlElement('div', 'data__to', '150', stockData);
    const stockRangeWrapper = createHtmlElement('div', 'range__wrapper', '', stockDualSlider);
    const stockInputRangeFrom = createHtmlElement('input', 'input__range', ``, stockRangeWrapper);
    stockInputRangeFrom.setAttribute('type', 'range');
    stockInputRangeFrom.setAttribute('min', '0');
    stockInputRangeFrom.setAttribute('max', '48');
    const stockInputRangeTo = createHtmlElement('input', 'input__range', ``, stockRangeWrapper);
    stockInputRangeTo.setAttribute('type', 'range');
    stockInputRangeTo.setAttribute('min', '0');
    stockInputRangeTo.setAttribute('max', '48');
    return element;
  }
}

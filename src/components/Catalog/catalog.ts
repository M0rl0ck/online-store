import './catalog.css';
import { createHtmlElement } from '../../utils/createElement';
import Card from './../Card/card';
import ICard from '../constants/interfaces/ICard';

export default class Catalog {
  data: ICard[];
  cards: Card[] = [];
  element!: HTMLElement;
  productsWrap!: HTMLElement;
  constructor(dataCards: ICard[]) {
    this.data = [...dataCards];
    this.data.forEach(el => this.cards.push(new Card(el)));
  }
  createCatalog(): HTMLElement {
    const element = createHtmlElement('div', 'catalog', '');
    this.element = element;
    const sortProducts = createHtmlElement('div', 'sort__products', '', element);
    const sortSelectWrap = createHtmlElement('div', 'sort__wrap', '', sortProducts);
    const sortSelect = createHtmlElement('select', 'sort__select', '', sortSelectWrap);
    const sortByPriceASC = createHtmlElement('option', 'sort__option-1', 'Sort by price ASC', sortSelect);
    sortByPriceASC.setAttribute('value', 'PriceASC');
    const sortByPriceDESC = createHtmlElement('option', 'sort__option-2', 'Sort by price DESC', sortSelect);
    sortByPriceDESC.setAttribute('value', 'PriceDESC');
    const sortByRatingASC = createHtmlElement('option', 'sort__option-3', 'Sort by rating ASC', sortSelect);
    sortByRatingASC.setAttribute('value', 'RatingASC');
    const sortByRatingDESC = createHtmlElement('option', 'sort__option-4', 'Sort by rating DESC', sortSelect);
    sortByRatingDESC.setAttribute('value', 'RatingDESC');
    const sortByDiscountASC = createHtmlElement('option', 'sort__option-5', 'Sort by discount ASC', sortSelect);
    sortByDiscountASC.setAttribute('value', 'DiscountASC');
    const sortByDiscountDESC = createHtmlElement('option', 'sort__option-6', 'Sort by discount DESC', sortSelect);
    sortByDiscountDESC.setAttribute('value', 'DiscountDESC');
    const sortStat = createHtmlElement('p', 'sort__stat', `Found: ${this.cards.length}`, sortProducts);

    if (!(sortSelect instanceof HTMLSelectElement)) {
      throw Error('Not select element');
    }
    sortSelect.addEventListener('change', () => this.sortCards(sortSelect.value));

    const inputSearch = createHtmlElement('input', 'sort__search', '', sortProducts);
    inputSearch.setAttribute('type', 'search');
    inputSearch.setAttribute('placeholder', 'Search product');
    const viewMode = createHtmlElement('div', 'view__mode', '', sortProducts);
    const viewModeSmall = createHtmlElement('div', 'view__small', `6 in a row`, viewMode);
    const viewModeBig = createHtmlElement('div', 'view__big', `4 in a row`, viewMode);
    const productsWrap = createHtmlElement('div', 'products__wrap', '', element);
    this.productsWrap = productsWrap;
    productsWrap.append(...(this.cards.map(card => card.element)));
    return element;
  }

  sortCards(prop: string) {
    this.productsWrap.innerHTML = '';
    switch (prop) {
      case 'PriceASC':
        this.data.sort((a, b) => a.price - b.price)
        break;
      case 'PriceDESC':
        this.data.sort((a, b) => b.price - a.price)
        break;
      case 'RatingASC':
        this.data.sort((a, b) => a.rating - b.rating)
        break;
      case 'RatingDESC':
        this.data.sort((a, b) => b.rating - a.rating)
        break;
      case 'DiscountASC':
        this.data.sort((a, b) => a.discountPercentage - b.discountPercentage)
        break;
      case 'DiscountDESC':
        this.data.sort((a, b) => b.discountPercentage - a.discountPercentage)
        break;
    }
    this.cards = [];
    this.data.forEach(el => this.cards.push(new Card(el)));
    this.productsWrap.append(...(this.cards.map(card => card.element)));
  }
}

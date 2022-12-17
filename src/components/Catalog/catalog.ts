import './catalog.css';
import { createHtmlElement } from '../../utils/createElement';
import Card from './../Card/card';
import ICard from '../constants/interfaces/ICard';

export default class Catalog {
  cards: Card[] = [];
  constructor(dataCards: ICard[]) {
    dataCards.forEach(el => this.cards.push(new Card(el)))
  }
  createCatalog(): HTMLElement {
    const element = createHtmlElement('div', 'catalog', '');
    const sortProducts = createHtmlElement('div', 'sort__products', '', element);
    const sortSelectWrap = createHtmlElement('div', 'sort__wrap', '', sortProducts);
    const sortSelect = createHtmlElement('select', 'sort__select', '', sortSelectWrap);
    const sortByPriceASC = createHtmlElement('option', 'sort__option-1', 'Sort by price ASC', sortSelect);
    const sortByPriceDESC = createHtmlElement('option', 'sort__option-2', 'Sort by price DESC', sortSelect);
    const sortByRatingASC = createHtmlElement('option', 'sort__option-3', 'Sort by rating ASC', sortSelect);
    const sortByRatingDESC = createHtmlElement('option', 'sort__option-4', 'Sort by rating DESC', sortSelect);
    const sortByDiscountASC = createHtmlElement('option', 'sort__option-5', 'Sort by discount ASC', sortSelect);
    const sortByDiscountDESC = createHtmlElement('option', 'sort__option-6', 'Sort by discount DESC', sortSelect);
    const sortStat = createHtmlElement('p', 'sort__stat', 'Found: 100', sortProducts);
    const inputSearch = createHtmlElement('input', 'sort__search', '', sortProducts);
    inputSearch.setAttribute('type', 'search');
    inputSearch.setAttribute('placeholder', 'Search product');
    const viewMode = createHtmlElement('div', 'view__mode', '', sortProducts);
    const viewModeSmall = createHtmlElement('div', 'view__small', `6 in a row`, viewMode);
    const viewModeBig = createHtmlElement('div', 'view__big', `4 in a row`, viewMode);
    const productsWrap = createHtmlElement('div', 'products__wrap', '', element);
    productsWrap.append(...(this.cards.map(card => card.element)));
    return element;
  }
}

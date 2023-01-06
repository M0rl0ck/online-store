import './catalog.css';
import { createHtmlElement } from '../../utils/createElement';
import Card from './../Card/card';
import ICard from '../constants/interfaces/ICard';
import EventEmitter from 'events';
import CartData from '../pages/CartPage/CartData';
import { PATH } from '../app/app';
import { EmitsName } from '../constants/constants/connstants';
import qs from 'query-string';

enum SORTBY {
  DEFAULT = 'Default',
  PRICEASC = 'PriceASC',
  PRICEDESC = 'PriceDESC',
  RATINGASC = 'RatingASC',
  RATINGDESC = 'RatingDESC',
  DISCOUNTASC = 'DiscountASC',
  DISCOUNTDESC = 'DiscountDESC',
}

export default class Catalog extends EventEmitter {
  data: ICard[];
  cards: Card[] = [];
  element: HTMLElement;
  productsWrap!: HTMLElement;
  cartData: CartData;
  sortStat!: HTMLElement;
  sortedData: ICard[];
  sortSelect!: HTMLSelectElement;
  inputSearch!: HTMLInputElement;
  viewModeSmall!: HTMLElement;
  viewModeBig!: HTMLElement;

  emit(event: EmitsName, data?: number | string) {
    return super.emit(event, data);
  }

  on(event: EmitsName, callback: ((data: string) => void) | ((data: number) => void)) {
    return super.on(event, callback);
  }
  constructor(dataCards: ICard[], cartData: CartData) {
    super();
    this.data = dataCards;
    this.cartData = cartData;
    this.sortedData = [...dataCards];
    this.element = createHtmlElement('div', 'catalog', '');
    this.createCatalog();
  }
  private createCatalog() {
    const sortProducts = createHtmlElement('div', 'sort__products', '', this.element);
    const sortSelectWrap = createHtmlElement('div', 'sort__wrap', '', sortProducts);
    this.sortSelect = createHtmlElement('select', 'sort__select', '', sortSelectWrap) as HTMLSelectElement;
    const sortDefault = createHtmlElement('option', 'sort__option-1', 'Sort default', this.sortSelect);
    sortDefault.setAttribute('value', SORTBY.DEFAULT);
    const sortByPriceASC = createHtmlElement('option', 'sort__option-1', 'Sort by price ASC', this.sortSelect);
    sortByPriceASC.setAttribute('value', SORTBY.PRICEASC);
    const sortByPriceDESC = createHtmlElement('option', 'sort__option-2', 'Sort by price DESC', this.sortSelect);
    sortByPriceDESC.setAttribute('value', SORTBY.PRICEDESC);
    const sortByRatingASC = createHtmlElement('option', 'sort__option-3', 'Sort by rating ASC', this.sortSelect);
    sortByRatingASC.setAttribute('value', SORTBY.RATINGASC);
    const sortByRatingDESC = createHtmlElement('option', 'sort__option-4', 'Sort by rating DESC', this.sortSelect);
    sortByRatingDESC.setAttribute('value', SORTBY.RATINGDESC);
    const sortByDiscountASC = createHtmlElement('option', 'sort__option-5', 'Sort by discount ASC', this.sortSelect);
    sortByDiscountASC.setAttribute('value', SORTBY.DISCOUNTASC);
    const sortByDiscountDESC = createHtmlElement('option', 'sort__option-6', 'Sort by discount DESC', this.sortSelect);
    sortByDiscountDESC.setAttribute('value', SORTBY.DISCOUNTDESC);

    const sortProps = qs.parse(window.location.search);
    if (!(this.sortSelect instanceof HTMLSelectElement)) {
      throw Error('Not select element');
    }
    if (sortProps.sort) {
      this.sortSelect.value = sortProps.sort.toString();
    }
    this.sortStat = createHtmlElement('p', 'sort__stat', `Found: ${this.cards.length}`, sortProducts);

    this.sortSelect.addEventListener('change', () => {
      const sortProps = qs.parse(window.location.search);
      if (this.sortSelect.value !== SORTBY.DEFAULT) {
        sortProps.sort = this.sortSelect.value;
      } else {
        delete sortProps.sort;
      }
      const search = qs.stringify(sortProps);
      window.history.pushState({}, 'path', window.location.origin + window.location.pathname + `${search ? '?' + search : ''}`);
      this.render();
    });

    this.inputSearch = createHtmlElement('input', 'sort__search', '', sortProducts) as HTMLInputElement;
    this.inputSearch.setAttribute('type', 'search');
    this.inputSearch.setAttribute('placeholder', 'Search product');

    const searchProps = qs.parse(window.location.search);
    if (!(this.inputSearch instanceof HTMLInputElement)) {
      throw Error('Not input element');
    }
    if (searchProps.search) {
      this.inputSearch.value = searchProps.search.toString();
    }
    if (searchProps.search === undefined) {
      searchProps.search = '';
    }

    this.inputSearch.setAttribute('value', `${searchProps.search}`);

    this.inputSearch.addEventListener('input', () => {
      const searchProps = qs.parse(window.location.search);
      if (this.inputSearch.value !== '') {
        searchProps.search = this.inputSearch.value;
      } else {
        delete searchProps.search;
      }
      const search = qs.stringify(searchProps);
      window.history.pushState({}, 'path', window.location.origin + window.location.pathname + `${search ? '?' + search : ''}`);
      this.emit('filter');
    });

    const viewMode = createHtmlElement('div', 'view__mode', '', sortProducts);
    this.viewModeSmall = createHtmlElement('div', 'view__small', `6 in a row`, viewMode);
    this.viewModeBig = createHtmlElement('div', 'view__big active', `4 in a row`, viewMode);

    this.viewModeSmall.addEventListener('click', () => this.setSmallCard(true));

    this.viewModeBig.addEventListener('click', () => this.setSmallCard(false));

    this.productsWrap = createHtmlElement('div', 'products__wrap', '', this.element);
    this.render();
  }

  render() {
    this.productsWrap.innerHTML = '';
    const viewModeProp = qs.parse(window.location.search).big;
    this.sortCards(this.sortSelect.value);
    this.cards = [];
    this.sortedData.forEach((el) => this.cards.push(new Card(el, this.cartData.isProductInCart(el.id))));
    this.productsWrap.append(
      ...this.cards.map((card) => {
        card.detailsButton.addEventListener('click', () => this.emit('navigate', `${PATH.product}/${card.id}`));
        card.cardText.addEventListener('click', () => this.emit('navigate', `${PATH.product}/${card.id}`));
        card.addButton.addEventListener('click', () => {
          if (this.cartData.isProductInCart(card.id)) {
            this.emit('deleteFromCart', card.id);
          } else {
            this.emit('addToCart', card.id);
          }
          this.render();
        });

        return card.element;
      })
    );
    this.sortStat.textContent = `Found: ${this.cards.length}`;
    if (this.cards.length === 0) {
      createHtmlElement('div', 'not__found', 'No products found 😏', this.productsWrap);
    }
    if (viewModeProp === 'false') {
      this.setSmallCard(true);
    } else {
      this.setSmallCard(false);
    }
    return this.element;
  }

  sortCards(prop: string) {
    this.sortedData = [...this.data];
    switch (prop) {
      case SORTBY.PRICEASC:
        this.sortedData.sort((a, b) => a.price - b.price);
        break;
      case SORTBY.PRICEDESC:
        this.sortedData.sort((a, b) => b.price - a.price);
        break;
      case SORTBY.RATINGASC:
        this.sortedData.sort((a, b) => a.rating - b.rating);
        break;
      case SORTBY.RATINGDESC:
        this.sortedData.sort((a, b) => b.rating - a.rating);
        break;
      case SORTBY.DISCOUNTASC:
        this.sortedData.sort((a, b) => a.discountPercentage - b.discountPercentage);
        break;
      case SORTBY.DISCOUNTDESC:
        this.sortedData.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
    }
  }

  setSmallCard = (is: boolean) => {
    const sortProps = qs.parse(window.location.search);

    if (is) {
      this.viewModeSmall.classList.add('active');
      this.viewModeBig.classList.remove('active');
      this.cards.forEach((card) => card.element.classList.add('small'));
      sortProps.big = 'false';
    } else {
      this.viewModeSmall.classList.remove('active');
      this.viewModeBig.classList.add('active');
      this.cards.forEach((card) => card.element.classList.remove('small'));
      delete sortProps.big;
    }
    const search = qs.stringify(sortProps);
    window.history.pushState({}, 'path', window.location.origin + window.location.pathname + `${search ? '?' + search : ''}`);
  };
}

import './card.css';
import { createHtmlElement } from '../../utils/createElement';
import ICard from '../constants/interfaces/ICard';

enum BUTTON_TEXT {
  ADD = 'ADD TO CART',
  DEL = 'DROP FROM CART',
}

export default class Card {
  element: HTMLElement;
  id: number;
  addButton: HTMLElement;
  detailsButton: HTMLElement;
  cardText: HTMLElement;
  constructor(data: ICard, isCart: boolean) {
    this.element = createHtmlElement('div', 'product__card', '');
    if (isCart) {
      this.element.classList.add('product__card_in-cart');
    }
    this.id = data.id;
    const cardWrap = createHtmlElement('div', 'card__wrap', '', this.element);
    cardWrap.setAttribute('style', `background: url(${data.thumbnail}) 0% 0% / cover`);
    this.cardText = createHtmlElement('div', 'card__text', '', cardWrap);
    const cardTitle = createHtmlElement('div', 'card__title', `${data.title}`, this.cardText);
    const cardInfoWrap = createHtmlElement('div', 'card__info-wrap', '', this.cardText);
    const cardInfo = createHtmlElement('div', 'card__info', '', cardInfoWrap);
    const infoCategory = createHtmlElement('p', '', '', cardInfo);
    createHtmlElement('span', 'info__category', 'Category: ', infoCategory);
    createHtmlElement('span', 'info__category-data', ` ${data.category}`, infoCategory);
    const infoBrand = createHtmlElement('p', 'info__category', '', cardInfo);
    createHtmlElement('span', 'info__category', 'Brand: ',infoBrand);
    createHtmlElement('span', 'info__category-data', ` ${data.brand}`,infoBrand);
    const infoPrice = createHtmlElement('p', 'info__category', '', cardInfo);
    createHtmlElement('span', 'info__category', 'Price: ', infoPrice);
    createHtmlElement('span', 'info__category-data', ` €${data.price}`, infoPrice);
    const infoDiscount = createHtmlElement('p', 'info__category', '', cardInfo);
    createHtmlElement('span', 'info__category', 'Discount: ', infoDiscount);
    createHtmlElement('span', 'info__category-data', ` ${data.discountPercentage}%`, infoDiscount);
    const infoRating = createHtmlElement('p', 'info__category', '', cardInfo);
    createHtmlElement('span', 'info__category', 'Rating: ', infoRating);
    createHtmlElement('span', 'info__category-data', ` ${data.rating}`, infoRating);
    const infoStock = createHtmlElement('p', 'info__category', '', cardInfo);
    createHtmlElement('span', 'info__category', 'Stock: ', infoStock);
    createHtmlElement('span', 'info__category-data', ` ${data.stock}`, infoStock);
    const cardButtons = createHtmlElement('div', 'card__buttons', '', cardWrap);
    this.addButton = createHtmlElement('button', 'add__button', `${isCart ? BUTTON_TEXT.DEL : BUTTON_TEXT.ADD}`, cardButtons);
    this.detailsButton = createHtmlElement('button', 'details__button', 'DETAILS', cardButtons);
  }
}

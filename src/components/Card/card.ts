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
    const infoCategory = createHtmlElement('p', 'info__category', `<span>Category: </span> ${data.category}`, cardInfo);
    const infoBrand = createHtmlElement('p', 'info__category', `<span>Brand: </span> ${data.brand}`, cardInfo);
    const infoPrice = createHtmlElement('p', 'info__category', `<span>Price: </span> €${data.price}`, cardInfo);
    const infoDiscount = createHtmlElement('p', 'info__category', `<span>Discount: </span> ${data.discountPercentage}%`, cardInfo);
    const infoRating = createHtmlElement('p', 'info__category', `<span>Rating: </span> ${data.rating}`, cardInfo);
    const infoStock = createHtmlElement('p', 'info__category', `<span>Stock: </span> ${data.stock}`, cardInfo);
    const cardButtons = createHtmlElement('div', 'card__buttons', '', cardWrap);
    this.addButton = createHtmlElement('button', 'add__button', `${isCart ? BUTTON_TEXT.DEL : BUTTON_TEXT.ADD}`, cardButtons);
    this.detailsButton = createHtmlElement('button', 'details__button', 'DETAILS', cardButtons);
  }
}

import './card.css';
import { createHtmlElement } from '../../utils/createElement';

export default class Card {
  createCard(): HTMLElement {
    const element = createHtmlElement('div', 'product__card', '');
    const cardWrap = createHtmlElement('div', 'card__wrap', '', element);
    const cardText = createHtmlElement('div', 'card__text', '', cardWrap);
    const cardTitle = createHtmlElement('div', 'card__title', ' MacBook Pro', cardText);
    const cardInfoWrap = createHtmlElement('div', 'card__info-wrap', '', cardText);
    const cardInfo = createHtmlElement('div', 'card__info', '', cardInfoWrap);
    const infoCategory = createHtmlElement('p', 'info__category', `<span>Category: </span> laptops`, cardInfo);
    const infoBrand = createHtmlElement('p', 'info__category', `<span>Brand: </span> Apple`, cardInfo);
    const infoPrice = createHtmlElement('p', 'info__category', `<span>Price: </span> €1,749.00`, cardInfo);
    const infoDiscount = createHtmlElement('p', 'info__category', `<span>Discount: </span> 11.02%`, cardInfo);
    const infoRating = createHtmlElement('p', 'info__category', `<span>Rating: </span> 4.57`, cardInfo);
    const infoStock = createHtmlElement('p', 'info__category', `<span>Stock: </span> 83`, cardInfo);
    const cardButtons = createHtmlElement('div', 'card__buttons', '', cardWrap);
    const addButton = createHtmlElement('button', 'add__button', 'ADD TO CART', cardButtons);
    const detailsButton = createHtmlElement('button', 'details__button', 'DETAILS', cardButtons);
    return element;
  }
}

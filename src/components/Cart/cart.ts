import './cart.css';
import { createHtmlElement } from '../../utils/createElement';
import ICard from '../constants/interfaces/ICard';

export default class ProductInCart {
  element: HTMLElement;
  id: number;
  itemInfo: HTMLElement;
  plusButton: HTMLElement;
  minusButton: HTMLElement;
  countItems: HTMLElement;
  count: number;
  constructor(data: ICard, index: number, count: number) {
    this.element = createHtmlElement('div', 'cart__item-wrap');
    this.id = data.id;
    this.count = count;
    const cartItem = createHtmlElement('div', 'cart__item', '', this.element);
    const itemNum = createHtmlElement('div', 'item__num', `${index + 1}`, cartItem);
    this.itemInfo = createHtmlElement('div', 'item__info', '', cartItem);
    const itemPhoto = createHtmlElement('img', 'item__photo', '', this.itemInfo);
    itemPhoto.setAttribute('src', data.thumbnail);
    const itemDetail = createHtmlElement('div', 'item__detail', '', this.itemInfo);
    const itemTitle = createHtmlElement('div', 'item__title', '', itemDetail);
    const itemTitleText = createHtmlElement('h3', 'item__title-text', `${data.title}`, itemTitle);
    const itemDesc = createHtmlElement('div', 'item__desc', `${data.description}`, itemDetail);
    const itemOther = createHtmlElement('div', 'item__other', '', itemDetail);
    const itemRating = createHtmlElement('div', 'item__rating', `${data.rating}`, itemOther);
    const itemDiscount = createHtmlElement('div', 'item__discount', `Discount: ${data.discountPercentage}%`, itemOther);
    const itemControl = createHtmlElement('div', 'item__control', '', cartItem);
    const stockControl = createHtmlElement('div', 'stock__control', `Stock: ${data.stock}`, itemControl);
    const numberControl = createHtmlElement('div', 'number__control', '', itemControl);
    this.plusButton = createHtmlElement('button', 'plus__button', '+', numberControl);
    this.countItems = createHtmlElement('span', '', `${this.count}`, numberControl);
    this.minusButton = createHtmlElement('button', 'minus__button', '-', numberControl);
    const priceControl = createHtmlElement('div', 'price__control', `€${data.price}.00`, itemControl);
  }
  render(): HTMLElement {
    return this.element;
  }
}

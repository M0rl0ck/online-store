import './cart.css';
import { createHtmlElement } from '../../utils/createElement';

export default class ProductInCart {
  createProductInCart(): HTMLElement {
    const element = createHtmlElement('div', 'cart__item-wrap');
    const cartItem = createHtmlElement('div', 'cart__item', '', element);
    const itemNum = createHtmlElement('div', 'item__num', '1', cartItem);
    const itemInfo = createHtmlElement('div', 'item__info', '', cartItem);
    const itemPhoto = createHtmlElement('img', 'item__photo', '', itemInfo);
    itemPhoto.setAttribute('src', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg');
    const itemDetail = createHtmlElement('div', 'item__detail', '', itemInfo);
    const itemTitle = createHtmlElement('div', 'item__title', '', itemDetail);
    const itemTitleText = createHtmlElement('h3', 'item__title-text', 'iPhone 9', itemTitle);
    const itemDesc = createHtmlElement('div', 'item__desc', 'An apple mobile which is nothing like apple', itemDetail);
    const itemOther = createHtmlElement('div', 'item__other', '', itemDetail);
    const itemRating = createHtmlElement('div', 'item__rating', 'Rating: 4.69', itemOther);
    const itemDiscount = createHtmlElement('div', 'item__discount', 'Discount: 12.96%', itemOther);
    const itemControl = createHtmlElement('div', 'item__control', '', cartItem);
    const stockControl = createHtmlElement('div', 'stock__control', 'Stock: 94', itemControl);
    const numberControl = createHtmlElement('div', 'number__control', '', itemControl);
    const plusButton = createHtmlElement('button', 'plus__button', '+', numberControl);
    numberControl.append('1');
    const minusButton = createHtmlElement('button', 'minus__button', '-', numberControl);
    const priceControl = createHtmlElement('div', 'price__control', '€549.00', itemControl);
    return element;
  }
}

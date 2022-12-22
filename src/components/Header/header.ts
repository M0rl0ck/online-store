import './header.css';
import { createHtmlElement } from '../../utils/createElement';

export default class Header {
  element: HTMLElement;
  totalPriceNumber: HTMLElement;
  cart: HTMLElement;
  logo: HTMLElement;
  constructor() {
    this.element = createHtmlElement('header', 'header');
    document.body.prepend(this.element);
    const wrapper = createHtmlElement('div', 'header__wrapper', '', this.element);
    this.logo = createHtmlElement('a', 'logo__link', '', wrapper);
    const logoImg = createHtmlElement('div', 'logo__img', `🛍`, this.logo);
    const logoText = createHtmlElement('div', 'logo__text', 'Online Store', this.logo);
    const totalPrice = createHtmlElement('div', 'total__price', ``, wrapper);
    const totalPriceText = createHtmlElement('span', 'total__price-text', 'Cart total: ', totalPrice);
    this.totalPriceNumber = createHtmlElement('span', 'total__price-number', '€0.00', totalPrice);
    this.cart = createHtmlElement('div', 'cart', '', wrapper);
    const cartText = createHtmlElement('span', 'cart__text', '0', this.cart);
  }
}

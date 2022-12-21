import './header.css';
import { createHtmlElement } from '../../utils/createElement';

export default class Header {
  element: HTMLElement;
  totalPriceNumber: HTMLElement;
  constructor() {
    this.element = createHtmlElement('header', 'header');
    document.body.prepend(this.element);
    const wrapper = createHtmlElement('div', 'header__wrapper', '', this.element);
    const logoLink = createHtmlElement('a', 'logo__link', '', wrapper);
    logoLink.setAttribute('href', '#main-page');
    const logoImg = createHtmlElement('div', 'logo__img', `🛍`, logoLink);
    const logoText = createHtmlElement('div', 'logo__text', 'Online Store', logoLink);
    const totalPrice = createHtmlElement('div', 'total__price', ``, wrapper);
    const totalPriceText = createHtmlElement('span', 'total__price-text', 'Cart total: ', totalPrice);
    this.totalPriceNumber = createHtmlElement('span', 'total__price-number', '€0.00', totalPrice);
    const cart = createHtmlElement('a', 'cart', '', wrapper);
    cart.setAttribute('href', '#cart-page');
    const cartText = createHtmlElement('span', 'cart__text', '0', cart);
  }
}

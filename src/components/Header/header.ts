import './header.css';
import EventEmitter from 'events';
import { createHtmlElement } from '../../utils/createElement';
import { PATH } from '../app/app';

export default class Header extends EventEmitter{
  element: HTMLElement;
  totalPriceNumber: HTMLElement;
  cart: HTMLElement;
  logo: HTMLElement;
  constructor() {
    super();
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

    this.logo.addEventListener('click', () => this.emit('navigate', PATH.catalog));
    this.cart.addEventListener('click', () => this.emit('navigate', PATH.cart));
  }
}

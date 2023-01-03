import './header.css';
import EventEmitter from 'events';
import { createHtmlElement } from '../../utils/createElement';
import { PATH } from '../app/app';
import CartData from '../pages/CartPage/CartData';

export default class Header extends EventEmitter {
  element: HTMLElement;
  totalPriceNumber: HTMLElement;
  cart: HTMLElement;
  logo: HTMLElement;
  cartData: CartData;
  cartText: HTMLElement;
  constructor(cartData: CartData) {
    super();
    this.cartData = cartData;
    this.element = createHtmlElement('header', 'header');
    document.body.prepend(this.element);
    const wrapper = createHtmlElement('div', 'header__wrapper', '', this.element);
    this.logo = createHtmlElement('a', 'logo__link', '', wrapper);
    createHtmlElement('div', 'logo__img', `🛍`, this.logo);
    createHtmlElement('div', 'logo__text', 'Online Store', this.logo);
    const totalPrice = createHtmlElement('div', 'total__price', ``, wrapper);
    createHtmlElement('span', 'total__price-text', 'Cart total: ', totalPrice);
    this.totalPriceNumber = createHtmlElement('span', 'total__price-number', `€${this.cartData.allPrice}.00`, totalPrice);
    this.cart = createHtmlElement('div', 'cart', '', wrapper);
    this.cartText = createHtmlElement('span', 'cart__text', `${this.cartData.countProducts}`, this.cart);

    this.cartData.on('changeDataCart', this.renderCartData);

    this.logo.addEventListener('click', () => this.emit('navigate', PATH.catalog));
    this.cart.addEventListener('click', () => this.emit('navigate', PATH.cart));
  }

  renderCartData = (count: number, price: number) => {
    this.cartText.textContent = count.toString();
    this.totalPriceNumber.textContent = `€${price}.00`;
  };
}

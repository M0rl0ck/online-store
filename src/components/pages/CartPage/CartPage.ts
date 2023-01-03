import { createHtmlElement } from '../../../utils/createElement';
import Page from '../Template/page';
import './cartPage.css';
import ProductInCart from './../../Cart/cart';
import Popup from './../../Popup/popup';
import Blackout from './../../Blackout/blackout';
import CartData from './CartData';
import ICard from '../../constants/interfaces/ICard';
import { PATH } from '../../app/app';
import qs from 'query-string';

type CartEmitsName = 'navigate' | 'addToCart' | 'deleteFromCart';

export default class CartPage extends Page {
  cartData: CartData;
  data: ICard[];
  limit: number;
  currentPage: number;
  constructor(id: string, cartData: CartData, data: ICard[]) {
    super(id);
    this.cartData = cartData;
    this.data = data;
    const params = qs.parse(window.location.search);
    this.limit = params.limit ? Number(params.limit) : 3;
    this.currentPage = params.page ? Number(params.page) : 1;
  }

  emit(event: CartEmitsName, data?: number | string) {
    return super.emit(event, data);
  }

  on(event: CartEmitsName, callback: ((data: string) => void) | ((data: number) => void)) {
    return super.on(event, callback);
  }

  render(): HTMLElement {
    this.mainWrapper.innerHTML = '';
    if (this.cartData.isCartEmpty()) {
      this.mainWrapper.className = 'cart-empty';
      createHtmlElement('h1', 'cart-empty-text', 'Cart is empty', this.mainWrapper);
    } else {
      let str1 = '';
      let str2 = '';
      let count = 0;
      this.mainWrapper.className = 'cart__page';
      const popup = new Popup();
      const cartWrap = createHtmlElement('div', 'cart__wrap', '', this.mainWrapper);
      this.mainWrapper.append(popup.popupContentWrap);
      const productsInCart = createHtmlElement('div', 'products__in__cart', '', cartWrap);
      const titleAndPageControl = createHtmlElement('div', 'title__page-control', '', productsInCart);
      createHtmlElement('h2', 'title__cart', 'Products In Cart', titleAndPageControl);
      const pageControl = createHtmlElement('div', 'page__control', '', titleAndPageControl);
      const limit = createHtmlElement('div', 'limit', ' ITEMS: ', pageControl);
      const limitInput = createHtmlElement('input', 'limit__input', '', limit);
      if (!(limitInput instanceof HTMLInputElement)) {
        throw new Error('not imput element');
      }
      limitInput.setAttribute('type', 'text');
      limitInput.setAttribute('value', `${this.limit}`);
      limitInput.addEventListener('input', () => this.setLimit(limitInput.value));
      const pageNumber = createHtmlElement('div', 'page__number', ' PAGE: ', pageControl);
      const leftButton = createHtmlElement('button', 'page__button', ' < ', pageNumber);
      leftButton.addEventListener('click', this.prevPage);
      createHtmlElement('span', 'page__number-text', `${this.currentPage}`, pageNumber);
      const rightButton = createHtmlElement('button', 'page__button', ' > ', pageNumber);
      rightButton.addEventListener('click', this.nextPage);
      createHtmlElement('div', 'prod__items', '', productsInCart);

      const cartList = this.cartData.getCartList();
      const keys = Object.keys(cartList);
      const start = this.limit * (this.currentPage - 1);
      if (start >= keys.length) {
        this.prevPage();
      }
      const end = start + this.limit;
      for (let index = start; index < end && index < keys.length; index++) {
        const data = this.data.filter((el) => el.id === Number(keys[index]))[0];
        const productInCart = new ProductInCart(data, index, cartList[keys[index]]);
        productInCart.itemInfo.addEventListener('click', () => this.emit('navigate', `${PATH.product}/${productInCart.id}`));
        productInCart.plusButton.addEventListener('click', () => {
          this.emit('addToCart', productInCart.id);
          this.render();
        });
        productInCart.minusButton.addEventListener('click', () => {
          this.emit('deleteFromCart', productInCart.id);
          this.render();
        });
        productsInCart.append(productInCart.render());
      }

      const summary = createHtmlElement('div', 'summary', '', cartWrap);
      createHtmlElement('h2', 'summary__title', 'Summary', summary);
      const totalAmount = createHtmlElement('div', 'total__amount', '', summary);
      const totalAmountText = createHtmlElement('p', 'total__amount-text', '', totalAmount);
      createHtmlElement('span', '', 'Products: ', totalAmountText);
      createHtmlElement('span', '', `${this.cartData.countProducts}`, totalAmountText);
      const totalPrice = createHtmlElement('div', 'total__price-sum', '', summary);
      const totalPriceText = createHtmlElement('p', 'total__amount-text', '', totalPrice);
      createHtmlElement('span', '', 'Total: ', totalPriceText);
      createHtmlElement('span', '', `€${this.cartData.allPrice}.00`, totalPriceText);
      const newTotalPriceWrap = createHtmlElement('div', 'new__total__price-sum', '', summary);
      const newTotalPriceText = createHtmlElement('span', 'total__amount-text', 'Total: ', newTotalPriceWrap);
      const newTotalPrice = createHtmlElement('span', 'new__total__price', '', newTotalPriceText);
      const promoApplied = createHtmlElement('div', 'promo__applied', '', summary);
      createHtmlElement('h3', 'promo__applied-title', 'Applied codes', promoApplied);
      const promoCode = createHtmlElement('div', 'promo__code', '', summary);
      const promoCodeInput = createHtmlElement('input', 'promo__code-input', '', promoCode);
      promoCodeInput.setAttribute('placeholder', 'Enter promo code');
      promoCodeInput.setAttribute('type', 'search');
      const promoRes = createHtmlElement('div', 'promo__res', '', summary);
      const promoResText = createHtmlElement('span', 'promo__res-text', '', promoRes);
      const promoAdd = createHtmlElement('button', 'promo__add', 'ADD', promoRes);
      createHtmlElement('span', 'promo__ex', `Promo for test: 'RS', 'EPM'`, summary);
      const buttonBuy = createHtmlElement('button', 'button__buy', 'BUY NOW', summary);
      const blackout = new Blackout();
      this.mainWrapper.prepend(blackout.render());

      if (this.cartData.isStartBuy) {
        this.cartData.isStartBuy = false;
        popup.popupContentWrap.classList.toggle('popup__active');
        blackout.blackout.classList.toggle('blackout__active');
      }

      buttonBuy.addEventListener('click', () => {
        popup.popupContentWrap.classList.toggle('popup__active');
        blackout.blackout.classList.toggle('blackout__active');
      });

      const blackoutActive = (e: Event) => {
        const errorMessages = popup.popupContentWrap?.querySelectorAll('.error__message');
        if (e.target !== popup.popupContentWrap) {
          popup.popupContentWrap.classList.toggle('popup__active');
          blackout.blackout.classList.toggle('blackout__active');
        }
        errorMessages.forEach((el) => {
          if (el.classList.contains('active')) {
            el.classList.remove('active');
          }
        });
      };

      blackout.blackout.addEventListener('click', blackoutActive);

      popup.popupForm.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        this.cartData.clearCart();
        popup.popupContentWrap.classList.toggle('popup__active');
        blackout.blackout.removeEventListener('click', blackoutActive);
        cartWrap.style.display = 'none';
        this.mainWrapper.className = 'redirect__message';
        const secondsLeft = createHtmlElement('span', 'seconds__text', '5');
        const rediretcMessage = createHtmlElement(
          'h1',
          'redirect__message-text',
          `Thanks for your order. Redirect to the store after `,
          this.mainWrapper
        );
        rediretcMessage.append(secondsLeft);
        rediretcMessage.append(' sec');
        let timeleft = 5;
        const backToCatalog = () => this.emit('navigate', PATH.catalog);
        const downloadTimer = setInterval(function () {
          timeleft--;
          secondsLeft.textContent = timeleft.toString();
          if (timeleft <= 0) {
            clearInterval(downloadTimer);
            backToCatalog();
          }
        }, 1000);
      });

      if (!(promoCodeInput instanceof HTMLInputElement)) {
        throw Error('Not input element');
      }
      promoCodeInput.addEventListener('input', () => {
        if (promoCodeInput.value.toLowerCase() === 'rs') {
          if (str1 !== 'rs' && count < 2) {
            promoAdd.classList.remove('unactive-promo');
          }
          if (str1 === 'rs' && count === 1) {
            promoAdd.classList.add('unactive-promo');
          }
          promoRes.classList.toggle('active-promo');
          promoResText.textContent = 'Rolling Scopes School - 10%  ';
        }
        if (promoCodeInput.value.toLowerCase() === 'epm') {
          if (str2 !== 'epm' && count < 2) {
            promoAdd.classList.remove('unactive-promo');
          }
          if (str2 === 'epm' && count === 1) {
            promoAdd.classList.add('unactive-promo');
          }
          promoRes.classList.toggle('active-promo');
          promoResText.textContent = 'EPAM Systems - 10%  ';
        }
        if (promoCodeInput.value === '') {
          promoRes.classList.remove('active-promo');
        }
      });

      if (!(promoAdd instanceof HTMLButtonElement)) {
        throw Error('Not button element');
      }

      promoAdd.addEventListener('click', () => {
        promoApplied.classList.remove('unactive-promo');
        const promoToDrop = createHtmlElement('div', 'promo__to__drop', ' - ', promoApplied);
        const promoToDropText = createHtmlElement('span', 'promo__to__drop-text', '');
        promoToDropText.textContent = promoResText.textContent;
        const dropButton = createHtmlElement('button', 'button__drop', 'DROP');

        dropButton.addEventListener('click', () => {
          promoRes.classList.add('active-promo');
          promoResText.textContent = promoToDropText.textContent;
          promoAdd.classList.remove('unactive-promo');
          promoToDrop.remove();

          count -= 1;
          if (promoToDropText.textContent === 'Rolling Scopes School - 10%  ') {
            str1 = '';
          }
          if (promoToDropText.textContent === 'EPAM Systems - 10%  ') {
            str2 = '';
          }

          if (count === 0) {
            promoApplied.classList.add('unactive-promo');
          }
          if (count === 0) {
            totalPrice.classList.toggle('line-through');
            newTotalPriceWrap.classList.toggle('active-promo');
          }
          if (count === 1) {
            newTotalPrice.textContent = `€${(Number(totalPrice.textContent?.slice(8)) * 0.9).toFixed(2)}`;
          }
          if (count === 2) {
            newTotalPrice.textContent = `€${(Number(totalPrice.textContent?.slice(8)) * 0.8).toFixed(2)}`;
          }
        });

        promoToDrop.prepend(promoToDropText);
        promoToDrop.append(dropButton);
        promoApplied.append(promoToDrop);
        promoAdd.classList.add('unactive-promo');
        count += 1;
        if (promoToDropText.textContent === 'Rolling Scopes School - 10%  ') {
          str1 = 'rs';
        }
        if (promoToDropText.textContent === 'EPAM Systems - 10%  ') {
          str2 = 'epm';
        }

        if (!totalPrice.classList.contains('line-through')) {
          totalPrice.classList.toggle('line-through');
        }
        if (!promoApplied.classList.contains('active-promo')) {
          promoApplied.classList.toggle('active-promo');
        }
        if (!newTotalPriceWrap.classList.contains('active-promo')) {
          newTotalPriceWrap.classList.toggle('active-promo');
        }
        if (count === 1) {
          newTotalPrice.textContent = `€${(Number(totalPrice.textContent?.slice(8)) * 0.9).toFixed(2)}`;
        }
        if (count === 2) {
          newTotalPrice.textContent = `€${(Number(totalPrice.textContent?.slice(8)) * 0.8).toFixed(2)}`;
        }
      });
    }

    return this.mainWrapper;
  }

  private setLimit = (value: string) => {
    this.limit = Number(value);
    const params = qs.parse(window.location.search);
    params.limit = value;
    if (params.limit === '') {
      delete params.limit;
    }
    const search = qs.stringify(params);
    window.history.pushState({}, 'path', window.location.origin + window.location.pathname + '?' + search);
    this.render();
  };

  private prevPage = () => {
    if (this.currentPage < 2) {
      return;
    }
    this.currentPage--;
    this.goPage();
  };

  private nextPage = () => {
    const maxPage = Math.ceil(this.cartData.getCartListLength() / this.limit);
    if (this.currentPage >= maxPage) {
      return;
    }
    this.currentPage++;
    this.goPage();
  };

  goPage = () => {
    const params = qs.parse(window.location.search);
    params.page = this.currentPage.toString();
    const search = qs.stringify(params);
    window.history.pushState({}, 'path', window.location.origin + window.location.pathname + '?' + search);
    this.render();
  };
}

import { createHtmlElement } from '../../../utils/createElement';
import cartData from './CartData';
import Page from '../Template/page';
import './cartPage.css';
import ProductInCart from './../../Cart/cart';

export default class CartPage extends Page {
  constructor(id: string) {
    super(id);
  }

  render(): HTMLElement {
    if (!Object.keys(cartData.list).length) {
      this.mainWrapper.className = 'cart-empty';
      createHtmlElement('h1', 'cart-empty-text', 'Cart is empty', this.mainWrapper);
    } else {
      let str: string = '';
      let count: number = 0;
      this.mainWrapper.className = 'cart__page';
      const cartWrap = createHtmlElement('div', 'cart__wrap', '', this.mainWrapper);
      const productsInCart = createHtmlElement('div', 'products__in__cart', '', cartWrap);
      const titleAndPageControl = createHtmlElement('div', 'title__page-control', '', productsInCart);
      const title = createHtmlElement('h2', 'title__cart', 'Products In Cart', titleAndPageControl);
      const pageControl = createHtmlElement('div', 'page__control', '', titleAndPageControl);
      const limit = createHtmlElement('div', 'limit', ' ITEMS: ', pageControl);
      const limitInput = createHtmlElement('input', 'limit__input', '', limit);
      limitInput.setAttribute('type', 'text');
      limitInput.setAttribute('value', '3');
      const pageNumber = createHtmlElement('div', 'page__number', ' PAGE: ', pageControl);
      const leftButton = createHtmlElement('button', 'page__button', ' < ', pageNumber);
      const pageNumberText = createHtmlElement('span', 'page__number-text', '1', pageNumber);
      const rightButton = createHtmlElement('button', 'page__button', ' > ', pageNumber);
      const prodItems = createHtmlElement('div', 'prod__items', '', productsInCart);
      const productInCart = new ProductInCart();
      productsInCart.append(productInCart.createProductInCart());
      const summary = createHtmlElement('div', 'summary', '', cartWrap);
      const summaryTitle = createHtmlElement('h2', 'summary__title', 'Summary', summary);
      const totalAmount = createHtmlElement('div', 'total__amount', '', summary);
      const totalAmountText = createHtmlElement('span', 'total__amount-text', 'Products: ', totalAmount);
      totalAmount.append('1');
      const totalPrice = createHtmlElement('div', 'total__price-sum', '', summary);
      const totalPriceText = createHtmlElement('span', 'total__amount-text', 'Total: ', totalPrice);
      totalPrice.append('€549');
      const newTotalPriceWrap = createHtmlElement('div', 'new__total__price-sum', '', summary);
      const newTotalPriceText = createHtmlElement('span', 'total__amount-text', 'Total: ', newTotalPriceWrap);
      const newTotalPrice = createHtmlElement('span', 'new__total__price', '', newTotalPriceText);
      const promoApplied = createHtmlElement('div', 'promo__applied', '', summary);
      const promoAppliedTitle = createHtmlElement('h3', 'promo__applied-title', 'Applied codes', promoApplied);
      const promoCode = createHtmlElement('div', 'promo__code', '', summary);
      const promoCodeInput = createHtmlElement('input', 'promo__code-input', '', promoCode);
      promoCodeInput.setAttribute('placeholder', 'Enter promo code');
      promoCodeInput.setAttribute('type', 'search');
      const promoRes = createHtmlElement('div', 'promo__res', '', summary);
      const promoResText = createHtmlElement('span', 'promo__res-text', '', promoRes);
      const promoAdd = createHtmlElement('button', 'promo__add', 'ADD', promoRes);
      const promoEx = createHtmlElement('span', 'promo__ex', `Promo for test: 'RS', 'EPM'`, summary);
      const buttonBuy = createHtmlElement('button', 'button__buy', 'BUY NOW', summary);

      if (!(promoCodeInput instanceof HTMLInputElement)) {
        throw Error('Not input element');
      }
      promoCodeInput.addEventListener('input', () => {
        if (promoCodeInput.value.toLowerCase() === 'rs') {
          console.log(count);
          if (str !== 'rs' && str !== '' && count < 2) {
            promoAdd.classList.toggle('unactive-promo');
          }
          promoRes.classList.toggle('active-promo');
          promoResText.textContent = 'Rolling Scopes School - 10%  ';
          str = 'rs';
        }
        if (promoCodeInput.value.toLowerCase() === 'epm') {
          console.log(str);
          if (str !== 'epm' && str !== '' && count < 2) {
            promoAdd.classList.toggle('unactive-promo');
          }
          promoRes.classList.toggle('active-promo');
          promoResText.textContent = 'EPAM Systems - 10%  ';
          str = 'epm';
        }
        if (promoCodeInput.value === '') {
          promoRes.classList.remove('active-promo');
        }
      });

      if (!(promoAdd instanceof HTMLButtonElement)) {
        throw Error('Not button element');
      }

      promoAdd.addEventListener('click', () => {
        const promoToDrop = createHtmlElement('div', 'promo__to__drop', ' - ', promoApplied);
        const promoToDropText = createHtmlElement('span', 'promo__to__drop-text', '');
        promoToDropText.textContent = promoResText.textContent;
        const dropButton = createHtmlElement('button', 'button__drop', 'DROP');
        promoToDrop.prepend(promoToDropText);
        promoToDrop.append(dropButton);
        promoApplied.append(promoToDrop);
        promoAdd.classList.toggle('unactive-promo');
        count += 1;
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
}

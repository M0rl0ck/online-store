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
      const promoCode = createHtmlElement('div', 'promo__code', '', summary);
      const promoCodeInput = createHtmlElement('input', 'promo__code-input', '', promoCode);
      promoCodeInput.setAttribute('placeholder', 'Enter promo code');
      const promoEx = createHtmlElement('span', 'promo__ex', `Promo for test: 'RS', 'EPM'`, summary);
      const buttonBuy = createHtmlElement('button', 'button__buy', 'BUY NOW', summary);
    }

    return this.mainWrapper;
  }
}

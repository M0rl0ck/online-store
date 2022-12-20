import { createHtmlElement } from '../../../utils/createElement';
import cartData from './CartData';
import Page from '../page';

export default class CartPage extends Page {
  constructor(id: string) {
    super(id);
    
  }

  render(): HTMLElement {
    if (!Object.keys(cartData.list).length) {
      this.mainWrapper.className = 'cart-empty';
      createHtmlElement('h1', 'cart-empty-text', 'Cart empty', this.mainWrapper);
    }
    
    return this.mainWrapper;
  }
}
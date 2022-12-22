import './productPage.css';
import { createHtmlElement } from '../../../utils/createElement';
import Page from '../Template/page';
import ProductDetails from './../../ProductDetails/productDetails';

export default class ProductPage extends Page {
  constructor(id: string) {
    super(id);
    // this.mainWrapper.className = 'product__details';
    const productDetails = new ProductDetails();
    this.mainWrapper.append(productDetails.createProduct());
  }
  render(): HTMLElement {
    return this.mainWrapper;
  }
}

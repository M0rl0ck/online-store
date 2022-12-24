import './productPage.css';
import { createHtmlElement } from '../../../utils/createElement';
import Page from '../Template/page';
import ProductDetails from './../../ProductDetails/productDetails';

export default class ProductPage extends Page {
  constructor(id: string) {
    super(id);
    this.createProduct();
  }
  async createProduct() {
    const productId = parseInt(window.location.pathname.split('/')[2]);
    const productDetails = new ProductDetails(productId);
    productDetails.on('navigation', (path: string) => this.emit('navigation', path));
    this.mainWrapper.append(await productDetails.createProduct());
  }
  render(): HTMLElement {
    return this.mainWrapper;
  }
}

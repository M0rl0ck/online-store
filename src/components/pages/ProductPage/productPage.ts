import './productPage.css';
import Page from '../Template/page';
import ProductDetails from './../../ProductDetails/productDetails';
import CartData from '../CartPage/CartData';
import { EmitsName } from '../../constants/constants/connstants';
import { PATH } from '../../app/app';

export default class ProductPage extends Page {
  cartData: CartData;
  constructor(id: string, cartData: CartData) {
    super(id);
    this.cartData = cartData;
    this.createProduct();
  }

  emit(event: EmitsName, data?: number | string) {
    return super.emit(event, data);
  }

  on(event: EmitsName, callback: ((data: string) => void) | ((data: number) => void)) {
    return super.on(event, callback);
  }

  async createProduct() {
    const productId = parseInt(window.location.pathname.split('/')[2]);
    const productDetails = new ProductDetails(productId, this.cartData.isProductInCart(productId));
    productDetails.on('navigate', (path: string) => this.emit('navigate', path));
    productDetails.on('addToCart', (id: number) => this.cartData.addProduct(id));
    productDetails.on('deleteFromCart', (id: number) => this.cartData.deleteProduct(id));
    productDetails.on('buyNow', (id: number) => this.buyNow(id));
    this.mainWrapper.append(await productDetails.createProduct());
  }

  buyNow = (id: number) => {
    if (!this.cartData.isProductInCart(id)) {
      this.cartData.addProduct(id);
    }
    this.cartData.isStartBuy = true;
    this.emit('navigate', PATH.cart);
  };

  render(): HTMLElement {
    return this.mainWrapper;
  }
}

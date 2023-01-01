import CartPage from './CartPage';
import CartData from './CartData';

export default class CartControl {
  cartData: CartData;
  cartPage: CartPage;
  constructor(model:  CartData, view: CartPage) {
    this.cartData = model;
    this.cartPage = view;
    this.cartPage.on('addToCart', this.cartData.addProduct);
    this.cartPage.on('deleteFromCart', this.cartData.deleteProduct);
  }
}
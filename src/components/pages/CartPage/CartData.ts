type CartList = { [key: string]: number };

class CartData {
  list: CartList;
  constructor() {
    this.list = {};
  }
}

const cartData = new CartData();

export default cartData;
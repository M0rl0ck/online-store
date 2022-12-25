import EventEmitter from 'events';
import connector from '../../../data/connector/Connector';
import Storage from '../../../data/Storage/Storage';
import ICard from '../../constants/interfaces/ICard';

type CartList = { [key: string]: number };

export default class CartData extends EventEmitter {
  private list: CartList;
  items: ICard[];
  countProducts: number;
  allPrice: number;
  storage: Storage;
  constructor() {
    super();
    this.storage = new Storage();
    this.items = [];
    const list = this.storage.loadValue('cartData');
    this.list = list ? JSON.parse(list) : {};
    const countProducts = this.storage.loadValue('countProducts');
    this.countProducts = countProducts ? JSON.parse(countProducts) : 0;
    const allPrice = this.storage.loadValue('allPrice');
    this.allPrice = allPrice ? JSON.parse(allPrice) : 0;
    this.setItems();
  }

  async setItems() {
    this.items = await connector.getProducts();
  }

  addProduct = (id: number) => {
    const key = id.toString();
    if (this.list[key]) {
      this.list[key] += 1;
    } else {
      this.list[key] = 1;
    }
    this.saveData();
  };

  deleteProduct = (id: number) => {
    const key = id.toString();
    if (this.list[key]) {
      this.list[key] -= 1;
      if (this.list[key] === 0) {
        delete this.list[key];
      }
    }
    this.saveData();
  };

  deleteStackProduct = (id: number) => {
    const key = id.toString();
    if (this.list[key]) {
      delete this.list[key];
    }
    this.saveData();
  };

  isProductInCart = (id: number) => {
    return !!this.list[id.toString()];
  };

  isCartEmpty = () => {
    return !Object.keys(this.list).length;
  };

  getCartList = () => {
    return { ...this.list };
  };

  private saveData() {
    this.storage.saveValue('cartData', JSON.stringify(this.list));
    this.countProducts = this.getCountProducts();
    this.storage.saveValue('countProducts', JSON.stringify(this.countProducts));
    this.allPrice = this.getAllPrice();
    this.storage.saveValue('allPrice', JSON.stringify(this.allPrice));
    this.emit('changeDataCart', this.countProducts, this.allPrice);
  }

  private getCountProducts = (): number => {
    const keys = Object.keys(this.list);
    return keys.reduce((sum, key) => sum + this.list[key], 0);
  };

  private getAllPrice = () => {
    let result = 0;
    if (Object.keys(this.list)) {
      const keys = Object.keys(this.list);
      for (const key of keys) {
        const price = this.items.find((item) => item.id === Number(key))?.price;
        if (price) {
          result += price * this.list[key];
        }
      }
    }
    return result;
  };
}

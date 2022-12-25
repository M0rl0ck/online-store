import './main.css';
import Page from '../Template/page';
import Catalog from '../../Catalog/catalog';
import LeftFilter from '../../Filters/Left filter/left_filter';
import ICard from '../../constants/interfaces/ICard';
import CartData from '../CartPage/CartData';

class MainPage extends Page {
  catalog: Catalog;
  cartData: CartData;
  constructor(id: string, data: ICard[], cardData: CartData) {
    super(id);
    this.cartData = cardData;
    this.catalog = new Catalog(data, this.cartData);
    const leftFilter = new LeftFilter(data);
    this.mainWrapper.append(leftFilter.createLeftFilter(), this.catalog.render());
    this.catalog.on('addToCart', this.cartData.addProduct);
    this.catalog.on('deleteFromCart', this.cartData.deleteStackProduct);
  }

  render(): HTMLElement {
    return this.mainWrapper;
  }
}

export default MainPage;

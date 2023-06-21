import './main.css';
import Page from '../Template/page';
import Catalog from '../../Catalog/catalog';
import LeftFilter from '../../Filters/LeftFilter/leftFilter';
import ICard from '../../constants/interfaces/ICard';
import CartData from '../CartPage/CartData';
import { EmitsName, SORTBY } from '../../constants/constants/connstants';

class MainPage extends Page {
  catalog: Catalog;
  cartData: CartData;
  leftFilter: LeftFilter;
  constructor(id: string, data: ICard[], cartData: CartData) {
    super(id);
    this.cartData = cartData;
    this.leftFilter = new LeftFilter(data);
    this.mainWrapper.append(this.leftFilter.createLeftFilter());
    this.catalog = new Catalog(this.leftFilter.filtredData, this.cartData);
    this.mainWrapper.append(this.catalog.render());
    this.catalog.on('addToCart', this.cartData.addProduct);
    this.catalog.on('deleteFromCart', this.cartData.deleteStackProduct);
    this.leftFilter.on('filter', this.startFilter);
    this.leftFilter.on('reset', this.resetSearch);
    this.catalog.on('filter', this.startFilter);
  }

  emit(event: EmitsName, data?: number | string) {
    return super.emit(event, data);
  }

  on(event: EmitsName, callback: ((data: string) => void) | ((data: number) => void)) {
    return super.on(event, callback);
  }

  startFilter = () => {
    this.leftFilter.createLeftFilter();
    this.catalog.data = this.leftFilter.filtredData;
    this.catalog.render();
  };

  resetSearch = () => {
    this.catalog.inputSearch.value = '';
    this.catalog.sortSelect.value = SORTBY.DEFAULT;
  };

  render(): HTMLElement {
    return this.mainWrapper;
  }
}

export default MainPage;

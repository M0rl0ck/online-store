import './main.css';
import Page from '../Template/page';
import Catalog from '../../Catalog/catalog';
import LeftFilter from '../../Filters/Left filter/left_filter';
import ICard from '../../constants/interfaces/ICard';

class MainPage extends Page {
  catalog: Catalog;
  constructor(id: string, data: ICard[]) {
    super(id);
    this.catalog = new Catalog(data);
    const leftFilter = new LeftFilter(data);
    this.mainWrapper.append(leftFilter.createLeftFilter(), this.catalog.render());
  }

  render(): HTMLElement {
    return this.mainWrapper;
  }
}

export default MainPage;

import './main.css';
import Page from '../Template/page';
import Catalog from '../../Catalog/catalog';
import LeftFilter from '../../Filters/Left filter/left_filter';
import ICard from '../../constants/interfaces/ICard';

class MainPage extends Page {
  constructor(id: string, data: ICard[]) {
    super(id);
    const catalog = new Catalog(data);
    const leftFilter = new LeftFilter(data);
    this.mainWrapper.append(leftFilter.createLeftFilter(), catalog.render());
  }

  render(): HTMLElement {
    return this.mainWrapper;
  }
}

// const main = (new Main).mainWrapper;

// export default main;

export default MainPage;

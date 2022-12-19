import Header from '../src/components/Header/header';
import LeftFilter from '../src/components/Filters/Left filter/left_filter';
import Catalog from '../src/components/Catalog/catalog';
import '../src/css/global.css';
import Footer from './components/Footer/footer';
import main from './components/Main/main';
import ICard from './components/constants/interfaces/ICard';
import connector from './data/connector/Connector'

new Header();



const footer = new Footer();
footer.createFooter();

async function mainPage() {
  const data: ICard[] = await connector.getProducts(100);
  const catalog = new Catalog(data);
  const leftFilter = new LeftFilter(data);
  main.append(leftFilter.createLeftFilter(), catalog.createCatalog());
}

mainPage();

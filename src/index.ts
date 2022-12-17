import Header from '../src/components/Header/header';
import LeftFilter from '../src/components/Filters/Left filter/left_filter';
import Catalog from '../src/components/Catalog/catalog';
import '../src/css/global.css';
import Footer from './components/Footer/footer';
import Main from './components/Main/main';
import ICard from './components/constants/interfaces/ICard'

const dataCards: ICard[] = [];
const header = new Header();
header.createHeader();

const main = new Main();

const leftFilter = new LeftFilter();





const footer = new Footer();
footer.createFooter();

fetch('https://dummyjson.com/products?limit=100').then(responce => responce.json()).then(data => {
  dataCards.push(...data.products);
  const catalog = new Catalog(dataCards);
  main.createMain().append(leftFilter.createLeftFilter(), catalog.createCatalog());
})
